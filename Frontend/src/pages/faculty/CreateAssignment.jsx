import { useState } from 'react';
import { FileText, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import FormInput from '../../components/admin/FormInput';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    classSection: '',
    subject: '',
    title: '',
    description: '',
    dueDate: '',
    maxMarks: '',
    attachmentName: '',
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    handleChange('attachmentName', file ? file.name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock submit
    alert('Assignment created (mock)');
    navigate('/faculty/assignments');
  };

  return (
    <div
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <Link
          to="/faculty/assignments"
          className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/50 hover:bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all duration-200"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Create New Assignment</h1>
          <p className="text-xs md:text-sm text-gray-500">Publish a new assignment for your students</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 space-y-6 md:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <FormInput
              label="Class / Section"
              value={form.classSection}
              onChange={(val) => handleChange('classSection', val)}
              placeholder="e.g. BSCS - A"
              required
            />
          </div>
          <div>
            <FormInput
              label="Subject"
              value={form.subject}
              onChange={(val) => handleChange('subject', val)}
              placeholder="e.g. Operating Systems"
              required
            />
          </div>
        </div>

        <div>
          <FormInput
            label="Assignment Title"
            value={form.title}
            onChange={(val) => handleChange('title', val)}
            placeholder="e.g. CPU Scheduling Algorithm Report"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description & Instructions</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={6}
            placeholder="Detailed instructions for the assignment..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <FormInput
              label="Due Date"
              type="date"
              value={form.dueDate}
              onChange={(val) => handleChange('dueDate', val)}
              required
            />
          </div>

          <div>
            <FormInput
              label="Maximum Marks"
              type="number"
              value={form.maxMarks}
              onChange={(val) => handleChange('maxMarks', val)}
              placeholder="20"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Attachment (Optional)</label>
            <div className="relative group">
              <input
                type="file"
                onChange={handleFile}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-white/30 text-gray-500 group-hover:bg-primary-50 group-hover:border-primary-300 group-hover:text-primary-600 transition-all flex items-center gap-2 truncate">
                <FileText size={18} />
                <span className="truncate">{form.attachmentName || "Choose file..."}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <Link
            to="/faculty/assignments"
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <Check size={18} />
            Publish Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;

