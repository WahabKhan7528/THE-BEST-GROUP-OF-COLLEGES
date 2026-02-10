import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Building2,
  BookOpen,
  Users,
  GraduationCap,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Save,
  Trash2
} from "lucide-react";

const EditClass = () => {
  const { id } = useParams();
  const { campuses, currentAdmin, isSuperAdmin } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sections: "",
    subjects: "",
    faculty: "",
    campus: "",
  });

  useEffect(() => {
    // Mock fetch data
    setForm({
      name: "BSCS - 3rd Semester",
      sections: "A, B",
      subjects: "OS, DBMS, DSA",
      faculty: "Ahmed, Sara",
      campus: "main",
    });
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campus) {
      alert("Please select a campus");
      return;
    }
    alert(`Class ${id} updated successfully!`);
    navigate("/admin/classes");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this class?")) {
      alert(`Class ${id} deleted.`);
      navigate("/admin/classes");
    }
  };

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return `${currentAdmin?.allocatedCampuses?.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")}`;
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/classes"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Class</h1>
            <p className="text-sm text-gray-500">Update class details and assignments</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Class
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campus Selection Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Campus Allocation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Campus <span className="text-red-500">*</span>
              </label>

              {isSuperAdmin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {campuses.map((campus) => (
                    <label
                      key={campus.id}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                        ${form.campus === campus.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="campus"
                        value={campus.id}
                        checked={form.campus === campus.id}
                        onChange={(e) => handleChange("campus", e.target.value)}
                        className="sr-only"
                      />
                      <Building2 className={`w-6 h-6 mb-2 ${form.campus === campus.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium text-center ${form.campus === campus.id ? 'text-blue-700' : 'text-gray-600'}`}>
                        {campus.name}
                      </span>
                      {form.campus === campus.id && (
                        <div className="absolute top-2 right-2 text-blue-600">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{getCampusLabel()}</span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Automated Selection</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Class Details Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-cyan-600" />
            <h2 className="text-lg font-semibold text-gray-800">Academic Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. BSCS - 3rd Semester"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sections
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.sections}
                  onChange={(e) => handleChange("sections", e.target.value)}
                  placeholder="e.g. A, B, C (Comma separated)"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Faculty Lead
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.faculty}
                  onChange={(e) => handleChange("faculty", e.target.value)}
                  placeholder="e.g. Prof. Ahmed Raza"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  value={form.subjects}
                  onChange={(e) => handleChange("subjects", e.target.value)}
                  placeholder="e.g. Operating Systems, Data Structures, Linear Algebra..."
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/classes")}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
