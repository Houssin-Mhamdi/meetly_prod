"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sidebarNav, settingsNav } from "@/lib/navigation/sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown } from "lucide-react"
import { useSidebar } from "@/hooks/use-sidebar"

export function Sidebar() {
    const pathname = usePathname()
    const { collapsed, setCollapsed } = useSidebar()
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        "Online Store": true // Default open for visibility if wanted
    })

    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({
            ...prev,
            [title]: !prev[title]
        }))
    }

    return (
        <aside className={cn(
            "border-r bg-background transition-all duration-300 ease-in-out flex flex-col h-full",
            collapsed ? "w-20" : "w-64"
        )}>
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 shrink-0">
                {!collapsed &&
                    <div className="flex flex-col">
                        <h1 className={cn("text-[#111418] dark:text-white text-lg font-bold leading-tight transition-all duration-200 ", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>SmartSchedule</h1>
                        <p className={cn("text-[#617589] dark:text-gray-400 text-xs font-medium uppercase tracking-wide transition-all duration-200 ", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>Pro Plan</p>
                    </div>
                }
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronLeft
                        className={cn("transition-transform duration-300", collapsed && "rotate-180")}
                    />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <nav className="space-y-1 px-4">
                    {sidebarNav.map((item) => {
                        const { title, href, icon, items } = item
                        
                        const Icon = icon
                        const hasItems = "items" in item && items && items.length > 0
                        const active = hasItems
                            ? items.some(sub => pathname === sub.href)
                            : pathname === href
                        const isOpen = openMenus[item.title]

                        if (hasItems) {
                            return (
                                <div key={title} className="space-y-1">
                                    <button
                                        onClick={() => !collapsed && toggleMenu(item.title)}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition outline-none",
                                            active && !isOpen ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={18} />
                                            {!collapsed && <span>{item.title}</span>}
                                        </div>
                                        {!collapsed && (
                                            <ChevronDown
                                                size={14}
                                                className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                                            />
                                        )}
                                    </button>
                                    {!collapsed && isOpen && (
                                        <div className="ml-9 space-y-1">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className={cn(
                                                        "block rounded-lg px-3 py-2 text-sm transition",
                                                        pathname === subItem.href
                                                            ? "font-medium text-primary"
                                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    )}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        return (
                            <Link
                                key={item.href || item.title}
                                href={item.href || "#"}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                                    active
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                )}
                            >
                                <Icon size={18} />
                                {!collapsed && item.title}
                            </Link>
                        )
                    })}
                </nav>

                {/* Settings */}
                {!collapsed && (
                    <div className="mt-6 px-4 pb-8">
                        <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                            Settings
                        </div>
                        <div className="space-y-1">
                            {settingsNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block rounded-lg px-3 py-2 text-sm hover:bg-muted",
                                        pathname === item.href && "bg-muted"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    )
}
