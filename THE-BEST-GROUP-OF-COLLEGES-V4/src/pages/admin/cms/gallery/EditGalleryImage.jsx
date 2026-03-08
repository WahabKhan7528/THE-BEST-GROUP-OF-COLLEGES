import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PublicButton from '../../../../components/shared/PublicButton';
import PortalForms from '../../../../components/shared/PortalForms';
import { Upload, Image as ImageIcon, CheckCircle2, Save, Trash2 } from 'lucide-react';
import { useAdminContext } from '../../../../context/AdminContext';
import { adminGalleryImages as mockImages } from "../../../../data/adminData";

const EditGalleryImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useAdminContext();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        album: "",
        tags: "",
        description: "",
        date: ""
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const foundImage = mockImages.find(img => img.id === id);
        if (foundImage) {
            setForm({
                title: foundImage.title,
                album: foundImage.album,
                tags: "",
                description: foundImage.description || "",
                date: foundImage.date
            });
            setPreview(foundImage.url);
        }
    }, [id]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Image details updated successfully!");
            navigate("/admin/cms/gallery");
        }, 1000);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            alert("Image deleted successfully");
            navigate("/admin/cms/gallery");
        }
    };

    return (
        <PortalForms
            title="Edit Media"
            subtitle="Update gallery image details"
            backPath="/admin/cms/gallery"
            onSubmit={handleSubmit}
            onCancel={() => navigate("/admin/cms/gallery")}
            submitLabel={loading ? "Saving..." : "Save Changes"}
            submitIcon={loading ? null : Save}
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
              relative aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden
              ${isDragging
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
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fileInputRef.current?.click();
                                            }}
                                            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors text-sm font-medium"
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
                                    <p className="text-sm font-semibold text-college-navy dark:text-college-gold">Click or drag image to replace</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG (max. 5MB)</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-college-navy/50 border border-white/20 dark:border-college-gold/20 rounded-xl shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-college-gold/10 flex items-center justify-center text-college-gold">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-college-navy truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>

                {/* Right Column: Form Details */}
                <div className="h-fit">
                    <PortalForms.Section title="Media Details">
                        <div className="col-span-1 md:col-span-2">
                            <PortalForms.Input
                                label="Image Title"
                                value={form.title}
                                onChange={(val) => handleChange("title", val)}
                                placeholder="e.g. Orientation Ceremony 2025"
                                required
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="text-xs md:text-sm font-medium text-college-navy dark:text-gray-200">
                                Album Collection <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={form.album}
                                onChange={(e) => handleChange('album', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm md:text-base mt-2"
                                required
                            >
                                <option value="" disabled>Select album</option>
                                <option value="Campus Life">Campus Life</option>
                                <option value="Events">Events</option>
                                <option value="Facilities">Facilities</option>
                                <option value="Academic">Academic</option>
                                <option value="Sports">Sports</option>
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <PortalForms.Input
                                label="Date"
                                value={form.date}
                                onChange={(val) => handleChange("date", val)}
                                placeholder="e.g. Sept 5, 2025"
                            />
                        </div>

                        <div className="space-y-1.5 col-span-1 md:col-span-2">
                            <label className="text-xs md:text-sm font-medium text-college-navy dark:text-gray-200">
                                Description
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Write a short description..."
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none text-sm md:text-base shadow-sm"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <PortalForms.Input
                                label="Tags (Optional)"
                                value={form.tags}
                                onChange={(val) => handleChange("tags", val)}
                                placeholder="e.g. students, auditorium, celebration"
                                helper="Comma separated"
                            />
                        </div>
                    </PortalForms.Section>
                </div>
            </div>
        </PortalForms>
    );
};

export default EditGalleryImage;
