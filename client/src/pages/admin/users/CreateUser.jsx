import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../../schemas/userSchema";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { useAdminContext } from "../../../context/AdminContext";
import { UserPlus, X } from "lucide-react";

const CreateUser = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, getSubAdminCampus } = useAdminContext();
  const toast = useToast();
  const [role, setRole] = useState("Faculty");
  const [allocations, setAllocations] = useState([{ class: "", subject: "" }]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);

  // Pre-lock campus to sub-admin's campus on mount
  useEffect(() => {
    if (!isSuperAdmin) {
      const campus = getSubAdminCampus();
      if (campus) setSelectedCampuses([campus]);
    }
  }, [isSuperAdmin, getSubAdminCampus]);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "", email: "", id: "", subjects: "",
      contact: "", password: "", confirmPassword: "",
      course: "", semester: "", class: "", academicSystem: "Semester",
      designation: "", qualification: ""
    }
  });

  const academicSystem = watch("academicSystem");

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

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId]
    );
  };

  const onSubmit = (data) => {
    if (role !== "Super Admin" && selectedCampuses.length === 0) {
      toast.warning(`Please allocate at least one campus for ${role}`);
      return;
    }
    toast.success(`User created as ${role} (mock)`);
    navigate("/admin/users");
  };

  // Campus field visibility logic
  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  // Faculty now uses single-campus too (one faculty per campus)
  const isSingleCampus = ["Student", "Sub-Admin", "Faculty"].includes(role);

  return (
    <PortalForm
      title="Create New User"
      subtitle="Add a new administrator, faculty member, or student"
      backPath="/admin/users"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Create User"
      submitIcon={UserPlus}
      submitting={isSubmitting}
    >
      {/* Role Selection Section */}
      <PortalForm.Section title="Role & Permissions">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {["Student", "Faculty", ...(isSuperAdmin ? ["Sub-Admin", "Super Admin"] : [])].map((r) => (
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
      </PortalForm.Section>

      {/* Basic Info Section */}
      <PortalForm.Section title="Personal Identity">
        <PortalForm.Input
          label="Full Name"
          registration={register("name")}
          error={errors.name?.message}
          required
          placeholder="e.g. John Doe"
        />
        <PortalForm.Input
          label="Email Address"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          required
          placeholder="e.g. john@best.edu"
        />
        <PortalForm.Input
          label={role === "Student" ? "Roll Number / Student ID" : "Employee ID"}
          registration={register("id")}
          helper="Unique system identifier"
          placeholder="e.g. S-2024-001"
        />
        <PortalForm.Input
          label="Contact Number"
          registration={register("contact")}
          placeholder="+92-xxx-xxxxxxx"
        />
      </PortalForm.Section>

      {/* Academic / Professional Details */}
      {(role === "Student" || role === "Faculty" || role === "Sub-Admin") && (
        <PortalForm.Section title={role === "Student" ? "Academic Information" : "Professional Details"}>
          {role === "Student" && (
            <>
              <PortalForm.Input
                label="Course"
                registration={register("course")}
                placeholder="e.g. BSCS, BBA, LLB"
                required
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic System</label>
                <div className="flex gap-4 p-2 bg-gray-50/50 dark:bg-college-navy/30 rounded-xl border border-college-navy/10 dark:border-college-gold/10">
                  {["Semester", "Annual"].map((sys) => (
                    <label key={sys} className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-college-navy/5 dark:hover:bg-college-gold/5 transition-colors">
                      <input
                        type="radio"
                        value={sys}
                        {...register("academicSystem")}
                        className="w-4 h-4 text-college-navy focus:ring-college-navy dark:focus:ring-college-gold border-gray-300 dark:border-white/20"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{sys}</span>
                    </label>
                  ))}
                </div>
              </div>
              <PortalForm.Input
                label={academicSystem === "Annual" ? "Year" : "Semester"}
                registration={register("semester")}
                placeholder={academicSystem === "Annual" ? "e.g. 1st Year, 2nd Year" : "e.g. 1st, 5th"}
                required
              />
              <PortalForm.Input
                label="Class"
                registration={register("class")}
                placeholder="e.g. A, Morning"
                required
              />
              <PortalForm.Input
                label="Enrollment Year"
                registration={register("enrollmentYear")}
                placeholder="e.g. 2024"
              />
            </>
          )}

          {role === "Faculty" && (
            <>
              <PortalForm.Input
                label="Designation"
                registration={register("designation")}
                placeholder="e.g. Lecturer, Assistant Professor"
                required
              />
              <PortalForm.Input
                label="Qualification"
                registration={register("qualification")}
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
            <PortalForm.Input
              label="Designation / Role Title"
              registration={register("designation")}
              placeholder="e.g. Campus Manager, Registrar"
            />
          )}
        </PortalForm.Section>
      )}

      {/* Campus Allocation Section */}
      {showCampusField && (
        <PortalForm.Section title="Campus Allocation">
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
                    disabled={!isSuperAdmin}
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
        </PortalForm.Section>
      )}

      {/* Security Section */}
      <PortalForm.Section title="Security">
        <PortalForm.Input
          label="Password"
          type="password"
          registration={register("password")}
          helper="Leave blank to auto-generate secure password"
          placeholder="••••••••"
        />
        <PortalForm.Input
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
          placeholder="••••••••"
        />
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateUser;
