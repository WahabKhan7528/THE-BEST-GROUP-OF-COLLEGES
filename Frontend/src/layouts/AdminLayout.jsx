import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Image,
  Layers,
  Megaphone,
  Building2,
} from "lucide-react";
import { useAdminContext } from "../context/AdminContext";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    to: "/admin/campus",
    label: "Campus Management",
    icon: Building2,
    superAdminOnly: true,
  },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/classes", label: "Classes", icon: GraduationCap },
  { to: "/admin/subjects", label: "Subjects", icon: BookOpen },
  { to: "/admin/cms/news", label: "News & Events", icon: Megaphone },
  { to: "/admin/cms/gallery", label: "Gallery", icon: Image },
  { to: "/admin/courses", label: "Courses", icon: Layers },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSuperAdmin } = useAdminContext();

  // Filter nav items based on admin role
  const visibleNavItems = adminNavItems.filter((item) => {
    if (item.superAdminOnly && !isSuperAdmin) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen transform transition-transform duration-300 z-40 lg:z-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar
          items={visibleNavItems}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Navbar onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
