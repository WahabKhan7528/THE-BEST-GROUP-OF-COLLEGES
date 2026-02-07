import { clsx } from "clsx";

const variants = {
  primary:
    "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:from-primary-500 hover:to-primary-600",
  secondary:
    "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md hover:shadow-lg hover:from-gray-50 hover:to-gray-100",
  outline:
    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 hover:border-primary-500 shadow-sm hover:shadow-md",
  gradient:
    "bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-[length:200%_100%] text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:animate-gradient-x",
  ghost:
    "text-gray-600 hover:text-primary-600 hover:bg-primary-50",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-400 hover:to-red-500",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-xl gap-2.5",
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
        "inline-flex items-center justify-center font-semibold",
        "transition-all duration-300 ease-out",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        {
          "opacity-60 cursor-not-allowed hover:scale-100": isDisabled,
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
