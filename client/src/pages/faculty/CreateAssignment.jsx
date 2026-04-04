import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema } from '../../schemas/assignmentSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { portalApi } from '../../services/api';
import SkeletonLoading from '../../components/shared/SkeletonLoading';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Plus, Database, AlignLeft, Calendar, FileText } from 'lucide-react';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [attachmentName, setAttachmentName] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [facultySubjects, setFacultySubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      classSection: '', subject: '', title: '',
      description: '', dueDate: '', maxMarks: ''
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
  }, [setValue]);

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

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setAttachmentName(file ? file.name : '');
    setAssignmentFile(file || null);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('classSection', values.classSection);
    formData.append('subject', values.subject);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('dueDate', values.dueDate);
    formData.append('maxMarks', values.maxMarks);

    if (assignmentFile) {
      formData.append('attachment', assignmentFile);
    }

    await portalApi.createAssignment(formData);
    toast.success('Assignment created successfully');
    navigate('/faculty/assignments');
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
                    <SkeletonLoading variant="panel" className="h-64" />
                    <SkeletonLoading variant="panel" className="h-[300px]" />
                </div>
                <div className="space-y-6">
                    <SkeletonLoading variant="panel" className="h-[400px]" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <PortalForm
      title="Create New Assignment"
      subtitle="Publish a new assignment for your students"
      backPath="/faculty/assignments"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate('/faculty/assignments')}
      submitLabel="Publish Assignment"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      <PortalForm.Section title="Assignment Basic Info" icon={<Database size={20} className="text-college-navy dark:text-college-gold" />}>
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
          <PortalForm.Input
            label="Description & Instructions"
            type="textarea"
            registration={register('description')}
            error={errors.description?.message}
            placeholder="Detailed instructions for the assignment..."
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
          <label className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">Attachment (Optional)</label>
          <div className="relative group">
            <input
              type="file"
              onChange={handleFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center gap-2 truncate">
              <FileText size={18} className="text-college-navy dark:text-college-gold/60" />
              <span className="truncate group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{attachmentName || "Choose file..."}</span>
            </div>
          </div>
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateAssignment;
