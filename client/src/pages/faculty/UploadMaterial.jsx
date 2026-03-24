import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialSchema } from '../../schemas/materialSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import PortalForm from '../../components/portal-shared/PortalForm';
import { Upload, Database, FileText } from 'lucide-react';

const UploadMaterial = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [fileName, setFileName] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      classSection: '', subject: '', title: '',
      type: 'PDF', link: '', uploadDate: ''
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  const onSubmit = () => {
    toast.success('Material uploaded successfully');
    navigate('/faculty/materials');
  };

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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">File Upload</label>
          <div className="relative group">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="file-upload"
            />
            <div className="w-full px-4 py-3 rounded-sm border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-center">
              <Upload size={18} className="text-college-navy dark:text-college-gold" />
              <span className="truncate text-gray-700 dark:text-gray-300 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{fileName || "Choose file..."}</span>
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
