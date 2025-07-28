import React from "react";

export interface CheckboxProps {
  id: string;
  name: string;
  label: string | React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  error,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        className="mt-1 h-5 w-5 rounded border-gray-300 text-instant-mid focus:ring-instant-mid disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <label htmlFor={id} className="text-sm text-gray-800 select-none">
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
