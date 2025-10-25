import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// Props interface
interface CustomSelectProps<T = any> {
  label: string;
  options: T[] | undefined;
  value?: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  disabled?: boolean;
  displayKey: string;
  valueKey: string;
  className?: string;
  searchable?: boolean;
  clearable?: boolean;
  maxHeight?: string;
  required?: boolean;
}

// Custom hook for click outside
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

// Main component
export function CustomSelect<T = any>({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  displayKey,
  valueKey,
  className = "",
  searchable = false,
  clearable = false,
  maxHeight = "200px",
  required = false,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useClickOutside(
    selectRef,
    useCallback(() => setIsOpen(false), [])
  );

  // Helper function to get nested property value
  const getNestedValue = useCallback((obj: any, path: string) => {
    return path?.split(".").reduce((current, key) => current?.[key], obj);
  }, []);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options?.filter((option) =>
      getNestedValue(option, displayKey)
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable, displayKey, getNestedValue]);

  // Find selected option for display
  const selectedOption = useMemo(() => {
    if (!value) return null;
    return options?.find((option) => {
      const optionValue = getNestedValue(option, valueKey);
      const selectedValue = getNestedValue(value, valueKey);

      return JSON.stringify(optionValue) === JSON.stringify(selectedValue);
    });
  }, [options, value, valueKey, getNestedValue]);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: T) => {
      const optionDisabled = getNestedValue(option, "disabled");
      if (optionDisabled) return;

      onChange(option);
      setIsOpen(false);
      setSearchTerm("");
    },
    [onChange, getNestedValue]
  );

  // Handle clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      setSearchTerm("");
    },
    [onChange]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          if (!isOpen) {
            setIsOpen(true);
            e.preventDefault();
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
          }
          e.preventDefault();
          break;
        case "ArrowUp":
          e.preventDefault();
          break;
      }
    },
    [disabled, isOpen]
  );

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const baseClasses = `
    relative w-full min-w-0 bg-white border border-gray-300 rounded-lg shadow-sm
    focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
    transition-all duration-200 ease-in-out
    ${
      disabled
        ? "bg-gray-50 cursor-not-allowed opacity-60"
        : "cursor-pointer hover:border-gray-400"
    }
    ${className}
  `;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="block text-sm font-medium mb-2 transition-colors duration-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div ref={selectRef} className={baseClasses}>
        {/* Main select button */}
        <div
          className="flex items-center justify-between px-3 py-2 min-h-[42px]"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex-1 min-w-0">
            {selectedOption ? (
              <span className="block truncate text-gray-900 text-sm">
                {getNestedValue(selectedOption, displayKey)}
              </span>
            ) : (
              <span className="block truncate text-gray-500 text-sm">
                {placeholder}
              </span>
            )}
          </div>

          <div className="flex items-center ml-2 space-x-1">
            {clearable && selectedOption && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                tabIndex={-1}
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            )}

            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            {/* Search input */}
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search options..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Options list */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight }}
              role="listbox"
            >
              {filteredOptions?.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  {searchTerm ? "No options found" : "No options available"}
                </div>
              ) : (
                filteredOptions?.map((option, index) => {
                  const optionValue = getNestedValue(option, valueKey);
                  const optionLabel = getNestedValue(option, displayKey);
                  const optionDisabled = getNestedValue(option, "disabled");

                  const isSelected =
                    selectedOption &&
                    JSON.stringify(getNestedValue(option, valueKey)) ===
                      JSON.stringify(getNestedValue(selectedOption, valueKey));

                  return (
                    <div
                      key={`${JSON.stringify(optionValue)}-${index}`}
                      className={`
                      flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors
                      ${
                        optionDisabled
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "text-gray-900 hover:bg-gray-50"
                      }
                      ${isSelected ? "bg-blue-50 text-blue-700" : ""}
                    `}
                      onClick={() => handleOptionSelect(option)}
                      role="option"
                      // aria-selected={isSelected}
                    >
                      <span className="flex-1 truncate">{optionLabel}</span>
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* TODO: convert to Render dropdown in portal for best solution */}
      {/* {dropdownContent && createPortal(dropdownContent, document.body)} */}
    </div>
  );
}
