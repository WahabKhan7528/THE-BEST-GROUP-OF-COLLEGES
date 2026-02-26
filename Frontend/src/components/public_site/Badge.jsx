import { clsx } from 'clsx';

const Badge = ({
  children,
  variant = 'soft',
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        'transition-all duration-200',
        'px-2.5 py-1 text-sm',
        variant === 'solid'
          ? 'bg-primary-600 text-white border-0'
          : 'bg-primary-50 text-primary-700 border border-primary-200',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;