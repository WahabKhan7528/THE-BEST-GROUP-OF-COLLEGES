import { clsx } from 'clsx';

const variants = {
  primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-200',
  success: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
  warning: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200',
  danger: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200',
  info: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200',
  accent: 'bg-gradient-to-r from-accent-100 to-cyan-100 text-accent-800 border border-accent-200',
};

const solidVariants = {
  primary: 'bg-primary-600 text-white border-0',
  success: 'bg-green-600 text-white border-0',
  warning: 'bg-amber-500 text-white border-0',
  danger: 'bg-red-600 text-white border-0',
  info: 'bg-gray-600 text-white border-0',
  accent: 'bg-accent-600 text-white border-0',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  solid = false,
  dot = false,
  pulse = false,
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        'transition-all duration-200',
        solid ? solidVariants[variant] : variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative mr-1.5">
          <span
            className={clsx(
              'block h-2 w-2 rounded-full',
              solid ? 'bg-white/80' : {
                'bg-primary-500': variant === 'primary',
                'bg-green-500': variant === 'success',
                'bg-amber-500': variant === 'warning',
                'bg-red-500': variant === 'danger',
                'bg-gray-500': variant === 'info',
                'bg-accent-500': variant === 'accent',
              }
            )}
          />
          {pulse && (
            <span
              className={clsx(
                'absolute top-0 left-0 h-2 w-2 rounded-full animate-ping',
                solid ? 'bg-white/60' : {
                  'bg-primary-400': variant === 'primary',
                  'bg-green-400': variant === 'success',
                  'bg-amber-400': variant === 'warning',
                  'bg-red-400': variant === 'danger',
                  'bg-gray-400': variant === 'info',
                  'bg-accent-400': variant === 'accent',
                }
              )}
            />
          )}
        </span>
      )}
      {Icon && (
        <Icon className={clsx('mr-1', size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />
      )}
      {children}
    </span>
  );
};

export default Badge;