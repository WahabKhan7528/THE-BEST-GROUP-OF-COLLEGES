import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = ({ items, onClose }) => {
  return (
    <aside className="h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 h-20 border-b border-gray-100/50">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">Admin Portal</p>
          <p className="text-xl font-bold text-primary-900">
            Best Colleges
          </p>
        </div>
        <button
          className="p-2 rounded-xl hover:bg-gray-100/50 text-gray-500 hover:text-gray-700 lg:hidden transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        <p className="px-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Main Menu
        </p>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose && onClose()}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-primary-600 text-white shadow-md translate-x-1"
                  : "text-gray-600 hover:bg-primary-50 hover:text-primary-700 hover:translate-x-1"
                }`
              }
            >
              {Icon && (
                <Icon
                  size={20}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary-600"}`
                  }
                />
              )}
              <span className="text-sm font-medium">{item.label}</span>
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

export default Sidebar;
