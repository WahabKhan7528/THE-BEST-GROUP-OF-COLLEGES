import { Link } from "react-router-dom";
import {
  ClipboardList,
  FolderOpen,
  Megaphone,
  BarChart3,
  CalendarCheck,
  BookOpen,
  FileText,
  Users,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useStudentContext } from "../../context/StudentContext";
import { motion } from "framer-motion";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const {
    currentStudent,
    getCoursesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getResultsByCurrentCampus,
    getAttendanceByCurrentCampus,
    getTotalCredits,
    getCurrentCampus,
  } = useStudentContext();

  const campus = getCurrentCampus();
  const courses = getCoursesByCurrentCampus();
  const assignmentStats = getAssignmentStatsByCurrentCampus();
  const announcements = getAnnouncementsByCurrentCampus();
  const results = getResultsByCurrentCampus();
  const attendance = getAttendanceByCurrentCampus();
  const totalCredits = getTotalCredits();

  const quickLinks = [
    {
      title: "Assignments",
      description: "View and submit coursework",
      path: "/student/assignments",
      icon: ClipboardList,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Materials",
      description: "Slides, notes, and videos",
      path: "/student/materials",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "News & Events",
      description: "Campus updates and alerts",
      path: "/student/news",
      icon: Megaphone,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Results",
      description: "Marks and transcripts",
      path: "/student/results",
      icon: BarChart3,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-200",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section with Campus Info */}
      <motion.section variants={itemVariants} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl overflow-hidden relative p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
                Student Dashboard
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide">
                📍 {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentStudent.name.split(" ")[0]}! 👋
            </h1>
            <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-gray-100">
                <span className="text-gray-400">ID:</span>
                <span className="text-gray-900">{currentStudent.id}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-gray-100">
                <span className="text-gray-400">program:</span>
                <span className="text-gray-900">{currentStudent.department}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-gray-100">
                <span className="text-gray-400">semester:</span>
                <span className="text-gray-900">{currentStudent.semester}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-gray-100">
                <span className="text-gray-400">credits:</span>
                <span className="text-gray-900">{totalCredits} hrs</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/50 p-4 rounded-2xl border border-white/50 shadow-sm">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Overall CGPA</p>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                {currentStudent.cgpa}
              </p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Attendance</p>
              <div className="flex items-center gap-2 justify-end">
                <p className="text-2xl font-bold text-gray-900">{attendance}</p>
                <TrendingUp size={18} className="text-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.path}
              key={link.title}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

              <div className={`w-14 h-14 rounded-2xl ${link.bgColor} ${link.color} flex items-center justify-center mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-3">{link.description}</p>

              <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-purple-600 transition-colors">
                <span>Access</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </motion.section>

      {/* Campus-Specific Stats */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl bg-purple-100 text-purple-600`}>
              <CalendarCheck size={20} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-gray-500">This Week</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{assignmentStats.upcoming}</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Upcoming Assignments</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl bg-blue-100 text-blue-600`}>
              <ClipboardList size={20} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">{assignmentStats.graded} Graded</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{assignmentStats.submitted}</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Submitted Tasks</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl bg-amber-100 text-amber-600`}>
              <Megaphone size={20} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-gray-500">{announcements.total} Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{announcements.unread}</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Unread Announcements</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 rounded-xl bg-emerald-100 text-emerald-600`}>
              <BarChart3 size={20} />
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-gray-500">{results.averageGrade} Avg</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{results.gpa}</p>
          <p className="text-sm text-gray-500 font-medium mt-1">Current GPA</p>
        </div>
      </motion.section>

      {/* Enrolled Courses and Recent Material */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Enrolled Courses
              </h2>
              <p className="text-sm text-gray-500">{campusNames[campus]}</p>
            </div>
            <Link
              to="/student/materials"
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-semibold hover:bg-purple-100 transition-colors"
            >
              View Materials
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white hover:shadow-md hover:border-purple-100 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
                      {course.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{course.code}</span>
                        <span className="text-xs text-gray-500">• {course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                    {course.credits} Cr
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">
                No courses enrolled for this campus
              </p>
            </div>
          )}
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-lg p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Announcements
              </h2>
              <p className="text-sm text-gray-500">Stay updated with latest news</p>
            </div>
            <Link
              to="/student/news"
              className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
            >
              See All
            </Link>
          </div>

          {announcements.recent && announcements.recent.length > 0 ? (
            <div className="space-y-4">
              {announcements.recent.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-white/50 border border-white/60 p-5 rounded-2xl hover:bg-white hover:shadow-md hover:border-amber-100 transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-400">{item.date}</span>
                        {item.isNew && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        Click to read more details about this announcement...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Megaphone size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No announcements yet</p>
            </div>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;
