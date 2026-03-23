import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PortalSidebar from "../components/portal-shared/PortalSidebar";
import PortalNavbar from "../components/portal-shared/PortalNavbar";
import { useAdminContext } from "../context/AdminContext";
import { adminNavItems } from "../data/navigationData";
import PageLoader from "../components/shared/PageLoader";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentAdmin, isSuperAdmin, isDarkMode } = useAdminContext();

  const visibleNavItems = adminNavItems.filter(
    (item) =>
      !(item.superAdminOnly && !isSuperAdmin) &&
      !(item.subAdminHidden && !isSuperAdmin)
  );

  const user = {
    name: currentAdmin?.name || "Admin User",
    line2: currentAdmin?.email || "admin@example.com",
  };

  const badgeLabel = isSuperAdmin ? "Super Admin" : "Sub-Admin";
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
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-base flex flex-col lg:flex-row transition-colors duration-300">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Sticky on desktop, fixed on mobile */}
      <div
        className={`fixed inset-y-0 left-0 lg:sticky lg:top-0 lg:h-screen lg:z-0 transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <PortalSidebar
          portalLabel="Admin Portal"
          navItems={visibleNavItems}
          onClose={() => setIsSidebarOpen(false)}
          loginPath="/login/admin"
          menuSectionLabel="Main Menu"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        <PortalNavbar
          role="admin"
          badgeLabel={badgeLabel}
          user={user}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
          showCampusFilter
        />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10">
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

export default AdminLayout;
