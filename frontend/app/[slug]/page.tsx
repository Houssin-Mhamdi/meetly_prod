"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, Tags, ArrowUpDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useProfileBySlugQuery } from "../services/queries/authQuery";

export default function StorefrontPage({ params }: { params: { slug: string } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const param = useParams()
    const { data: profileSlug, isLoading } = useProfileBySlugQuery(typeof param.slug === 'string' ? param.slug : "")
    console.log({ profileSlug })
    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-sans antialiased text-slate-900 dark:text-white transition-colors duration-200">
            {/* Header */}
            <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="hidden md:inline">Events</span>
                    <span className="material-symbols-outlined hidden md:inline text-[14px]">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Marketplace</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined">help</span>
                    </Button>
                    <div className="hidden md:flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800 ml-2">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">Sarah J.</span>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Premium Member</span>
                        </div>
                        <Button variant="ghost" className="relative group p-0 h-auto w-auto rounded-full outline-none">
                            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                <img
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcK2VcADdVux3LSZlIMd4uyYj8MjM89DmiFIl6KBBJ-O4utMOw1gQTlmODGWE8NJ2Fd8dFweBQL7BfJgTUb7QSGcFtpnYa1SGzPh-XBFg706-VW98V0JCPJTwTd3D4yKJi09kWgoy6MBd-ckezY6LMbsxqjG2Y_IvgOX7o3uaqKSVi5wJLhw-8y0vbSbycvRV5ONA1gCW1s8wrd0ALDi3Vy0yl2IaaO9lM5eDnhgzXYOuT8F92KFRzTsAaTi8SNqijMqe9M3UYCsc"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-slate-500">
                            <span className="material-symbols-outlined">menu</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 pb-24 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8">

                    {/* Hero Banner */}
                    <div className="relative w-full bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl text-white">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary opacity-20 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex-1 max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-bold text-indigo-100 mb-6">
                                    <span className="material-symbols-outlined text-[16px]">stars</span>
                                    <span>Featured Event</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
                                    Design &amp; Tech <br /> Conference 2024
                                </h1>
                                <p className="text-indigo-100 text-lg mb-8 max-w-lg leading-relaxed opacity-90">
                                    Join 5,000+ creators for a weekend of inspiration, workshops, and networking. Early bird tickets end soon!
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-lg shadow-black/5 hover:bg-indigo-50 hover:-translate-y-0.5 transition-all flex items-center gap-2 h-auto">
                                        Get Tickets
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </Button>
                                    <Button className="px-6 py-3 bg-indigo-800/30 text-white border border-white/20 rounded-xl font-semibold hover:bg-indigo-800/50 transition-all backdrop-blur-sm h-auto">
                                        View Schedule
                                    </Button>
                                </div>
                            </div>
                            <div className="hidden md:block relative shrink-0">
                                <div className="relative bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-64 transform rotate-6 hover:rotate-2 transition-transform duration-500 shadow-2xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined">event</span>
                                        </div>
                                        <span className="text-xs font-bold bg-green-400 text-green-900 px-2 py-1 rounded-md">ON SALE</span>
                                    </div>
                                    <div className="space-y-1 mb-4">
                                        <div className="h-2 w-24 bg-white/20 rounded"></div>
                                        <div className="h-2 w-32 bg-white/40 rounded"></div>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <div className="text-3xl font-bold">$149</div>
                                        <div className="text-xs opacity-60">per person</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search/Filter Bar */}
                    <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">Events Store</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Browse tickets for workshops, conferences, and meetups.</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                                    <span className="text-slate-400 material-symbols-outlined text-[20px]! leading-none translate-y-px">
                                        search
                                    </span>
                                </div>
                                <Input
                                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary h-11 pl-10 pr-4 text-sm shadow-sm transition-all outline-none"
                                    placeholder="Search for events..."
                                    type="text"
                                />
                            </div>

                            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                                <Select>
                                    <SelectTrigger className="flex-none w-[140px] md:w-[160px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-11 rounded-xl px-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Tags size={16} className="text-primary" />
                                            <SelectValue placeholder="Category" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                                        <SelectItem value="technology" className="rounded-lg">Technology</SelectItem>
                                        <SelectItem value="business" className="rounded-lg">Business</SelectItem>
                                        <SelectItem value="arts" className="rounded-lg">Arts &amp; Culture</SelectItem>
                                        <SelectItem value="wellness" className="rounded-lg">Wellness</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="flex-none w-[140px] md:w-[160px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-11 rounded-xl px-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <ArrowUpDown size={16} className="text-primary" />
                                            <SelectValue placeholder="Sort" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                                        <SelectItem value="low-to-high" className="rounded-lg">Price: Low to High</SelectItem>
                                        <SelectItem value="high-to-low" className="rounded-lg">Price: High to Low</SelectItem>
                                        <SelectItem value="soonest" className="rounded-lg">Date: Soonest</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select defaultValue="all-time">
                                    <SelectTrigger className="flex-none w-[140px] md:w-[160px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-11 rounded-xl px-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-primary" />
                                            <SelectValue placeholder="Period" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                                        <SelectItem value="this-week" className="rounded-lg">This Week</SelectItem>
                                        <SelectItem value="next-week" className="rounded-lg">Next Week</SelectItem>
                                        <SelectItem value="this-month" className="rounded-lg">This Month</SelectItem>
                                        <SelectItem value="all-time" className="rounded-lg">All Time</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 flex-none"></div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-11 px-4 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 font-bold transition-all flex-none"
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Event Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Event Card 1 */}
                        {/* TODO: Replace hardcoded gradient with dynamic event.cardGradient 
                            Example: className={`aspect-4/3 w-full bg-linear-to-br ${event.cardGradient?.from || "from-indigo-500"} ${event.cardGradient?.to || "to-purple-600"} relative overflow-hidden`}
                        */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative"
                        >
                            <div className="aspect-4/3 w-full bg-linear-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold shadow-sm">Technology</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center text-slate-400 text-xs mb-2">
                                    <span className="material-symbols-outlined text-[16px] mr-1.5">calendar_month</span>
                                    <span>Oct 15, 2024</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                                    Global Tech Innovators Summit 2024
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                    Join industry leaders for a day of groundbreaking keynotes and networking opportunities.
                                </p>
                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Price</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">$299.00</span>
                                    </div>
                                    <div className="px-5 py-2.5 bg-primary text-white hover:bg-primary/90 text-sm font-bold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                        Book Now
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Card 2 */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative"
                        >
                            <div className="aspect-4/3 w-full bg-linear-to-br from-orange-400 to-red-500 relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur text-orange-700 text-xs font-bold shadow-sm">Community</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center text-slate-400 text-xs mb-2">
                                    <span className="material-symbols-outlined text-[16px] mr-1.5">calendar_month</span>
                                    <span>Nov 02, 2024</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                                    Downtown Food Festival
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                    Taste dishes from over 50 local vendors. Live music and family activities included.
                                </p>
                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Price</span>
                                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Free</span>
                                    </div>
                                    <div className="px-5 py-2.5 bg-primary text-white hover:bg-primary/90 text-sm font-bold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
                                        Get Ticket
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Card 3 */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative"
                        >
                            <div className="aspect-4/3 w-full bg-emerald-50 dark:bg-emerald-900/30 relative overflow-hidden flex items-center justify-center">
                                <span className="material-symbols-outlined text-emerald-300 dark:text-emerald-700/50 absolute -bottom-4 -right-4 text-[140px] rotate-[-15deg]">
                                    self_improvement
                                </span>
                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 relative z-10 drop-shadow-sm text-[64px]">
                                    self_improvement
                                </span>
                                <div className="absolute top-3 left-3 z-20">
                                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur text-emerald-700 text-xs font-bold shadow-sm">Wellness</span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center text-slate-400 text-xs mb-2">
                                    <span className="material-symbols-outlined text-[16px] mr-1.5">calendar_month</span>
                                    <span>Weekly Series</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                                    Sunrise Yoga in the Park
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                    Start your day with energy and balance. All levels welcome. Bring your own mat.
                                </p>
                                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Price</span>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white">$20.00</span>
                                    </div>
                                    <div className="px-5 py-2.5 bg-primary text-white hover:bg-primary/90 text-sm font-bold rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                        Book Now
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* More cards can be added here following the same pattern */}
                    </div>
                </div>

                {/* Footer */}
                <footer className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center pb-8">
                    <p className="text-xs text-slate-400 dark:text-slate-600">© 2024 Event Manager Inc. All rights reserved.</p>
                </footer>
            </main>

            {/* Modal Backdrop & Container */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all duration-300">
                    <div
                        className="absolute inset-0"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Book Event</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Time Slot Selection &amp; Details</p>
                            </div>
                            <button
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto">
                            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Select a Time Slot</span>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { id: 'slot1', date: 'Oct 15, 2024', time: '09:00 AM - 11:00 AM', loc: 'Main Hall', icon: 'calendar_today', color: 'blue' },
                                            { id: 'slot2', date: 'Oct 15, 2024', time: '01:00 PM - 03:00 PM', loc: 'Workshop A', icon: 'schedule', color: 'purple' },
                                            { id: 'slot3', date: 'Oct 16, 2024', time: '10:00 AM - 12:00 PM', loc: 'Networking', icon: 'groups', color: 'emerald' },
                                        ].map((slot) => (
                                            <label key={slot.id} className="relative cursor-pointer group">
                                                <input className="sr-only peer" name="time_slot" type="radio" value={slot.id} defaultChecked={slot.id === 'slot1'} />
                                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all bg-white dark:bg-slate-800/50 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-full bg-${slot.color}-50 dark:bg-${slot.color}-900/30 flex items-center justify-center text-${slot.color}-600 dark:text-${slot.color}-400`}>
                                                            <span className="material-symbols-outlined text-[20px]">{slot.icon}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{slot.date}</span>
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">{slot.time} • {slot.loc}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center transition-all peer-checked:border-primary">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 scale-0 transition-all duration-200 peer-checked:opacity-100 peer-checked:scale-100"></div>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-slate-800" />

                                <div className="flex flex-col gap-3">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Your Details</span>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</span>
                                            <Input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary h-10 px-3 outline-none" placeholder="Jane Doe" type="text" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</span>
                                            <Input className="rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary h-10 px-3 outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</span>
                                        <Input className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary h-10 px-3 outline-none" placeholder="jane@example.com" type="email" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            Description / Notes <span className="text-slate-400 font-normal">(Optional)</span>
                                        </span>
                                        <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary resize-none p-3 outline-none" placeholder="Special requests, dietary restrictions, etc." rows={2}></textarea>
                                    </div>
                                </div>

                                <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10 flex gap-3 items-start">
                                    <span className="material-symbols-outlined text-primary mt-0.5 text-[18px]">info</span>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">
                                        A confirmation email containing your ticket QR code will be sent to your provided email address immediately after successful booking.
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors h-auto"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 h-auto">
                                <span>Confirm Booking</span>
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Styles for radio peer-checked (Next.js compatible) */}
            <style jsx>{`
        .peer:checked + div {
          border-color: var(--primary);
          background-color: color-mix(in srgb, var(--primary), transparent 96%);
          box-shadow: 0 0 0 1px var(--primary);
        }
        .peer:checked + div .check-circle-inner {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
        </div>
    );
}