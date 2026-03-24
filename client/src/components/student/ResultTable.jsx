const ResultTable = ({ results, showTranscript }) => {
  return (
    <div className="bg-white dark:bg-white/5 border dark:border-college-gold/15 rounded-sm shadow-sm overflow-hidden transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b dark:border-college-gold/15">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Semester Results
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Marks, grades, and credits
          </p>
        </div>
        {showTranscript && (
          <button className="w-full sm:w-auto px-4 py-2 bg-college-navy dark:bg-college-gold text-white dark:text-college-navy rounded-sm text-sm font-semibold hover:bg-college-navy/90 dark:hover:bg-college-gold/90 transition-colors">
            Download Transcript
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-college-gold/15 text-xs sm:text-sm">
          <thead className="bg-gray-50 dark:bg-college-navy/50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Course
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Semester
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Marks
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Grade
              </th>
              <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Credits
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-college-gold/10">
            {results.map((result) => (
              <tr
                key={`${result.course}-${result.semester}`}
                className="hover:bg-gray-50 dark:hover:bg-college-gold/5"
              >
                <td className="px-4 sm:px-6 py-4 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                  {result.course}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {result.semester}
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-900 dark:text-white font-semibold whitespace-nowrap">
                  {result.marks}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className="inline-flex px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-college-navy/10 text-college-navy dark:bg-college-gold/15 dark:text-college-gold whitespace-nowrap">
                    {result.grade}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {result.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;
