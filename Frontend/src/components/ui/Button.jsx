import { clsx } from "clsx";

const variants = {
  primary:
    "bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md active:bg-primary-800",
  secondary:
    "bg-primary-50 text-primary-700 shadow-sm hover:bg-primary-100 hover:text-primary-800",
  outline:
    "border border-primary-600 text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
  ghost:
    "text-secondary-600 hover:text-primary-600 hover:bg-slate-50",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700",
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
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1",
        variants[variant] || variants.primary,
        sizes[size],
        {
          "opacity-50 cursor-not-allowed pointer-events-none": isDisabled,
          "flex-row-reverse": iconPosition === "right",
        },
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <svg
          className={clsx("animate-spin", size === "sm" ? "h-4 w-4" : "h-5 w-5")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon ? (
        <Icon className={clsx("flex-shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      ) : null}
      {children}
    </button>
  );
}
