import { clsx } from "clsx";
import Badge from "./Badge";

export default function CTASection({
    badge,
    title,
    highlightedWord,
    description,
    className,
    children,
}) {
    return (
        <section
            className={clsx(
                "relative overflow-hidden py-14 md:py-20 bg-college-navy text-white border-t border-white/10",
                className
            )}
        >
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {badge && (
                    <Badge variant="gold" className="mb-6">
                        {badge}
                    </Badge>
                )}
                {title && (
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight text-white">
                        {title}{" "}
                        {highlightedWord && (
                            <span className="text-college-gold">{highlightedWord}</span>
                        )}
                    </h2>
                )}
                {description && (
                    <p className="mb-10 text-lg md:text-xl font-light max-w-2xl mx-auto text-white/80">
                        {description}
                    </p>
                )}
                {children && (
                    <div className="flex flex-wrap justify-center gap-4">{children}</div>
                )}
            </div>
        </section>
    );
}
