import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { createCampusSchema } from "../../../schemas/campusSchema";
import { adminApi } from "../../../services/api";

const CreateCampus = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { addCampus, campuses } = useAdminContext();
  const submitLockRef = useRef(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createCampusSchema),
  });

  const onSubmit = async (data) => {
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
      const normalizedCampusName = String(data.name).trim();
      const duplicateCampus = campuses.find(
        (campus) => String(campus.name || "").trim().toLowerCase() === normalizedCampusName.toLowerCase(),
      );

      if (duplicateCampus) {
        toast.error("Campus already exists with the same name");
        return;
      }

      const payload = {
        name: normalizedCampusName,
        location: String(data.location).trim(),
        description: data.description?.trim(),
        dean: data.dean?.trim(),
        established: data.established?.trim(),
        contact: {
          phone: data.contact?.phone?.trim(),
          email: data.contact?.email?.trim(),
          website: data.contact?.website?.trim(),
        },
      };

      const { data: response } = await adminApi.createCampus(payload);
      addCampus(response.data);
      toast.success("Campus created successfully");
      navigate("/admin/campus");
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to create campus";
      toast.error(message);
    } finally {
      submitLockRef.current = false;
    }
  };

  return (
    <PortalForm
      title="Create New Campus"
      subtitle="Add a new campus to the institution"
      backPath="/admin/campus"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/campus")}
      submitLabel="Create Campus"
      submitting={isSubmitting}
    >
      <PortalForm.Section>
        <PortalForm.Input
          label="Campus Name"
          registration={register("name")}
          error={errors.name?.message}
          placeholder="e.g., Main Campus, Law Campus"
          required
        />

        <PortalForm.Input
          label="Location"
          registration={register("location")}
          error={errors.location?.message}
          placeholder="e.g., Islamabad, Hala"
          required
        />

        <PortalForm.Input
          label="Established Year"
          registration={register("established")}
          placeholder="e.g., 1995"
        />

        <PortalForm.Input
          label="Dean"
          registration={register("dean")}
          placeholder="e.g., Dr. Ahmed Khan"
        />

        <PortalForm.Input
          label="Phone Number"
          type="tel"
          registration={register("contact.phone")}
          placeholder="e.g., +92-51-1234567"
        />

        <PortalForm.Input
          label="Email Address"
          type="email"
          registration={register("contact.email")}
          error={errors.contact?.email?.message}
          placeholder="e.g., info@campus.edu"
        />

        <PortalForm.Input
          label="Website"
          registration={register("contact.website")}
          placeholder="e.g., https://campus.edu"
        />

        <PortalForm.Input
          label="Description"
          type="textarea"
          registration={register("description")}
          placeholder="Enter campus description (optional)"
        />
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateCampus;

