import { useState } from 'react';

const UploadImage = () => {
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Image uploaded (mock)');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500">CMS • Gallery</p>
        <h1 className="text-2xl font-semibold text-gray-900">Upload image</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <label className="text-sm text-gray-700 space-y-1 block">
          Title
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Orientation day"
          />
        </label>
        <label className="text-sm text-gray-700 space-y-1 block">
          Album
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Campus life"
          />
        </label>
        <label className="text-sm text-gray-700 space-y-1 block">
          Image file
          <input
            type="file"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            className="w-full rounded-lg border-gray-300 text-sm shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {fileName && <span className="text-xs text-gray-500">Selected: {fileName}</span>}
        </label>

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-lg text-sm font-semibold hover:bg-purple-800">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;

