import { Link } from "react-router-dom";
import {
  ClipboardList,
  FolderOpen,
  Megaphone,
  BarChart3,
  PlusCircle,
  Users,
  BookOpen,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { useFacultyContext } from "../../context/FacultyContext";
import { motion } from "framer-motion";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const Dashboard = () => {
  const {
    currentFaculty,
    getClassesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getAttendanceByCurrentCampus,
    getTotalStudents,
    getAverageClassSize,
    getCurrentCampus,
  } = useFacultyContext();

  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus();
  const assignmentStats = getAssignmentStatsByCurrentCampus();
  const attendance = getAttendanceByCurrentCampus();
  const totalStudents = getTotalStudents();
  // const averageClassSize = getAverageClassSize();

  const quickActions = [
    {
      title: "Create Assignment",
      icon: PlusCircle,
      path: "/faculty/assignments/create",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Upload Material",
      icon: FolderOpen,
      path: "/faculty/materials/upload",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "View Submissions",
      icon: ClipboardList,
      path: "/faculty/assignments",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Announcements",
      icon: Megaphone,
      path: "/faculty/announcements",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 text-amber-600",
    },
  ];

  const recentAnnouncements = [
    { title: "Mid-term exam instructions", date: "Sept 12, 2025" },
    { title: "Project milestone feedback posted", date: "Sept 10, 2025" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header Section with Campus Info */}
      <motion.section
        variants={itemVariants}
        className="relative overflow-hidden bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-blue-500 before:via-cyan-500 before:to-blue-600"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <GraduationCap size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Faculty Dashboard</p>
            <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Welcome, {currentFaculty.name}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 font-medium">
                📍 {campusNames[campus]}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/60 border border-gray-200 text-gray-700 font-medium shadow-sm">
                {currentFaculty.department}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-blue-700 font-medium">
                {classes.length} active classes
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-emerald-700 font-medium">
                {currentFaculty.designation}
              </span>
            </div>
            {classes.length > 0 && (
              <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                <BookOpen size={16} className="text-blue-500" />
                Teaching: <span className="text-gray-700 font-medium">{classes.map((cls) => cls.name).join(", ")}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
              <div className="flex items-baseline justify-end gap-2">
                <span className="text-4xl font-bold text-gray-900">{totalStudents}</span>
                <span className="text-sm text-green-600 font-medium">active</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.path}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <div className={`w-14 h-14 rounded-2xl ${action.bgColor} flex items-center justify-center mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {action.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 font-medium">
                <span>Quick Access</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </motion.section>



      {/* Announcements Section - Expanded */}
      <motion.section variants={itemVariants} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
            <p className="text-sm text-gray-500 mt-1">Updates for your students and classes</p>
          </div>
          <Link
            to="/faculty/announcements"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAnnouncements.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-amber-50/50 border border-amber-100/50 rounded-2xl p-5 hover:bg-white hover:border-amber-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-dashed border-gray-300 text-sm font-medium text-gray-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 h-full">
            <PlusCircle size={24} className="opacity-50" />
            <span>Create New Announcement</span>
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
