import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import PublicButton from "../../../components/shared/PublicButton";
import { useAdminContext } from "../../../context/AdminContext";
import PortalForms from "../../../components/shared/PortalForms";
import { Building2, CheckCircle2, Trash2, Save } from "lucide-react";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses, isDarkMode } = useAdminContext();
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
    navigate("/admin/courses");
  };

  return (
    <PortalForms
      title="Edit Course"
      subtitle="Update course details and availability"
      backPath="/admin/courses"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/courses")}
      submitLabel="Save Changes"
      submitIcon={Save}
      headerActions={
        <PublicButton
          type="button"
          variant="danger"
          size="sm"
          onClick={() => { if (confirm("Delete this course?")) alert("Deleted"); }}
          icon={Trash2}
        >
          Delete
        </PublicButton>
      }
    >
      {/* Basic Info Section */}
      <PortalForms.Section title="Course Information">
        <div className="md:col-span-2 flex justify-end">
          <span className="px-2.5 py-1 bg-college-navy/10 text-college-navy dark:text-college-gold text-xs font-medium rounded-lg border border-college-gold/20 inline-block w-fit">
            ID: {id}
          </span>
        </div>
        <div className="md:col-span-2 -mt-6">
          <PortalForms.Input
            label="Course Title"
            value={form.title}
            onChange={(val) => handleChange("title", val)}
            placeholder="e.g. BS Computer Science"
            required
          />
        </div>

        <div>
          <PortalForms.Input
            label="Duration"
            value={form.duration}
            onChange={(val) => handleChange("duration", val)}
            placeholder="e.g. 4 Years"
          />
        </div>

        <div>
          <PortalForms.Input
            label="Eligibility"
            value={form.eligibility}
            onChange={(val) => handleChange("eligibility", val)}
            placeholder="e.g. Intermediate or A-Level"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
            Exam System
          </label>
          <select
            value={form.examSystem}
            onChange={(e) => handleChange("examSystem", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
          >
            <option value="annual">Annual</option>
            <option value="semester">Semester</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
            Course Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-y min-h-[100px] dark:text-white dark:placeholder-gray-500"
            placeholder="Write a brief overview of the course..."
          />
        </div>
      </PortalForms.Section>

      {/* Campus Availability */}
      <PortalForms.Section title="Campus Availability">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {campuses.map((campus) => {
            const isSelected = selectedCampuses.includes(campus.id);
            return (
              <label
                key={campus.id}
                className={`
                    relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${isSelected
                    ? "border-college-navy bg-college-navy/10 pt-6 dark:bg-college-gold/10 dark:border-college-gold"
                    : "border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:bg-gray-50 dark:hover:bg-college-navy/80"
                  }
                  `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCampusToggle(campus.id)}
                  className="sr-only"
                />
                <Building2 className={`w-6 h-6 mb-2 ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium text-center ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>
                  {campus.name}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-college-navy dark:text-college-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default EditCourse;
