import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminContext } from "../../../context/AdminContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Building2, CheckCircle2, Save, Trash2 } from "lucide-react";
import { subjectSchema } from "../../../schemas/subjectSchema";

const EditSubject = () => {
  const { id } = useParams();
  const { campuses, isDarkMode, isSuperAdmin, currentAdmin, getSubAdminCampus } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(subjectSchema),
  });

  const [offeredAt, setOfferedAt] = useState([]);

  useEffect(() => {
    reset({
      name: "Operating Systems",
      code: "CS-312",
      course: "C-101",
      faculty: "F-201",
      description: "A course about OS.",
    });
    setOfferedAt(["main", "law"]);
  }, [id, reset]);

  // Guard: redirect sub-admin if subject doesn't belong to their campus
  useEffect(() => {
    if (!isSuperAdmin && offeredAt.length > 0) {
      const managedCampus = getSubAdminCampus();
      if (!offeredAt.includes(managedCampus)) {
        toast.error("Access denied. This subject is not available at your campus.");
        navigate("/admin/subjects", { replace: true });
      }
    }
  }, [isSuperAdmin, offeredAt]);

  const handleCampusToggle = (campusId) => {
    setOfferedAt((prev) =>
      prev.includes(campusId)
        ? prev.filter((cId) => cId !== campusId)
        : [...prev, campusId],
    );
  };

  const onSubmit = () => {
    if (offeredAt.length === 0) {
      toast.warning("Please select at least one campus where this subject will be offered");
      return;
    }
    toast.success(`Subject ${id} updated successfully!`);
    navigate("/admin/subjects");
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({ title: "Delete Subject", message: "Are you sure you want to delete this subject?", confirmText: "Delete", variant: "danger" });
    if (confirmed) {
      toast.success(`Subject ${id} deleted.`);
      navigate("/admin/subjects");
    }
  };

  return (
    <PortalForm
      title="Edit Subject"
      subtitle="Update subject details and campus availability"
      backPath="/admin/subjects"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/subjects")}
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

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-college-navy dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Brief description of the subject..."
            rows="3"
            className="w-full p-4 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
          />
        </div>
      </PortalForm.Section>

      {/* Campus Availability Section */}
      <PortalForm.Section title="Campus Availability" className="!space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 pb-2 col-span-1 md:col-span-2">
          Select the campuses where this subject will be offered.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {(isSuperAdmin ? campuses : campuses.filter(c => currentAdmin?.allocatedCampuses?.includes(c.id))).map((campus) => {
            const isSelected = offeredAt.includes(campus.id);
            return (
              <label
                key={campus.id}
                className={`
                    relative flex flex-col items-center justify-center p-6 rounded-sm border-2 transition-all duration-200
                    ${!isSuperAdmin ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    ${isSelected
                    ? 'border-college-navy bg-college-navy/10 dark:bg-college-gold/10 dark:border-college-gold shadow-sm'
                    : 'border-gray-100 bg-white dark:bg-college-navy dark:border-college-gold/20 hover:bg-gray-50 dark:hover:bg-college-navy/80'
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
                <span className={`text-sm font-medium text-center ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>
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

export default EditSubject;
