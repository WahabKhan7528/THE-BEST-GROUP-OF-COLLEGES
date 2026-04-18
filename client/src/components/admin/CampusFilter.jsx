import React from "react";
import { useAdminContext } from "../../store/hooks/useAdminReduxContext";

const CampusFilter = () => {
  const {
    isSuperAdmin,
    selectedCampusFilter,
    setSelectedCampusFilter,
    campuses,
  } = useAdminContext();

  if (!isSuperAdmin) return null;

  return (
    <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto">
      <label className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-college-navy/60 dark:text-college-gold/80 flex-shrink-0">
        Campus:
      </label>
      <select
        value={selectedCampusFilter}
        onChange={(e) => setSelectedCampusFilter(e.target.value)}
        className="pl-2 sm:pl-3 pr-6 sm:pr-8 py-2 border border-college-navy/10 dark:border-college-gold/40 rounded-sm text-[10px] sm:text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold bg-white dark:bg-college-navy text-college-navy dark:text-white w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap shadow-md transition-all cursor-pointer flex-1"
      >
        <option value="all">All Campuses (Unified)</option>
        {campuses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CampusFilter;
