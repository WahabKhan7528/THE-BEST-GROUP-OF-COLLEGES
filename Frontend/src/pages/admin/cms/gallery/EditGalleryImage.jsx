import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, X, CheckCircle2, Save, Trash2, Calendar } from 'lucide-react';

const mockImages = [
    { id: 'g1', title: 'Campus lawn', date: 'Sept 5, 2025', album: 'Campus Life', url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000' },
    { id: 'g2', title: 'Computer lab', date: 'Sept 2, 2025', album: 'Facilities', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000' },
    { id: 'g3', title: 'Library hall', date: 'Aug 30, 2025', album: 'Facilities', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000' },
    { id: 'g4', title: 'Annual Sports Day', date: 'Aug 25, 2025', album: 'Events', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000' },
    { id: 'g5', title: 'Convocation Ceremony', date: 'Aug 20, 2025', album: 'Events', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000' },
    { id: 'g6', title: 'Science Exhibition', date: 'Aug 15, 2025', album: 'Academic', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000' },
];

const EditGalleryImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        album: "",
        tags: "",
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

    const removeFile = () => {
        setFile(null);
        // If we have an initial image (from mock data), revert to it? 
        // For simplicity, just clear preview if user explicitly removes.
        // Ideally, we might want a "Reset" or keep the original URL if file is removed.
        // Here, removing file means "no image selected". But we started with an image.
        // Let's assume removing means clearing the current selection/preview.
        const foundImage = mockImages.find(img => img.id === id);
        if (foundImage) {
            setPreview(foundImage.url); // Revert to original
        } else {
            setPreview(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
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
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/cms/gallery"
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Media</h1>
                        <p className="text-sm text-gray-500">Update photo details and album</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                ? 'border-blue-500 bg-blue-50'
                                : preview
                                    ? 'border-blue-200 bg-gray-50'
                                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'
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
                                <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Click or drag image to replace</p>
                                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG (max 5MB)</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="flex items-center gap-3 p-3 bg-white/50 border border-white/20 rounded-xl shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>

                {/* Right Column: Details Form */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-5 h-fit">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600" />
                        Image Details
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Image Title <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                placeholder="e.g. Orientation Ceremony 2025"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Album / Category <span className="text-red-500">*</span></label>
                            <select
                                value={form.album}
                                onChange={(e) => handleChange("album", e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={form.date}
                                    onChange={(e) => handleChange("date", e.target.value)}
                                    placeholder="e.g. Sept 5, 2025"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (Optional)</label>
                            <input
                                type="text"
                                value={form.tags}
                                onChange={(e) => handleChange("tags", e.target.value)}
                                placeholder="e.g. students, auditorium, celebration"
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            <p className="text-xs text-gray-400 mt-1">Comma separated</p>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/cms/gallery")}
                            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>Saving...</>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditGalleryImage;
