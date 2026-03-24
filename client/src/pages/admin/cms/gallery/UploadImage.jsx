import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gallerySchema } from '../../../../schemas/gallerySchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../../context/ToastContext';
import PortalForm from "../../../../components/portal-shared/PortalForm";
import { Upload, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';

const UploadImage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: { title: "", category: "", tags: "" }
  });

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
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

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = () => {
    if (!file) {
      toast.warning("Please select an image to upload");
      return;
    }
    toast.success("Image uploaded successfully");
    navigate("/admin/cms/gallery");
  };

  return (
    <PortalForm
      title="Upload Media"
      subtitle="Add new photos to your campus gallery"
      backPath="/admin/cms/gallery"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/cms/gallery")}
      submitLabel="Upload Image"
      submitIcon={Upload}
      submitting={isSubmitting}
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
              ${isDragging
                ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                : preview
                  ? "bg-gray-50 border-college-navy/30 dark:bg-college-navy/30 dark:border-college-gold/30"
                  : "bg-white border-gray-300 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/30 dark:hover:bg-college-navy/80"
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
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto bg-college-navy/5 text-college-navy dark:bg-college-gold/10 dark:text-college-gold rounded-full flex items-center justify-center mb-2 transition-colors duration-300">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-college-navy dark:text-gray-200">Click or drag image to upload</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG (max 5MB)</p>
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
                <p className="text-sm font-medium text-college-navy dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {/* Right Column: Details Form */}
        <div className="h-fit">
          <PortalForm.Section title="Image Details" className="!p-6 !h-full">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category <span className="text-red-500">*</span></label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 dark:bg-college-navy dark:text-gray-300"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="Campus Life">Campus Life</option>
                <option value="Events">Events</option>
                <option value="Facilities">Facilities</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
              </select>
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

export default UploadImage;
