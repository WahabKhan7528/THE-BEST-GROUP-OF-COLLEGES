import React, { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import PublicButton from "../shared/PublicButton";
import Badge from "../shared/Badge";
import Table from "../portal-shared/Table";

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

const inputBase =
  "px-3 py-2 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white";

const ResultEntryTable = ({ rows }) => {
  // Merge marks and remarks into a single state object
  const [data, setData] = useState(
    rows.reduce(
      (acc, r) => ({
        ...acc,
        [r.studentId]: { marks: r.marks || 0, remarks: r.remarks || "" },
      }),
      {},
    ),
  );

  const updateField = (id, field, val) =>
    setData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));

  const columns = [
    { key: "rollNo", label: "Roll No." },
    { key: "studentName", label: "Student Name" },
    { key: "marks", label: "Marks Obtained" },
    { key: "percentage", label: "%" },
    { key: "grade", label: "Grade" },
    { key: "remarks", label: "Remarks" },
    { key: "status", label: "Status" },
  ];

  const tableData = rows.map((row) => {
    const { marks = 0, remarks = "" } = data[row.studentId] || {};
    const { letter, variant, percentage } = getGradeDetails(marks, row.maxMarks);
    const isGraded = marks > 0;

    return {
      id: row.studentId,
      rollNo: <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.rollNo}</span>,
      studentName: (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{row.studentName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.studentId}</p>
        </div>
      ),
      marks: (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <input
            type="number"
            value={marks}
            className={`w-20 ${inputBase}`}
            onChange={(e) => updateField(row.studentId, "marks", Math.min(e.target.value, row.maxMarks))}
          />
          <span className="text-gray-500 text-xs">/ {row.maxMarks}</span>
        </div>
      ),
      percentage: (
        <Badge variant={variant} className="min-w-[45px]">
          {percentage}%
        </Badge>
      ),
      grade: (
        <Badge variant={variant} className="min-w-[32px]">
          {letter}
        </Badge>
      ),
      remarks: (
        <input
          type="text"
          placeholder="Feedback..."
          value={remarks}
          className={`w-full ${inputBase}`}
          onChange={(e) => updateField(row.studentId, "remarks", e.target.value)}
        />
      ),
      status: (
        <Badge variant={isGraded ? "success" : "gold"} className="gap-1.5 w-fit">
          {isGraded ? <Check size={14} /> : <AlertCircle size={14} />}
          {isGraded ? "Graded" : "Pending"}
        </Badge>
      ),
    };
  });

  return (
    <div className="space-y-4">
      <Table columns={columns} data={tableData} />
      <div className="px-3 sm:px-4 md:px-6 py-4 flex justify-end bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm">
        <PublicButton
          variant="secondary"
          shape="slanted"
          className="w-full sm:w-auto"
        >
          Save All Marks
        </PublicButton>
      </div>
    </div>
  );
};

export default ResultEntryTable;
