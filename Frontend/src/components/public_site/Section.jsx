import { clsx } from 'clsx';


const BACKGROUNDS = {
  white: 'bg-white text-text-primary',
  gray: 'bg-gray-50 text-text-primary',
  blue: 'bg-primary-700 text-white',
  dark: 'bg-primary-900 text-white',
};

const SPACINGS = {
  none: '',
  small: 'py-10 md:py-12',
  default: 'py-12 md:py-20',
  large: 'py-16 md:py-28',
};

const Section = ({
  children,
  className,
  background = 'white',
  spacing = 'default',
  container = true,
  ...props
}) => {
  return (
    <section
      className={clsx(
        'relative overflow-hidden',
        !className?.includes('bg-') && (BACKGROUNDS[background] || BACKGROUNDS.white),
        SPACINGS[spacing],
        className
      )}
      {...props}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

Section.Header = function SectionHeader({
  title,
  description,
  badge,
  className,
  center = true,
  light = false,// usefull where background is dark
  ...props
}) {
  return (
    <div
      className={clsx(
        'mb-10 md:mb-16',
        center && 'text-center',
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight',
          light ? 'text-white' : 'text-primary-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={clsx("text-lg md:text-xl leading-relaxed", center && "mx-auto max-w-3xl", light ? 'text-primary-50/80' : 'text-text-secondary')}>{description}</p>
      )}
    </div>
  );
};

export default Section;