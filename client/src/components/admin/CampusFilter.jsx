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
      <div className="relative flex-1 sm:flex-none group">
        <select
          value={selectedCampusFilter}
          onChange={(e) => setSelectedCampusFilter(e.target.value)}
          className="appearance-none pl-2 sm:pl-3 pr-8 sm:pr-10 py-2 border border-college-navy/10 dark:border-college-gold/40 rounded-sm text-[10px] sm:text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 focus:border-college-navy dark:focus:border-college-gold bg-white dark:bg-college-navy/50 text-college-navy dark:text-white w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap shadow-md transition-all cursor-pointer flex-1 relative z-10 bg-transparent hover:bg-slate-50 dark:hover:bg-college-navy/90"
        >
          <option value="all" className="dark:bg-college-navy dark:text-white">All Campuses (Unified)</option>
          {campuses.map((c) => (
            <option key={c.id} value={c.id} className="dark:bg-college-navy dark:text-white">
              {c.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors z-20">
          <svg className="w-4 h-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default CampusFilter;
