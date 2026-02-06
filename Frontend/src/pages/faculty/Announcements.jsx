import { useFacultyContext } from "../../context/FacultyContext";
import AnnouncementCard from "../../components/faculty/AnnouncementCard";

// Mock announcements data by campus
const announcementsByCampus = {
  main: [
    {
      title: "Mid-term exam instructions",
      description:
        "Bring university ID, only blue/black pens allowed. Calculators permitted for Section B.",
      date: "Sept 12, 2025",
      classSection: "BSCS - A",
      attachment: "#",
    },
    {
      title: "Project milestone feedback posted",
      description:
        "Feedback shared on the portal; review comments and update your design docs.",
      date: "Sept 10, 2025",
      classSection: "BSCS - B",
    },
    {
      title: "Guest lecture next week",
      description:
        "Industry talk on distributed systems, Tuesday 11 AM, Auditorium 2.",
      date: "Sept 9, 2025",
      classSection: "BSCS - A",
    },
  ],
  law: [
    {
      title: "Moot court finals schedule",
      description:
        "Finals will be held in the Moot Court Hall, Sept 25-27. Register by Sept 20.",
      date: "Sept 11, 2025",
      classSection: "LLB - A",
    },
    {
      title: "Law library extended hours",
      description:
        "The law library will remain open until 10 PM during exam season.",
      date: "Sept 8, 2025",
      classSection: "LLB - A",
    },
  ],
  hala: [
    {
      title: "Business plan competition",
      description:
        "Register your team for the annual business plan competition by Sept 20.",
      date: "Sept 10, 2025",
      classSection: "BBA - A",
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Announcements = () => {
  const { getCurrentCampus } = useFacultyContext();
  const campus = getCurrentCampus();
  const announcements = announcementsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Announcements</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Class updates
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800">
            Post Announcement (mock)
          </button>
        </div>
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
          <button className="text-purple-700 font-semibold hover:text-purple-800 mt-2">
            Post the first announcement →
          </button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
