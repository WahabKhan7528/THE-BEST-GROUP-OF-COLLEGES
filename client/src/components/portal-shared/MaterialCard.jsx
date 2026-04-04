import { FileText, Play, Image as ImageIcon, File, Edit3 } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";
import { useConfirm } from "../../context/ConfirmContext";
import { portalApi } from "../../services/api";

/*
 Shared MaterialCard
 
 Accepts a `material` object with: { title, type, uploadDate/date, description, classSection, subject, link }

 variant="faculty" (default) - shows icon, classSectionâ€¢subject header, View (anchor) + Download link
 variant="student"- shows date, name, type badge, View + Download buttons, "Tap to preview"
 */

const typeBadge = {
  PDF: "bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold",
  Slides:
    "bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold",
  Notes:
    "bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold",
  Image:
    "bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold",
  Video:
    "bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold",
};

const badgeColors = {
  PDF: "text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20",
  Video:
    "text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20",
  Image:
    "text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20",
  Notes:
    "text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20",
  Slides:
    "text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20",
};

const iconForType = {
  PDF: FileText,
  Slides: FileText,
  Notes: FileText,
  Image: ImageIcon,
  Video: Play,
};

const normalizeType = (type) => {
  const value = String(type || "").trim().toLowerCase();

  if (value === "pdf") return "PDF";
  if (value === "ppt" || value === "pptx") return "Slides";
  if (value === "doc" || value === "docx") return "Notes";
  if (value === "image") return "Image";
  if (value === "video") return "Video";
  if (value === "other") return "Other";

  return type ? String(type) : "Other";
};

const MaterialCard = ({ material, role = "faculty", onDeleted }) => {
  const toast = useToast();
  const confirmDialog = useConfirm();
  
  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Delete Material",
      message: `Are you sure you want to delete "${material.title}"?`,
      confirmText: "Delete",
      variant: "danger",
    });
    if (confirmed) {
      try {
        await portalApi.deleteMaterial(material.id || material._id);
        toast.success("Material deleted successfully");
        if (typeof onDeleted === "function") {
          onDeleted(material.id || material._id);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete material");
      }
    }
  };

  if (role === "student") {
    const displayType = normalizeType(material.type);
    const badgeClass =
      badgeColors[displayType] ||
      "text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700";
    return (
      <div className="bg-white dark:bg-college-navy border dark:border-college-gold/50 border-gray-100 rounded-sm p-4 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {material.date || material.uploadDate}
            </p>
            <h3 className="text-lg font-semibold text-college-navy dark:text-white break-words">
              {material.title || material.name}
            </h3>
            {material.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
                {material.description}
              </p>
            )}
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${badgeClass}`}
          >
            {displayType}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 text-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <button className="text-college-navy dark:text-college-gold font-semibold hover:text-college-navy/80 dark:hover:text-college-gold/80">
              View
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              Download
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tap to preview
          </p>
        </div>
      </div>
    );
  }

  // faculty variant (default)
  const displayType = normalizeType(material.type);
  const badge =
    typeBadge[displayType] ||
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
  const Icon = iconForType[displayType] || File;

  return (
    <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/50 rounded-sm p-4 shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-sm ${badge} flex items-center justify-center`}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide break-words">
              {material.classSection} â€¢ {material.subject}
            </p>
            <h3 className="text-lg font-semibold text-college-navy dark:text-white break-words">
              {material.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {displayType}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {material.uploadDate || material.date}
        </p>
      </div>
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <a
          href={material.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-college-navy dark:text-college-gold font-semibold hover:text-college-navy/80 dark:hover:text-college-gold/80"
        >
          View
        </a>
        <span className="text-gray-400 dark:text-gray-600">â€¢</span>
        <button
          onClick={() => toast.info(`Starting download for: ${material.title}`)}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Download
        </button>
        <span className="text-gray-400 dark:text-gray-600">â€¢</span>
        <Link
          to={`/faculty/materials/edit/${material.id}`}
          className="text-college-navy dark:text-college-gold font-semibold hover:text-college-navy/80 dark:hover:text-college-gold/80"
        >
          Edit
        </Link>
        <span className="text-gray-400 dark:text-gray-600">â€¢</span>
        <button
          onClick={handleDelete}
          className="text-red-600 dark:text-red-400 font-semibold hover:text-red-800 dark:hover:text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
