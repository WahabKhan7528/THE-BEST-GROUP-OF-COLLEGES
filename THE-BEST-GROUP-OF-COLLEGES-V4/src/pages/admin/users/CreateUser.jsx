import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalForms from "../../../components/shared/PortalForms";
import { useAdminContext } from "../../../context/AdminContext";
import { UserPlus, Building2, Shield, User, X } from "lucide-react";

const CreateUser = () => {
  const navigate = useNavigate();
  const { campuses, isDarkMode } = useAdminContext();
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
    setSelectedCampuses((prev) => {
      const updated = prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId];
      // Sync with form state immediately
      setForm((prevForm) => ({ ...prevForm, campuses: updated }));
      return updated;
    });
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
    <PortalForms
      title="Create New User"
      subtitle="Add a new administrator, faculty member, or student"
      backPath="/admin/users"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Create User"
      submitIcon={UserPlus}
    >
      {/* Role Selection Section */}
      <PortalForms.Section title="Role & Permissions">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {["Student", "Faculty", "Sub-Admin", "Super Admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setSelectedCampuses([]);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${role === r
                  ? "bg-college-navy/10 border-college-navy text-college-navy shadow-sm dark:bg-college-gold/10 dark:border-college-gold dark:text-college-gold"
                  : "bg-white border-college-navy/10 text-gray-600 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 pl-1">
            {role === "Super Admin" && "Full system access across all campuses"}
            {role === "Sub-Admin" && "Administrative access restricted to allocated campuses"}
            {role === "Faculty" && "Access to classes, grading, and materials"}
            {role === "Student" && "Access to learning portal and results"}
          </p>
        </div>
      </PortalForms.Section>

      {/* Basic Info Section */}
      <PortalForms.Section title="Personal Identity">
        <PortalForms.Input
          label="Full Name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          required
          placeholder="e.g. John Doe"
        />
        <PortalForms.Input
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          required
          placeholder="e.g. john@best.edu"
        />
        <PortalForms.Input
          label={role === "Student" ? "Roll Number / Student ID" : "Employee ID"}
          value={form.id}
          onChange={(v) => handleChange("id", v)}
          helper="Unique system identifier"
          placeholder="e.g. S-2024-001"
        />
        <PortalForms.Input
          label="Contact Number"
          value={form.contact}
          onChange={(v) => handleChange("contact", v)}
          placeholder="+92-xxx-xxxxxxx"
        />
      </PortalForms.Section>

      {/* Academic / Professional Details */}
      {(role === "Student" || role === "Faculty" || role === "Sub-Admin") && (
        <PortalForms.Section title={role === "Student" ? "Academic Information" : "Professional Details"}>
          {role === "Student" && (
            <>
              <PortalForms.Input
                label="Program / Department"
                value={form.program}
                onChange={(v) => handleChange("program", v)}
                placeholder="e.g. BSCS, BBA, LLB"
                required
              />
              <PortalForms.Input
                label="Semester"
                value={form.semester}
                onChange={(v) => handleChange("semester", v)}
                placeholder="e.g. 1st, 5th"
                required
              />
              <PortalForms.Input
                label="Section"
                value={form.section}
                onChange={(v) => handleChange("section", v)}
                placeholder="e.g. A, Morning"
                required
              />
              <PortalForms.Input
                label="Enrollment Year" // Extra useful field
                value={form.enrollmentYear || ""}
                onChange={(v) => handleChange("enrollmentYear", v)}
                placeholder="e.g. 2024"
              />
            </>
          )}

          {role === "Faculty" && (
            <>
              <PortalForms.Input
                label="Department"
                value={form.department}
                onChange={(v) => handleChange("department", v)}
                placeholder="e.g. Computer Science"
                required
              />
              <PortalForms.Input
                label="Designation"
                value={form.designation}
                onChange={(v) => handleChange("designation", v)}
                placeholder="e.g. Lecturer, Assistant Professor"
                required
              />
              <PortalForms.Input
                label="Qualification"
                value={form.qualification}
                onChange={(v) => handleChange("qualification", v)}
                placeholder="e.g. PhD, MSCS"
              />
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between items-center">
                  <span>Course & Class Allocation</span>
                  <button
                    type="button"
                    onClick={addAllocation}
                    className="text-xs text-college-navy dark:text-college-gold font-semibold hover:underline"
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
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-navy dark:focus:border-college-gold dark:text-white dark:placeholder-gray-500"
                          value={alloc.class}
                          onChange={(e) => handleAllocationChange(idx, 'class', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Subject (e.g. Operating Systems)"
                          className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-navy dark:focus:border-college-gold dark:text-white dark:placeholder-gray-500"
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
            <PortalForms.Input
              label="Designation / Role Title"
              value={form.designation}
              onChange={(v) => handleChange("designation", v)}
              placeholder="e.g. Campus Manager, Registrar"
            />
          )}
        </PortalForms.Section>
      )}

      {/* Campus Allocation Section */}
      {showCampusField && (
        <PortalForms.Section title="Campus Allocation">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-gray-50/50 dark:bg-college-navy/50 rounded-xl p-4 border border-college-navy/10 dark:border-college-gold/20">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                {isSingleCampus ? "Select Primary Campus" : "Select Allocated Campuses"}
              </h3>

              {isSingleCampus ? (
                <div className="relative">
                  <select
                    value={selectedCampuses[0] || ""}
                    onChange={(e) => {
                      setSelectedCampuses(e.target.value ? [e.target.value] : []);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-college-navy/20 dark:border-college-gold/20 bg-white dark:bg-college-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20"
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
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all duration-200 ${selectedCampuses.includes(campus.id)
                        ? "bg-college-navy/10 border-college-navy text-college-navy shadow-sm dark:bg-college-gold/20 dark:border-college-gold dark:text-college-gold dark:shadow-none"
                        : "bg-white border-college-navy/10 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus.id)}
                        onChange={() => handleCampusToggle(campus.id)}
                        className="w-4 h-4 text-college-navy rounded focus:ring-college-navy dark:focus:ring-college-gold border-college-navy/30 dark:border-white/20 bg-white dark:bg-college-navy"
                      />
                      <div className="ml-3">
                        <span
                          className={`block text-sm font-medium ${selectedCampuses.includes(campus.id)
                            ? "text-college-navy dark:text-college-gold"
                            : "text-gray-700 dark:text-gray-200"
                            }`}
                        >
                          {campus.name}
                        </span>
                        <span
                          className={`text-xs font-medium ${selectedCampuses.includes(campus.id)
                            ? "text-college-navy/70 dark:text-college-gold/70"
                            : "text-gray-500 dark:text-gray-400"
                            }`}
                        >
                          {campus.code}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PortalForms.Section>
      )}

      {/* Security Section */}
      <PortalForms.Section title="Security">
        <PortalForms.Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => handleChange("password", v)}
          helper="Leave blank to auto-generate secure password"
          placeholder="••••••••"
        />
        <PortalForms.Input
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(v) => handleChange("confirmPassword", v)}
          placeholder="••••••••"
        />
      </PortalForms.Section>
    </PortalForms>
  );
};

export default CreateUser;
