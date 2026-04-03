import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Trash2 } from "lucide-react";
import PortalForm from "../../../components/portal-shared/PortalForm";
import PublicButton from "../../../components/shared/PublicButton";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { userSchema } from "../../../schemas/userSchema";
import { adminApi } from "../../../services/api";

const roleOptions = [
  { label: "Super Admin", value: "super_admin" },
  { label: "Admin", value: "admin" },
  { label: "Faculty", value: "faculty" },
  { label: "Student", value: "student" },
];

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const { campuses, isSuperAdmin, getSubAdminCampus } = useAdminContext();
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [portalId, setPortalId] = useState("");
  const [role, setRole] = useState("student");
  const currentCampusId = getSubAdminCampus();
  const visibleRoles = isSuperAdmin ? roleOptions : roleOptions.filter((option) => option.value === "faculty" || option.value === "student");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      campus: "",
      currentCourse: "",
      currentClassRoom: "",
      classSection: "",
      subjects: [],
    },
  });

  const selectedCampus = watch("campus");
  const selectedCourse = watch("currentCourse");
  const selectedClassRoom = watch("currentClassRoom");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, subjectsRes, coursesRes, classesRes] = await Promise.all([
          adminApi.users(),
          adminApi.subjects(),
          adminApi.courses(),
          adminApi.classes(),
        ]);

        setSubjects(subjectsRes.data.data || []);
        setCourses(coursesRes.data.data || []);
        setClassRooms(classesRes.data.data || []);
        const currentUser = (usersRes.data.data || []).find((user) => user._id === id);

        if (!currentUser) {
          navigate("/admin/users", { replace: true });
          return;
        }

        if (!isSuperAdmin && (currentUser.role === "super_admin" || currentUser.role === "admin")) {
          toast.error("You are not authorized to edit this account");
          navigate("/admin/users", { replace: true });
          return;
        }

        setRole(currentUser.role || "student");
        setPortalId(currentUser.portalId || "");

        const resolvedCampus = currentUser.campus?._id || currentUser.campus || (!isSuperAdmin ? currentCampusId : "");
        reset({
          name: currentUser.name || "",
          email: currentUser.email || "",
          campus: resolvedCampus || "",
          currentCourse: currentUser.currentCourse?._id || currentUser.currentCourse || "",
          currentClassRoom: currentUser.currentClassRoom?._id || currentUser.currentClassRoom || "",
          classSection: currentUser.classSection || "",
          department: currentUser.department || "",
          designation: currentUser.designation || "",
          subjects: (currentUser.subjects || []).map((subject) => subject._id || subject),
        });
      } catch {
        navigate("/admin/users", { replace: true });
      }
    };

    loadData();
  }, [id, navigate, reset, isSuperAdmin, currentCampusId, toast]);

  useEffect(() => {
    if (!isSuperAdmin && currentCampusId) {
      setValue("campus", currentCampusId, { shouldValidate: true });
    }
  }, [isSuperAdmin, currentCampusId, setValue]);

  useEffect(() => {
    if (role !== "student") return;
    setValue("currentClassRoom", "");
    setValue("classSection", "");
  }, [role, selectedCourse, setValue]);

  useEffect(() => {
    if (role !== "student" || !selectedClassRoom) return;
    const classRoom = classRooms.find((item) => item._id === selectedClassRoom);
    if (classRoom?.section) {
      setValue("classSection", classRoom.section);
    }
  }, [classRooms, role, selectedClassRoom, setValue]);

  const activeCampusId = isSuperAdmin ? selectedCampus : currentCampusId;
  const filteredCourses = courses.filter((course) => {
    if (!activeCampusId) return true;
    return (course.campuses || []).some((campus) => String(campus?._id || campus) === String(activeCampusId));
  });

  const filteredClassRooms = classRooms.filter((classRoom) => {
    const matchesCampus = !activeCampusId || String(classRoom.campus?._id || classRoom.campus) === String(activeCampusId);
    const matchesCourse = !selectedCourse || String(classRoom.course?._id || classRoom.course) === String(selectedCourse);
    return matchesCampus && matchesCourse;
  });

  const sectionOptions = Array.from(new Set(filteredClassRooms.map((classRoom) => classRoom.section).filter(Boolean)));
  const filteredSubjects = subjects.filter((subject) => {
    if (!activeCampusId) return true;
    return (subject.campuses || []).some((campus) => String(campus?._id || campus) === String(activeCampusId));
  });

  const onSubmit = async (values) => {
    try {
      const basePayload = {
        name: values.name,
        email: values.email,
        role,
      };

      const rolePayload =
        role === "faculty"
          ? {
              campus: values.campus || null,
              department: values.department,
              designation: values.designation,
              subjects: values.subjects || [],
            }
          : role === "student"
            ? {
                campus: values.campus || null,
                currentCourse: values.currentCourse || null,
                currentClassRoom: values.currentClassRoom || null,
                classSection: values.classSection || null,
                currentSemester: null,
                currentAnnualYear: null,
                semester: null,
                enrollmentYear: null,
                subjects: [],
              }
            : role === "admin"
              ? {
                  campus: values.campus || null,
                  subjects: [],
                }
              : {
                  campus: null,
                  subjects: [],
                };

      await adminApi.updateUser(id, {
        ...basePayload,
        ...rolePayload,
      });

      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    }
  };

  const showFacultyFields = role === "faculty";
  const showStudentFields = role === "student";
  const showAdminFields = role === "admin";

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Disable User",
      message: "Are you sure you want to disable this user?",
      confirmText: "Disable",
      variant: "danger",
    });

    if (!confirmed) return;

    try {
      await adminApi.disableUser(id);
      toast.success("User disabled");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to disable user");
    }
  };

  return (
    <PortalForm
      title="Edit User"
      subtitle="Update user account, campus, and academic assignments"
      backPath="/admin/users"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={
        <PublicButton onClick={handleDelete} variant="danger" size="sm" icon={Trash2} type="button">
          Disable
        </PublicButton>
      }
    >
      <PortalForm.Section title="Role & Identity">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {visibleRoles.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 border ${role === option.value
                  ? "bg-college-navy/10 border-college-navy text-college-navy shadow-sm dark:bg-college-gold/10 dark:border-college-gold dark:text-college-gold"
                  : "bg-white border-college-navy/10 text-gray-600 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <PortalForm.Input label="Full Name" registration={register("name")} error={errors.name?.message} required />
        <PortalForm.Input label="Email Address" type="email" registration={register("email")} error={errors.email?.message} required />
        <div className="md:col-span-2 flex justify-end">
          <span className="px-2.5 py-1 bg-college-navy/10 text-college-navy dark:text-college-gold text-xs font-medium rounded-sm border border-college-gold/20 inline-block w-fit">
            ID: {portalId || "AUTO"}
          </span>
        </div>
        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300 -mt-2">
          Portal ID is locked after creation.
        </div>
      </PortalForm.Section>

      {showFacultyFields && (
        <PortalForm.Section title="Faculty Details">
          <PortalForm.Input label="Department" registration={register("department")} placeholder="e.g. Computer Science" />
          <PortalForm.Input label="Designation" registration={register("designation")} placeholder="e.g. Lecturer, Assistant Professor" />
          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campus</label>
            {isSuperAdmin ? (
              <select {...register("campus")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
                <option value="">Select a campus...</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name} ({campus.code})
                  </option>
                ))}
              </select>
            ) : (
              <div className="rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-gray-200">
                {campuses.find((campus) => campus.id === currentCampusId)?.name || "Your campus"}
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Subjects</label>
            <select multiple {...register("subjects")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm min-h-[140px] dark:text-white">
              {filteredSubjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
        </PortalForm.Section>
      )}

      {showStudentFields && (
        <PortalForm.Section title="Student Details">
          {isSuperAdmin ? (
            <div className="col-span-1 md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campus</label>
              <select {...register("campus")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
                <option value="">Select a campus...</option>
                {campuses.map((campus) => (
                  <option key={campus.id} value={campus.id}>
                    {campus.name} ({campus.code})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-gray-200">
              {campuses.find((campus) => campus.id === currentCampusId)?.name || "Your campus"}
            </div>
          )}

          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
            <select {...register("currentCourse")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
              <option value="">Select a course...</option>
              {filteredCourses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title} ({course.code})
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
            <select {...register("currentClassRoom")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
              <option value="">Select a class...</option>
              {filteredClassRooms.map((classRoom) => (
                <option key={classRoom._id} value={classRoom._id}>
                  {classRoom.name} {classRoom.section ? `(${classRoom.section})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
            <select {...register("classSection")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
              <option value="">Select a section later...</option>
              {sectionOptions.map((section) => (
                <option key={section} value={section}>
                  Section {section}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-1">
            <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
              Student placement is based on campus, course, and class assignment. Subjects are inherited from class setup.
            </div>
          </div>
        </PortalForm.Section>
      )}

      {showAdminFields && (
        <PortalForm.Section title="Campus Allocation">
          <div className="col-span-1 md:col-span-2 space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Campus</label>
            <select {...register("campus")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white">
              <option value="">Select a campus...</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name} ({campus.code})
                </option>
              ))}
            </select>
          </div>
        </PortalForm.Section>
      )}

      {role === "super_admin" && (
        <PortalForm.Section title="Access Scope">
          <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
            Super admin accounts manage the full system and do not need campus, faculty, or student assignment fields.
          </div>
        </PortalForm.Section>
      )}
    </PortalForm>
  );
};

export default EditUser;
