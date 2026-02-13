import { Link } from "react-router-dom";
import { useFacultyContext } from "../../context/FacultyContext";
import AssignmentCard from "../../components/faculty/AssignmentCard";
import { PlusCircle, Search, Filter, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen size={150} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              <span className="px-2 md:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                Faculty Portal
              </span>
              <span className="px-2 md:px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Assignments
            </h1>
            <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl">
              Manage and publish assignments for your classes. Track submissions and grade student work efficiently.
            </p>
          </div>
          <Link
            to="/faculty/assignments/create"
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <PlusCircle size={20} />
            Create Assignment
          </Link>
        </div>
      </div>

      {/* Filters and Search - Placeholder for future functionality */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-white transition-colors">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {assignments.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AssignmentCard assignment={assignment} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={30} className="text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No assignments found</h3>
          <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
            You haven't created any assignments for {campusNames[campus]} yet. Get started by creating your first assignment.
          </p>
          <Link
            to="/faculty/assignments/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <PlusCircle size={18} />
            Create Assignment
          </Link>
        </div>
      )}
    </div>
  );
};

export default Assignments;
