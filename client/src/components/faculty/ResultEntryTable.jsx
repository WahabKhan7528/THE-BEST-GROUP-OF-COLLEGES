import React, { useEffect, useState } from "react";
import { Check, AlertCircle } from "lucide-react";
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

const ResultEntryTable = ({ rows, onSave, readOnly = false }) => {
  const buildState = (items) =>
    items.reduce(
      (acc, row) => ({
        ...acc,
        [row.id]: {
          marks: row.marks ?? "",
          remarks: row.remarks ?? "",
          editing: row.marks === undefined || row.marks === null,
          error: "",
        },
      }),
      {},
    );

  const [data, setData] = useState(() => buildState(rows));

  useEffect(() => {
    setData(buildState(rows));
  }, [rows]);

  const updateField = (id, field, val) =>
    setData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }));

  const startEditing = (id) =>
    setData((prev) => ({
      ...prev,
      [id]: { ...prev[id], editing: true, error: "" },
    }));

  const cancelEditing = (row) =>
    setData((prev) => ({
      ...prev,
      [row.id]: {
        marks: row.marks ?? "",
        remarks: row.remarks ?? "",
        editing: false,
        error: "",
      },
    }));

  const saveRow = async (row) => {
    const current = data[row.id] || {};
    const maxMarks = row.maxMarks || 100;
    const parsedMarks = Number(current.marks);

    if (Number.isNaN(parsedMarks)) {
      setData((prev) => ({
        ...prev,
        [row.id]: { ...prev[row.id], error: "Enter a valid mark." },
      }));
      return;
    }

    if (parsedMarks < 0 || parsedMarks > maxMarks) {
      setData((prev) => ({
        ...prev,
        [row.id]: { ...prev[row.id], error: `Marks must be between 0 and ${maxMarks}.` },
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      [row.id]: { ...prev[row.id], error: "" },
    }));

    try {
      await onSave?.(row, {
        marks: parsedMarks,
        remarks: current.remarks || "",
      });

      setData((prev) => ({
        ...prev,
        [row.id]: { ...prev[row.id], editing: false },
      }));
    } catch {
      setData((prev) => ({
        ...prev,
        [row.id]: { ...prev[row.id], error: "Unable to save marks right now." },
      }));
    }
  };

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
    const { marks = "", remarks = "", editing = false, error = "" } = data[row.id] || {};
    const maxMarks = row.maxMarks || 100;
    const hasGrade = row.marks !== undefined && row.marks !== null;
    const draftMarks = Number(marks);
    const displayMarks = Number.isNaN(draftMarks) ? null : draftMarks;
    const activeMarks = !readOnly && editing ? displayMarks : row.marks;
    const gradeDetails = activeMarks === null || activeMarks === undefined
      ? null
      : getGradeDetails(activeMarks, maxMarks);
    const isGraded = hasGrade;

    return {
      id: row.id,
      sourceRow: row,
      rollNo: <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.rollNo}</span>,
      studentName: (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{row.studentName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{row.studentId}</p>
        </div>
      ),
      marks: (
        !readOnly && (editing || !hasGrade) ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <input
                type="number"
                value={marks}
                className={`w-20 ${inputBase}`}
                onChange={(e) => updateField(row.id, "marks", e.target.value)}
              />
              <span className="text-gray-500 text-xs">/ {maxMarks}</span>
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Max {maxMarks} marks</p>
            {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
              {row.marks}/{maxMarks}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Saved grade</p>
          </div>
        )
      ),
      percentage: (
        <Badge variant={gradeDetails?.variant || "gold"} className="min-w-[45px]">
          {gradeDetails ? `${gradeDetails.percentage}%` : "--"}
        </Badge>
      ),
      grade: (
        <Badge variant={gradeDetails?.variant || "gold"} className="min-w-[32px]">
          {gradeDetails ? gradeDetails.letter : "--"}
        </Badge>
      ),
      remarks: (
        !readOnly && (editing || !hasGrade) ? (
          <input
            type="text"
            placeholder="Feedback..."
            value={remarks}
            className={`w-full ${inputBase}`}
            onChange={(e) => updateField(row.id, "remarks", e.target.value)}
          />
        ) : (
          <span className="text-gray-700 dark:text-gray-300">{row.remarks || "-"}</span>
        )
      ),
      status: (
        <Badge variant={isGraded ? "success" : "gold"} className="gap-1.5 w-fit">
          {isGraded ? <Check size={14} /> : <AlertCircle size={14} />}
          {isGraded ? "Graded" : "Pending"}
        </Badge>
      ),
    };
  });

  const actionButtons = (row) => {
    if (readOnly) {
      return [];
    }

    const sourceRow = row.sourceRow || row;
    const current = data[sourceRow.id] || {};
    const actions = [];

    if (current.editing || sourceRow.marks === undefined || sourceRow.marks === null) {
      actions.push({
        label: "Save",
        onClick: () => saveRow(sourceRow),
        className: "text-college-navy hover:text-college-navy/90 font-medium bg-college-navy/5 border border-college-navy/10 dark:bg-college-gold/10 dark:border-college-gold/20 dark:text-college-gold dark:hover:text-college-gold",
      });
    }

    if (sourceRow.marks !== undefined && sourceRow.marks !== null && !current.editing) {
      actions.push({
        label: "Edit",
        onClick: () => startEditing(sourceRow.id),
        className: "text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 dark:bg-emerald-900 dark:border-transparent dark:text-gray-300 dark:hover:bg-emerald-800",
      });
    }

    if (current.editing && sourceRow.marks !== undefined && sourceRow.marks !== null) {
      actions.push({
        label: "Cancel",
        onClick: () => cancelEditing(sourceRow),
        className: "text-gray-600 hover:text-gray-700 font-medium bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10",
      });
    }

    return actions;
  };

  return (
    <div className="space-y-4">
      <Table columns={columns} data={tableData} actionButtons={actionButtons} />
    </div>
  );
};

export default ResultEntryTable;
