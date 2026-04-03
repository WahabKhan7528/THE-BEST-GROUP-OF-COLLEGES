import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema } from '../../schemas/assignmentSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { portalApi } from '../../services/api';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Plus, Database, AlignLeft, Calendar, FileText } from 'lucide-react';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [attachmentName, setAttachmentName] = useState('');
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [facultySubjects, setFacultySubjects] = useState([]);

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
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
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
            <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center gap-2 truncate">
              <FileText size={18} />
              <span className="truncate">{attachmentName || "Choose file..."}</span>
            </div>
          </div>
        </div>
      </PortalForm.Section>
    </PortalForm>
  );
};

export default CreateAssignment;
