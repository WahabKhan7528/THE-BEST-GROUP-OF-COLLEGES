import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Layers,
  GraduationCap,
  Book,
  ArrowRight,
  Building2,
  Megaphone,
  Image,
} from "lucide-react";

import { useAdminContext } from "../../store/hooks/useAdminReduxContext";
import PortalStatsCard from "../../components/portal-shared/PortalStatsCard";
import PortalPageHeader from "../../components/portal-shared/PortalPageHeader";
import Badge from "../../components/shared/Badge";
import SkeletonLoading from "../../components/shared/SkeletonLoading";
import { adminApi } from "../../services/api";

const getRefId = (value) => value?._id || value?.id || value || null;

const matchesCampus = (entityCampus, selectedCampusId) => {
  if (!selectedCampusId || selectedCampusId === "all") return true;
  return String(getRefId(entityCampus)) === String(selectedCampusId);
};

const subAdminActions = [
  { title: "Add Classes", desc: "Create new class sections", path: "/admin/classes/create" },
  { title: "Add Subjects", desc: "Register new subjects", path: "/admin/subjects/create" },
  { title: "Add Courses", desc: "Launch new academic programs", path: "/admin/courses/create" },
  { title: "Manage Users", desc: "Create staff and student accounts", path: "/admin/users" },
];

const superAdminActions = [
  { title: "Campus Management", desc: "Create and manage campuses", path: "/admin/campus" },
  { title: "News & Events", desc: "Publish latest updates", path: "/admin/cms/news/create" },
  { title: "Add Gallery", desc: "Upload campus photos", path: "/admin/cms/gallery/upload" },
];

const Dashboard = () => {
  const { selectedCampusFilter, getCurrentCampusContext, isDarkMode, isSuperAdmin, currentAdmin } =
    useAdminContext();
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedSubAdminCampusName, setResolvedSubAdminCampusName] = useState("");
  const [counts, setCounts] = useState({ students: 0, faculty: 0, classes: 0, subjects: 0, courses: 0, campuses: 0, news: 0, gallery: 0 });

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const requests = [
          adminApi.campuses(),
          adminApi.users(),
          adminApi.classes(),
          adminApi.subjects(),
          adminApi.courses(),
        ];

        if (isSuperAdmin) {
          requests.push(adminApi.newsEvents(), adminApi.galleryItems());
        }

        const responses = await Promise.allSettled(requests);

        const getDataAt = (index) => {
          const result = responses[index];
          return result?.status === "fulfilled" ? result.value?.data?.data || [] : [];
        };

        const campuses = getDataAt(0);
        const users = getDataAt(1);
        const classes = getDataAt(2);
        const subjects = getDataAt(3);
        const courses = getDataAt(4);
        const newsItems = isSuperAdmin ? getDataAt(5) : [];
        const galleryItems = isSuperAdmin ? getDataAt(6) : [];

        const campusId = isSuperAdmin
          ? (selectedCampusFilter === "all" ? null : selectedCampusFilter)
          : (currentAdmin?.campus?._id || currentAdmin?.campus || null);

        const filteredUsers = campusId ? users.filter((user) => matchesCampus(user.campus, campusId)) : users;
        const filteredClasses = campusId ? classes.filter((classRoom) => matchesCampus(classRoom.campus, campusId)) : classes;
        const filteredSubjects = campusId
          ? subjects.filter((subject) => (subject.campuses || []).some((campus) => matchesCampus(campus, campusId)))
          : subjects;
        const filteredCourses = campusId
          ? courses.filter((course) => (course.campuses || []).some((campus) => matchesCampus(campus, campusId)))
          : courses;
        const filteredNews = campusId
          ? newsItems.filter((item) => matchesCampus(item.createdBy?.campus, campusId))
          : newsItems;
        const filteredGallery = campusId
          ? galleryItems.filter((item) => matchesCampus(item.uploadedBy?.campus, campusId))
          : galleryItems;

        const filteredStudents = filteredUsers.filter((user) => user.role === "student");
        const filteredFaculty = filteredUsers.filter((user) => user.role === "faculty");

        if (!isSuperAdmin) {
          const campusId = String(currentAdmin?.campus?._id || currentAdmin?.campus || "");
          const matchedCampus = campuses.find((campus) => String(campus._id || campus.id) === campusId);
          setResolvedSubAdminCampusName(matchedCampus?.name || matchedCampus?.code || "");
        }

        setCounts({
          students: filteredStudents.length,
          faculty: filteredFaculty.length,
          classes: filteredClasses.length,
          subjects: filteredSubjects.length,
          courses: filteredCourses.length,
          campuses: campusId ? 1 : campuses.length,
          news: filteredNews.length,
          gallery: filteredGallery.length,
        });
      } catch {
        setCounts({ students: 0, faculty: 0, classes: 0, subjects: 0, courses: 0, campuses: 0, news: 0, gallery: 0 });
        if (!isSuperAdmin) {
          setResolvedSubAdminCampusName("");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [selectedCampusFilter, isSuperAdmin, currentAdmin]);

  const currentCampus = getCurrentCampusContext();
  const subAdminCampusLabel =
    resolvedSubAdminCampusName ||
    currentAdmin?.campus?.name ||
    currentAdmin?.campus?.code ||
    "Assigned Campus";
  const campusLabel = currentCampus ? currentCampus.name : "All Campuses";

  const stats = useMemo(() => {
    if (isSuperAdmin && selectedCampusFilter === "all") {
      return [
        { title: "Courses", value: counts.courses, hint: "Active programs", icon: Layers, tone: "primary" },
        { title: "Campuses", value: counts.campuses, hint: "Managed campuses", icon: Building2, tone: "primary" },
        { title: "News Posts", value: counts.news, hint: "Published updates", icon: Megaphone, tone: "primary" },
        { title: "Gallery Items", value: counts.gallery, hint: "Media assets", icon: Image, tone: "primary" },
      ];
    }

    return [
      { title: "Total Students", value: counts.students, hint: "Campus enrollments", icon: Users, tone: "primary" },
      { title: "Faculty", value: counts.faculty, hint: "Campus teaching staff", icon: GraduationCap, tone: "primary" },
      { title: "Courses", value: counts.courses, hint: "Campus courses", icon: Layers, tone: "primary" },
      { title: "Classes", value: counts.classes, hint: "Campus classes", icon: Book, tone: "primary" },
    ];
  }, [counts, selectedCampusFilter, isSuperAdmin]);

  const quickActions = isSuperAdmin ? superAdminActions : subAdminActions;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <PortalPageHeader
        badge={
          !isSuperAdmin ? (
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              {subAdminCampusLabel}
            </Badge>
          ) : selectedCampusFilter !== "all" ? (
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              {campusLabel}
            </Badge>
          ) : null
        }
        title="Admin Control Center"
        subtitle={isSuperAdmin ? "Campus, news, and gallery control for the system owner" : "Academic operations for admin users"}
      />

      {/* Main Stats Grid */}
      {isLoading ? (
        <SkeletonLoading count={4} variant="panel" containerClassName="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {stats.map((item) => (
            <PortalStatsCard key={item.title} {...item} />
          ))}
        </div>
      )}

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
              className="group relative overflow-hidden bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/20 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-college-navy dark:hover:bg-white/5 transition-all duration-300 flex"
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

