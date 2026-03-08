import { X } from "lucide-react";
import { useEffect } from "react";
import { clsx } from "clsx";

export default function NewsEventPopover({ isOpen, onClose, children, title }) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-college-navy/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={clsx(
                    "relative bg-college-navy w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 transform border border-white/10",
                    "rounded-t-3xl sm:rounded-2xl", // Bottom sheet style on mobile
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-full sm:translate-y-4 opacity-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 sticky top-0 bg-college-navy z-10">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white truncate pr-8">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6 text-white/40 group-hover:text-white" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-college-navy">
                    {children}
                </div>
            </div>
        </div>
    );
}
