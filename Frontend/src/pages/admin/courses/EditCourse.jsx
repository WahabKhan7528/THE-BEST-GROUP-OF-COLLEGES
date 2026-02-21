import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  GraduationCap,
  FileText,
  Building2,
  CheckCircle2,
  Trash2
} from "lucide-react";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses } = useAdminContext();
  const [form, setForm] = useState({
    title: "BS Computer Science",
    duration: "4 years",
    eligibility: "Intermediate",
    examSystem: "semester",
    description: "A four-year program focusing on computing fundamentals.",
    offeredAt: ["main", "law"],
  });
  const [selectedCampuses, setSelectedCampuses] = useState(form.offeredAt);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCampuses.length === 0) {
      alert("Please select at least one campus where this course will be offered");
      return;
    }
    // const campusNames = selectedCampuses
    //   .map((cId) => campuses.find((c) => c.id === cId)?.name)
    //   .join(", ");
    // alert(`Course ${id} updated and offered at: ${campusNames} (mock)`);
    navigate("/admin/courses");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/courses"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-sm text-gray-500">Update course details and availability</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Course Information
            </h2>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100">
              ID: {id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. BS Computer Science"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Duration
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                placeholder="e.g. 4 Years"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                Eligibility
              </label>
              <input
                type="text"
                value={form.eligibility}
                onChange={(e) => handleChange("eligibility", e.target.value)}
                placeholder="e.g. Intermediate or A-Level"
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Exam System
              </label>
              <select
                value={form.examSystem}
                onChange={(e) => handleChange("examSystem", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="annual">Annual</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                placeholder="Enter a brief description of the course..."
              />
            </div>
          </div>
        </section>

        {/* Campus Availability */}
        <section className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building2 className="w-5 h-5 text-primary-600" />
            Campus Availability <span className="text-red-500 text-sm ml-1">*</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campuses.map((campus) => {
              const isSelected = selectedCampuses.includes(campus.id);
              return (
                <div
                  key={campus.id}
                  onClick={() => handleCampusToggle(campus.id)}
                  className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3
                      ${isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-sm'
                      : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50'
                    }
                    `}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {campus.name}
                    </h3>
                    <p className="text-xs text-gray-500">{campus.code}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-blue-600" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-medium rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Course
          </button>

          <div className="flex gap-3">
            <Link
              to="/admin/courses"
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
