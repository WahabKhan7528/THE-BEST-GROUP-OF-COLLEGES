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
    white: 'bg-white',
    gray: 'bg-gradient-to-b from-gray-50 to-white',
    blue: 'bg-gradient-to-br from-primary-600 to-primary-700 text-white',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
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
        backgrounds[background],
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
  gradient = false,
  animate = true,
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
          gradient ? 'bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent' : 'text-gray-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-primary-600 font-medium mb-2">{subtitle}</p>
      )}
      {description && (
        <p className={clsx("text-lg md:text-xl text-gray-600 leading-relaxed", { "mx-auto max-w-3xl": center })}>{description}</p>
      )}
    </Wrapper>
  );
};

Section.Divider = function SectionDivider({ className }) {
  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

export default Section;