import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminContext } from "../../../context/AdminContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Building2, CheckCircle2, Plus } from "lucide-react";
import { courseSchema } from "../../../schemas/courseSchema";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { campuses, isDarkMode, isSuperAdmin, getSubAdminCampus, currentAdmin } = useAdminContext();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: { examSystem: "annual" },
  });
  const [selectedCampuses, setSelectedCampuses] = useState([]);

  // Pre-lock campus for sub-admins
  useEffect(() => {
    if (!isSuperAdmin) {
      const campus = getSubAdminCampus();
      if (campus) setSelectedCampuses([campus]);
    }
  }, [isSuperAdmin, getSubAdminCampus]);

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId],
    );
  };

  const onSubmit = () => {
    if (selectedCampuses.length === 0) {
      toast.warning("Please select at least one campus where this course will be offered");
      return;
    }
    navigate("/admin/courses");
  };

  return (
    <PortalForm
      title="Add New Course"
      subtitle="Create a new academic program or course"
      backPath="/admin/courses"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/courses")}
      submitLabel="Create Course"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      {/* Basic Info Section */}
      <PortalForm.Section title="Course Information">
        <div className="md:col-span-2">
          <PortalForm.Input
            label="Course Title"
            registration={register("title")}
            error={errors.title?.message}
            placeholder="e.g. BS Computer Science"
            required
          />
        </div>

        <div>
          <PortalForm.Input
            label="Duration"
            registration={register("duration")}
            placeholder="e.g. 4 Years"
          />
        </div>

        <div>
          <PortalForm.Input
            label="Eligibility"
            registration={register("eligibility")}
            placeholder="e.g. Intermediate or A-Level"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
            Exam System
          </label>
          <select
            {...register("examSystem")}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
          >
            <option value="annual">Annual</option>
            <option value="semester">Semester</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
            placeholder="Enter a brief description of the course..."
          />
        </div>
      </PortalForm.Section>

      {/* Campus Availability */}
      <PortalForm.Section title={<>Campus Availability <span className="text-red-500 text-sm ml-1">*</span></>} className="!space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {(isSuperAdmin ? campuses : campuses.filter(c => currentAdmin?.allocatedCampuses?.includes(c.id))).map((campus) => {
            const isSelected = selectedCampuses.includes(campus.id);
            return (
              <div
                key={campus.id}
                onClick={() => isSuperAdmin && handleCampusToggle(campus.id)}
                className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3
                    ${!isSuperAdmin ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    ${isSelected
                    ? 'border-college-navy bg-college-navy/10 shadow-sm dark:bg-college-gold/10 dark:border-college-gold'
                    : 'border-gray-100 bg-white hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                  }
                  `}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold' : 'bg-gray-100 text-gray-400 dark:bg-college-navy dark:text-gray-400'}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-college-navy dark:text-gray-300'}`}>
                    {campus.name}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-college-navy/70 dark:text-college-gold/70' : 'text-gray-500 dark:text-gray-400'}`}>{campus.code}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-college-navy dark:text-college-gold" />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-2 col-span-1 md:col-span-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Select the campuses where this course will be offered.
        </p>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateCourse;
