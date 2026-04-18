import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gallerySchema } from "../../../../schemas/gallerySchema";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../context/ToastContext";
import { useConfirm } from "../../../../context/ConfirmContext";
import PublicButton from "../../../../components/shared/PublicButton";
import PortalForm from "../../../../components/portal-shared/PortalForm";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Save,
  Trash2,
} from "lucide-react";
import { adminApi } from "../../../../services/api";

const EditGalleryImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      category: "",
      tags: "",
      description: "",
      date: "",
    },
  });

  useEffect(() => {
    const loadImage = async () => {
      try {
        const { data } = await adminApi.galleryItems();
        const foundImage = (data.data || []).find((img) => img._id === id);
        if (!foundImage) return;

        reset({
          title: foundImage.title,
          category: foundImage.category,
          tags: (foundImage.tags || []).join(", "),
          description: foundImage.description || "",
          date: foundImage.createdAt
            ? new Date(foundImage.createdAt).toLocaleDateString()
            : "",
        });
        setPreview(foundImage.image?.url || null);
      } catch {
        navigate("/admin/cms/gallery");
      }
    };

    loadImage();
  }, [id, navigate, reset]);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description || "");
      formData.append("tags", values.tags || "");
      if (file) formData.append("image", file);

      await adminApi.updateGalleryItem(id, formData);
      toast.success("Image details updated successfully");
      navigate("/admin/cms/gallery");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update image");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmed = await confirmDialog({
        title: "Delete Image",
        message: "Are you sure you want to delete this image?",
        confirmText: "Delete",
        variant: "danger",
      });
      if (confirmed) {
        await adminApi.deleteGalleryItem(id);
        toast.success("Image deleted successfully");
        navigate("/admin/cms/gallery");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete image");
    }
  };

  return (
    <PortalForm
      title="Edit Media"
      subtitle="Update gallery image details"
      backPath="/admin/cms/gallery"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/cms/gallery")}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Upload Area */}
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative aspect-square md:aspect-[4/3] rounded-sm border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden
              ${
                isDragging
                  ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                  : preview
                    ? "bg-gray-50 border-college-navy/30 dark:bg-college-navy dark:border-college-gold/30"
                    : "bg-white border-gray-300 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy dark:border-college-gold/20 dark:hover:bg-college-navy/80"
              }
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
              accept="image/*"
              className="hidden"
            />

            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-sm text-white hover:bg-white/40 transition-colors text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto bg-college-navy/5 text-college-navy dark:bg-college-gold/10 dark:text-college-gold rounded-full flex items-center justify-center mb-2 transition-colors duration-300">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-college-navy dark:text-college-gold">
                    Click or drag image to replace
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    SVG, PNG, JPG (max. 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {file && (
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-college-navy/50 border border-white/20 dark:border-college-gold/20 rounded-sm shadow-sm">
              <div className="w-10 h-10 rounded-sm bg-college-gold/10 flex items-center justify-center text-college-gold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-college-navy truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {/* Right Column: Form Details */}
        <div className="h-fit">
          <PortalForm.Section title="Media Details">
            <div className="col-span-1 md:col-span-2">
              <PortalForm.Input
                label="Image Title"
                registration={register("title")}
                error={errors.title?.message}
                placeholder="e.g. Orientation Ceremony 2025"
                required
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <PortalForm.Select
                label="Image Category"
                registration={register("category")}
                required
                options={[
                  { id: "Campus Life", label: "Campus Life" },
                  { id: "Events", label: "Events" },
                  { id: "Facilities", label: "Facilities" },
                  { id: "Academic", label: "Academic" },
                  { id: "Sports", label: "Sports" },
                ]}
                placeholder="Select category"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <PortalForm.Input
                label="Date"
                registration={register("date")}
                placeholder="e.g. Sept 5, 2025"
              />
            </div>

            <div className="space-y-1.5 col-span-1 md:col-span-2">
              <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5 focus:text-college-navy dark:focus:text-college-gold transition-colors">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Write a short description..."
                rows="3"
                className="w-full px-4 py-3 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none text-sm md:text-base shadow-sm"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <PortalForm.Input
                label="Tags (Optional)"
                registration={register("tags")}
                placeholder="e.g. students, auditorium, celebration"
                helper="Comma separated"
              />
            </div>
          </PortalForm.Section>
        </div>
      </div>
    </PortalForm>
  );
};

export default EditGalleryImage;
