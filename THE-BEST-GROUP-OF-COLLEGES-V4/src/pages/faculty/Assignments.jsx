import { useFacultyContext } from "../../context/FacultyContext";
import AssignmentCard from "../../components/shared/AssignmentCard";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import { PlusCircle, Search, Filter, BookOpen } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import Card from "../../components/public_site/Card";


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
  const { getCurrentCampus, isDarkMode } = useFacultyContext();
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
        subtitle="Manage and publish assignments for your classes. Track submissions and grade student work efficiently."
        action={
          <PublicButton
            to="/faculty/assignments/create"
            className=""
            variant="secondary"
            shape="slanted"
          >
            <PlusCircle size={20} />
            Create Assignment
          </PublicButton>
        }
      />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
          <FormInput
            placeholder="Search assignments..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white/50 dark:bg-college-navy/50 focus:bg-white dark:focus:bg-college-navy focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all outline-none dark:text-white"
          />
        </div>
        <Button
          variant="outline"
          className="gap-2 bg-white/50 dark:bg-college-navy/50 border-gray-200 dark:border-college-gold/20 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-college-navy"
        >
          <Filter size={18} />
          Filter
        </Button>
      </div>

      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      ) : (
        <Card hover={false} className="backdrop-blur-sm border-dashed border-gray-300 dark:border-college-gold/30 p-12 text-center">
          <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-college-navy dark:text-college-gold">
            <BookOpen size={30} />
          </div>
          <h3 className="text-lg font-semibold text-college-navy dark:text-white">No assignments found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-sm mx-auto">
            You haven't created any assignments for {campusNames[campus]} yet. Get started by creating your first assignment.
          </p>
          <Button to="/faculty/assignments/create" variant="outline">
            <PlusCircle size={18} />
            Create Assignment
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Assignments;
