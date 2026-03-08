import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import PortalForms from "../../../components/shared/PortalForms";
import { Building2, CheckCircle2, Plus } from "lucide-react";

const CreateSubject = () => {
  const { campuses, isDarkMode } = useAdminContext();
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
    navigate("/admin/subjects");
  };

  return (
    <PortalForms
      title="Create New Subject"
      subtitle="Add a new subject to the curriculum and assign to campuses"
      backPath="/admin/subjects"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/subjects")}
      submitLabel="Create Subject"
      submitIcon={Plus}
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
      </PortalForms.Section>

      {/* Campus Availability Section */}
      <PortalForms.Section title="Campus Availability" className="!space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 col-span-1 md:col-span-2">
          Select the campuses where this subject will be offered <span className="text-red-500">*</span>
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
                    : 'border-gray-100 bg-white hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
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
                <span className={`text-sm font-medium text-center ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-300'}`}>
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

export default CreateSubject;
