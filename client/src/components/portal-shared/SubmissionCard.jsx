import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Card from "../shared/Card";
import PublicButton from "../shared/PublicButton";

const statusBadge = {
  "On-time":
    "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-700/40",
  Late: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-700/40",
  Pending:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 border-amber-100 dark:border-amber-800/30",
};

const SubmissionCard = ({ submission, role = "faculty", onGrade }) => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const maxMarks = submission.maxMarks || 100;
  const hasGrade = submission.marks !== undefined && submission.marks !== null;
  const [marks, setMarks] = useState(submission.marks ?? "");
  const [remarks, setRemarks] = useState(submission.remarks ?? "");
  const [isEditing, setIsEditing] = useState(!hasGrade);
  const [error, setError] = useState("");

  useEffect(() => {
    setMarks(submission.marks ?? "");
    setRemarks(submission.remarks ?? "");
    setIsEditing(!hasGrade);
    setError("");
  }, [submission.id, submission.marks, submission.remarks, hasGrade]);

  const handleSave = async () => {
    const parsedMarks = Number(marks);

    if (Number.isNaN(parsedMarks)) {
      setError("Enter a valid mark.");
      return;
    }

    if (parsedMarks < 0 || parsedMarks > maxMarks) {
      setError(`Marks must be between 0 and ${maxMarks}.`);
      return;
    }

    setError("");

    try {
      await onGrade?.({ id: submission.id, marks: parsedMarks, remarks, maxMarks });
      setIsEditing(false);
    } catch {
      setError("Unable to save grade right now.");
    }
  };

  const badge =
    statusBadge[submission.status] ||
    "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700";

  const isStudent = role === "student";

  return (
    <Card
      hover={false}
      className="p-4 md:p-5 space-y-4 border border-college-navy/10 dark:border-college-gold/30 shadow-2xl bg-white dark:bg-college-navy transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1">
          {isStudent ? (
            <>
              <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">
                {submission.subject}
              </p>
              <h3 className="text-sm md:text-base font-bold text-college-navy dark:text-white mt-1">
                {submission.title}
              </h3>
            </>
          ) : (
            <>
              <p className="text-[10px] md:text-xs text-college-navy/40 dark:text-college-gold/60 uppercase tracking-[0.2em] font-black">
                {submission.studentId}
              </p>
              <h3 className="text-sm md:text-base font-black text-college-navy dark:text-white mt-1 uppercase tracking-tight">
                {submission.studentName}
              </h3>
            </>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">Submitted:</span>{" "}
              {submission.submittedAt}
            </div>

            {isStudent && hasGrade && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                Score: {submission.marks}/{maxMarks}
              </div>
            )}
          </div>
        </div>

        <span
          className={`inline-flex items-center justify-center text-center shrink-0 whitespace-nowrap px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border uppercase tracking-wider shadow-sm self-start ${badge}`}
        >
          {submission.status}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-college-navy/5 dark:border-white/5">
        <a
          href={submission.file}
          className="inline-flex items-center gap-2 text-college-navy dark:text-college-gold font-bold hover:underline transition-all text-xs md:text-sm"
        >
          <FileText size={18} />
          {isStudent ? "View your submission" : "View student submission"}
        </a>

        {isStudent ? (
          submission.remarks && (
            <div className="flex-1 w-full max-w-full lg:max-w-md p-3 rounded-sm bg-college-navy/5 dark:bg-white/5 border border-college-navy/10 dark:border-white/10 ml-0 lg:ml-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">
                  Instructor Feedback
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 italic break-words">
                  "{submission.remarks}"
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="flex-1 space-y-3">
            {hasGrade && !isEditing ? (
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-college-navy dark:text-college-gold">
                    Grade: {submission.marks}/{maxMarks}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {submission.remarks || "No remarks added."}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Maximum marks: {maxMarks}
                  </p>
                </div>

                <PublicButton
                  variant={isDarkMode ? "secondary" : "primary"}
                  size="sm"
                  shape="slanted"
                  className="w-full sm:w-auto font-bold whitespace-nowrap"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Grade
                </PublicButton>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="space-y-1">
                  <input
                    type="number"
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full sm:w-24 px-3 py-2 rounded-sm border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 sm:w-24">
                    Max {maxMarks} marks
                  </p>
                </div>
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    placeholder="Grading remarks..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-3 py-2 rounded-sm border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                  {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
                </div>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <PublicButton
                    variant={isDarkMode ? "secondary" : "primary"}
                    size="sm"
                    shape="slanted"
                    className="w-full sm:w-auto font-bold whitespace-nowrap"
                    onClick={handleSave}
                  >
                    {hasGrade ? "Save Grade" : "Mark Graded"}
                  </PublicButton>
                  {hasGrade && isEditing && (
                    <PublicButton
                      variant="secondary"
                      size="sm"
                      shape="slanted"
                      className="w-full sm:w-auto font-bold whitespace-nowrap"
                      onClick={() => {
                        setMarks(submission.marks ?? "");
                        setRemarks(submission.remarks ?? "");
                        setIsEditing(false);
                        setError("");
                      }}
                    >
                      Cancel
                    </PublicButton>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubmissionCard;
