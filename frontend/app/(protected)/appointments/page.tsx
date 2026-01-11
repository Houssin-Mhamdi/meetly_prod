"use client";

import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, ChevronLeft, ChevronRight, Clock5, FilePlusCorner, Info, Lightbulb, Plus, Trash, Video } from "lucide-react";
import { useCreateEventMutation } from "@/app/services/queries/eventQuery";
import { useProfileQuery } from "@/app/services/queries/authQuery";

/* =======================
   ZOD SCHEMA
======================= */

export const appointmentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    service: z.enum(["google_meet", "zoom", "microsoft_teams"]),
    durationType: z.enum(["15", "30", "45", "60", "custom"]),
    customDurationValue: z.number().optional(),
    customDurationUnit: z.enum(["min", "hr"]).optional(),
    availability: z.array(
        z.object({
            day: z.string(),
            start: z.string(),
            end: z.string(),
            startPause: z.string().optional(),
            endPause: z.string().optional(),
        })
    ).max(7, "You can add at most 7 days")
        .refine((data) => {
            const days = data.map(d => d.day.toLowerCase());
            return new Set(days).size === days.length;
        }, { message: "Each day can only be selected once" }),
});

const generateTimeSlots = (start: string, end: string) => {
    if (!start || !end) return [];
    const slots = [];
    let [h, m] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let current = h * 60 + m;
    const finish = eh * 60 + em;

    while (current <= finish) {
        const hh = Math.floor(current / 60);
        const mm = current % 60;
        slots.push(`${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`);
        current += 30;
    }
    return slots;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type FormData = z.infer<typeof appointmentSchema>;

/* =======================
   PAGE
======================= */
export default function AppointmentsPage() {
    const { mutate: createEvent, isPending } = useCreateEventMutation();
    const { data: user, isLoading } = useProfileQuery();


    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            title: "30 Min Consultation",
            description: "Briefly describe what this event is about...",
            service: "google_meet",
            durationType: "30",
            availability: [
                { day: "Monday", start: "09:00", end: "17:00" },
            ],
        },
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: "availability",
    });

    const durationType = useWatch({ control, name: "durationType" });
    const customValue = useWatch({ control, name: "customDurationValue" });
    const customUnit = useWatch({ control, name: "customDurationUnit" });
    const availabilityEntries = useWatch({ control, name: "availability" });
    const title = useWatch({ control, name: "title" });
    const description = useWatch({ control, name: "description" });
    const service = useWatch({ control, name: "service" });
    console.log({ durationType });
    const selectedDays = availabilityEntries?.map(a => a.day) || [];

    const totalMinutes =
        durationType !== "custom"
            ? Number(durationType)
            : customUnit === "hr"
                ? (Number(customValue) || 0) * 60
                : (Number(customValue) || 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedDuration = hours > 0
        ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
        : `${minutes} min`;


    const onSubmit = (data: FormData) => {
        createEvent({
            ...data,
            userId: user?._id,
            durationType: data.durationType === "custom" ? String(totalMinutes) : data.durationType,
            slotDuration: totalMinutes,
            customDurationValue: customValue,
            customDurationUnit: customUnit,
            totalMinutes,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            availability: data.availability.map(slot => ({
                day: slot.day.toLowerCase(),
                start: slot.start,
                end: slot.end,
                startPause: slot.startPause,
                endPause: slot.endPause,
            })),
        })
    };

    return (

        <main className="min-h-screen bg-gray-50 dark:bg-[#101d22]">
            <div className="mb-8">
                <a className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary mb-4 transition-colors" href="#">
                    <span className="material-symbols-outlined text-[18px]"><ChevronLeft size={20} /></span>
                    Back to Events
                </a>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Create New Event</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Set up event details and availability for booking.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            form="create-event-form"
                            disabled={isPending}
                            className="inline-flex items-center gap-2 px-4 py-2.5 font-medium text-white bg-primary hover:bg-primary/90 border border-primary/50 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                <Plus size={20} />
                            )}
                            {isPending ? "Creating..." : "Create Event"}
                        </button>

                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-6">
                <form id="create-event-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ================= LEFT COLUMN ================= */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* EVENT DETAILS */}
                        <section className="bg-white dark:bg-[#1a2632] rounded-xl border shadow-sm">
                            <div className="px-6 py-4 border-b flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary"> <FilePlusCorner size={20} /> </span>
                                <h2 className="text-lg font-bold">Event Details</h2>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* TITLE */}
                                <label className="flex flex-col gap-2">
                                    <span className="font-semibold text-sm">Event Title *</span>
                                    <input
                                        {...register("title")}
                                        className={`h-12 rounded-lg border px-4 dark:bg-[#101922] ${errors.title ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder="e.g. 1:1 Consultation"
                                    />
                                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                                </label>

                                {/* DESCRIPTION */}
                                <label className="flex flex-col gap-2">
                                    <span className="font-semibold text-sm">Description</span>
                                    <textarea
                                        {...register("description")}
                                        className={`min-h-[120px] rounded-lg border p-4 dark:bg-[#101922] ${errors.description ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder="Briefly describe what this event is about..."
                                    />
                                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                                </label>

                                {/* SERVICE TYPE */}
                                <div>
                                    <span className="font-semibold text-sm block mb-2">Service Type</span>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: "google_meet", label: "Google Meet", icon: "videocam" },
                                            { value: "zoom", label: "Zoom", icon: "person" },
                                            { value: "microsoft_teams", label: "Microsoft Teams", icon: "call" },
                                        ].map(s => (
                                            <label key={s.value} className="cursor-pointer">
                                                <input
                                                    type="radio"
                                                    value={s.value}
                                                    {...register("service")}
                                                    className="peer sr-only"
                                                />
                                                <div className="flex flex-col items-center gap-2 p-4 border-2 rounded-lg peer-checked:border-primary peer-checked:bg-primary/10">
                                                    <span className="material-symbols-outlined text-primary">{s.icon}</span>
                                                    <span className="text-sm font-medium">{s.label}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* AVAILABILITY */}
                        <section className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary"> <Clock5 size={20} /> </span>
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Availability &amp; Timing</h2>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col gap-8">
                                {/* Slot Duration */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Slot Duration</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["15", "30", "45", "60", "custom"].map((duration) => (
                                            <label key={duration} className="cursor-pointer">
                                                <input className="peer sr-only" type="radio"
                                                    value={duration}
                                                    {...register("durationType")} />
                                                <span className="block px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all">
                                                    {duration === "custom"
                                                        ? (durationType === "custom" && totalMinutes > 0 ? formattedDuration : "Custom")
                                                        : `${duration} min`}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    {
                                        durationType === "custom" && (
                                            <div className="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-out]">
                                                <div className="flex items-end gap-4 flex-wrap">
                                                    <div className="flex-1 min-w-[120px]">
                                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block uppercase tracking-wide">Duration Value</label>
                                                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm py-2 px-3 shadow-sm h-10" min="1" placeholder="e.g. 90" type="number" {...register("customDurationValue", { valueAsNumber: true })} />
                                                    </div>
                                                    <div className="flex-1 min-w-[140px]">
                                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block uppercase tracking-wide">Unit</label>
                                                        <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm py-2 px-3 shadow-sm h-10" {...register("customDurationUnit")}>
                                                            <option value="min">Minutes</option>
                                                            <option value="hr">Hours</option>
                                                        </select>
                                                    </div>
                                                    <div className="hidden sm:flex items-center text-sm text-slate-500 dark:text-slate-400 pb-2.5 pl-2 border-l border-slate-200 dark:border-slate-700 h-10">
                                                        <span className="material-symbols-outlined text-[18px] mr-1.5 text-slate-400"> <Info size={18} /> </span>
                                                        <span>Total: {hours > 0 && `${hours}h`} {minutes > 0 && `${minutes}m`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                </div>
                                {/* Weekly Schedule */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Weekly Schedule</label>
                                        <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Timezone: UTC-05:00</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {/* Header Row */}
                                        <div className="grid grid-cols-12 gap-3 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <div className="col-span-3">Day</div>
                                            <div className="col-span-4">Start</div>
                                            <div className="col-span-4">End</div>
                                            <div className="col-span-1"></div>
                                        </div>

                                        {fields.map((field, index) => {
                                            const dayAvailability = availabilityEntries?.[index];
                                            const slots = generateTimeSlots(dayAvailability?.start || "09:00", dayAvailability?.end || "17:00");

                                            return (
                                                <div key={field.id} className="flex flex-col gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                                    <div className="group grid grid-cols-12 gap-3 items-center">
                                                        <div className="col-span-3">
                                                            <select
                                                                {...register(`availability.${index}.day`)}
                                                                className="w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2 px-3 focus:border-primary focus:ring-primary h-10 transition-colors"
                                                            >
                                                                {DAYS.map(day => {
                                                                    const isTaken = selectedDays.includes(day) && selectedDays[index] !== day;
                                                                    return (
                                                                        <option key={day} value={day} disabled={isTaken}>
                                                                            {day}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="col-span-4">
                                                            <div className="relative">
                                                                <input
                                                                    className="w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2 px-3 pl-8 focus:border-primary focus:ring-primary h-10 transition-colors"
                                                                    type="time"
                                                                    {...register(`availability.${index}.start`)}
                                                                />
                                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                                                    <Clock5 size={14} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-4">
                                                            <div className="relative">
                                                                <input
                                                                    className="w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2 px-3 pl-8 focus:border-primary focus:ring-primary h-10 transition-colors"
                                                                    type="time"
                                                                    {...register(`availability.${index}.end`)}
                                                                />
                                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                                                    <Clock5 size={14} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1 flex justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                                            >
                                                                <Trash size={18} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Pause Section */}
                                                    <div className="border-t border-slate-200 dark:border-slate-700/50 pt-3 mt-1">
                                                        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                            <span>Optional Pause</span>
                                                            <div className="flex gap-4">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="w-2 h-2 rounded-full bg-primary/20 border border-primary/30"></span>
                                                                    <span>Select start &amp; end slots</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-12 gap-3 items-center mb-4">
                                                            <div className="col-span-5 relative">
                                                                <input
                                                                    className="w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs py-2 px-3 pl-8 focus:border-primary focus:ring-primary h-9 transition-colors"
                                                                    type="time"
                                                                    placeholder="Pause Start"
                                                                    {...register(`availability.${index}.startPause`)}
                                                                />
                                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">IN</span>
                                                            </div>
                                                            <div className="col-span-5 relative">
                                                                <input
                                                                    className="w-full border-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs py-2 px-3 pl-8 focus:border-primary focus:ring-primary h-9 transition-colors"
                                                                    type="time"
                                                                    placeholder="Pause End"
                                                                    {...register(`availability.${index}.endPause`)}
                                                                />
                                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">OUT</span>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setValue(`availability.${index}.startPause`, "");
                                                                        setValue(`availability.${index}.endPause`, "");
                                                                    }}
                                                                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors uppercase"
                                                                >
                                                                    Clear
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Slots Logic (UID similar to page event) */}
                                                        <div className="flex  flex-wrap gap-1.5 mt-2">
                                                            {slots.map((time, idx) => {
                                                                const startP = dayAvailability?.startPause;
                                                                const endP = dayAvailability?.endPause;
                                                                const isWithinPause = startP && endP && time >= startP && time < endP;
                                                                const isStart = time === startP;
                                                                const isEnd = time === endP;

                                                                return (
                                                                    <button
                                                                        key={idx}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            if (!startP || (startP && endP)) {
                                                                                setValue(`availability.${index}.startPause`, time);
                                                                                setValue(`availability.${index}.endPause`, "");
                                                                            } else {
                                                                                if (time > startP) {
                                                                                    setValue(`availability.${index}.endPause`, time);
                                                                                } else {
                                                                                    setValue(`availability.${index}.startPause`, time);
                                                                                    setValue(`availability.${index}.endPause`, "");
                                                                                }
                                                                            }
                                                                        }}
                                                                        className={`px-3 py-1 rounded-md border text-[10px] font-bold transition-all duration-200 ${isWithinPause || isStart || isEnd
                                                                            ? 'bg-primary text-white border-primary shadow-sm'
                                                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                                                                            }`}
                                                                    >
                                                                        {time}as
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* add start pause and end pause i want the same ui and logic of the slots like the page event but for the pause*/}

                                    </div>

                                    <button
                                        type="button"
                                        disabled={fields.length >= 7}
                                        onClick={() => {
                                            const remainingDays = DAYS.filter(d => !selectedDays.includes(d));
                                            if (remainingDays.length > 0) {
                                                append({ day: remainingDays[0], start: "09:00", end: "17:00" });
                                            }
                                        }}
                                        className="mt-2 w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined text-[20px] cursor-pointer"><Plus size={20} /> </span>
                                        {fields.length >= 7 ? "Maximum 7 days added" : "Add another time slot"}
                                    </button>
                                </div>
                            </div>
                        </section>


                        {/* STAFF MEMBER (UNCHANGED) */}
                        <section className="bg-white dark:bg-[#1a2632] rounded-xl border p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4">Staff Member</h2>
                            <div className="flex gap-4">
                                <div className="border-2 border-primary p-4 rounded-xl text-center">
                                    <img
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOe3RVpqsfkRfKOh9-ZSqCVGT7y68ElgUIOVYk3aJoD419QU7mT3PdPAlIWilnc3B-klMkC3Kd4vZzEYtqyKrj41Wfm90P7oKQH4a27aKxAJbE8e2gPpaDI5UECtonqSMz2HHhiOfNkMI0NaTuEM2E4gu7blyDFLKX2VSxOA41kP0atmGY02wjhWb5AbE-jULLnTcIxjZJ0rZ88e1tMTRgmOqtxs2UGyygwPUfXfUlyuzSbA-9X3OCgx7_C7R3kqmxmO5mgbtvJJA"
                                        className="w-12 h-12 rounded-full mx-auto"
                                    />
                                    <p className="font-bold mt-2">Sarah J.</p>
                                    <p className="text-xs text-gray-500">Therapist</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Preview</h3>
                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 p-5 border border-blue-100 dark:border-slate-700">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-primary">
                                    <span className="material-symbols-outlined">
                                        {service === "google_meet" ? <Video size={20} /> :
                                            service === "zoom" ? <Video size={20} className="text-blue-500" /> :
                                                <Video size={20} className="text-indigo-500" />}
                                    </span>
                                </div>
                                <span className="px-2 py-1 bg-white/60 dark:bg-black/20 rounded text-xs font-semibold text-slate-600 dark:text-slate-400">
                                    {formattedDuration}
                                </span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 truncate">
                                {title || "Untitled Event"}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                                {description || "No description provided."}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-3">
                                <div className="size-5 rounded-full bg-cover bg-center" data-alt="Small user avatar in preview card" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRwj-nEsfvf2JHyIzgQYNF1TUV2CbfZ8AeBCY-zy_ICYQOgs0LJ_4AYq7moFN8LhFweUyi6hVgKp3bX4OguxD46uT4lNbhrTAxbTi9tSPlqWlxMrwBhp9EF1GS0sUpr--5mKDiaDGHZNsTgvnTXj3HylVR9TKzdnxo3FjW4zFd-g3_YrGc4m_nl6HSXaSNJs372f5t5xABUiSLulrJhbblkknjKWPKHMIzv91uGGxAPlGZvbP1I1dbZswACIYAKhUxXH1QGZswSWk")' }}></div>
                                <span>Hosted by You</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]"><Lightbulb size={20} /></span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Pro Tip</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Events with detailed descriptions get 20% more bookings. Be clear about what attendees can expect.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-primary text-[20px]"><Calendar size={20} /></span>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Calendar Sync</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">This event will check your main calendar for conflicts automatically.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </main>
    );
}
