import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../../schemas/userSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForms from "../../../components/shared/PortalForms";
import { useAdminContext } from "../../../context/AdminContext";
import { Save, Trash2, X } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const [role, setRole] = useState("Faculty");

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "", email: "", id: "", subjects: "",
      contact: "", password: "", confirmPassword: "",
      course: "", semester: "", class: "", academicSystem: "Semester", enrollmentYear: "",
      designation: "", qualification: ""
    }
  });

  const academicSystem = watch("academicSystem");

  useEffect(() => {
    if (id.startsWith("S-")) setRole("Student");
    else if (id.startsWith("F-")) setRole("Faculty");
    else if (id.startsWith("U-")) setRole("Sub-Admin");

    reset({
      name: "Mock User Name",
      email: "mock@best.edu",
      id: id,
      subjects: "Introduction to Programming",
      contact: "+92-300-1234567",
      course: "BSCS",
      academicSystem: "Semester",
      semester: "5th",
      class: "A",
      enrollmentYear: "2023",
      designation: "Lecturer",
      qualification: "MSCS",
    });
    setSelectedCampuses(["main"]);
  }, [id, reset]);

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

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((cid) => cid !== campusId)
        : [...prev, campusId]
    );
  };

  const onSubmit = () => {
    toast.success(`User ${id} updated successfully`);
    navigate("/admin/users");
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({ title: "Delete User", message: "Are you sure you want to delete this user? This action cannot be undone.", confirmText: "Delete", variant: "danger" });
    if (confirmed) {
      toast.success(`User ${id} deleted`);
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
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
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
          registration={register("name")}
          error={errors.name?.message}
          required
        />
        <PortalForms.Input
          label="Email Address"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          required
        />
        <PortalForms.Input
          label="System ID"
          registration={register("id")}
          disabled
          helper="Cannot be modified"
        />
        <PortalForms.Input
          label="Contact Number"
          registration={register("contact")}
        />
      </PortalForms.Section>

      {/* Academic / Professional Details */}
      {(role === "Student" || role === "Faculty" || role === "Sub-Admin") && (
        <PortalForms.Section title={role === "Student" ? "Academic Information" : "Professional Details"}>
          {role === "Student" && (
            <>
              <PortalForms.Input
                label="Course"
                registration={register("course")}
                required
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Academic System</label>
                <div className="flex gap-4 p-2 bg-gray-50/50 dark:bg-college-navy/30 rounded-xl border border-college-navy/10 dark:border-college-gold/10">
                  {["Semester", "Annual"].map((sys) => (
                    <label key={sys} className="flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-college-navy/5 dark:hover:bg-college-gold/5 transition-colors">
                      <input
                        type="radio"
                        value={sys}
                        {...register("academicSystem")}
                        className="w-4 h-4 text-college-navy focus:ring-college-navy dark:focus:ring-college-gold border-gray-300 dark:border-white/20"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{sys}</span>
                    </label>
                  ))}
                </div>
              </div>
              <PortalForms.Input
                label={academicSystem === "Annual" ? "Year" : "Semester"}
                registration={register("semester")}
                required
              />
              <PortalForms.Input
                label="Class"
                registration={register("class")}
                required
              />
              <PortalForms.Input
                label="Enrollment Year"
                registration={register("enrollmentYear")}
              />
            </>
          )}

          {role === "Faculty" && (
            <>
              <PortalForms.Input
                label="Designation"
                registration={register("designation")}
                required
              />
              <PortalForms.Input
                label="Qualification"
                registration={register("qualification")}
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
              registration={register("designation")}
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
