const badgeColors = {
  PDF: 'text-red-700 bg-red-50 border-red-100',
  Video: 'text-blue-700 bg-blue-50 border-blue-100',
  Image: 'text-amber-700 bg-amber-50 border-amber-100',
  Notes: 'text-emerald-700 bg-emerald-50 border-emerald-100',
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
          <button className="text-purple-700 font-semibold hover:text-purple-800">
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

