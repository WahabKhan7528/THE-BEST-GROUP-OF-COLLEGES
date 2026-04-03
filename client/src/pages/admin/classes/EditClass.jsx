import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, CheckCircle2, Plus, Save, Trash2 } from "lucide-react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import PortalForm from "../../../components/portal-shared/PortalForm";
import PublicButton from "../../../components/shared/PublicButton";
import { classSchema } from "../../../schemas/classSchema";
import { adminApi } from "../../../services/api";

const TERM_SUBJECT_LIMIT = 6;

const formatDateInput = (date) => new Date(date).toISOString().slice(0, 10);

const addMonths = (date, months) => {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
};

const buildTermWindow = (index, examSystem) => {
  const startDate = addMonths(new Date(), index * (examSystem === "annual" ? 12 : 6));
  const endDate = addMonths(startDate, examSystem === "annual" ? 12 : 6);
  endDate.setDate(endDate.getDate() - 1);

  return {
    startDate: formatDateInput(startDate),
    endDate: formatDateInput(endDate),
  };
};

const emptySemesterRows = (count, sourceRows = [], examSystem = "semester") =>
  Array.from({ length: count }, (_, index) => {
    const semesterNumber = index + 1;
    const source = sourceRows.find((row) => Number(row.semesterNumber) === semesterNumber);
    const fallbackWindow = buildTermWindow(index, examSystem);
    const subjectAssignments = (source?.subjectAssignments || []).map((assignment) => ({
      subject: String(assignment?.subject?._id || assignment?.subject || assignment?.subjectId || ""),
      faculty: String(assignment?.faculty?._id || assignment?.faculty || assignment?.facultyId || ""),
    })).filter((assignment) => assignment.subject && assignment.faculty);

    return {
      semesterNumber,
      subjectAssignments,
      startDate: source?.startDate ? formatDateInput(source.startDate) : source?.startDate || fallbackWindow.startDate,
      endDate: source?.endDate ? formatDateInput(source.endDate) : source?.endDate || fallbackWindow.endDate,
      status: source?.status || "planned",
      resultPublished: Boolean(source?.resultPublished),
      lockedAt: source?.lockedAt ? formatDateInput(source.lockedAt) : source?.lockedAt || "",
      completedAt: source?.completedAt ? formatDateInput(source.completedAt) : source?.completedAt || "",
    };
  });

const semesterNumberFromValue = (value) => {
  const match = String(value || "").match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const getCampusId = (value) => String(value?._id || value?.id || value || "");

const filterByCampus = (items, campusId, campusField) => {
  const normalizedCampusId = getCampusId(campusId);
  if (!normalizedCampusId) return [];

  return (items || []).filter((item) => {
    const campusValue = campusField ? item?.[campusField] : item?.campuses;
    if (Array.isArray(campusValue)) {
      return campusValue.some((campus) => getCampusId(campus) === normalizedCampusId);
    }

    return getCampusId(campusValue) === normalizedCampusId;
  });
};

const buildSemesterRowsFromClass = (classRoom, count, examSystem = "semester") => {
  if (Array.isArray(classRoom.semesterSubjects) && classRoom.semesterSubjects.length > 0) {
    return emptySemesterRows(count, classRoom.semesterSubjects, examSystem);
  }

  const fallbackSemesterNumber = semesterNumberFromValue(classRoom.semester) || 1;
  return emptySemesterRows(count, [
    {
      semesterNumber: fallbackSemesterNumber,
      subjectAssignments: (classRoom.subjectAssignments || []).length
        ? classRoom.subjectAssignments
        : (classRoom.subjects || []).map((subject, index) => ({
            subject,
            faculty: (classRoom.faculty || [])[index],
          })),
    },
  ]);
};

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const confirmDialog = useConfirm();
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facultyUsers, setFacultyUsers] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [semesterRows, setSemesterRows] = useState([]);
  const [loadedClass, setLoadedClass] = useState(null);
  const [classCode, setClassCode] = useState("");
  const [classCourseId, setClassCourseId] = useState("");
  const [assignmentDialog, setAssignmentDialog] = useState({ open: false, semesterNumber: null, subject: "", faculty: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      section: "",
      course: "",
      semester: "",
      annualYear: "",
      campus: isSuperAdmin ? "" : currentAdmin?.campus?._id || currentAdmin?.campus || "",
    },
  });

  const selectedCourseId = watch("course") || classCourseId;
  const activeCampusId = isSuperAdmin ? (watch("campus") || selectedCampuses[0] || "") : getCampusId(currentAdmin?.campus);
  const visibleCourses = useMemo(() => filterByCampus(courses, activeCampusId), [activeCampusId, courses]);
  const visibleSubjects = useMemo(() => filterByCampus(subjects, activeCampusId), [activeCampusId, subjects]);
  const visibleFacultyUsers = useMemo(() => filterByCampus(facultyUsers, activeCampusId, "campus"), [activeCampusId, facultyUsers]);
  const selectedCourse = useMemo(
    () => visibleCourses.find((course) => course._id === selectedCourseId),
    [selectedCourseId, visibleCourses],
  );
  const isSemesterSystem = selectedCourse?.examSystem === "semester";
  const isAnnualSystem = selectedCourse?.examSystem === "annual";
  const usesTermAllocation = isSemesterSystem || isAnnualSystem;
  const termCount = isAnnualSystem
    ? Number(selectedCourse?.totalYears || 0) || 4
    : Number(selectedCourse?.totalSemesters || 0) || 8;
  const selectedTermField = isAnnualSystem ? "annualYear" : "semester";
  const selectedTermValue = watch(selectedTermField);
  const currentSemesterNumber = semesterNumberFromValue(selectedTermValue);
  const lockedSemesterCount = semesterRows.filter((row) => row.status === "locked" || row.status === "completed" || row.resultPublished).length;
  const totalStudents = loadedClass?.students?.length || 0;

  useEffect(() => {
    if (isSuperAdmin) return;

    const campusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
    if (campusId) {
      setValue("campus", campusId, { shouldValidate: true });
    }
  }, [currentAdmin?.campus, isSuperAdmin, setValue]);

  useEffect(() => {
    const loadClass = async () => {
      try {
        const [classRes, coursesRes, subjectsRes, usersRes] = await Promise.all([
          adminApi.classes(),
          adminApi.courses(),
          adminApi.subjects(),
          adminApi.users({ role: "faculty" }),
        ]);

        setCourses(coursesRes.data.data || []);
        setSubjects(subjectsRes.data.data || []);
        setFacultyUsers(usersRes.data.data || []);

        const existingClass = (classRes.data.data || []).find((item) => item._id === id);
        if (!existingClass) {
          toast.error("Class not found");
          navigate("/admin/classes", { replace: true });
          return;
        }

        const classCampusId = existingClass.campus?._id || existingClass.campus || "";
        if (!isSuperAdmin) {
          const adminCampusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
          if (adminCampusId && String(classCampusId) !== String(adminCampusId)) {
            toast.error("Access denied. This class is not assigned to your campus.");
            navigate("/admin/classes", { replace: true });
            return;
          }
        }

        const courseId = existingClass.course?._id || existingClass.course || "";
        const course = coursesRes.data.data?.find((item) => item._id === courseId);
        const semesterTotal = course?.examSystem === "annual"
          ? Number(course?.totalYears || 0) || 4
          : Number(course?.totalSemesters || 0) || 8;

        setClassCode(existingClass.classCode || "");
        setClassCourseId(courseId);
        setLoadedClass(existingClass);
        reset({
          name: existingClass.name || "",
          section: existingClass.section || "",
          course: courseId,
          semester: existingClass.semester || "",
          annualYear: existingClass.annualYear || "",
          campus: classCampusId || (currentAdmin?.campus?._id || currentAdmin?.campus || ""),
        });

        setSelectedCampuses(classCampusId ? [classCampusId] : []);
        setSemesterRows(buildSemesterRowsFromClass(existingClass, semesterTotal, course?.examSystem || "semester"));
      } catch {
        toast.error("Failed to load class");
        navigate("/admin/classes", { replace: true });
      }
    };

    loadClass();
  }, [currentAdmin?.campus, id, isSuperAdmin, navigate, reset, toast, setValue]);

  useEffect(() => {
    if (!selectedCourse) return;
    if (selectedCourse.examSystem === "semester" || selectedCourse.examSystem === "annual") {
      setSemesterRows((prev) => emptySemesterRows(termCount, prev, selectedCourse.examSystem));
    } else {
      setSemesterRows([]);
    }
  }, [selectedCourse, termCount]);

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) => {
      const next = prev.includes(campusId)
        ? prev.filter((value) => value !== campusId)
        : [campusId];
      setValue("campus", next[0] || "", { shouldValidate: true, shouldDirty: true });
      return next;
    });
  };

  const updateSemesterRow = (semesterNumber, key, values) => {
    setSemesterRows((prev) =>
      prev.map((row) =>
        row.semesterNumber === semesterNumber ? { ...row, [key]: values } : row,
      ),
    );
  };

  const selectedSubjectIds = useMemo(
    () => new Set(semesterRows.flatMap((row) => (row.subjectAssignments || []).map((assignment) => assignment.subject))),
    [semesterRows],
  );

  const subjectOptionsForSemester = (semesterNumber, selectedIds = []) => {
    const selectedSet = new Set(selectedIds);
    return visibleSubjects.filter((subject) => {
      const subjectId = subject._id;
      if (selectedSet.has(subjectId)) return true;
      return !semesterRows.some((row) =>
        row.semesterNumber !== semesterNumber
        && (row.subjectAssignments || []).some((assignment) => assignment.subject === subjectId),
      );
    });
  };

  const openAssignmentDialog = (semesterNumber) => {
    setAssignmentDialog({ open: true, semesterNumber, subject: "", faculty: "" });
  };

  const closeAssignmentDialog = () => {
    setAssignmentDialog({ open: false, semesterNumber: null, subject: "", faculty: "" });
  };

  const addSubjectAssignment = () => {
    const { semesterNumber, subject, faculty } = assignmentDialog;
    if (!semesterNumber || !subject || !faculty) return;

    setSemesterRows((prev) => prev.map((row) => {
      if (row.semesterNumber !== semesterNumber) return row;
      const subjectAssignments = row.subjectAssignments || [];
      if (subjectAssignments.length >= TERM_SUBJECT_LIMIT) return row;
      if (subjectAssignments.some((assignment) => assignment.subject === subject)) return row;

      return {
        ...row,
        subjectAssignments: [...subjectAssignments, { subject, faculty }],
      };
    }));

    closeAssignmentDialog();
  };

  const removeSubjectAssignment = (semesterNumber, subjectId) => {
    setSemesterRows((prev) => prev.map((row) => {
      if (row.semesterNumber !== semesterNumber) return row;
      return {
        ...row,
        subjectAssignments: (row.subjectAssignments || []).filter((assignment) => assignment.subject !== subjectId),
      };
    }));
  };

  const onSubmit = async (values) => {
    try {
      const semesterSubjectsPayload = usesTermAllocation
        ? semesterRows
            .map((row) => ({
              semesterNumber: row.semesterNumber,
              startDate: row.startDate || null,
              endDate: row.endDate || null,
              status: row.status || "planned",
              resultPublished: Boolean(row.resultPublished),
              lockedAt: row.lockedAt || null,
              completedAt: row.completedAt || null,
              subjectAssignments: row.subjectAssignments || [],
            }))
            .filter((row) => row.subjectAssignments.length)
        : [];

      const assignmentSubjects = semesterSubjectsPayload.flatMap((row) => row.subjectAssignments.map((assignment) => assignment.subject));
      const assignmentFaculty = semesterSubjectsPayload.flatMap((row) => row.subjectAssignments.map((assignment) => assignment.faculty));

      await adminApi.updateClass(id, {
        name: values.name,
        section: values.section,
        course: values.course || null,
        semester: isAnnualSystem ? null : values.semester || null,
        annualYear: isAnnualSystem ? values.annualYear || null : values.annualYear || null,
        campus: values.campus,
        subjects: Array.from(new Set(assignmentSubjects)),
        faculty: Array.from(new Set(assignmentFaculty)),
        semesterSubjects: semesterSubjectsPayload,
      });

      toast.success("Class updated successfully");
      navigate("/admin/classes");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update class");
    }
  };

  const handleDelete = async () => {
    const confirmed = await confirmDialog({
      title: "Delete Class",
      message: "Are you sure you want to delete this class?",
      confirmText: "Delete",
      variant: "danger",
    });

    if (!confirmed) return;

    try {
      await adminApi.deleteClass(id);
      toast.success("Class deleted successfully");
      navigate("/admin/classes");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete class");
    }
  };

  const getCampusLabel = () => {
    if (isSuperAdmin) return campuses.find((campus) => campus.id === (watch("campus") || selectedCampuses[0]))?.name || "Campus";
    const campusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
    return campuses.find((campus) => campus.id === campusId)?.name || "Campus";
  };

  return (
    <PortalForm
      title="Edit Class"
      subtitle={`Update class details and ${isAnnualSystem ? "year" : "semester"} subjects`}
      backPath="/admin/classes"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/classes")}
      submitLabel="Save Changes"
      submitIcon={Save}
      submitting={isSubmitting}
      headerActions={
        <PublicButton type="button" variant="danger" size="sm" onClick={handleDelete} icon={Trash2}>
          Delete
        </PublicButton>
      }
    >
      <PortalForm.Section title="Campus Allocation" className="!space-y-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Campus *</label>
          {isSuperAdmin ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {campuses.map((campus) => {
                const isSelected = (watch("campus") || selectedCampuses[0]) === campus.id;
                return (
                  <label
                    key={campus.id}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-sm border-2 cursor-pointer transition-all duration-200 ${isSelected ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm" : "bg-white border-gray-100 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"}`}
                  >
                    <input type="radio" value={campus.id} {...register("campus")} checked={isSelected} onChange={() => handleCampusToggle(campus.id)} className="sr-only" />
                    <Building2 className={`w-6 h-6 mb-2 ${isSelected ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                    <span className={`text-sm font-bold text-center ${isSelected ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>{campus.name}</span>
                    {isSelected && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-700 dark:text-gray-200">
              <Building2 className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{getCampusLabel()}</span>
              <span className="ml-auto text-xs bg-college-gold/10 text-college-navy dark:text-college-gold px-2 py-1 rounded-full">Fixed Campus</span>
            </div>
          )}
          {!isSuperAdmin && <input type="hidden" {...register("campus")} />}
        </div>
      </PortalForm.Section>

      <PortalForm.Section title="Academic Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input label="Class Name" registration={register("name")} error={errors.name?.message} placeholder="e.g. BSCS - 5th Semester" required />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <span className="px-2.5 py-1 bg-college-navy/10 text-college-navy dark:text-college-gold text-xs font-medium rounded-sm border border-college-gold/20 inline-block w-fit">
            Code: {classCode || "AUTO"}
          </span>
        </div>
        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300 -mt-2">
          Class code is locked after creation.
        </div>

        <PortalForm.Input label="Section" registration={register("section")} placeholder="e.g. A" />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Course</label>
          <select {...register("course")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white">
            <option value="">Select course...</option>
            {visibleCourses.map((course) => <option key={course._id} value={course._id}>{course.title} ({course.code})</option>)}
          </select>
        </div>

        {(isSemesterSystem || !selectedCourse) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Semester</label>
            <select {...register("semester")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white">
              <option value="">Select current semester...</option>
              {Array.from({ length: isSemesterSystem ? termCount : 8 }, (_, index) => {
                const semesterNumber = index + 1;
                return (
                  <option key={semesterNumber} value={`SEM-${semesterNumber}`}>
                    Semester {semesterNumber}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {(isAnnualSystem || !selectedCourse) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Annual Year</label>
            <select {...register("annualYear")} className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white">
              <option value="">Select year...</option>
              {Array.from({ length: isAnnualSystem ? termCount : 5 }, (_, index) => {
                const yearNumber = index + 1;
                return (
                  <option key={yearNumber} value={`Y${yearNumber}`}>
                    Year {yearNumber}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </PortalForm.Section>

      <PortalForm.Section title="Class Summary">
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-4 dark:border-college-gold/20 dark:bg-college-navy/40">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Students</p>
            <p className="mt-1 text-2xl font-bold text-college-navy dark:text-college-gold">{totalStudents}</p>
          </div>
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-4 dark:border-college-gold/20 dark:bg-college-navy/40">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Current Term</p>
            <p className="mt-1 text-2xl font-bold text-college-navy dark:text-college-gold">{selectedTermValue || "Not set"}</p>
          </div>
          <div className="rounded-sm border border-gray-200 bg-gray-50 p-4 dark:border-college-gold/20 dark:bg-college-navy/40">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Completed / Locked</p>
            <p className="mt-1 text-2xl font-bold text-college-navy dark:text-college-gold">{lockedSemesterCount}/{semesterRows.length || 0}</p>
          </div>
        </div>
      </PortalForm.Section>

      {selectedCourse && selectedCourse.examSystem !== "other" && (
        <PortalForm.Section title={`${isAnnualSystem ? "Year" : "Semester"} Subject Allocation`}>
          <div className="col-span-1 md:col-span-2 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 bg-gray-50/70 dark:bg-college-navy/40 p-4 text-sm text-gray-600 dark:text-gray-300">
            Subjects, teachers, dates, and lock state are managed per term. Completed terms stay locked.
          </div>

          {semesterRows.map((row) => {
            const locked = currentSemesterNumber > 0 && row.semesterNumber < currentSemesterNumber || row.status === "locked" || row.status === "completed" || row.resultPublished;

            return (
              <div key={row.semesterNumber} className={`col-span-1 md:col-span-2 rounded-sm border p-4 ${locked ? "border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-college-navy/30" : "border-gray-200 bg-white dark:border-college-gold/20 dark:bg-college-navy/40"}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{isAnnualSystem ? "Year" : "Semester"} {row.semesterNumber}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{locked ? "Locked because this term is already completed or published" : "Optional term setup"}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-college-navy/10 text-college-navy dark:text-college-gold">{(row.subjectAssignments || []).length} subjects</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Start Date</label>
                    <input
                      type="date"
                      min={formatDateInput(new Date())}
                      disabled={locked}
                      value={row.startDate}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "startDate", event.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">End Date</label>
                    <input
                      type="date"
                      min={row.startDate || formatDateInput(new Date())}
                      disabled={locked}
                      value={row.endDate}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "endDate", event.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                    <select
                      disabled={locked}
                      value={row.status}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "status", event.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white disabled:opacity-60"
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="locked">Locked</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject Assignments</label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Add one subject at a time and choose the teacher for it.</p>
                      </div>
                      <button
                        type="button"
                        disabled={locked || (row.subjectAssignments || []).length >= TERM_SUBJECT_LIMIT}
                        onClick={() => openAssignmentDialog(row.semesterNumber)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-college-navy text-white text-sm font-medium disabled:opacity-60"
                      >
                        <Plus className="w-4 h-4" />
                        Add Subject
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(row.subjectAssignments || []).length === 0 ? (
                        <div className="rounded-sm border border-dashed border-gray-300 dark:border-college-gold/20 px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          No subject assignments added yet.
                        </div>
                      ) : (
                        (row.subjectAssignments || []).map((assignment, assignmentIndex) => {
                          const subject = visibleSubjects.find((item) => item._id === assignment.subject);
                          const faculty = visibleFacultyUsers.find((user) => user._id === assignment.faculty);
                          return (
                            <div key={`${assignment.subject}-${assignmentIndex}`} className="flex items-center justify-between gap-3 rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 px-4 py-3">
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">{subject?.name || "Subject"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{subject?.code || ""} {faculty ? `• ${faculty.name}` : ""}</p>
                              </div>
                              {!locked && (
                                <button
                                  type="button"
                                  onClick={() => removeSubjectAssignment(row.semesterNumber, assignment.subject)}
                                  className="text-xs font-medium text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400">Subjects selected in other terms are hidden here. Maximum {TERM_SUBJECT_LIMIT} subjects.</p>
                  </div>
                </div>
              </div>
            );
          })}
        </PortalForm.Section>
      )}

      {assignmentDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-sm bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 shadow-xl p-5 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Subject Assignment</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pick a subject and the teacher responsible for it.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
                <select
                  value={assignmentDialog.subject}
                  onChange={(event) => setAssignmentDialog((prev) => ({ ...prev, subject: event.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white"
                >
                  <option value="">Select subject...</option>
                  {subjectOptionsForSemester(
                    assignmentDialog.semesterNumber,
                    (semesterRows.find((row) => row.semesterNumber === assignmentDialog.semesterNumber)?.subjectAssignments || []).map((assignment) => assignment.subject),
                  ).map((subject) => (
                    <option key={subject._id} value={subject._id} disabled={selectedSubjectIds.has(subject._id)}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Faculty</label>
                <select
                  value={assignmentDialog.faculty}
                  onChange={(event) => setAssignmentDialog((prev) => ({ ...prev, faculty: event.target.value }))}
                  className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm text-gray-900 dark:text-white"
                >
                  <option value="">Select faculty...</option>
                  {visibleFacultyUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.portalId})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeAssignmentDialog} className="px-4 py-2 rounded-sm border border-gray-200 dark:border-college-gold/20 text-sm font-medium text-gray-700 dark:text-gray-300">
                Cancel
              </button>
              <button type="button" onClick={addSubjectAssignment} className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-college-navy text-white text-sm font-medium">
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalForm>
  );
};

export default EditClass;
