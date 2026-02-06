import { FileText, CheckCircle2, Clock } from 'lucide-react';

const statusBadge = {
  'On-time': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Late: 'bg-amber-50 text-amber-700 border-amber-100',
};

const SubmissionCard = ({ submission }) => {
  const badge = statusBadge[submission.status] || 'bg-gray-50 text-gray-700 border-gray-100';

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {submission.studentId}
          </p>
          <h3 className="text-sm font-semibold text-gray-900">{submission.studentName}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <Clock size={14} />
            <span>Submitted {submission.submittedAt}</span>
          </div>
          {submission.remarks && (
            <p className="text-xs text-gray-500 mt-1">Remarks: {submission.remarks}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
          {submission.status}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <a href={submission.file} className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-800">
          <FileText size={14} />
          View file
        </a>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Marks"
            className="w-24 rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Remarks"
            className="w-40 rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-800">
            <CheckCircle2 size={14} />
            Mark graded
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;

