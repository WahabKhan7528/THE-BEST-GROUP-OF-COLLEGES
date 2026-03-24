import React from "react";

const Table = ({ columns, data, actionButtons }) => {
  const cellPadding = "px-3 sm:px-4 md:px-6 py-3 md:py-4";

  return (
    <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-dark-border rounded-sm shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-dark-border">
          {/* 1. THE HEADER */}
          <thead>
            <tr className="bg-college-navy/5 dark:bg-college-gold/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${cellPadding} text-left text-[10px] md:text-xs font-bold text-college-navy dark:text-college-gold uppercase tracking-wider whitespace-nowrap`}
                >
                  {col.label}
                </th>
              ))}
              {actionButtons && (
                <th
                  className={`${cellPadding} text-right text-[10px] md:text-xs font-bold text-college-navy dark:text-college-gold uppercase tracking-wider`}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* 2. THE BODY */}
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border bg-white dark:bg-college-navy">
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-college-navy/5 dark:hover:bg-college-gold/10 transition-colors duration-150 group"
              >
                {/* Data Cells */}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${cellPadding} text-xs md:text-sm text-gray-700 dark:text-gray-300 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors break-words min-w-[120px]`}
                  >
                    {row[col.key]}
                  </td>
                ))}

                {/* Action Buttons Cell (if they exist) */}
                {actionButtons && (
                  <td className={`${cellPadding} whitespace-nowrap text-right`}>
                    <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3 min-w-[140px]">
                      {actionButtons(row).map((btn, i) => (
                        <button
                          key={i}
                          onClick={btn.onClick}
                          className={`${btn.className} px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-sm hover:shadow-sm transition-all duration-200 whitespace-nowrap`}
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
