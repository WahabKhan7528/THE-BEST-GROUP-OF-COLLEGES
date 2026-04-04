import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialSchema } from '../../schemas/materialSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { portalApi } from '../../services/api';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Upload, Database, FileText } from 'lucide-react';
import SkeletonLoading from '../../components/shared/SkeletonLoading';

const UploadMaterial = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [fileName, setFileName] = useState('');
  const [materialFile, setMaterialFile] = useState(null);
  const [facultySubjects, setFacultySubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      classSection: '', subject: '', title: '',
      type: 'pdf', link: '', uploadDate: ''
    }
  });

  const selectedClassId = watch('classSection');
  const selectedSubjectId = watch('subject');

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const { data } = await portalApi.facultySubjects();
        setFacultySubjects(data.data?.allSubjects || []);

        const firstClassId = data.data?.allSubjects?.[0]?.classRoom?._id;
        if (firstClassId && !selectedClassId) {
          setValue('classSection', firstClassId);
        }
      } catch {
        setFacultySubjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [setValue, selectedClassId]);

  const classes = useMemo(() => {
    const map = new Map();

    facultySubjects.forEach((item) => {
      const classRoom = item.classRoom;
      const classId = classRoom?._id;
      if (!classId || map.has(classId)) return;
      map.set(classId, classRoom);
    });

    return Array.from(map.values());
  }, [facultySubjects]);

  const subjectOptions = useMemo(() => {
    return facultySubjects
      .filter((item) => item.classRoom?._id === selectedClassId && !item.locked)
      .map((item) => ({
        id: item.subject?._id,
        label: `${item.subject?.name || 'Subject'}${item.subject?.code ? ` (${item.subject.code})` : ''}${item.term?.label ? ` • ${item.term.label}` : ''}`,
      }))
      .filter((subject) => subject.id);
  }, [facultySubjects, selectedClassId]);

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
    if (file) {
      setFileName(file.name);
      setMaterialFile(file);
    }
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

    await portalApi.createMaterial(formData);
    toast.success('Material uploaded successfully');
    navigate('/faculty/materials');
  };

  if (loading) {
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-college-gold/10 pb-8">
                <div className="space-y-3">
                    <SkeletonLoading variant="textLine" className="h-4 w-24" />
                    <SkeletonLoading variant="textLine" className="h-10 w-64" />
                    <SkeletonLoading variant="textLine" className="h-4 w-48" />
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
      title="Upload Course Material"
      subtitle="Share resources, lecture notes, and assignments with your students."
      backPath="/faculty/materials"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate('/faculty/materials')}
      submitLabel="Upload Material"
      submitIcon={Upload}
      submitting={isSubmitting}
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
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">File Upload</label>
          <div className="relative group">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="file-upload"
            />
            <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-center">
              <Upload size={18} className="text-college-navy dark:text-college-gold" />
              <span className="truncate group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{fileName || "Choose file..."}</span>
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

export default UploadMaterial;
