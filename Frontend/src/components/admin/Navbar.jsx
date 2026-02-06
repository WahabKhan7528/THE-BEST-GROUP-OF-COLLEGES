import { Menu, Bell, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";
import CampusFilter from "./CampusFilter";

const Navbar = ({ onMenuToggle }) => {
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
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="text-sm font-semibold text-gray-900">
            {adminRoleDisplay}
          </p>
        </div>
      </div>

      {/* Campus Filter - shown for Super Admin */}
      <div className="hidden md:flex">
        <CampusFilter />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
          title="Back to Home"
          aria-label="Back to Home"
        >
          <Home size={18} />
        </button>
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-full">
          <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-900">
              {currentAdmin?.name}
            </p>
            <p className="text-xs text-gray-500">{adminRoleDisplay}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
