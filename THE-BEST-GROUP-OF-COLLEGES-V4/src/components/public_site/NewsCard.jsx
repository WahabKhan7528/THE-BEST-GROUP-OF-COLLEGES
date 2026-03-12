import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import Card from "../shared/Card";
import Badge from "../shared/Badge";
import NewsEventPopover from "./NewsEventPopover";

export default function NewsCard({ news, className }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card
                variant="navy"
                hover
                className={clsx("flex flex-col md:flex-row !rounded-lg border-white/10", className)}
                onClick={() => setIsModalOpen(true)}
            >
                {news.image && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                )}
                <div className="p-6 md:p-8 flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        <Badge variant="subtle" className="bg-white/10 text-white border-none">{news.category}</Badge>
                        <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-college-gold" />
                            {news.date}
                        </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-college-gold transition-colors">
                        {news.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">{news.description}</p>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="text-college-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                        >
                            Read More <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>

            <NewsEventPopover
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={news.title}
            >
                <div className="space-y-6">
                    {news.image && (
                        <div className="aspect-video w-full overflow-hidden rounded-xl">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Badge variant="subtle" className="px-3 py-1">{news.category}</Badge>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium whitespace-nowrap">
                            <Calendar className="w-4 h-4 text-college-gold" />
                            {news.date}
                        </div>
                    </div>

                    <div className="prose prose-sm sm:prose-base max-w-none">
                        <p className="text-white/80 leading-relaxed text-base sm:text-lg font-medium">
                            {news.description}
                        </p>
                    </div>
                </div>
            </NewsEventPopover>
        </>
    );
}
