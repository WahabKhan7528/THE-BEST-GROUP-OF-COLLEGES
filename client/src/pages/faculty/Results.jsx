import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Lock, Layers3 } from "lucide-react";
import { useFacultyContext } from "../../store/hooks/useFacultyReduxContext";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const getCampusLabel = (campus) => campusNames[campus] || String(campus || "Campus");

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
  if (term.semesterNumber) {
    return term.semesterNumber > 1 ? `Term ${term.semesterNumber}` : "Term 1";
  }
  return term.annualYear || "Term";
};

const getSubjectCount = (term, facultyId) => {
  const assignments = (term?.subjectAssignments || []).filter((assignment) => matchesFaculty(assignment.faculty, facultyId));
  if (assignments.length > 0) return assignments.length;
  return (term?.subjects || []).length;
};

const getTermSummary = (cls, facultyId) => {
  const terms = cls?.semesterSubjects || [];
  const currentTerm = terms.find((term) => term.status === "active") || terms[terms.length - 1] || null;
  const subjectAssignments = (currentTerm?.subjectAssignments || []).filter((assignment) => matchesFaculty(assignment.faculty, facultyId));
  const subject = subjectAssignments[0]?.subject || currentTerm?.subjects?.[0] || null;
  return {
    term: currentTerm,
    isOld: isOldTerm(currentTerm),
    label: getTermLabel(currentTerm),
    subjectCount: getSubjectCount(currentTerm, facultyId),
    subject,
  };
};

const Results = () => {
  const navigate = useNavigate();
  const { currentFaculty, getCurrentCampus, getClassesByCurrentCampus, isDarkMode, loading: isContextLoading } = useFacultyContext();
  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus();
  const [activeTab, setActiveTab] = useState("new");
  const facultyId = getRefId(currentFaculty);

  const classCards = useMemo(() => {
    return (classes || [])
      .map((cls) => {
        const summary = getTermSummary(cls, facultyId);
        return {
          ...cls,
          ...summary,
        };
      })
      .filter((cls) => activeTab === "old" ? cls.isOld : !cls.isOld);
  }, [classes, activeTab]);

  const counts = useMemo(() => {
    let newCount = 0;
    let oldCount = 0;

    (classes || []).forEach((cls) => {
      const summary = getTermSummary(cls, facultyId);
      if (summary.isOld) oldCount += 1;
      else newCount += 1;
    });

    return { newCount, oldCount };
  }, [classes]);

  const openSemesterDetail = (classId, termNumber) => {
    navigate(`/faculty/results/${classId}/${termNumber}`);
  };

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          isContextLoading ? (
            <SkeletonLoading variant="textLine" className="h-6 w-24" />
          ) : (
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              {getCampusLabel(campus)}
            </Badge>
          )
        }
        title="Results Management"
        subtitle="Choose a class and semester. New terms can be graded, old terms are read-only."
        action={
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-white dark:bg-college-navy/80 border border-college-navy/10 dark:border-college-gold/20 rounded-sm px-4 py-3 shadow-lg min-w-[120px]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold">New Terms</p>
              {isContextLoading ? (
                <SkeletonLoading variant="textLine" className="h-8 w-12 mt-1" />
              ) : (
                <p className="text-2xl font-black text-college-navy dark:text-white">{counts.newCount}</p>
              )}
            </div>
            <div className="bg-white dark:bg-college-navy/80 border border-college-navy/10 dark:border-college-gold/20 rounded-sm px-4 py-3 shadow-lg min-w-[120px]">
              <p className="text-[10px] uppercase tracking-[0.18em] text-college-navy/60 dark:text-college-gold font-bold">Old Terms</p>
              {isContextLoading ? (
                <SkeletonLoading variant="textLine" className="h-8 w-12 mt-1" />
              ) : (
                <p className="text-2xl font-black text-college-navy dark:text-white">{counts.oldCount}</p>
              )}
            </div>
          </div>
        }
      />

      <div className="bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isContextLoading}
            onClick={() => setActiveTab("new")}
            className={`flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold transition-all ${activeTab === "new" ? "bg-college-navy text-white dark:bg-college-gold dark:text-college-navy" : "bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300"} ${isContextLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <BookOpen className="h-4 w-4" />
            New
          </button>
          <button
            type="button"
            disabled={isContextLoading}
            onClick={() => setActiveTab("old")}
            className={`flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold transition-all ${activeTab === "old" ? "bg-college-navy text-white dark:bg-college-gold dark:text-college-navy" : "bg-slate-50 text-slate-600 dark:bg-white/5 dark:text-slate-300"} ${isContextLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Lock className="h-4 w-4" />
            Old
          </button>
        </div>
      </div>

      {isContextLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm p-5 space-y-4 animate-pulse">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                        <SkeletonLoading variant="textLine" className="h-5 w-24 rounded-full" />
                        <SkeletonLoading variant="textLine" className="h-7 w-48" />
                    </div>
                    <SkeletonLoading variant="textLine" className="h-5 w-12 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <SkeletonLoading variant="panel" className="h-16" />
                    <SkeletonLoading variant="panel" className="h-16" />
                    <SkeletonLoading variant="panel" className="h-16" />
                    <SkeletonLoading variant="panel" className="h-16" />
                </div>
                <div className="flex justify-between items-center pt-2">
                    <SkeletonLoading variant="textLine" className="h-4 w-20" />
                    <SkeletonLoading variant="textLine" className="h-4 w-16" />
                </div>
            </div>
          ))}
        </div>
      ) : classCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classCards.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => openSemesterDetail(cls.id, cls.term?.semesterNumber || 1)}
              className="group text-left bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-college-navy/10 dark:border-college-gold/20 bg-college-navy/5 dark:bg-college-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-college-navy dark:text-college-gold">
                      <Layers3 className="h-3 w-3" />
                      {cls.course?.code || cls.code || "Class"}
                    </div>
                    <h3 className="text-lg font-black text-college-navy dark:text-white group-hover:text-college-navy/80 dark:group-hover:text-college-gold transition-colors">
                      {cls.name}
                    </h3>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${cls.isOld ? "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
                    {cls.isOld ? "Old" : "New"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-sm bg-slate-50 dark:bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-bold">Subject</p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{cls.subject?.name || cls.subject?.code || "Assigned subject"}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{cls.subjectCount || 0} subject{(cls.subjectCount || 0) === 1 ? "" : "s"} assigned</p>
                  </div>
                  <div className="rounded-sm bg-slate-50 dark:bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-bold">Term</p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{cls.label}</p>
                  </div>
                  <div className="rounded-sm bg-slate-50 dark:bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-bold">Students</p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{cls.studentsCount ?? cls.students?.length ?? 0}</p>
                  </div>
                  <div className="rounded-sm bg-slate-50 dark:bg-white/5 p-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 font-bold">Status</p>
                    <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{cls.isOld ? "Locked / Published" : "Open for editing"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm font-medium text-college-navy dark:text-college-gold">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {cls.section ? `Section ${cls.section}` : "Section A"}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-navy/20 rounded-sm shadow-sm p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No {activeTab} result terms found for {getCampusLabel(campus)}.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
