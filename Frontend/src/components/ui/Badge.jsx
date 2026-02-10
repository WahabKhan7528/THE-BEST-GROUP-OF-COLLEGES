import { clsx } from 'clsx';

const variants = {
  primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-200',
  success: 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border border-cyan-200',
  warning: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200',
  danger: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200',
  info: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200',
  accent: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200',
};

const solidVariants = {
  primary: 'bg-primary-600 text-white border-0',
  success: 'bg-cyan-600 text-white border-0',
  warning: 'bg-yellow-500 text-white border-0',
  danger: 'bg-red-600 text-white border-0',
  info: 'bg-gray-600 text-white border-0',
  accent: 'bg-blue-600 text-white border-0',
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
                'bg-cyan-500': variant === 'success',
                'bg-yellow-500': variant === 'warning',
                'bg-red-500': variant === 'danger',
                'bg-gray-500': variant === 'info',
                'bg-blue-500': variant === 'accent',
              }
            )}
          />
          {pulse && (
            <span
              className={clsx(
                'absolute top-0 left-0 h-2 w-2 rounded-full animate-ping',
                solid ? 'bg-white/60' : {
                  'bg-primary-400': variant === 'primary',
                  'bg-cyan-400': variant === 'success',
                  'bg-yellow-400': variant === 'warning',
                  'bg-red-400': variant === 'danger',
                  'bg-gray-400': variant === 'info',
                  'bg-blue-400': variant === 'accent',
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