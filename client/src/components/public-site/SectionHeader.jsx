import { clsx } from "clsx";
import Badge from "../shared/Badge";

export default function SectionHeader({
    badge,
    title,
    description,
    variant = "light",
    centered = true,
    className,
}) {
    const isDark = variant === "dark";

    return (
        <div data-anim className={clsx("mb-10", centered && "text-center", className)}>
            {badge && (
                <div className={clsx("mb-4", centered && "flex justify-center")}>
                    <Badge variant={isDark ? "gold" : "outline"}>{badge}</Badge>
                </div>
            )}
            {title && (
                <h2
                    className={clsx(
                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4",
                        isDark ? "text-white" : "text-college-navy"
                    )}
                >
                    {title}
                </h2>
            )}
            <div className={clsx("h-1 bg-college-gold mt-6 mb-6 w-24", centered && "mx-auto")} />
            {description && (
                <p
                    className={clsx(
                        "text-base md:text-lg leading-relaxed max-w-2xl",
                        centered && "mx-auto",
                        isDark ? "text-white/80" : "text-gray-600"
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
