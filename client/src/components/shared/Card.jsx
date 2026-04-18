import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variants = {
    default:
        "bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-2xl",
    navy:
        "bg-college-navy border border-college-gold/20 rounded-sm shadow-2xl",
    stat:
        "bg-college-navy/5 dark:bg-college-gold/5 border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-lg",
};

export default function Card({ variant = "default", hover = true, className, children, ...props }) {
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
            {...props}
        >
            {children}
        </div>
    );
}
