import { useState } from "react";
import { Outlet } from "react-router-dom";
import FacultyNavbar from "../components/faculty/FacultyNavbar";
import FacultySidebar from "../components/faculty/FacultySidebar";

const FacultyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-gray-50 to-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <FacultySidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative">
        {/* Header */}
        <FacultyNavbar onMenuToggle={() => setIsSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
