import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  ClipboardList,
  BarChart3,
  Megaphone,
  Menu,
  X,
  Home,
  LogOut,
  GraduationCap
} from "lucide-react";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/materials", label: "Materials", icon: FolderOpen },
  { to: "/student/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/student/results", label: "Results", icon: BarChart3 },
  { to: "/student/announcements", label: "Class Announcements", icon: Megaphone },
];

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const renderNavItem = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
            ? "bg-primary-600 text-white shadow-md translate-x-1"
            : "text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1"
          }`
        }
        onClick={() => setIsSidebarOpen(false)}
      >
        {({ isActive }) => (
          <>
            <Icon
              size={20}
              className={`transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary-600"}`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex relative overflow-hidden">


      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl transition-transform duration-300 z-40 lg:z-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100/50">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">Student Portal</p>
            <p className="text-xl font-bold text-primary-900">
              Best Colleges
            </p>
          </div>
          <button
            className="p-2 rounded-xl hover:bg-gray-100/50 text-gray-500 hover:text-gray-700 lg:hidden transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Menu
          </p>
          {navItems.map(renderNavItem)}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100/50 bg-gray-50/50">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full relative z-10">
        {/* Header */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-20 px-4 lg:px-8 shadow-sm">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="p-2.5 rounded-xl hover:bg-gray-100/80 text-gray-600 lg:hidden transition-all duration-200 active:scale-95"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Toggle sidebar"
              >
                <Menu size={22} />
              </button>

              <div className="hidden lg:block">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-600/20">
                  <GraduationCap size={14} />
                  Student Panel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/")}
                className="p-2.5 rounded-xl text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                title="Back to Home"
              >
                <Home size={20} />
              </button>



              <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

              <div className="flex items-center gap-3 p-1.5 pl-2 rounded-xl group cursor-default">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900 leading-none">
                    Ayesha Khan
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-none">
                    CS • Semester 5
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white">
                  AK
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto w-full max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
