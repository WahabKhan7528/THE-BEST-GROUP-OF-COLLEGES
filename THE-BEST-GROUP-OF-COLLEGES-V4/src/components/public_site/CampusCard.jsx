import { Link } from "react-router-dom";
import Card from "./Card";
import PublicButton from "../shared/PublicButton";

export default function CampusCard({ college }) {
    return (
        <Card hover className="flex flex-col group">
            {/* Top: Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Middle: Details */}
            <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-college-navy mb-4">
                    {college.name}
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                    {college.programs.slice(0, 4).map((program) => (
                        <li key={program} className="flex items-start text-gray-600 text-sm">
                            <span className="h-2 w-2 min-w-[8px] bg-college-gold rounded-full mr-3 mt-1.5" />
                            {program}
                        </li>
                    ))}
                    {college.programs.length > 4 && (
                        <li className="text-sm font-semibold text-college-navy italic">
                            + More Programs
                        </li>
                    )}
                </ul>

                {/* Bottom: Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <PublicButton to={college.path} variant="secondary" size="sm" shape="slanted">
                        View Details
                    </PublicButton>
                    <PublicButton to="/admissions" variant="primary" size="sm" shape="slanted">
                        Apply Now
                    </PublicButton>
                </div>
            </div>
        </Card>
    );
}
