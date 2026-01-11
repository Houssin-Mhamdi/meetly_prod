import { api } from "@/lib/http/axios"
import { SchedulingEvent, EventsResponse } from "../types/event.types"

export const getEvents = async (params?: { search?: string; page?: number; limit?: number }): Promise<EventsResponse> => {
    const res = await api.get("/events", { params })
    return res.data
}

export const createEvent = async (data: Partial<SchedulingEvent>): Promise<SchedulingEvent> => {
    const res = await api.post("/events", data)
    return res.data
}

export const updateEvent = async (id: string, data: Partial<SchedulingEvent>): Promise<SchedulingEvent> => {
    const res = await api.patch(`/events/${id}`, data)
    return res.data
}

export const deleteEvent = async (id: string): Promise<void> => {
    const res = await api.delete(`/events/${id}`)
    return res.data
}
