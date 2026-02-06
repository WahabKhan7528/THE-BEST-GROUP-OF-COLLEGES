import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";

const EditClass = () => {
  const { id } = useParams();
  const { campuses } = useAdminContext();
  const [form, setForm] = useState({
    name: "BSCS - 3rd Semester",
    sections: "A, B",
    subjects: "OS, DBMS, DSA",
    faculty: "Prof. Ahmed Raza",
    campus: "main",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Class ${id} updated (mock)`);
  };

  const getCampusName = () => {
    return campuses.find((c) => c.id === form.campus)?.name || form.campus;
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">Class Management</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Edit class {id}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        {/* Campus (Read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campus (Read-only)
          </label>
          <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
            {getCampusName()}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Campus assignment cannot be changed after class creation
          </p>
        </div>

        <FormInput
          label="Class name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Sections"
            value={form.sections}
            onChange={(v) => handleChange("sections", v)}
          />
          <FormInput
            label="Subjects"
            value={form.subjects}
            onChange={(v) => handleChange("subjects", v)}
          />
        </div>
        <FormInput
          label="Assign faculty"
          value={form.faculty}
          onChange={(v) => handleChange("faculty", v)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-700 hover:bg-gray-50"
            type="button"
          >
            Remove class
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
