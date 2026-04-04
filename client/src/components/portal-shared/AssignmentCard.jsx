import { useEffect, useState } from 'react';
import { Calendar, FileText, Pencil, Trash2, ClipboardList } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import PublicButton from '../shared/PublicButton';
import { portalApi } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const statusStyles = {
    Submitted: 'bg-college-navy/5 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-college-navy/10 dark:border-emerald-700/40',
    Pending: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold border-college-navy/10 dark:border-college-gold/30',
    Late: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-100 dark:border-red-700/40',
};

const AssignmentCard = ({ assignment, role = 'faculty', onDeleted }) => {
    const toast = useToast();
    const confirmDialog = useConfirm();
    const [note, setNote] = useState('');
    const [fileName, setFileName] = useState('');
    const [localStatus, setLocalStatus] = useState(assignment.status);
    const [isEditing, setIsEditing] = useState(false);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setLocalStatus(assignment.status);
        setIsEditing(false);
        setNote('');
        setFileName('');
        setSubmissionFile(null);
    }, [assignment.id, assignment.status]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : '');
        setSubmissionFile(file || null);
    };

    if (role === 'student') {
        const displayStatus = isEditing ? 'Editing' : localStatus;
        const badge = statusStyles[displayStatus] || statusStyles[assignment.status] || 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700';
        
        const isSubmitted = localStatus === 'Submitted' && !isEditing;

        const handleSubmit = async () => {
            if (!submissionFile) {
                toast.error('Choose a file before submitting the assignment.');
                return;
            }

            const formData = new FormData();
            formData.append('assignmentId', assignment.id || assignment._id);
            formData.append('file', submissionFile);

            try {
                setIsSubmitting(true);
                await portalApi.submitAssignment(formData);
                setLocalStatus('Submitted');
                setIsEditing(false);
                toast.success('Assignment submitted successfully.');
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to submit assignment.');
            } finally {
                setIsSubmitting(false);
            }
        };
        return (
            <Card hover={false} className="p-4 md:p-5 border border-gray-200 dark:border-college-gold/50 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
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
                            <span className="text-gray-400 dark:text-gray-600">â€¢</span>
                            <a href={assignment.attachment} target="_blank" rel="noopener noreferrer" className="text-college-navy dark:text-college-gold hover:text-primary-800 font-medium">
                                Attached file
                            </a>
                        </div>
                    </div>
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold border self-start whitespace-nowrap ${badge}`}>
                        {displayStatus}
                    </span>
                </div>

                {!isSubmitted ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 transition-opacity animate-in fade-in duration-300">
                        <label className="flex flex-col gap-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                            Upload file
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-sm border border-gray-300 dark:border-college-gold/50 bg-white dark:bg-college-navy/60 text-gray-900 dark:text-white shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy dark:focus:ring-college-gold transition-all"
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
                                className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-sm border border-gray-300 dark:border-college-gold/50 bg-white dark:bg-college-navy/60 text-gray-900 dark:text-white shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy dark:focus:ring-college-gold transition-all resize-none"
                            />
                        </label>
                    </div>
                ) : (
                    <div className="bg-college-navy/5 dark:bg-college-gold/5 p-4 rounded-sm border border-college-navy/10 dark:border-college-gold/20 flex flex-col gap-2 transition-all animate-in fade-in duration-300">
                        <p className="text-xs font-bold uppercase tracking-wider text-college-navy/60 dark:text-college-gold/80 mb-1">Your Submission</p>
                        <p className="text-sm font-medium text-college-navy dark:text-white flex items-center gap-2">
                            <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />
                            {fileName || "assignment_submission.pdf"}
                        </p>
                        {note && (
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-college-navy/50 p-2 rounded-sm border border-black/5 dark:border-white/5">
                                <span className="font-semibold text-college-navy dark:text-college-gold block mb-1">Notes:</span> 
                                <p className="leading-relaxed">{note}</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 md:gap-3 pt-2">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
                        Original status: {assignment.status}
                    </p>
                    {isSubmitted ? (
                        <PublicButton onClick={() => setIsEditing(true)} variant="outline" size="sm" className="shadow-sm border-gray-300 dark:border-college-gold/30">
                            <Pencil size={14} className="mr-1.5" />
                            Edit Assignment
                        </PublicButton>
                    ) : (
                        <PublicButton onClick={handleSubmit} variant="secondary" shape="slanted" size="sm" className="shadow-md">
                            {isSubmitting ? 'Submitting...' : localStatus === 'Submitted' ? 'Save Changes' : 'Submit Assignment'}
                        </PublicButton>
                    )}
                </div>
            </Card>
        );
    }

    const handleDelete = async () => {
        const confirmed = await confirmDialog({
            title: 'Delete Assignment',
            message: `Are you sure you want to delete "${assignment.title}"?`,
            confirmText: 'Delete',
            variant: 'danger',
        });

        if (!confirmed) return;

        try {
            setIsDeleting(true);
            await portalApi.deleteAssignment(assignment.id || assignment._id);
            toast.success('Assignment deleted successfully');
            if (typeof onDeleted === 'function') {
                onDeleted(assignment.id || assignment._id);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete assignment');
        } finally {
            setIsDeleting(false);
        }
    };

    // faculty variant (default)
    return (
        <Card hover={false} className="p-4 md:p-5 border border-gray-200 dark:border-college-gold/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {assignment.classSection} â€¢ {assignment.subject}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-college-navy dark:text-white">{assignment.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{assignment.description}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1 font-semibold text-college-navy dark:text-college-gold">
                            <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                            Due {assignment.dueDate}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600">â€¢</span>
                        <span>Max {assignment.maxMarks} marks</span>
                        {assignment.attachment && (
                            <>
                                <span className="text-gray-400 dark:text-gray-600">â€¢</span>
                                <a href={assignment.attachment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-college-gold hover:text-college-gold/80">
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
                <Button variant="danger" size="sm" onClick={handleDelete} disabled={isDeleting}>
                    <Trash2 size={14} />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </Card>
    );
};

export default AssignmentCard;
