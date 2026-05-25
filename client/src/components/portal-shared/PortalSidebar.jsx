import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import PublicButton from "../shared/PublicButton";
import { useConfirm } from "../../context/ConfirmContext";
import { logoutUser } from "../../store/slices/authSlice";

/**
 * Unified portal sidebar used by Admin, Faculty, and Student layouts.
 *
 * Props:
 *   portalLabel      â€“ heading text, e.g. "Admin Portal"
 *   navItems         â€“ array of { to, label, icon } passed from layout
 *   onClose          â€“ called when mobile close button / nav link is clicked
 *   loginPath        â€“ logout destination, e.g. "/login/admin"
 *   menuSectionLabel â€“ label above nav links (default "Navigation")
 */
const PortalSidebar = ({
  portalLabel,
  navItems = [],
  onClose,
  loginPath,
  menuSectionLabel = "Navigation",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);

  const handleLogout = async () => {
    const shouldLogout = await confirm({
      title: `Leave ${portalLabel || "Portal"}?`,
      message: "To continue, you will be logged out first.",
      confirmText: "Logout and Continue",
      cancelText: "Stay in Portal",
      variant: "info",
    });

    if (!shouldLogout) return;

    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Ignore logout network errors.
    }
    navigate(loginPath);
  };

  return (
    <aside className="h-full w-72 bg-white dark:bg-college-navy border-r border-college-navy/5 dark:border-college-gold/15 flex flex-col transition-colors duration-300">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-college-navy/5 dark:border-college-gold/15">
        <div>
          <p className="text-[10px] font-extra-bold text-college-navy/60 dark:text-college-gold uppercase tracking-[0.2em] mb-0.5">
            {portalLabel}
          </p>
          <p className="text-xl font-serif font-black text-college-navy dark:text-white uppercase tracking-tight">
            Best Group
          </p>
        </div>
        <button
          className="p-2 rounded-sm hover:bg-college-navy/5 dark:hover:bg-college-gold/10 text-college-navy/40 dark:text-college-gold/50 hover:text-college-navy dark:hover:text-college-gold lg:hidden transition-all"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5 custom-scrollbar">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-college-navy/30 dark:text-white/20 mb-5">
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
                `group flex items-center gap-3 px-4 py-3.5 rounded-sm transition-all duration-300 ${
                  isActive
                    ? "bg-college-navy text-white shadow-lg dark:bg-college-gold dark:text-college-navy scale-[1.02]"
                    : "text-college-navy/70 hover:bg-college-navy/5 hover:text-college-navy dark:text-white/60 dark:hover:bg-college-gold/5 dark:hover:text-college-gold"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {Icon && (
                    <Icon
                      size={18}
                      className={`transition-all duration-300 ${
                        isActive
                          ? "text-college-gold dark:text-college-navy"
                          : "text-college-navy/40 group-hover:text-college-navy dark:text-white/30 dark:group-hover:text-college-gold"
                      }`}
                    />
                  )}
                  <span className={`text-sm font-bold tracking-wide transition-all ${isActive ? 'translate-x-1' : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-college-navy/5 dark:border-college-gold/15 bg-college-navy/2 dark:bg-black/10">
        <PublicButton
          onClick={handleLogout}
          variant={isDarkMode ? "secondary" : "primary"}
          className="w-full shadow-md"
          shape="slanted"
        >
          <LogOut size={18} />
          <span className="font-bold">Sign Out</span>
        </PublicButton>
      </div>
    </aside>
  );
};

export default PortalSidebar;
