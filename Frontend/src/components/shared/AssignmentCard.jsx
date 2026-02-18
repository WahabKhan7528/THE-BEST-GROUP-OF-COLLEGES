import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Pencil, Trash2, ClipboardList } from 'lucide-react';

/**
 * Shared AssignmentCard
 *
 * variant="faculty" (default) — shows Edit / Delete / View Submissions action buttons
 * variant="student"           — shows file upload form + Submit button
 */

const statusStyles = {
    Submitted: 'bg-primary-50 text-emerald-700 border-primary-100',
    Pending: 'bg-primary-50 text-primary-700 border-primary-100',
    Late: 'bg-red-50 text-red-700 border-red-100',
};

const AssignmentCard = ({ assignment, role = 'faculty' }) => {
    const [note, setNote] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : '');
    };

    if (role === 'student') {
        const badge = statusStyles[assignment.status] || 'bg-gray-50 text-gray-700 border-gray-100';
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
    }

    // faculty variant (default)
    return (
        <div className="bg-white border rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                        {assignment.classSection} • {assignment.subject}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{assignment.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{assignment.description}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-xs md:text-sm text-gray-600">
                        <span className="flex items-center gap-1 font-semibold text-gray-900">
                            <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                            Due {assignment.dueDate}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span>Max {assignment.maxMarks} marks</span>
                        {assignment.attachment && (
                            <>
                                <span className="text-gray-400">•</span>
                                <a href={assignment.attachment} className="flex items-center gap-1 text-blue-700 hover:text-blue-800">
                                    <FileText size={12} className="md:w-[14px] md:h-[14px]" />
                                    Attachment
                                </a>
                            </>
                        )}
                    </div>
                </div>
                <span className="text-[10px] md:text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 md:px-3 py-1 rounded-full self-start">
                    Published
                </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 mt-4">
                <Link
                    to={`/faculty/submissions/${assignment.id}`}
                    className="inline-flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-gray-100 text-xs md:text-sm font-semibold text-gray-800 hover:bg-gray-200"
                >
                    <ClipboardList size={14} />
                    View submissions
                </Link>
                <Link
                    to={`/faculty/assignments/edit/${assignment.id}`}
                    className="inline-flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    <Pencil size={14} />
                    Edit
                </Link>
                <button className="inline-flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-lg border text-xs md:text-sm font-semibold text-red-600 hover:bg-red-50">
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AssignmentCard;
