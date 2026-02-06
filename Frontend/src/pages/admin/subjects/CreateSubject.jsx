import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";

const CreateSubject = () => {
  const { campuses } = useAdminContext();
  const [form, setForm] = useState({
    name: "",
    code: "",
    class: "",
    faculty: "",
    offeredAt: [],
  });
  const [selectedCampuses, setSelectedCampuses] = useState([]);

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
      alert(
        "Please select at least one campus where this subject will be offered",
      );
      return;
    }
    const campusNames = selectedCampuses
      .map((cId) => campuses.find((c) => c.id === cId)?.name)
      .join(", ");
    alert(`Subject created and offered at: ${campusNames} (mock)`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Subject Management</p>
        <h1 className="text-2xl font-semibold text-gray-900">Create subject</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Subject name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            required
          />
          <FormInput
            label="Code"
            value={form.code}
            onChange={(v) => handleChange("code", v)}
            placeholder="CS-312"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Class"
            value={form.class}
            onChange={(v) => handleChange("class", v)}
            placeholder="BSCS - 3rd"
          />
          <FormInput
            label="Assign faculty"
            value={form.faculty}
            onChange={(v) => handleChange("faculty", v)}
          />
        </div>

        {/* Offered at Campuses */}
        <div className="border-t pt-4 mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Offered at Campuses <span className="text-red-500">*</span>
          </h3>
          <div className="space-y-2">
            {campuses.map((campus) => (
              <label
                key={campus.id}
                className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCampuses.includes(campus.id)}
                  onChange={() => handleCampusToggle(campus.id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-3 font-medium text-gray-800">
                  {campus.name}
                </span>
                <span className="text-sm text-gray-500 ml-auto">
                  ({campus.code})
                </span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This subject will be available at selected campuses
          </p>
        </div>

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
            Save subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubject;
