import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForms from "../../../components/shared/PortalForms";
import { Building2, CheckCircle2, Save, Trash2 } from "lucide-react";

const EditSubject = () => {
  const { id } = useParams();
  const { campuses, isDarkMode } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    class: "",
    faculty: "",
    description: "",
    offeredAt: [],
  });

  useEffect(() => {
    // Mock fetch data
    setForm({
      name: "Operating Systems",
      code: "CS-312",
      class: "BSCS - 3rd Semester",
      faculty: "Prof. Ahmed Raza",
      description: "A course about OS.",
      offeredAt: ["main", "law"],
    });
  }, [id]);

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
    alert(`Subject ${id} updated successfully!`);
    navigate("/admin/subjects");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this subject?")) {
      alert(`Subject ${id} deleted.`);
      navigate("/admin/subjects");
    }
  };

  return (
    <PortalForms
      title="Edit Subject"
      subtitle="Update subject details and campus availability"
      backPath="/admin/subjects"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/subjects")}
      submitLabel="Save Changes"
      submitIcon={Save}
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
      {/* Subject Details Section */}
      <PortalForms.Section title="Subject Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Subject Name"
            value={form.name}
            onChange={(val) => handleChange("name", val)}
            required
            placeholder="e.g. Operating Systems"
          />
        </div>

        <div>
          <PortalForms.Input
            label="Subject Code"
            value={form.code}
            onChange={(val) => handleChange("code", val)}
            required
            placeholder="e.g. CS-312"
          />
        </div>

        <div>
          <PortalForms.Input
            label="Target Class"
            value={form.class}
            onChange={(val) => handleChange("class", val)}
            placeholder="e.g. BSCS - 3rd Semester"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Assign Faculty"
            value={form.faculty}
            onChange={(val) => handleChange("faculty", val)}
            placeholder="e.g. Prof. Ahmed Raza"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-college-navy dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Brief description of the subject..."
            rows="3"
            className="w-full p-4 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </PortalForms.Section>

      {/* Campus Availability Section */}
      <PortalForms.Section title="Campus Availability" className="!space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 pb-2 col-span-1 md:col-span-2">
          Select the campuses where this subject will be offered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {campuses.map((campus) => {
            const isSelected = form.offeredAt.includes(campus.id);
            return (
              <label
                key={campus.id}
                className={`
                    relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${isSelected
                    ? 'border-college-navy bg-college-navy/10 dark:bg-college-gold/10 dark:border-college-gold shadow-sm'
                    : 'border-gray-100 bg-white dark:bg-college-navy dark:border-college-gold/20 hover:bg-gray-50 dark:hover:bg-college-navy/80'
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

export default EditSubject;
