import { clsx } from "clsx";

const variants = {
    default:
        "bg-white dark:bg-college-navy border border-gray-200 dark:border-college-navy/20 rounded-2xl shadow-sm",
    navy:
        "bg-college-navy border border-college-gold/20 rounded-2xl shadow-sm",
    glass:
        "bg-white/70 dark:bg-dark-surface/80 backdrop-blur-xl border border-white/40 dark:border-dark-border rounded-2xl shadow-sm",
    stat:
        "bg-college-navy/5 dark:bg-college-gold/10 border border-college-navy/10 dark:border-college-gold/15 rounded-2xl shadow-sm",
};

export default function Card({ variant = "default", hover = true, className, children }) {
    return (
        <div
            className={clsx(
                "overflow-hidden transition-all duration-300 ease-out",
                variants[variant],
                hover && "hover:shadow-xl hover:-translate-y-1.5 cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}
