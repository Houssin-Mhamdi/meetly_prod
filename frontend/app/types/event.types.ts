export interface EventAvailability {
    day: string;
    start: string;
    end: string;
    startPause?: string;
    endPause?: string;
    disabledSlots?: string[];
}

export interface EventSettings {
    canUpdateTitle: boolean;
    canUpdateDescription: boolean;
    canUpdateDuration: boolean;
    canUpdateAvailability: boolean;
    canUpdatePrice: boolean;
    canUpdateVideoLink: boolean;
}

export interface SchedulingEvent {
    _id: string;
    id: string;
    title: string;
    description: string;
    price: number;
    videoLink?: string;
    category?: string;
    service: string;
    totalMinutes?: number;
    slotDuration: number;
    durationType?: string;
    meetLink?: string;
    availability: EventAvailability[];
    userId: string;
    timezone: string;
    customDurationUnit?: string;
    customDurationValue?: number;
    customUnit?: string;
    customValue?: number;
    settings?: EventSettings;
    cardGradient?: {
        from: string;
        to: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface EventsResponse {
    data: SchedulingEvent[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
    message?: string;
}
