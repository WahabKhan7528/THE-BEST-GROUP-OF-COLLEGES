import { Link } from "react-router-dom";
import {
  ClipboardList,
  FolderOpen,
  Megaphone,
  PlusCircle,
  BookOpen,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { useFacultyContext } from "../../context/FacultyContext";


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
      bgColor: "bg-primary-50 text-primary-600",
    },
    {
      title: "Upload Material",
      icon: FolderOpen,
      path: "/faculty/materials/upload",
      bgColor: "bg-primary-50 text-primary-600",
    },
    {
      title: "View Submissions",
      icon: ClipboardList,
      path: "/faculty/assignments",
      bgColor: "bg-primary-50 text-primary-600",
    },
    {
      title: "Announcements",
      icon: Megaphone,
      path: "/faculty/announcements",
      bgColor: "bg-primary-50 text-primary-600",
    },
  ];

  const recentAnnouncements = [
    { title: "Mid-term exam instructions", date: "Sept 12, 2025" },
    { title: "Project milestone feedback posted", date: "Sept 10, 2025" },
  ];



  return (
    <div
      className="space-y-8"
    >
      {/* Header Section with Campus Info */}
      <section
        className="relative overflow-hidden bg-white border border-border rounded-3xl shadow-sm p-6 md:p-8"
      >
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
          <GraduationCap size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase">Faculty Dashboard</p>
            <h1 className="text-2xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">
              Welcome, {currentFaculty.name}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium">
                📍 {campusNames[campus]}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white border border-border text-text-secondary font-medium shadow-sm">
                {currentFaculty.department}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium">
                {classes.length} active classes
              </span>
              <span className="px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 font-medium">
                {currentFaculty.designation}
              </span>
            </div>
            {classes.length > 0 && (
              <p className="text-sm text-text-secondary mt-4 flex items-center gap-2">
                <BookOpen size={16} className="text-primary-500" />
                Teaching: <span className="text-primary-900 font-medium">{classes.map((cls) => cls.name).join(", ")}</span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-8 w-full md:w-auto">
            <div className="text-left md:text-right w-full md:w-auto">
              <p className="text-sm font-medium text-text-secondary mb-1">Total Students</p>
              <div className="flex items-baseline justify-start md:justify-end gap-2">
                <span className="text-3xl md:text-4xl font-bold text-primary-900">{totalStudents}</span>
                <span className="text-sm text-green-600 font-medium">active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.path}
              className="group relative overflow-hidden bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-1 group-hover:text-primary-600 transition-colors">
                {action.title}
              </h3>
              <div className="flex items-center text-sm text-text-secondary font-medium">
                <span>Quick Access</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </section>

      {/* Announcements Section - Expanded */}
      <section className="bg-white border border-border rounded-3xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-primary-900">Recent Announcements</h2>
            <p className="text-sm text-text-secondary mt-1">Updates for your students and classes</p>
          </div>
          <Link
            to="/faculty/announcements"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-primary-100"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAnnouncements.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-primary-50/50 border border-primary-100/50 rounded-2xl p-5 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-900 leading-tight mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-dashed border-border text-sm font-medium text-text-secondary hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 min-h-[100px]">
            <PlusCircle size={24} className="opacity-50" />
            <span>Create New Announcement</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
