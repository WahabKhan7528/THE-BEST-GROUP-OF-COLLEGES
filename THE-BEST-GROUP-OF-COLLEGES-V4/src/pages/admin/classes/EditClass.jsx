import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminContext } from "../../../context/AdminContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForms from "../../../components/shared/PortalForms";
import {
  Building2,
  CheckCircle2,
  Save,
  Trash2
} from "lucide-react";
import { classSchema } from "../../../schemas/classSchema";

const EditClass = () => {
  const { id } = useParams();
  const { campuses, currentAdmin, isSuperAdmin } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(classSchema),
  });

  const campusValue = watch("campus");

  useEffect(() => {
    reset({
      name: "BSCS - 3rd Semester",
      sections: "A, B",
      subjects: "OS, DBMS, DSA",
      faculty: "Ahmed, Sara",
      campus: "main",
    });
  }, [id, reset]);

  const onSubmit = () => {
    toast.success(`Class ${id} updated successfully!`);
    navigate("/admin/classes");
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({ title: "Delete Class", message: "Are you sure you want to delete this class?", confirmText: "Delete", variant: "danger" });
    if (confirmed) {
      toast.success(`Class ${id} deleted.`);
      navigate("/admin/classes");
    }
  };

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return `${currentAdmin?.allocatedCampuses?.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")}`;
    }
    return null;
  };

  return (
    <PortalForms
      title="Edit Class"
      subtitle="Update class details and assignments"
      backPath="/admin/classes"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/classes")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
        >
          Delete
        </PublicButton>
      }
    >
      {/* Campus Selection Section */}
      <PortalForms.Section title="Campus Allocation" className="!space-y-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Select Campus <span className="text-red-500">*</span>
          </label>

          {isSuperAdmin ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {campuses.map((campus) => (
                <label
                  key={campus.id}
                  className={`
                    relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                    ${campusValue === campus.id
                      ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                      : "bg-white border-gray-100 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={campus.id}
                    {...register("campus")}
                    className="sr-only"
                  />
                  <Building2 className={`w-6 h-6 mb-2 ${campusValue === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold text-center ${campusValue === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {campus.name}
                  </span>
                  <div className="absolute top-2 right-2 text-college-navy dark:text-college-gold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl text-gray-700 dark:text-gray-200">
              <Building2 className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{getCampusLabel()}</span>
              <span className="ml-auto text-xs bg-college-gold/10 text-college-navy dark:text-college-gold px-2 py-1 rounded-full">Automated Selection</span>
            </div>
          )}
        </div>
      </PortalForms.Section>

      {/* Class Details Section */}
      <PortalForms.Section title="Academic Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForms.Input
            label="Class Name"
            registration={register("name")}
            error={errors.name?.message}
            placeholder="e.g. BSCS - 3rd Semester"
            required
          />
        </div>

        <div>
          <PortalForms.Input
            label="Sections"
            registration={register("sections")}
            placeholder="e.g. A, B, C (Comma separated)"
          />
        </div>

        <div>
          <PortalForms.Input
            label="Assign Faculty Lead"
            registration={register("faculty")}
            placeholder="e.g. Prof. Ahmed Raza"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Subjects
          </label>
          <div className="relative">
            <textarea
              {...register("subjects")}
              placeholder="e.g. Operating Systems, Data Structures, Linear Algebra..."
              rows="3"
              className="w-full pr-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default EditClass;
