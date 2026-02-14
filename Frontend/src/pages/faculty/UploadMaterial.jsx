import MaterialUploadForm from '../../components/faculty/MaterialUploadForm';
import { useNavigate } from 'react-router-dom';


import { UploadCloud } from 'lucide-react';

const UploadMaterial = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <UploadCloud size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">
              Faculty Portal
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Upload course material
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl">
            Share resources, lecture notes, and assignments with your students.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <MaterialUploadForm
          onSubmit={() => alert('Material uploaded (mock)')}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default UploadMaterial;

