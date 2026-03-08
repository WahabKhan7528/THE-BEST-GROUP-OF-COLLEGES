import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";
import StudentSidebar from "../components/student/StudentSidebar";
import { useStudentContext } from "../context/StudentContext";

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isDarkMode } = useStudentContext();

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
      <div className={`fixed lg:sticky lg:top-0 lg:h-screen lg:z-0 z-40`}>
        <StudentSidebar
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0 relative z-10">
        {/* Header */}
        <StudentNavbar onMenuToggle={() => setIsSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
