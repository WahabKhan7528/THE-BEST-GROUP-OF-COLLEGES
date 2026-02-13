import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";
import { BarChart3, TrendingUp, Award, Calendar, ChevronDown, CheckCircle, BookOpen, ChevronRight } from "lucide-react";

// Grading Logic
const getGradeDetails = (marks) => {
  if (marks >= 85) return { grade: "A", qp: 4.0, color: "text-emerald-600 bg-emerald-50" };
  if (marks >= 80) return { grade: "A-", qp: 3.7, color: "text-emerald-600 bg-emerald-50" };
  if (marks >= 75) return { grade: "B+", qp: 3.3, color: "text-primary-600 bg-primary-50" };
  if (marks >= 70) return { grade: "B", qp: 3.0, color: "text-primary-600 bg-primary-50" };
  if (marks >= 65) return { grade: "B-", qp: 2.7, color: "text-primary-600 bg-primary-50" };
  if (marks >= 61) return { grade: "C+", qp: 2.3, color: "text-orange-600 bg-orange-50" };
  if (marks >= 58) return { grade: "C", qp: 2.0, color: "text-orange-600 bg-orange-50" };
  if (marks >= 55) return { grade: "C-", qp: 1.7, color: "text-orange-600 bg-orange-50" };
  if (marks >= 50) return { grade: "D", qp: 1.0, color: "text-red-600 bg-red-50" };
  return { grade: "F", qp: 0.0, color: "text-red-600 bg-red-50" };
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

const StudentResults = () => {
  const { getDetailedResultsByCurrentCampus } = useStudentContext();
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
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 bg-white p-5 md:p-6 rounded-xl md:rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Academic Results</h1>
          <p className="text-gray-500 text-xs md:text-sm">Track your GPA and academic performance</p>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-primary-50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-primary-100 flex flex-col items-end">
            <span className="text-[10px] md:text-xs text-primary-600 font-semibold uppercase tracking-wider">CGPA</span>
            <span className="text-xl md:text-2xl font-bold text-primary-700 leading-none">{currentCGPA}</span>
          </div>

          <div className="relative">
            <select
              value={selectedSemesterId}
              onChange={(e) => setSelectedSemesterId(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 md:py-3 pl-3 md:pl-4 pr-8 md:pr-10 text-sm md:text-base rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium cursor-pointer min-w-[120px] md:min-w-[150px]"
            >
              <option value="all">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem.id} value={sem.id}>{sem.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content */}
      {selectedSemesterId === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesters.map(sem => {
            const sgpa = calculateSGPA(sem.subjects);
            const credits = calculateCredits(sem.subjects);
            const isCompleted = sem.subjects && sem.subjects.some(s => s.marks > 0);

            return (
              <div key={sem.id}
                onClick={() => setSelectedSemesterId(sem.id.toString())}
                className="group relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 group-hover:bg-primary-50/50"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold ${isCompleted ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                      {sem.id}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider">SGPA</span>
                      <p className={`text-2xl md:text-3xl font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{sgpa}</p>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{sem.name}</h3>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                      <Award size={12} className="md:w-[14px] md:h-[14px]" />
                      {sem.subjects ? sem.subjects.length : 0} Subjects
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                      <TrendingUp size={12} className="md:w-[14px] md:h-[14px]" />
                      {credits} Cr.
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                    <span className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md ${isCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                    <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-primary-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Results <ChevronRight size={14} className="md:w-4 md:h-4" />
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
            <div className="bg-primary-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 size={120} />
              </div>
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold">{selectedSemester.name}</h2>
                  <p className="text-primary-100/80 text-sm mt-1">Academic Performance Summary</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary-200 uppercase font-bold tracking-wider">Semester GPA</p>
                  <p className="text-5xl font-extrabold tracking-tight mt-1">{calculateSGPA(selectedSemester.subjects)}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs text-primary-200 uppercase font-bold tracking-wider">Total Credits</p>
                  <p className="text-xl font-bold mt-1">{calculateCredits(selectedSemester.subjects)}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-200 uppercase font-bold tracking-wider">Enrolled Subjects</p>
                  <p className="text-xl font-bold mt-1">{selectedSemester.subjects ? selectedSemester.subjects.length : 0}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-200 uppercase font-bold tracking-wider">Semester Status</p>
                  <p className="text-xl font-bold text-emerald-300 mt-1">{calculateSGPA(selectedSemester.subjects) > 0 ? "Completed" : "In Progress"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Table */}
          {selectedSemester && selectedSemester.subjects && (
            <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Cr. Hrs</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Marks</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Grade</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedSemester.subjects.map((sub, idx) => {
                      const { grade, qp, color } = getGradeDetails(sub.marks);
                      return (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-sm font-medium text-gray-900">{sub.code}</td>
                          <td className="p-4 text-sm text-gray-600">{sub.title}</td>
                          <td className="p-4 text-sm text-gray-600 text-center">{sub.credits}</td>
                          <td className="p-4 text-sm font-medium text-gray-900 text-center">{sub.marks}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${color}`}>
                              {grade}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-medium text-gray-900 text-center">{(qp * sub.credits).toFixed(1)}</td>
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
