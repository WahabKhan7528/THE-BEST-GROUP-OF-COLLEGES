import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";

const CreateCourse = () => {
  const { campuses } = useAdminContext();
  const [form, setForm] = useState({
    title: "",
    duration: "",
    eligibility: "",
    fee: "",
    description: "",
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
        "Please select at least one campus where this course will be offered",
      );
      return;
    }
    const campusNames = selectedCampuses
      .map((cId) => campuses.find((c) => c.id === cId)?.name)
      .join(", ");
    alert(`Course created and offered at: ${campusNames} (mock)`);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Courses (Public Site)</p>
        <h1 className="text-2xl font-semibold text-gray-900">Create course</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        <FormInput
          label="Course title"
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Duration"
            value={form.duration}
            onChange={(v) => handleChange("duration", v)}
            placeholder="4 years"
          />
          <FormInput
            label="Eligibility"
            value={form.eligibility}
            onChange={(v) => handleChange("eligibility", v)}
            placeholder="Intermediate"
          />
          <FormInput
            label="Fee information"
            value={form.fee}
            onChange={(v) => handleChange("fee", v)}
            placeholder="$1200/semester"
          />
        </div>
        <label className="text-sm text-gray-700 space-y-1 block">
          Description
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>

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
            This course will be listed for selected campuses on the public site
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
            Save course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
