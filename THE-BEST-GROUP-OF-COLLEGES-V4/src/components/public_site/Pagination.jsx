import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}) {
    if (totalPages <= 1) return null;

    return (
        <div className={clsx("flex items-center justify-center gap-2", className)}>
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx + 1}
                    onClick={() => onPageChange(idx + 1)}
                    className={clsx(
                        "w-10 h-10 rounded-lg border flex items-center justify-center font-medium transition-colors",
                        currentPage === idx + 1
                            ? "bg-college-gold border-college-gold text-college-navy"
                            : "border-gray-300 hover:bg-gray-50"
                    )}
                >
                    {idx + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
