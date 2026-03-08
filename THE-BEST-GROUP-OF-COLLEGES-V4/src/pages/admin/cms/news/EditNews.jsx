import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../../../context/AdminContext";
import PublicButton from "../../../../components/shared/PublicButton";
import PortalForms from "../../../../components/shared/PortalForms";
import {
  Calendar,
  Newspaper,
  Image as ImageIcon,
  CheckCircle2,
  Save,
  Trash2,
  Upload,
  MapPin,
  Clock
} from "lucide-react";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useAdminContext();
  const [type, setType] = useState("news");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    status: "Published",
    image: null,
  });

  useEffect(() => {
    if (id === 'n1' || id === 'n4') setType('event');
    else setType('news');

    setForm({
      title: id === 'n1' ? "Convocation 2025" : "Best Group Achieves Higher Accreditation",
      date: "2026-01-30",
      time: "10:00",
      location: "Main Auditorium",
      description: "Detailed description of the event...",
      category: "Academic",
      status: "Published",
      image: { name: "banner.jpg" },
    });
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${type === "news" ? "News" : "Event"} ${id} updated successfully!`);
    navigate("/admin/cms/news");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert(`Post ${id} deleted.`);
      navigate("/admin/cms/news");
    }
  };

  return (
    <PortalForms
      title="Edit Post"
      subtitle="Update communication details"
      backPath="/admin/cms/news"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/cms/news")}
      submitLabel="Save Changes"
      submitIcon={Save}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
          type="button"
        >
          Delete
        </PublicButton>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Categorization & Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Section 1: Categorization */}
          <PortalForms.Section title="Categorization" className="!p-6 !space-y-6">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <label className="text-sm font-bold text-college-navy dark:text-college-gold uppercase tracking-wider block mb-2">Content Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${type === "news" ? 'border-college-navy bg-college-navy/10 dark:border-college-gold dark:bg-college-gold/10 shadow-sm' : 'border-gray-100 bg-white dark:bg-college-navy/50 dark:border-college-gold/10 hover:bg-gray-50 dark:hover:bg-college-navy/80'}`}>
                  <input type="radio" name="type" value="news" checked={type === "news"} onChange={() => setType("news")} className="sr-only" />
                  <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                  <span className={`text-sm font-bold ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>News & Announcement</span>
                  {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
                </label>

                <label className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${type === "event" ? 'border-college-navy bg-college-navy/10 dark:border-college-gold dark:bg-college-gold/10 shadow-sm' : 'border-gray-100 bg-white dark:bg-college-navy/50 dark:border-college-gold/10 hover:bg-gray-50 dark:hover:bg-college-navy/80'}`}>
                  <input type="radio" name="type" value="event" checked={type === "event"} onChange={() => setType("event")} className="sr-only" />
                  <Calendar className={`w-6 h-6 mb-2 ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                  <span className={`text-sm font-bold ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>Event</span>
                  {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
                </label>
              </div>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-bold text-college-navy dark:text-gray-200 mb-2">Subject Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-base appearance-none dark:text-white"
              >
                <option value="" disabled>Select category</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Research">Research</option>
                <option value="Cultural">Cultural</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-bold text-college-navy dark:text-gray-200 mb-2">Publishing Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-base appearance-none dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </PortalForms.Section>

          {/* Section 2: Content Details */}
          <PortalForms.Section title="Post Details" className="!p-6 !space-y-6">
            <div className="col-span-1 md:col-span-2">
              <PortalForms.Input
                label="Headline / Title"
                value={form.title}
                onChange={(val) => handleChange("title", val)}
                placeholder="Enter a compelling title"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-college-navy dark:text-gray-200 mb-2">Main Content <span className="text-red-500 font-bold ml-0.5">*</span></label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={8}
                placeholder="Draft the article or announcement details here..."
                className="w-full px-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-base resize-none leading-relaxed dark:text-white dark:placeholder-gray-500 shadow-inner"
                required
              />
            </div>
          </PortalForms.Section>
        </div>

        {/* Sidebar: Logistics & Media */}
        <div className="space-y-8">

          {/* Section 3: Logistics (Date/Time/Location) */}
          <PortalForms.Section title="Logistics" className="!p-6 !flex !flex-col !gap-6">
            <div className="col-span-full border-none pb-0">
              <PortalForms.Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(val) => handleChange("date", val)}
                required
              />
            </div>

            {type === "event" && (
              <div className="col-span-full border-none pt-0">
                <PortalForms.Input
                  label="Time"
                  type="time"
                  value={form.time}
                  onChange={(val) => handleChange("time", val)}
                />
              </div>
            )}

            {type === "event" && (
              <div className="col-span-full border-none pt-0">
                <label className="block text-sm font-bold text-college-navy dark:text-gray-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-college-gold w-4 h-4" />
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Event Venue"
                    className="w-full pl-10 pr-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-500 shadow-sm"
                  />
                </div>
              </div>
            )}
          </PortalForms.Section>

          {/* Section 4: Media Assets */}
          <PortalForms.Section title="Media Assets" className="!p-6 !flex !flex-col !gap-6">
            <div className="col-span-full">
              <div className="border-2 border-dashed border-gray-200 dark:border-college-gold/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-college-navy/40 transition-all duration-300 cursor-pointer group dark:bg-college-navy/30 relative">
                <input
                  type="file"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
                  <div className="w-16 h-16 bg-college-navy/5 text-college-navy dark:bg-college-gold/10 dark:text-college-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-college-navy dark:text-gray-200">Featured Image</span>
                  <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest font-bold">SVG, PNG, JPG (max 2MB)</span>
                </label>
              </div>
              {form.image && (
                <div className="mt-4 bg-college-navy/5 dark:bg-college-gold/5 text-college-navy dark:text-college-gold px-4 py-3 rounded-xl text-xs flex items-center gap-3 border border-college-navy/10 dark:border-college-gold/10 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-1.5 bg-white dark:bg-college-navy rounded-lg shadow-sm">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate flex-1 font-medium">{form.image.name}</span>
                </div>
              )}
            </div>
          </PortalForms.Section>
        </div>
      </div>
    </PortalForms>
  );
};

export default EditNews;
