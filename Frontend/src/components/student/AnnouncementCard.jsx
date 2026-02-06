const AnnouncementCard = ({ announcement }) => {
  return (
    <article className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{announcement.date}</p>
          <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{announcement.description}</p>
        </div>
        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
          Announcement
        </span>
      </div>
    </article>
  );
};

export default AnnouncementCard;

