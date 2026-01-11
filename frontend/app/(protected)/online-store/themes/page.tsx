"use client"

import React, { useState } from "react"
import {
    Layout,
    Image as ImageIcon,
    Filter,
    SortAsc,
    Search,
    Check,
    Palette,
    Eye,
    ChevronDown,
    Zap,
    Moon,
    Sun,
    Monitor,
    Smartphone,
    Plus,
    ShoppingCart,
    Lock,
    LayoutGrid,
    ExternalLink
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useProfileQuery } from "@/app/services/queries/authQuery"

// --- Custom Components ---

const CustomToggle = ({ checked, onChange, title, description, icon: Icon }: {
    checked: boolean,
    onChange: (val: boolean) => void,
    title: string,
    description: string,
    icon: any
}) => (
    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-700">
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-gray-400" />
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-neutral-700"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                    checked ? "translate-x-5" : "translate-x-1"
                )}
            />
        </button>
    </div>
)

export default function ThemesPage() {
    // State for customization
    const [selectedTheme, setSelectedTheme] = useState("modern")
    const [showBanner, setShowBanner] = useState(true)
    const [showCategoryFilter, setShowCategoryFilter] = useState(true)
    const [showSort, setShowSort] = useState(false)
    const [showSearch, setShowSearch] = useState(true)
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
    const [primaryColor, setPrimaryColor] = useState("#4f46e5") // Indigo-600

    const { data: profile } = useProfileQuery()
    const slug = profile?.slug

    const handlePreview = () => {
        if (slug) {
            window.open(`http://localhost:3000/${slug}`, "_blank")
        }
    }

    const themes = [
        {
            id: "modern",
            name: "Modern Light",
            description: "Clean & Airy",
            previewClass: "bg-linear-to-br from-white to-gray-100",
            innerClass: "bg-white shadow-xs"
        },
        {
            id: "dark",
            name: "Professional Dark",
            description: "Sleek & Serious",
            previewClass: "bg-linear-to-br from-gray-800 to-black",
            innerClass: "bg-gray-700 shadow-xs"
        },
        {
            id: "midnight",
            name: "Midnight",
            description: "Vibrant Contrast",
            previewClass: "bg-indigo-950",
            innerClass: "bg-indigo-400/20 backdrop-blur-sm shadow-xs"
        },
    ]

    const colors = [
        { hex: "#4f46e5", class: "bg-indigo-600" },
        { hex: "#f97316", class: "bg-orange-500" },
        { hex: "#10b981", class: "bg-emerald-500" },
        { hex: "#6366f1", class: "bg-indigo-500" },
    ]

    return (
        <div className="flex h-screen bg-white dark:bg-neutral-950 overflow-hidden">
            {/* Left Side: Settings Panel */}
            <aside className="w-[450px] flex flex-col bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 overflow-y-auto shrink-0">
                {/* Breadcrumbs & Heading */}
                <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <a className="text-gray-500 text-sm font-medium hover:text-indigo-600" href="#">Settings</a>
                        <span className="text-gray-400 text-sm font-medium">/</span>
                        <span className="text-sm font-semibold">Store Customization</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-black leading-tight tracking-tighter">Store Customization</h1>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-xs font-bold border-indigo-600/20 text-indigo-600 hover:bg-indigo-50"
                            onClick={handlePreview}
                            disabled={!slug}
                        >
                            <ExternalLink className="w-3 h-3" />
                            View Live
                        </Button>
                    </div>
                    <p className="text-gray-500 text-sm">Fine-tune the presentation of your ticketing storefront. Changes are previewed in real-time.</p>
                </div>

                {/* Theme Selection */}
                <section className="border-t border-gray-100 dark:border-neutral-800 pt-6">
                    <h2 className="px-6 text-lg font-bold mb-4 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-indigo-600" />
                        Visual Themes
                    </h2>
                    <div className="flex overflow-x-auto gap-4 px-6 pb-6 hide-scrollbar">
                        {themes.map((theme) => (
                            <div
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className={cn(
                                    "min-w-[160px] flex flex-col gap-3 group cursor-pointer transition-all",
                                    selectedTheme !== theme.id && "opacity-70 hover:opacity-100"
                                )}
                            >
                                <div className={cn(
                                    "relative w-full aspect-4/3 rounded-xl flex items-center justify-center overflow-hidden transition-all",
                                    selectedTheme === theme.id
                                        ? "border-4 border-indigo-600 ring-4 ring-indigo-600/10"
                                        : "border-2 border-gray-200 dark:border-neutral-700"
                                )}>
                                    <div className={cn("absolute inset-0", theme.previewClass)} />
                                    <div className={cn("z-10 p-2 rounded w-1/2 h-1/2", theme.innerClass)} />
                                    {selectedTheme === theme.id && (
                                        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-0.5 rounded-full">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{theme.name}</p>
                                    <p className="text-xs text-gray-500">{theme.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Layout Options */}
                <section className="border-t border-gray-100 dark:border-neutral-800 p-6 space-y-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5 text-indigo-600" />
                        Layout Components
                    </h2>
                    <div className="space-y-4">
                        <CustomToggle
                            title="Storefront Banner"
                            description="Full-width hero section"
                            checked={showBanner}
                            onChange={setShowBanner}
                            icon={ImageIcon}
                        />
                        <CustomToggle
                            title="Search Bar"
                            description="Allow users to find events"
                            checked={showSearch}
                            onChange={setShowSearch}
                            icon={Search}
                        />
                        <CustomToggle
                            title="Category Filter"
                            description="Tabs for event types"
                            checked={showCategoryFilter}
                            onChange={setShowCategoryFilter}
                            icon={Filter}
                        />
                        <CustomToggle
                            title="Sort Options"
                            description="Date, price, popularity"
                            checked={showSort}
                            onChange={setShowSort}
                            icon={SortAsc}
                        />
                    </div>
                </section>

                {/* Branding */}
                <section className="border-t border-gray-100 dark:border-neutral-800 p-6 pb-20">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-600" />
                        Brand Style
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Primary Branding Color</label>
                            <div className="flex gap-2">
                                {colors.map((color) => (
                                    <div
                                        key={color.hex}
                                        onClick={() => setPrimaryColor(color.hex)}
                                        className={cn(
                                            "size-10 rounded-lg cursor-pointer transition-all",
                                            color.class,
                                            primaryColor === color.hex && "border-2 border-white ring-2 ring-indigo-600 shadow-lg scale-110"
                                        )}
                                    />
                                ))}
                                <div className="size-10 rounded-lg border border-gray-200 dark:border-neutral-700 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </aside>

            {/* Right Side: Live Preview */}
            <main className="flex-1 bg-gray-100 dark:bg-neutral-950 p-10 flex flex-col items-center justify-start overflow-y-auto">
                {/* View Toggles */}
                <div className="mb-6 flex gap-4">
                    <button
                        onClick={() => setViewMode("desktop")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full shadow-xs border text-xs font-bold transition-all",
                            viewMode === "desktop"
                                ? "bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-indigo-600"
                                : "bg-gray-50 dark:bg-neutral-900 border-transparent text-gray-500"
                        )}
                    >
                        <Monitor className="w-4 h-4" />
                        Desktop
                    </button>
                    <button
                        onClick={() => setViewMode("mobile")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full shadow-xs border text-xs font-bold transition-all",
                            viewMode === "mobile"
                                ? "bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 text-indigo-600"
                                : "bg-gray-50 dark:bg-neutral-900 border-transparent text-gray-500"
                        )}
                    >
                        <Smartphone className="w-4 h-4" />
                        Mobile
                    </button>
                </div>

                {/* Preview Frame */}
                <div className={cn(
                    "bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden flex flex-col transition-all duration-500",
                    viewMode === "desktop" ? "w-full max-w-[1000px] aspect-16/10" : "w-[375px] h-[667px]"
                )}>
                    {/* Browser Chrome */}
                    <div className="h-8 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 flex items-center px-4 gap-1.5 shrink-0">
                        <div className="size-2 rounded-full bg-red-400" />
                        <div className="size-2 rounded-full bg-amber-400" />
                        <div className="size-2 rounded-full bg-emerald-400" />
                        <div className="ml-4 h-4 bg-white dark:bg-neutral-700 rounded-full w-48 border border-gray-100 dark:border-neutral-600" />
                    </div>

                    {/* Store Content */}
                    <div className={cn(
                        "flex-1 overflow-y-auto hide-scrollbar flex flex-col",
                        selectedTheme === "dark" ? "bg-gray-900 text-white" :
                            selectedTheme === "midnight" ? "bg-indigo-950 text-white" : "bg-white text-gray-900"
                    )}>
                        {/* Navigation */}
                        <nav className={cn(
                            "px-8 py-4 flex items-center justify-between border-b",
                            selectedTheme === "dark" ? "border-white/10" :
                                selectedTheme === "midnight" ? "border-indigo-800" : "border-gray-50"
                        )}>
                            <div className="flex items-center gap-2 font-black text-xl">
                                <div className="size-6 rounded" style={{ backgroundColor: primaryColor }} />
                                TECHFEST '24
                            </div>
                            <div className="flex items-center gap-6 text-sm font-medium">
                                <a href="#" className="hover:opacity-70 transition-opacity">Events</a>
                                <a href="#" className="hover:opacity-70 transition-opacity">Speakers</a>
                                <a href="#" className="hover:opacity-70 transition-opacity">About</a>
                                <ShoppingCart className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
                            </div>
                        </nav>

                        {/* Hero Banner */}
                        {showBanner && (
                            <div className="relative h-64 bg-cover bg-center flex items-center px-12 shrink-0 overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')` }}
                                />
                                <div className="relative text-white max-w-lg">
                                    <h2 className="text-4xl font-extrabold mb-4 leading-tight">Discover the Future of Innovation</h2>
                                    <p className="text-lg opacity-90 font-medium">Join 5,000+ developers, designers, and creators for 3 days of learning.</p>
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="p-8 flex-1">
                            {/* Filters & Search */}
                            {(showSearch || showCategoryFilter) && (
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    {showCategoryFilter && (
                                        <div className={cn(
                                            "flex p-1 rounded-lg self-start",
                                            selectedTheme === "midnight" ? "bg-indigo-900/50" : "bg-gray-100 dark:bg-neutral-800"
                                        )}>
                                            <button className={cn(
                                                "px-4 py-1.5 rounded-md text-sm font-bold shadow-xs transition-all",
                                                selectedTheme === "midnight" ? "bg-indigo-500 text-white" : "bg-white dark:bg-neutral-700 dark:text-white"
                                            )}>
                                                All Events
                                            </button>
                                            <button className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Conferences</button>
                                            <button className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Workshops</button>
                                        </div>
                                    )}
                                    {showSearch && (
                                        <div className="relative w-full max-sm ml-auto">
                                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                className={cn(
                                                    "w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all",
                                                    selectedTheme === "dark" || selectedTheme === "midnight"
                                                        ? "bg-neutral-900/50 border-white/10 focus:ring-white/20"
                                                        : "bg-white border-gray-200 focus:ring-indigo-600/10"
                                                )}
                                                placeholder="Search events..."
                                                type="text"
                                                readOnly
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Event Grid */}
                            <div className={cn(
                                "grid gap-6 transition-all duration-500",
                                viewMode === "desktop" ? "grid-cols-2" : "grid-cols-1"
                            )}>
                                {[1, 2].map((i) => (
                                    <div key={i} className={cn(
                                        "group rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border",
                                        selectedTheme === "dark" ? "border-white/10 bg-neutral-800/50" :
                                            selectedTheme === "midnight" ? "border-indigo-800 bg-indigo-900/30" : "border-gray-100 bg-white"
                                    )}>
                                        <div
                                            className="aspect-video bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-15${i === 1 ? '05373673302-3f1000ee8262' : '1739983358-009796411af9'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')` }}
                                        />
                                        <div className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span
                                                    className="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
                                                    style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
                                                >
                                                    {i === 1 ? 'Conference' : 'Workshop'}
                                                </span>
                                                <span className="text-xs text-gray-400">Oct {i === 1 ? '12' : '15'}, 2024</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{i === 1 ? 'AI & Ethics Global Summit' : 'Modern UI Principles'}</h3>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                                {i === 1 ? 'Exploring the intersections of machine learning and human rights.' : 'Hands-on session covering the latest design systems and tools.'}
                                            </p>
                                            <button
                                                className="w-full text-white py-2.5 rounded-lg font-bold text-sm shadow-lg transition-transform active:scale-95"
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                Get Tickets
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Secure storefront preview
                </p>
            </main>
        </div>
    )
}
