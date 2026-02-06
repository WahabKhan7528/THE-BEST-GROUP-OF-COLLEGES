import { clsx } from 'clsx';

const Table = ({ children, className, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={clsx(
          'min-w-full divide-y divide-gray-200',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

Table.Head = function TableHead({ children, className, ...props }) {
  return (
    <thead className={clsx('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
};

Table.Body = function TableBody({ children, className, ...props }) {
  return (
    <tbody
      className={clsx('bg-white divide-y divide-gray-200', className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

Table.Row = function TableRow({ children, className, ...props }) {
  return (
    <tr
      className={clsx(
        'hover:bg-gray-50 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

Table.HeaderCell = function TableHeaderCell({ children, className, ...props }) {
  return (
    <th
      className={clsx(
        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

Table.Cell = function TableCell({ children, className, ...props }) {
  return (
    <td
      className={clsx(
        'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

export default Table;