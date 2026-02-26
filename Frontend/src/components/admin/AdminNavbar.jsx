import { Menu, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";
import CampusFilter from "./CampusFilter";

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
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-20 px-4 lg:px-8 shadow-sm">
      <div className="h-full flex items-center justify-between">
        {/* Left Section: Menu Toggle & Role Badge */}
        <div className="flex items-center gap-4">
          <button
            className="p-2.5 rounded-xl hover:bg-gray-100/80 text-gray-600 lg:hidden transition-all duration-200 active:scale-95"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${isSuperAdmin
              ? "bg-primary-50 text-primary-700 ring-primary-600/20"
              : "bg-primary-50 text-primary-700 ring-primary-600/20"
              }`}>
              <User size={12} />
              {adminRoleDisplay}
            </span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="mr-1 sm:mr-2">
            <CampusFilter />
          </div>

          <button
            onClick={() => navigate("/")}
            className="p-2.5 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            title="Back to Home"
          >
            <Home size={20} />
          </button>



          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3 p-1.5 pl-2 rounded-xl group cursor-default">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900 leading-none">
                {currentAdmin?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-none">
                {currentAdmin?.email || "admin@example.com"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-white">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
