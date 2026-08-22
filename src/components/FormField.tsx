import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = React.memo(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={`w-full px-4 py-3 border text-xs font-mono tracking-widest uppercase focus:outline-none ${
          error
            ? 'border-red-700 focus:border-red-700'
            : 'border-gray-300 focus:border-black'
        }`}
      />
      {error && (
        <p className="text-[10px] font-mono tracking-widest uppercase font-bold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
});
