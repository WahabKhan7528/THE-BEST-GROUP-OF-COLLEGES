import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import PortalForms from "../../../components/shared/PortalForms";

const CreateCampus = () => {
  const navigate = useNavigate();
  const { addCampus, isDarkMode } = useAdminContext();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    code: "",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = "Campus ID is required";
    if (!formData.name.trim()) newErrors.name = "Campus name is required";
    if (!formData.code.trim()) newErrors.code = "Campus code is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    // Fallback for FormInput which expects (value, string)
    if (typeof e === 'string' && value === undefined) {
      // ignore
      return;
    }
    const val = e.target ? e.target.value : e;
    const key = e.target ? e.target.name : name; // not perfect via direct FormInput, better to use manual wrapper
  };

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addCampus(formData);
    navigate("/admin/campus");
  };

  return (
    <PortalForms
      title="Create New Campus"
      subtitle="Add a new campus to the institution"
      backPath="/admin/campus"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/campus")}
      submitLabel="Create Campus"
    >
      <PortalForms.Section>
        <PortalForms.Input
          label="Campus ID"
          name="id"
          type="text"
          placeholder="e.g., main, law, hala"
          value={formData.id}
          onChange={(v) => handleFieldChange("id", v)}
          error={errors.id}
          required
          hint="Unique identifier for the campus (lowercase, no spaces)"
        />

        <PortalForms.Input
          label="Campus Name"
          name="name"
          type="text"
          placeholder="e.g., Main Campus, Law Campus"
          value={formData.name}
          onChange={(v) => handleFieldChange("name", v)}
          error={errors.name}
          required
        />

        <PortalForms.Input
          label="Campus Code"
          name="code"
          type="text"
          placeholder="e.g., MC, LC, HC"
          value={formData.code}
          onChange={(v) => handleFieldChange("code", v)}
          error={errors.code}
          required
          hint="Short code for the campus (2-3 characters)"
        />

        <PortalForms.Input
          label="Location"
          name="location"
          type="text"
          placeholder="e.g., Islamabad, Hala"
          value={formData.location}
          onChange={(v) => handleFieldChange("location", v)}
          error={errors.location}
          required
        />

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter campus description (optional)"
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            rows="4"
            className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy dark:focus:ring-college-gold"
          />
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default CreateCampus;
