import * as z from "zod";

/* =======================
   APPOINTMENT SCHEMA
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

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

/* =======================
   CATEGORY SCHEMA
======================= */
export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    description: z.string().optional(),
    color: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
