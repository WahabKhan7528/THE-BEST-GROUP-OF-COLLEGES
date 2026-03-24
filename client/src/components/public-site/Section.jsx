import { clsx } from "clsx";

const variants = {
    navy: "bg-college-navy text-white",
    white: "bg-white text-gray-900",
    gray: "bg-gray-50 text-gray-900",
    gold: "bg-college-gold text-college-navy",
};

export default function Section({ variant = "white", className, id, children }) {
    return (
        <section
            id={id}
            className={clsx(
                "relative overflow-hidden py-14 md:py-20",
                variants[variant],
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {children}
            </div>
        </section>
    );
}
