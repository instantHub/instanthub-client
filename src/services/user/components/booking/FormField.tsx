import { FC, memo, useCallback } from "react";
import { FieldConfig } from "./types";

export const FormField: FC<{
  fieldKey: string;
  config: FieldConfig;
  value: any;
  onChange: (key: string, value: any) => void;
  error?: string;
}> = memo(({ fieldKey, config, value, onChange, error }) => {
  const {
    type,
    label,
    placeholder,
    options,
    rows,
    icon: Icon,
    multiple,
    min,
  } = config;

  const handleChange = useCallback(
    (newValue: any) => {
      onChange(fieldKey, newValue);
    },
    [fieldKey, onChange]
  );

  const renderField = () => {
    const baseClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error ? "border-red-500" : "border-gray-300"
    }`;

    switch (type) {
      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={baseClasses}
          />
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className={baseClasses}
          >
            <option value="">
              {placeholder || `Select ${label.toLowerCase()}`}
            </option>
            {options?.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-wrap gap-4">
            {options?.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              return (
                <label
                  key={optionValue}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={fieldKey}
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={(e) => handleChange(e.target.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{optionLabel}</span>
                </label>
              );
            })}
          </div>
        );

      case "checkbox":
        return (
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
            {options?.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              const isChecked = Array.isArray(value)
                ? value.includes(optionValue)
                : false;

              return (
                <label
                  key={optionValue}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      const currentValue = Array.isArray(value) ? value : [];
                      const newValue = e.target.checked
                        ? [...currentValue, optionValue]
                        : currentValue.filter((item) => item !== optionValue);
                      handleChange(newValue);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{optionLabel}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            min={min}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {/* {Icon && <Icon className="inline w-4 h-4 mr-1" />} */}
        {label} {config.required && "*"}
      </label>
      {renderField()}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});
