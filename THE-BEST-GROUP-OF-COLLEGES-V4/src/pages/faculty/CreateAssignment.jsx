import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema } from '../../schemas/assignmentSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import PortalForms from '../../components/shared/PortalForms';
import { Plus, Database, AlignLeft, Calendar, FileText } from 'lucide-react';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [attachmentName, setAttachmentName] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      classSection: '', subject: '', title: '',
      description: '', dueDate: '', maxMarks: ''
    }
  });

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setAttachmentName(file ? file.name : '');
  };

  const onSubmit = () => {
    toast.success('Assignment created successfully');
    navigate('/faculty/assignments');
  };

  return (
    <PortalForms
      title="Create New Assignment"
      subtitle="Publish a new assignment for your students"
      backPath="/faculty/assignments"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => navigate('/faculty/assignments')}
      submitLabel="Publish Assignment"
      submitIcon={Plus}
      submitting={isSubmitting}
    >
      <PortalForms.Section title="Assignment Basic Info" icon={<Database size={20} className="text-college-navy dark:text-college-gold" />}>
        <div>
          <PortalForms.Input
            label="Class / Section"
            registration={register('classSection')}
            error={errors.classSection?.message}
            placeholder="e.g. BSCS - A"
            required
          />
        </div>
        <div>
          <PortalForms.Input
            label="Subject"
            registration={register('subject')}
            error={errors.subject?.message}
            placeholder="e.g. Operating Systems"
            required
          />
        </div>
        <div className="md:col-span-2">
          <PortalForms.Input
            label="Assignment Title"
            registration={register('title')}
            error={errors.title?.message}
            placeholder="e.g. CPU Scheduling Algorithm Report"
            required
          />
        </div>
      </PortalForms.Section>

      <PortalForms.Section title="Instructions & Content" icon={<AlignLeft size={20} className="text-college-navy dark:text-college-gold" />}>
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
      </PortalForms.Section>

      <PortalForms.Section title="Deadlines & Attachments" icon={<Calendar size={20} className="text-college-navy dark:text-college-gold" />}>
        <div>
          <PortalForms.Input
            label="Due Date"
            type="date"
            registration={register('dueDate')}
            error={errors.dueDate?.message}
            required
          />
        </div>
        <div>
          <PortalForms.Input
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
      </PortalForms.Section>
    </PortalForms>
  );
};

export default CreateAssignment;
