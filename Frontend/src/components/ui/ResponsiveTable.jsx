const ResponsiveTable = ({ columns, data, actions, striped = true }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Desktop View - Scrollable Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${
                  striped && idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(row)}
                          className={`px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${action.className}`}
                        >
                          {action.label}
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

      {/* Mobile View - Card Layout */}
      <div className="md:hidden divide-y divide-gray-200">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 bg-white hover:bg-gray-50 transition-colors"
          >
            {/* Card Header */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {columns.slice(0, 2).map((col) => (
                <div key={col.key}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {col.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 break-words">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </p>
                </div>
              ))}
            </div>

            {/* Card Body - Remaining columns */}
            {columns.length > 2 && (
              <div className="space-y-3 mb-4">
                {columns.slice(2).map((col) => (
                  <div
                    key={col.key}
                    className="flex justify-between items-start"
                  >
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {col.label}
                    </p>
                    <p className="text-sm text-gray-700 text-right ml-2">
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Card Actions */}
            {actions && (
              <div className="pt-4 border-t border-gray-200 flex gap-2 flex-wrap">
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => action.onClick(row)}
                    className={`flex-1 min-w-[100px] px-3 py-2 rounded text-xs sm:text-sm font-semibold transition-colors ${action.className}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">No data available</p>
        </div>
      )}
    </div>
  );
};

export default ResponsiveTable;
