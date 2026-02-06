const ResultTable = ({ results, showTranscript }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Semester Results</h3>
          <p className="text-sm text-gray-500">Marks, grades, and credits</p>
        </div>
        {showTranscript && (
          <button className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800">
            Download Transcript
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Course</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Semester</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Marks</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Grade</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Credits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result) => (
              <tr key={`${result.course}-${result.semester}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{result.course}</td>
                <td className="px-6 py-4 text-gray-600">{result.semester}</td>
                <td className="px-6 py-4 text-gray-900 font-semibold">{result.marks}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                    {result.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{result.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;

