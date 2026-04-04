import React from "react";

const baseInputClass = "w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-sm border border-college-navy/10 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-white/20 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy/10 dark:focus:ring-college-gold/10 transition font-bold";

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
    const isTextarea = type === "textarea";
    const inputProps = registration
        ? { ...registration, type: isTextarea ? undefined : type, placeholder }
        : { type: isTextarea ? undefined : type, name, value, onChange: (e) => onChange?.(e.target.value), placeholder, required };

    return (
        <label className={`text-[10px] md:text-xs text-college-navy/60 dark:text-college-gold/80 font-black uppercase tracking-[0.2em] space-y-1.5 block ${isTextarea ? "col-span-1 md:col-span-2" : ""}`}>
            <span>{label}{required ? ' *' : ''}</span>
            {isTextarea ? (
                <textarea
                    {...inputProps}
                    rows="4"
                    className={className || (error ? errorInputClass : baseInputClass)}
                />
            ) : (
                <input
                    {...inputProps}
                    className={className || (error ? errorInputClass : baseInputClass)}
                />
            )}
            {error && <span className="text-red-500 dark:text-red-400 text-[10px] md:text-xs mt-0.5">{error}</span>}
            {helper && !error && <span className="text-[10px] md:text-xs text-college-navy/50 dark:text-gray-400">{helper}</span>}
        </label>
    );
};

export default FormInput;
