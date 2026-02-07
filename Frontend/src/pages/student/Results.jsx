import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";
import ResultTable from "../../components/student/ResultTable";
import { BarChart3, Trophy } from "lucide-react";

// Mock results data by campus
const resultsByCampus = {
  main: [
    {
      course: "Operating Systems",
      semester: "5",
      marks: "88 / 100",
      grade: "A",
      credits: 3,
    },
    {
      course: "Database Systems",
      semester: "5",
      marks: "84 / 100",
      grade: "A-",
      credits: 3,
    },
    {
      course: "Linear Algebra",
      semester: "5",
      marks: "79 / 100",
      grade: "B+",
      credits: 3,
    },
    {
      course: "Software Engineering",
      semester: "5",
      marks: "92 / 100",
      grade: "A",
      credits: 3,
    },
    {
      course: "Discrete Mathematics",
      semester: "5",
      marks: "81 / 100",
      grade: "B+",
      credits: 2,
    },
  ],
  law: [
    {
      course: "Constitutional Law",
      semester: "3",
      marks: "87 / 100",
      grade: "A",
      credits: 3,
    },
    {
      course: "Criminal Law",
      semester: "3",
      marks: "85 / 100",
      grade: "A",
      credits: 3,
    },
    {
      course: "Property Law",
      semester: "3",
      marks: "80 / 100",
      grade: "B+",
      credits: 3,
    },
  ],
  hala: [
    {
      course: "Business Management",
      semester: "1",
      marks: "86 / 100",
      grade: "A",
      credits: 3,
    },
    {
      course: "Accounting Basics",
      semester: "1",
      marks: "82 / 100",
      grade: "B+",
      credits: 3,
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Results = () => {
  const { getCurrentCampus } = useStudentContext();
  const campus = getCurrentCampus();
  const allResults = resultsByCampus[campus] || [];

  // Get unique semesters
  const semesters = [...new Set(allResults.map(r => r.semester))].sort();
  const [selectedSemester, setSelectedSemester] = useState(semesters[0] || "All");

  const filteredResults = selectedSemester === "All"
    ? allResults
    : allResults.filter(r => r.semester === selectedSemester);

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Trophy size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
                Student Portal
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide">
                {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Academic Results
            </h1>
            <p className="text-gray-500 mt-2 max-w-xl">
              View your grades, marks, and academic performance.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md p-2 rounded-xl border border-white/40 shadow-sm">
            <span className="text-sm font-medium text-gray-700 pl-2">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-transparent border-none text-gray-900 font-semibold focus:ring-0 cursor-pointer min-w-[100px]"
            >
              <option value="All">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-lg overflow-hidden">
          <ResultTable results={filteredResults} showTranscript={false} />
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 size={30} className="text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No results found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            No academic results are currently available for {selectedSemester === "All" ? "any semester" : `Semester ${selectedSemester}`}.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
