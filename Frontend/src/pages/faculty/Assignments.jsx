import { Link } from "react-router-dom";
import { useFacultyContext } from "../../context/FacultyContext";
import AssignmentCard from "../../components/faculty/AssignmentCard";

// Mock assignments data by campus
const assignmentsByCampus = {
  main: [
    {
      id: "a1",
      title: "CPU Scheduling Report",
      description:
        "Analyze FCFS vs SJF using your lab data and provide charts.",
      dueDate: "Sept 18, 2025",
      attachment: "#",
      classSection: "BSCS - A",
      subject: "Operating Systems",
      maxMarks: 20,
    },
    {
      id: "a2",
      title: "ER Diagram for Library",
      description: "Submit ERD + relational schema with keys and constraints.",
      dueDate: "Sept 20, 2025",
      attachment: "#",
      classSection: "BSCS - B",
      subject: "Database Systems",
      maxMarks: 25,
    },
    {
      id: "a3",
      title: "Matrix Factorization Set",
      description: "Problem set on eigen decomposition and SVD.",
      dueDate: "Sept 14, 2025",
      attachment: "#",
      classSection: "BSCS - A",
      subject: "Linear Algebra",
      maxMarks: 15,
    },
  ],
  law: [
    {
      id: "a4",
      title: "Constitutional Case Analysis",
      description: "Analyze Supreme Court ruling with precedents.",
      dueDate: "Sept 22, 2025",
      attachment: "#",
      classSection: "LLB - A",
      subject: "Constitutional Law",
      maxMarks: 30,
    },
    {
      id: "a5",
      title: "Criminal Law Essay",
      description: "Essay on mens rea and actus reus principles.",
      dueDate: "Sept 25, 2025",
      attachment: "#",
      classSection: "LLB - A",
      subject: "Criminal Law",
      maxMarks: 20,
    },
  ],
  hala: [
    {
      id: "a6",
      title: "Business Proposal",
      description: "Submit comprehensive business plan and projections.",
      dueDate: "Sept 28, 2025",
      attachment: "#",
      classSection: "BBA - A",
      subject: "Business Management",
      maxMarks: 25,
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Assignments = () => {
  const { getCurrentCampus } = useFacultyContext();
  const campus = getCurrentCampus();
  const assignments = assignmentsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Assignments</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Manage & publish
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <Link
            to="/faculty/assignments/create"
            className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800"
          >
            Create Assignment
          </Link>
        </div>
      </div>

      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No assignments for {campusNames[campus]} yet.
          </p>
          <Link
            to="/faculty/assignments/create"
            className="text-purple-700 font-semibold hover:text-purple-800 mt-2 inline-block"
          >
            Create the first assignment →
          </Link>
        </div>
      )}
    </div>
  );
};

export default Assignments;
