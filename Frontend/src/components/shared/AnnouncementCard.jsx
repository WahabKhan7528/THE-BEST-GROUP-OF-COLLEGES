/*
 Shared AnnouncementCard
 
 variant="faculty" (default) — shows classSection, attachment link, date on right
 variant="student"           — simpler layout: date left, title, description only
 */
const AnnouncementCard = ({ announcement, role = 'faculty' }) => {
    if (role === 'student') {
        return (
            <article className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                        <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{announcement.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                        Announcement
                    </span>
                </div>
            </article>
        );
    }

    // faculty variant (default)
    return (
        <article className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {announcement.classSection}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{announcement.description}</p>
                    {announcement.attachment && (
                        <a href={announcement.attachment} className="text-sm text-blue-700 font-semibold hover:text-blue-800 mt-2 inline-block">
                            View attachment
                        </a>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">{announcement.date}</p>
                    <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                        Announcement
                    </span>
                </div>
            </div>
        </article>
    );
};

export default AnnouncementCard;
