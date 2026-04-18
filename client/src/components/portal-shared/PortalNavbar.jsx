import { Menu, Home, User, GraduationCap, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";
import CampusFilter from "../admin/CampusFilter";
import { useConfirm } from "../../context/ConfirmContext";
import { logoutUser } from "../../store/slices/authSlice";

const ROLE_ICONS = {
  admin: User,
  faculty: User,
  student: GraduationCap,
};

const PortalNavbar = ({
  role = "admin",
  badgeLabel,
  user,
  onMenuToggle,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowMobileProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const RoleIcon = ROLE_ICONS[role] || User;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || role[0].toUpperCase();

  const handleHomeClick = async () => {
    const shouldLogout = await confirm({
      title: `Leave ${badgeLabel || "Portal"}?`,
      message: "To open the public site, you will be logged out first.",
      confirmText: "Logout and Continue",
      cancelText: "Stay in Portal",
      variant: "info",
    });

    if (!shouldLogout) return;

    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Ignore logout network failures and still continue to the public site.
    }

    navigate("/");
  };

  return (
    <header className="min-h-20 bg-white dark:bg-college-navy border-b border-college-navy/10 dark:border-college-gold/20 sticky top-0 z-20 px-3 sm:px-4 lg:px-8 shadow-md transition-colors duration-300">
      <div className="h-full py-2 sm:py-0 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left Section: Menu Toggle & Role Badge */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <button
            className="p-2.5 rounded-sm hover:bg-college-navy/5 text-college-navy dark:text-gray-200 transition-all duration-200 active:scale-95 dark:hover:bg-college-gold/10"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-college-navy/5 text-college-navy border border-college-navy/20 dark:bg-college-gold/10 dark:text-college-gold dark:border-college-gold/30">
              <RoleIcon size={12} />
              {badgeLabel}
            </span>
          </div>

          <span className="inline-flex lg:hidden items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] bg-college-navy/5 text-college-navy border border-college-navy/20 dark:bg-college-gold/10 dark:text-college-gold dark:border-college-gold/30 max-w-[135px] truncate">
            <RoleIcon size={11} className="shrink-0" />
            <span className="truncate">{badgeLabel}</span>
          </span>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center justify-end flex-wrap gap-1.5 sm:gap-3 min-w-0">
          <DarkModeToggle />

          <button
            onClick={handleHomeClick}
            className="p-2 sm:p-2.5 rounded-sm text-college-navy/40 hover:bg-college-navy/5 hover:text-college-navy dark:text-college-gold/40 dark:hover:bg-college-gold/10 dark:hover:text-college-gold transition-all duration-200"
            title="Back to Home"
            aria-label="Back to Home"
          >
            <Home size={18} className="sm:w-5 sm:h-5" />
          </button>

          <div className="hidden sm:block h-8 w-px bg-college-navy/10 dark:bg-college-gold/20 mx-0.5 sm:mx-1" />

          <div 
            ref={profileRef}
            onClick={() => setShowMobileProfile(!showMobileProfile)}
            className="flex items-center gap-2 sm:gap-4 p-1.5 sm:p-2 sm:pl-3 pr-1.5 sm:pr-3 rounded-sm bg-college-navy/[0.02] dark:bg-college-gold/5 border border-college-navy/5 dark:border-college-gold/10 hover:border-college-gold/30 dark:hover:border-college-gold/40 transition-all duration-300 group cursor-pointer shadow-sm min-w-0 w-auto sm:min-w-[200px] max-w-full relative"
          >
            <div className="hidden sm:block text-right flex-grow">
              <p className="text-sm font-black text-college-navy dark:text-white uppercase tracking-tight leading-tight">
                {user?.name || "Portal User"}
              </p>
              <p className="text-[10px] font-bold text-college-navy/40 dark:text-college-gold/70 mt-0.5 leading-tight uppercase tracking-wider">
                {user?.line2 || ""}
              </p>
            </div>
            <div className="relative">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-college-navy dark:bg-college-gold text-white dark:text-college-navy flex items-center justify-center text-xs sm:text-base font-black shadow-md ring-2 ring-college-navy/5 dark:ring-college-gold/20 group-hover:scale-105 transition-transform duration-300">
                {initials}
              </div>
            </div>

            {/* Mobile User Profile Popover */}
            {showMobileProfile && (
              <div className="absolute top-[120%] right-0 w-56 sm:hidden bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 pb-2 border-b border-college-navy/10 dark:border-college-gold/10">
                    <div className="w-10 h-10 rounded-full bg-college-navy dark:bg-college-gold text-white dark:text-college-navy flex items-center justify-center text-sm font-black">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-black text-college-navy dark:text-white truncate uppercase tracking-tight">
                        {user?.name || "Portal User"}
                      </p>
                      <span className="text-[9px] font-black text-college-gold bg-college-gold/10 px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-college-gold/20">
                        {badgeLabel}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-college-navy/30 dark:text-white/20 uppercase tracking-[0.3em] mb-1.5">
                      Role Details
                    </p>
                    <p className="text-xs font-bold text-college-navy/70 dark:text-gray-300 flex items-center gap-1.5">
                      <ChevronRight size={12} className="text-college-gold" />
                      {user?.line2 || "No additional info"}
                    </p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white dark:bg-college-navy border-t border-l border-college-navy/10 dark:border-college-gold/20 rotate-45" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalNavbar;
