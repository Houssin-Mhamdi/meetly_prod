import { useQuery } from "@tanstack/react-query"
import { getProfile, getGoogleStatus } from "../auth.service"

export const useProfileQuery = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}

export const useGoogleStatusQuery = (userId: string) => {
    return useQuery({
        queryKey: ["google-status", userId],
        queryFn: () => getGoogleStatus(userId),
        enabled: !!userId, // Only run if userId is provided
        staleTime: 1000 * 60 * 1, // Cache for 1 minute
    })
}

export const useProfileBySlugQuery = (slug: string) => {
    return useQuery({
        queryKey: ["profile-slug", slug],
        queryFn: () => import("../auth.service").then(mod => mod.getProfileBySlug(slug)),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5,
    })
}
