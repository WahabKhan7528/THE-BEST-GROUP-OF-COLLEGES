import React, { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import PublicButton from "../shared/PublicButton";
import Badge from "../shared/Badge";

// Helper to get grade details in one pass
const getGradeDetails = (marks, max) => {
  const percentage = max ? ((marks / max) * 100).toFixed(1) : 0;
  if (percentage >= 90) return { letter: "A", variant: "success", percentage };
  if (percentage >= 80) return { letter: "A-", variant: "success", percentage };
  if (percentage >= 70) return { letter: "B+", variant: "gold", percentage };
  if (percentage >= 60) return { letter: "B", variant: "gold", percentage };
  if (percentage >= 50) return { letter: "C", variant: "info", percentage };
  return { letter: "F", variant: "danger", percentage };
};

const inputBase = "px-3 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white";

const ResultEntryTable = ({ rows }) => {
  // Merge marks and remarks into a single state object
  const [data, setData] = useState(rows.reduce((acc, r) => ({
    ...acc, [r.studentId]: { marks: r.marks || 0, remarks: r.remarks || "" }
  }), {}));

  const updateField = (id, field, val) => setData(prev => ({
    ...prev, [id]: { ...prev[id], [field]: val }
  }));

  return (
    <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-navy/20 rounded-2xl shadow-sm overflow-hidden transition-all">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10 text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
            <tr className="[&>th]:px-6 [&>th]:py-4 [&>th]:text-left [&>th]:font-semibold [&>th]:text-gray-700 [&>th]:dark:text-gray-300">
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Marks Obtained</th>
              <th>%</th>
              <th>Grade</th>
              <th>Remarks</th>
              <th className="!text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {rows.map((row) => {
              const { marks = 0, remarks = "" } = data[row.studentId] || {};
              const { letter, variant, percentage } = getGradeDetails(marks, row.maxMarks);
              const isGraded = marks > 0;

              return (
                <tr key={row.studentId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors [&>td]:px-6 [&>td]:py-4">
                  <td className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.rollNo}</td>
                  <td>
                    <p className="font-semibold text-gray-900 dark:text-white">{row.studentName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.studentId}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={marks} 
                        className={`w-20 ${inputBase}`}
                        onChange={e => updateField(row.studentId, 'marks', Math.min(e.target.value, row.maxMarks))} 
                      />
                      <span className="text-gray-500 text-xs">/ {row.maxMarks}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={variant} className="min-w-[45px]">{percentage}%</Badge>
                  </td>
                  <td>
                    <Badge variant={variant} className="min-w-[32px]">{letter}</Badge>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      placeholder="Feedback..." 
                      value={remarks} 
                      className={`w-full ${inputBase}`}
                      onChange={e => updateField(row.studentId, 'remarks', e.target.value)} 
                    />
                  </td>
                  <td className="text-center">
                    <Badge variant={isGraded ? "success" : "gold"} className="gap-1.5">
                      {isGraded ? <Check size={14} /> : <AlertCircle size={14} />}
                      {isGraded ? 'Graded' : 'Pending'}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 flex justify-end bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10">
        <PublicButton variant="secondary" shape="slanted" className="w-full sm:w-auto">
          Save All Marks
        </PublicButton>
      </div>
    </div>
  );
};

export default ResultEntryTable;
