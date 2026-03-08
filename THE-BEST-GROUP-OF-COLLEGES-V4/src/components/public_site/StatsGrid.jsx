import { clsx } from "clsx";

export default function StatsGrid({ stats, className }) {
    return (
        <div
            className={clsx(
                "grid gap-6 md:gap-8 w-full max-w-6xl mx-auto py-10 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 grid-cols-2 lg:grid-cols-4",
                className
            )}
        >
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="text-center group flex flex-col items-center">
                        <div className="mb-4 text-college-gold transition-transform group-hover:scale-110">
                            {Icon && <Icon className="h-10 w-10" strokeWidth={1.5} />}
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 text-college-navy">
                            {stat.value}
                        </div>
                        <div className="text-gray-600 font-sans uppercase tracking-wider text-sm font-semibold">
                            {stat.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
