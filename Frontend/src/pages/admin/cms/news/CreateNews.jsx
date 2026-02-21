import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  Upload
} from "lucide-react";

const CreateNews = () => {
  const navigate = useNavigate();
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

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${type === "news" ? "News" : "Event"} created (mock)`);
    navigate("/admin/cms/news");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/cms/news"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-sm text-gray-500">Share news, announcements, or schedule events</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Content Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "news"
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="type"
                  value="news"
                  checked={type === "news"}
                  onChange={() => setType("news")}
                  className="sr-only"
                />
                <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${type === "news" ? 'text-blue-700' : 'text-gray-600'}`}>News & Announcement</span>
                {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-blue-600" />}
              </label>

              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "event"
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-100 bg-white hover:border-primary-200 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="type"
                  value="event"
                  checked={type === "event"}
                  onChange={() => setType("event")}
                  className="sr-only"
                />
                <Calendar className={`w-6 h-6 mb-2 ${type === "event" ? 'text-primary-600' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${type === "event" ? 'text-primary-700' : 'text-gray-600'}`}>Event</span>
                {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary-600" />}
              </label>
            </div>
          </section>

          {/* Details Form */}
          <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter post title"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Research">Research</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              {type === "event" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Event Venue"
                      className="w-full pl-9 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                placeholder="Write the full content description here..."
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none leading-relaxed"
                required
              />
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Publishing</h3>



            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {type === "event" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                />
              </div>
            )}
          </section>

          {/* Image Upload */}
          <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Featured Image</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={(e) => handleChange("image", e.target.files?.[0])}
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">Click to upload</span>
                <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 2MB)</span>
              </label>
            </div>
            {form.image && (
              <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                <ImageIcon className="w-3 h-3" />
                <span className="truncate">{form.image.name}</span>
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              Publish Post
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
