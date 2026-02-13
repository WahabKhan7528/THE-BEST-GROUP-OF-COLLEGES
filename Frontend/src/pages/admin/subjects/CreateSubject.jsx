import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Hash,
  GraduationCap,
  Users,
  Building2,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

const CreateSubject = () => {
  const { campuses } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    class: "",
    faculty: "",
    offeredAt: [],
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCampusToggle = (campusId) => {
    setForm((prev) => {
      const isSelected = prev.offeredAt.includes(campusId);
      return {
        ...prev,
        offeredAt: isSelected
          ? prev.offeredAt.filter((id) => id !== campusId)
          : [...prev.offeredAt, campusId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.offeredAt.length === 0) {
      alert("Please select at least one campus where this subject will be offered");
      return;
    }
    const campusNames = form.offeredAt
      .map((cId) => campuses.find((c) => c.id === cId)?.name)
      .join(", ");
    // alert(`Subject created and offered at: ${campusNames} (mock)`);
    navigate("/admin/subjects");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/subjects"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Subject</h1>
          <p className="text-sm text-gray-500">Add a new subject to the curriculum and assign to campuses</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject Details Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Subject Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Operating Systems"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="e.g. CS-312"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Class
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={form.class}
                  onChange={(e) => handleChange("class", e.target.value)}
                  placeholder="e.g. BSCS - 3rd Semester"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Faculty
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
          </div>
        </section>

        {/* Campus Availability Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-800">Campus Availability</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Select the campuses where this subject will be offered <span className="text-red-500">*</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {campuses.map((campus) => {
                const isSelected = form.offeredAt.includes(campus.id);
                return (
                  <label
                    key={campus.id}
                    className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCampusToggle(campus.id)}
                      className="sr-only"
                    />
                    <Building2 className={`w-6 h-6 mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium text-center ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {campus.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-blue-600">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/subjects")}
            className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all"
          >
            Create Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubject;
