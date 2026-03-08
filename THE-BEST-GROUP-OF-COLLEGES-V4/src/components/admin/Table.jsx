const TableHeader = ({ columns, hasActions }) => (
  <thead>
    <tr className="bg-college-navy/5 dark:bg-college-gold/10">
      {columns.map((col) => (
        <th
          key={col.key}
          className="px-3 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-xs font-bold text-college-navy dark:text-college-gold uppercase tracking-wider"
        >
          {col.label}
        </th>
      ))}
      {hasActions && (
        <th className="px-3 md:px-6 py-3 md:py-4 text-right text-[10px] md:text-xs font-bold text-college-navy dark:text-college-gold uppercase tracking-wider">
          Actions
        </th>
      )}
    </tr>
  </thead>
);

const TableRow = ({ row, columns, actionButtons }) => (
  <tr className="hover:bg-college-navy/5 dark:hover:bg-college-gold/10 transition-colors duration-150 group">
    {columns.map((col) => (
      <td
        key={col.key}
        className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors"
      >
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
              className={`${btn.className} px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-lg hover:shadow-sm transition-all duration-200`}
              title={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </td>
    )}
  </tr>
);

const Table = ({ columns, data, actionButtons }) => {
  return (
    <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-dark-border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-dark-border">
          <TableHeader columns={columns} hasActions={!!actionButtons} />
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border bg-white dark:bg-college-navy">
            {data.map((row, idx) => (
              <TableRow
                key={row.id || idx}
                row={row}
                columns={columns}
                actionButtons={actionButtons}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
