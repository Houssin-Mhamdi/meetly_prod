"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, Search, X } from "lucide-react";

interface SearchEventProps {
    searchQuery: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
}

export const SearchEvent = memo(({
    searchQuery,
    handleSearchChange,
    onClear
}: SearchEventProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900/50 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
            <div className="relative w-full md:w-96 group">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors duration-200" />
                <Input
                    type="text"
                    placeholder="Search events by title or description..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-11 pr-10 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-11 rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40 transition-all font-medium"
                />
                {searchQuery && (
                    <button
                        onClick={() => onClear?.()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            <div className="flex gap-3 w-full md:w-auto items-center">
                <Select defaultValue="all-time">
                    <SelectTrigger className="w-full md:w-[180px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 h-11 rounded-xl px-4 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <SelectValue placeholder="Select period" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                        <SelectItem value="this-week" className="rounded-lg">This Week</SelectItem>
                        <SelectItem value="next-week" className="rounded-lg">Next Week</SelectItem>
                        <SelectItem value="this-month" className="rounded-lg">This Month</SelectItem>
                        <SelectItem value="all-time" className="rounded-lg">All Time</SelectItem>
                    </SelectContent>
                </Select>

                <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onClear?.()}
                    className="h-11 px-4 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 font-bold transition-all"
                >
                    Clear Filters
                </Button>
            </div>
        </div>
    );
});

SearchEvent.displayName = "SearchEvent";