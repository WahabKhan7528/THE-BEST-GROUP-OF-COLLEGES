import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForms from "../../../components/shared/PortalForms";
import { useAdminContext } from "../../../context/AdminContext";
import { Save, Trash2, X } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses, isDarkMode } = useAdminContext();
  const [role, setRole] = useState("Faculty");

  // Mock fetching user data based on ID
  useEffect(() => {
    if (id.startsWith("S-")) setRole("Student");
    else if (id.startsWith("F-")) setRole("Faculty");
    else if (id.startsWith("U-")) setRole("Sub-Admin");

    setForm({
      name: "Mock User Name",
      email: "mock@best.edu",
      id: id,
      department: "Computer Science",
      subjects: "Introduction to Programming",
      contact: "+92-300-1234567",
      campuses: ["main"],
      program: "BSCS",
      semester: "5th",
      section: "A",
      enrollmentYear: "2023",
      designation: "Lecturer",
      qualification: "MSCS",
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
    program: "",
    semester: "",
    section: "",
    enrollmentYear: "",
    designation: "",
    qualification: "",
  });

  const [allocations, setAllocations] = useState([{ class: "BSCS-5A", subject: "Operating Systems" }]);

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
    alert(`User ${id} updated successfully!`);
    navigate("/admin/users");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      alert(`User ${id} deleted.`);
      navigate("/admin/users");
    }
  };

  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  const isSingleCampus = role === "Student";

  return (
    <PortalForms
      title="Edit User"
      subtitle={`Update details for ${id}`}
      backPath="/admin/users"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Save Changes"
      submitIcon={Save}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
          type="button"
        >
          Delete
        </PublicButton>
      }
    >
      {/* Role Display (Read-Only) */}
      <PortalForms.Section title="Role & Permissions">
        <div className="col-span-1 md:col-span-2 flex items-center gap-3">
          <span className="px-4 py-2 bg-college-navy/10 text-college-navy dark:text-college-gold dark:border-college-gold/20 rounded-lg font-semibold text-sm border border-college-navy/20">
            {role}
          </span>
          <span className="text-sm text-gray-500">Role cannot be changed after creation.</span>
        </div>
      </PortalForms.Section>

      {/* Basic Info Section */}
      <PortalForms.Section title="Personal Identity">
        <PortalForms.Input
          label="Full Name"
          value={form.name}
          onChange={(v) => handleChange("name", v)}
          required
        />
        <PortalForms.Input
          label="Email Address"
          type="email"
          value={form.email}
          onChange={(v) => handleChange("email", v)}
          required
        />
        <PortalForms.Input
          label="System ID"
          value={form.id}
          disabled
          helper="Cannot be modified"
        />
        <PortalForms.Input
          label="Contact Number"
          value={form.contact}
          onChange={(v) => handleChange("contact", v)}
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
                required
              />
              <PortalForms.Input
                label="Semester"
                value={form.semester}
                onChange={(v) => handleChange("semester", v)}
                required
              />
              <PortalForms.Input
                label="Section"
                value={form.section}
                onChange={(v) => handleChange("section", v)}
                required
              />
              <PortalForms.Input
                label="Enrollment Year"
                value={form.enrollmentYear || ""}
                onChange={(v) => handleChange("enrollmentYear", v)}
              />
            </>
          )}

          {role === "Faculty" && (
            <>
              <PortalForms.Input
                label="Department"
                value={form.department}
                onChange={(v) => handleChange("department", v)}
                required
              />
              <PortalForms.Input
                label="Designation"
                value={form.designation}
                onChange={(v) => handleChange("designation", v)}
                required
              />
              <PortalForms.Input
                label="Qualification"
                value={form.qualification}
                onChange={(v) => handleChange("qualification", v)}
              />
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex justify-between items-center">
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
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-navy dark:focus:border-college-gold dark:text-white dark:placeholder-gray-500"
                          value={alloc.class}
                          onChange={(e) => handleAllocationChange(idx, 'class', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Subject (e.g. Operating Systems)"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-navy dark:focus:border-college-gold dark:text-white dark:placeholder-gray-500"
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
            />
          )}
        </PortalForms.Section>
      )}

      {/* Campus Allocation Section */}
      {showCampusField && (
        <PortalForms.Section title="Campus Allocation">
          <div className="col-span-1 md:col-span-2">
            <div className="bg-gray-50/50 dark:bg-college-navy/30 rounded-xl p-4 border border-college-navy/10 dark:border-college-gold/10">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 block">
                {isSingleCampus ? "Primary Campus" : "Allocated Campuses"}
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
    </PortalForms>
  );
};

export default EditUser;
