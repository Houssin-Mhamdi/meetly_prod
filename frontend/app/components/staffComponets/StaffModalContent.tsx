import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

type Props = {
    onClose: () => void;
}

const timeStringSchema = z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time");

const dayScheduleSchema = z.object({
    day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    isActive: z.boolean(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
});

const staffSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    location: z.string().min(1, "Please select a location"),
    role: z.enum(["provider", "receptionist", "admin"]),
    services: z.array(z.string()).optional(),
    sendInvite: z.boolean().optional(),
    schedule: z.array(dayScheduleSchema),
});

type StaffFormValues = z.infer<typeof staffSchema>;

const DEFAULT_SCHEDULE: StaffFormValues['schedule'] = [
    { day: "Monday", isActive: true, startTime: "09:00", endTime: "17:00" },
    { day: "Tuesday", isActive: true, startTime: "09:00", endTime: "17:00" },
    { day: "Wednesday", isActive: true, startTime: "09:00", endTime: "17:00" },
    { day: "Thursday", isActive: true, startTime: "09:00", endTime: "17:00" },
    { day: "Friday", isActive: true, startTime: "09:00", endTime: "17:00" },
    { day: "Saturday", isActive: false, startTime: "09:00", endTime: "17:00" },
    { day: "Sunday", isActive: false, startTime: "09:00", endTime: "17:00" },
];

export default function StaffModalContent({ onClose }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<StaffFormValues>({
        resolver: zodResolver(staffSchema),
        defaultValues: {
            role: "provider",
            services: [],
            sendInvite: false,
            schedule: DEFAULT_SCHEDULE,
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "schedule",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("Image size must be less than 5MB");
                return;
            }
            const url = URL.createObjectURL(file);
            console.log(url);
            setPreviewUrl(url);
        }
    };

    const onSubmit = (data: StaffFormValues) => {
        console.log("Form Submitted:", data);
        onClose();
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
                <div>
                    <h2 className="text-2xl font-extrabold text-[#111418] dark:text-white">Add New Staff Member</h2>
                    <p className="text-sm text-[#617589] dark:text-gray-400 mt-1">Set up a new team member's profile, role, and schedule.</p>
                </div>
                <button onClick={onClose} className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-gray-500">close</span>
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    {/* Personal Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                            <span className="material-symbols-outlined text-sm">person</span>
                            <span>Personal Details</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex flex-col items-center gap-3">
                                <label className="size-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden group relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary mb-1">add_a_photo</span>
                                            <span className="text-[10px] text-gray-400 group-hover:text-primary font-bold">UPLOAD</span>
                                        </>
                                    )}
                                </label>
                                <span className="text-xs text-gray-500">Profile Photo</span>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-[#111418] dark:text-white">Full Name</label>
                                    <input
                                        {...register("fullName")}
                                        className={clsx(
                                            "h-10 px-3 rounded-lg border dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary",
                                            errors.fullName ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                        )}
                                        placeholder="e.g. John Doe"
                                        type="text"
                                    />
                                    {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-[#111418] dark:text-white">Email Address</label>
                                    <input
                                        {...register("email")}
                                        className={clsx(
                                            "h-10 px-3 rounded-lg border dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary",
                                            errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                        )}
                                        placeholder="john@example.com"
                                        type="email"
                                    />
                                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-[#111418] dark:text-white">Phone Number</label>
                                    <input
                                        {...register("phone")}
                                        className={clsx(
                                            "h-10 px-3 rounded-lg border dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary",
                                            errors.phone ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                        )}
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                    />
                                    {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-bold text-[#111418] dark:text-white">Locations</label>
                                    <select
                                        {...register("location")}
                                        className={clsx(
                                            "h-10 px-3 rounded-lg border dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary",
                                            errors.location ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                                        )}
                                    >
                                        <option value="">Select a location</option>
                                        <option value="downtown">Main Downtown Branch</option>
                                        <option value="northside">North Side Clinic</option>
                                        <option value="all">All Locations</option>
                                    </select>
                                    {errors.location && <span className="text-xs text-red-500">{errors.location.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Roles */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                            <span className="material-symbols-outlined text-sm">badge</span>
                            <span>Business Role &amp; Permissions</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className={clsx(
                                "relative flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                watch('role') === 'provider' ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                            )}>
                                <input
                                    {...register("role")}
                                    value="provider"
                                    className="absolute top-4 right-4 text-primary"
                                    type="radio"
                                />
                                <span className={clsx("material-symbols-outlined", watch('role') === 'provider' ? "text-primary" : "text-[#617589]")}>spa</span>
                                <div>
                                    <p className="font-bold text-sm text-[#111418] dark:text-white">Provider</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Can perform services and manage their own calendar.</p>
                                </div>
                            </label>
                            <label className={clsx(
                                "relative flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                watch('role') === 'receptionist' ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                            )}>
                                <input
                                    {...register("role")}
                                    value="receptionist"
                                    className="absolute top-4 right-4 text-primary"
                                    type="radio"
                                />
                                <span className={clsx("material-symbols-outlined", watch('role') === 'receptionist' ? "text-primary" : "text-[#617589]")}>desk</span>
                                <div>
                                    <p className="font-bold text-sm text-[#111418] dark:text-white">Receptionist</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Can manage calendars and bookings for all staff.</p>
                                </div>
                            </label>
                            <label className={clsx(
                                "relative flex flex-col gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                                watch('role') === 'admin' ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                            )}>
                                <input
                                    {...register("role")}
                                    value="admin"
                                    className="absolute top-4 right-4 text-primary"
                                    type="radio"
                                />
                                <span className={clsx("material-symbols-outlined", watch('role') === 'admin' ? "text-primary" : "text-[#617589]")}>admin_panel_settings</span>
                                <div>
                                    <p className="font-bold text-sm text-[#111418] dark:text-white">Admin</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Full access to billing, reporting, and settings.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                            <span className="material-symbols-outlined text-sm">checklist</span>
                            <span>Service Assignments</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-sm text-gray-500 mb-4">Select services this staff member is qualified to perform:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                {[
                                    "Hair Styling & Cut", "Coloring Services", "Deep Conditioning",
                                    "Scalp Massage", "Bridal Makeup", "Lash Tint & Lift"
                                ].map((service) => (
                                    <label key={service} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            {...register("services")}
                                            value={service}
                                            className="rounded text-primary focus:ring-primary w-4 h-4 border-gray-300"
                                            type="checkbox"
                                        />
                                        <span className="text-sm text-[#111418] dark:text-white">{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="space-y-6 pb-4">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span>Default Working Hours</span>
                        </div>
                        <div className="space-y-3">
                            {fields.map((field, index) => {
                                const isActive = watch(`schedule.${index}.isActive`);
                                return (
                                    <div
                                        key={field.id}
                                        className={clsx(
                                            "flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
                                            isActive
                                                ? "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800"
                                                : "border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 w-1/4">
                                            {/* Toggle Slide Switch */}
                                            <div
                                                onClick={() => setValue(`schedule.${index}.isActive`, !isActive)}
                                                className={clsx(
                                                    "w-10 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out shrink-0",
                                                    isActive ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "absolute top-1 size-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out",
                                                    isActive ? "left-[calc(100%-1.25rem)]" : "left-1"
                                                )} />
                                            </div>
                                            <span className={clsx("text-sm font-bold", !isActive && "text-gray-400")}>{field.day}</span>
                                        </div>

                                        {isActive ? (
                                            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                                <input
                                                    {...register(`schedule.${index}.startTime`)}
                                                    className="text-xs rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-700 px-2 py-1 max-w-[80px]"
                                                    type="time"
                                                />
                                                <span className="text-gray-400 text-xs">to</span>
                                                <input
                                                    {...register(`schedule.${index}.endTime`)}
                                                    className="text-xs rounded border border-gray-200 dark:border-gray-700 dark:bg-gray-700 px-2 py-1 max-w-[80px]"
                                                    type="time"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-xs font-medium text-gray-400 uppercase animate-in fade-in duration-300">Closed / Off-duty</span>
                                        )}

                                        <div className="w-8">
                                            {/* Spacer for alignment or future actions */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-[#1a2632] rounded-b-2xl shrink-0">
                    <div className="flex items-center gap-2">
                        <input
                            {...register("sendInvite")}
                            className="rounded text-primary focus:ring-primary"
                            id="sendInvite"
                            type="checkbox"
                        />
                        <label className="text-sm text-gray-600 dark:text-gray-400" htmlFor="sendInvite">Send email invitation to staff member</label>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-bold shadow-sm transition-all shadow-primary/20"
                        >
                            Send Invitation
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}