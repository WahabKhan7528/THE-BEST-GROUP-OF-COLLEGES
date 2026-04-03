import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, Plus } from "lucide-react";
import { useAdminContext } from "../../../store/hooks/useAdminReduxContext";
import PortalForm from "../../../components/portal-shared/PortalForm";
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

    return {
      semesterNumber,
      startDate: source?.startDate ? formatDateInput(source.startDate) : source?.startDate || fallbackWindow.startDate,
      endDate: source?.endDate ? formatDateInput(source.endDate) : source?.endDate || fallbackWindow.endDate,
      status: source?.status || "planned",
      resultPublished: Boolean(source?.resultPublished),
      lockedAt: source?.lockedAt ? formatDateInput(source.lockedAt) : source?.lockedAt || "",
      completedAt: source?.completedAt ? formatDateInput(source.completedAt) : source?.completedAt || "",
      subjectAssignments: (source?.subjectAssignments || []).map((assignment) => ({
        subject: String(assignment?.subject?._id || assignment?.subject || assignment?.subjectId || ""),
        faculty: String(assignment?.faculty?._id || assignment?.faculty || assignment?.facultyId || ""),
      })).filter((assignment) => assignment.subject && assignment.faculty),
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

const CreateClass = () => {
  const navigate = useNavigate();
  const { campuses, isSuperAdmin, currentAdmin } = useAdminContext();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facultyUsers, setFacultyUsers] = useState([]);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [semesterRows, setSemesterRows] = useState([]);
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
      campus: isSuperAdmin ? "" : currentAdmin?.campus?._id || currentAdmin?.campus || "",
      name: "",
      section: "",
      course: "",
      semester: "",
      annualYear: "",
    },
  });

  const activeCampusId = isSuperAdmin ? selectedCampuses[0] || "" : getCampusId(currentAdmin?.campus);
  const visibleCourses = useMemo(() => filterByCampus(courses, activeCampusId), [activeCampusId, courses]);
  const visibleSubjects = useMemo(() => filterByCampus(subjects, activeCampusId), [activeCampusId, subjects]);
  const visibleFacultyUsers = useMemo(() => filterByCampus(facultyUsers, activeCampusId, "campus"), [activeCampusId, facultyUsers]);
  const selectedCourseId = watch("course");
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
  const currentSemesterNumber = semesterNumberFromValue(watch(selectedTermField));

  useEffect(() => {
    if (isSuperAdmin) return;

    const campusId = currentAdmin?.campus?._id || currentAdmin?.campus || "";
    if (campusId) {
      setValue("campus", campusId, { shouldValidate: true });
    }
  }, [currentAdmin?.campus, isSuperAdmin, setValue]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesRes, subjectsRes, usersRes] = await Promise.all([
          adminApi.courses(),
          adminApi.subjects(),
          adminApi.users({ role: "faculty" }),
        ]);

        setCourses(coursesRes.data.data || []);
        setSubjects(subjectsRes.data.data || []);
        setFacultyUsers(usersRes.data.data || []);
      } catch {
        setCourses([]);
        setSubjects([]);
        setFacultyUsers([]);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setSemesterRows([]);
      return;
    }

    if (usesTermAllocation) {
      setSemesterRows((prev) => emptySemesterRows(termCount, prev, selectedCourse.examSystem));
      return;
    }

    setSemesterRows([]);
  }, [selectedCourse, termCount, usesTermAllocation]);

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) => {
      const next = prev.includes(campusId) ? prev.filter((id) => id !== campusId) : [campusId];
      setValue("campus", next[0] || "", { shouldValidate: true, shouldDirty: true });
      return next;
    });
  };

  const updateSemesterRow = (semesterNumber, key, value) => {
    setSemesterRows((prev) => prev.map((row) => (row.semesterNumber === semesterNumber ? { ...row, [key]: value } : row)));
  };

  const subjectOptionsForSemester = (semesterNumber) =>
    visibleSubjects.filter((subject) => {
      const subjectId = subject._id;
      return !semesterRows.some(
        (row) => row.semesterNumber !== semesterNumber
          && (row.subjectAssignments || []).some((assignment) => assignment.subject === subjectId),
      );
    });

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

      return { ...row, subjectAssignments: [...subjectAssignments, { subject, faculty }] };
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
    const campusesToUse = isSuperAdmin
      ? selectedCampuses
      : [values.campus || currentAdmin?.campus?._id || currentAdmin?.campus].filter(Boolean);

    if (campusesToUse.length === 0) return;

    const semesterSubjects = usesTermAllocation
      ? semesterRows
          .filter((row) => (row.subjectAssignments || []).length > 0)
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
      : [];

    const subjectIds = semesterSubjects.flatMap((row) => row.subjectAssignments.map((assignment) => assignment.subject));
    const facultyIds = semesterSubjects.flatMap((row) => row.subjectAssignments.map((assignment) => assignment.faculty));

    try {
      await adminApi.createClass({
        name: values.name,
        section: values.section,
        course: values.course || null,
        semester: isAnnualSystem ? null : values.semester || null,
        annualYear: isAnnualSystem ? values.annualYear || null : null,
        campus: campusesToUse[0],
        subjects: Array.from(new Set(subjectIds)),
        faculty: Array.from(new Set(facultyIds)),
        semesterSubjects,
      });

      reset({
        campus: isSuperAdmin ? "" : currentAdmin?.campus?._id || currentAdmin?.campus || "",
        name: "",
        section: "",
        course: "",
        semester: "",
        annualYear: "",
      });
      setSemesterRows([]);
      closeAssignmentDialog();
      if (isSuperAdmin) setSelectedCampuses([]);
      navigate("/admin/classes", { replace: true });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to create class");
    }
  };

  const termLabel = isAnnualSystem ? "Year" : "Semester";
  const termCountLabel = isAnnualSystem ? "years" : "semesters";

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return currentAdmin?.campus?.name || campuses.find((campus) => campus.id === (currentAdmin?.campus?._id || currentAdmin?.campus))?.name || "Campus";
    }

    return null;
  };

  return (
    <PortalForm
      title="Create New Class"
      subtitle={`Add a new class and assign subjects by ${termCountLabel}`}
      backPath="/admin/classes"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate("/admin/classes")}
      submitLabel="Create Class"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      <PortalForm.Section title="Campus Allocation" className="!space-y-4">
        <div className="col-span-1 md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Select Campus *</label>
          {isSuperAdmin ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {campuses.map((campus) => {
                const isSelected = selectedCampuses.includes(campus.id);
                return (
                  <label
                    key={campus.id}
                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-sm border-2 p-4 transition-all duration-200 ${isSelected ? "border-college-navy bg-college-navy/5 shadow-sm dark:border-college-gold dark:bg-college-gold/10" : "border-gray-100 bg-white hover:bg-gray-50 dark:border-college-gold/20 dark:bg-college-navy/50 dark:hover:bg-college-navy/80"}`}
                  >
                    <input type="radio" value={campus.id} checked={isSelected} onChange={() => handleCampusToggle(campus.id)} className="sr-only" />
                    <Building2 className={`mb-2 h-6 w-6 ${isSelected ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                    <span className={`text-center text-sm font-bold ${isSelected ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>{campus.name}</span>
                    {isSelected && <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-college-navy dark:text-college-gold" />}
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-sm border border-gray-200 bg-gray-50 p-4 text-gray-700 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-gray-300">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span className="font-medium">{getCampusLabel()}</span>
            </div>
          )}
          {!isSuperAdmin && <input type="hidden" {...register("campus")} />}
        </div>
      </PortalForm.Section>

      <PortalForm.Section title="Academic Details">
        <div className="col-span-1 md:col-span-2">
          <PortalForm.Input label="Class Name" registration={register("name")} error={errors.name?.message} placeholder="e.g. BSCS - 5th Semester" required />
        </div>

        <div className="md:col-span-2 rounded-sm border border-dashed border-gray-300 bg-gray-50/70 p-4 text-sm text-gray-600 dark:border-college-gold/20 dark:bg-college-navy/40 dark:text-gray-300">
          Class code is generated automatically from the class name after save.
        </div>

        <PortalForm.Input label="Section" registration={register("section")} placeholder="e.g. A" />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Course</label>
          <select {...register("course")} className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white">
            <option value="">Select course...</option>
            {visibleCourses.map((course) => (
              <option key={course._id} value={course._id}>{course.title} ({course.code})</option>
            ))}
          </select>
        </div>

        {(isSemesterSystem || !selectedCourse) && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Semester</label>
            <select {...register("semester")} className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white">
              <option value="">Select current semester...</option>
              {Array.from({ length: isSemesterSystem ? termCount : 8 }, (_, index) => (
                <option key={index + 1} value={`SEM-${index + 1}`}>Semester {index + 1}</option>
              ))}
            </select>
          </div>
        )}

        {(isAnnualSystem || !selectedCourse) && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Year</label>
            <select {...register("annualYear")} className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white">
              <option value="">Select year...</option>
              {Array.from({ length: isAnnualSystem ? termCount : 5 }, (_, index) => (
                <option key={index + 1} value={`Y${index + 1}`}>Year {index + 1}</option>
              ))}
            </select>
          </div>
        )}
      </PortalForm.Section>

      {selectedCourse && selectedCourse.examSystem !== "other" ? (
        <PortalForm.Section title={`${termLabel} Subject Allocation`}>
          <div className="col-span-1 md:col-span-2 rounded-sm border border-dashed border-gray-300 bg-gray-50/70 p-4 text-sm text-gray-600 dark:border-college-gold/20 dark:bg-college-navy/40 dark:text-gray-300">
            Assign subjects one by one and pick a faculty member for each subject. Up to {TERM_SUBJECT_LIMIT} subjects per {termLabel.toLowerCase()}.
          </div>

          {semesterRows.map((row) => {
            const locked = (currentSemesterNumber > 0 && row.semesterNumber < currentSemesterNumber) || row.status === "locked" || row.status === "completed" || row.resultPublished;
            const subjectAssignments = row.subjectAssignments || [];

            return (
              <div key={row.semesterNumber} className={`col-span-1 md:col-span-2 rounded-sm border p-4 ${locked ? "border-gray-200 bg-gray-50/70 dark:border-gray-700 dark:bg-college-navy/30" : "border-gray-200 bg-white dark:border-college-gold/20 dark:bg-college-navy/40"}`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{termLabel} {row.semesterNumber}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{locked ? "Locked because this term is completed or published" : "Optional term setup"}</p>
                  </div>
                  <span className="rounded-full bg-college-navy/10 px-2.5 py-1 text-xs font-medium text-college-navy dark:text-college-gold">{subjectAssignments.length} subjects</span>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                    <input
                      type="date"
                      min={formatDateInput(new Date())}
                      disabled={locked}
                      value={row.startDate}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "startDate", event.target.value)}
                      className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 disabled:opacity-60 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                    <input
                      type="date"
                      min={row.startDate || formatDateInput(new Date())}
                      disabled={locked}
                      value={row.endDate}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "endDate", event.target.value)}
                      className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 disabled:opacity-60 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                      disabled={locked}
                      value={row.status}
                      onChange={(event) => updateSemesterRow(row.semesterNumber, "status", event.target.value)}
                      className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 disabled:opacity-60 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white"
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
                        disabled={locked || subjectAssignments.length >= TERM_SUBJECT_LIMIT}
                        onClick={() => openAssignmentDialog(row.semesterNumber)}
                        className="inline-flex items-center gap-2 rounded-sm bg-college-navy px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
                      >
                        <Plus className="h-4 w-4" />
                        Add Subject
                      </button>
                    </div>

                    <div className="space-y-2">
                      {subjectAssignments.length === 0 ? (
                        <div className="rounded-sm border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 dark:border-college-gold/20 dark:text-gray-400">
                          No subject assignments added yet.
                        </div>
                      ) : (
                        subjectAssignments.map((assignment, assignmentIndex) => {
                          const subject = subjects.find((item) => item._id === assignment.subject);
                          const faculty = facultyUsers.find((user) => user._id === assignment.faculty);

                          return (
                            <div key={`${assignment.subject}-${assignmentIndex}`} className="flex items-center justify-between gap-3 rounded-sm border border-gray-200 bg-white px-4 py-3 dark:border-college-gold/20 dark:bg-college-navy/50">
                              <div>
                                <p className="text-sm font-semibold text-gray-800 dark:text-white">{subject?.name || "Subject"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{subject?.code || ""}{faculty ? ` • ${faculty.name}` : ""}</p>
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
      ) : (
        <PortalForm.Section title="Academic Allocation">
          <div className="col-span-1 md:col-span-2 rounded-sm border border-dashed border-gray-300 bg-gray-50/70 p-4 text-sm text-gray-600 dark:border-college-gold/20 dark:bg-college-navy/40 dark:text-gray-300">
            Select a semester or annual course to assign subjects and teachers per term.
          </div>
        </PortalForm.Section>
      )}

      {assignmentDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-sm border border-gray-200 bg-white p-5 shadow-xl dark:border-college-gold/20 dark:bg-college-navy">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Subject Assignment</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pick a subject and the teacher responsible for it.</p>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <select
                  value={assignmentDialog.subject}
                  onChange={(event) => setAssignmentDialog((prev) => ({ ...prev, subject: event.target.value }))}
                  className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white"
                >
                  <option value="">Select subject...</option>
                  {subjectOptionsForSemester(assignmentDialog.semesterNumber || 0).map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name} ({subject.code})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Faculty</label>
                <select
                  value={assignmentDialog.faculty}
                  onChange={(event) => setAssignmentDialog((prev) => ({ ...prev, faculty: event.target.value }))}
                  className="w-full rounded-sm border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-gray-900 dark:border-college-gold/20 dark:bg-college-navy/50 dark:text-white"
                >
                  <option value="">Select faculty...</option>
                  {visibleFacultyUsers.map((user) => (
                    <option key={user._id} value={user._id}>{user.name} ({user.portalId})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={closeAssignmentDialog} className="rounded-sm border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 dark:border-college-gold/20 dark:text-gray-300">Cancel</button>
              <button type="button" onClick={addSubjectAssignment} className="inline-flex items-center gap-2 rounded-sm bg-college-navy px-4 py-2 text-sm font-medium text-white">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalForm>
  );
};

export default CreateClass;
