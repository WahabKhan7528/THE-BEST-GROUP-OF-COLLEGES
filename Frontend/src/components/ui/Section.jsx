import { clsx } from 'clsx';

const Section = ({
  children,
  className,
  background = 'white',
  spacing = 'default',
  container = true,
  ...props
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-blue-600 text-white',
    dark: 'bg-gray-900 text-white',
  };

  const spacings = {
    none: '',
    small: 'py-8',
    default: 'py-16',
    large: 'py-24',
  };

  return (
    <section
      className={clsx(backgrounds[background], spacings[spacing], className)}
      {...props}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

Section.Header = function SectionHeader({
  title,
  description,
  className,
  center = true,
  ...props
}) {
  return (
    <div
      className={clsx(
        'mb-12',
        {
          'text-center': center,
        },
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default Section;