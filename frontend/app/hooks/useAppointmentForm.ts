import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentFormValues } from "@/app/validations/schemas";

export const useAppointmentForm = () => {
    return useForm<AppointmentFormValues>({
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
                { day: "monday", start: "09:00", end: "17:00", startPause: "", endPause: "" },
            ],
            cardGradient: {
                from: "from-blue-50",
                to: "to-indigo-50",
            },
        },
    });
};
