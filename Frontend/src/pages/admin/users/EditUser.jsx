import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../../components/admin/FormInput";
import { useAdminContext } from "../../../context/AdminContext";
import { UserCog, ArrowLeft, Building2, Shield, User, Save, Trash2, X } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses } = useAdminContext();
  const [role, setRole] = useState("Faculty");

  // Mock fetching user data based on ID
  useEffect(() => {
    // In a real app, fetch user data here
    if (id.startsWith("S-")) setRole("Student");
    else if (id.startsWith("F-")) setRole("Faculty");
    else if (id.startsWith("U-")) setRole("Sub-Admin");

    // Simulate loading data
    setForm({
      name: "Mock User Name",
      email: "mock@best.edu",
      id: id,
      department: "Computer Science",
      subjects: "Introduction to Programming",
      contact: "+92-300-1234567",
      campuses: ["main"],
      // Mock new fields
      program: "BSCS",
      semester: "5th",
      section: "A",
      enrollmentYear: "2023",
      designation: "Lecturer", // for faculty mock
      qualification: "MSCS", // for faculty mock
    });
    setSelectedCampuses(["main"]);
  }, [id]);

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
    enrollmentYear: "",
    designation: "",
    qualification: "",
  });
  // Allocations for Faculty
  const [allocations, setAllocations] = useState([{ class: "BSCS-5A", subject: "Operating Systems" }]); // Mock initial data

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
    // Validation logic here
    alert(`User ${id} updated successfully!`);
    navigate("/admin/users");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      alert(`User ${id} deleted.`);
      navigate("/admin/users");
    }
  };

  // Campus field visibility logic
  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  const isSingleCampus = role === "Student";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-700 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit User</h1>
            <p className="text-gray-500 text-sm">Update details for {id}</p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete User
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm p-8 space-y-8"
      >
        {/* Role Display (Read-Only) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold pb-2 border-b border-gray-100">
            <Shield size={18} className="text-blue-600" />
            <h2>Role & Permissions</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold text-sm border border-blue-100">
              {role}
            </span>
            <span className="text-sm text-gray-500">Role cannot be changed after creation.</span>
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
            />
            <FormInput
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              required
            />
            <FormInput
              label="System ID"
              value={form.id}
              disabled
              helper="Cannot be modified"
            />
            <FormInput
              label="Contact Number"
              value={form.contact}
              onChange={(v) => handleChange("contact", v)}
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
                    required
                  />
                  <FormInput
                    label="Semester"
                    value={form.semester}
                    onChange={(v) => handleChange("semester", v)}
                    required
                  />
                  <FormInput
                    label="Section"
                    value={form.section}
                    onChange={(v) => handleChange("section", v)}
                    required
                  />
                  <FormInput
                    label="Enrollment Year"
                    value={form.enrollmentYear || ""}
                    onChange={(v) => handleChange("enrollmentYear", v)}
                  />
                </>
              )}

              {role === "Faculty" && (
                <>
                  <FormInput
                    label="Department"
                    value={form.department}
                    onChange={(v) => handleChange("department", v)}
                    required
                  />
                  <FormInput
                    label="Designation"
                    value={form.designation}
                    onChange={(v) => handleChange("designation", v)}
                    required
                  />
                  <FormInput
                    label="Qualification"
                    value={form.qualification}
                    onChange={(v) => handleChange("qualification", v)}
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
                {isSingleCampus ? "Primary Campus" : "Allocated Campuses"}
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
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
