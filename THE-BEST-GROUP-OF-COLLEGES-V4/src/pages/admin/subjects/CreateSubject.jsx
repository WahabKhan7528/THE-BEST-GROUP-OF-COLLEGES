import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminContext } from "../../../context/AdminContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Building2, CheckCircle2, Plus } from "lucide-react";
import { subjectSchema } from "../../../schemas/subjectSchema";

const CreateSubject = () => {
  const { campuses, isDarkMode, isSuperAdmin, getSubAdminCampus, currentAdmin } = useAdminContext();
  const toast = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(subjectSchema),
  });

  const [offeredAt, setOfferedAt] = useState([]);

  // Pre-lock campus for sub-admins
  useEffect(() => {
    if (!isSuperAdmin) {
      const campus = getSubAdminCampus();
      if (campus) setOfferedAt([campus]);
    }
  }, [isSuperAdmin, getSubAdminCampus]);

  const handleCampusToggle = (campusId) => {
    setOfferedAt((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId],
    );
  };

  const onSubmit = () => {
    if (offeredAt.length === 0) {
      toast.warning("Please select at least one campus where this subject will be offered");
      return;
    }
    navigate("/admin/subjects");
  };

  return (
    <PortalForm
      title="Create New Subject"
      subtitle="Add a new subject to the curriculum and assign to campuses"
      backPath="/admin/subjects"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/subjects")}
      submitLabel="Create Subject"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      {/* Subject Details Section */}
      <PortalForm.Section title="Subject Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input
            label="Subject Name"
            registration={register("name")}
            error={errors.name?.message}
            required
            placeholder="e.g. Operating Systems"
          />
        </div>

        <div>
          <PortalForm.Input
            label="Subject Code"
            registration={register("code")}
            error={errors.code?.message}
            required
            placeholder="e.g. CS-312"
          />
        </div>

        <div>
          <PortalForm.Input
            label="Target Course ID"
            registration={register("course")}
            placeholder="e.g. C-101"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input
            label="Assign Faculty ID"
            registration={register("faculty")}
            placeholder="e.g. F-201"
          />
        </div>
      </PortalForm.Section>

      {/* Campus Availability Section */}
      <PortalForm.Section title="Campus Availability" className="!space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 col-span-1 md:col-span-2">
          Select the campuses where this subject will be offered <span className="text-red-500">*</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {(isSuperAdmin ? campuses : campuses.filter(c => currentAdmin?.allocatedCampuses?.includes(c.id))).map((campus) => {
            const isSelected = offeredAt.includes(campus.id);
            return (
              <label
                key={campus.id}
                className={`
                  relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200
                  ${!isSuperAdmin ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                  ${isSelected
                    ? 'border-college-navy bg-college-navy/10 dark:bg-college-gold/10 dark:border-college-gold shadow-sm'
                    : 'border-gray-100 bg-white hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => isSuperAdmin && handleCampusToggle(campus.id)}
                  disabled={!isSuperAdmin}
                  className="sr-only"
                />
                <Building2 className={`w-6 h-6 mb-2 ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium text-center ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-300'}`}>
                  {campus.name}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-college-navy dark:text-college-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateSubject;
