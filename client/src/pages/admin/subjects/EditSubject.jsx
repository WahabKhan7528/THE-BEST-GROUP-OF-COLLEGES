import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { Save, Trash2 } from "lucide-react";
import { subjectSchema } from "../../../schemas/subjectSchema";
import { adminApi } from "../../../services/api";

const EditSubject = () => {
  const { id } = useParams();
  const { currentAdmin, isSuperAdmin } = useAdminContext();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const currentCampusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
  const visibleCourses = useMemo(() => {
    if (isSuperAdmin) return courses;
    return courses.filter((course) => (course.campuses || []).some((campus) => String(campus?._id || campus) === String(currentCampusId)));
  }, [courses, currentCampusId, isSuperAdmin]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const loadData = async () => {
      if (!currentAdmin) return;

      try {
        const [subjectsRes, coursesRes] = await Promise.all([
          adminApi.subjects(),
          adminApi.courses(),
        ]);

        setCourses(coursesRes.data.data || []);
        const currentSubject = (subjectsRes.data.data || []).find((subject) => subject._id === id);

        if (!currentSubject) {
          navigate("/admin/subjects", { replace: true });
          return;
        }

      setSubjectCode(currentSubject.code || "");
        reset({
          name: currentSubject.name || "",
          course: currentSubject.course?._id || currentSubject.course || "",
          creditHours: currentSubject.creditHours || "",
          isElective: !!currentSubject.isElective,
          description: currentSubject.description || "",
        });
      } catch {
        navigate("/admin/subjects", { replace: true });
      }
    };

    loadData();
  }, [currentAdmin, id, navigate, reset]);

  const onSubmit = async (values) => {
    try {
      await adminApi.updateSubject(id, {
        name: values.name,
        course: values.course || null,
        creditHours: values.creditHours ? Number(values.creditHours) : undefined,
        isElective: !!values.isElective,
        description: values.description,
      });
      toast.success("Subject updated successfully");
      navigate("/admin/subjects");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update subject");
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({ title: "Delete Subject", message: "Are you sure you want to delete this subject?", confirmText: "Delete", variant: "danger" });
    if (!confirmed) return;

    try {
      await adminApi.deleteSubject(id);
      toast.success("Subject deleted");
      navigate("/admin/subjects");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete subject");
    }
  };

  return (
    <PortalForm
      title="Edit Subject"
      subtitle="Update subject details"
      backPath="/admin/subjects"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/subjects")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={<PublicButton onClick={handleDelete} variant="danger" size="sm" icon={Trash2} type="button">Delete</PublicButton>}
    >
      <PortalForm.Section title="Subject Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input label="Subject Name" registration={register("name")} error={errors.name?.message} required placeholder="e.g. Operating Systems" />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <span className="px-2.5 py-1 bg-college-navy/10 text-college-navy dark:text-college-gold text-xs font-medium rounded-sm border border-college-gold/20 inline-block w-fit">
            Code: {subjectCode || "AUTO"}
          </span>
        </div>
        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300 -mt-2">
          Subject code is generated automatically and cannot be changed here.
        </div>
        <PortalForm.Input label="Credit Hours" type="number" registration={register("creditHours")} placeholder="3" />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Course</label>
          <select {...register("course")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white">
            <option value="">Select course...</option>
            {visibleCourses.map((course) => <option key={course._id} value={course._id}>{course.title} ({course.code})</option>)}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input type="checkbox" {...register("isElective")} className="w-4 h-4 rounded border-gray-300 text-college-navy focus:ring-college-navy" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Elective subject</span>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
          <textarea {...register("description")} rows={4} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm resize-none dark:text-white" placeholder="Describe the subject..." />
        </div>
      </PortalForm.Section>

    </PortalForm>
  );
};

export default EditSubject;
