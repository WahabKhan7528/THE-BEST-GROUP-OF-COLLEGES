import { useState } from "react";
import { useFacultyContext } from "../../context/FacultyContext";
import AnnouncementCard from "../../components/faculty/AnnouncementCard";
import { X, Plus } from "lucide-react";

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



const PostAnnouncementForm = ({ classes, onClose, onPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || selectedClasses.length === 0) {
      alert("Please fill all fields and select at least one class.");
      return;
    }

    const newAnnouncement = {
      title,
      description,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      classSection: selectedClasses.map(id => classes.find(c => c.id === id)?.code).join(", "),
      classes: selectedClasses // Store IDs for logic if needed
    };

    onPost(newAnnouncement);
    onClose();
  };

  const toggleClass = (id) => {
    setSelectedClasses(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">New Announcement</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              placeholder="e.g. Quiz on Monday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              placeholder="Details about the announcement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Classes</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {classes.map(cls => (
                <label key={cls.id} className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all ${selectedClasses.includes(cls.id) ? 'bg-primary-50 border-primary-200' : 'hover:bg-gray-50 border-gray-200'}`}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded"
                    checked={selectedClasses.includes(cls.id)}
                    onChange={() => toggleClass(cls.id)}
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">
                    {cls.code} <span className="text-xs text-gray-500">({cls.section})</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-sm">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Announcements = () => {
  const { getCurrentCampus, getClassesByCurrentCampus } = useFacultyContext(); // Get classes getter
  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus(); // Get array of classes

  // Initialize from localStorage or mock data
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("college_announcements");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed[campus] || [];
    }
    return announcementsByCampus[campus] || [];
  });

  const [isPosting, setIsPosting] = useState(false);

  const handlePost = (newAnnouncement) => {
    const updatedAnnouncements = [newAnnouncement, ...announcements];
    setAnnouncements(updatedAnnouncements);

    // Update localStorage
    const saved = localStorage.getItem("college_announcements");
    const allAnnouncements = saved ? JSON.parse(saved) : { ...announcementsByCampus };
    allAnnouncements[campus] = updatedAnnouncements;
    localStorage.setItem("college_announcements", JSON.stringify(allAnnouncements));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Announcements</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Class updates
            </h1>
            <p className="text-sm text-primary-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <button
            onClick={() => setIsPosting(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-md"
          >
            <Plus size={18} />
            Post Announcement
          </button>
        </div>
      </div>

      {isPosting && (
        <PostAnnouncementForm
          classes={classes}
          onClose={() => setIsPosting(false)}
          onPost={handlePost}
        />
      )}

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
          <button
            onClick={() => setIsPosting(true)}
            className="text-primary-700 font-semibold hover:text-primary-800 mt-2"
          >
            Post the first announcement →
          </button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
