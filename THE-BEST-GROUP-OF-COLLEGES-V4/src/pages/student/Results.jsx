import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import { BarChart3, TrendingUp, Award, ChevronDown, ChevronRight } from "lucide-react";

// Grading Logic
const getGradeDetails = (marks) => {
  if (marks >= 85) return { grade: "A", qp: 4.0, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" };
  if (marks >= 80) return { grade: "A-", qp: 3.7, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" };
  if (marks >= 75) return { grade: "B+", qp: 3.3, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 70) return { grade: "B", qp: 3.0, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 65) return { grade: "B-", qp: 2.7, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 61) return { grade: "C+", qp: 2.3, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 58) return { grade: "C", qp: 2.0, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 55) return { grade: "C-", qp: 1.7, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 50) return { grade: "D", qp: 1.0, color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
  return { grade: "F", qp: 0.0, color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
};

const calculateSGPA = (subjects) => {
  if (!subjects || subjects.length === 0) return "0.00";
  let totalQP = 0;
  let totalCredits = 0;
  subjects.forEach(sub => {
    if (sub.marks > 0) { // Only count graded subjects
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
  const { getDetailedResultsByCurrentCampus, getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const resultData = getDetailedResultsByCurrentCampus(); // { semesters: [] }
  const semesters = resultData?.semesters || [];

  const [selectedSemesterId, setSelectedSemesterId] = useState("all"); // "all" or semester ID

  // Calculate CGPA
  const calculateCGPA = () => {
    let totalQP = 0;
    let totalCredits = 0;
    semesters.forEach(sem => {
      if (sem.subjects) {
        sem.subjects.forEach(sub => {
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

  const selectedSemester = selectedSemesterId === "all"
    ? null
    : semesters.find(s => s.id.toString() === selectedSemesterId);

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
                className="w-full appearance-none bg-white dark:bg-college-navy text-college-navy dark:text-white border border-college-navy/10 dark:border-college-gold/30 py-3 md:py-4 pl-5 pr-12 text-sm md:text-base rounded-2xl focus:outline-none focus:ring-4 focus:ring-college-gold/10 focus:border-college-gold font-bold cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-college-navy/90"
              >
                <option value="all">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem.id} value={sem.id}>{sem.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-college-navy dark:text-college-gold transition-transform group-hover:scale-110">
                <ChevronDown size={20} strokeWidth={3} />
              </div>
            </div>

            {/* CGPA Display - Bottom */}
            <div className="bg-white dark:bg-college-navy/80 px-5 py-3 rounded-2xl border border-college-navy/10 dark:border-college-gold/20 flex flex-col items-center sm:items-end min-w-[120px] shadow-lg">
              <span className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold font-bold uppercase tracking-[0.2em]">Current CGPA</span>
              <span className="text-2xl md:text-3xl font-black text-college-navy dark:text-white leading-none mt-1">{currentCGPA}</span>
            </div>
          </div>
        }
      />

      {/* Content */}
      {selectedSemesterId === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesters.map(sem => {
            const sgpa = calculateSGPA(sem.subjects);
            const credits = calculateCredits(sem.subjects);
            const isCompleted = sem.subjects && sem.subjects.some(s => s.marks > 0);

            return (
              <div key={sem.id}
                onClick={() => setSelectedSemesterId(sem.id.toString())}
                className="group relative bg-white dark:bg-college-navy rounded-2xl md:rounded-3xl p-6 md:p-8 border border-college-navy/5 dark:border-college-gold/20 shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-black shadow-lg ${isCompleted ? 'bg-college-navy dark:bg-college-gold text-white dark:text-college-navy' : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/40'}`}>
                      {sem.id}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/60 font-black uppercase tracking-[0.2em]">Semester GPA</span>
                      <p className={`text-3xl md:text-4xl font-black tracking-tight ${isCompleted ? 'text-college-navy dark:text-white' : 'text-college-navy/30 dark:text-white/30'}`}>{sgpa}</p>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-serif font-black text-college-navy dark:text-white mb-2 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors tracking-tight uppercase">{sem.name}</h3>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm mb-6 md:mb-8">
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/10 text-college-navy/80 dark:text-white/80 px-3 py-1.5 rounded-xl border border-college-navy/5 dark:border-white/5 font-bold">
                      {sem.subjects ? sem.subjects.length : 0} Subjects
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-white/10 text-college-navy/80 dark:text-white/80 px-3 py-1.5 rounded-xl border border-college-navy/5 dark:border-white/5 font-bold">
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
            <div className="bg-white dark:bg-college-navy rounded-3xl p-8 text-college-navy dark:text-white shadow-xl relative overflow-hidden border border-college-navy/5 dark:border-college-gold/20">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-college-gold/10 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50 blur-2xl"></div>
              <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
                <BarChart3 size={120} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedSemester.name}</h2>
                  <p className="text-college-navy/60 dark:text-white/70 text-sm mt-1">Academic Performance Summary</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-college-navy/5 dark:border-white/20 text-center md:text-right">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">Semester GPA</p>
                  <p className="text-5xl font-extrabold tracking-tight mt-1">{calculateSGPA(selectedSemester.subjects)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t border-college-navy/10 dark:border-white/10 pt-6">
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">Total Credits</p>
                  <p className="text-xl md:text-2xl font-bold mt-1">{calculateCredits(selectedSemester.subjects)}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">Enrolled Subjects</p>
                  <p className="text-xl md:text-2xl font-bold mt-1">{selectedSemester.subjects ? selectedSemester.subjects.length : 0}</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-college-navy/5 dark:border-white/5">
                  <p className="text-xs text-college-navy dark:text-college-gold uppercase font-bold tracking-wider">Status</p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{calculateSGPA(selectedSemester.subjects) > 0 ? "Completed" : "In Progress"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Table */}
          {selectedSemester && selectedSemester.subjects && (
            <div className="bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-white/5 border-b border-college-navy/10 dark:border-college-gold/20">
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em]">Course Code</th>
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em]">Course Title</th>
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em] text-center">Cr. Hrs</th>
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em] text-center">Obtained Marks</th>
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em] text-center">Final Grade</th>
                      <th className="p-5 text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em] text-center">Credit Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-college-navy/5 dark:divide-white/10">
                    {selectedSemester.subjects.map((sub, idx) => {
                      const { grade, qp } = getGradeDetails(sub.marks);
                      return (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                          <td className="p-5 text-sm font-bold text-college-navy dark:text-college-gold group-hover:scale-105 transition-transform origin-left">{sub.code}</td>
                          <td className="p-5 text-sm font-serif font-black text-college-navy dark:text-white uppercase tracking-tight">{sub.title}</td>
                          <td className="p-5 text-sm text-college-navy/70 dark:text-white/70 text-center font-bold">{sub.credits}</td>
                          <td className="p-5 text-sm font-black text-college-navy dark:text-white text-center bg-slate-50/50 dark:bg-white/5">{sub.marks}</td>
                          <td className="p-5 text-center">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black shadow-lg bg-college-navy dark:bg-college-gold text-white dark:text-college-navy transform group-hover:rotate-12 transition-transform`}>
                              {grade}
                            </span>
                          </td>
                          <td className="p-5 text-sm font-black text-college-navy dark:text-college-gold text-center">{(qp * sub.credits).toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentResults;
