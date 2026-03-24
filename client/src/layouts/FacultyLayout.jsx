import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PortalNavbar from "../components/portal-shared/PortalNavbar";
import PortalSidebar from "../components/portal-shared/PortalSidebar";
import { useFacultyContext } from "../context/FacultyContext";
import { facultyNavItems } from "../data/navigationData";
import PageLoader from "../components/shared/PageLoader";

const FacultyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentFaculty } = useFacultyContext();

  const user = {
    name: currentFaculty?.name || "Faculty User",
    line2: `${currentFaculty?.department || "Faculty"} â€¢ ${currentFaculty?.designation || "Faculty"}`,
  };
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-base flex flex-col lg:flex-row transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
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
          portalLabel="Faculty Portal"
          navItems={facultyNavItems}
          onClose={() => setIsSidebarOpen(false)}
          loginPath="/login/faculty"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative min-w-0">
        {/* Header */}
        <PortalNavbar
          role="faculty"
          badgeLabel="Faculty Panel"
          user={user}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
