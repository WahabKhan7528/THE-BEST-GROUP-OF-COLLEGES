import Badge from "../shared/Badge";
import PublicButton from "../shared/PublicButton";
import Card from "../shared/Card";

export default function ProgramCard({ program, className, variant = "default" }) {
    const shouldShowApplyButton = variant !== "overview";

    return (
        <Card className={"group h-full p-6 flex flex-col " + (className || "")}> 
            <div className="flex items-start justify-between mb-6">
                <Badge variant="outline">
                    {program.duration} COURSE
                </Badge>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy">
                {program.title}
            </h3>
            <p className="text-gray-500 text-base mb-6 flex-grow leading-relaxed font-sans">
                {program.description}
            </p>

            {shouldShowApplyButton && (
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-end">
                    <PublicButton to="/admissions" variant="primary" size="sm" className="rounded px-5 font-bold" shape="slanted">
                        APPLY
                    </PublicButton>
                </div>
            )}
        </Card>
    );
}
