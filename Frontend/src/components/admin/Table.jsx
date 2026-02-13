const Table = ({ columns, data, actionButtons }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-white/80">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {actionButtons && (
                <th className="px-3 md:px-6 py-3 md:py-4 text-right text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white/40">
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-primary-50/50 transition-colors duration-150 group"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {row[col.key]}
                  </td>
                ))}

                {actionButtons && (
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-xs md:text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 md:gap-3">
                      {actionButtons(row).map((btn, i) => (
                        <button
                          key={i}
                          onClick={btn.onClick}
                          className={`${btn.className} px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200`}
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

