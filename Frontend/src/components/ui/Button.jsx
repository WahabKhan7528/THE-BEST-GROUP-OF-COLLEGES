import { clsx } from "clsx";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md active:bg-primary-800",
  outline:
    "border border-primary-600 text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
  ghost:
    "text-secondary-600 hover:text-primary-600 hover:bg-slate-50",
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
