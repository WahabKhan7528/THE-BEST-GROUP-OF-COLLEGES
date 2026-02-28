import { Link, useNavigate } from 'react-router-dom';
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
          <h1 className="text-2xl font-bold text-gray-900">
            Media Gallery
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your campus photos, event highlights, and media assets
          </p>
        </div>
        <Link
          to="/admin/cms/gallery/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Upload Image
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setActiveFilter(album)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeFilter === album
                  ? "bg-primary-50 text-primary-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image Container */}
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={() => navigate(`/admin/cms/gallery/edit/${img.id}`)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-white transition-colors shadow-sm"
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
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {img.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{img.date}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Placeholder (Empty State or just visual cue) */}
        <Link
          to="/admin/cms/gallery/upload"
          className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600" />
          </div>
          <span className="mt-3 text-sm font-medium text-gray-500 group-hover:text-blue-600">Add New Image</span>
        </Link>
      </div>
    </div>
  );
};

export default Gallery;

