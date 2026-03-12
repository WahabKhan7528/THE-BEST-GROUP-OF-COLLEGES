import { FileText, CheckCircle2, Clock } from 'lucide-react';
import Card from '../shared/Card';
import PublicButton from '../shared/PublicButton';
import { useFacultyContext } from '../../context/FacultyContext';

const statusBadge = {
  'On-time': 'bg-college-navy/5 dark:bg-emerald-900/30 text-college-navy dark:text-emerald-400 border-college-navy/10 dark:border-emerald-700/40',
  Late: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-700/40',
};

const SubmissionCard = ({ submission }) => {
  const { isDarkMode } = useFacultyContext();
  const badge = statusBadge[submission.status] || 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700';

  return (
    <Card hover={false} className="p-4 md:p-5 space-y-4 border border-transparent dark:border-college-gold/60 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">
            {submission.studentId}
          </p>
          <h3 className="text-sm md:text-base font-bold text-college-navy dark:text-white mt-1">
            {submission.studentName}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2">
            <Clock size={16} className="text-college-navy dark:text-college-gold" />
            <span className="font-semibold">Submitted {submission.submittedAt}</span>
          </div>
        </div>
        <span className={`inline-flex items-center justify-center text-center shrink-0 whitespace-nowrap px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border uppercase tracking-wider shadow-sm ${badge}`}>
          {submission.status}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
        <a
          href={submission.file}
          className="inline-flex items-center gap-2 text-college-navy dark:text-college-gold font-bold hover:underline transition-all text-xs md:text-sm"
        >
          <FileText size={18} />
          View student submission
        </a>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="number"
            placeholder="Marks"
            className="w-full sm:w-24 px-3 py-2 rounded-xl border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <input
            type="text"
            placeholder="Grading remarks..."
            className="w-full sm:w-48 px-3 py-2 rounded-xl border border-gray-200 dark:border-college-navy/20 bg-white dark:bg-college-navy/40 dark:text-white text-sm shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-1 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          <PublicButton
            variant={isDarkMode ? "secondary" : "primary"}
            size="sm"
            shape="slanted"
            className="w-full sm:w-auto font-bold whitespace-nowrap"
            icon={CheckCircle2}
          >
            Mark Graded
          </PublicButton>
        </div>
      </div>
    </Card>
  );
};

export default SubmissionCard;
