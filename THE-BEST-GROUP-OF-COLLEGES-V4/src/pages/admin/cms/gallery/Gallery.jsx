import { useNavigate, Link } from 'react-router-dom';
import PublicButton from '../../../../components/shared/PublicButton';
import { useAdminContext } from '../../../../context/AdminContext';
import {
  Plus,
  Image,
  Trash2,
  Search,
  Calendar,
  Pencil
} from 'lucide-react';
import { useState } from 'react';
import { adminGalleryImages as images } from "../../../../data/adminData";



const Gallery = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAdminContext();
  const [activeFilter, setActiveFilter] = useState("All");
  const albums = ["All", ...new Set(images.map(img => img.album))];

  const filteredImages = activeFilter === "All"
    ? images
    : images.filter(img => img.album === activeFilter);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">
            Media Gallery
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your campus photos, event highlights, and media assets
          </p>
        </div>
        <PublicButton
          to="/admin/cms/gallery/upload"
          variant={isDarkMode ? "secondary" : "primary"}
          shape="slanted"
          icon={Plus}
          className="shadow-md transform hover:-translate-y-0.5"
        >
          Upload Image
        </PublicButton>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setActiveFilter(album)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border
                ${activeFilter === album
                  ? "bg-college-navy/10 text-college-navy border-college-navy/20 dark:bg-college-gold/10 dark:text-college-gold dark:border-college-gold/30 shadow-sm"
                  : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-college-navy dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                }
              `}
            >
              {album}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search images..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="group relative bg-white dark:bg-college-navy border border-gray-100 dark:border-college-gold/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => navigate(`/admin/cms/gallery/edit/${img.id}`)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-college-gold hover:bg-white transition-colors shadow-sm"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete image "${img.title}"?`)) {
                      alert("Image deleted (mock)");
                    }
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-rose-600 hover:bg-white transition-colors shadow-sm"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Album Badge */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/20">
                  {img.album}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-college-navy dark:text-white truncate group-hover:text-college-gold transition-colors">
                {img.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{img.date}</span>
              </div>
            </div>
          </div>
        ))}


        <Link
          to="/admin/cms/gallery/upload"
          className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-200 dark:border-college-gold/20 rounded-2xl hover:bg-college-navy/5 dark:hover:bg-college-gold/10 hover:border-college-navy/30 dark:hover:border-college-gold/30 transition-all duration-300 group cursor-pointer dark:bg-college-navy/30 shadow-sm"
        >
          <div className="w-14 h-14 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
            <Plus className="w-7 h-7 text-college-navy/40 dark:text-college-gold group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors" />
          </div>
          <span className="mt-4 text-sm font-bold text-gray-400 group-hover:text-college-navy dark:group-hover:text-college-gold uppercase tracking-wider transition-colors text-center px-4">Add New Image</span>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;

