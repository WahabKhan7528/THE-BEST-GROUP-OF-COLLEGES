const Table = ({ columns, data, actions }) => {
  return (
    <div className="bg-white/95 border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left font-semibold text-neutral-700">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left font-semibold text-neutral-700">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.map((row) => (
              <tr key={row.id || row.key} className="hover:bg-neutral-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-neutral-700">
                    {row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-6 py-4">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

