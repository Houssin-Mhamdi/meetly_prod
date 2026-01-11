"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { tokenStorage } from "@/app/storage/token"

type Props = {
    children: React.ReactNode
}

export function GuestLayout({ children }: Props) {
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const token = tokenStorage.get()

        if (token) {
            router.replace("/dashboard")
        } else {
            setChecked(true)
        }
    }, [router])

    if (!checked) return null // 👈 prevents flick

    return <>{children}</>
}
