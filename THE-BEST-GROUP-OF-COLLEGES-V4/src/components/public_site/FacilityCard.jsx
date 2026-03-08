import { clsx } from "clsx";

export default function FacilityCard({ facility, className }) {
    return (
        <div
            className={clsx(
                "group relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out p-8 h-full flex flex-col items-start text-left cursor-pointer",
                className
            )}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-college-gold/5 rounded-bl-[100px] z-0 group-hover:scale-110 transition-transform duration-700 ease-out" />

            <div className="relative z-10 w-10 h-1 bg-college-gold mb-6 group-hover:w-16 transition-all duration-500 ease-out" />

            <h3 className="relative z-10 text-xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors duration-300">
                {facility.title}
            </h3>

            <p className="relative z-10 text-gray-500 text-sm leading-relaxed font-sans group-hover:text-gray-700 transition-colors duration-300">
                {facility.description}
            </p>
        </div>
    );
}
