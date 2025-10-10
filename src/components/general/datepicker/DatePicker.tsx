import React from "react";
import DatePicker from "react-datepicker";

interface ReusableDatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  dateFormat?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export const ReusableDatePicker: React.FC<ReusableDatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select a date",
  dateFormat = "MMMM d, yyyy",
  required = false,
  className,
  error,
}) => {
  // Build the className string using template literals
  const inputClasses = `
    w-full rounded-md border p-2 shadow-sm transition duration-150 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${
      error
        ? "border-red-500 text-red-700 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300"
    }
    ${className || ""}
  `.trim(); // .trim() removes any leading/trailing whitespace

  return (
    <div className="w-full z-10">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        className={inputClasses}
        placeholderText={placeholder}
        required={required}
        autoComplete="off"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
