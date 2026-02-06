import { useStudentContext } from "../../context/StudentContext";
import ResultTable from "../../components/student/ResultTable";

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
  const results = resultsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Results</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Marks & grades
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800">
            Download Transcript
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <ResultTable results={results} showTranscript={false} />
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No results available for {campusNames[campus]} yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;
