"use client"

import { useEffect, useState } from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

const pages = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Calendar", href: "/calendar" },
    { name: "Clients", href: "/clients" },
    { name: "Invoices", href: "/invoices" },
    { name: "Appointments", href: "/appointments" },
    { name: "Staff", href: "/staff" },
    { name: "Reports", href: "/reports" },
    { name: "Events", href: "/events" },
    { name: "Settings", href: "/settings/general" },
    { name: "Profile", href: "/profile" },

    // Online Store
    { name: "Themes", href: "/online-store/themes" },
    { name: "Pages", href: "/online-store/pages" },
    { name: "Blog Posts", href: "/online-store/blog" },
    { name: "Navigation", href: "/online-store/navigation" },
    { name: "Preferences", href: "/online-store/preferences" },
]

export function CommandSearch() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen(true)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search pages..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Pages">
                    {pages.map((page) => (
                        <CommandItem
                            key={page.href}
                            onSelect={() => {
                                router.push(page.href)
                                setOpen(false)
                            }}
                        >
                            {page.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
