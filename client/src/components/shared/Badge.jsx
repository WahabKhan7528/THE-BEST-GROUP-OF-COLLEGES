import { clsx } from "clsx";

const variants = {
  gold: "bg-college-gold/10 text-college-gold border border-college-gold/30 shadow-[0_0_10px_rgba(197,160,89,0.1)]",
  outline:
    "bg-transparent text-college-navy dark:text-white border border-college-navy/20 dark:border-college-gold/30",
  subtle:
    "bg-college-navy/5 dark:bg-white/5 text-college-navy dark:text-white/80 border border-transparent",
  success:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  danger:
    "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
  info: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
  navy: "bg-college-navy shadow-lg text-white border border-college-navy",
};

export default function Badge({ variant = "outline", className, children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center flex-wrap gap-1 text-center font-bold tracking-wider uppercase rounded-sm transition-all duration-200 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs leading-tight max-w-full break-words",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
