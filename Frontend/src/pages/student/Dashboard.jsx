import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  FolderOpen,
  Megaphone,
  BarChart3,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useStudentContext } from "../../context/StudentContext";


import { campusNames, studentQuickLinks as quickLinks } from "../../data/studentPortalData";



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




  return (
    <div
      className="space-y-8"
    >
      {/* Header Section with Campus Info */}
      <div>
        <section className="bg-white border border-border rounded-3xl shadow-sm overflow-hidden relative p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide">
                  Student Dashboard
                </span>
                <span className="px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide">
                  {campusNames[campus]}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-primary-900">
                Welcome back, {currentStudent.name.split(" ")[0]}!
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-text-secondary">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border shadow-sm">
                  <span className="text-text-disabled">ID:</span>
                  <span className="text-primary-900">{currentStudent.id}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border shadow-sm">
                  <span className="text-text-disabled">program:</span>
                  <span className="text-primary-900">{currentStudent.department}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border shadow-sm">
                  <span className="text-text-disabled">semester:</span>
                  <span className="text-primary-900">{currentStudent.semester}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-border shadow-sm">
                  <span className="text-text-disabled">credits:</span>
                  <span className="text-primary-900">{totalCredits} hrs</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-primary-50 p-4 rounded-2xl border border-primary-100 shadow-sm">
              <div className="text-right">
                <p className="text-sm font-medium text-text-secondary">Overall CGPA</p>
                <p className="text-3xl font-bold text-primary-700">
                  {currentStudent.cgpa}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.path}
              key={link.title}
              className="group relative overflow-hidden bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${link.bgColor} ${link.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary-900 mb-1 group-hover:text-primary-600 transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-text-secondary font-medium mb-3">{link.description}</p>

              <div className="flex items-center text-sm font-bold text-text-disabled group-hover:text-primary-600 transition-colors">
                <span>Access</span>
                <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Enrolled Courses and Recent Material */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-3xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary-900">
                Enrolled Courses
              </h2>
              <p className="text-sm text-text-secondary">{campusNames[campus]}</p>
            </div>
            <Link
              to="/student/materials"
              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold hover:bg-primary-100 transition-colors"
            >
              View Materials
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.code} className="group flex items-center justify-between p-4 rounded-2xl border border-border hover:shadow-md hover:border-primary-100 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg">
                      {course.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-900 group-hover:text-primary-700 transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-text-secondary bg-gray-100 px-2 py-0.5 rounded-md">{course.code}</span>
                        <span className="text-xs text-text-secondary">• {course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100">
                    {course.credits} Cr
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-2xl">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-primary-300" />
              </div>
              <p className="text-text-secondary font-medium">
                No courses enrolled for this campus
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-border rounded-3xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-primary-900">
                Recent Announcements
              </h2>
              <p className="text-sm text-text-secondary">Stay updated with latest news</p>
            </div>
            <Link
              to="/student/announcements"
              className="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold hover:bg-primary-100 transition-colors"
            >
              See All
            </Link>
          </div>

          {displayAnnouncements && displayAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {displayAnnouncements.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-primary-50 border border-primary-100 p-5 rounded-2xl hover:bg-white hover:shadow-md hover:border-primary-200 transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-text-disabled">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-primary-900 text-sm mb-1 group-hover:text-primary-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary line-clamp-2">
                        {item.description || "Click to visit announcements page."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-2xl">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Megaphone size={24} className="text-primary-300" />
              </div>
              <p className="text-text-secondary font-medium">No announcements yet</p>
            </div>
          )}
        </div>
      </section>
    </div >
  );
};

export default Dashboard;
