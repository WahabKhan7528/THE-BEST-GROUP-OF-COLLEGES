import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortalForms from '../../components/shared/PortalForms';
import { Upload, Database, FileText, Link as LinkIcon, Calendar } from 'lucide-react';

const UploadMaterial = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    classSection: '',
    subject: '',
    title: '',
    type: 'PDF',
    link: '',
    fileName: '',
    uploadDate: '',
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleChange('fileName', file ? file.name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Material uploaded (mock)');
    navigate('/faculty/materials');
  };

  return (
    <PortalForms
      title="Upload Course Material"
      subtitle="Share resources, lecture notes, and assignments with your students."
      backPath="/faculty/materials"
      onSubmit={handleSubmit}
      onCancel={() => navigate('/faculty/materials')}
      submitLabel="Upload Material"
      submitIcon={Upload}
    >
      <PortalForms.Section title="Course Information" icon={<Database size={20} className="text-college-navy dark:text-college-gold" />}>
        <div>
          <PortalForms.Input
            label="Class / Section"
            value={form.classSection}
            onChange={(val) => handleChange('classSection', val)}
            placeholder="e.g., BSCS - Section A"
            required
          />
        </div>
        <div>
          <PortalForms.Input
            label="Subject"
            value={form.subject}
            onChange={(val) => handleChange('subject', val)}
            placeholder="e.g., Operating Systems"
            required
          />
        </div>
      </PortalForms.Section>

      <PortalForms.Section title="Material Details" icon={<FileText size={20} className="text-college-navy dark:text-college-gold" />}>
        <div className="md:col-span-2">
          <PortalForms.Input
            label="Material Title"
            value={form.title}
            onChange={(val) => handleChange('title', val)}
            placeholder="e.g. Lecture 07 - CPU Scheduling"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Type
          </label>
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all appearance-none dark:text-white"
          >
            <option>PDF</option>
            <option>Slides</option>
            <option>Notes</option>
            <option>Image</option>
            <option>Video</option>
          </select>
        </div>

        <div>
          <PortalForms.Input
            label="Upload Date"
            type="date"
            value={form.uploadDate}
            onChange={(val) => handleChange('uploadDate', val)}
            required
          />
        </div>
      </PortalForms.Section>

      <PortalForms.Section title="Content Upload" icon={<Upload size={20} className="text-college-navy dark:text-college-gold" />}>
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">File Upload</label>
          <div className="relative group">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="file-upload"
            />
            <div className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 dark:border-college-gold/40 bg-gray-50 dark:bg-college-navy/50 text-gray-500 dark:text-gray-400 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/10 group-hover:border-college-navy dark:group-hover:border-college-gold transition-all flex items-center justify-center gap-2 truncate text-center">
              <Upload size={18} className="text-college-navy dark:text-college-gold" />
              <span className="truncate text-gray-700 dark:text-gray-300 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">{form.fileName || "Choose file..."}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <PortalForms.Input
            label="Link (YouTube / Drive) (Optional)"
            type="url"
            value={form.link}
            onChange={(val) => handleChange('link', val)}
            placeholder="https://..."
          />
        </div>
      </PortalForms.Section>
    </PortalForms>
  );
};

export default UploadMaterial;
