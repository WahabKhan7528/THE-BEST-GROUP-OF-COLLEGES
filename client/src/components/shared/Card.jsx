import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
    default:
        "bg-white dark:bg-college-navy border border-gray-200 dark:border-college-navy/20 rounded-sm shadow-sm",
    navy:
        "bg-college-navy border border-college-gold/20 rounded-sm shadow-sm",
    stat:
        "bg-college-navy/5 dark:bg-college-gold/10 border border-college-navy/10 dark:border-college-gold/15 rounded-sm shadow-sm",
};

export default function Card({ variant = "default", hover = true, className, children }) {
    return (
        <div
            className={twMerge(
                clsx(
                    "overflow-hidden transition-all duration-300 ease-out",
                    variants[variant],
                    hover && "hover:shadow-xl hover:-translate-y-1.5 cursor-pointer",
                    className
                )
            )}
        >
            {children}
        </div>
    );
}
