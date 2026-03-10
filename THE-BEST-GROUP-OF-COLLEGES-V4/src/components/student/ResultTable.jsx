const ResultTable = ({ results, showTranscript }) => {
  return (
    <div className="bg-white dark:bg-white/5 border dark:border-college-gold/15 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-college-gold/15">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Semester Results</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Marks, grades, and credits</p>
        </div>
        {showTranscript && (
          <button className="px-4 py-2 bg-college-navy dark:bg-college-gold text-white dark:text-college-navy rounded-lg text-sm font-semibold hover:bg-college-navy/90 dark:hover:bg-college-gold/90 transition-colors">
            Download Transcript
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-college-gold/15 text-sm">
          <thead className="bg-gray-50 dark:bg-college-navy/50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Course</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Semester</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Marks</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Grade</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-college-gold/10">
            {results.map((result) => (
              <tr key={`${result.course}-${result.semester}`} className="hover:bg-gray-50 dark:hover:bg-college-gold/5">
                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{result.course}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{result.semester}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{result.marks}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-college-navy/10 text-college-navy dark:bg-college-gold/15 dark:text-college-gold">
                    {result.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{result.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;

