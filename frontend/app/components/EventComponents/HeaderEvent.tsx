"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

export const HeaderEvent = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="flex flex-wrap justify-between items-end gap-4 pb-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-[#111618] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">{title}</h1>
                <p className="text-[#617f89] dark:text-slate-400 text-base font-normal leading-normal">{description}</p>
            </div>
            <Link href="/appointments" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-primary hover:bg-sky-400 text-white shadow-lg shadow-primary/30 transition-all active:scale-95">
                <Plus size={20} className="mr-2" />
                <span className="text-sm font-bold leading-normal tracking-[0.015em]">New Event</span>
            </Link>
        </div>
    );
};