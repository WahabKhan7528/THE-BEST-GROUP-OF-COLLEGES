import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Plus } from "lucide-react";
import { subjectSchema } from "../../../schemas/subjectSchema";
import { adminApi } from "../../../services/api";

const CreateSubject = () => {
  const { currentAdmin, isSuperAdmin } = useAdminContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const currentCampusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
  const visibleCourses = useMemo(() => {
    if (isSuperAdmin) return courses;
    return courses.filter((course) => (course.campuses || []).some((campus) => String(campus?._id || campus) === String(currentCampusId)));
  }, [courses, currentCampusId, isSuperAdmin]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      creditHours: "",
      course: "",
      isElective: false,
      description: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      if (!currentAdmin) return;

      try {
        const { data } = await adminApi.courses();
        setCourses(data.data || []);
      } catch {
        toast.error("Failed to load courses");
      }
    };

    loadData();
  }, [currentAdmin, toast]);

  const onSubmit = async (values) => {
    try {
      await adminApi.createSubject({
        name: values.name,
        course: values.course || null,
        creditHours: values.creditHours ? Number(values.creditHours) : undefined,
        isElective: !!values.isElective,
        description: values.description,
      });
      toast.success("Subject created successfully");
      navigate("/admin/subjects");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create subject");
    }
  };

  return (
    <PortalForm
      title="Create New Subject"
      subtitle="Add a subject with course and academic details"
      backPath="/admin/subjects"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/subjects")}
      submitLabel="Create Subject"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      <PortalForm.Section title="Subject Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input label="Subject Name" registration={register("name")} error={errors.name?.message} required placeholder="e.g. Operating Systems" />
        </div>

        <PortalForm.Input label="Credit Hours" type="number" registration={register("creditHours")} placeholder="3" error={errors.creditHours?.message} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Course</label>
          <select {...register("course")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold text-gray-900 dark:text-white">
            <option value="">Select course...</option>
            {visibleCourses.map((course) => (
              <option key={course._id} value={course._id}>{course.title} ({course.code})</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input type="checkbox" {...register("isElective")} className="w-4 h-4 rounded border-gray-300 text-college-navy focus:ring-college-navy" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Elective subject</span>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
          <textarea {...register("description")} rows={4} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 resize-none dark:text-white" placeholder="Describe the subject..." />
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateSubject;
