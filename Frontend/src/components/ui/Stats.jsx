import { clsx } from "clsx";

const Stats = ({ items, columns = 4 }) => {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={clsx(
        "grid gap-8 bg-primary-700 p-8 rounded-2xl",
        gridCols[columns],
      )}
    >
      {items.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div key={index} className="text-center group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform group-hover:scale-110 bg-primary-700 text-white border border-primary-600">
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold mb-2 text-white">
              {stat.value}
            </div>
            <div className="text-primary-200">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
