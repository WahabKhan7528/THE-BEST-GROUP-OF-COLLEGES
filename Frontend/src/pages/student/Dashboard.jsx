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
} from "lucide-react";
import { useStudentContext } from "../../context/StudentContext";

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
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
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Materials",
      description: "Slides, notes, and videos",
      path: "/student/materials",
      icon: FolderOpen,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "News & Events",
      description: "Campus updates and alerts",
      path: "/student/news",
      icon: Megaphone,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Results",
      description: "Marks and transcripts",
      path: "/student/results",
      icon: BarChart3,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section with Campus Info */}
      <section className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Student Dashboard</p>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">
            {currentStudent.name}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800">
              ID: {currentStudent.id}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-medium">
              📍 {campusNames[campus]}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700">
              {currentStudent.department}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
              {currentStudent.semester}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Total Credits: <strong>{totalCredits} credit hours</strong>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Overall CGPA</p>
            <p className="text-2xl font-bold text-gray-900">
              {currentStudent.cgpa}
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {attendance}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.path}
              key={link.title}
              className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center`}
              >
                <Icon size={18} />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {link.title}
              </h3>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          );
        })}
      </section>

      {/* Campus-Specific Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Upcoming Assignments
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {assignmentStats.upcoming}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <CalendarCheck size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">This week</p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Submitted</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {assignmentStats.submitted}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ClipboardList size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {assignmentStats.graded} graded
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Unread Announcements
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {announcements.unread}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Megaphone size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {announcements.total} total
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">GPA</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {results.gpa}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {results.averageGrade} avg
          </p>
        </div>
      </section>

      {/* Enrolled Courses and Recent Material */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Courses at {campusNames[campus]}
            </h2>
            <Link
              to="/student/materials"
              className="text-sm text-purple-700 font-semibold hover:text-purple-800"
            >
              Browse
            </Link>
          </div>
          {courses.length > 0 ? (
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-xl p-4 flex items-center justify-between hover:border-blue-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.code} - {course.instructor}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    {course.credits}cr
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No courses enrolled for this campus
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent announcements
            </h2>
            <Link
              to="/student/news"
              className="text-sm text-purple-700 font-semibold hover:text-purple-800"
            >
              See all
            </Link>
          </div>
          {announcements.recent && announcements.recent.length > 0 ? (
            <div className="space-y-3">
              {announcements.recent.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 flex items-center gap-3 hover:border-amber-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <FileText size={16} />
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
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No announcements yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Academic Performance */}
      <section className="bg-white border rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Academic Performance
          </h2>
          <Link
            to="/student/results"
            className="text-sm text-purple-700 font-semibold hover:text-purple-800"
          >
            View detailed results
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BarChart3 size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Passed Courses</p>
              <p className="text-lg font-semibold text-gray-900">
                {results.passed}/{results.total}
              </p>
            </div>
          </div>
          <div className="border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Grade</p>
              <p className="text-lg font-semibold text-gray-900">
                {results.averageGrade}
              </p>
            </div>
          </div>
          <div className="border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Attendance</p>
              <p className="text-lg font-semibold text-gray-900">
                {attendance}
              </p>
            </div>
          </div>
          <div className="border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <ClipboardList size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current GPA</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentStudent.cgpa}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
