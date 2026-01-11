"use client"
import { getGoogleAuthUrl } from "@/app/services/auth.service";
import { useGoogleStatusQuery, useProfileQuery } from "@/app/services/queries/authQuery";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Group, Link2, Video } from "lucide-react";
import { useEffect } from "react";

export default function GeneralSettingsPage() {
    const { data: user } = useProfileQuery();
    const { data: googleStatus } = useGoogleStatusQuery(user?._id || "");
    const queryClient = useQueryClient();


    console.log(user);
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === "GOOGLE_CONNECTED") {
                queryClient.invalidateQueries({ queryKey: ["google-status", user?._id] });
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [queryClient, user?._id]);

    const handleConnectGoogle = () => {
        if (user?._id) {
            const url = getGoogleAuthUrl(user._id);
            const width = 600;
            const height = 700;
            const left = window.screenX + (window.outerWidth - width) / 2;
            const top = window.screenY + (window.outerHeight - height) / 2;

            window.open(
                url,
                "Google Calendar Connection",
                `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0,menubar=0`
            );
        }
    };
    return (
        <div className="w-full flex flex-col py-2">
            <div className="flex flex-col w-full gap-8">
                <div className="flex flex-wrap justify-between gap-3 px-4">
                    <div className="flex min-w-72 flex-col gap-2">
                        <h1 className="text-[#111618] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Integrations &amp; Meeting Services</h1>
                        <p className="text-[#64748b] dark:text-[#94a3b8] text-base font-normal leading-normal">Connect your calendar and choose your preferred video conferencing tool.</p>
                    </div>
                </div>
                <section className="flex flex-col gap-4">
                    <h2 className="text-[#111618] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">Calendar Synchronization</h2>
                    <div className="px-4">
                        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-white dark:bg-[#1a262c] p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2a3b45]">
                            <div className="flex flex-[2_2_0px] flex-col gap-6 justify-center">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400"><Calendar size={24} /> </span>
                                        </div>
                                        <p className="text-[#111618] dark:text-white text-lg font-bold leading-tight">Google Calendar</p>
                                    </div>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-normal leading-normal">Sync your availability to prevent double bookings. We will check this calendar for conflicts before creating new events.</p>
                                </div>
                                <button onClick={() => {
                                    handleConnectGoogle()
                                }} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-bold leading-normal w-fit shadow-sm">
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]"> <Link2 size={18} /> </span>
                                        Connect Account
                                    </span>
                                </button>
                            </div>
                            <div className="hidden md:block w-1/3 min-w-[200px] bg-center bg-no-repeat bg-cover rounded-lg aspect-video opacity-90" data-alt="Abstract calendar illustration with blue gradients" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBH6goi2bVouT-bqDYATpCx5iratww-c3ROK6tDj8FlWT9GJF2vtSyO63DRAlR4C9Ek-Ag9Qlc9ZPzYDG0DNBVHLBrH-wfwCc49jE57HrYbY4Z6LV5duMuyS2uKfzjijhx9fh_3hPHFm8_fC_-bUJ_kkKJaT5Dt9V9b9_ybDFRZh2jcJ2K1DtXaWKdAUuLLtM7-BLS77xUaJtiwVQO5QGudIiZ2fRqDmYYOXajvG1GyVD_xAf1tsL_b0UOVk4Xw5QAuJDaQB9wF7CY")' }}></div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 px-4">
                        <h2 className="text-[#111618] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Conferencing Providers</h2>
                        <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">Select one active provider for creating meeting links. You must connect an account before selecting it.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        <label className="relative cursor-pointer group">
                            <input checked className="peer sr-only" name="meeting-provider" type="radio" value="google-meet" />
                            <div className="custom-radio-ring flex flex-col h-full rounded-xl bg-white dark:bg-[#1a262c] p-5 shadow-sm border-2 border-[#e5e7eb] dark:border-[#2a3b45] transition-all duration-200 hover:border-primary/50">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-full bg-[#f0f3f4] dark:bg-[#2c3b45] flex items-center justify-center p-2">
                                        <span className="material-symbols-outlined text-[#111618] dark:text-white text-3xl"><Video size={24} /></span>
                                    </div>
                                    <div className="radio-indicator h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center transition-colors"></div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-[#111618] dark:text-white font-bold text-lg mb-1">Google Meet</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-xs">Standard video conferencing for Google users.</p>
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium  text-green-700 dark:bg-green-900/30 dark:text-black-400", googleStatus?.googleConnected ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-black-900/30")}>
                                        <span className={cn("size-1.5 rounded-full", googleStatus?.googleConnected ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400")}></span>
                                        {googleStatus?.googleConnected ? "Connected" : "Not Connected"}
                                    </span>
                                    <button  className="text-[#64748b] dark:text-[#94a3b8] hover:text-red-500 text-sm font-medium transition-colors">Disconnect</button>
                                </div>
                            </div>
                        </label>
                        {/* Card 2: Zoom (Not Connected) */}
                        <label className="relative cursor-not-allowed group opacity-100">
                            <input className="peer sr-only" disabled name="meeting-provider" type="radio" value="zoom" />
                            <div className="custom-radio-ring flex flex-col h-full rounded-xl bg-white dark:bg-[#1a262c] p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3b45]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-full bg-[#f0f3f4] dark:bg-[#2c3b45] flex items-center justify-center p-2">
                                        {/* Placeholder for Zoom Logo */}
                                        <span className="material-symbols-outlined text-blue-500 text-3xl"><Video /></span>
                                    </div>
                                    <div className="h-5 w-5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"></div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-[#111618] dark:text-white font-bold text-lg mb-1">Zoom</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-xs">Reliable video platform for all your meeting needs.</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#f0f3f4] dark:bg-[#2c3b45] py-2 text-sm font-bold text-[#111618] dark:text-white hover:bg-[#e2e8e9] dark:hover:bg-[#3d4f5a] transition-colors">
                                        Connect Zoom
                                    </button>
                                </div>
                            </div>
                        </label>
                        {/* Card 3: Microsoft Teams (Not Connected) */}
                        <label className="relative cursor-not-allowed group opacity-100">
                            <input className="peer sr-only" disabled name="meeting-provider" type="radio" value="teams" />
                            <div className="custom-radio-ring flex flex-col h-full rounded-xl bg-white dark:bg-[#1a262c] p-5 shadow-sm border border-[#e5e7eb] dark:border-[#2a3b45]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-12 w-12 rounded-full bg-[#f0f3f4] dark:bg-[#2c3b45] flex items-center justify-center p-2">
                                        {/* Placeholder for Teams Logo */}
                                        <span className="material-symbols-outlined text-purple-600 text-3xl"><Group size={24} /></span>
                                    </div>
                                    <div className="h-5 w-5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"></div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-[#111618] dark:text-white font-bold text-lg mb-1">Microsoft Teams</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-xs">Integrated meetings for Microsoft 365 users.</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#f0f3f4] dark:bg-[#2c3b45] py-2 text-sm font-bold text-[#111618] dark:text-white hover:bg-[#e2e8e9] dark:hover:bg-[#3d4f5a] transition-colors">
                                        Connect Teams
                                    </button>
                                </div>
                            </div>
                        </label>
                    </div>
                </section>
                {/* Bottom Info / Help */}
                <div className="px-4 py-6">
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/10 p-4 border border-blue-100 dark:border-blue-800/30 flex gap-3 items-start">
                        <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                        <div className="flex flex-col gap-1">
                            <p className="text-[#111618] dark:text-white text-sm font-semibold">Need help setting up?</p>
                            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">Read our integration guide to learn more about how we sync your data securely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
