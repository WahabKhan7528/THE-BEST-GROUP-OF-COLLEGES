import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PortalNavbar from "../components/portal-shared/PortalNavbar";
import PortalSidebar from "../components/portal-shared/PortalSidebar";
import { useSelector } from "react-redux";
import { studentNavItems } from "../data/navigationData";
import PageLoader from "../components/shared/PageLoader";
import { useStudentContext } from "../store/hooks/useStudentReduxContext";

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user: currentStudent } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const { getCurrentAcademicProfile } = useStudentContext();
  const academicProfile = getCurrentAcademicProfile();

  const user = {
    name: currentStudent?.name || "Student User",
    line2: academicProfile
      ? `${academicProfile.courseLabel} • ${academicProfile.semesterLabel}`
      : `${currentStudent?.department || "Student"} • Semester ${currentStudent?.semester || "-"}`,
  };
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-college-navy/5 dark:bg-college-navy flex transition-colors duration-300">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Sticky on desktop, fixed on mobile */}
        <div
          className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-screen z-40 transition-all duration-300 overflow-hidden ${isSidebarOpen
              ? "translate-x-0 w-72 border-r border-college-navy/10 dark:border-college-gold/20"
              : "-translate-x-full lg:translate-x-0 lg:w-0 border-none"
            }`}
        >
          <div className="w-72 h-full">
            <PortalSidebar
              portalLabel="Student Portal"
              navItems={studentNavItems}
              onClose={() => setIsSidebarOpen(false)}
              loginPath="/login/student"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full min-w-0 relative z-10">
          {/* Header */}
          <PortalNavbar
            role="student"
            badgeLabel="Student Panel"
            user={user}
            onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
