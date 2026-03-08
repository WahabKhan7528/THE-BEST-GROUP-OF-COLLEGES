import { FileText, Play, Image as ImageIcon, File } from 'lucide-react';

/*
 Shared MaterialCard
 
 Accepts a `material` object with: { title, type, uploadDate/date, description, classSection, subject, link }

 variant="faculty" (default) — shows icon, classSection•subject header, View (anchor) + Download link
 variant="student"— shows date, name, type badge, View + Download buttons, "Tap to preview"
 */

const typeBadge = {
    PDF: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold',
    Slides: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold',
    Notes: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold',
    Image: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold',
    Video: 'bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold',
};

const badgeColors = {
    PDF: 'text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20',
    Video: 'text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20',
    Image: 'text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20',
    Notes: 'text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20',
    Slides: 'text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 border-college-navy/10 dark:border-college-gold/20',
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
        const badgeClass = badgeColors[material.type] || 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700';
        return (
            <div className="bg-white dark:bg-college-navy border dark:border-college-gold/50 border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{material.date || material.uploadDate}</p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white break-words">{material.title || material.name}</h3>
                        {material.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">{material.description}</p>
                        )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${badgeClass}`}>
                        {material.type}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-3">
                        <button className="text-college-navy dark:text-college-gold font-semibold hover:text-college-navy/80 dark:hover:text-college-gold/80">
                            View
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Download
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tap to preview</p>
                </div>
            </div>
        );
    }

    // faculty variant (default)
    const badge = typeBadge[material.type] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    const Icon = iconForType[material.type] || File;

    return (
        <div className="bg-white dark:bg-college-navy border border-gray-100 dark:border-college-gold/50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${badge} flex items-center justify-center`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {material.classSection} • {material.subject}
                        </p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white">{material.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{material.type}</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{material.uploadDate || material.date}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <a
                    href={material.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-college-navy dark:text-college-gold font-semibold hover:text-college-navy/80 dark:hover:text-college-gold/80"
                >
                    View
                </a>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <button
                    onClick={() => alert(`Starting download for: ${material.title}`)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default MaterialCard;
