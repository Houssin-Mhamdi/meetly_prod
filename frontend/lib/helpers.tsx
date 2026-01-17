import { SchedulingEvent } from "@/app/types/event.types";

export const getFormattedDuration = (event: SchedulingEvent) => {
    const totalMinutes = event.slotDuration || 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0
        ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
        : `${minutes} min`;
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};


export const generateTimeSlots = (start: string, end: string) => {
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