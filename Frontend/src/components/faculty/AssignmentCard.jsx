import { Link } from 'react-router-dom';
import { Calendar, FileText, Pencil, Trash2, ClipboardList } from 'lucide-react';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {assignment.classSection} • {assignment.subject}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1 font-semibold text-gray-900">
              <Calendar size={14} />
              Due {assignment.dueDate}
            </span>
            <span className="text-gray-400">•</span>
            <span>Max {assignment.maxMarks} marks</span>
            {assignment.attachment && (
              <>
                <span className="text-gray-400">•</span>
                <a href={assignment.attachment} className="flex items-center gap-1 text-purple-700 hover:text-purple-800">
                  <FileText size={14} />
                  Attachment
                </a>
              </>
            )}
          </div>
        </div>
        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
          Published
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Link
          to={`/faculty/submissions/${assignment.id}`}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-sm font-semibold text-gray-800 hover:bg-gray-200"
        >
          <ClipboardList size={14} />
          View submissions
        </Link>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold text-gray-700 hover:bg-gray-50">
          <Pencil size={14} />
          Edit
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold text-rose-600 hover:bg-rose-50">
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;

