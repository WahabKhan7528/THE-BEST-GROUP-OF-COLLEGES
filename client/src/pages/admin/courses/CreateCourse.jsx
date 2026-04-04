import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Building2, CheckCircle2, Plus } from "lucide-react";
import { courseSchema } from "../../../schemas/courseSchema";
import { adminApi } from "../../../services/api";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const toast = useToast();
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: { examSystem: "semester" },
  });
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const examSystem = watch("examSystem");

  const currentCampusId = currentAdmin?.campus?._id || currentAdmin?.campus || null;

  useEffect(() => {
    if (isSuperAdmin) return;
    if (currentCampusId && selectedCampuses.length === 0) {
      setSelectedCampuses([currentCampusId]);
    }
  }, [currentCampusId, isSuperAdmin, selectedCampuses.length]);

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId],
    );
  };

  const onSubmit = async (values) => {
    if (selectedCampuses.length === 0) {
      toast.warning("Please select at least one campus where this course will be offered");
      return;
    }

    try {
      await adminApi.createCourse({
        title: values.title,
        duration: values.duration,
        eligibility: values.eligibility,
        examSystem: values.examSystem,
        totalSemesters: values.totalSemesters || undefined,
        totalYears: values.totalYears || undefined,
        totalCreditHours: values.totalCreditHours || undefined,
        description: values.description,
        campuses: selectedCampuses,
      });

      reset({
        title: "",
        duration: "",
        eligibility: "",
        examSystem: "semester",
        totalSemesters: "",
        totalYears: "",
        totalCreditHours: "",
        description: "",
      });
      setSelectedCampuses([]);
      toast.success("Course created successfully");
      window.location.replace("/admin/courses");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create course");
    }
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

        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
          Course code is generated automatically from the course title after save.
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
          <PortalForm.Select
            label="Exam System"
            registration={register("examSystem")}
            options={[
              { id: "semester", label: "Semester" },
              { id: "annual", label: "Annual" },
              { id: "other", label: "Other" },
            ]}
            placeholder="Select exam system..."
          />
        </div>

        {examSystem === "semester" && (
          <div>
            <PortalForm.Input
              label="Total Semesters"
              type="number"
              registration={register("totalSemesters")}
              placeholder="8"
            />
          </div>
        )}

        {examSystem === "annual" && (
          <div>
            <PortalForm.Input
              label="Total Years"
              type="number"
              registration={register("totalYears")}
              placeholder="5"
            />
          </div>
        )}

        <div>
          <PortalForm.Input
            label="Total Credit Hours"
            type="number"
            registration={register("totalCreditHours")}
            placeholder="120"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
            placeholder="Enter a brief description of the course..."
          />
        </div>
      </PortalForm.Section>

      {/* Campus Availability */}
      <PortalForm.Section title={<>Campus Availability <span className="text-red-500 text-sm ml-1">*</span></>} className="!space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {(isSuperAdmin ? campuses : campuses.filter(c => String(c.id) === String(currentAdmin?.campus?._id || currentAdmin?.campus))).map((campus) => {
            const isSelected = selectedCampuses.includes(campus.id);
            return (
              <div
                key={campus.id}
                onClick={() => isSuperAdmin && handleCampusToggle(campus.id)}
                className={`
                    relative p-4 rounded-sm border-2 transition-all duration-200 flex items-start gap-3
                    ${!isSuperAdmin ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    ${isSelected
                    ? 'border-college-navy bg-college-navy/10 shadow-sm dark:bg-college-gold/10 dark:border-college-gold'
                    : 'border-gray-100 bg-white hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                  }
                  `}
              >
                <div className={`p-2 rounded-sm ${isSelected ? 'bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold' : 'bg-gray-100 text-gray-400 dark:bg-college-navy dark:text-gray-400'}`}>
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

