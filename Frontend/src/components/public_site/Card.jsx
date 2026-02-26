import { clsx } from 'clsx';

const Card = ({
  children,
  className,
  hover = false,
  shadow = 'sm',
  padding = true,
  variant = 'default',
  ...props
}) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    xl: 'shadow-lg',
  };

  const variantClasses = {
    default: 'bg-white border border-border',
    outline: 'bg-transparent border border-border',
  };

  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden',
        'transition-all duration-200 ease-out',
        variantClasses[variant] || variantClasses.default,
        shadowClasses[shadow],
        {
          'hover:shadow-md hover:border-primary-200 cursor-pointer': hover,
          'p-6': padding,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;