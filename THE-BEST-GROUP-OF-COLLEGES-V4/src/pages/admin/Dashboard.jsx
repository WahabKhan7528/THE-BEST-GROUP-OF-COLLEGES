import { Link } from "react-router-dom";
import {
  Users,
  Layers,
  BookOpen,
  GraduationCap,
  Image,
  Newspaper,
  Book,
  ArrowRight,
} from "lucide-react";

import { useAdminContext } from "../../context/AdminContext";
import PortalStatsCard from "../../components/shared/PortalStatsCard";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import Card from "../../components/public_site/Card";

import {
  mockAllStats,
  adminQuickActions as quickActions,
  systemMetadata,
} from "../../data/adminData";

const Dashboard = () => {
  const { selectedCampusFilter, getCurrentCampusContext, isSuperAdmin, isDarkMode } =
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
      <PortalPageHeader
        badge={
          (!isSuperAdmin || selectedCampusFilter !== "all") ? (
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              {isSuperAdmin ? campusLabel : "Allocated Campuses"}
            </Badge>
          ) : null
        }
        title="Admin Control Center"
        subtitle="Unified institutional management and system monitoring"
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <PortalStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-serif font-bold text-college-navy dark:text-white">Quick Actions</h2>
          <div className="h-0.5 flex-1 bg-college-navy/10 dark:bg-college-gold/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {quickActions.map((action) => (
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
                    {action.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <span className="text-[10px] font-bold text-college-navy/60 dark:text-college-gold/80 tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-white transition-all">
                    PROCEED
                  </span>
                </div>
              </div>


            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
