import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialSchema } from '../../schemas/materialSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Save, Database, FileText, Upload, Trash2 } from 'lucide-react';
import PublicButton from '../../components/shared/PublicButton';
import { portalApi } from '../../services/api';

const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const confirmDialog = useConfirm();

    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState('');
    const [materialFile, setMaterialFile] = useState(null);
    const [classes, setClasses] = useState([]);

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(materialSchema),
        defaultValues: {
            classSection: '', subject: '', title: '',
            type: 'pdf', link: '', uploadDate: ''
        }
    });

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const { data } = await portalApi.classes();
                setClasses(data.data || []);
            } catch {
                setClasses([]);
            }
        };

        const loadMaterial = async () => {
            try {
                const { data } = await portalApi.materials();
                const material = (data.data || []).find((item) => item._id === id);

                if (material) {
                    reset({
                        classSection: material.classRoom?._id || material.classRoom || '',
                        subject: material.subject?._id || material.subject || '',
                        title: material.title || '',
                        type: material.type || 'pdf',
                        link: material.link || '',
                        uploadDate: material.createdAt ? String(material.createdAt).slice(0, 10) : '',
                    });
                    setFileName(material.file?.url ? 'Existing Material' : '');
                }
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
        loadMaterial();
    }, [id, reset]);

    const selectedClassId = watch('classSection');
    const selectedSubjectId = watch('subject');

    const isSelectableSemester = (entry) => {
        if (!entry) return false;
        return entry.status !== 'locked' && entry.status !== 'completed' && !entry.resultPublished;
    };

    const subjectOptions = useMemo(() => {
        const selectedClass = classes.find((item) => item._id === selectedClassId);
        if (!selectedClass) {
            return [];
        }

        const semesterAssignments = (selectedClass.semesterSubjects || [])
            .filter(isSelectableSemester)
            .flatMap((entry) => {
                const assignments = Array.isArray(entry.subjectAssignments) && entry.subjectAssignments.length > 0
                    ? entry.subjectAssignments
                    : (entry.subjects || []).map((subject) => ({ subject }));

                return assignments.map((assignment) => assignment.subject).filter(Boolean);
            });

        const hasSemesterSetup = Array.isArray(selectedClass.semesterSubjects) && selectedClass.semesterSubjects.length > 0;
        const subjects = semesterAssignments.length > 0 ? semesterAssignments : (hasSemesterSetup ? [] : (selectedClass.subjects || []));

        return subjects.map((subject) => ({
            id: subject._id,
            label: `${subject.name || 'Subject'}${subject.code ? ` (${subject.code})` : ''}`,
        }));
    }, [classes, selectedClassId]);

    useEffect(() => {
        if (subjectOptions.length === 0) {
            return;
        }

        if (!selectedSubjectId || !subjectOptions.some((subject) => subject.id === selectedSubjectId)) {
            setValue('subject', subjectOptions[0].id);
        }
    }, [selectedSubjectId, subjectOptions, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : '');
        setMaterialFile(file || null);
    };

    const onSubmit = async (values) => {
        const formData = new FormData();
        formData.append('classSection', values.classSection);
        formData.append('subject', values.subject);
        formData.append('title', values.title);
        formData.append('type', values.type);
        formData.append('uploadDate', values.uploadDate);
        if (values.link) formData.append('link', values.link);
        if (materialFile) formData.append('file', materialFile);

        await portalApi.updateMaterial(id, formData);
        toast.success(`Material ${id} updated successfully`);
        navigate('/faculty/materials');
    };

    const handleDelete = async () => {
        const confirmed = await confirmDialog({ title: "Delete Material", message: "Are you sure you want to delete this material?", confirmText: "Delete", variant: "danger" });
        if (confirmed) {
            await portalApi.deleteMaterial(id);
            toast.success(`Material deleted successfully`);
            navigate('/faculty/materials');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading material details...</div>;
    }

    return (
        <PortalForm
            title="Edit Material"
            subtitle="Update material details for your students"
            backPath="/faculty/materials"
            onSubmit={handleSubmit(onSubmit)}
            onCancel={() => navigate('/faculty/materials')}
            submitLabel="Save Changes"
            submitIcon={Save}
            submitting={isSubmitting}
            headerActions={
                <PublicButton
                    onClick={handleDelete}
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    type="button"
                    className="px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-1.5 min-w-0 h-8 sm:h-auto"
                    style={{ lineHeight: 1.1 }}
                >
                    <span className="hidden min-[480px]:inline">Delete</span>
                </PublicButton>
            }
        >
            <PortalForm.Section title="Course Information" icon={<Database size={20} className="text-college-navy dark:text-college-gold" />}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Class / Section
                    </label>
                    <select
                        {...register('classSection')}
                        className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
                        required
                    >
                        <option value="">Select a class</option>
                        {classes.map((classRoom) => (
                            <option key={classRoom._id} value={classRoom._id}>
                                {classRoom.name} - {classRoom.section}
                            </option>
                        ))}
                    </select>
                    {errors.classSection?.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.classSection.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Subject
                    </label>
                    <select
                        {...register('subject')}
                        className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
                        required
                        disabled={subjectOptions.length === 0}
                    >
                        <option value="">{subjectOptions.length > 0 ? 'Select a subject' : 'Select a class first'}</option>
                        {subjectOptions.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.label}
                            </option>
                        ))}
                    </select>
                    {errors.subject?.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                    )}
                </div>
            </PortalForm.Section>

            <PortalForm.Section title="Material Details" icon={<FileText size={20} className="text-college-navy dark:text-college-gold" />}>
                <div className="md:col-span-2">
                    <PortalForm.Input
                        label="Material Title"
                        registration={register('title')}
                        error={errors.title?.message}
                        placeholder="e.g. Lecture 07 - CPU Scheduling"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Type
                    </label>
                    <select
                        {...register('type')}
                        className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
                    >
                        <option value="pdf">PDF</option>
                        <option value="ppt">Slides</option>
                        <option value="doc">Notes</option>
                        <option value="image">Image</option>
                        <option value="other">Video</option>
                    </select>
                </div>

                <div>
                    <PortalForm.Input
                        label="Upload Date"
                        type="date"
                        registration={register('uploadDate')}
                        error={errors.uploadDate?.message}
                        required
                    />
                </div>
            </PortalForm.Section>

            <PortalForm.Section title="Content Upload" icon={<Upload size={20} className="text-college-navy dark:text-college-gold" />}>
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">File Upload (Replace)</label>
                    <div className="relative group">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="file-upload"
                        />
                        <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-center">
                            <Upload size={18} className="text-college-navy dark:text-college-gold" />
                            <span className="truncate text-gray-700 dark:text-gray-300 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{fileName || "Choose file to replace..."}</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <PortalForm.Input
                        label="Link (YouTube / Drive) (Optional)"
                        type="url"
                        registration={register('link')}
                        placeholder="https://..."
                    />
                </div>
            </PortalForm.Section>
        </PortalForm>
    );
};

export default EditMaterial;

