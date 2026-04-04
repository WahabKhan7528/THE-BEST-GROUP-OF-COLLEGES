import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Loader2, Lock, PencilLine, Users } from "lucide-react";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import { useToast } from "../../context/ToastContext";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import ResultEntryTable from "../../components/faculty/ResultEntryTable";
import { portalApi } from "../../services/api";
import SkeletonLoading from "../../components/shared/SkeletonLoading";
import PortalForm from "../../components/portal-shared/PortalForm";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const getCampusLabel = (campus) => campusNames[campus] || String(campus || "Campus");

const buildResultKey = (studentId, classRoomId, subjectId, semester) =>
  [studentId || "student", classRoomId || "class", subjectId || "subject", semester || "term"].join("::");

const getRefId = (value) => {
  const rawValue = value?._id || value?.id || value;
  return rawValue ? String(rawValue) : null;
};

const matchesFaculty = (assignmentFaculty, facultyId) => {
  if (!facultyId) return true;
  const assignedId = getRefId(assignmentFaculty);
  return !assignedId || assignedId === facultyId;
};

const isOldTerm = (term) => Boolean(
  term?.status === "completed" || term?.status === "locked" || term?.resultPublished,
);

const getTermLabel = (term) => {
  if (!term) return "Term";
  if (term.semesterNumber) return `Term ${term.semesterNumber}`;
  return term.annualYear || "Term";
};

const getSemesterValue = (selectedClass, term) => {
  if (!term?.semesterNumber) return term?.annualYear || selectedClass?.annualYear || "";
  const isAnnualClass = Boolean(selectedClass?.annualYear && !selectedClass?.semester);
  return isAnnualClass ? `Year ${term.semesterNumber}` : `Semester ${term.semesterNumber}`;
};

const getActiveTerm = (cls) => {
  const terms = cls?.semesterSubjects || [];
  return terms.find((term) => term.status === "active") || terms[terms.length - 1] || null;
};

const getSubjectOptions = (term, facultyId, selectedClass) => {
  const assignments = term?.subjectAssignments || [];
  if (assignments.length > 0) {
    return assignments
      .filter((assignment) => matchesFaculty(assignment.faculty, facultyId))
      .map((assignment) => ({
      id: getRefId(assignment.subject),
      label: assignment.subject?.name || assignment.subject?.code || "Subject",
      subject: assignment.subject,
      }));
  }

  const classFacultyIds = (selectedClass?.faculty || []).map((item) => getRefId(item)).filter(Boolean);
  if (facultyId && classFacultyIds.length > 0 && !classFacultyIds.includes(facultyId)) {
    return [];
  }

  return (term?.subjects || []).map((subject) => ({
    id: getRefId(subject),
    label: subject?.name || subject?.code || "Subject",
    subject,
  }));
};

const normalizeResultRow = (result) => {
  const studentId = result.student?._id || result.student;
  const classRoomId = result.classRoom?._id || result.classRoom;
  const subjectId = result.subject?._id || result.subject;
  const semester = result.semester || "";

  return {
    id: buildResultKey(studentId, classRoomId, subjectId, semester),
    resultId: result._id,
    studentId: result.student?.portalId || studentId || "-",
    studentName: result.student?.name || "Student",
    rollNo: result.student?.portalId || "-",
    marks: result.marksObtained,
    maxMarks: result.totalMarks,
    remarks: result.remarks || "",
    student: studentId,
    classRoom: classRoomId,
    subject: subjectId,
    semester,
    status: result.grade ? "Graded" : "Pending",
  };
};

const groupResults = (items = []) =>
  items.reduce((acc, result) => {
    const normalized = normalizeResultRow(result);
    if (!acc[normalized.classRoom]) acc[normalized.classRoom] = {};
    acc[normalized.classRoom][normalized.id] = normalized;
    return acc;
  }, {});

const getGrade = (marks, maxMarks) => {
  const percentage = maxMarks ? ((marks / maxMarks) * 100).toFixed(1) : 0;
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "A-";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  return "F";
};

const SemesterDetail = () => {
  const navigate = useNavigate();
  const { classId, termNumber } = useParams();
  const toast = useToast();
  const { currentFaculty, getCurrentCampus, getClassesByCurrentCampus, isDarkMode } = useFacultyContext();
  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus();

  const [resultsByClass, setResultsByClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const selectedClass = classes.find((item) => item.id === classId);
  const term = useMemo(() => {
    if (!selectedClass) return null;
    const terms = selectedClass.semesterSubjects || [];
    return terms.find((item) => String(item.semesterNumber) === String(termNumber))
      || getActiveTerm(selectedClass);
  }, [selectedClass, termNumber]);

  const facultyId = getRefId(currentFaculty);
  const subjectOptions = useMemo(() => getSubjectOptions(term, facultyId, selectedClass), [term, facultyId, selectedClass]);
  const currentSubject = useMemo(() => {
    if (!subjectOptions.length) return null;
    return subjectOptions.find((item) => item.id === selectedSubjectId) || subjectOptions[0];
  }, [subjectOptions, selectedSubjectId]);

  const isReadOnly = isOldTerm(term);
  const semesterLabel = getTermLabel(term);
  const studentRoster = selectedClass?.studentsList || selectedClass?.students || [];

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      try {
        const { data } = await portalApi.results();
        setResultsByClass(groupResults(data.data || []));
      } catch {
        setResultsByClass({});
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [classId, termNumber]);

  useEffect(() => {
    if (!selectedSubjectId && subjectOptions.length > 0) {
      setSelectedSubjectId(subjectOptions[0].id);
    }
  }, [selectedSubjectId, subjectOptions]);

  const rows = useMemo(() => {
    if (!selectedClass || !currentSubject) return [];

    const classResults = resultsByClass[selectedClass.id] || {};
    const semesterValue = getSemesterValue(selectedClass, term);
    const subjectId = currentSubject.id;

    return studentRoster.map((student) => {
      const studentId = student?._id || student;
      const key = buildResultKey(studentId, selectedClass.id, subjectId, semesterValue);
      const existing = classResults[key];

      return {
        id: key,
        studentId: student?.portalId || studentId || "-",
        studentName: student?.name || "Student",
        rollNo: student?.portalId || "-",
        marks: existing?.marks,
        maxMarks: existing?.maxMarks || 100,
        remarks: existing?.remarks || "",
        student: studentId,
        classRoom: selectedClass.id,
        subject: subjectId,
        semester: semesterValue,
        status: existing?.status || (isReadOnly ? "Graded" : "Pending"),
      };
    });
  }, [selectedClass, currentSubject, resultsByClass, studentRoster, term, semesterLabel, isReadOnly]);

  const gradedCount = rows.filter((row) => row.marks !== undefined && row.marks !== null).length;
  const pendingCount = rows.length - gradedCount;
  const averageMarks = gradedCount > 0
    ? (rows.reduce((sum, row) => sum + (row.marks ?? 0), 0) / gradedCount).toFixed(2)
    : "0.00";

  const handleSave = async (row, payload) => {
    if (isReadOnly) return;

    const studentId = getRefId(row.student);
    const classRoomId = getRefId(row.classRoom);
    const subjectId = getRefId(currentSubject?.subject || currentSubject?.id || row.subject);
    const semesterValue = row.semester;

    console.log("[faculty/results] save request", {
      student: row.studentName,
      rollNo: row.rollNo,
      oldMarks: row.marks ?? null,
      newMarks: payload.marks,
      studentId,
      classRoomId,
      subjectId,
      semester: semesterValue,
    });

    const { data } = await portalApi.publishResult({
      student: studentId,
      classRoom: classRoomId,
      subject: subjectId,
      semester: semesterValue,
      marksObtained: payload.marks,
      totalMarks: row.maxMarks || 100,
      grade: getGrade(payload.marks, row.maxMarks || 100),
      remarks: payload.remarks,
    });

    toast.success("Marks saved successfully!");

    const savedResult = data?.data;
    if (savedResult) {
      const normalized = normalizeResultRow(savedResult);
      setResultsByClass((prev) => ({
        ...prev,
        [normalized.classRoom || selectedClass.id || "unknown"]: {
          ...(prev[normalized.classRoom || selectedClass.id || "unknown"] || {}),
          [normalized.id]: normalized,
        },
      }));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-10">
        <PortalPageHeader
          badge={<SkeletonLoading variant="textLine" className="h-6 w-24" />}
          title={<SkeletonLoading variant="textLine" className="h-10 w-64" />}
          subtitle={<SkeletonLoading variant="textLine" className="h-4 w-48 mt-2" />}
          action={<SkeletonLoading variant="textLine" className="h-10 w-32" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonLoading key={idx} variant="panel" className="h-28" />
          ))}
        </div>

        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-sm shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <SkeletonLoading variant="textLine" className="h-6 w-40" />
              <SkeletonLoading variant="textLine" className="h-4 w-64" />
            </div>
            <SkeletonLoading variant="textLine" className="h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
             {Array.from({ length: 5 }).map((_, idx) => (
               <SkeletonLoading key={idx} variant="tableRow" className="h-16" />
             ))}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedClass || !term) {
    return (
      <div className="space-y-6">
        <PortalPageHeader
          badge={<Badge variant={isDarkMode ? "gold" : "navy"}>{getCampusLabel(campus)}</Badge>}
          title="Semester Detail"
          subtitle="The selected class or term could not be found."
          action={
            <Link
              to="/faculty/results"
              className="inline-flex items-center gap-2 rounded-sm bg-college-navy px-4 py-2 text-sm font-semibold text-white hover:bg-college-navy/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Results
            </Link>
          }
        />
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-sm shadow-sm p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">This semester detail is unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={<Badge variant={isDarkMode ? "gold" : "navy"}>{getCampusLabel(campus)}</Badge>}
        title={`${selectedClass.name}`}
        subtitle={`${semesterLabel} • ${isReadOnly ? "view only" : "editable"}`}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/faculty/results"
              className="inline-flex items-center gap-2 rounded-sm bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 px-4 py-2 text-sm font-semibold text-college-navy dark:text-white shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-bold border border-college-navy/10 dark:border-college-gold/20 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold">
              {isReadOnly ? <Lock className="h-4 w-4" /> : <PencilLine className="h-4 w-4" />}
              {isReadOnly ? "Locked semester" : "Editing enabled"}
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-sm bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 p-4 shadow-sm">
          {subjectOptions.length > 1 ? (
            <PortalForm.Select
              label="Subject"
              value={selectedSubjectId || currentSubject?.id || ""}
              onChange={(event) => setSelectedSubjectId(event.target.value)}
              options={subjectOptions}
              placeholder="Select a subject"
            />
          ) : (
            <>
              <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold px-0.5">Subject</p>
              <p className="mt-2 text-base font-black text-college-navy dark:text-white">{currentSubject?.label || "Selected subject"}</p>
            </>
          )}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-bold px-0.5 uppercase tracking-wider">
            {subjectOptions.length} assigned subject{subjectOptions.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="rounded-sm bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 p-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold">Students</p>
          <p className="mt-2 text-base font-black text-college-navy dark:text-white">{rows.length}</p>
        </div>
        <div className="rounded-sm bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 p-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold">Graded</p>
          <p className="mt-2 text-base font-black text-college-navy dark:text-white">{gradedCount}</p>
        </div>
        <div className="rounded-sm bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 p-4 shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold">Average</p>
          <p className="mt-2 text-base font-black text-college-navy dark:text-white">{averageMarks}</p>
        </div>
      </div>

      

      <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-sm shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-college-navy dark:text-white">Student Marks</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isReadOnly ? "Old semesters are view only." : "Enter or update marks for the selected subject."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300">
            <Users className="h-3 w-3" />
            {semesterLabel}
          </div>
        </div>
        <ResultEntryTable rows={rows} onSave={handleSave} readOnly={isReadOnly} />
      </div>
    </div>
  );
};

export default SemesterDetail;
