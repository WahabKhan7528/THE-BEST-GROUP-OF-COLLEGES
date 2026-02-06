import { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';

const CreateAssignment = () => {
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
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Assignments</p>
          <h1 className="text-2xl font-semibold text-gray-900">Create new assignment</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-gray-700 space-y-1">
            Class / Section
            <input
              type="text"
              value={form.classSection}
              onChange={(e) => handleChange('classSection', e.target.value)}
              placeholder="BSCS - A"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </label>
          <label className="text-sm text-gray-700 space-y-1">
            Subject
            <input
              type="text"
              value={form.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Operating Systems"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </label>
        </div>

        <label className="text-sm text-gray-700 space-y-1 block">
          Title
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="CPU Scheduling Report"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>

        <label className="text-sm text-gray-700 space-y-1 block">
          Description
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            placeholder="Describe the assignment, expectations, and submission format."
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="text-sm text-gray-700 space-y-1">
            Due date
            <div className="relative">
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 pr-10"
              />
              <Calendar size={16} className="absolute right-3 top-3 text-gray-400" />
            </div>
          </label>
          <label className="text-sm text-gray-700 space-y-1">
            Maximum marks
            <input
              type="number"
              value={form.maxMarks}
              onChange={(e) => handleChange('maxMarks', e.target.value)}
              placeholder="20"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </label>
          <label className="text-sm text-gray-700 space-y-1">
            Attachment (optional)
            <input
              type="file"
              onChange={handleFile}
              className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
            {form.attachmentName && (
              <span className="text-xs text-gray-500">Selected: {form.attachmentName}</span>
            )}
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-800"
          >
            <Upload size={16} />
            Publish Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;

