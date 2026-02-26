import { NavLink } from "react-router-dom";
import { LogOut, X, LayoutDashboard, FolderOpen, ClipboardList, BarChart3, Megaphone } from "lucide-react";

const navItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/materials", label: "Materials", icon: FolderOpen },
    { to: "/student/assignments", label: "Assignments", icon: ClipboardList },
    { to: "/student/results", label: "Results", icon: BarChart3 },
    { to: "/student/announcements", label: "Class Announcements", icon: Megaphone },
];

const StudentSidebar = ({ isSidebarOpen, onClose }) => {
    return (
        <aside
            className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl transition-transform duration-300 z-40 lg:z-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100/50">
                <div>
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">Student Portal</p>
                    <p className="text-xl font-bold text-primary-900">
                        Best Colleges
                    </p>
                </div>
                <button
                    className="p-2 rounded-xl hover:bg-gray-100/50 text-gray-500 hover:text-gray-700 lg:hidden transition-colors"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
                <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Menu
                </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-primary-600 text-white shadow-md translate-x-1"
                                    : "text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1"
                                }`
                            }
                            onClick={() => onClose && onClose()}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={20}
                                        className={`transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary-600"
                                            }`}
                                    />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-100/50 bg-gray-50/50">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;
