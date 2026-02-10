import { FileText, Play, Image as ImageIcon, File } from 'lucide-react';

const typeBadge = {
  PDF: 'bg-red-50 text-red-700',
  Slides: 'bg-blue-50 text-blue-700',
  Notes: 'bg-cyan-50 text-cyan-700',
  Image: 'bg-sky-50 text-sky-700',
  Video: 'bg-slate-50 text-slate-700',
};

const iconForType = {
  PDF: FileText,
  Slides: FileText,
  Notes: FileText,
  Image: ImageIcon,
  Video: Play,
};

const MaterialCard = ({ material }) => {
  const badge = typeBadge[material.type] || 'bg-gray-100 text-gray-700';
  const Icon = iconForType[material.type] || File;

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${badge} flex items-center justify-center`}>
            <Icon size={18} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {material.classSection} • {material.subject}
            </p>
            <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
            <p className="text-sm text-gray-600">{material.type}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">{material.uploadDate}</p>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <a
          href={material.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-semibold hover:text-blue-800"
        >
          View
        </a>
        <span className="text-gray-400">•</span>
        <button
          onClick={() => alert(`Starting download for: ${material.title}`)}
          className="text-gray-600 hover:text-gray-800"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;

