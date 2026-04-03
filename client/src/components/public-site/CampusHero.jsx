import { clsx } from "clsx";

export default function CampusHero({ title, image, alt, className }) {
    return (
        <section
            className={clsx(
                "relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={alt || title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                />
            </div>
            <div className="absolute inset-0 z-0 bg-college-navy/50" />
            <h1 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white uppercase leading-tight tracking-wider text-center px-4 sm:px-6">
                {title}
            </h1>
        </section>
    );
}
