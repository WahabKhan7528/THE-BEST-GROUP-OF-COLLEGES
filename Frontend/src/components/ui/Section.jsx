import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Section = ({
  children,
  className,
  background = 'white',
  spacing = 'default',
  container = true,
  animate = false,
  ...props
}) => {
  const backgrounds = {
    white: 'bg-white text-text-primary',
    gray: 'bg-gray-50 text-text-primary',
    blue: 'bg-primary-700 text-white',
    dark: 'bg-primary-900 text-white',
    gradient: 'bg-primary-50 text-text-primary',
  };

  const spacings = {
    none: '',
    small: 'py-10 md:py-12',
    default: 'py-12 md:py-20',
    large: 'py-16 md:py-28',
  };

  const Wrapper = animate ? motion.section : 'section';
  const wrapperProps = animate ? {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  } : {};

  return (
    <Wrapper
      className={clsx(
        'relative overflow-hidden',
        !className?.includes('bg-') && (backgrounds[background] || backgrounds.white),
        spacings[spacing],
        className
      )}
      {...wrapperProps}
      {...props}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
      ) : (
        children
      )}
    </Wrapper>
  );
};

Section.Header = function SectionHeader({
  title,
  description,
  subtitle,
  badge,
  className,
  center = true,
  gradient = false, // Ignored now
  animate = true,
  light = false,
  ...props
}) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  } : {};

  return (
    <Wrapper
      className={clsx(
        'mb-10 md:mb-16',
        {
          'text-center': center,
        },
        className
      )}
      {...wrapperProps}
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
      {subtitle && (
        <p className={clsx("text-lg font-medium mb-2", light ? 'text-primary-100' : 'text-primary-600')}>{subtitle}</p>
      )}
      {description && (
        <p className={clsx("text-lg md:text-xl leading-relaxed", center && "mx-auto max-w-3xl", light ? 'text-primary-50/80' : 'text-text-secondary')}>{description}</p>
      )}
    </Wrapper>
  );
};

Section.Divider = function SectionDivider({ className }) {
  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      <div className="h-px bg-border" />
    </div>
  );
};

export default Section;