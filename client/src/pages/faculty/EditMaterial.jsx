import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialSchema } from '../../schemas/materialSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Save, Database, FileText, Upload, Trash2 } from 'lucide-react';
import { useFacultyContext } from '../../context/FacultyContext';
import PublicButton from '../../components/shared/PublicButton';

// Mock materials data
const materialsByCampus = {
  main: [
    {
      id: "m1",
      classSection: "BSCS - A",
      subject: "Operating Systems",
      title: "Lecture 07 Slides",
      type: "Slides",
      uploadDate: "2025-09-11", // Standardized to yyyy-mm-dd for date picker
      link: "#",
    },
    {
      id: "m2",
      classSection: "BSCS - B",
      subject: "Database Systems",
      title: "Normalization Cheatsheet",
      type: "PDF",
      uploadDate: "2025-09-10",
      link: "#",
    },
    {
      id: "m3",
      classSection: "BSCS - A",
      subject: "Operating Systems",
      title: "Lab Demo Recording",
      type: "Video",
      uploadDate: "2025-09-09",
      link: "#",
    },
  ],
  law: [
    {
      id: "m4",
      classSection: "LLB - A",
      subject: "Constitutional Law",
      title: "Indian Constitution Overview",
      type: "Slides",
      uploadDate: "2025-09-12",
      link: "#",
    },
    {
      id: "m5",
      classSection: "LLB - A",
      subject: "Criminal Law",
      title: "Criminal Procedure Code Summary",
      type: "PDF",
      uploadDate: "2025-09-11",
      link: "#",
    },
  ],
  hala: [
    {
      id: "m6",
      classSection: "BBA - A",
      subject: "Business Management",
      title: "Strategic Planning Framework",
      type: "Slides",
      uploadDate: "2025-09-10",
      link: "#",
    },
  ],
};

const EditMaterial = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCurrentCampus } = useFacultyContext();
    const campus = getCurrentCampus();
    const toast = useToast();
    const confirmDialog = useConfirm();

    const [loading, setLoading] = useState(true);
    const [fileName, setFileName] = useState('');

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(materialSchema),
        defaultValues: {
            classSection: '', subject: '', title: '',
            type: 'PDF', link: '', uploadDate: ''
        }
    });

    useEffect(() => {
        const materials = materialsByCampus[campus] || [];
        const material = materials.find(m => m.id === id);

        if (material) {
            reset({
                classSection: material.classSection,
                subject: material.subject,
                title: material.title,
                type: material.type,
                link: material.link || '',
                uploadDate: material.uploadDate,
            });
            setFileName('Existing_Material.pdf');
        }
        setLoading(false);
    }, [id, campus, reset]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setFileName(file ? file.name : '');
    };

    const onSubmit = () => {
        toast.success(`Material ${id} updated successfully`);
        navigate('/faculty/materials');
    };

    const handleDelete = async () => {
        const confirmed = await confirmDialog({ title: "Delete Material", message: "Are you sure you want to delete this material?", confirmText: "Delete", variant: "danger" });
        if (confirmed) {
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
                    <PortalForm.Input
                        label="Class / Section"
                        registration={register('classSection')}
                        error={errors.classSection?.message}
                        placeholder="e.g., BSCS - Section A"
                        required
                    />
                </div>
                <div>
                    <PortalForm.Input
                        label="Subject"
                        registration={register('subject')}
                        error={errors.subject?.message}
                        placeholder="e.g., Operating Systems"
                        required
                    />
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
                        <option>PDF</option>
                        <option>Slides</option>
                        <option>Notes</option>
                        <option>Image</option>
                        <option>Video</option>
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
