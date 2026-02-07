import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/admin/FormInput";
import { useAdminContext } from "../../../context/AdminContext";
import { UserPlus, ArrowLeft, Building2, Shield, User } from "lucide-react";

const CreateUser = () => {
  const navigate = useNavigate();
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
    navigate("/admin/users");
  };

  // Campus field visibility logic
  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  const isSingleCampus = role === "Student";
  const isMultiCampus = ["Faculty", "Sub-Admin"].includes(role);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/users")}
          className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-700 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create New User</h1>
          <p className="text-gray-500 text-sm">Add a new administrator, faculty member, or student</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm p-8 space-y-8"
      >
        {/* Role Selection Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
            <Shield size={18} className="text-purple-600" />
            <h2>Role & Permissions</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account Type</label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {["Student", "Faculty", "Sub-Admin", "Super Admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setSelectedCampuses([]);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${role === r
                        ? "bg-purple-50 border-purple-200 text-purple-700 shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 pl-1">
                {role === "Super Admin" && "Full system access across all campuses"}
                {role === "Sub-Admin" && "Administrative access restricted to allocated campuses"}
                {role === "Faculty" && "Access to classes, grading, and materials"}
                {role === "Student" && "Access to learning portal and results"}
              </p>
            </div>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
            <User size={18} className="text-blue-600" />
            <h2>Personal Identity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              required
              placeholder="e.g. John Doe"
            />
            <FormInput
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              required
              placeholder="e.g. john@best.edu"
            />
            <FormInput
              label={role === "Student" ? "Roll Number / Student ID" : "Employee ID"}
              value={form.id}
              onChange={(v) => handleChange("id", v)}
              helper="Unique system identifier"
              placeholder="e.g. S-2024-001"
            />
            <FormInput
              label="Contact Number"
              value={form.contact}
              onChange={(v) => handleChange("contact", v)}
              placeholder="+92-xxx-xxxxxxx"
            />
          </div>
        </div>

        {/* Academic Details (Conditional) */}
        {(role === "Student" || role === "Faculty") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
              <Building2 size={18} className="text-emerald-600" />
              <h2>Academic Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Department / Class"
                value={form.department}
                onChange={(v) => handleChange("department", v)}
                placeholder={role === "Student" ? "e.g. BSCS-5A" : "e.g. Computer Science"}
              />
              {role === "Student" && (
                <FormInput
                  label="Section"
                  value={form.section}
                  onChange={(v) => handleChange("section", v)}
                  placeholder="e.g. Morning A"
                />
              )}
              {role === "Faculty" && (
                <FormInput
                  label="Specialization / Subjects"
                  value={form.subjects}
                  onChange={(v) => handleChange("subjects", v)}
                  placeholder="e.g. Operating Systems, Database"
                />
              )}
            </div>
          </div>
        )}

        {/* Campus Allocation Section */}
        {showCampusField && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
              <Building2 size={18} className="text-amber-600" />
              <h2>Campus Allocation</h2>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3 block">
                {isSingleCampus ? "Select Primary Campus" : "Select Allocated Campuses"}
              </h3>

              {isSingleCampus ? (
                <div className="relative">
                  <select
                    value={selectedCampuses[0] || ""}
                    onChange={(e) => {
                      setSelectedCampuses(e.target.value ? [e.target.value] : []);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    required
                  >
                    <option value="">Select a campus...</option>
                    {campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name} ({campus.code})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {campuses.map((campus) => (
                    <label
                      key={campus.id}
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedCampuses.includes(campus.id)
                          ? "bg-purple-50 border-purple-200 shadow-sm"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus.id)}
                        onChange={() => handleCampusToggle(campus.id)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <span className={`block text-sm font-medium ${selectedCampuses.includes(campus.id) ? "text-purple-900" : "text-gray-700"}`}>
                          {campus.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {campus.code}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Security Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
            <Shield size={18} className="text-slate-600" />
            <h2>Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Password"
              type="password"
              value={form.password}
              onChange={(v) => handleChange("password", v)}
              helper="Leave blank to auto-generate secure password"
              placeholder="••••••••"
            />
            <FormInput
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            <UserPlus size={18} />
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
