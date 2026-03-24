import React from "react";

const baseInputClass = "w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-sm border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-gray-400 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy/20 dark:focus:ring-college-gold/20 transition";

const errorInputClass = "w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-sm border border-red-400 dark:border-red-500 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-gray-400 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20 transition";

const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    helper,
    error,
    registration,
    className,
}) => {
    const inputProps = registration
        ? { ...registration, type, placeholder }
        : { type, name, value, onChange: (e) => onChange?.(e.target.value), placeholder, required };

    return (
        <label className="text-xs md:text-sm text-college-navy dark:text-gray-200 font-medium space-y-1 block">
            <span>{label}{required ? ' *' : ''}</span>
            <input
                {...inputProps}
                className={className || (error ? errorInputClass : baseInputClass)}
            />
            {error && <span className="text-red-500 dark:text-red-400 text-[10px] md:text-xs mt-0.5">{error}</span>}
            {helper && !error && <span className="text-[10px] md:text-xs text-college-navy/50 dark:text-gray-400">{helper}</span>}
        </label>
    );
};

export default FormInput;
