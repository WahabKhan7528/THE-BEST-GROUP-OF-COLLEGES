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
  const { currentAdmin, isSuperAdmin, campuses } = useAdminContext();
  const toast = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [facultyUsers, setFacultyUsers] = useState([]);
  const currentCampusId =
    currentAdmin?.campus?._id || currentAdmin?.campus || "";
  const visibleCourses = useMemo(() => {
    if (isSuperAdmin) return courses;
    return courses.filter((course) =>
      (course.campuses || []).some(
        (campus) => String(campus?._id || campus) === String(currentCampusId),
      ),
    );
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
        faculty: [],
      campuses: [],
      isElective: false,
      description: "",
    },
  });

  useEffect(() => {
    const loadData = async () => {
      if (!currentAdmin) return;

      try {
        const [coursesRes, facultyRes] = await Promise.all([
          adminApi.courses(),
          adminApi.users({ role: "faculty" }),
        ]);
        setCourses(coursesRes.data.data || []);
        setFacultyUsers(facultyRes.data.data || []);
      } catch {
        toast.error("Failed to load courses");
        setFacultyUsers([]);
      }
    };

    loadData();
  }, [currentAdmin, toast]);

  const onSubmit = async (values) => {
    try {
      await adminApi.createSubject({
        name: values.name,
        course: values.course || null,
        faculty: values.faculty || [],
        campuses: values.campuses || [],
        creditHours: values.creditHours
          ? Number(values.creditHours)
          : undefined,
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
          <PortalForm.Input
            label="Subject Name"
            registration={register("name")}
            error={errors.name?.message}
            required
            placeholder="e.g. Operating Systems"
          />
        </div>

        <PortalForm.Input
          label="Credit Hours"
          type="number"
          registration={register("creditHours")}
          placeholder="3"
          error={errors.creditHours?.message}
        />

        <PortalForm.Select
          label="Course"
          registration={register("course")}
          options={visibleCourses.map((course) => ({
            id: course._id,
            label: `${course.title} (${course.code})`,
          }))}
          placeholder="Select course..."
        />

        {isSuperAdmin && (
          <div className="col-span-1 md:col-span-2">
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
              Campuses
            </label>
            <select
              multiple
              {...register("campuses")}
              className="w-full px-4 py-2.5 bg-white dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all dark:text-white font-bold"
            >
              {campuses.map((campus) => (
                <option
                  key={campus._id || campus.id}
                  value={campus._id || campus.id}
                  className="dark:bg-college-navy dark:text-white font-semibold"
                >
                  {campus.name} ({campus.code})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hold Ctrl or Cmd to select multiple campuses.
            </p>
          </div>
        )}

        {!isSuperAdmin && (
          <div className="col-span-1 md:col-span-2">
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
              Campus
            </label>
            <div className="rounded-sm border border-gray-200 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-700 dark:text-gray-300">
              {campuses.find(
                (campus) =>
                  String(campus._id || campus.id) === String(currentCampusId),
              )?.name || "Your campus"}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Campus is auto-assigned for sub-admin accounts.
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            {...register("isElective")}
            className="w-4 h-4 rounded border-gray-300 text-college-navy focus:ring-college-navy"
          />
          <span className="text-[10px] uppercase font-bold tracking-widest text-college-navy/70 dark:text-college-gold/70">
            Elective subject
          </span>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 resize-none dark:text-white"
            placeholder="Describe the subject..."
          />
        </div>
      </PortalForm.Section>

      <PortalForm.Section title="Faculty Assignment">
        <div className="col-span-1 md:col-span-2">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
            Assigned Faculty
          </label>
          <select
            multiple
            {...register("faculty")}
            className="w-full px-4 py-2.5 bg-white dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm min-h-[140px] focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all dark:text-white font-bold"
          >
            {facultyUsers.map((faculty) => (
              <option
                key={faculty._id || faculty.id}
                value={faculty._id || faculty.id}
                className="dark:bg-college-navy dark:text-white font-semibold"
              >
                {faculty.name} ({faculty.portalId})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Hold Ctrl or Cmd to select multiple faculty members.
          </p>
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateSubject;
