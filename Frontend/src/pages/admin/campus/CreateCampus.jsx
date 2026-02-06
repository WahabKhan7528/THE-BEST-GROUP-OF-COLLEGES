import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";
import Button from "../../../components/ui/Button";

const CreateCampus = () => {
  const navigate = useNavigate();
  const { addCampus } = useAdminContext();
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
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
    alert("Campus created successfully! (Mock - will be connected to backend)");
    navigate("/admin/campus");
  };

  const handleCancel = () => {
    navigate("/admin/campus");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create New Campus
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Campus ID"
          name="id"
          type="text"
          placeholder="e.g., main, law, hala"
          value={formData.id}
          onChange={handleChange}
          error={errors.id}
          required
          hint="Unique identifier for the campus (lowercase, no spaces)"
        />

        <FormInput
          label="Campus Name"
          name="name"
          type="text"
          placeholder="e.g., Main Campus, Law Campus"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormInput
          label="Campus Code"
          name="code"
          type="text"
          placeholder="e.g., MC, LC, HC"
          value={formData.code}
          onChange={handleChange}
          error={errors.code}
          required
          hint="Short code for the campus (2-3 characters)"
        />

        <FormInput
          label="Location"
          name="location"
          type="text"
          placeholder="e.g., Islamabad, Hala"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter campus description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Create Campus
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampus;
