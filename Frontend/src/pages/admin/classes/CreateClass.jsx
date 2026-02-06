import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";

const CreateClass = () => {
  const { campuses, currentAdmin, isSuperAdmin } = useAdminContext();
  const [form, setForm] = useState({
    name: "",
    sections: "",
    subjects: "",
    faculty: "",
    campus: isSuperAdmin ? "" : currentAdmin?.allocatedCampuses?.[0] || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campus) {
      alert("Please select a campus");
      return;
    }
    const campusName = campuses.find((c) => c.id === form.campus)?.name;
    alert(`Class created for ${campusName} (mock)`);
  };

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return `${currentAdmin?.allocatedCampuses?.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")}`;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Class Management</p>
        <h1 className="text-2xl font-semibold text-gray-900">Create class</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        {/* Campus Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campus <span className="text-red-500">*</span>
          </label>
          {isSuperAdmin ? (
            <select
              value={form.campus}
              onChange={(e) => handleChange("campus", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select a campus</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
              {getCampusLabel()}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            This class will be campus-specific
          </p>
        </div>

        <FormInput
          label="Class name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          placeholder="BSCS - 3rd Semester"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Sections"
            value={form.sections}
            onChange={(v) => handleChange("sections", v)}
            placeholder="A, B, C"
          />
          <FormInput
            label="Subjects"
            value={form.subjects}
            onChange={(v) => handleChange("subjects", v)}
            placeholder="OS, DBMS, DSA"
          />
        </div>
        <FormInput
          label="Assign faculty"
          value={form.faculty}
          onChange={(v) => handleChange("faculty", v)}
          placeholder="Prof. Ahmed Raza"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
          >
            Save class
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
