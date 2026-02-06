import { Link } from "react-router-dom";
import {
  ClipboardList,
  FolderOpen,
  Megaphone,
  BarChart3,
  PlusCircle,
  Users,
  BookOpen,
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
  const averageClassSize = getAverageClassSize();

  const quickActions = [
    {
      title: "Create Assignment",
      icon: PlusCircle,
      path: "/faculty/assignments/create",
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Upload Material",
      icon: FolderOpen,
      path: "/faculty/materials/upload",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "View Submissions",
      icon: ClipboardList,
      path: "/faculty/assignments",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Announcements",
      icon: Megaphone,
      path: "/faculty/announcements",
      color: "bg-amber-50 text-amber-700",
    },
  ];

  const recentAnnouncements = [
    { title: "Mid-term exam instructions", date: "Sept 12, 2025" },
    { title: "Project milestone feedback posted", date: "Sept 10, 2025" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section with Campus Info */}
      <section className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Faculty Dashboard</p>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">
            {currentFaculty.name}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-medium">
              📍 {campusNames[campus]}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800">
              {currentFaculty.department}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700">
              {classes.length} classes
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {currentFaculty.designation}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Teaching:{" "}
            {classes.map((cls) => cls.name).join(", ") || "No classes assigned"}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-500">Active students</p>
            <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
          </div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {getAverageClassSize()}
            <span className="text-xs absolute ml-8">avg</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.path}
              className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}
              >
                <Icon size={18} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">Quick access</p>
            </Link>
          );
        })}
      </section>

      {/* Campus-Specific Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Assignments
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {assignmentStats.totalAssignments}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <ClipboardList size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {assignmentStats.reviewed} reviewed
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Pending Reviews
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {assignmentStats.pendingSubmissions}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Awaiting grading</p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {assignmentStats.averageScore}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Class performance</p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Avg Attendance
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {attendance}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">All classes</p>
        </div>
      </section>

      {/* Teaching Load */}
      <section className="lg:col-span-2 bg-white border rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Teaching load at {campusNames[campus]}
          </h2>
          <Link
            to="/faculty/assignments"
            className="text-sm text-purple-700 font-semibold hover:text-purple-800"
          >
            Manage assignments
          </Link>
        </div>
        {classes.length > 0 ? (
          <div className="space-y-3">
            {classes.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex items-center justify-between hover:border-purple-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.code} - Section {item.section} | Semester{" "}
                      {item.semester}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {item.students} students
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No classes assigned for this campus</p>
          </div>
        )}
      </section>

      {/* Announcements */}
      <section className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent announcements
          </h2>
          <Link
            to="/faculty/announcements"
            className="text-sm text-purple-700 font-semibold hover:text-purple-800"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentAnnouncements.map((item) => (
            <div
              key={item.title}
              className="border rounded-xl p-4 flex items-center gap-3 hover:border-amber-200"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Megaphone size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
