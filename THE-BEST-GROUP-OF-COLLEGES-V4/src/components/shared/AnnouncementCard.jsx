
import Card from '../public_site/Card';

const AnnouncementCard = ({ announcement, role = 'faculty' }) => {
    if (role === 'student') {
        return (
            <Card hover={false} className="p-5 border border-transparent dark:border-college-gold/60 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{announcement.description}</p>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-college-navy/10 dark:border-college-gold/20">
                        Announcement
                    </span>
                </div>
            </Card>
        );
    }

    // faculty variant (default)
    return (
        <Card hover={false} className="p-5 border border-transparent dark:border-college-gold/60 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest leading-none mb-2">
                        {announcement.classSection}
                    </p>
                    <h3 className="text-lg font-bold text-college-navy dark:text-white leading-tight">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{announcement.description}</p>
                    {announcement.attachment && (
                        <a href={announcement.attachment} className="text-sm text-college-navy dark:text-college-gold font-bold hover:underline mt-4 inline-flex items-center gap-1 transition-all">
                            View attachment
                        </a>
                    )}
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{announcement.date}</p>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-college-navy/10 dark:border-college-gold/20">
                        Announcement
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default AnnouncementCard;
