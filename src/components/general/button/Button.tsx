import React from "react";

// Define button variants
type ButtonVariant =
  | "primary"
  | "secondary"
  | "greenary"
  | "outline"
  | "ghost"
  | "danger"
  | "instanthub";

// Define button sizes
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonShape = "rounded" | "square";

// Button component props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

// Variant styles mapping
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent focus:ring-blue-500",
  secondary:
    "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white border-transparent focus:ring-gray-500",
  greenary:
    "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-transparent focus:ring-green-500",
  outline:
    "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500",
  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus:ring-gray-500",
  danger:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent focus:ring-red-500",
  instanthub:
    "bg-instant-mid/85 hover:bg-instant-mid active:bg-instant-mid text-white border-transparent focus:ring-instant-mid",
};

// Size styles mapping
const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-4 md:px-6 py-2.5 text-sm md:text-lg",
  xl: "px-8 py-3 text-lg md:text-xl",
};

// Size styles mapping
const shapeStyles: Record<ButtonShape, string> = {
  rounded: "rounded-full",
  square: "rounded-lg",
};

// Base button styles
const baseStyles = `
  inline-flex items-center justify-center
  font-semibold border
  transition-all duration-200 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  active:scale-95 transform my-2
`
  .replace(/\s+/g, " ")
  .trim();

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  shape = "rounded",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  isActive = false,
  className = "",
  disabled,
  ...props
}) => {
  // Combine all styles
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    fullWidth ? "w-full" : "",
    isActive ? "ring ring-offset-2" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="mr- flex-shrink-0">{leftIcon}</span>
      )}

      {/* Loading spinner */}
      {loading && (
        <span className="mr-2 flex-shrink-0">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}

      {/* Button text */}
      <span className="truncate">{children}</span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="ml-1 flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
