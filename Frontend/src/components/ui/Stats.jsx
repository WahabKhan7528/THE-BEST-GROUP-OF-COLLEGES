import { clsx } from "clsx";
import { useEffect, useState, useRef } from "react";

const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const targetNum = parseInt(target.toString().replace(/\D/g, ""));
    const increment = targetNum / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return [count, ref];
};

const Stats = ({ items, variant = "light", columns = 4 }) => {
  const variants = {
    light: {
      wrapper: "bg-white",
      icon: "bg-blue-100 text-blue-600",
      value: "text-gray-900",
      label: "text-gray-600",
    },
    dark: {
      wrapper: "bg-transparent",
      icon: "bg-blue-500 text-white",
      value: "text-white",
      label: "text-gray-100",
    },
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={clsx("grid gap-8", gridCols[columns])}>
      {items.map((stat, index) => {
        const [count, ref] = useCounter(stat.value);
        const Icon = stat.icon;
        const suffix = stat.value.replace(/\d/g, "");

        return (
          <div key={index} ref={ref} className="text-center">
            <div
              className={clsx(
                "inline-flex items-center justify-center w-12 h-12 rounded-full mb-4",
                variants[variant].icon
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div
              className={clsx(
                "text-3xl font-bold mb-2",
                variants[variant].value
              )}
            >
              {count}
              {suffix}
            </div>
            <div className={clsx(variants[variant].label)}>{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
