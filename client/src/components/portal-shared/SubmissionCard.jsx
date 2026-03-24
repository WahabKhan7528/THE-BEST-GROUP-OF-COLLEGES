import { FileText } from "lucide-react";
import Card from "../shared/Card";
import PublicButton from "../shared/PublicButton";
import { useThemeContext } from "../../context/ThemeContext";

const statusBadge = {
  "On-time":
    "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-700/40",
  Late: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-700/40",
  Pending:
    "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 border-amber-100 dark:border-amber-800/30",
};

const SubmissionCard = ({ submission, role = "faculty", onGrade }) => {
  const { isDarkMode } = useThemeContext();
  const badge =
    statusBadge[submission.status] ||
    "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700";

  const isStudent = role === "student";

  return (
    <Card
      hover={false}
      className="p-4 md:p-5 space-y-4 border border-gray-200 dark:border-college-gold/50 shadow-sm transition-all duration-300"
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
              <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">
                {submission.studentId}
              </p>
              <h3 className="text-sm md:text-base font-bold text-college-navy dark:text-white mt-1">
                {submission.studentName}
              </h3>
            </>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">Submitted:</span>{" "}
              {submission.submittedAt}
            </div>

            {isStudent && submission.marks !== undefined && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                Score: {submission.marks}/{submission.maxMarks || 100}
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

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="number"
              placeholder="Marks"
              defaultValue={submission.marks}
              className="w-full sm:w-24 px-3 py-2 rounded-sm border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <input
              type="text"
              placeholder="Grading remarks..."
              defaultValue={submission.remarks}
              className="w-full sm:w-48 px-3 py-2 rounded-sm border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <PublicButton
              variant={isDarkMode ? "secondary" : "primary"}
              size="sm"
              shape="slanted"
              className="w-full sm:w-auto font-bold whitespace-nowrap"
              onClick={() => onGrade?.(submission.studentId)}
            >
              Mark Graded
            </PublicButton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubmissionCard;
