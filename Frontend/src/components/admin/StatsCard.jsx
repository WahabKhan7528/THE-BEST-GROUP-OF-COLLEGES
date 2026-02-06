const StatsCard = ({ title, value, hint, icon: Icon, tone = 'purple' }) => {
  const tones = {
    purple: 'bg-purple-50 text-purple-700',
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  const badge = tones[tone] || tones.purple;

  return (
    <div className="bg-white/90 border border-neutral-200 rounded-2xl p-4 shadow-sm hover:shadow-[0_10px_30px_rgba(67,56,202,0.08)] transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl ${badge} flex items-center justify-center`}>
            <Icon size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

