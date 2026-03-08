import { clsx } from "clsx";
import Badge from "./Badge";
import PublicButton from "../shared/PublicButton";

export default function ProgramCard({ program, className }) {
    return (
        <div
            className={clsx(
                "bg-white overflow-hidden ease-out cursor-pointer group h-full border-t-4 border-t-college-gold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-1.5 p-6 flex flex-col",
                className
            )}
        >
            <div className="flex items-start justify-between mb-6">
                <Badge variant="outline">
                    {program.duration} COURSE
                </Badge>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors">
                {program.title}
            </h3>
            <p className="text-gray-500 text-base mb-6 flex-grow leading-relaxed font-sans">
                {program.description}
            </p>

            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="flex items-center text-xs font-black text-gray-600 uppercase tracking-[0.15em]">
                    {program.seats} AVAILABLE SEATS
                </span>
                <PublicButton to="/admissions" variant="primary" size="sm" className="rounded px-5 font-bold" shape="slanted">
                    APPLY
                </PublicButton>
            </div>
        </div>
    );
}
