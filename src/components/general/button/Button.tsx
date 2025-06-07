import React from "react";

// Define button variants
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

// Define button sizes
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Button component props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

// Variant styles mapping
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent focus:ring-blue-500",
  secondary:
    "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white border-transparent focus:ring-gray-500",
  outline:
    "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-500",
  ghost:
    "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus:ring-gray-500",
  danger:
    "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent focus:ring-red-500",
};

// Size styles mapping
const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-6 py-2.5 text-base md:text-lg",
  xl: "px-8 py-3 text-lg md:text-xl",
};

// Base button styles
const baseStyles = `
  inline-flex items-center justify-center
  font-semibold rounded-lg border
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
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  // Combine all styles
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="mr-1 flex-shrink-0">{leftIcon}</span>
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

// Demo component to showcase the button variants and usage
// const ButtonDemo: React.FC = () => {
//   const [loading1, setLoading1] = React.useState(false);
//   const [loading2, setLoading2] = React.useState(false);

//   const handleLoadingDemo = (setLoadingState: React.Dispatch<React.SetStateAction<boolean>>) => {
//     setLoadingState(true);
//     setTimeout(() => setLoadingState(false), 2000);
//   };

//   // Simple icons for demo
//   const PlusIcon = () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//     </svg>
//   );

//   const ArrowIcon = () => (
//     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//     </svg>
//   );

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-8 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl p-6 shadow-sm">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//           Reusable Button Component
//         </h1>
//         <p className="text-gray-600 mb-6">
//           A flexible, responsive button component built with React, TypeScript, and Tailwind CSS
//         </p>

//         {/* Variants Demo */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Variants</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button variant="primary">Primary</Button>
//             <Button variant="secondary">Secondary</Button>
//             <Button variant="outline">Outline</Button>
//             <Button variant="ghost">Ghost</Button>
//             <Button variant="danger">Danger</Button>
//           </div>
//         </section>

//         {/* Sizes Demo */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h2>
//           <div className="flex flex-wrap items-center gap-3">
//             <Button size="xs">Extra Small</Button>
//             <Button size="sm">Small</Button>
//             <Button size="md">Medium</Button>
//             <Button size="lg">Large</Button>
//             <Button size="xl">Extra Large</Button>
//           </div>
//         </section>

//         {/* States Demo */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">States</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button
//               loading={loading1}
//               onClick={() => handleLoadingDemo(setLoading1)}
//             >
//               {loading1 ? 'Loading...' : 'Click to Load'}
//             </Button>
//             <Button disabled>Disabled</Button>
//             <Button variant="outline" disabled>Disabled Outline</Button>
//           </div>
//         </section>

//         {/* Icons Demo */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">With Icons</h2>
//           <div className="flex flex-wrap gap-3">
//             <Button leftIcon={<PlusIcon />}>Add Item</Button>
//             <Button variant="outline" rightIcon={<ArrowIcon />}>Continue</Button>
//             <Button
//               variant="secondary"
//               leftIcon={<PlusIcon />}
//               rightIcon={<ArrowIcon />}
//             >
//               Both Icons
//             </Button>
//           </div>
//         </section>

//         {/* Full Width Demo */}
//         <section className="mb-8">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Full Width</h2>
//           <div className="space-y-3">
//             <Button fullWidth variant="primary">Full Width Primary</Button>
//             <Button
//               fullWidth
//               variant="outline"
//               loading={loading2}
//               onClick={() => handleLoadingDemo(setLoading2)}
//               leftIcon={!loading2 ? <PlusIcon /> : undefined}
//             >
//               {loading2 ? 'Processing...' : 'Full Width with Loading'}
//             </Button>
//           </div>
//         </section>

//         {/* Responsive Demo */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Responsive Design</h2>
//           <p className="text-sm text-gray-600 mb-3">
//             Buttons automatically adapt to different screen sizes with mobile-first design
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//             <Button variant="primary" fullWidth>Mobile First</Button>
//             <Button variant="secondary" fullWidth>Responsive Text</Button>
//             <Button variant="outline" fullWidth>Scales Nicely</Button>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
