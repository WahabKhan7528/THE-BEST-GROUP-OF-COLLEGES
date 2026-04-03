import React, { cloneElement } from 'react';

const SkeletonLoading = ({
  count = 1,
  variant = "card",
  className = "",
  containerClassName = "",
}) => {
  // Premium base design utilizing specific college dark mode tokens
  const hasBg = className && typeof className === 'string' && className.includes('bg-');
  const baseContainer = `${hasBg ? '' : 'bg-gray-100 dark:bg-dark-surface'} border border-gray-200/60 dark:border-dark-border shadow-sm`;
  const pulseBlock = "bg-gray-200/80 dark:bg-dark-elevated rounded animate-pulse";

  const renderVariant = () => {
    switch (variant) {
      case "card":
        return (
          <div className={`relative flex flex-col p-4 rounded-2xl ${baseContainer} overflow-hidden ${className || "h-64"}`}>
            <div className={`w-full flex-1 min-h-[50%] rounded-xl mb-4 ${pulseBlock}`} />
            <div className={`w-3/4 h-5 mt-auto mb-2 ${pulseBlock}`} />
            <div className={`w-1/2 h-4 ${pulseBlock}`} />
          </div>
        );

      case "avatarCard":
        return (
          <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl ${baseContainer} overflow-hidden ${className || "h-72"}`}>
            <div className={`w-28 h-28 rounded-full mb-6 ${pulseBlock}`} />
            <div className={`w-3/4 h-6 mb-3 ${pulseBlock}`} />
            <div className={`w-1/2 h-4 ${pulseBlock}`} />
            <div className={`w-full h-10 mt-auto rounded-xl ${pulseBlock}`} />
          </div>
        );

      case "tableRow":
        return (
          <div className={`relative flex items-center space-x-4 p-3 rounded-xl ${baseContainer} overflow-hidden ${className || "h-14"}`}>
            <div className={`w-10 h-10 rounded-full shrink-0 ${pulseBlock}`} />
            <div className="flex-1 space-y-2.5">
              <div className={`w-full h-3 ${pulseBlock}`} />
              <div className={`w-4/5 h-3 ${pulseBlock}`} />
            </div>
            <div className={`hidden sm:block w-24 h-5 rounded-full ${pulseBlock}`} />
          </div>
        );

      case "panel":
        return (
          <div className={`relative p-5 rounded-2xl ${baseContainer} overflow-hidden ${className || "h-40"}`}>
            <div className="flex justify-between items-start mb-6">
               <div className={`w-1/3 h-6 ${pulseBlock}`} />
               <div className={`w-10 h-10 rounded-full ${pulseBlock}`} />
            </div>
            <div className="space-y-3 mt-auto">
              <div className={`w-full h-3.5 ${pulseBlock}`} />
              <div className={`w-11/12 h-3.5 ${pulseBlock}`} />
              <div className={`w-3/4 h-3.5 ${pulseBlock}`} />
            </div>
          </div>
        );

      case "textLine":
      default:
        return (
          <div className={`rounded-full animate-pulse ${hasBg ? '' : 'bg-gray-200 dark:bg-dark-surface'} ${className || "h-4 w-full"}`} />
        );
    }
  };

  return (
    <div className={containerClassName}>
      {Array.from({ length: count }).map((_, index) => {
         const element = renderVariant();
         return cloneElement(element, { key: index });
      })}
    </div>
  );
};

export default SkeletonLoading;
