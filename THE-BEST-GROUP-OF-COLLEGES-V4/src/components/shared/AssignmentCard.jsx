import { useState } from 'react';
import { Calendar, FileText, Pencil, Trash2, ClipboardList } from 'lucide-react';
import Card from '../public_site/Card';
import Button from './Button';
import PublicButton from './PublicButton';

/*
 Shared AssignmentCard

 variant="faculty" (default) — shows Edit / Delete / View Submissions action buttons
 variant="student"           — shows file upload form + Submit button
 */

const statusStyles = {
    Submitted: 'bg-college-navy/5 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-college-navy/10 dark:border-emerald-700/40',
    Pending: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold border-college-navy/10 dark:border-college-gold/30',
    Late: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-700/40',
};

const AssignmentCard = ({ assignment, role = 'faculty' }) => {
    const [note, setNote] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : '');
    };

    if (role === 'student') {
        const badge = statusStyles[assignment.status] || 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700';
        return (
            <Card hover={false} className="p-4 md:p-5 border border-transparent dark:border-college-gold/50 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                        <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {assignment.subject}
                        </p>
                        <h3 className="text-base md:text-lg font-semibold text-college-navy dark:text-white">
                            {assignment.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{assignment.description}</p>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-college-navy dark:text-college-gold">
                                Due {assignment.dueDate}
                            </span>
                            <span className="text-gray-400 dark:text-gray-600">•</span>
                            <a href={assignment.attachment} className="text-college-navy dark:text-college-gold hover:text-primary-800 font-medium">
                                Attached file
                            </a>
                        </div>
                    </div>
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold border self-start ${badge}`}>
                        {assignment.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex flex-col gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                        Upload file
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-lg border border-gray-300 dark:border-college-gold/50 bg-white dark:bg-college-navy/60 text-gray-900 dark:text-white shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy dark:focus:ring-college-gold transition-all"
                        />
                        {fileName && <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Selected: {fileName}</span>}
                    </label>

                    <label className="flex flex-col gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                        Notes
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                            placeholder="Add clarification or links..."
                            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-lg border border-gray-300 dark:border-college-gold/50 bg-white dark:bg-college-navy/60 text-gray-900 dark:text-white shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy dark:focus:ring-college-gold transition-all"
                        />
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 md:gap-3">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        Last submission status: {assignment.status}
                    </p>
                    <PublicButton variant="secondary" shape="slanted" size="sm" className="shadow-md">
                        Submit Assignment
                    </PublicButton>
                </div>
            </Card>
        );
    }

    // faculty variant (default)
    return (
        <Card hover={false} className="p-4 md:p-5 border border-transparent dark:border-college-gold/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {assignment.classSection} • {assignment.subject}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-college-navy dark:text-white">{assignment.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{assignment.description}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1 font-semibold text-college-navy dark:text-college-gold">
                            <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                            Due {assignment.dueDate}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600">•</span>
                        <span>Max {assignment.maxMarks} marks</span>
                        {assignment.attachment && (
                            <>
                                <span className="text-gray-400 dark:text-gray-600">•</span>
                                <a href={assignment.attachment} className="flex items-center gap-1 text-college-gold hover:text-college-gold/80">
                                    <FileText size={12} className="md:w-[14px] md:h-[14px]" />
                                    Attachment
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3 mt-4">
                <Button
                    to={`/faculty/submissions/${assignment.id}`}
                    variant="primary"
                    size="sm"
                    className="border border-college-gold/40 font-semibold"
                >
                    <ClipboardList size={14} className="text-college-gold" />
                    View submissions
                </Button>
                <Button
                    to={`/faculty/assignments/edit/${assignment.id}`}
                    variant="outline"
                    size="sm"
                >
                    <Pencil size={14} />
                    Edit
                </Button>
                <Button variant="danger" size="sm">
                    <Trash2 size={14} />
                    Delete
                </Button>
            </div>
        </Card>
    );
};

export default AssignmentCard;
