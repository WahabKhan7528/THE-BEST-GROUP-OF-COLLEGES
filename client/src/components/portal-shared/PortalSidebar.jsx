import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import PublicButton from "../shared/PublicButton";
import { useThemeContext } from "../../context/ThemeContext";

/**
 * Unified portal sidebar used by Admin, Faculty, and Student layouts.
 *
 * Props:
 *   portalLabel      – heading text, e.g. "Admin Portal"
 *   navItems         – array of { to, label, icon } passed from layout
 *   onClose          – called when mobile close button / nav link is clicked
 *   loginPath        – logout destination, e.g. "/login/admin"
 *   menuSectionLabel – label above nav links (default "Navigation")
 */
const PortalSidebar = ({
  portalLabel,
  navItems = [],
  onClose,
  loginPath,
  menuSectionLabel = "Navigation",
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();

  return (
    <aside className="h-full w-72 bg-white dark:bg-college-navy border-r border-gray-200 dark:border-college-gold/15 flex flex-col transition-colors duration-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100 dark:border-white/10">
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-college-gold uppercase tracking-wider mb-0.5">
            {portalLabel}
          </p>
          <p className="text-lg font-serif font-bold text-college-navy dark:text-white">
            Best Colleges
          </p>
        </div>
        <button
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-white/50 hover:text-college-navy dark:hover:text-white lg:hidden transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-4">
          {menuSectionLabel}
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose && onClose()}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-college-navy/5 text-college-navy border-l-2 border-college-navy shadow-sm dark:bg-college-gold/15 dark:text-college-gold dark:border-college-gold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-college-navy dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {Icon && (
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive
                          ? "text-college-navy dark:text-college-gold"
                          : "text-gray-400 group-hover:text-college-navy/70 dark:text-white/40 dark:group-hover:text-college-gold/70"
                      }`}
                    />
                  )}
                  <span className="text-sm font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-white/10">
        <PublicButton
          onClick={() => navigate(loginPath)}
          variant={isDarkMode ? "secondary" : "primary"}
          className="w-full"
          shape="slanted"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </PublicButton>
      </div>
    </aside>
  );
};

export default PortalSidebar;
