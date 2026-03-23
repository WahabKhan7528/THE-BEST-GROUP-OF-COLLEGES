import { clsx } from "clsx";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-college-navy text-white shadow-sm hover:bg-college-navy/90 hover:shadow-md active:bg-college-navy/80",
  secondary:
    "bg-college-gold text-college-navy shadow-sm hover:bg-college-gold/90 hover:shadow-md active:bg-college-gold/80 font-semibold",
  outline:
    "border border-college-navy dark:border-college-gold/40 text-college-navy dark:text-college-gold hover:bg-college-navy/5 dark:hover:bg-college-gold/10 hover:text-college-navy active:bg-college-navy/10",
  ghost:
    "text-gray-600 dark:text-gray-400 hover:text-college-gold hover:bg-college-gold/5",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md active:bg-red-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm font-medium rounded-xl gap-2",
  lg: "px-6 py-3 text-base font-medium rounded-xl gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon: Icon,
  disabled = false,
  to,
  ...props
}) {
  const baseClasses = clsx(
    "inline-flex items-center justify-center transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1",
    variants[variant] || variants.primary,
    sizes[size],
    {
      "opacity-50 cursor-not-allowed pointer-events-none": disabled,
    },
    className
  );

  const content = (
    <>
      {children}
      {Icon && (
        <Icon className={clsx("flex-shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
