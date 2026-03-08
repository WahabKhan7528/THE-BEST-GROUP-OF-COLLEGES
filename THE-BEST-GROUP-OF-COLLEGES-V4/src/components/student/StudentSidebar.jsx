import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { studentNavItems as navItems } from "../../data/navigationData";
import PublicButton from "../../components/shared/PublicButton";
import { useThemeContext } from "../../context/ThemeContext";

const StudentSidebar = ({ isSidebarOpen, onClose }) => {
    const navigate = useNavigate();
    const { isDarkMode } = useThemeContext();
    return (
        <aside
            className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-college-navy border-r border-gray-200 dark:border-college-gold/15 transition-transform duration-300 z-40 lg:z-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100 dark:border-white/10">
                <div>
                    <p className="text-xs font-bold text-gray-500 dark:text-college-gold uppercase tracking-wider mb-0.5">Student Portal</p>
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

            <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-white/30 mb-4">
                    Navigation
                </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => onClose && onClose()}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
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
                                            className={`transition-colors ${isActive ? "text-college-navy dark:text-college-gold" : "text-gray-400 group-hover:text-college-navy/70 dark:text-white/40 dark:group-hover:text-college-gold/70"}`}
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
                    onClick={() => navigate("/login/student")}
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

export default StudentSidebar;
