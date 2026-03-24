import React from "react";
import { clsx } from "clsx";

/**
 * PortalPageHeader - Recreated from Scratch (High-Authority Design)
 *
 * Aesthetics:
 * - Solid College Navy background with subtle contrast.
 * - Solid College Gold vertical pillar for structural strength.
 * - Dual-layer prestigious typography.
 * - Clean, heavy, and institutional feel.
 */
export default function PortalPageHeader({
  title,
  subtitle,
  badge,
  action,
  className,
}) {
  return (
    <div
      className={clsx(
        "relative bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden transition-colors duration-300",
        className,
      )}
    >
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-college-navy/[0.03] dark:from-white/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
        <div className="flex gap-4 md:gap-8">
          {/* Gold Vertical Pillar Accent */}
          <div className="w-[6px] md:w-[8px] bg-college-navy dark:bg-college-gold rounded-full shadow-[0_0_15px_rgba(0,33,71,0.1)] dark:shadow-[0_0_15px_rgba(197,160,89,0.3)]" />

          <div className="space-y-3 md:space-y-4">
            {/* Meta Label / Badge */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="text-[10px] md:text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-tight flex flex-wrap items-center gap-2 max-w-full">
                Institutional Portal
                {badge && (
                  <div className="h-1 w-1 rounded-full bg-college-navy dark:bg-college-gold" />
                )}
                {badge && (
                  <span className="scale-90 origin-left max-w-full">
                    {badge}
                  </span>
                )}
              </span>
            </div>

            {/* High-Authority Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-black text-college-navy dark:text-white tracking-tight leading-none uppercase">
              {title}
            </h1>

            <div className="h-px w-24 bg-college-navy/20 dark:bg-college-gold/20" />

            {/* Subtitle - Restored rendering */}
            {subtitle && (
              <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed transition-colors">
                {subtitle}
              </p>
            )}

            {/* Meta Line - Cleaned up per feedback */}
            <div className="flex items-center pt-1 md:pt-2">
              <span className="text-[11px] font-bold text-college-navy/40 dark:text-college-gold/50 lg:text-gray-400 uppercase tracking-[0.3em] transition-colors">
                Authorized Access Only
              </span>
            </div>
          </div>
        </div>

        {/* Optional Right Action Slot */}
        {action && (
          <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0 flex flex-col sm:flex-row sm:items-center justify-start md:justify-end gap-3 [&>*]:w-full sm:[&>*]:w-auto">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
