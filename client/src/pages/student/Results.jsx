import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import {
  BarChart3,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Table from "../../components/portal-shared/Table";

// Grading Logic
const getGradeDetails = (marks) => {
  if (marks >= 85)
    return {
      grade: "A",
      qp: 4.0,
      color:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
    };
  if (marks >= 80)
    return {
      grade: "A-",
      qp: 3.7,
      color:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
    };
  if (marks >= 75)
    return {
      grade: "B+",
      qp: 3.3,
      color:
        "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10",
    };
  if (marks >= 70)
    return {
      grade: "B",
      qp: 3.0,
      color:
        "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10",
    };
  if (marks >= 65)
    return {
      grade: "B-",
      qp: 2.7,
      color:
        "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10",
    };
  if (marks >= 61)
    return {
      grade: "C+",
      qp: 2.3,
      color:
        "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30",
    };
  if (marks >= 58)
    return {
      grade: "C",
      qp: 2.0,
      color:
        "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30",
    };
  if (marks >= 55)
    return {
      grade: "C-",
      qp: 1.7,
      color:
        "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30",
    };
  if (marks >= 50)
    return {
      grade: "D",
      qp: 1.0,
      color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
    };
  return {
    grade: "F",
    qp: 0.0,
    color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
  };
};

const calculateSGPA = (subjects) => {
  if (!subjects || subjects.length === 0) return "0.00";
  let totalQP = 0;
  let totalCredits = 0;
  subjects.forEach((sub) => {
    if (sub.marks > 0) {
      // Only count graded subjects
      const { qp } = getGradeDetails(sub.marks);
      totalQP += qp * sub.credits;
      totalCredits += sub.credits;
    }
  });
  return totalCredits > 0 ? (totalQP / totalCredits).toFixed(2) : "0.00";
};

const calculateCredits = (subjects) => {
  if (!subjects) return 0;
  return subjects.reduce((sum, sub) => sum + sub.credits, 0);
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const StudentResults = () => {
  const { getDetailedResultsByCurrentCampus, getCurrentCampus, isDarkMode } =
    useStudentContext();
  const campus = getCurrentCampus();
  const resultData = getDetailedResultsByCurrentCampus(); // { semesters: [] }
  const semesters = resultData?.semesters || [];

  const [selectedSemesterId, setSelectedSemesterId] = useState("all"); // "all" or semester ID

  // Calculate CGPA
  const calculateCGPA = () => {
    let totalQP = 0;
    let totalCredits = 0;
    semesters.forEach((sem) => {
      if (sem.subjects) {
        sem.subjects.forEach((sub) => {
          if (sub.marks > 0) {
            const { qp } = getGradeDetails(sub.marks);
            totalQP += qp * sub.credits;
            totalCredits += sub.credits;
          }
        });
      }
    });
    return totalCredits > 0 ? (totalQP / totalCredits).toFixed(2) : "0.00";
  };

  const currentCGPA = calculateCGPA();

  const selectedSemester =
    selectedSemesterId === "all"
      ? null
      : semesters.find((s) => s.id.toString() === selectedSemesterId);

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Academic Results"
        subtitle="Track your GPA and academic performance."
        action={
          <div className="flex flex-col items-stretch md:items-end gap-3 w-full sm:w-auto">
            {/* Semester Filter - Top */}
            <div className="relative w-full md:w-64 group">
              <select
                value={selectedSemesterId}
                onChange={(e) => setSelectedSemesterId(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-college-navy text-college-navy dark:text-white border border-college-navy/10 dark:border-college-gold/30 py-3 md:py-4 pl-5 pr-12 text-sm md:text-base rounded-sm focus:outline-none focus:ring-4 focus:ring-college-gold/10 focus:border-college-gold font-bold cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-college-navy/90"
              >
                <option value="all">All Semesters</option>
                {semesters.map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CGPA Display - Bottom */}
            <div className="bg-white dark:bg-college-navy/80 px-4 sm:px-5 py-3 rounded-sm border border-college-navy/10 dark:border-college-gold/20 flex flex-col items-center sm:items-end w-full sm:w-auto shadow-lg">
              <span className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold font-bold uppercase tracking-[0.2em]">
                Current CGPA
              </span>
              <span className="text-2xl md:text-3xl font-black text-college-navy dark:text-white leading-none mt-1">
                {currentCGPA}
              </span>
            </div>
          </div>
        }
      />

      {/* Content */}
      {selectedSemesterId === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesters.map((sem) => {
            const sgpa = calculateSGPA(sem.subjects);
            const credits = calculateCredits(sem.subjects);
            const isCompleted =
              sem.subjects && sem.subjects.some((s) => s.marks > 0);

            return (
              <div
                key={sem.id}
                onClick={() => setSelectedSemesterId(sem.id.toString())}
                className="group relative bg-white dark:bg-college-navy rounded-sm md:rounded-sm p-6 md:p-8 border border-college-navy/5 dark:border-college-gold/20 shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-sm flex items-center justify-center text-xl md:text-2xl font-black shadow-lg ${isCompleted ? "bg-college-navy dark:bg-college-gold text-white dark:text-college-navy" : "bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/40"}`}
                    >
                      {sem.id}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/60 font-black uppercase tracking-[0.2em]">
                        Semester GPA
                      </span>
                      <p
                        className={`text-3xl md:text-4xl font-black tracking-tight ${isCompleted ? "text-college-navy dark:text-white" : "text-college-navy/30 dark:text-white/30"}`}
                      >
                        {sgpa}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-black text-college-navy dark:text-white mb-2 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors tracking-tight uppercase">
                    {sem.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm mb-6 md:mb-8">
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/10 text-college-navy/80 dark:text-white/80 px-3 py-1.5 rounded-sm border border-college-navy/5 dark:border-white/5 font-bold">
                      {sem.subjects ? sem.subjects.length : 0} Subjects
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/10 text-college-navy/80 dark:text-white/80 px-3 py-1.5 rounded-sm border border-college-navy/5 dark:border-white/5 font-bold">
                      {credits} Cr. Hrs
                    </span>
                  </div>
                  <div className="flex items-center justify-end pt-4 md:pt-6 border-t border-college-navy/5 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-black text-college-navy dark:text-college-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 uppercase tracking-widest">
                      View Details <ChevronRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Semester Summary Card */}
          {selectedSemester && (
            <div className="bg-white dark:bg-college-navy rounded-sm p-5 sm:p-6 md:p-8 text-college-navy dark:text-white shadow-xl relative overflow-hidden border border-college-navy/5 dark:border-college-gold/20">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-college-gold/10 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 blur-2xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {selectedSemester.name}
                  </h2>
                  <p className="text-college-navy/60 dark:text-white/70 text-sm mt-1">
                    Academic Performance Summary
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-white/10 backdrop-blur-md px-4 sm:px-6 py-4 rounded-sm border border-college-navy/5 dark:border-white/20 text-center md:text-right w-full md:w-auto">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">
                    Semester GPA
                  </p>
                  <p className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
                    {calculateSGPA(selectedSemester.subjects)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t border-college-navy/10 dark:border-white/10 pt-6">
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-sm border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">
                    Total Credits
                  </p>
                  <p className="text-xl md:text-2xl font-bold mt-1">
                    {calculateCredits(selectedSemester.subjects)}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-sm border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">
                    Enrolled Subjects
                  </p>
                  <p className="text-xl md:text-2xl font-bold mt-1">
                    {selectedSemester.subjects
                      ? selectedSemester.subjects.length
                      : 0}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-sm border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">
                    Status
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {calculateSGPA(selectedSemester.subjects) > 0
                      ? "Completed"
                      : "In Progress"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Table */}
          {selectedSemester && selectedSemester.subjects && (
            <div className="mt-6 border border-college-navy/10 dark:border-college-gold/20 rounded-sm overflow-hidden shadow-xl">
              <Table 
                columns={[
                  { key: "code", label: "Subject Code" },
                  { key: "title", label: "Subject Title" },
                  { key: "credits", label: "Cr. Hrs" },
                  { key: "marks", label: "Obtained Marks" },
                  { key: "grade", label: "Final Grade" },
                  { key: "points", label: "Credit Points" },
                ]}
                data={selectedSemester.subjects.map((sub, idx) => {
                  const { grade, qp } = getGradeDetails(sub.marks);
                  return {
                    id: idx,
                    code: <span className="font-bold">{sub.code}</span>,
                    title: <span className="font-serif font-black uppercase tracking-tight">{sub.title}</span>,
                    credits: <span className="font-bold">{sub.credits}</span>,
                    marks: <span className="font-black text-college-navy dark:text-white">{sub.marks}</span>,
                    grade: (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-sm text-sm font-black bg-college-navy dark:bg-college-gold text-white dark:text-college-navy">
                          {grade}
                        </span>
                    ),
                    points: <span className="font-black text-college-navy dark:text-college-gold">{(qp * sub.credits).toFixed(1)}</span>,
                  };
                })}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentResults;
