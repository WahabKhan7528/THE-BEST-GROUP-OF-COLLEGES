const StatsCard = ({ title, value, hint, icon: Icon }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
          {hint && <p className="text-xs font-medium text-gray-400">{hint}</p>}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 transform group-hover:scale-110 transition-transform duration-300">
            <Icon size={22} strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

