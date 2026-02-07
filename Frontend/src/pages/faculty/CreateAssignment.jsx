import { useState } from 'react';
import { Calendar, Upload, FileText, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.div
      className="max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-4">
        <Link
          to="/faculty/assignments"
          className="p-2.5 rounded-xl bg-white/50 hover:bg-white text-gray-500 hover:text-gray-900 border border-transparent hover:border-gray-200 transition-all duration-200"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Assignment</h1>
          <p className="text-sm text-gray-500">Publish a new assignment for your students</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Class / Section</label>
            <input
              type="text"
              value={form.classSection}
              onChange={(e) => handleChange('classSection', e.target.value)}
              placeholder="e.g. BSCS - A"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Subject</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="e.g. Operating Systems"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Assignment Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. CPU Scheduling Algorithm Report"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Due Date</label>
            <div className="relative">
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                required
              />
              <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Maximum Marks</label>
            <input
              type="number"
              value={form.maxMarks}
              onChange={(e) => handleChange('maxMarks', e.target.value)}
              placeholder="20"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
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
              <div className="w-full px-4 py-3 rounded-xl border border-dashed border-gray-300 bg-white/30 text-gray-500 group-hover:bg-purple-50 group-hover:border-purple-300 group-hover:text-purple-600 transition-all flex items-center gap-2 truncate">
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
            className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Check size={18} />
            Publish Assignment
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateAssignment;

