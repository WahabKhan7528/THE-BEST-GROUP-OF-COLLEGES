import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CampusLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Extract campus (main / law / hala)
  const campusPath = location.pathname.split("/")[2];

  const navLinks = [
    { name: "Overview", path: "" },
    { name: "Academics", path: "academics" },
    { name: "Faculty", path: "faculty" },
    { name: "Research", path: "research" },
    { name: "Student Life", path: "student-life" },
    { name: "Facilities", path: "facilities" },
    { name: "Legal", path: "legal" },
  ];

  // 🔧 FIX: detect active link correctly for mobile dropdown
  const segments = location.pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const activeLink =
    navLinks.find((link) => link.path === lastSegment) ||
    navLinks[0]; // fallback → Overview

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b border-transparent relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="absolute inset-x-0 top-20 sm:top-24 flex justify-center z-30">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur shadow-[0_10px_40px_rgba(67,56,202,0.08)] px-4 py-3 w-full sm:w-auto">

              {/* 🖥 Desktop Tabs */}
              <nav className="hidden sm:flex gap-2 overflow-x-auto no-scrollbar justify-center">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={`/campuses/${campusPath}${link.path ? "/" + link.path : ""}`}
                    className={({ isActive }) =>
                      `whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                        isActive
                          ? "bg-primary-50 text-primary-700 border-primary-100 shadow-sm"
                          : "text-neutral-600 border-transparent hover:bg-neutral-100 hover:text-primary-700"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* 📱 Mobile Dropdown */}
              <div className="sm:hidden relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm font-semibold text-primary-700 bg-primary-50 border border-primary-100"
                >
                  {activeLink.name}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden z-40">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={`/campuses/${campusPath}${link.path ? "/" + link.path : ""}`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm font-medium transition ${
                            isActive
                              ? "bg-primary-50 text-primary-700"
                              : "text-neutral-600 hover:bg-neutral-100 hover:text-primary-700"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Spacer to prevent overlap */}
          <div className="h-14 sm:h-16" />
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12">
        <Outlet />
      </div>
    </div>
  );
};

export default CampusLayout;
