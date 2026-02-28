import { Link } from "react-router-dom";
import {
  Users,
  Layers,
  BookOpen,
  GraduationCap,
  Image,
  Newspaper,
  Book,
} from "lucide-react";

import { useAdminContext } from "../../context/AdminContext";
import AdminStatsCard from "../../components/admin/AdminStatsCard";

import {
  adminDashboardStats as mockAllStats,
  adminQuickActions as quickActions,
} from "../../data/adminData";

const Dashboard = () => {
  const { selectedCampusFilter, getCurrentCampusContext, isSuperAdmin } =
    useAdminContext();

  const currentCampus = getCurrentCampusContext();
  const campusKey = currentCampus ? currentCampus.id : "all";
  const campusLabel = currentCampus ? currentCampus.name : "All Campuses";

  const currentStats = mockAllStats[campusKey] || mockAllStats.all;

  const stats = [
    {
      title: "Total Users",
      value: currentStats.users.value,
      hint: currentStats.users.hint,
      icon: Users,
      tone: "primary",
    },
    {
      title: "Active Classes",
      value: currentStats.classes.value,
      hint: currentStats.classes.hint,
      icon: GraduationCap,
      tone: "primary",
    },
    {
      title: "Active Subjects",
      value: currentStats.subjects.value,
      hint: currentStats.subjects.hint,
      icon: Book,
      tone: "primary",
    },
    {
      title: "Active Courses",
      value: currentStats.courses.value,
      hint: currentStats.courses.hint,
      icon: Layers,
      tone: "primary",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">
            System Dashboard
          </h1>
          <p className="text-text-secondary text-sm md:text-base mt-1">
            Real-time overview of your educational ecosystem
          </p>
        </div>

        {/* Context Badge */}
        <div className="flex items-center gap-3">
          {(!isSuperAdmin || selectedCampusFilter !== "all") && (
            <div className="px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold shadow-sm flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
              </span>
              {isSuperAdmin ? campusLabel : "Allocated Campuses"}
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <AdminStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-primary-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 group relative overflow-hidden"
            >
              <div
                className={`p-4 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                <action.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-2">
                  {action.desc}
                </p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
