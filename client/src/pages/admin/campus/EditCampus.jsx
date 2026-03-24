import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCampusSchema } from "../../../schemas/campusSchema";
import { useAdminContext } from "../../../context/AdminContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Save, Trash2 } from "lucide-react";

const EditCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editCampusSchema),
    defaultValues: {
      name: "",
      code: "",
      location: "",
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
        code: campus.code || "",
        location: campus.location || "",
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

  const onSubmit = () => {
    toast.success("Campus updated successfully");
    navigate("/admin/campus");
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Delete Campus",
      message: `Are you sure you want to delete ${form.name}? This cannot be undone.`,
      confirmText: "Delete",
      variant: "danger",
    });
    if (confirmed) {
      toast.success("Campus deleted successfully");
      navigate("/admin/campus");
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
            label="Campus Code"
            registration={register("code")}
            error={errors.code?.message}
            required
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
      </PortalForm.Section>
    </PortalForm>
  );
};

export default EditCampus;
