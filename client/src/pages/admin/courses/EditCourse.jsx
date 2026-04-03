import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PublicButton from "../../../components/shared/PublicButton";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Building2, CheckCircle2, Trash2, Save } from "lucide-react";
import { courseSchema } from "../../../schemas/courseSchema";
import { adminApi } from "../../../services/api";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses, isSuperAdmin, currentAdmin, getSubAdminCampus } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const [courseCode, setCourseCode] = useState("");
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      code: "",
      duration: "",
      eligibility: "",
      examSystem: "semester",
      description: "",
    },
  });
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const examSystem = watch("examSystem");

  useEffect(() => {
    const loadCourse = async () => {
      const existingCourse = location.state?.course;
      let resolvedCourse = existingCourse;

      if (!resolvedCourse) {
        const { data } = await adminApi.courses();
        resolvedCourse = (data.data || []).find((course) => course._id === id);
      }

      if (!resolvedCourse) {
        navigate("/admin/courses", { replace: true });
        return;
      }

      setSelectedCampuses((resolvedCourse.campuses || []).map((campus) => campus?._id || campus));
      setCourseCode(resolvedCourse.code || "");
      reset({
        title: resolvedCourse.title || "",
        code: resolvedCourse.code || "",
        duration: resolvedCourse.duration || "",
        eligibility: resolvedCourse.eligibility || "",
        examSystem: resolvedCourse.examSystem || "semester",
        totalSemesters: resolvedCourse.totalSemesters || "",
        totalYears: resolvedCourse.totalYears || "",
        totalCreditHours: resolvedCourse.totalCreditHours || "",
        description: resolvedCourse.description || "",
      });
    };

    loadCourse().catch(() => {
      navigate("/admin/courses", { replace: true });
    });
  }, [id, location.state, navigate, reset]);

  useEffect(() => {
    if (!isSuperAdmin) {
      const managedCampus = getSubAdminCampus();
      if (managedCampus && selectedCampuses.length && !selectedCampuses.includes(managedCampus)) {
        toast.error("Access denied. This course is not available at your campus.");
        navigate("/admin/courses", { replace: true });
      }
    }
  }, [getSubAdminCampus, isSuperAdmin, navigate, selectedCampuses, toast]);

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
      await adminApi.updateCourse(id, {
        title: values.title,
        code: values.code?.toUpperCase(),
        duration: values.duration,
        eligibility: values.eligibility,
        examSystem: values.examSystem,
        totalSemesters: values.totalSemesters || undefined,
        totalYears: values.totalYears || undefined,
        totalCreditHours: values.totalCreditHours || undefined,
        description: values.description,
        campuses: selectedCampuses,
      });
      toast.success("Course updated successfully");
      navigate("/admin/courses");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update course");
    }
  };

  return (
    <PortalForm
      title="Edit Course"
      subtitle="Update course details and availability"
      backPath="/admin/courses"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/courses")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={
        <PublicButton
          type="button"
          variant="danger"
          size="sm"
          onClick={async () => { const confirmed = await confirmDialog({ title: "Delete Course", message: "Delete this course?", confirmText: "Delete", variant: "danger" }); if (confirmed) toast.success("Course deleted"); }}
          icon={Trash2}
        >
          Delete
        </PublicButton>
      }
    >
      {/* Basic Info Section */}
      <PortalForm.Section title="Course Information">
        <div className="md:col-span-2 flex justify-end">
          <span className="px-2.5 py-1 bg-college-navy/10 text-college-navy dark:text-college-gold text-xs font-medium rounded-sm border border-college-gold/20 inline-block w-fit">
            Code: {courseCode || "AUTO"}
          </span>
        </div>
        <div className="md:col-span-2 -mt-6">
          <PortalForm.Input
            label="Course Title"
            registration={register("title")}
            error={errors.title?.message}
            placeholder="e.g. BS Computer Science"
            required
          />
        </div>

        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
          Course code is generated automatically and stays locked on edit.
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
            Exam System
          </label>
          <select
            {...register("examSystem")}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
          >
            <option value="semester">Semester</option>
            <option value="annual">Annual</option>
            <option value="other">Other</option>
          </select>
        </div>

        {examSystem === "semester" && (
          <div>
            <PortalForm.Input
              label="Total Semesters"
              type="number"
              registration={register("totalSemesters")}
            />
          </div>
        )}

        {examSystem === "annual" && (
          <div>
            <PortalForm.Input
              label="Total Years"
              type="number"
              registration={register("totalYears")}
            />
          </div>
        )}

        <div>
          <PortalForm.Input
            label="Total Credit Hours"
            type="number"
            registration={register("totalCreditHours")}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
            Course Description
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-y min-h-[100px] dark:text-white dark:placeholder-gray-500"
            placeholder="Write a brief overview of the course..."
          />
        </div>
      </PortalForm.Section>

      {/* Campus Availability */}
      <PortalForm.Section title="Campus Availability">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 col-span-1 md:col-span-2">
          {(isSuperAdmin ? campuses : campuses.filter(c => currentAdmin?.allocatedCampuses?.includes(c.id))).map((campus) => {
            const isSelected = selectedCampuses.includes(campus.id);
            return (
              <label
                key={campus.id}
                className={`
                    relative flex flex-col items-center justify-center p-4 rounded-sm border-2 transition-all duration-200
                    ${!isSuperAdmin ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                    ${isSelected
                    ? "border-college-navy bg-college-navy/10 pt-6 dark:bg-college-gold/10 dark:border-college-gold"
                    : "border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:bg-gray-50 dark:hover:bg-college-navy/80"
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

export default EditCourse;

