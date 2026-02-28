import { FileText, Play, Image as ImageIcon, File } from 'lucide-react';

/*
 Shared MaterialCard
 
 Accepts a `material` object with: { title, type, uploadDate/date, description, classSection, subject, link }

 variant="faculty" (default) — shows icon, classSection•subject header, View (anchor) + Download link
 variant="student"— shows date, name, type badge, View + Download buttons, "Tap to preview"
 */

const typeBadge = {
    PDF: 'bg-red-50 text-red-700',
    Slides: 'bg-blue-50 text-blue-700',
    Notes: 'bg-cyan-50 text-cyan-700',
    Image: 'bg-sky-50 text-sky-700',
    Video: 'bg-slate-50 text-slate-700',
};

const badgeColors = {
    PDF: 'text-red-700 bg-red-50 border-red-100',
    Video: 'text-slate-700 bg-slate-50 border-slate-100',
    Image: 'text-sky-700 bg-sky-50 border-sky-100',
    Notes: 'text-cyan-700 bg-cyan-50 border-cyan-100',
    Slides: 'text-blue-700 bg-blue-50 border-blue-100',
};

const iconForType = {
    PDF: FileText,
    Slides: FileText,
    Notes: FileText,
    Image: ImageIcon,
    Video: Play,
};

const MaterialCard = ({ material, role = 'faculty' }) => {
    if (role === 'student') {
        const badgeClass = badgeColors[material.type] || 'text-gray-700 bg-gray-50 border-gray-100';
        return (
            <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500">{material.date || material.uploadDate}</p>
                        <h3 className="text-lg font-semibold text-gray-900 break-words">{material.title || material.name}</h3>
                        {material.description && (
                            <p className="text-sm text-gray-600 mt-1 break-words">{material.description}</p>
                        )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${badgeClass}`}>
                        {material.type}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-3">
                        <button className="text-blue-700 font-semibold hover:text-blue-800">
                            View
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                            Download
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Tap to preview</p>
                </div>
            </div>
        );
    }

    // faculty variant (default)
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
                <p className="text-xs text-gray-500">{material.uploadDate || material.date}</p>
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
