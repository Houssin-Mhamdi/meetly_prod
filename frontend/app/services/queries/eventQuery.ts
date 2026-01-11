import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/app/services/event.service"
import { toast } from "sonner"
import { SchedulingEvent, EventsResponse } from "../../types/event.types"

// 1. Centralized Query Keys
export const eventKeys = {
    all: ["events"] as const,
    lists: () => [...eventKeys.all, "list"] as const,
    list: (params: { search?: string; page?: number; limit?: number }) => [...eventKeys.lists(), params] as const,
    details: () => [...eventKeys.all, "detail"] as const,
    detail: (id: string) => [...eventKeys.details(), id] as const,
}

// 2. Types (Ideally these would be in a shared types file)
interface EventData {
    title: string
    description: string
    service: string
    totalMinutes?: number
    availability: Array<{
        day: string;
        start: string;
        end: string;
        startPause?: string;
        endPause?: string;
        disabledSlots?: string[];
    }>
    userId?: string
    customDurationValue?: number
    customDurationUnit?: string
    customValue?: number
    customUnit?: string
    durationType?: string
    slotDuration?: number
    timezone?: string
}

export const useEventsQuery = (params: { search?: string; page?: number; limit?: number } = {}) => {
    return useQuery({
        queryKey: eventKeys.list(params),
        queryFn: () => getEvents(params),
        placeholderData: keepPreviousData
    })
}

export const useCreateEventMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            // Invalidate the list to trigger a refetch
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
            toast.success("Event created successfully!")

        },
        onError: (error: any) => {
            console.error("Failed to create event:", error)
            toast.error(error?.response?.data?.message || "Failed to create event")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
        }
    })
}

export const useUpdateEventMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<SchedulingEvent> }) => updateEvent(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
            queryClient.invalidateQueries({ queryKey: eventKeys.detail(variables.id) })
            toast.success("Event updated successfully!")
        },
        onError: (error: any) => {
            toast.error("Failed to update event")
        }
    })
}

export const useDeleteEventMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
            toast.success("Event deleted successfully!")
        },
        onError: () => {
            toast.error("Failed to delete event")
        }
    })
}

