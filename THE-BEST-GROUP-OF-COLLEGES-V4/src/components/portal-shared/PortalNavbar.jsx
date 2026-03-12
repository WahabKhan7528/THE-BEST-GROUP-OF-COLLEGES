import { Menu, Home, User, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../shared/DarkModeToggle";
import CampusFilter from "../admin/CampusFilter";

const ROLE_ICONS = {
  admin: User,
  faculty: User,
  student: GraduationCap,
};

/**
 * Unified portal navbar used by Admin, Faculty, and Student layouts.
 *
 * Props:
 *   role           – "admin" | "faculty" | "student"
 *   badgeLabel     – text shown in the role badge (e.g. "Super Admin", "Faculty Panel")
 *   user           – { name, line2 }  where line2 is email / department info
 *   onMenuToggle   – called when the hamburger button is clicked
 *   showCampusFilter – render the CampusFilter widget (admin only)
 */
const PortalNavbar = ({
  role = "admin",
  badgeLabel,
  user,
  onMenuToggle,
  showCampusFilter = false,
}) => {
  const navigate = useNavigate();
  const RoleIcon = ROLE_ICONS[role] || User;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || role[0].toUpperCase();

  return (
    <header className="h-20 bg-white/70 dark:bg-college-navy backdrop-blur-xl border-b border-gray-200/50 dark:border-college-gold/15 sticky top-0 z-20 px-4 lg:px-8 shadow-sm transition-colors duration-300">
      <div className="h-full flex items-center justify-between">
        {/* Left Section: Menu Toggle & Role Badge */}
        <div className="flex items-center gap-4">
          <button
            className="p-2.5 rounded-xl hover:bg-college-navy/10 text-college-navy dark:text-gray-200 lg:hidden transition-all duration-200 active:scale-95 dark:hover:bg-college-gold/10"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-college-navy/10 text-college-navy border border-college-navy/20 dark:bg-college-gold/10 dark:text-college-gold dark:border-college-gold/30">
              <RoleIcon size={12} />
              {badgeLabel}
            </span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {showCampusFilter && <CampusFilter />}

          <DarkModeToggle />

          <button
            onClick={() => navigate("/")}
            className="p-2 sm:p-2.5 rounded-xl text-gray-500 hover:bg-college-navy/10 hover:text-college-navy dark:hover:bg-college-gold/10 dark:hover:text-college-gold transition-all duration-200"
            title="Back to Home"
            aria-label="Back to Home"
          >
            <Home size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="h-6 sm:h-8 w-px bg-gray-200 mx-0.5 sm:mx-1" />

          <div className="flex items-center gap-3 sm:gap-4 p-1.5 sm:p-2 sm:pl-3 pr-2.5 sm:pr-3 rounded-2xl bg-gray-50/50 dark:bg-college-gold/5 border border-gray-100 dark:border-college-gold/10 hover:border-college-gold/30 dark:hover:border-college-gold/40 transition-all duration-300 group cursor-pointer shadow-sm min-w-[160px] sm:min-w-[200px]">
            <div className="hidden sm:block text-right flex-grow">
              <p className="text-sm font-bold text-college-navy dark:text-gray-100 leading-tight">
                {user?.name || "Portal User"}
              </p>
              <p className="text-[11px] font-medium text-gray-500 dark:text-college-gold/70 mt-0.5 leading-tight">
                {user?.line2 || ""}
              </p>
            </div>
            <div className="relative">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-college-navy dark:bg-college-gold text-white dark:text-college-navy flex items-center justify-center text-xs sm:text-base font-bold shadow-md ring-2 ring-college-gold/20 dark:ring-white/10 group-hover:scale-105 transition-transform duration-300">
                {initials}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalNavbar;
