import { useStudentContext } from "../../context/StudentContext";
import AssignmentCard from "../../components/student/AssignmentCard";

// Mock assignments data by campus
const assignmentsByCampus = {
  main: [
    {
      title: "Operating Systems Lab Report",
      subject: "CS-312",
      description:
        "Analyze CPU scheduling strategies with your lab data and submit a 3-page reflection.",
      dueDate: "Sept 15, 2025",
      attachment: "#",
      status: "Pending",
    },
    {
      title: "Database Design Project",
      subject: "CS-215",
      description:
        "Submit ER diagram, relational schema, and sample queries for the bookstore system.",
      dueDate: "Sept 18, 2025",
      attachment: "#",
      status: "Submitted",
    },
    {
      title: "Linear Algebra Problem Set 5",
      subject: "MTH-205",
      description:
        "Complete questions 1-10 focusing on eigenvalues and diagonalization.",
      dueDate: "Sept 10, 2025",
      attachment: "#",
      status: "Late",
    },
  ],
  law: [
    {
      title: "Constitutional Case Brief",
      subject: "LAW-201",
      description:
        "Brief two landmark constitutional cases with detailed analysis.",
      dueDate: "Sept 20, 2025",
      attachment: "#",
      status: "Pending",
    },
    {
      title: "Criminal Law Essay",
      subject: "LAW-302",
      description:
        "Essay on mens rea and actus reus requirements in criminal law.",
      dueDate: "Sept 25, 2025",
      attachment: "#",
      status: "Pending",
    },
  ],
  hala: [
    {
      title: "Business Plan Submission",
      subject: "BBA-101",
      description:
        "Submit your comprehensive business plan with financial projections.",
      dueDate: "Sept 22, 2025",
      attachment: "#",
      status: "Pending",
    },
  ],
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Assignments = () => {
  const { getCurrentCampus } = useStudentContext();
  const campus = getCurrentCampus();
  const assignments = assignmentsByCampus[campus] || [];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Assignments</p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Submit coursework
            </h1>
            <p className="text-sm text-blue-600 mt-2">
              📍 {campusNames[campus]}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {assignments.length} total
            </span>
          </div>
        </div>
      </div>

      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.title} assignment={assignment} />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600 text-lg">
            No assignments for {campusNames[campus]} at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
