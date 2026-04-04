import React from "react";

/**
 * PortalStatsCard - A refined "Clean Premium" card for all Portal Dashboards.
 *
 * Aesthetics:
 * - Strictly college-navy background for dark mode / white for light mode.
 * - Solid 1.5px border for prominence (gold in dark mode, navy/gray in light mode).
 * - Clean sans-serif typography for maximum readability.
 * - Professional pill-style hint/trend indicator.
 */
const PortalStatsCard = ({ title, value, hint }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-college-navy border-[1.5px] border-college-navy/10 dark:border-college-gold/40 rounded-sm p-4 sm:p-5 md:p-6 shadow-2xl transition-all duration-300 hover:border-college-navy dark:hover:border-college-gold hover:scale-[1.01]">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-college-navy/60 dark:text-college-gold text-xs font-bold uppercase tracking-[0.25em] leading-none opacity-80">
          {title}
        </h3>

        {/* Value Area */}
        <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-4 flex-wrap">
          <span className="text-lg sm:text-xl font-bold text-college-navy dark:text-white tracking-tight leading-none break-words">
            {value}
          </span>
        </div>
        {hint ? (
          <p className="text-[10px] font-black text-college-navy/40 dark:text-college-gold/60 uppercase tracking-widest">{hint}</p>
        ) : null}
      </div>

      
    </div>
  );
};

export default PortalStatsCard;
