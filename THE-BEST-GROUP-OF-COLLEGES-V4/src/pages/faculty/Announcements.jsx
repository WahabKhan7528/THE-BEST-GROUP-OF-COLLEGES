import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementSchema } from "../../schemas/announcementSchema";
import { useFacultyContext } from "../../context/FacultyContext";
import { useToast } from "../../context/ToastContext";
import AnnouncementCard from "../../components/portal-shared/AnnouncementCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { X, Plus, Megaphone, Upload } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";

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
  const toast = useToast();
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(announcementSchema),
    defaultValues: { title: "", description: "", attachment: "", classes: [] },
  });

  const selectedClasses = watch("classes");

  const onSubmitForm = (data) => {
    const newAnnouncement = {
      title: data.title,
      description: data.description,
      attachment: data.attachment || fileLink,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      classSection: selectedClasses
        .map((id) => classes.find((c) => c.id === id)?.code)
        .join(", "),
      classes: selectedClasses,
    };

    onPost(newAnnouncement);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Mocking a link for the file
      setFileLink(URL.createObjectURL(file));
    }
  };

  const toggleClass = (id) => {
    const newValue = selectedClasses.includes(id)
      ? selectedClasses.filter((c) => c !== id)
      : [...selectedClasses, id];

    setValue("classes", newValue);
    trigger("classes"); // Trigger validation immediately
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-college-navy rounded-xl md:rounded-2xl shadow-xl w-full max-w-lg p-5 md:p-6 space-y-4 border border-gray-200 dark:border-college-gold/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-college-navy dark:text-white">
            New Announcement
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors hidden sm:block"
          >
            <X
              size={18}
              className="md:w-5 md:h-5 text-gray-500 dark:text-gray-400"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold outline-none dark:text-white"
              placeholder="e.g. Quiz on Monday"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold outline-none resize-none dark:text-white"
              placeholder="Details about the announcement..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                File Upload
              </label>
              <div className="relative group/file">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-4 py-2.5 rounded-xl border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover/file:bg-college-navy/5 dark:group-hover/file:bg-college-gold/10 group-hover/file:border-college-navy dark:group-hover/file:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-xs text-center">
                  <Upload
                    size={14}
                    className="text-college-navy dark:text-college-gold shrink-0"
                  />
                  <span className="truncate text-gray-700 dark:text-gray-300 group-hover/file:text-college-navy dark:group-hover/file:text-college-gold transition-colors">
                    {fileName || "Choose file..."}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Link (Optional)
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold outline-none dark:text-white text-sm"
                placeholder="Google Drive / URL"
                {...register("attachment")}
              />
            </div>
          </div>
          {errors.attachment && (
            <p className="text-xs text-red-500 mt-1">
              {errors.attachment.message}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Classes
            </label>
            <div
              className={`grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 p-1 rounded-xl transition-all ${errors.classes ? "ring-2 ring-red-500/20 border-red-500/50" : ""}`}
            >
              {classes.map((cls) => (
                <label
                  key={cls.id}
                  className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all ${selectedClasses.includes(cls.id) ? "bg-college-navy/5 dark:bg-college-gold/10 border-college-navy dark:border-college-gold text-college-navy dark:text-college-gold" : "hover:bg-gray-50 dark:hover:bg-white/5 border-gray-200 dark:border-college-gold/20 text-gray-700 dark:text-gray-300"}`}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-college-gold bg-white dark:bg-college-navy/50 border-gray-200 dark:border-college-gold/30 rounded focus:ring-college-gold focus:ring-offset-0 dark:focus:ring-offset-college-navy"
                    checked={selectedClasses.includes(cls.id)}
                    onChange={() => toggleClass(cls.id)}
                  />
                  <span className="ml-2 text-sm font-medium">
                    {cls.code}{" "}
                    <span className="text-xs opacity-70">({cls.section})</span>
                  </span>
                </label>
              ))}
            </div>
            {errors.classes && (
              <p className="text-xs text-red-500 mt-2 ml-1">
                {errors.classes.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <PublicButton
              type="button"
              onClick={onClose}
              variant="primary"
              shape="slanted"
              className="px-4 border-2 border-white/10"
            >
              Cancel
            </PublicButton>
            <PublicButton
              type="submit"
              variant="secondary"
              shape="slanted"
              className="px-6"
            >
              Post
            </PublicButton>
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
  const { getCurrentCampus, getClassesByCurrentCampus, isDarkMode } =
    useFacultyContext(); // Get classes getter
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
    const allAnnouncements = saved
      ? JSON.parse(saved)
      : { ...announcementsByCampus };
    allAnnouncements[campus] = updatedAnnouncements;
    localStorage.setItem(
      "college_announcements",
      JSON.stringify(allAnnouncements),
    );
  };

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Class Announcements"
        subtitle="Broadcast updates, schedules, and alerts directly to your students."
        action={
          <PublicButton
            onClick={() => setIsPosting(true)}
            variant="secondary"
            shape="slanted"
          >
            <Plus size={18} />
            <span>Post Announcement</span>
          </PublicButton>
        }
      />

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
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
            <Megaphone size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">
            No announcements found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-sm mx-auto">
            You haven't posted any announcements for {campusNames[campus]} yet.
            Engage your students by posting an update.
          </p>
          <button
            onClick={() => setIsPosting(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-college-navy/80 border border-gray-200 dark:border-college-gold/30 text-college-navy dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-college-navy transition-colors"
          >
            <Plus size={18} />
            Post Announcement
          </button>
        </div>
      )}
    </div>
  );
};

export default Announcements;
