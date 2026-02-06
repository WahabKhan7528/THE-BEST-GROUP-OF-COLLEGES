import { useState } from 'react';
import { Upload } from 'lucide-react';

const MaterialUploadForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    classSection: '',
    subject: '',
    title: '',
    type: 'PDF',
    link: '',
    fileName: '',
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
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="text-sm text-gray-700 space-y-1">
          Class / Section
          <input
            type="text"
            value={form.classSection}
            onChange={(e) => handleChange('classSection', e.target.value)}
            placeholder="e.g., BSCS - Section A"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>
        <label className="text-sm text-gray-700 space-y-1">
          Subject
          <input
            type="text"
            value={form.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="e.g., Operating Systems"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>
      </div>

      <label className="text-sm text-gray-700 space-y-1 block">
        Material title
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Lecture 07 - CPU Scheduling"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="text-sm text-gray-700 space-y-1">
          Type
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option>PDF</option>
            <option>Slides</option>
            <option>Notes</option>
            <option>Image</option>
            <option>Video</option>
          </select>
        </label>
        <label className="text-sm text-gray-700 space-y-1 md:col-span-2">
          Link (YouTube / Drive)
          <input
            type="url"
            value={form.link}
            onChange={(e) => handleChange('link', e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="text-sm text-gray-700 space-y-1">
          Upload file
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {form.fileName && (
            <span className="text-xs text-gray-500">Selected: {form.fileName}</span>
          )}
        </label>
        <label className="text-sm text-gray-700 space-y-1">
          Upload date
          <input
            type="date"
            value={form.uploadDate || ''}
            onChange={(e) => handleChange('uploadDate', e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-800"
        >
          <Upload size={16} />
          Upload Material
        </button>
      </div>
    </form>
  );
};

export default MaterialUploadForm;

