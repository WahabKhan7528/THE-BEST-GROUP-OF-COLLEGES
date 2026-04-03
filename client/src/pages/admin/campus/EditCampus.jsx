import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCampusSchema } from "../../../schemas/campusSchema";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Save, Trash2 } from "lucide-react";
import { adminApi } from "../../../services/api";

const EditCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses, updateCampus: updateCampusState, deleteCampus: deleteCampusState } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const submitLockRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editCampusSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      dean: "",
      established: "",
      contact: { phone: "", email: "", website: "" },
    },
  });

  useEffect(() => {
    const campus = location.state?.campus || campuses.find((c) => c.id === id);
    if (campus) {
      reset({
        name: campus.name || "",
        location: campus.location || "",
        description: campus.description || "",
        dean: campus.dean || "",
        established: campus.established || "",
        contact: {
          phone: campus.contact?.phone || "",
          email: campus.contact?.email || "",
          website: campus.contact?.website || "",
        },
      });
    }
  }, [id, location.state, campuses, reset]);

  const campusName = watch("name");

  const onSubmit = async (values) => {
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
      const normalizedCampusName = String(values.name).trim();
      const normalizedLocation = String(values.location).trim();
      const duplicateCampus = campuses.find((campus) => campus.id !== id && String(campus.name || "").trim().toLowerCase() === normalizedCampusName.toLowerCase());

      if (duplicateCampus) {
        toast.error("Another campus already uses that name");
        return;
      }

      const payload = {
        name: normalizedCampusName,
        location: normalizedLocation,
        description: values.description?.trim(),
        dean: values.dean,
        established: values.established,
        contact: values.contact,
      };

      const { data: response } = await adminApi.updateCampus(id, payload);
      updateCampusState(id, response.data);
      toast.success("Campus updated successfully");
      navigate("/admin/campus");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update campus");
    } finally {
      submitLockRef.current = false;
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Delete Campus",
      message: `Are you sure you want to delete ${campusName || "this campus"}? This cannot be undone.`,
      confirmText: "Delete",
      variant: "danger",
    });
    if (confirmed) {
      try {
        await adminApi.deleteCampus(id);
        deleteCampusState(id);
        toast.success("Campus deleted successfully");
        navigate("/admin/campus");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to delete campus");
      }
    }
  };

  return (
    <PortalForm
      title="Edit Campus"
      subtitle="Update campus details and configuration"
      backPath="/admin/campus"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/campus")}
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
          className="px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-1.5 min-w-0 h-8 sm:h-auto"
          style={{ lineHeight: 1.1 }}
        >
          <span className="hidden min-[480px]:inline">Delete</span>
        </PublicButton>
      }
    >
      {/* Basic Information */}
      <PortalForm.Section title="Basic Information">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input
            label="Campus Name"
            registration={register("name")}
            error={errors.name?.message}
            required
          />
        </div>

        <div>
          <PortalForm.Input
            label="Dean"
            registration={register("dean")}
            placeholder="e.g. Dr. Ahmed Khan"
          />
        </div>

        <div>
          <PortalForm.Input
            label="Established Year"
            registration={register("established")}
            placeholder="e.g. 1995"
          />
        </div>
      </PortalForm.Section>

      {/* Contact & Location */}
      <PortalForm.Section title="Contact & Location">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input
            label="Address / Location"
            registration={register("location")}
            error={errors.location?.message}
          />
        </div>

        <div>
          <PortalForm.Input
            label="Phone Number"
            type="tel"
            registration={register("contact.phone")}
          />
        </div>

        <div>
          <PortalForm.Input
            label="Email Address"
            type="email"
            registration={register("contact.email")}
            error={errors.contact?.email?.message}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input
            label="Website"
            registration={register("contact.website")}
            placeholder="e.g. https://campus.edu"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            rows="4"
            className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy dark:focus:ring-college-gold"
          />
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default EditCampus;

