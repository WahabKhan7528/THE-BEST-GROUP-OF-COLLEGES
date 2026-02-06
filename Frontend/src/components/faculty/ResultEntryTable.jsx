import React, { useState } from "react";
import { Check, AlertCircle } from "lucide-react";

const ResultEntryTable = ({ rows }) => {
  const [marks, setMarks] = useState(
    rows.reduce((acc, row) => {
      acc[row.studentId] = row.marks;
      return acc;
    }, {}),
  );

  const [remarks, setRemarks] = useState(
    rows.reduce((acc, row) => {
      acc[row.studentId] = row.remarks || "";
      return acc;
    }, {}),
  );

  const handleMarksChange = (studentId, value, maxMarks) => {
    const numValue = parseInt(value) || 0;
    // Prevent marks from exceeding max marks
    if (numValue <= maxMarks) {
      setMarks({ ...marks, [studentId]: numValue });
    }
  };

  const handleRemarksChange = (studentId, value) => {
    setRemarks({ ...remarks, [studentId]: value });
  };

  const getMarksPercentage = (studentMarks, maxMarks) => {
    if (!studentMarks || !maxMarks) return 0;
    return ((studentMarks / maxMarks) * 100).toFixed(1);
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 80) return "text-emerald-700 bg-emerald-50";
    if (percentage >= 60) return "text-blue-700 bg-blue-50";
    if (percentage >= 40) return "text-amber-700 bg-amber-50";
    return "text-red-700 bg-red-50";
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 whitespace-nowrap">
                Roll No.
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Student Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 whitespace-nowrap">
                Marks Obtained
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 whitespace-nowrap">
                %
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 whitespace-nowrap">
                Grade
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Remarks
              </th>
              <th className="px-6 py-4 text-center font-semibold text-gray-700 whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row) => {
              const studentMarks = marks[row.studentId];
              const percentage = getMarksPercentage(studentMarks, row.maxMarks);
              const gradeColor = getGradeColor(percentage);
              const gradeLetter = getGradeLetter(percentage);
              const isGraded = studentMarks > 0;

              return (
                <tr key={row.studentId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 whitespace-nowrap">
                      {row.rollNo}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {row.studentName}
                      </p>
                      <p className="text-xs text-gray-500">{row.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={row.maxMarks}
                        value={marks[row.studentId] || 0}
                        onChange={(e) =>
                          handleMarksChange(
                            row.studentId,
                            e.target.value,
                            row.maxMarks,
                          )
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <span className="text-gray-500 text-xs">
                        / {row.maxMarks}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${gradeColor}`}
                    >
                      {percentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${gradeColor}`}
                    >
                      {gradeLetter}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      placeholder="Add feedback..."
                      value={remarks[row.studentId] || ""}
                      onChange={(e) =>
                        handleRemarksChange(row.studentId, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isGraded ? (
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          <Check size={14} />
                          Graded
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                          <AlertCircle size={14} />
                          Pending
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 flex justify-end border-t bg-gray-50">
        <button className="px-6 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800 transition">
          Save All Marks
        </button>
      </div>
    </div>
  );
};

export default ResultEntryTable;
