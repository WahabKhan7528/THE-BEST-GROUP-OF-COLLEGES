import { useStudentContext } from "../../context/StudentContext";
import AnnouncementCard from "../../components/student/AnnouncementCard";

// Mock announcements/news data by campus
const announcementsByCampus = {
  main: [
    {
      title: "Mid-term examination schedule released",
      date: "Sept 12, 2025",
      description:
        "Check the examinations tab for detailed timetable, room allocations, and allowed materials.",
    },
    {
      title: "AI Club workshop: Building with LangChain",
      date: "Sept 15, 2025",
      description:
        "Hands-on session this Friday 3 PM in Lab 4. Seats are limited—register via the portal.",
    },
    {
      title: "Library extends weekend hours",
      date: "Sept 10, 2025",
      description:
        "The central library will remain open until 10 PM on Saturdays and Sundays for the semester.",
    },
  ],
  law: [
    {
      title: "Legal Aid Clinic Applications Open",
      date: "Sept 13, 2025",
      description:
        "Students interested in the legal aid clinic can apply now. Experience practical legal work.",
    },
    {
      title: "Moot Court Finals Announced",
      date: "Sept 11, 2025",
      description:
        "The final rounds of the annual moot court competition will be held Sept 25-27.",
    },
  ],
  hala: [
    {
      title: "Annual Business Expo",
      date: "Sept 20, 2025",
      description:
        "Join us for our annual business expo featuring industry leaders and networking opportunities.",
    },
    {
      title: "Entrepreneurship Bootcamp",
      date: "Sept 8, 2025",
      description:
        "Free 3-week bootcamp on starting your own business. Limited seats available.",
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const News = () => {
  const { getCurrentCampus } = useStudentContext();
  const campus = getCurrentCampus();
  const announcements = announcementsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <p className="text-sm text-gray-500">News & Events</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Announcements from Admin
        </h1>
        <p className="text-sm text-blue-600 mt-2">📍 {campusNames[campus]}</p>
      </div>

      {announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.title}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No announcements for {campusNames[campus]} yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default News;
