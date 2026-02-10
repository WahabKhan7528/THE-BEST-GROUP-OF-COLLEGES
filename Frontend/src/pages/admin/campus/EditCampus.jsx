import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  ArrowLeft,
  Save,
  Trash2,
  School
} from "lucide-react";

const EditCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses } = useAdminContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    location: "",
    contact: {
      phone: "",
      email: "",
      website: ""
    },
    dean: "",
    established: ""
  });

  useEffect(() => {
    // If campus data was passed via navigation state, use it
    if (location.state?.campus) {
      const { campus } = location.state;
      setForm({
        name: campus.name || "",
        code: campus.code || "",
        location: campus.location || "",
        contact: {
          phone: campus.contact?.phone || "",
          email: campus.contact?.email || "",
          website: campus.contact?.website || ""
        },
        dean: campus.dean || "",
        established: campus.established || ""
      });
    } else {
      // Fallback: finding campus from context if direct access via URL
      const foundCampus = campuses.find(c => c.id === id);
      if (foundCampus) {
        setForm({
          name: foundCampus.name || "",
          code: foundCampus.code || "",
          location: foundCampus.location || "",
          contact: {
            phone: foundCampus.contact?.phone || "",
            email: foundCampus.contact?.email || "",
            website: foundCampus.contact?.website || ""
          },
          dean: foundCampus.dean || "",
          established: foundCampus.established || ""
        });
      }
    }
  }, [id, location.state, campuses]);

  const handleChange = (key, value) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Campus ${form.name} updated successfully!`);
      navigate("/admin/campus");
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${form.name}? This cannot be undone.`)) {
      alert("Campus deleted successfully");
      navigate("/admin/campus");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/campus"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Campus</h1>
            <p className="text-sm text-gray-500">Update campus details and configuration</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Campus
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100">
            <School className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campus Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campus Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono uppercase"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Established Year
              </label>
              <input
                type="text"
                value={form.established}
                onChange={(e) => handleChange("established", e.target.value)}
                placeholder="e.g. 1995"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100">
            <MapPin className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-semibold text-gray-800">Contact & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address / Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={form.contact.phone}
                  onChange={(e) => handleChange("contact.phone", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={form.contact.email}
                  onChange={(e) => handleChange("contact.email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/campus")}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
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
      </form>
    </div>
  );
};

export default EditCampus;
