import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema } from '../../schemas/assignmentSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Save, Database, AlignLeft, Calendar, FileText } from 'lucide-react';
import { useFacultyContext } from '../../context/FacultyContext';

const assignmentsByCampus = {
    main: [
        {
            id: "a1",
            title: "CPU Scheduling Report",
            description: "Analyze FCFS vs SJF using your lab data and provide charts.",
            dueDate: "2025-09-18",
            attachment: "#",
            classSection: "BSCS - A",
            subject: "Operating Systems",
            maxMarks: 20,
        },
        {
            id: "a2",
            title: "ER Diagram for Library",
            description: "Submit ERD + relational schema with keys and constraints.",
            dueDate: "2025-09-20",
            attachment: "#",
            classSection: "BSCS - B",
            subject: "Database Systems",
            maxMarks: 25,
        },
        {
            id: "a3",
            title: "Matrix Factorization Set",
            description: "Problem set on eigen decomposition and SVD.",
            dueDate: "2025-09-14",
            attachment: "#",
            classSection: "BSCS - A",
            subject: "Linear Algebra",
            maxMarks: 15,
        },
    ],
    law: [
        {
            id: "a4",
            title: "Constitutional Case Analysis",
            description: "Analyze Supreme Court ruling with precedents.",
            dueDate: "2025-09-22",
            attachment: "#",
            classSection: "LLB - A",
            subject: "Constitutional Law",
            maxMarks: 30,
        },
    ],
    hala: [
        {
            id: "a6",
            title: "Business Proposal",
            description: "Submit comprehensive business plan and projections.",
            dueDate: "2025-09-28",
            attachment: "#",
            classSection: "BBA - A",
            subject: "Business Management",
            maxMarks: 25,
        },
    ],
};

const EditAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCurrentCampus } = useFacultyContext();
    const campus = getCurrentCampus();
    const toast = useToast();
    const confirmDialog = useConfirm();

    const [loading, setLoading] = useState(true);
    const [attachmentName, setAttachmentName] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(assignmentSchema),
        defaultValues: {
            classSection: '', subject: '', title: '',
            description: '', dueDate: '', maxMarks: ''
        }
    });

    useEffect(() => {
        const assignments = assignmentsByCampus[campus] || [];
        const assignment = assignments.find(a => a.id === id);

        if (assignment) {
            reset({
                classSection: assignment.classSection,
                subject: assignment.subject,
                title: assignment.title,
                description: assignment.description,
                dueDate: assignment.dueDate,
                maxMarks: String(assignment.maxMarks),
            });
            setAttachmentName('Existing Attachment.pdf');
        }
        setLoading(false);
    }, [id, campus, reset]);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        setAttachmentName(file ? file.name : '');
    };

    const onSubmit = () => {
        toast.success(`Assignment ${id} updated successfully`);
        navigate('/faculty/assignments');
    };

    const handleDelete = async () => {
        const confirmed = await confirmDialog({ title: "Delete Assignment", message: "Are you sure you want to delete this assignment?", confirmText: "Delete", variant: "danger" });
        if (confirmed) {
            toast.success(`Assignment ${id} deleted successfully`);
            navigate('/faculty/assignments');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading assignment details...</div>;
    }

    return (
        <PortalForm
            title="Edit Assignment"
            subtitle="Update assignment details for your students"
            backPath="/faculty/assignments"
            onSubmit={handleSubmit(onSubmit)}
            onCancel={() => navigate('/faculty/assignments')}
            onDelete={handleDelete}
            submitLabel="Save Changes"
            submitIcon={Save}
            submitting={isSubmitting}
        >
            <PortalForm.Section title="Assignment Basic Info" icon={<Database size={20} className="text-college-navy dark:text-college-gold" />}>
                <div>
                    <PortalForm.Input
                        label="Class / Section"
                        registration={register('classSection')}
                        error={errors.classSection?.message}
                        placeholder="e.g. BSCS - A"
                        required
                    />
                </div>
                <div>
                    <PortalForm.Input
                        label="Subject"
                        registration={register('subject')}
                        error={errors.subject?.message}
                        placeholder="e.g. Operating Systems"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <PortalForm.Input
                        label="Assignment Title"
                        registration={register('title')}
                        error={errors.title?.message}
                        placeholder="e.g. CPU Scheduling Algorithm Report"
                        required
                    />
                </div>
            </PortalForm.Section>

            <PortalForm.Section title="Instructions & Content" icon={<AlignLeft size={20} className="text-college-navy dark:text-college-gold" />}>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Description & Instructions <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register('description')}
                        rows={6}
                        placeholder="Detailed instructions for the assignment..."
                        className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
                        required
                    />
                </div>
            </PortalForm.Section>

            <PortalForm.Section title="Deadlines & Attachments" icon={<Calendar size={20} className="text-college-navy dark:text-college-gold" />}>
                <div>
                    <PortalForm.Input
                        label="Due Date"
                        type="date"
                        registration={register('dueDate')}
                        error={errors.dueDate?.message}
                        required
                    />
                </div>
                <div>
                    <PortalForm.Input
                        label="Maximum Marks"
                        type="number"
                        registration={register('maxMarks')}
                        error={errors.maxMarks?.message}
                        placeholder="20"
                        required
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Attachment (Optional)</label>
                    <div className="relative group">
                        <input
                            type="file"
                            onChange={handleFile}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center gap-2 truncate">
                            <FileText size={18} />
                            <span className="truncate">{attachmentName || "Choose file..."}</span>
                        </div>
                    </div>
                </div>
            </PortalForm.Section>
        </PortalForm>
    );
};

export default EditAssignment;
