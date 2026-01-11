"use client";

import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, ChevronLeft, ChevronRight, Clock5, FilePlusCorner, Info, Lightbulb, Plus, Trash, Video } from "lucide-react";
import { useCreateEventMutation } from "@/app/services/queries/eventQuery";
import { useProfileQuery } from "@/app/services/queries/authQuery";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "@/app/services/queries/categoryQuery";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


/* =======================
   ZOD SCHEMA
======================= */

export const appointmentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price cannot be negative"),
    videoLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    category: z.string().min(1, "Category is required"),
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
    cardGradient: z.object({
        from: z.string(),
        to: z.string(),
    }),
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

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

/* =======================
   PAGE
======================= */
export default function AppointmentsPage() {
    const { mutate: createEvent, isPending } = useCreateEventMutation();
    const { data: user, isLoading } = useProfileQuery();
    const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategoryMutation();

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryDesc, setNewCategoryDesc] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6");

    const handleCreateCategory = () => {
        if (!newCategoryName) return;
        createCategory({
            name: newCategoryName,
            description: newCategoryDesc,
            color: newCategoryColor
        }, {
            onSuccess: () => {
                setIsCategoryModalOpen(false);
                setNewCategoryName("");
                setNewCategoryDesc("");
                setNewCategoryColor("#3b82f6");
            }
        });
    };


    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema) as any,
        defaultValues: {
            title: "30 Min Consultation",
            description: "Briefly describe what this event is about...",
            price: 0,
            videoLink: "",
            category: "other",
            service: "google_meet",
            durationType: "30",
            customDurationValue: 30,
            customDurationUnit: "min",
            availability: [
                { day: "Monday", start: "09:00", end: "17:00", startPause: "", endPause: "" },
            ],
            cardGradient: {
                from: "from-blue-50",
                to: "to-indigo-50",
            },
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
    const price = useWatch({ control, name: "price" });
    const videoLink = useWatch({ control, name: "videoLink" });
    const service = useWatch({ control, name: "service" });
    const cardGradient = useWatch({ control, name: "cardGradient" });
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

    // Determine if gradient is dark (for text color adjustment)
    const darkGradients = [
        "from-orange-400", "from-indigo-500", "from-green-400",
        "from-pink-400", "from-yellow-400", "from-teal-400",
        "from-purple-400", "from-slate-700"
    ];
    const isDarkGradient = darkGradients.includes(cardGradient?.from || "");


    const onSubmit: SubmitHandler<AppointmentFormValues> = (data) => {
        createEvent({
            ...data,
            userId: user?._id,
            durationType: data.durationType === "custom" ? String(totalMinutes) : data.durationType,
            slotDuration: totalMinutes,
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

                                {/* PRICE */}
                                <label className="flex flex-col gap-2">
                                    <span className="font-semibold text-sm">Price ($)</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        {...register("price", { valueAsNumber: true })}
                                        className={`h-12 rounded-lg border px-4 dark:bg-[#101922] ${errors.price ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                                </label>

                                {/* VIDEO LINK */}
                                <label className="flex flex-col gap-2">
                                    <span className="font-semibold text-sm">Video Link (Optional)</span>
                                    <input
                                        type="url"
                                        {...register("videoLink")}
                                        className={`h-12 rounded-lg border px-4 dark:bg-[#101922] ${errors.videoLink ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder="https://youtube.com/watch?v=..."
                                    />
                                    {errors.videoLink && <p className="text-xs text-red-500">{errors.videoLink.message}</p>}
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Add a promotional or intro video to showcase your event</p>
                                </label>

                                {/* CATEGORY */}
                                <label className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm">Category *</span>
                                        <button
                                            type="button"
                                            onClick={() => setIsCategoryModalOpen(true)}
                                            className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                                        >
                                            <Plus size={14} /> Create Category
                                        </button>
                                    </div>
                                    <select
                                        {...register("category")}
                                        className={`h-12 rounded-lg border px-4 dark:bg-[#101922] ${errors.category ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                                    >
                                        <optgroup label="Standard Categories">
                                            <option value="technology">🖥️ Technology</option>
                                            <option value="business">💼 Business</option>
                                            <option value="health">🏥 Health & Wellness</option>
                                            <option value="education">📚 Education</option>
                                            <option value="arts">🎨 Arts & Culture</option>
                                            <option value="sports">⚽ Sports & Fitness</option>
                                            <option value="food">🍔 Food & Drink</option>
                                            <option value="music">🎵 Music</option>
                                            <option value="other">📌 Other</option>
                                        </optgroup>
                                        {categories && categories.length > 0 && (
                                            <optgroup label="My Categories">
                                                {categories.map((cat: any) => (
                                                    <option key={cat._id} value={cat._id}>
                                                        {cat.color && <span style={{ color: cat.color }}>● </span>}{cat.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        )}
                                    </select>
                                    {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                                </label>

                                <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Create New Category</DialogTitle>
                                            <DialogDescription>
                                                Add a custom category to organize your events.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex flex-col gap-4 py-4">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="category-name">Name</Label>
                                                <Input
                                                    id="category-name"
                                                    value={newCategoryName}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value)}
                                                    placeholder="e.g. Workshop"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="category-desc">Description</Label>
                                                <Textarea
                                                    id="category-desc"
                                                    value={newCategoryDesc}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewCategoryDesc(e.target.value)}
                                                    placeholder="Brief description of this category..."
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="category-color">Color</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        id="category-color"
                                                        type="color"
                                                        value={newCategoryColor}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryColor(e.target.value)}
                                                        className="w-12 h-10 p-1 cursor-pointer"
                                                    />
                                                    <span className="text-sm text-slate-500">{newCategoryColor}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleCreateCategory} disabled={!newCategoryName || isCreatingCategory}>
                                                {isCreatingCategory ? "Creating..." : "Create Category"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

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

                        {/* CARD CUSTOMIZATION */}
                        <section className="bg-white dark:bg-[#1a2632] rounded-xl border shadow-sm">
                            <div className="px-6 py-4 border-b flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary"><Calendar size={20} /></span>
                                <h2 className="text-lg font-bold">Card Customization</h2>
                            </div>
                            <div className="p-6">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">
                                    Choose Gradient Color
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        { from: "from-orange-400", to: "to-red-500", label: "Sunset" },
                                        { from: "from-indigo-500", to: "to-purple-600", label: "Purple Dream" },
                                        { from: "from-blue-50", to: "to-indigo-50", label: "Ocean Breeze" },
                                        { from: "from-green-400", to: "to-cyan-500", label: "Mint Fresh" },
                                        { from: "from-pink-400", to: "to-rose-500", label: "Rose Garden" },
                                        { from: "from-yellow-400", to: "to-orange-500", label: "Golden Hour" },
                                        { from: "from-teal-400", to: "to-blue-500", label: "Ocean Deep" },
                                        { from: "from-purple-400", to: "to-pink-500", label: "Lavender" },
                                        { from: "from-slate-700", to: "to-slate-900", label: "Midnight" },
                                    ].map((gradient) => {
                                        const isSelected =
                                            cardGradient?.from === gradient.from &&
                                            cardGradient?.to === gradient.to;

                                        return (
                                            <button
                                                key={`${gradient.from}-${gradient.to}`}
                                                type="button"
                                                onClick={() => {
                                                    setValue("cardGradient", {
                                                        from: gradient.from,
                                                        to: gradient.to,
                                                    });
                                                }}
                                                className={`relative p-4 rounded-xl border-2 transition-all ${isSelected
                                                    ? "border-primary shadow-md scale-105"
                                                    : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                                                    }`}
                                            >
                                                <div
                                                    className={`h-16 rounded-lg bg-linear-to-br ${gradient.from} ${gradient.to} mb-2`}
                                                />
                                                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                                                    {gradient.label}
                                                </p>
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">Preview</h3>
                        <div className={`rounded-xl bg-linear-to-br ${cardGradient?.from || "from-blue-50"} ${cardGradient?.to || "to-indigo-50"} dark:from-slate-800 dark:to-slate-900 p-5 border ${isDarkGradient ? "border-white/20" : "border-blue-100"} dark:border-slate-700`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 ${isDarkGradient ? "bg-white/20" : "bg-white"} dark:bg-slate-800 rounded-lg shadow-sm ${isDarkGradient ? "text-white" : "text-primary"}`}>
                                    <span className="material-symbols-outlined">
                                        {service === "google_meet" ? <Video size={20} /> :
                                            service === "zoom" ? <Video size={20} className={isDarkGradient ? "text-white" : "text-blue-500"} /> :
                                                <Video size={20} className={isDarkGradient ? "text-white" : "text-indigo-500"} />}
                                    </span>
                                </div>
                                <span className={`px-2 py-1 ${isDarkGradient ? "bg-white/20 text-white" : "bg-white/60 text-slate-600"} dark:bg-black/20 rounded text-xs font-semibold dark:text-slate-400`}>
                                    {formattedDuration} • ${price || 0}
                                </span>
                            </div>
                            <h4 className={`text-lg font-bold ${isDarkGradient ? "text-white" : "text-slate-900"} dark:text-white mb-1 truncate`}>
                                {title || "Untitled Event"}
                            </h4>
                            <p className={`text-sm ${isDarkGradient ? "text-white/90" : "text-slate-600"} dark:text-slate-400 line-clamp-2 mb-4`}>
                                {description || "No description provided."}
                            </p>
                            <div className={`flex items-center gap-2 text-xs font-medium ${isDarkGradient ? "text-white/80 border-white/20" : "text-slate-500 border-slate-200"} dark:text-slate-400 border-t dark:border-slate-700 pt-3`}>
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
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">SEO Boost</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Use specific keywords in your title (e.g., "Online Yoga Class" instead of "Class"). This helps people find your event on Google.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Pricing Strategy</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Competitive pricing increases visibility. Free or low-cost events get 3x more views in search results.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Visibility Tip</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Choose vibrant gradient colors! Eye-catching cards get 40% more clicks on storefront pages.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Availability Matters</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Offer multiple time slots across different days. Events with 5+ weekly slots get booked 2x faster.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </main>
    );
}
