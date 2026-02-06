import { useState } from 'react';

const statusStyles = {
  Submitted: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Pending: 'bg-amber-50 text-amber-700 border-amber-100',
  Late: 'bg-rose-50 text-rose-700 border-rose-100',
};

const AssignmentCard = ({ assignment }) => {
  const [note, setNote] = useState('');
  const [fileName, setFileName] = useState('');
  const badge = statusStyles[assignment.status] || 'bg-gray-50 text-gray-700 border-gray-100';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {assignment.subject}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">
            {assignment.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              Due {assignment.dueDate}
            </span>
            <span className="text-gray-400">•</span>
            <a href={assignment.attachment} className="text-purple-700 hover:text-purple-800 font-medium">
              Attached file
            </a>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge}`}>
          {assignment.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Upload file
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {fileName && <span className="text-xs text-gray-500">Selected: {fileName}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Notes
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add clarification or links..."
            className="rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Last submission status: {assignment.status}
        </p>
        <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 text-sm font-semibold">
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;

