import { useState, useRef, useEffect } from "react";

// The component is generic, but we need a way to get a display label from an option.
// We'll require a `getOptionLabel` function prop for maximum flexibility.
interface DropdownProps<T> {
  options: T[];
  value: T | null;
  onChange: (option: T | null) => void;
  getOptionLabel: (option: T) => string;
  placeholder?: string;
  showSelectedLabel?: boolean; // Controls the button label display
}

export const Dropdown = <T,>({
  options,
  value,
  onChange,
  getOptionLabel,
  placeholder = "Select an item...",
  showSelectedLabel = true,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: T) => {
    onChange(option);
    setIsOpen(false);
  };

  // Determine the text to display on the button based on the props
  const buttonLabel =
    showSelectedLabel && value ? getOptionLabel(value) : placeholder;

  const buttonClasses = `
    flex items-center justify-between w-full p-2 text-left bg-white 
    border border-gray-300 rounded-md focus:outline-none focus:ring-2 
    focus:ring-blue-500
  `.trim();

  const listClasses = `
    absolute z-10 w-full mt-2 bg-white border border-gray-200 
    rounded-md shadow-lg max-h-60 overflow-auto
  `.trim();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
      >
        <span>{buttonLabel}</span>
        <span className="ml-auto text-gray-500">▼</span>
      </button>

      {isOpen && (
        <ul className={listClasses}>
          {options.map((option, index) => {
            const isSelected = value === option;
            const itemClasses = `
              flex items-center justify-between px-4 py-2 cursor-pointer 
              hover:bg-gray-100 ${isSelected ? "font-semibold" : ""}
            `.trim();

            return (
              <li
                key={index} // Use a unique ID from your data if available, e.g., option.id
                onClick={() => handleOptionClick(option)}
                className={itemClasses}
              >
                <span>{getOptionLabel(option)}</span>
                {isSelected && <span className="text-blue-500">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
