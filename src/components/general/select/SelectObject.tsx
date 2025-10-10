import React, { useState, useRef, useEffect, useCallback } from "react";

// A custom hook to detect clicks outside a component
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
};

// --- Component Props ---
interface SelectObjectProps<T> {
  label: string;
  options: T[] | undefined;
  value: T | null; // The currently selected object
  onChange: (value: T | null) => void; // Callback with the full object
  displayKey: keyof T; // Key to display in the dropdown
  valueKey: keyof T; // Key for unique identification
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
  required?: boolean;
}

// --- The Component ---
export function SelectObject<T extends Record<string, any>>({
  label,
  options = [],
  value,
  onChange,
  displayKey,
  valueKey,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  clearable = false,
  required = false,
}: SelectObjectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside of it
  useClickOutside(selectRef, () => setIsOpen(false));

  const handleOptionSelect = useCallback(
    (option: T) => {
      onChange(option); // Pass the whole object back
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the dropdown from opening
      onChange(null);
    },
    [onChange]
  );

  // The text to display in the select input
  const displayedValue = value ? value[displayKey] : placeholder;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Select Container */}
      <div ref={selectRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
        >
          <span
            className={`block truncate ${
              value ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {displayedValue}
          </span>

          {/* Icons Container */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {/* Clear button appears here when not disabled */}
            {clearable && value && !disabled && (
              <div
                className="p-1 mr-1 pointer-events-auto cursor-pointer"
                onClick={handleClear}
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.length === 0 ? (
              <div className="text-gray-500 text-center py-2 px-3">
                No options available
              </div>
            ) : (
              options.map((option, index) => {
                const isSelected =
                  value && value[valueKey] === option[valueKey];
                return (
                  <div
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors
                      ${
                        isSelected
                          ? "text-white bg-blue-600"
                          : "text-gray-900 hover:bg-blue-50"
                      }`}
                  >
                    <span
                      className={`block truncate ${
                        isSelected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {option[displayKey]}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
