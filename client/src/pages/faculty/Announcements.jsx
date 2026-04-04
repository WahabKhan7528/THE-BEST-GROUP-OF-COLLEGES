import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { announcementSchema } from "../../schemas/announcementSchema";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import { useToast } from "../../context/ToastContext";
import AnnouncementCard from "../../components/portal-shared/AnnouncementCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { X, Plus, Megaphone, Upload } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import { portalApi } from "../../services/api";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const PostAnnouncementForm = ({ classes, onClose, onPost }) => {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
      classes: selectedClasses,
      link: data.attachment,
    };

    onPost(newAnnouncement, selectedFile);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
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
        className="bg-white dark:bg-college-navy rounded-sm md:rounded-sm shadow-xl w-full max-w-lg p-5 md:p-6 space-y-4 border border-gray-200 dark:border-college-gold/20"
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
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5 mb-1.5">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm font-bold text-sm focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold outline-none dark:text-white"
              placeholder="e.g. Quiz on Monday"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider px-0.5">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5 mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm font-bold text-sm focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold outline-none resize-none dark:text-white"
              placeholder="Details about the announcement..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider px-0.5">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">
                File Upload
              </label>
              <div className="relative group/file">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full px-4 py-2.5 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover/file:bg-college-navy/5 dark:group-hover/file:bg-college-gold/10 group-hover/file:border-college-navy dark:group-hover/file:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-xs text-center">
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
              <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">
                Link (Optional)
              </label>
              <input
                type="url"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm font-bold text-sm focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold outline-none dark:text-white"
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
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5 mb-2.5">
              Target Classes
            </label>
            <div
              className={`grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 p-1 rounded-sm transition-all ${errors.classes ? "ring-2 ring-red-500/20 border-red-500/50" : ""}`}
            >
              {classes.map((cls) => (
                <label
                  key={cls.id}
                  className={`flex items-center p-2 rounded-sm border cursor-pointer transition-all ${selectedClasses.includes(cls.id) ? "bg-college-navy/5 dark:bg-college-gold/10 border-college-navy dark:border-college-gold text-college-navy dark:text-college-gold" : "hover:bg-gray-50 dark:hover:bg-white/5 border-gray-200 dark:border-college-gold/20 text-gray-700 dark:text-gray-300"}`}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-college-gold bg-white dark:bg-college-navy/50 border-gray-200 dark:border-college-gold/30 rounded focus:ring-college-gold focus:ring-offset-0 dark:focus:ring-offset-college-navy"
                    checked={selectedClasses.includes(cls.id)}
                    onChange={() => toggleClass(cls.id || cls._id)}
                  />
                  <span className="ml-2 text-sm font-medium">
                      {(cls.code || cls.name)}{" "}
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
  const toast = useToast();
  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus(); // Get array of classes
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

  const loadAnnouncements = async () => {
    try {
      const { data } = await portalApi.announcements();
      const mapped = (data.data || []).map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        date: new Date(item.createdAt).toLocaleDateString(),
        classSection: (item.targetClasses || []).map((cls) => `${cls.name} (${cls.section})`).join(", "),
        attachment: item.attachment?.url,
      }));
      setAnnouncements(mapped);
    } catch {
      setAnnouncements([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handlePost = async (newAnnouncement, file) => {
    const formData = new FormData();
    formData.append("title", newAnnouncement.title);
    formData.append("description", newAnnouncement.description);
    (newAnnouncement.classes || []).forEach((classId) => formData.append("classes", classId));
    if (newAnnouncement.link) formData.append("attachment", newAnnouncement.link);
    if (file) formData.append("attachment", file);

    await portalApi.createAnnouncement(formData);
    toast.success("Announcement posted");
    await loadAnnouncements();
  };

  const handleDelete = async (id) => {
    await portalApi.deleteAnnouncement(id);
    toast.success("Announcement deleted");
    await loadAnnouncements();
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

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonLoading key={idx} variant="card" className="h-40" />
          ))}
        </div>
      ) : announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id || announcement.title}
              announcement={announcement}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-sm p-12 text-center">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-college-navy/80 border border-gray-200 dark:border-college-gold/30 text-college-navy dark:text-white rounded-sm font-semibold hover:bg-gray-50 dark:hover:bg-college-navy transition-colors"
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

