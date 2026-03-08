import { Menu, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";
import CampusFilter from "./CampusFilter";
import DarkModeToggle from "../shared/DarkModeToggle";

const AdminNavbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { currentAdmin, isSuperAdmin } = useAdminContext();

  const adminRoleDisplay = isSuperAdmin ? "Super Admin" : "Sub-Admin";
  const initials =
    currentAdmin?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "SA";

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
              <User size={12} />
              {adminRoleDisplay}
            </span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          <CampusFilter />

          <DarkModeToggle />

          <button
            onClick={() => navigate("/")}
            className="p-2 sm:p-2.5 rounded-xl text-gray-500 hover:bg-college-navy/10 hover:text-college-navy dark:hover:bg-college-gold/10 dark:hover:text-college-gold transition-all duration-200"
            title="Back to Home"
          >
            <Home size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="h-6 sm:h-8 w-px bg-gray-200 mx-0.5 sm:mx-1"></div>

          <div className="flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 sm:pl-2 rounded-xl group cursor-default">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-college-navy dark:text-gray-200 leading-none">
                {currentAdmin?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-none">
                {currentAdmin?.email || "admin@example.com"}
              </p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-college-navy text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-sm ring-2 ring-college-gold/30">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
