import { clsx } from "clsx";

const variants = {
    gold: "bg-college-gold/10 text-college-gold border border-college-gold/30",
    outline: "bg-transparent text-college-navy dark:text-white border border-college-navy dark:border-white/30",
    subtle: "bg-gray-100 dark:bg-dark-elevated text-college-navy dark:text-white/80",
    success: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/40",
    warning: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/40",
    danger: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700/40",
    info: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-700/40",
    navy: "bg-college-navy/10 text-college-navy border border-college-navy/30",
};

export default function Badge({ variant = "outline", className, children }) {
    return (
        <span
            className={clsx(
                "inline-flex flex-col sm:flex-row items-center justify-center text-center font-bold tracking-wider uppercase rounded transition-all duration-200 px-3 py-1 text-xs",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
