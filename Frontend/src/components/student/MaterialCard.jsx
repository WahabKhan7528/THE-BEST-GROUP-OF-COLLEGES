const badgeColors = {
  PDF: 'text-red-700 bg-red-50 border-red-100',
  Video: 'text-slate-700 bg-slate-50 border-slate-100',
  Image: 'text-sky-700 bg-sky-50 border-sky-100',
  Notes: 'text-cyan-700 bg-cyan-50 border-cyan-100',
};

const MaterialCard = ({ name, type, date, description }) => {
  const badgeClass = badgeColors[type] || 'text-gray-700 bg-gray-50 border-gray-100';

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">{date}</p>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badgeClass}`}>
          {type}
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
};

export default MaterialCard;

