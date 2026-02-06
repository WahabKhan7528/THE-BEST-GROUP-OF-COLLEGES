import { useState } from "react";
import FormInput from "../../../components/admin/FormInput";
import { useAdminContext } from "../../../context/AdminContext";

const CreateUser = () => {
  const { campuses } = useAdminContext();
  const [role, setRole] = useState("Faculty");
  const [form, setForm] = useState({
    name: "",
    email: "",
    id: "",
    department: "",
    subjects: "",
    contact: "",
    password: "",
    confirmPassword: "",
    campuses: [],
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
    setForm((prev) => ({ ...prev, campuses: selectedCampuses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Name and Email are required");
      return;
    }

    if (role !== "Super Admin" && selectedCampuses.length === 0) {
      alert(`Please allocate at least one campus for ${role}`);
      return;
    }

    const userData = { ...form, role, allocatedCampuses: selectedCampuses };
    alert(
      `User created as ${role} (mock)\nAllocated campuses: ${selectedCampuses.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")}`,
    );
  };

  // Campus field visibility logic
  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  const isSingleCampus = role === "Student";
  const isMultiCampus = ["Faculty", "Sub-Admin"].includes(role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">User Management</p>
          <h1 className="text-2xl font-semibold text-gray-900">Create user</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="text-sm text-gray-700 space-y-1">
            Role
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setSelectedCampuses([]); // Reset campuses when role changes
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Sub-Admin">Sub-Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {role === "Super Admin" && "Can access and manage all campuses"}
              {role === "Sub-Admin" && "Can manage only allocated campuses"}
              {role === "Faculty" && "Can teach at multiple campuses"}
              {role === "Student" && "Allocated to single campus only"}
            </p>
          </label>
          <FormInput
            label="Name"
            value={form.name}
            onChange={(v) => handleChange("name", v)}
            required
          />
          <FormInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => handleChange("email", v)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="User ID"
            value={form.id}
            onChange={(v) => handleChange("id", v)}
            helper="Admin ID / Faculty ID / Student ID"
          />
          <FormInput
            label="Department / Class"
            value={form.department}
            onChange={(v) => handleChange("department", v)}
          />
          <FormInput
            label="Section (students)"
            value={form.section}
            onChange={(v) => handleChange("section", v)}
          />
        </div>

        {/* Campus Allocation Section */}
        {showCampusField && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {isSingleCampus ? "Allocate Campus" : "Allocate Campuses"}
            </h3>
            {isSingleCampus ? (
              <select
                value={selectedCampuses[0] || ""}
                onChange={(e) => {
                  setSelectedCampuses(e.target.value ? [e.target.value] : []);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Subjects (faculty)"
            value={form.subjects}
            onChange={(v) => handleChange("subjects", v)}
            placeholder="OS, DBMS"
          />
          <FormInput
            label="Contact info"
            value={form.contact}
            onChange={(v) => handleChange("contact", v)}
            placeholder="+92-xxx"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => handleChange("password", v)}
            helper="Leave blank to auto-generate"
          />
          <FormInput
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={(v) => handleChange("confirmPassword", v)}
          />
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
            Save user
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
