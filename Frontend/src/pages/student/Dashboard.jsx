import { useState, useEffect } from "react";
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
    getAnnouncementsByCurrentCampus,
    getTotalCredits,
    getCurrentCampus,
  } = useStudentContext();

  const campus = getCurrentCampus();
  const courses = getCoursesByCurrentCampus();
  const announcements = getAnnouncementsByCurrentCampus();
  const totalCredits = getTotalCredits();

  // Fetch real announcements from localStorage
  const [realAnnouncements, setRealAnnouncements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("college_announcements");
    if (saved) {
      const parsed = JSON.parse(saved);
      const campusAnnouncements = parsed[campus] || [];
      const courseCodes = courses.map(c => c.code);

      const relevant = campusAnnouncements.filter(a => {
        if (!a.classSection) return false;
        return courseCodes.some(code => a.classSection.includes(code));
      });
      setRealAnnouncements(relevant);
    }
  }, [campus, courses]);

  const displayAnnouncements = realAnnouncements.length > 0 ? realAnnouncements : announcements.recent;


  const quickLinks = [
    {
      title: "Assignments",
      description: "View and submit coursework",
      path: "/student/assignments",
      icon: ClipboardList,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-cyan-500",
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
      title: "Announcements",
      description: "Class updates and alerts",
      path: "/student/announcements",
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-100/50 to-blue-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold uppercase tracking-wide">
                Student Dashboard
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
                {campusNames[campus]}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentStudent.name.split(" ")[0]}!
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
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                {currentStudent.cgpa}
              </p>
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
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-3">{link.description}</p>

              <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                <span>Access</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
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
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors"
            >
              View Materials
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white/50 border border-white/60 p-4 rounded-2xl hover:bg-white hover:shadow-md hover:border-blue-100 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                      {course.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{course.code}</span>
                        <span className="text-xs text-gray-500">• {course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-100">
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
              to="/student/announcements"
              className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
            >
              See All
            </Link>
          </div>

          {displayAnnouncements && displayAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {displayAnnouncements.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white/50 border border-white/60 p-5 rounded-2xl hover:bg-white hover:shadow-md hover:border-amber-100 transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-400">{item.date}</span>
                        {/* {item.isNew && <span className="w-2 h-2 rounded-full bg-rose-500"></span>} */}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-amber-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.description || "Click to visit announcements page."}
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
