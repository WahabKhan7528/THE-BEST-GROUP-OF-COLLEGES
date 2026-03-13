
import Card from '../shared/Card';

const AnnouncementCard = ({ announcement, role = 'faculty' }) => {
    const isStudent = role === 'student';
    const { date, title, description, classSection, instructor, attachment } = announcement;

    return (
        <Card hover={false} className="p-5 border border-transparent dark:border-college-gold/60 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    {/* Unified Header: Class Section • Date */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-college-navy dark:text-college-gold uppercase tracking-wider">
                            {classSection}
                        </span>
                        <span className="text-[10px] text-gray-300 dark:text-white/20">•</span>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                            {date}
                        </p>
                    </div>

                    <h3 className="text-lg font-bold text-college-navy dark:text-white leading-tight">
                        {title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                        {description}
                    </p>

                    {/* Footer Info (Shows if exists) */}
                    {instructor && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">
                            Posted by {instructor}
                        </p>
                    )}
                    
                    {attachment && (
                        <a 
                            href={attachment} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm text-college-navy dark:text-college-gold font-bold hover:underline mt-4 inline-flex items-center gap-1 transition-all"
                        >
                            View attachment
                        </a>
                    )}
                </div>

                {/* Right side Badge */}
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-college-navy/10 dark:border-college-gold/20 shrink-0">
                    Announcement
                </span>
            </div>
        </Card>
    );
};

export default AnnouncementCard;
