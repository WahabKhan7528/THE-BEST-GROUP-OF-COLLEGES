import React from "react";
import SkeletonLoading from "../shared/SkeletonLoading";

const Table = ({ columns, data, actionButtons, isLoading = false, skeletonCount = 5, compact = false }) => {
  const cellPadding = compact
    ? "px-2 sm:px-3 md:px-4 py-2 md:py-2.5"
    : "px-3 sm:px-4 md:px-6 py-3 md:py-4";

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 space-y-4">
          <SkeletonLoading count={skeletonCount} variant="tableRow" containerClassName="space-y-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-college-navy border border-college-navy/10 dark:border-college-gold/20 rounded-sm shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-college-navy/10 dark:divide-college-gold/20">
          {/* 1. THE HEADER */}
          <thead>
            <tr className="bg-college-navy/5 dark:bg-college-gold/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width, minWidth: col.width } : (col.minWidth ? { minWidth: col.minWidth } : {})}
                  className={`${cellPadding} text-left text-[10px] md:text-xs font-extra-bold text-college-navy dark:text-college-gold uppercase tracking-widest whitespace-nowrap ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}
              {actionButtons && (
                <th
                  className={`${cellPadding} text-right text-[10px] md:text-xs font-extra-bold text-college-navy dark:text-college-gold uppercase tracking-widest`}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* 2. THE BODY */}
          <tbody className="divide-y divide-college-navy/10 dark:divide-college-gold/20 bg-white dark:bg-college-navy">
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-college-navy/5 dark:hover:bg-college-gold/10 transition-colors duration-150 group"
              >
                {/* Data Cells */}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={col.width ? { width: col.width, minWidth: col.width } : (col.minWidth ? { minWidth: col.minWidth } : {})}
                    className={`${cellPadding} text-xs md:text-sm text-college-navy/80 dark:text-white/80 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors break-words ${!col.width && !col.minWidth ? "min-w-[120px]" : ""} ${col.className || ""}`}
                  >
                    {typeof col.render === "function" ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {/* Action Buttons Cell (if they exist) */}
                {actionButtons && (
                  <td className={`${cellPadding} whitespace-nowrap sm:text-right align-middle`}>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-end gap-2 md:gap-3 min-w-[140px]">
                      {actionButtons(row).map((btn, i) => (
                        <button
                          key={i}
                          onClick={btn.onClick}
                          className={`${btn.className} w-full sm:w-24 lg:w-28 h-8 md:h-9 flex items-center justify-center text-[11px] sm:text-xs md:text-sm rounded-sm hover:shadow-md transition-all duration-200 whitespace-nowrap font-bold border border-transparent`}
                          title={btn.label}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
