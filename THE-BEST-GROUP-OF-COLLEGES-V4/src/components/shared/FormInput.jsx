import React from "react";

const FormInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    helper,
    className,
}) => {
    return (
        <label className="text-xs md:text-sm text-college-navy dark:text-gray-200 font-medium space-y-1 block">
            <span>{label}{required ? ' *' : ''}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                required={required}
                className={className || "w-full px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 dark:text-white dark:placeholder-gray-400 focus:bg-white dark:focus:bg-college-navy/50 shadow-sm focus:border-college-navy dark:focus:border-college-gold focus:ring-college-navy/20 dark:focus:ring-college-gold/20 transition"}
            />
            {helper && <span className="text-[10px] md:text-xs text-college-navy/50 dark:text-gray-400">{helper}</span>}
        </label>
    );
};

export default FormInput;
