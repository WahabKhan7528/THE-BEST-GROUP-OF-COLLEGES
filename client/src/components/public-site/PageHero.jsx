import { clsx } from "clsx";
import Badge from "../shared/Badge";

export default function PageHero({ badge, title, highlightedWord, description, className }) {
    return (
        <section
            className={clsx(
                "relative overflow-hidden bg-college-navy text-white py-14 md:py-20",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {badge && (
                        <Badge variant="gold" className="mb-6">
                            {badge}
                        </Badge>
                    )}
                    {title && (
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 md:mb-6">
                            {title}{" "}
                            {highlightedWord && (
                                <span className="text-college-gold">{highlightedWord}</span>
                            )}
                        </h1>
                    )}
                    {description && (
                        <p className="text-base md:text-xl text-white/80 leading-relaxed">{description}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
