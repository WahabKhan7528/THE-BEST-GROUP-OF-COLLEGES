import { clsx } from 'clsx';

const Card = ({
  children,
  className,
  hover = false,
  shadow = 'sm', // Changed default to sm
  padding = true,
  variant = 'default',
  // gradient prop is largely ignored or deprecated
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg',
  };

  const variantClasses = {
    default: 'bg-white border border-border',
    glass: 'bg-white border border-border', // Fallback to default
    elevated: 'bg-white shadow-md border border-gray-100',
    outline: 'bg-transparent border border-border',
  };

  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden', // Changed from 2xl to xl for more professional look
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

// ... existing subcomponents ...

Card.Image = function CardImage({ src, alt, className, overlay = false, bleed = true, ...props }) {
  return (
    <div className={clsx("relative overflow-hidden mb-6", {
      "-mx-6 -mt-6": bleed,
      "rounded-t-2xl": !bleed
    })}>
      <img
        src={src}
        alt={alt}
        className={clsx(
          'w-full h-48 object-cover',
          'transition-transform duration-500 hover:scale-105',
          className
        )}
        {...props}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      )}
    </div>
  );
};

Card.Body = function CardBody({ children, className, ...props }) {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className, as: Component = "h3", ...props }) {
  return (
    <Component className={clsx("text-xl font-bold text-gray-900", className)} {...props}>
      {children}
    </Component>
  );
};

export default Card;