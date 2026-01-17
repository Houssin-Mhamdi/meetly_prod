"use client";

import React, { useEffect } from "react";

interface AddStaffModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function AddStaffModal({ open, onClose, children }: AddStaffModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Background overlay with premium blur */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
            />

            {/* Modal box container */}
            <div className="h-[90vh] max-w-5xl relative z-10 w-full  rounded-2xl bg-white dark:bg-[#1a2632] shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-800">
                {children}
            </div>
        </div>
    );
}