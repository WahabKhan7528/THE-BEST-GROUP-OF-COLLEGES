import { clsx } from 'clsx';

const Card = ({
  children,
  className,
  hover = false,
  shadow = 'md',
  padding = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg overflow-hidden',
        {
          'hover:shadow-lg transition-shadow duration-300': hover,
          'p-6': padding,
          'shadow-sm': shadow === 'sm',
          'shadow-md': shadow === 'md',
          'shadow-lg': shadow === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx('border-b border-gray-200 pb-4 mb-4', className)} {...props}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={clsx('text-lg font-bold', className)} {...props}>
      {children}
    </h3>
  );
};

Card.Body = function CardBody({ children, className, ...props }) {
  return (
    <div className={clsx('', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ children, className, ...props }) {
  return (
    <div className={clsx('border-t border-gray-200 pt-4 mt-4', className)} {...props}>
      {children}
    </div>
  );
};

export default Card;