import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight, Calendar } from "lucide-react";
import { clsx } from "clsx";
import Card from "./Card";
import Badge from "./Badge";
import NewsEventPopover from "./NewsEventPopover";

export default function EventCard({ event, className }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card
                variant="navy"
                hover
                className={clsx("p-6 md:p-8 group !rounded-lg border-white/10", className)}
                onClick={() => setIsModalOpen(true)}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/10 text-white p-3 rounded-lg text-center min-w-[60px] border border-white/5">
                        <div className="text-xl font-bold leading-none">{event.date.split(" ")[0]}</div>
                        <div className="text-[10px] uppercase font-bold tracking-tighter text-white/60">{event.date.split(" ")[1]}</div>
                    </div>
                    {event.status && (
                        <Badge variant="subtle" className="text-[10px] bg-white/10 text-white border-none">
                            {event.status}
                        </Badge>
                    )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-college-gold transition-colors">
                    {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <Clock className="w-3.5 h-3.5 text-college-gold" />
                        {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <MapPin className="w-3.5 h-3.5 text-college-gold" />
                        {event.location}
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                    }}
                    className="text-xs font-bold text-college-gold flex items-center gap-1 hover:gap-2 transition-all"
                >
                    Event Details <ArrowRight className="w-3 h-3" />
                </button>
            </Card>

            <NewsEventPopover
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={event.title}
            >
                <div className="space-y-6">
                    {/* Event Banner/Image */}
                    {event.image && (
                        <div className="aspect-video w-full overflow-hidden rounded-xl">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Event Meta Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm">
                                <Calendar className="w-5 h-5 text-college-gold" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider leading-none mb-1">Date</p>
                                <p className="text-sm font-bold text-white">{event.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm">
                                <Clock className="w-5 h-5 text-college-gold" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider leading-none mb-1">Time</p>
                                <p className="text-sm font-bold text-white">{event.time}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:col-span-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shadow-sm">
                                <MapPin className="w-5 h-5 text-college-gold" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-white/40 font-bold tracking-wider leading-none mb-1">Location</p>
                                <p className="text-sm font-bold text-white">{event.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Event Full Description */}
                    <div className="prose prose-sm sm:prose-base max-w-none">
                        <p className="text-white/80 leading-relaxed text-base sm:text-lg font-medium">
                            {event.description}
                        </p>
                    </div>

                    {/* Status Badge */}
                    {event.status && (
                        <div className="pt-4 flex justify-end">
                            <Badge variant="subtle" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-white/10 text-white border-none">
                                {event.status}
                            </Badge>
                        </div>
                    )}
                </div>
            </NewsEventPopover>
        </>
    );
}
