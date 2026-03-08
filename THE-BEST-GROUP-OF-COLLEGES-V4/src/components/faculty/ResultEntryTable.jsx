import React, { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import PublicButton from "../shared/PublicButton";

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
    if (percentage >= 80) return "text-primary-700 dark:text-emerald-400 bg-primary-50 dark:bg-emerald-900/30";
    if (percentage >= 60) return "text-primary-700 dark:text-college-gold bg-primary-50 dark:bg-blue-900/30";
    if (percentage >= 40) return "text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-white/10";
    return "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30";
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
    <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-navy/20 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10 text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Roll No.
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Student Name
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Marks Obtained
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                %
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Grade
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">
                Remarks
              </th>
              <th className="px-6 py-4 text-center font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {rows.map((row) => {
              const studentMarks = marks[row.studentId];
              const percentage = getMarksPercentage(studentMarks, row.maxMarks);
              const gradeColor = getGradeColor(percentage);
              const gradeLetter = getGradeLetter(percentage);
              const isGraded = studentMarks > 0;

              return (
                <tr key={row.studentId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {row.rollNo}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {row.studentName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{row.studentId}</p>
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
                        className="w-20 px-3 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-college-gold/20 focus:border-transparent dark:focus:border-college-gold transition-all dark:text-white"
                      />
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
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
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-college-gold/20 focus:border-transparent dark:focus:border-college-gold transition-all dark:text-white dark:placeholder-gray-400"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isGraded ? (
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                          <Check size={14} />
                          Graded
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-college-gold/10 text-primary-700 dark:text-college-gold border border-primary-100 dark:border-college-gold/20">
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
      <div className="px-6 py-4 flex justify-end border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
        <PublicButton
          variant="secondary"
          shape="slanted"
          className="w-full"
        >
          Save All Marks
        </PublicButton>
      </div>
    </div>
  );
};

export default ResultEntryTable;
