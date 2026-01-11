"use client";

import { Calendar, Clock8, Pencil, Plus, Search, Trash, Video, Link as LinkIcon, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEventsQuery, useUpdateEventMutation } from "@/app/services/queries/eventQuery";
import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { SchedulingEvent, EventAvailability, EventSettings } from "@/app/types/event.types";
import { formatDate, getFormattedDuration } from "@/lib/helpers";
import { SearchEvent } from "@/app/components/EventComponents/SearchEvent";
import { HeaderEvent } from "@/app/components/EventComponents/HeaderEvent";
import { NoEvents } from "@/app/components/EventComponents/NoEvents";

const SettingsToggle = ({
    label,
    description,
    checked,
    onChange
}: {
    label: string,
    description: string,
    checked: boolean,
    onChange: (val: boolean) => void
}) => (
    <div className="flex items-start justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 group">
        <div className="flex flex-col gap-1 pr-4">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{label}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</span>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
        >
            <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    </div>
);

const SettingsModal = ({
    currentSettings,
    onSave
}: {
    currentSettings: EventSettings,
    onSave: (settings: EventSettings) => void
}) => {
    const [settings, setSettings] = useState<EventSettings>(currentSettings);
    const [isOpen, setIsOpen] = useState(false);

    // Sync state when modal opens to discard unsaved changes
    useEffect(() => {
        if (isOpen) {
            setSettings(currentSettings);
        }
    }, [isOpen, currentSettings]);

    const handleSave = () => {
        onSave(settings);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="text-xs gap-2">
                    <Plus size={14} /> Full Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white dark:bg-[#1a2632] border-none shadow-2xl">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-xl font-black text-slate-900 dark:text-white">Event Configuration</DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Show or hide editing controls for this event.
                    </DialogDescription>
                </DialogHeader>
                <div className="px-6 py-2">
                    <SettingsToggle
                        label="Update Title"
                        description="Show/Hide the pen to edit event title."
                        checked={settings.canUpdateTitle}
                        onChange={(v) => setSettings({ ...settings, canUpdateTitle: v })}
                    />
                    <SettingsToggle
                        label="Update Description"
                        description="Show/Hide the pen for event description."
                        checked={settings.canUpdateDescription}
                        onChange={(v) => setSettings({ ...settings, canUpdateDescription: v })}
                    />
                    <SettingsToggle
                        label="Update Duration"
                        description="Show/Hide the pen for meet duration."
                        checked={settings.canUpdateDuration}
                        onChange={(v) => setSettings({ ...settings, canUpdateDuration: v })}
                    />
                    <SettingsToggle
                        label="Update Availability"
                        description="Show/Hide controls for weekly availability."
                        checked={settings.canUpdateAvailability}
                        onChange={(v) => setSettings({ ...settings, canUpdateAvailability: v })}
                    />
                </div>
                <DialogFooter className="bg-slate-50/50 dark:bg-slate-900/40 p-6 flex flex-col sm:flex-row gap-2">
                    <Button variant="ghost" onClick={() => setIsOpen(false)} className="flex-1 font-bold">Cancel</Button>
                    <Button onClick={handleSave} className="flex-1 font-bold shadow-lg shadow-primary/20">Apply Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const generateTimeSlots = (start: string, end: string, duration: number = 30) => {
    // Safety check to prevent infinite loop
    const safeDuration = duration > 0 ? duration : 30;
    const slots: string[] = [];
    if (!start || !end) return slots;

    let [h, m] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let current = h * 60 + m;
    const finish = eh * 60 + em;

    while (current < finish && slots.length < 100) { // Added a hard limit of 100 slots as additional safety
        const hh = Math.floor(current / 60);
        const mm = current % 60;
        slots.push(`${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`);
        current += safeDuration;
    }
    return slots;
};

// --- Memoized Component for Availability Slots to prevent excessive re-renders ---
const AvailabilityDay = memo(({
    slot,
    slotDuration,
    disabledSlots,
    toggleSlot,
    onUpdate,
    onRemove,
    showRemove,
    canEdit
}: {
    slot: EventAvailability,
    slotDuration: number,
    disabledSlots: Set<string>,
    toggleSlot: (day: string, time: string) => void,
    onUpdate: (day: string, start: string, end: string) => void,
    onRemove: (day: string) => void,
    showRemove: boolean,
    canEdit: boolean
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [startTime, setStartTime] = useState(slot.start);
    const [endTime, setEndTime] = useState(slot.end);

    const times = useMemo(() => generateTimeSlots(slot.start, slot.end, slotDuration), [slot.start, slot.end, slotDuration]);

    const handleSave = () => {
        onUpdate(slot.day, startTime, endTime);
        setIsEditing(false);
    };

    useEffect(() => {
        setStartTime(slot.start);
        setEndTime(slot.end);
    }, [slot.start, slot.end]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between group/day">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-tight bg-primary/10 px-2 py-0.5 rounded">
                        {slot.day}
                    </span>
                    {isEditing ? (
                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-left-1 duration-200">
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="text-[10px] font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-primary"
                            />
                            <span className="text-[10px] text-slate-400">-</span>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="text-[10px] font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button onClick={handleSave} className="text-emerald-500 hover:bg-emerald-50 p-0.5 rounded transition-colors" title="Save">
                                <Check size={14} />
                            </button>
                            <button onClick={() => { setIsEditing(false); setStartTime(slot.start); setEndTime(slot.end); }} className="text-red-500 hover:bg-red-50 p-0.5 rounded transition-colors" title="Cancel">
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-slate-500">
                                {slot.start} - {slot.end}
                            </span>
                            {canEdit && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="opacity-0 group-hover/day:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary"
                                    title="Edit Hours"
                                >
                                    <Pencil size={12} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {showRemove && !isEditing && canEdit && (
                    <button
                        onClick={() => onRemove(slot.day)}
                        className="opacity-0 group-hover/day:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500"
                        title="Remove Day"
                    >
                        <Trash size={12} />
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {times.map((time, idx) => {
                    const isDisabled = disabledSlots.has(`${slot.day}-${time}`);
                    return (
                        <button
                            key={`${slot.day}-${time}-${idx}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleSlot(slot.day, time);
                            }}
                            className={`px-3 py-1.5 rounded-md border text-[10px] font-bold transition-all duration-200 ${isDisabled
                                ? 'bg-slate-100 border-slate-200 text-slate-400 grayscale opacity-60'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary hover:shadow-sm'
                                }`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

AvailabilityDay.displayName = "AvailabilityDay";

// --- Memoized Event Card Component ---
const EventCard = memo(({
    event,
    isOpen,
    toggle,
    getFormattedDuration,
    formatDate
}: {
    event: SchedulingEvent,
    isOpen: boolean,
    toggle: (id: string) => void,
    getFormattedDuration: (event: SchedulingEvent) => string,
    formatDate: (date: string) => string
}) => {
    const createdAtDate = useMemo(() => new Date(event.createdAt), [event.createdAt]);
    const dayName = useMemo(() => createdAtDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), [createdAtDate]);
    const dayNum = useMemo(() => createdAtDate.getDate(), [createdAtDate]);
    const timeStr = useMemo(() => createdAtDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), [createdAtDate]);
    const [disabledSlots, setDisabledSlots] = useState<Set<string>>(new Set());
    const { mutate: updateEvent } = useUpdateEventMutation();

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [titleValue, setTitleValue] = useState(event.title);
    const [descriptionValue, setDescriptionValue] = useState(event.description);

    const [settings, setSettings] = useState<EventSettings>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(`event-settings-${event._id}`);
            if (saved) return JSON.parse(saved);
        }
        return {
            canUpdateTitle: true,
            canUpdateDescription: false,
            canUpdateDuration: false,
            canUpdateAvailability: false,
        };
    });

    const [isEditingDuration, setIsEditingDuration] = useState(false);
    const [durationTypeValue, setDurationTypeValue] = useState<string>(event.durationType || "30");
    const [customVal, setCustomVal] = useState<number>(event.customDurationValue || 0);
    const [customUnit, setCustomUnit] = useState<string>(event.customDurationUnit || "min");

    const totalMinutes = useMemo(() => {
        if (durationTypeValue !== "custom") return Number(durationTypeValue);
        return customUnit === "hr" ? (customVal || 0) * 60 : (customVal || 0);
    }, [durationTypeValue, customVal, customUnit]);

    const formattedDurationInEdit = useMemo(() => {
        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return hrs > 0
            ? `${hrs}h${mins > 0 ? ` ${mins}m` : ""}`
            : `${mins} min`;
    }, [totalMinutes]);

    const handleUpdateDuration = useCallback(() => {
        updateEvent({
            id: event._id,
            data: {
                ...event,
                slotDuration: totalMinutes,
                durationType: durationTypeValue,
                customDurationValue: customVal,
                customDurationUnit: customUnit
            }
        });
        setIsEditingDuration(false);
    }, [totalMinutes, durationTypeValue, customVal, customUnit, event, updateEvent]);

    const handleUpdateTitle = useCallback(() => {
        if (titleValue.trim() && titleValue !== event.title) {
            updateEvent({ id: event._id, data: { ...event, title: titleValue } });
        } else {
            setTitleValue(event.title);
        }
        setIsEditingTitle(false);
    }, [titleValue, event, updateEvent]);

    const handleUpdateDescription = useCallback(() => {
        if (descriptionValue !== event.description) {
            updateEvent({ id: event._id, data: { ...event, description: descriptionValue } });
        } else {
            setDescriptionValue(event.description);
        }
        setIsEditingDescription(false);
    }, [descriptionValue, event, updateEvent]);

    useEffect(() => {
        setTitleValue(event.title);
        setDescriptionValue(event.description);
        setDurationTypeValue(event.durationType || "30");
        setCustomVal(event.customDurationValue || 0);
        setCustomUnit(event.customDurationUnit || "min");
    }, [event.title, event.description, event.durationType, event.customDurationValue, event.customDurationUnit]);


    useEffect(() => {
        if (!isOpen) return; // Optimization: Don't calculate slots if the card is closed

        const initialDisabled = new Set<string>();
        event.availability?.forEach(slot => {
            if (slot.startPause && slot.endPause) {
                const pauseSlots = generateTimeSlots(slot.startPause, slot.endPause, event.slotDuration);
                pauseSlots.forEach(time => {
                    initialDisabled.add(`${slot.day}-${time}`);
                });
            }
            if (slot.disabledSlots) {
                slot.disabledSlots.forEach(time => {
                    initialDisabled.add(`${slot.day}-${time}`);
                });
            }
        });
        setDisabledSlots(initialDisabled);
    }, [event.availability, event.slotDuration, isOpen]);

    const toggleSlot = useCallback((day: string, time: string) => {
        const key = `${day}-${time}`;
        const isCurrentlyDisabled = disabledSlots.has(key);

        // Update local state immediately for snappy UI
        setDisabledSlots(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });

        // Prepare the new availability for the backend
        const newAvailability = event.availability.map(slot => {
            if (slot.day === day) {
                const currentDisabledForDay = new Set<string>();

                // Migrate existing pause slots if they exist
                if (slot.startPause && slot.endPause) {
                    const pauseSlots = generateTimeSlots(slot.startPause, slot.endPause, event.slotDuration);
                    pauseSlots.forEach(t => currentDisabledForDay.add(t));
                }

                // Add existing disabledSlots
                if (slot.disabledSlots) {
                    slot.disabledSlots.forEach(t => currentDisabledForDay.add(t));
                }

                // Toggle the current slot
                if (!isCurrentlyDisabled) {
                    currentDisabledForDay.add(time);
                } else {
                    currentDisabledForDay.delete(time);
                }

                return {
                    ...slot,
                    disabledSlots: Array.from(currentDisabledForDay),
                    // Clear the old pause fields as they are now migrated to disabledSlots
                    startPause: "",
                    endPause: ""
                };
            }
            return slot;
        });

        // Call the update mutation
        updateEvent({
            id: event._id,
            data: {
                ...event,
                availability: newAvailability as any
            }
        });
    }, [disabledSlots, event, updateEvent]);

    const handleUpdateDayHours = useCallback((day: string, start: string, end: string) => {
        const newAvailability = event.availability.map(slot =>
            slot.day === day ? { ...slot, start, end } : slot
        );
        updateEvent({
            id: event._id,
            data: { ...event, availability: newAvailability as any }
        });
    }, [event, updateEvent]);

    const handleRemoveDay = useCallback((day: string) => {
        if (event.availability.length <= 1) return;
        const newAvailability = event.availability.filter(slot => slot.day !== day);
        updateEvent({
            id: event._id,
            data: { ...event, availability: newAvailability as any }
        });
    }, [event, updateEvent]);

    const handleAddDay = useCallback(() => {
        if (event.availability.length >= 7) return;

        const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const existingDays = event.availability.map(a => a.day);
        const nextDay = DAYS.find(d => !existingDays.includes(d));

        if (nextDay) {
            const newAvailability = [
                ...event.availability,
                { day: nextDay, start: "09:00", end: "17:00", disabledSlots: [] }
            ];
            updateEvent({
                id: event._id,
                data: { ...event, availability: newAvailability as any }
            });
        }
    }, [event, updateEvent]);

    return (
        <div key={event._id}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-4 mb-1 pl-1">{formatDate(event.createdAt)}</h3>
            <div className={`group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border overflow-hidden transition-[border,box-shadow,ring] duration-200 ${isOpen ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'}`}>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-24 bg-slate-50 dark:bg-slate-800/50 flex md:flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 gap-2 md:gap-0">
                        <span className="text-xs font-bold text-slate-400 uppercase">{dayName}</span>
                        <span className="text-2xl font-bold text-primary">{dayNum}</span>
                        <span className="text-xs font-medium text-slate-500 text-center">{timeStr}</span>
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-center gap-2 min-w-0">
                        <div className="flex justify-between items-start">
                            <div>
                                {isEditingTitle ? (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={titleValue}
                                            onChange={(e) => setTitleValue(e.target.value)}
                                            className="h-8 py-1 text-lg font-bold"
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleUpdateTitle();
                                                if (e.key === 'Escape') {
                                                    setIsEditingTitle(false);
                                                    setTitleValue(event.title);
                                                }
                                            }}
                                        />
                                        <button onClick={handleUpdateTitle} className="text-emerald-500 p-1 hover:bg-emerald-50 rounded">
                                            <Check size={18} />
                                        </button>
                                        <button onClick={() => { setIsEditingTitle(false); setTitleValue(event.title); }} className="text-red-500 p-1 hover:bg-red-50 rounded">
                                            <X size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 group/title">
                                        <h4 className="text-lg font-bold text-[#111618] dark:text-white">{event.title}</h4>
                                        {settings.canUpdateTitle && (
                                            <button
                                                onClick={() => setIsEditingTitle(true)}
                                                className="opacity-0 group-hover/title:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-300/20 capitalize">
                                        {event.service?.replace('_', ' ')}
                                    </span>
                                    {isEditingDuration ? (
                                        <div className="flex flex-col gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mt-2 max-w-sm">
                                            <div className="flex flex-wrap gap-1.5">
                                                {["15", "30", "45", "60", "custom"].map((d) => (
                                                    <button
                                                        key={d}
                                                        onClick={() => setDurationTypeValue(d)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${durationTypeValue === d
                                                            ? 'bg-primary text-white'
                                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                                                            }`}
                                                    >
                                                        {d === "custom" ? "Custom" : `${d}m`}
                                                    </button>
                                                ))}
                                            </div>

                                            {durationTypeValue === "custom" && (
                                                <div className="flex gap-2 items-center animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <input
                                                        type="number"
                                                        value={customVal}
                                                        onChange={(e) => setCustomVal(Number(e.target.value))}
                                                        className="w-16 h-8 text-xs rounded border border-slate-200 dark:border-slate-700 bg-transparent px-2 outline-none focus:ring-1 focus:ring-primary"
                                                        placeholder="Value"
                                                    />
                                                    <select
                                                        value={customUnit}
                                                        onChange={(e) => setCustomUnit(e.target.value)}
                                                        className="h-8 text-xs rounded border border-slate-200 dark:border-slate-700 bg-transparent px-1 outline-none focus:ring-1 focus:ring-primary"
                                                    >
                                                        <option value="min">Min</option>
                                                        <option value="hr">Hrs</option>
                                                    </select>
                                                    <span className="text-[10px] text-slate-400 font-medium">({formattedDurationInEdit})</span>
                                                </div>
                                            )}

                                            <div className="flex justify-end gap-2 pt-1 border-t border-slate-100 dark:border-slate-700">
                                                <button
                                                    onClick={() => {
                                                        setIsEditingDuration(false);
                                                        setDurationTypeValue(event.durationType || "30");
                                                        setCustomVal(event.customDurationValue || 0);
                                                        setCustomUnit(event.customDurationUnit || "min");
                                                    }}
                                                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleUpdateDuration}
                                                    className="text-[10px] font-bold text-primary hover:text-blue-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 group/duration">
                                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                <Clock8 size={14} /> {getFormattedDuration(event)}
                                            </span>
                                            {settings.canUpdateDuration && (
                                                <button
                                                    onClick={() => setIsEditingDuration(true)}
                                                    className="opacity-0 group-hover/duration:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary"
                                                >
                                                    <Pencil size={12} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">Active</span>
                            </div>
                        </div>
                        {isEditingDescription ? (
                            <div className="mt-2 flex flex-col gap-2">
                                <textarea
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                    className="w-full text-sm text-slate-600 dark:text-slate-400 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            setIsEditingDescription(false);
                                            setDescriptionValue(event.description);
                                        }
                                    }}
                                />
                                <div className="flex justify-end gap-2">
                                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => { setIsEditingDescription(false); setDescriptionValue(event.description); }}>Cancel</Button>
                                    <Button size="sm" className="h-7 text-xs" onClick={handleUpdateDescription}>Save Changes</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="group/desc relative">
                                <p className={`text-sm text-slate-600 dark:text-slate-400 transition-[max-height,opacity] ${isOpen ? '' : 'line-clamp-1'}`}>
                                    {event.description}
                                </p>
                                {settings.canUpdateDescription && (
                                    <button
                                        onClick={() => setIsEditingDescription(true)}
                                        className="absolute -right-2 top-0 opacity-0 group-hover/desc:opacity-100 transition-opacity p-1 text-slate-400 hover:text-primary"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex md:flex-col items-center justify-center p-3 gap-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20">
                        <div className="flex md:flex-col gap-2">
                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                                <span className="material-symbols-outlined text-[20px]"><Pencil size={20} /> </span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                                <span className="material-symbols-outlined text-[20px]"><Trash size={20} /></span>
                            </button>
                        </div>
                        <div className="w-px h-6 md:w-8 md:h-px bg-slate-200 dark:bg-slate-700 mx-1 md:my-1"></div>
                        <button
                            onClick={() => toggle(event._id)}
                            className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${isOpen ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-400 hover:text-primary hover:bg-primary/10'}`}
                            title={isOpen ? "Collapse" : "Expand"}
                        >
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                </div>

                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-slate-100 dark:border-slate-800 ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {isOpen && (
                        <div className="p-5 bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Booking Link</h5>
                                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <input
                                                type="text"
                                                readOnly
                                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/book/${event._id}`}
                                                className="bg-transparent text-xs flex-1 outline-none text-slate-600 dark:text-slate-400 truncate"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (typeof window !== 'undefined') {
                                                        navigator.clipboard.writeText(`${window.location.origin}/book/${event._id}`);
                                                    }
                                                }}
                                                className="text-primary text-[10px] font-bold hover:underline"
                                            >
                                                COPY
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Meeting Details</h5>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                            <Video size={16} className="text-primary" />
                                            <span>Platform: <span className="font-semibold text-slate-900 dark:text-white capitalize">{event.service?.replace('_', ' ')}</span></span>
                                        </div>
                                        {event.meetLink && (
                                            <div className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <LinkIcon size={16} className="text-primary" />
                                                <a href={event.meetLink} target="_blank" onClick={(e) => e.stopPropagation()} className="text-primary hover:underline truncate">{event.meetLink}</a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Weekly Availability</h5>
                                        <div className="flex flex-col gap-6">
                                            {event.availability?.map((slot: EventAvailability, i: number) => (
                                                <AvailabilityDay
                                                    key={slot.day}
                                                    slot={slot}
                                                    slotDuration={event.slotDuration}
                                                    disabledSlots={disabledSlots}
                                                    toggleSlot={toggleSlot}
                                                    onUpdate={handleUpdateDayHours}
                                                    onRemove={handleRemoveDay}
                                                    showRemove={event.availability.length > 1}
                                                    canEdit={settings.canUpdateAvailability}
                                                />
                                            ))}
                                            {event.availability.length < 7 && settings.canUpdateAvailability && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAddDay(); }}
                                                    className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all text-xs font-bold mt-2"
                                                >
                                                    <Plus size={16} />
                                                    Add Another Day
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Stats</h5>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                                                <p className="text-[10px] text-slate-400">Total Bookings</p>
                                                <p className="text-sm font-bold">0</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                                                <p className="text-[10px] text-slate-400">Conversion</p>
                                                <p className="text-sm font-bold">0%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                <SettingsModal
                                    currentSettings={settings}
                                    onSave={(newSettings) => {
                                        setSettings(newSettings);
                                        if (typeof window !== 'undefined') {
                                            localStorage.setItem(`event-settings-${event._id}`, JSON.stringify(newSettings));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
});

EventCard.displayName = "EventCard";

export default function EventsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(100);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [openEventId, setOpenEventId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data: events, isLoading: eventsLoading } = useEventsQuery({
        search: debouncedSearch,
        page: currentPage,
        limit: eventsPerPage
    });

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (events?.pagination?.totalPages || 1)) {
            setCurrentPage(page);
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    };
    const toggleEvent = useCallback((id: string) => {
        setOpenEventId(prev => (prev === id ? null : id));
    }, []);

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col max-w-[1000px] w-full gap-8">
                <HeaderEvent title="My Events" description="Manage your scheduled client interactions and services." />
                <SearchEvent
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    onClear={() => setSearchQuery("")}
                />
                <div className="flex flex-col gap-4">
                    {events?.data && events.data.length > 0 ? (
                        events.data.map((event: SchedulingEvent) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                isOpen={openEventId === event._id}
                                toggle={toggleEvent}
                                getFormattedDuration={getFormattedDuration}
                                formatDate={formatDate}
                            />
                        ))
                    ) : (
                        <NoEvents title="No Events found." />
                    )}
                </div>

                <div className="flex flex-row items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-6 gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Showing <span className="font-medium text-[#111618] dark:text-white">{events?.data?.length ? (currentPage - 1) * eventsPerPage + 1 : 0}</span> to <span className="font-medium text-[#111618] dark:text-white">{Math.min(currentPage * eventsPerPage, events?.pagination?.totalItems || 0)}</span> of <span className="font-medium text-[#111618] dark:text-white">{events?.pagination?.totalItems || 0}</span> results
                    </p>

                    <Pagination className="justify-end w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: events?.pagination?.totalPages || 0 }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === page}
                                        onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                    className={currentPage === (events?.pagination?.totalPages || 1) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}