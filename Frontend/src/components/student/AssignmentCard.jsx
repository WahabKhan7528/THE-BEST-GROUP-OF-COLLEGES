import { useState } from 'react';

const statusStyles = {
  Submitted: 'bg-primary-50 text-emerald-700 border-primary-100',
  Pending: 'bg-primary-50 text-primary-700 border-primary-100',
  Late: 'bg-red-50 text-red-700 border-red-100',
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
    <div className="bg-white border rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
            {assignment.subject}
          </p>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {assignment.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mt-1">{assignment.description}</p>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-xs md:text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              Due {assignment.dueDate}
            </span>
            <span className="text-gray-400">•</span>
            <a href={assignment.attachment} className="text-primary-700 hover:text-primary-800 font-medium">
              Attached file
            </a>
          </div>
        </div>
        <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold border self-start ${badge}`}>
          {assignment.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col gap-2 text-xs md:text-sm text-gray-700">
          Upload file
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          {fileName && <span className="text-[10px] md:text-xs text-gray-500">Selected: {fileName}</span>}
        </label>

        <label className="flex flex-col gap-2 text-xs md:text-sm text-gray-700">
          Notes
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add clarification or links..."
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 md:gap-3">
        <p className="text-[10px] md:text-xs text-gray-500">
          Last submission status: {assignment.status}
        </p>
        <button className="px-4 md:px-5 py-2 md:py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all">
          Submit Assignment
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;

