import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";
import PortalForms from "../../../components/shared/PortalForms";
import { createCampusSchema } from "../../../schemas/campusSchema";

const CreateCampus = () => {
  const navigate = useNavigate();
  const { addCampus, isDarkMode } = useAdminContext();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(createCampusSchema),
  });

  const onSubmit = (data) => {
    addCampus(data);
    navigate("/admin/campus");
  };

  return (
    <PortalForms
      title="Create New Campus"
      subtitle="Add a new campus to the institution"
      backPath="/admin/campus"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/campus")}
      submitLabel="Create Campus"
      submitting={isSubmitting}
    >
      <PortalForms.Section>
        <PortalForms.Input
          label="Campus ID"
          registration={register("id")}
          error={errors.id?.message}
          placeholder="e.g., main, law, hala"
          required
          helper="Unique identifier for the campus (lowercase, no spaces)"
        />

        <PortalForms.Input
          label="Campus Name"
          registration={register("name")}
          error={errors.name?.message}
          placeholder="e.g., Main Campus, Law Campus"
          required
        />

        <PortalForms.Input
          label="Campus Code"
          registration={register("code")}
          error={errors.code?.message}
          placeholder="e.g., MC, LC, HC"
          required
          helper="Short code for the campus (2-3 characters)"
        />

        <PortalForms.Input
          label="Location"
          registration={register("location")}
          error={errors.location?.message}
          placeholder="e.g., Islamabad, Hala"
          required
        />

        <div className="col-span-1 md:col-span-2">
          <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter campus description (optional)"
            rows="4"
            className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy dark:focus:ring-college-gold"
          />
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default CreateCampus;
