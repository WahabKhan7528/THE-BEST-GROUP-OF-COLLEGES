import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/admin/FormInput";
import { useAdminContext } from "../../../context/AdminContext";
import { UserPlus, ArrowLeft, Building2, Shield, User, X } from "lucide-react";

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
    // New fields
    program: "",
    semester: "",
    section: "",
    designation: "",
    qualification: "",
  });
  // Allocations for Faculty: Array of { class: "", subject: "" }
  const [allocations, setAllocations] = useState([{ class: "", subject: "" }]);

  const handleAllocationChange = (index, field, value) => {
    const newAllocations = [...allocations];
    newAllocations[index][field] = value;
    setAllocations(newAllocations);
  };

  const addAllocation = () => {
    setAllocations([...allocations, { class: "", subject: "" }]);
  };

  const removeAllocation = (index) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };
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

    const userData = {
      ...form,
      role,
      allocatedCampuses: selectedCampuses,
      teachingAllocations: role === "Faculty" ? allocations : []
    };

    let alertMessage = `User created as ${role} (mock)`;
    if (role === "Faculty") {
      alertMessage += `\nClasses Assigned: ${allocations.length}`;
      allocations.forEach(a => alertMessage += `\n- ${a.subject} to ${a.class}`);
    }
    alert(alertMessage);
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
            <Shield size={18} className="text-blue-600" />
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
                      ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
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

        {/* Academic / Professional Details */}
        {(role === "Student" || role === "Faculty" || role === "Sub-Admin") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
              <Building2 size={18} className="text-sky-600" />
              <h2>{role === "Student" ? "Academic Information" : "Professional Details"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {role === "Student" && (
                <>
                  <FormInput
                    label="Program / Department"
                    value={form.program}
                    onChange={(v) => handleChange("program", v)}
                    placeholder="e.g. BSCS, BBA, LLB"
                    required
                  />
                  <FormInput
                    label="Semester"
                    value={form.semester}
                    onChange={(v) => handleChange("semester", v)}
                    placeholder="e.g. 1st, 5th"
                    required
                  />
                  <FormInput
                    label="Section"
                    value={form.section}
                    onChange={(v) => handleChange("section", v)}
                    placeholder="e.g. A, Morning"
                    required
                  />
                  <FormInput
                    label="Enrollment Year" // Extra useful field
                    value={form.enrollmentYear || ""}
                    onChange={(v) => handleChange("enrollmentYear", v)}
                    placeholder="e.g. 2024"
                  />
                </>
              )}

              {role === "Faculty" && (
                <>
                  <FormInput
                    label="Department"
                    value={form.department}
                    onChange={(v) => handleChange("department", v)}
                    placeholder="e.g. Computer Science"
                    required
                  />
                  <FormInput
                    label="Designation"
                    value={form.designation}
                    onChange={(v) => handleChange("designation", v)}
                    placeholder="e.g. Lecturer, Assistant Professor"
                    required
                  />
                  <FormInput
                    label="Qualification"
                    value={form.qualification}
                    onChange={(v) => handleChange("qualification", v)}
                    placeholder="e.g. PhD, MSCS"
                  />
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-medium text-gray-700 flex justify-between items-center">
                      <span>Course & Class Allocation</span>
                      <button
                        type="button"
                        onClick={addAllocation}
                        className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        + Add Class
                      </button>
                    </label>
                    <div className="space-y-3">
                      {allocations.map((alloc, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Class / Section (e.g. BSCS-5A)"
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                              value={alloc.class}
                              onChange={(e) => handleAllocationChange(idx, 'class', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Subject (e.g. Operating Systems)"
                              className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-500"
                              value={alloc.subject}
                              onChange={(e) => handleAllocationChange(idx, 'subject', e.target.value)}
                            />
                          </div>
                          {allocations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAllocation(idx)}
                              className="text-rose-500 hover:text-rose-700 p-2"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(role === "Sub-Admin" || role === "Super Admin") && (
                <FormInput
                  label="Designation / Role Title"
                  value={form.designation}
                  onChange={(v) => handleChange("designation", v)}
                  placeholder="e.g. Campus Manager, Registrar"
                />
              )}
            </div>
          </div>
        )}

        {/* Campus Allocation Section */}
        {showCampusField && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
              <Building2 size={18} className="text-cyan-600" />
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                        ? "bg-blue-50 border-blue-200 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus.id)}
                        onChange={() => handleCampusToggle(campus.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <span className={`block text-sm font-medium ${selectedCampuses.includes(campus.id) ? "text-blue-900" : "text-gray-700"}`}>
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
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5 transition-all"
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
