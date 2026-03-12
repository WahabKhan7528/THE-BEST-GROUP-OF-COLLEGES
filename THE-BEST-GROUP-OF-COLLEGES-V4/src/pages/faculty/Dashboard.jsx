import { Link } from "react-router-dom";
import {
  Megaphone,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

import { useFacultyContext } from "../../context/FacultyContext";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import PortalStatsCard from "../../components/shared/PortalStatsCard";

import {
  campusNames,
  facultyQuickActions as quickActions,
  recentAnnouncements,
} from "../../data/facultyPortalData";

const Dashboard = () => {
  const {
    currentFaculty,
    getClassesByCurrentCampus,
    getAssignmentStatsByCurrentCampus,
    getAttendanceByCurrentCampus,
    getTotalStudents,
    getCurrentCampus,
    isDarkMode,
  } = useFacultyContext();

  const campus = getCurrentCampus();
  const classes = getClassesByCurrentCampus();
  const assignmentStats = getAssignmentStatsByCurrentCampus();
  const attendance = getAttendanceByCurrentCampus();
  const totalStudents = getTotalStudents();

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      hint: "Active",
    },
    {
      title: "Active Classes",
      value: classes.length,
      hint: "Assigned",
    },
    {
      title: "Average Attendance",
      value: attendance + "%",
      hint: "Current Semester",
    },
    {
      title: "Assignments",
      value: assignmentStats?.total || 12, // fallback for mock
      hint: "Across all classes",
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title={`Welcome, ${currentFaculty.name}`}
        subtitle={`${currentFaculty.designation} • ${currentFaculty.department}`}
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <PortalStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickActions.map((action) => {
          const descriptions = {
            "Create Assignment": "Post new tasks and deadlines for your students.",
            "Upload Material": "Share lecture notes, slides, and reference files.",
            "View Submissions": "Review and grade student work submissions.",
            "Announcements": "Broadcast important updates to all your classes."
          };

          return (
            <Link
              key={action.title}
              to={action.path}
              className="group relative overflow-hidden bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-college-navy dark:hover:bg-white/5 transition-all duration-300 flex"
            >
              {/* Vertical Accent Bar */}
              <div className="w-1.5 bg-college-navy dark:bg-college-gold opacity-10 dark:opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" />

              <div className="p-6 md:p-7 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-college-navy/40 dark:text-college-gold/50 transition-colors group-hover:text-white/50 uppercase">
                      Action Required
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-college-navy dark:text-college-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-300"
                    />
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-college-navy dark:text-white mb-2 leading-tight group-hover:text-white transition-colors">
                    {action.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[90%] group-hover:text-white/70 transition-colors">
                    {descriptions[action.title] || "Access your faculty tools and management options."}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <span className="text-[10px] font-bold text-college-navy/60 dark:text-college-gold/80 tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-white transition-all">
                    PROCEED
                  </span>
                </div>
              </div>

            </Link>
          );
        })}
      </div>

      {/* Announcements Section */}
      <section className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-3xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-college-navy dark:text-white">
              Recent Announcements
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Updates for your students and classes
            </p>
          </div>
          <Link
            to="/faculty/announcements"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-college-navy dark:text-college-gold hover:text-white dark:hover:text-white hover:bg-college-navy dark:hover:bg-white/5 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-college-navy/10 dark:hover:border-college-gold/30"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAnnouncements.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white dark:bg-college-navy border border-gray-100 dark:border-college-gold/20 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-college-navy dark:hover:bg-white/5 transition-all duration-300 flex overflow-hidden"
            >
              {/* Vertical Accent Bar */}
              <div className="w-1 bg-college-navy dark:bg-college-gold opacity-20 dark:opacity-30 group-hover:opacity-100 transition-opacity flex-shrink-0" />

              <div className="p-5 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-wider text-college-navy dark:text-college-gold group-hover:text-white/70 transition-colors uppercase">
                      RECENT
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-college-navy dark:text-college-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-college-navy dark:text-white leading-tight mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold tracking-widest uppercase mt-4 transition-colors group-hover:text-white/50">
                  {item.date}
                </p>
              </div>
            </div>
          ))}

          <button className="group relative flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-college-gold/20 bg-gray-50/50 dark:bg-white/5 text-sm font-bold text-gray-400 dark:text-gray-500 hover:border-college-navy dark:hover:border-college-gold hover:text-white dark:hover:text-college-gold hover:bg-college-navy dark:hover:bg-college-gold/5 transition-all duration-300 min-h-[120px]">
            <span className="text-2xl font-light group-hover:scale-125 transition-transform">+</span>
            <span className="tracking-widest uppercase text-[11px]">New Broadcast</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
