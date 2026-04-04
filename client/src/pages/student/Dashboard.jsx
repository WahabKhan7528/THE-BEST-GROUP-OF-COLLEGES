import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useStudentContext } from "../../store/hooks/useStudentReduxContext";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import PortalStatsCard from "../../components/portal-shared/PortalStatsCard";
import SkeletonLoading from "../../components/shared/SkeletonLoading";

const quickLinks = [
  { title: "Assignments", description: "View and submit coursework", path: "/student/assignments" },
  { title: "Submissions", description: "Track grades and feedback", path: "/student/submissions" },
  { title: "Materials", description: "Slides, notes, and videos", path: "/student/materials" },
  { title: "Announcements", description: "Class updates and alerts", path: "/student/announcements" },
  { title: "Results", description: "Marks and transcripts", path: "/student/results" },
];

const Dashboard = () => {
  const {
    currentStudent,
    getSubjectsByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getTotalCredits,
    getCurrentCgpa,
    getCurrentCampus,
    getCurrentAcademicProfile,
    isDarkMode,
    loading,
  } = useStudentContext();

  const campus = getCurrentCampus();
  const subjects = getSubjectsByCurrentCampus();
  const academicProfile = getCurrentAcademicProfile();
  const announcements = getAnnouncementsByCurrentCampus();
  const totalCredits = getTotalCredits();
  const displayAnnouncements = announcements.recent || [];
  const cgpaValue = getCurrentCgpa();
  const displayCgpa = cgpaValue === null || cgpaValue === undefined
    ? "-"
    : Number(cgpaValue).toFixed(2);

  const stats = [
    {
      title: "Current Course",
      value: academicProfile?.courseLabel || currentStudent?.department || "-",
      hint: academicProfile?.semesterLabel || `Semester ${currentStudent?.semester || "-"}`,
    },
    {
      title: "Enrolled Subjects",
      value: subjects.length,
      hint: academicProfile?.termLabel || "Current Term",
    },
    {
      title: "Overall CGPA",
      value: displayCgpa,
      hint: "Cumulative",
    },
    {
      title: "Total Credits",
      value: totalCredits,
      hint: "Completed",
    }
  ];
  if (loading) {
    return (
      <div className="space-y-8 pb-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <SkeletonLoading variant="textLine" className="w-20 h-5" />
          <SkeletonLoading variant="textLine" className="w-1/2 h-10" />
          <SkeletonLoading variant="textLine" className="w-1/3 h-4" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoading key={i} variant="panel" className="h-32" />
          ))}
        </div>

        {/* Quick Links Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoading key={i} variant="panel" className="h-32" />
          ))}
        </div>

        {/* Main Sections Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-2">
                  <SkeletonLoading variant="textLine" className="w-32 h-6" />
                  <SkeletonLoading variant="textLine" className="w-24 h-4" />
                </div>
                <SkeletonLoading variant="textLine" className="w-16 h-8" />
              </div>
              {[1, 2, 3].map((j) => (
                <SkeletonLoading key={j} variant="panel" className="h-20" />
              ))}
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campus?.toUpperCase() || "CAMPUS"}
          </Badge>
        }
        title={`Welcome back, ${(currentStudent?.name || "Student").split(" ")[0]}!`}
        subtitle={`ID: ${currentStudent?.portalId || "-"} • Student Dashboard`}
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <PortalStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link) => {
          return (
            <Link
              to={link.path}
              key={link.title}
              className="group relative overflow-hidden bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-college-navy dark:hover:bg-white/5 transition-all duration-300 flex"
            >
              {/* Vertical Accent Bar */}
              <div className="w-1.5 bg-college-navy dark:bg-college-gold opacity-10 dark:opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" />

              <div className="p-6 md:p-7 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-college-navy/40 dark:text-college-gold/50 transition-colors group-hover:text-white/50 uppercase">
                      Quick Access
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-college-navy dark:text-college-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white transition-all duration-300"
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-college-navy dark:text-white mb-1 group-hover:text-white dark:group-hover:text-college-gold transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium group-hover:text-white/70 transition-colors line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                  <span className="text-[10px] font-bold text-college-navy/60 dark:text-college-gold/80 tracking-widest opacity-0 group-hover:opacity-100 group-hover:text-white transition-all">
                    ACCESS
                  </span>
                </div>
              </div>

              
            </Link>
          );
        })}
      </div>

      {/* Enrolled Courses and Recent Material */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm shadow-sm p-6 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-serif font-bold text-college-navy dark:text-white">
                Enrolled Subjects
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {academicProfile?.courseLabel || campus?.toUpperCase() || "CAMPUS"}
              </p>
            </div>
            <Link
              to="/student/materials"
              className="px-4 py-2 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-sm text-[10px] font-bold tracking-widest hover:bg-college-navy dark:hover:bg-college-gold hover:text-white dark:hover:text-college-navy transition-all duration-300"
            >
              VIEW ALL
            </Link>
          </div>

          {subjects.length > 0 ? (
            <div className="space-y-3">
              {subjects.map((subject) => (
                <div
                  key={subject.code}
                  className="group relative overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-college-gold/10 rounded-sm flex text-college-navy hover:shadow-xl hover:-translate-y-0.5 hover:bg-college-navy/10 dark:hover:bg-white/10 hover:text-college-navy transition-all duration-300 cursor-default"
                >
                  {/* Vertical Accent Bar */}
                  <div className="w-1.5 bg-college-navy dark:bg-college-gold opacity-10 dark:opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" />

                  <div className="p-4 md:p-5 flex items-center justify-between w-full relative z-10">
                    <div>
                      <h4 className="font-bold text-college-navy dark:text-white transition-colors group-hover:text-navy text-base">
                        {subject.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-college-navy/40 dark:text-college-gold/50 group-hover:text-navy/50 uppercase tracking-widest">
                          {subject.code}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 group-hover:text-navy/40">
                          {subject.instructor}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 px-2.5 py-1.5 rounded-sm border border-college-navy/10 dark:border-college-gold/20 group-hover:bg-college-navy dark:group-hover:bg-college-gold group-hover:text-white dark:group-hover:text-college-navy group-hover:border-college-navy dark:group-hover:border-college-gold transition-all">
                        {subject.credits} Cr
                      </span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-100 dark:border-college-gold/10 rounded-sm">
              <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">
                No active subjects enrolled for the current class
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm shadow-sm p-6 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-serif font-bold text-college-navy dark:text-white">
                Announcements
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest institutional updates
              </p>
            </div>
            <Link
              to="/student/announcements"
              className="px-4 py-2 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-sm text-[10px] font-bold tracking-widest hover:bg-college-navy dark:hover:bg-college-gold hover:text-white dark:hover:text-college-navy transition-all duration-300"
            >
              SEE ALL
            </Link>
          </div>

          {displayAnnouncements.length > 0 ? (
            <div className="space-y-3">
              {displayAnnouncements.slice(0, 3).map((item, index) => (
                <Link
                  key={index}
                  to="/student/announcements"
                  className="group relative overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-college-gold/10 rounded-sm flex hover:shadow-xl hover:-translate-y-0.5 hover:bg-college-navy dark:hover:bg-white/10 transition-all duration-300"
                >
                  {/* Vertical Accent Bar */}
                  <div className="w-1.5 bg-college-navy dark:bg-college-gold opacity-10 dark:opacity-20 group-hover:opacity-100 transition-opacity flex-shrink-0" />

                  <div className="p-4 md:p-5 flex flex-col justify-between w-full relative z-10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold tracking-widest text-college-navy/40 dark:text-college-gold/50 transition-colors group-hover:text-white/50 uppercase">
                        {item.date}
                      </span>
                      <ArrowRight size={14} className="text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                    <h4 className="font-bold text-college-navy dark:text-white text-base mb-1.5 transition-colors group-hover:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 group-hover:text-white/70 transition-colors leading-relaxed">
                      {item.description || "Click to visit institutional announcements page for full details."}
                    </p>
                  </div>
             
                  
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-100 dark:border-college-gold/10 rounded-sm">
              <p className="text-gray-400 dark:text-gray-500 font-medium text-sm">
                No new announcements to display
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

