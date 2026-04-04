import Card from "../shared/Card";
import { Link } from "react-router-dom";
import { useConfirm } from "../../context/ConfirmContext";
import { useToast } from "../../context/ToastContext";

const AnnouncementCard = ({ announcement, role = "faculty", onDelete }) => {
  const isStudent = role === "student";
  const confirmDialog = useConfirm();
  const toast = useToast();
  const { id, date, title, description, classSection, instructor, attachment } =
    announcement;

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Delete Announcement",
      message: `Are you sure you want to delete "${title}"?`,
      confirmText: "Delete",
      variant: "danger",
    });
    if (confirmed) {
      onDelete(id);
      toast.success("Announcement deleted");
    }
  };

  return (
    <Card
      hover={false}
      className="p-5 border border-college-navy/10 dark:border-college-gold/30 shadow-2xl bg-white dark:bg-college-navy"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Unified Header: Class Section â€¢ Date */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-college-navy/80 dark:text-college-gold uppercase tracking-[0.2em]">
              {classSection}
            </span>
            <span className="text-[10px] text-college-navy/20 dark:text-white/20">
              â€¢
            </span>
            <p className="text-[10px] text-college-navy/40 dark:text-white/40 font-black uppercase tracking-tight">
              {date}
            </p>
          </div>

          <h3 className="text-lg font-bold text-college-navy dark:text-white leading-tight">
            {title}
          </h3>

          <p className="text-sm font-bold text-college-navy/60 dark:text-white/60 mt-3 leading-relaxed">
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

        {/* Top-Right Badge */}
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-white/5 px-3 py-1 rounded-full border border-college-navy/10 dark:border-college-gold/20 shrink-0 self-start">
          Announcement
        </span>
      </div>

      {/* Bottom Footer Section: Actions & Info */}
      <div className="flex items-center justify-between gap-4 mt-6">
        <div>
          {instructor && (
            <p className="text-xs text-gray-400 dark:text-gray-500 italic lowercase">
              Posted by {instructor}
            </p>
          )}
        </div>

        {!isStudent && (
          <div className="flex items-center gap-3 text-xs ml-auto">
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-bold flex items-center gap-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AnnouncementCard;
