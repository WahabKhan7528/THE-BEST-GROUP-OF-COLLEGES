import { NavLink } from "react-router-dom";

const Sidebar = ({ items, onClose }) => {
  return (
    <aside className="h-full w-72 bg-white border-r shadow-sm">
      <div className="flex items-center justify-between px-6 h-16 border-b">
        <div>
          <p className="text-xs text-gray-500">Admin Panel</p>
          <p className="text-lg font-semibold text-purple-700">Best Colleges</p>
        </div>
        <button
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>
      <div className="px-4 py-6 space-y-2">
        <p className="px-2 text-xs uppercase tracking-wide text-gray-500">
          Navigation
        </p>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {Icon && <Icon size={18} />}
              <span className="text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
