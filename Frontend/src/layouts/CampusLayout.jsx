import { Outlet, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CampusLayout = () => {
  const location = useLocation();
  const campusPath = location.pathname.split("/")[2]; // gets 'law', 'medical', etc.

  const navLinks = [
    { name: "Overview", path: "" },
    { name: "Academics", path: "academics" },
    { name: "Faculty", path: "faculty" },
    { name: "Research", path: "research" },
    { name: "Student Life", path: "student-life" },
    { name: "Facilities", path: "facilities" },
    { name: "Legal", path: "legal" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="border-b border-transparent relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="absolute inset-x-0 top-20 sm:top-24 flex justify-center z-30">
            <div className="rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur shadow-[0_10px_40px_rgba(67,56,202,0.08)] px-4 py-3">
              <nav className="flex gap-2 overflow-x-auto no-scrollbar justify-center">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={`/campuses/${campusPath}${
                      link.path ? "/" + link.path : ""
                    }`}
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
            </div>
          </div>
          {/* Spacer to prevent overlap with page hero/content */}
          <div className="h-12 sm:h-16" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12">
        <Outlet />
      </div>
    </div>
  );
};

export default CampusLayout;
