import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PublicButton from "../shared/PublicButton";

export default function TestimonialSlider({ testimonials }) {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    };

    const scrollRight = () => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    };

    return (
        <div className="relative z-10 max-w-6xl mx-auto mt-10">
            {/* Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between z-20 pointer-events-none p-4">
                <PublicButton
                    variant="primary"
                    size="sm"
                    onClick={scrollLeft}
                    className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 pointer-events-auto"
                    aria-label="Previous testimonials"
                >
                    <ChevronLeft className="w-6 h-6" />
                </PublicButton>
                <PublicButton
                    variant="primary"
                    size="sm"
                    onClick={scrollRight}
                    className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 pointer-events-auto"
                >
                    <ChevronRight className="w-6 h-6" />
                </PublicButton>
            </div>

            <div ref={containerRef} className="overflow-x-auto no-scrollbar scroll-smooth px-12 md:px-20 pb-10">
                <div className="flex items-stretch gap-8 w-max">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-[320px] md:w-[450px] flex h-auto">
                            <div className="flex-1 h-full">
                                <div className="p-8 rounded-2xl relative shrink-0 flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 h-full">
                                    <div className="absolute top-6 left-6 opacity-30 text-8xl font-serif leading-none h-16 text-college-gold">
                                        &ldquo;
                                    </div>
                                    <p className="text-lg relative z-10 mb-8 leading-relaxed mt-6 flex-grow text-gray-300">
                                        {testimonial.content}
                                    </p>
                                    <div className="flex items-center gap-4 border-t pt-6 mt-auto border-white/10">
                                        <div>
                                            <h4 className="font-bold text-lg text-college-gold">{testimonial.name}</h4>
                                            <p className="text-sm uppercase tracking-wider text-white/60">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
