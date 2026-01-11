import { AxiosError } from "axios"

export type ApiError = {
    message: string
    status?: number
}

export function parseApiError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        return {
            message:
                error.response?.data?.message ||
                "Something went wrong. Please try again.",
            status: error.response?.status,
        }
    }

    return { message: "Unexpected error occurred" }
}
