import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  FolderOpen,
  Upload,
  BarChart3,
  Megaphone,
  Menu,
  Bell,
  X,
  Home,
} from "lucide-react";

const navItems = [
  { to: "/faculty/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/faculty/assignments", label: "Assignments", icon: ClipboardList },
  {
    to: "/faculty/assignments/create",
    label: "Create Assignment",
    icon: PlusCircle,
  },
  { to: "/faculty/submissions/123", label: "Submissions", icon: ClipboardList },
  { to: "/faculty/materials", label: "Materials", icon: FolderOpen },
  { to: "/faculty/materials/upload", label: "Upload Material", icon: Upload },
  { to: "/faculty/results", label: "Results", icon: BarChart3 },
  { to: "/faculty/announcements", label: "Announcements", icon: Megaphone },
];

const FacultyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const renderNavItem = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive
              ? "bg-purple-50 text-purple-700 font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
        onClick={() => setIsSidebarOpen(false)}
      >
        <Icon size={18} />
        <span className="text-sm">{item.label}</span>
      </NavLink>
    );
  };

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
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-72 bg-white border-r shadow-sm transition-transform duration-300 z-40 lg:z-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <div>
            <p className="text-xs text-gray-500">Faculty Panel</p>
            <p className="text-lg font-semibold text-purple-700">
              Best Colleges
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <p className="px-2 text-xs uppercase tracking-wide text-gray-500">
            Navigation
          </p>
          {navItems.map(renderNavItem)}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
              title="Back to Home"
              aria-label="Back to Home"
            >
              <Home size={18} />
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-500">Welcome back,</p>
              <p className="text-sm font-semibold text-gray-900">
                Prof. Ahmed Raza
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={18} className="text-gray-600" />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                AR
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-gray-900">
                  Prof. Ahmed Raza
                </p>
                <p className="text-xs text-gray-500">CS • Faculty</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
