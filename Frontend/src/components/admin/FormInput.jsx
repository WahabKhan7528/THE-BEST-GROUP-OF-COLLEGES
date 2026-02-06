const FormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helper,
}) => {
  return (
    <label className="text-sm text-gray-700 space-y-1 block">
      <span>{label}{required ? ' *' : ''}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border-neutral-200 bg-white focus:bg-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition"
      />
      {helper && <span className="text-xs text-gray-500">{helper}</span>}
    </label>
  );
};

export default FormInput;

