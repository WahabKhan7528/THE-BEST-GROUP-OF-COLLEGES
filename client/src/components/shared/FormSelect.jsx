import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * FormSelect - A consistent select component that matches the FormInput styling.
 * Supports React Hook Form registration and manual state.
 */
const FormSelect = ({
  label,
  options = [],
  required = false,
  error,
  registration,
  className = "",
  disabled = false,
  placeholder = "Select an option",
  ...props
}) => {
  const selectProps = registration ? { ...registration } : { ...props };

  return (
    <div className={`space-y-1.5 block w-full ${className}`}>
      {label && (
        <span className="text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] block px-0.5">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <div className="relative group">
        <select
          {...selectProps}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-2.5 md:py-3.5 bg-white dark:bg-college-navy/50 
            border border-college-navy/10 dark:border-college-gold/20 rounded-sm 
            shadow-sm transition-all appearance-none dark:text-white font-bold text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-college-navy/10 dark:focus:ring-college-gold/10 
            focus:border-college-navy dark:focus:border-college-gold 
            disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-black/20 disabled:cursor-not-allowed
            ${error ? 'border-red-400 dark:border-red-500 focus:ring-red-500/20' : ''}
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id || opt.value} value={opt.id || opt.value} className="dark:bg-college-navy dark:text-white">
              {opt.label || opt.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-college-navy/40 dark:text-college-gold/50 group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
      {error && (
        <p className="text-red-500 dark:text-red-400 text-[10px] md:text-xs mt-0.5 font-bold animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
