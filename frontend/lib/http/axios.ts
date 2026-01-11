import axios from "axios"
import { tokenStorage } from "@/app/storage/token"

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    timeout: 10000,

    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }


})

api.interceptors.request.use((config) => {
    const token = tokenStorage.get()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
