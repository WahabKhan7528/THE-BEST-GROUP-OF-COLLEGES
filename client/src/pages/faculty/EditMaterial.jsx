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
import SkeletonLoading from '../../components/shared/SkeletonLoading';

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
        return (
            <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-pulse">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-college-gold/10 pb-8">
                    <div className="space-y-3">
                        <SkeletonLoading variant="textLine" className="h-4 w-24" />
                        <SkeletonLoading variant="textLine" className="h-10 w-64" />
                        <SkeletonLoading variant="textLine" className="h-5 w-48" />
                    </div>
                    <div className="flex gap-3">
                        <SkeletonLoading variant="textLine" className="h-10 w-24 rounded-sm" />
                        <SkeletonLoading variant="textLine" className="h-10 w-32 rounded-sm" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <SkeletonLoading variant="panel" className="h-48" />
                        <SkeletonLoading variant="panel" className="h-[200px]" />
                    </div>
                    <div className="space-y-6">
                        <SkeletonLoading variant="panel" className="h-[300px]" />
                    </div>
                </div>
            </div>
        );
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
                <PortalForm.Select
                    label="Class / Section"
                    registration={register('classSection')}
                    error={errors.classSection?.message}
                    required
                    options={classes.map((c) => ({ id: c._id, label: `${c.name} - ${c.section}` }))}
                    placeholder="Select a class"
                />
                <PortalForm.Select
                    label="Subject"
                    registration={register('subject')}
                    error={errors.subject?.message}
                    required
                    disabled={subjectOptions.length === 0}
                    options={subjectOptions}
                    placeholder={subjectOptions.length > 0 ? 'Select a subject' : 'Select a class first'}
                />
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
                    <PortalForm.Select
                        label="Type"
                        registration={register('type')}
                        error={errors.type?.message}
                        options={[
                            { id: 'pdf', label: 'PDF' },
                            { id: 'ppt', label: 'Slides' },
                            { id: 'doc', label: 'Notes' },
                            { id: 'image', label: 'Image' },
                            { id: 'other', label: 'Video' },
                        ]}
                    />
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
                    <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">File Upload (Replace)</label>
                    <div className="relative group">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id="file-upload"
                        />
                        <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-center">
                            <Upload size={18} className="text-college-navy dark:text-college-gold" />
                            <span className="truncate group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{fileName || "Choose file to replace..."}</span>
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
