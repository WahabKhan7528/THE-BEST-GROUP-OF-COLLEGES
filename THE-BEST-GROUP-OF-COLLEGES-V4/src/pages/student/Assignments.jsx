import { useStudentContext } from "../../context/StudentContext";
import AssignmentCard from "../../components/shared/AssignmentCard";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import { CheckCircle, Clock } from "lucide-react";


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
  const { getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const assignments = assignmentsByCampus[campus] || [];

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Assignments"
        subtitle="Manage your coursework, track deadlines, and submit your assignments on time."
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl md:text-3xl font-bold text-college-navy text-under dark:text-college-gold">" {assignments.filter(a => a.status === 'Pending').length} "</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium"> Pending Tasks</p>
            </div>
          </div>
        }
      />

      {assignments.length > 0 ? (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.title}>
              <AssignmentCard assignment={assignment} role="student" />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-college-navy/40 backdrop-blur-sm border border-dashed border-gray-300 dark:border-college-gold/30 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm mx-auto">
            No pending assignments for {campusNames[campus]} at this time.
          </p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
