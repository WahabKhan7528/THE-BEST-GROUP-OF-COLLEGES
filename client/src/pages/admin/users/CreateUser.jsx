import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import PortalForm from "../../../components/portal-shared/PortalForm";
import { useToast } from "../../../context/ToastContext";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { userSchema } from "../../../schemas/userSchema";
import { adminApi } from "../../../services/api";

const roleOptions = [
  { label: "Super Admin", value: "super_admin" },
  { label: "Admin", value: "admin" },
  { label: "Faculty", value: "faculty" },
  { label: "Student", value: "student" },
];

const CreateUser = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { campuses, isSuperAdmin, getSubAdminCampus } = useAdminContext();
  const [courses, setCourses] = useState([]);
  const [classRooms, setClassRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const currentCampusId = getSubAdminCampus();
  const visibleRoles = isSuperAdmin
    ? roleOptions
    : roleOptions.filter(
        (option) => option.value === "faculty" || option.value === "student",
      );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      campus: "",
      currentCourse: "",
      currentClassRoom: "",
      classSection: "",
      phoneNumber: "",
      education: "",
      subjectSpecialization: "",
      experienceYears: "",
      subjects: [],
    },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [subjectsRes, coursesRes, classesRes] = await Promise.all([
          adminApi.subjects(),
          adminApi.courses(),
          adminApi.classes(),
        ]);

        setSubjects(subjectsRes.data.data || []);
        setCourses(coursesRes.data.data || []);
        setClassRooms(classesRes.data.data || []);
      } catch {
        setSubjects([]);
        setCourses([]);
        setClassRooms([]);
      }
    };

    loadData();
  }, []);

  const selectedCampus = watch("campus");
  const selectedCourse = watch("currentCourse");
  const selectedClassRoom = watch("currentClassRoom");

  useEffect(() => {
    if (!isSuperAdmin && currentCampusId) {
      setValue("campus", currentCampusId, { shouldValidate: true });
    }
    if (role !== "student") return;
    setValue("currentCourse", "");
    setValue("currentClassRoom", "");
    setValue("classSection", "");
  }, [currentCampusId, isSuperAdmin, role, setValue]);

  useEffect(() => {
    if (role !== "student") return;
    setValue("currentClassRoom", "");
    setValue("classSection", "");
  }, [role, selectedCourse, setValue]);

  useEffect(() => {
    if (role !== "student" || !selectedClassRoom) return;
    const classroom = classRooms.find((item) => item._id === selectedClassRoom);
    if (classroom?.section) {
      setValue("classSection", classroom.section);
    }
  }, [classRooms, role, selectedClassRoom, setValue]);

  const activeCampusId = isSuperAdmin ? selectedCampus : currentCampusId;
  const filteredCourses = courses.filter((course) => {
    if (!activeCampusId) return true;
    return (course.campuses || []).some(
      (campus) => String(campus?._id || campus) === String(activeCampusId),
    );
  });

  const filteredClassRooms = classRooms.filter((classRoom) => {
    const matchesCampus =
      !activeCampusId ||
      String(classRoom.campus?._id || classRoom.campus) ===
        String(activeCampusId);
    const matchesCourse =
      !selectedCourse ||
      String(classRoom.course?._id || classRoom.course) ===
        String(selectedCourse);
    return matchesCampus && matchesCourse;
  });

  const sectionOptions = Array.from(
    new Set(
      filteredClassRooms.map((classRoom) => classRoom.section).filter(Boolean),
    ),
  );
  const filteredSubjects = subjects.filter((subject) => {
    if (!activeCampusId) return true;
    return (subject.campuses || []).some(
      (campus) => String(campus?._id || campus) === String(activeCampusId),
    );
  });

  const onSubmit = async (values) => {
    try {
      const basePayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        role,
        isActive: true,
      };

      const rolePayload =
        role === "faculty"
          ? {
              department: values.department,
              designation: values.designation,
              education: values.education || null,
              subjectSpecialization: values.subjectSpecialization || null,
              experienceYears:
                values.experienceYears !== "" &&
                values.experienceYears !== undefined
                  ? Number(values.experienceYears)
                  : null,
              phoneNumber: values.phoneNumber || null,
              campus: values.campus || null,
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
                phoneNumber: values.phoneNumber || null,
                education: null,
                subjectSpecialization: null,
                experienceYears: null,
                subjects: [],
              }
            : role === "admin"
              ? {
                  campus: values.campus || null,
                  phoneNumber: values.phoneNumber || null,
                  education: null,
                  subjectSpecialization: null,
                  experienceYears: null,
                }
              : {};

      await adminApi.createUser({
        ...basePayload,
        ...rolePayload,
      });

      toast.success("User created successfully");
      navigate("/admin/users");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    }
  };

  const showFacultyFields = role === "faculty";
  const showStudentFields = role === "student";
  const showAdminFields = role === "admin";

  return (
    <PortalForm
      title="Create New User"
      subtitle="Add a new administrator, faculty member, or student"
      backPath="/admin/users"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/users")}
      submitLabel="Create User"
      submitIcon={UserPlus}
      submitting={isSubmitting}
    >
      <PortalForm.Section title="Role & Identity">
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
            Account Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {visibleRoles.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                className={`px-4 py-3 rounded-sm text-sm font-medium transition-all duration-200 border ${
                  role === option.value
                    ? "bg-college-navy/10 border-college-navy text-college-navy shadow-sm dark:bg-college-gold/10 dark:border-college-gold dark:text-college-gold"
                    : "bg-white border-college-navy/10 text-gray-600 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <PortalForm.Input
          label="Full Name"
          registration={register("name")}
          error={errors.name?.message}
          required
        />
        <PortalForm.Input
          label="Email Address"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
          required
        />
        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
          Portal ID is generated automatically after save and cannot be edited.
        </div>
        <div className="space-y-1">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-gray-400 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy/20 dark:focus:ring-college-gold/20 transition pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-college-navy dark:hover:text-college-gold transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password?.message ? (
            <span className="text-red-500 dark:text-red-400 text-[10px] md:text-xs mt-0.5">
              {errors.password.message}
            </span>
          ) : null}
        </div>

        <div className="space-y-1">
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-gray-400 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy/20 dark:focus:ring-college-gold/20 transition pr-11"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-college-navy dark:hover:text-college-gold transition-colors"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword?.message ? (
            <span className="text-red-500 dark:text-red-400 text-[10px] md:text-xs mt-0.5">
              {errors.confirmPassword.message}
            </span>
          ) : null}
        </div>
      </PortalForm.Section>

      {showFacultyFields && (
        <PortalForm.Section title="Faculty Details">
          <PortalForm.Input
            label="Department"
            registration={register("department")}
            placeholder="e.g. Computer Science"
          />
          <PortalForm.Input
            label="Designation"
            registration={register("designation")}
            placeholder="e.g. Lecturer, Assistant Professor"
          />
          <PortalForm.Input
            label="Education"
            registration={register("education")}
            placeholder="e.g. MS Computer Science"
          />
          <PortalForm.Input
            label="Subject Specialization"
            registration={register("subjectSpecialization")}
            placeholder="e.g. Artificial Intelligence"
          />
          <PortalForm.Input
            label="Experience (Years)"
            type="number"
            registration={register("experienceYears")}
            placeholder="e.g. 5"
          />
          <PortalForm.Input
            label="Phone Number"
            registration={register("phoneNumber")}
            placeholder="e.g. +8801XXXXXXXXX"
          />
          <div className="col-span-1 md:col-span-2">
            {isSuperAdmin ? (
              <PortalForm.Select
                label="Campus"
                registration={register("campus")}
                options={campuses.map((campus) => ({
                  id: campus.id,
                  label: `${campus.name} (${campus.code})`,
                }))}
                placeholder="Select a campus..."
              />
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block">
                  Campus
                </label>
                <div className="rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-gray-200">
                  {campuses.find((campus) => campus.id === currentCampusId)
                    ?.name || "Your campus"}
                </div>
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block mb-1.5">
              Assigned Subjects
            </label>
            <select
              multiple
              {...register("subjects")}
              className="w-full px-4 py-2.5 bg-white dark:bg-college-navy/50 border border-college-navy/10 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold transition-all min-h-[140px] text-gray-900 dark:text-white font-bold"
            >
              {filteredSubjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hold Ctrl or Cmd to select multiple subjects.
            </p>
          </div>
        </PortalForm.Section>
      )}

      {showStudentFields && (
        <PortalForm.Section title="Student Details">
          <PortalForm.Input
            label="Phone Number"
            registration={register("phoneNumber")}
            placeholder="e.g. +8801XXXXXXXXX"
          />
          <div className="col-span-1 md:col-span-2">
            {isSuperAdmin ? (
              <PortalForm.Select
                label="Campus"
                registration={register("campus")}
                options={campuses.map((campus) => ({
                  id: campus.id,
                  label: `${campus.name} (${campus.code})`,
                }))}
                placeholder="Select a campus..."
              />
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block">
                  Campus
                </label>
                <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-gray-200">
                  {campuses.find((campus) => campus.id === currentCampusId)
                    ?.name || "Your campus"}
                </div>
              </div>
            )}
          </div>

          <PortalForm.Select
            label="Course"
            registration={register("currentCourse")}
            options={filteredCourses.map((course) => ({
              id: course._id,
              label: `${course.title} (${course.code})`,
            }))}
            placeholder="Select a course..."
          />

          <PortalForm.Select
            label="Class"
            registration={register("currentClassRoom")}
            options={filteredClassRooms.map((classRoom) => ({
              id: classRoom._id,
              label: `${classRoom.name} ${classRoom.section ? `(${classRoom.section})` : ""}`,
            }))}
            placeholder="Select a class..."
          />

          <PortalForm.Select
            label="Section"
            registration={register("classSection")}
            options={sectionOptions.map((section) => ({
              id: section,
              label: `Section ${section}`,
            }))}
            placeholder="Select a section later..."
          />

          <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
            All student placement fields are optional during creation and can be
            updated later.
          </div>
        </PortalForm.Section>
      )}

      {showAdminFields && (
        <PortalForm.Section title="Campus Allocation">
          <PortalForm.Input
            label="Phone Number"
            registration={register("phoneNumber")}
            placeholder="e.g. +8801XXXXXXXXX"
          />
          <div className="col-span-1 md:col-span-2">
            <PortalForm.Select
              label="Campus"
              registration={register("campus")}
              options={campuses.map((campus) => ({
                id: campus.id,
                label: `${campus.name} (${campus.code})`,
              }))}
              placeholder="Select a campus..."
            />
          </div>
        </PortalForm.Section>
      )}

      {role === "super_admin" && (
        <PortalForm.Section title="Access Scope">
          <div className="col-span-1 md:col-span-2 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
            Super admin accounts manage the full system and do not need campus,
            faculty, or student assignment fields.
          </div>
        </PortalForm.Section>
      )}
    </PortalForm>
  );
};

export default CreateUser;
