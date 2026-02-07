import { clsx } from 'clsx';

const Card = ({
  children,
  className,
  hover = false,
  shadow = 'md',
  padding = true,
  variant = 'default',
  gradient = false,
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const variantClasses = {
    default: gradient ? '' : 'bg-white border border-gray-100', // Allow gradient to take precedence
    glass: 'bg-white/70 backdrop-blur-md border border-white/20',
    elevated: 'bg-white border-0',
    outline: 'bg-transparent border-2 border-gray-200',
  };

  return (
    <div
      className={clsx(
        'rounded-2xl overflow-hidden',
        'transition-all duration-300 ease-out',
        variantClasses[variant],
        shadowClasses[shadow],
        {
          'hover:shadow-xl hover:-translate-y-1 hover:border-primary-100 cursor-pointer': hover,
          'p-6': padding,
          'bg-gradient-to-br from-white via-white to-primary-50/30': gradient,
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