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
    <label className="text-xs md:text-sm text-gray-700 space-y-1 block">
      <span>{label}{required ? ' *' : ''}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={className || "w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base rounded-lg border-neutral-200 bg-white focus:bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition"}
      />
      {helper && <span className="text-[10px] md:text-xs text-gray-500">{helper}</span>}
    </label>
  );
};

export default FormInput;

