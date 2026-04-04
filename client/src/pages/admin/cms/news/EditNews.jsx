import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSchema } from "../../../../schemas/newsSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../context/ToastContext";
import { useConfirm } from "../../../../context/ConfirmContext";
import PublicButton from "../../../../components/shared/PublicButton";
import PortalForm from "../../../../components/portal-shared/PortalForm";
import { adminApi } from "../../../../services/api";
import {
  Calendar,
  Newspaper,
  Image as ImageIcon,
  CheckCircle2,
  Save,
  Trash2,
  Upload,
  MapPin
} from "lucide-react";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const [type, setType] = useState("news");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "", date: "", time: "", location: "",
      description: "", category: "", status: "published"
    }
  });

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await adminApi.newsEvents();
        const foundPost = (data.data || []).find((item) => item._id === id);

        if (!foundPost) {
          navigate("/admin/cms/news", { replace: true });
          return;
        }

        setType(foundPost.type || "news");
        reset({
          title: foundPost.title || "",
          date: foundPost.date ? new Date(foundPost.date).toISOString().slice(0, 10) : "",
          time: foundPost.time || "",
          location: foundPost.location || "",
          description: foundPost.description || "",
          category: foundPost.category || "Academic",
          status: foundPost.status || "published",
        });
        setImage(foundPost.image?.url ? { name: foundPost.image.url.split("/").pop() || "image" } : null);
      } catch {
        navigate("/admin/cms/news", { replace: true });
      }
    };

    loadPost();
  }, [id, navigate, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("title", values.title);
      formData.append("date", values.date || "");
      formData.append("time", values.time || "");
      formData.append("location", values.location || "");
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("status", (values.status || "published").toLowerCase());
      const file = fileInputRef.current?.files?.[0];
      if (file) formData.append("image", file);

      await adminApi.updateNewsEvent(id, formData);
      toast.success(`${type === "news" ? "News" : "Event"} updated successfully`);
      navigate("/admin/cms/news", { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update post");
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({ title: "Delete Post", message: "Are you sure you want to delete this post?", confirmText: "Delete", variant: "danger" });
    if (confirmed) {
      await adminApi.deleteNewsEvent(id);
      toast.success(`Post ${id} deleted`);
      navigate("/admin/cms/news", { replace: true });
    }
  };

  return (
    <PortalForm
      title="Edit Post"
      subtitle="Update communication details"
      backPath="/admin/cms/news"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/cms/news")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
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
          <PortalForm.Section title="Categorization" className="!p-6 !space-y-6">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-2">Content Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex flex-col items-center justify-center p-5 rounded-sm border-2 cursor-pointer transition-all duration-300 ${type === "news" ? 'border-college-navy bg-college-navy/10 dark:border-college-gold dark:bg-college-gold/10 shadow-sm' : 'border-gray-100 bg-white dark:bg-college-navy/50 dark:border-college-gold/10 hover:bg-gray-50 dark:hover:bg-college-navy/80'}`}>
                  <input type="radio" name="type" value="news" checked={type === "news"} onChange={() => setType("news")} className="sr-only" />
                  <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                  <span className={`text-sm font-bold ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>News & Announcement</span>
                  {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
                </label>

                <label className={`relative flex flex-col items-center justify-center p-5 rounded-sm border-2 cursor-pointer transition-all duration-300 ${type === "event" ? 'border-college-navy bg-college-navy/10 dark:border-college-gold dark:bg-college-gold/10 shadow-sm' : 'border-gray-100 bg-white dark:bg-college-navy/50 dark:border-college-gold/10 hover:bg-gray-50 dark:hover:bg-college-navy/80'}`}>
                  <input type="radio" name="type" value="event" checked={type === "event"} onChange={() => setType("event")} className="sr-only" />
                  <Calendar className={`w-6 h-6 mb-2 ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                  <span className={`text-sm font-bold ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>Event</span>
                  {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
                </label>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <PortalForm.Select
                label="Subject Category"
                registration={register("category")}
                options={[
                  { id: "Academic", label: "Academic" },
                  { id: "Sports", label: "Sports" },
                  { id: "Research", label: "Research" },
                  { id: "Cultural", label: "Cultural" },
                  { id: "Administration", label: "Administration" },
                ]}
                placeholder="Select category"
              />
            </div>


          </PortalForm.Section>

          {/* Section 2: Content Details */}
          <PortalForm.Section title="Post Details" className="!p-6 !space-y-6">
            <div className="col-span-1 md:col-span-2">
              <PortalForm.Input
                label="Headline / Title"
                registration={register("title")}
                error={errors.title?.message}
                placeholder="Enter a compelling title"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-2">Main Content <span className="text-red-500 font-bold ml-0.5">*</span></label>
              <textarea
                {...register("description")}
                rows={8}
                placeholder="Draft the article or announcement details here..."
                className="w-full px-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-base resize-none leading-relaxed dark:text-white dark:placeholder-gray-500 shadow-inner"
                required
              />
            </div>
          </PortalForm.Section>
        </div>

        {/* Sidebar: Logistics & Media */}
        <div className="space-y-8">

          {/* Section 3: Logistics (Date/Time/Location) */}
          <PortalForm.Section title="Logistics" className="!p-6 !flex !flex-col !gap-6">
            <div className="col-span-full border-none pb-0">
              <PortalForm.Input
                label="Date"
                type="date"
                registration={register("date")}
                required
              />
            </div>

            {type === "event" && (
              <div className="col-span-full border-none pt-0">
                <PortalForm.Input
                  label="Time"
                  type="time"
                  registration={register("time")}
                />
              </div>
            )}

            {type === "event" && (
              <div className="col-span-full border-none pt-0">
                <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-college-gold w-4 h-4" />
                  <input
                    type="text"
                    {...register("location")}
                    placeholder="Event Venue"
                    className="w-full pl-10 pr-5 py-3.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-500 shadow-sm"
                  />
                </div>
              </div>
            )}
          </PortalForm.Section>

          {/* Section 4: Media Assets */}
          <PortalForm.Section title="Media Assets" className="!p-6 !flex !flex-col !gap-6">
            <div className="col-span-full">
              <div className="border-2 border-dashed border-gray-200 dark:border-college-gold/20 rounded-sm p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-college-navy/40 transition-all duration-300 cursor-pointer group dark:bg-college-navy/30 relative">
                <input
                  type="file"
                  ref={fileInputRef}
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
              {image && (
                <div className="mt-4 bg-college-navy/5 dark:bg-college-gold/5 text-college-navy dark:text-college-gold px-4 py-3 rounded-sm text-xs flex items-center gap-3 border border-college-navy/10 dark:border-college-gold/10 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-1.5 bg-white dark:bg-college-navy rounded-sm shadow-sm">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate flex-1 font-medium">{image.name}</span>
                </div>
              )}
            </div>
          </PortalForm.Section>
        </div>
      </div>
    </PortalForm>
  );
};

export default EditNews;
