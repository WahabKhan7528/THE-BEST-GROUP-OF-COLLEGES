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
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 text-purple-600",
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
        className="relative overflow-hidden bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-purple-500 before:via-indigo-500 before:to-pink-500"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <GraduationCap size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Faculty Dashboard</p>
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
              <span className="px-3 py-1.5 rounded-full bg-purple-50/80 border border-purple-100 text-purple-700 font-medium">
                {classes.length} active classes
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-100 text-emerald-700 font-medium">
                {currentFaculty.designation}
              </span>
            </div>
            {classes.length > 0 && (
              <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                <BookOpen size={16} className="text-purple-500" />
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex flex-col items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-2xl font-bold">{getAverageClassSize()}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">Avg Size</span>
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
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
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

      {/* Stats Grid */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          {
            label: "Total Assignments",
            value: assignmentStats.totalAssignments,
            sublabel: `${assignmentStats.reviewed} reviewed`,
            icon: ClipboardList,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Pending Reviews",
            value: assignmentStats.pendingSubmissions,
            sublabel: "Awaiting grading",
            icon: BarChart3,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Class Average",
            value: assignmentStats.averageScore,
            sublabel: "Across all classes",
            icon: BarChart3,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Avg Attendance",
            value: attendance,
            sublabel: "All classes",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-xs font-medium text-gray-500">{stat.sublabel}</p>
          </div>
        ))}
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teaching Load */}
        <motion.section variants={itemVariants} className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Teaching Load</h2>
              <p className="text-sm text-gray-500 mt-1">{campusNames[campus]}</p>
            </div>
            <Link
              to="/faculty/assignments"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-xl transition-all"
            >
              Manage Assignments
            </Link>
          </div>

          {classes.length > 0 ? (
            <div className="grid gap-4">
              {classes.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {item.code}
                        </span>
                        <span className="text-xs text-gray-500">
                          Sem {item.semester} • Section {item.section}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-bold text-gray-900">{item.students}</span>
                    <span className="text-xs font-medium text-gray-500">Students</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-900 font-medium">No classes assigned</p>
              <p className="text-gray-500 text-sm mt-1">You don't have any classes for this campus yet.</p>
            </div>
          )}
        </motion.section>

        {/* Announcements */}
        <motion.section variants={itemVariants} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Announcements</h2>
            <Link
              to="/faculty/announcements"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentAnnouncements.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-amber-50/50 border border-amber-100/50 rounded-2xl p-4 hover:bg-white hover:border-amber-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Megaphone size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">{item.date}</p>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full py-3 rounded-xl border border-dashed border-gray-300 text-sm font-medium text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300">
              + New Announcement
            </button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Dashboard;
