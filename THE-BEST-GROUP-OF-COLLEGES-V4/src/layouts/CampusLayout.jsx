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
    { name: "Student Life", path: "student-life" },
    { name: "Facilities", path: "facilities" },
  ];

  // detect active link correctly for mobile dropdown
  const segments = location.pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const activeLink =
    navLinks.find((link) => link.path === lastSegment) || navLinks[0];

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-transparent relative">
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32">
          <div className="absolute inset-x-0 top-6 sm:top-8 md:top-10 flex justify-center z-30 px-3 sm:px-4">
            <div className="rounded-lg sm:rounded-xl border border-college-navy/20 bg-college-navy shadow-lg px-2 py-2 sm:px-4 sm:py-3 w-full sm:w-auto max-w-full">
              {/* Desktop Tabs */}
              <nav className="hidden sm:flex gap-1 md:gap-2 overflow-x-auto no-scrollbar justify-center">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={`/campuses/${campusPath}${link.path ? "/" + link.path : ""}`}
                    className={({ isActive }) =>
                      `whitespace-nowrap px-3 md:px-4 py-2 rounded-md md:rounded-lg text-xs sm:text-sm font-semibold transition-all border ${isActive
                        ? "bg-college-gold text-college-navy border-college-gold shadow-sm"
                        : "text-white/80 border-transparent hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Dropdown */}
              <div className="sm:hidden relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-semibold text-college-navy bg-college-gold border border-college-gold"
                >
                  <span className="truncate">{activeLink.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 ml-2 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute mt-2 w-full rounded-lg border border-college-navy/20 bg-college-navy shadow-lg overflow-hidden z-40">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.name}
                        to={`/campuses/${campusPath}${link.path ? "/" + link.path : ""}`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2.5 text-sm font-medium transition ${isActive
                            ? "bg-college-gold text-college-navy"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
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
          <div className="h-4 sm:h-6 md:h-8" />
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-12">
        <Outlet />
      </div>
    </div>
  );
};

export default CampusLayout;
