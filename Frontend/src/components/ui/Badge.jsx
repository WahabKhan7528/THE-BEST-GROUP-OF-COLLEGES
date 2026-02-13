import { clsx } from 'clsx';

const badgeStyles = {
  soft: {
    primary: 'bg-primary-50 text-primary-700 border border-primary-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-slate-50 text-slate-700 border border-slate-200',
    accent: 'bg-primary-50 text-primary-700 border border-primary-200',
  },
  solid: {
    primary: 'bg-primary-600 text-white border-0',
    success: 'bg-green-600 text-white border-0',
    warning: 'bg-yellow-500 text-white border-0',
    danger: 'bg-red-600 text-white border-0',
    info: 'bg-slate-600 text-white border-0',
    accent: 'bg-primary-600 text-white border-0',
  }
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
        badgeStyles[solid ? 'solid' : 'soft'][variant] || badgeStyles.soft.primary,
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
                'bg-primary-500': variant === 'primary' || variant === 'accent',
                'bg-green-500': variant === 'success',
                'bg-yellow-500': variant === 'warning',
                'bg-red-500': variant === 'danger',
                'bg-slate-500': variant === 'info',
              }
            )}
          />
          {pulse && (
            <span
              className={clsx(
                'absolute top-0 left-0 h-2 w-2 rounded-full animate-ping',
                solid ? 'bg-white/60' : {
                  'bg-primary-400': variant === 'primary' || variant === 'accent',
                  'bg-green-400': variant === 'success',
                  'bg-yellow-400': variant === 'warning',
                  'bg-red-400': variant === 'danger',
                  'bg-slate-400': variant === 'info',
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