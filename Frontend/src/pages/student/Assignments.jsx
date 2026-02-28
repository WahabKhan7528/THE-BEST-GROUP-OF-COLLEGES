import { useStudentContext } from "../../context/StudentContext";
import AssignmentCard from "../../components/shared/AssignmentCard";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";


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
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ClipboardList size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              <span className="px-2 md:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                Student Portal
              </span>
              <span className="px-2 md:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Assignments
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl">
              Manage your coursework, track deadlines, and submit your assignments on time.
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Clock size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{assignments.filter(a => a.status === 'Pending').length}</p>
              <p className="text-xs md:text-sm text-gray-500 font-medium">Pending Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {assignments.length > 0 ? (
        <div
          className="space-y-4"
        >
          {assignments.map((assignment, index) => (
            <div
              key={assignment.title}
            >
              <AssignmentCard assignment={assignment} role="student" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={30} className="text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">All caught up!</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            No pending assignments for {campusNames[campus]} at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
