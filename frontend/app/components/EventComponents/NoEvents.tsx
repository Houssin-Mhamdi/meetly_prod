import { Calendar } from "lucide-react";

export const NoEvents = ({ title, description }: { title: string; description?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-surface-light dark:bg-surface-dark rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <Calendar size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">{title}</p>
            <p className="text-slate-500 font-medium">{description || ""}</p>
        </div>
    );
};