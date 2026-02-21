import { useStudentContext } from "../../context/StudentContext";
import AnnouncementCard from "../../components/shared/AnnouncementCard";
import { Megaphone } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Megaphone size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
              Student Portal
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold uppercase tracking-wide">
              {campusNames[campus]}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            News & Events
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Stay updated with the latest announcements, events, and important notices from the administration.
          </p>
        </div>
      </div>

      {announcements.length > 0 ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AnnouncementCard announcement={announcement} role="student" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Megaphone size={30} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No announcements found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            There are no new announcements for {campusNames[campus]} at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default News;
