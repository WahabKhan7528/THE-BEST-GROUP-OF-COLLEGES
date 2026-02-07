const StatsCard = ({ title, value, hint, icon: Icon, tone = 'purple' }) => {
  const tones = {
    purple: 'from-purple-500 to-indigo-600 shadow-purple-500/30',
    blue: 'from-blue-500 to-cyan-600 shadow-blue-500/30',
    emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/30',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/30',
  };

  const gradient = tones[tone] || tones.purple;

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
          {hint && <p className="text-xs font-medium text-gray-400">{hint}</p>}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={22} strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

