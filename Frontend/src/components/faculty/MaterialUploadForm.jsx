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
    <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-700">Class / Section</span>
          <input
            type="text"
            value={form.classSection}
            onChange={(e) => handleChange('classSection', e.target.value)}
            placeholder="e.g., BSCS - Section A"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-700">Subject</span>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="e.g., Operating Systems"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-gray-700">Material title</span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Lecture 07 - CPU Scheduling"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-700">Type</span>
          <div className="relative">
            <select
              value={form.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option>PDF</option>
              <option>Slides</option>
              <option>Notes</option>
              <option>Image</option>
              <option>Video</option>
            </select>
          </div>
        </label>
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-700">Link (YouTube / Drive)</span>
          <input
            type="url"
            value={form.link}
            onChange={(e) => handleChange('link', e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Upload file</span>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-white/30 hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all"
            >
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600 truncate">
                {form.fileName || "Choose file..."}
              </span>
            </label>
          </div>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-700">Upload date</span>
          <input
            type="date"
            value={form.uploadDate || ''}
            onChange={(e) => handleChange('uploadDate', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </label>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200/50">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Upload size={18} />
          Upload Material
        </button>
      </div>
    </form>
  );
};

export default MaterialUploadForm;

