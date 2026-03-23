import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PortalNavbar from "../components/portal-shared/PortalNavbar";
import PortalSidebar from "../components/portal-shared/PortalSidebar";
import { useStudentContext } from "../context/StudentContext";
import { studentNavItems } from "../data/navigationData";
import PageLoader from "../components/shared/PageLoader";

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentStudent, isDarkMode } = useStudentContext();

  const user = {
    name: currentStudent?.name || "Student User",
    line2: `${currentStudent?.department || "Student"} • Semester ${currentStudent?.semester || ""}`,
  };
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Re-apply theme on mount to fix overrides from public layout/login pages
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-dark-base flex transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Sticky on desktop, fixed on mobile */}
      <div
        className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-screen lg:z-0 transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <PortalSidebar
          portalLabel="Student Portal"
          navItems={studentNavItems}
          onClose={() => setIsSidebarOpen(false)}
          loginPath="/login/student"
        />
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
  );
};

export default StudentLayout;
