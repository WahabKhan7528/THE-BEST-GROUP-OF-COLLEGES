import { clsx } from "clsx";
import Badge from "../shared/Badge";
import PublicButton from "../shared/PublicButton";

export default function CampusCta({
    badge = "ADMISSIONS OPEN",
    title,
    highlightedWord,
    description,
    image = "/maincampus.webp",
    primaryButton = { text: "BOOK A TOUR", to: "/admissions" },
    secondaryButton = { text: "INQUIRE", to: "/contact" },
    className,
}) {
    return (
        <section
            className={clsx(
                "relative overflow-hidden bg-college-navy text-white text-center py-10 sm:py-14 md:py-20 flex items-center justify-center rounded-xl",
                className
            )}
        >
            <div className="absolute inset-0 opacity-10">
                <img
                    src={image}
                    className="w-full h-full object-cover filter grayscale"
                    alt="Campus"
                />
            </div>
            <div className="absolute inset-0 bg-college-navy/80 backdrop-blur-[2px]" />
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
                {badge && (
                    <Badge variant="gold" className="mb-6 px-5 py-1.5">
                        {badge}
                    </Badge>
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6 text-white leading-none uppercase tracking-tighter">
                    {title}{" "}
                    {highlightedWord && (
                        <span className="text-college-gold">{highlightedWord}</span>
                    )}
                </h2>
                {description && (
                    <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto font-sans">
                        {description}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">

                    {secondaryButton && (
                        <PublicButton
                            to={secondaryButton.to}
                            variant="outline"
                            size="md"
                            shape="slanted"
                            className="border-2 border-white/10"
                        >
                            {secondaryButton.text}
                        </PublicButton>
                    )}
                    {primaryButton && (
                        <PublicButton
                            to={primaryButton.to}
                            variant="secondary"
                            size="md"
                            shape="slanted"
                        >
                            {primaryButton.text}
                        </PublicButton>
                    )}
                </div>
            </div>
        </section>
    );
}
