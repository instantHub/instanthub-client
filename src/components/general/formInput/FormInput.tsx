import React, { forwardRef, useState } from "react";
import { AlertCircle, CheckCircle, Eye, EyeOff } from "@icons";

// Base input props interface
interface BaseInputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled" | "underlined";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

// Specific input type props
interface TextInputProps extends BaseInputProps {
  type?: "text" | "email" | "tel" | "url" | "search";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface PasswordInputProps extends BaseInputProps {
  type: "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
}

interface NumberInputProps extends BaseInputProps {
  type: "number";
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

interface TextareaProps extends BaseInputProps {
  type: "textarea";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  resize?: boolean;
}

// Union type for all input props
type FormInputProps =
  | TextInputProps
  | PasswordInputProps
  | NumberInputProps
  | TextareaProps;

export const FormInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const {
    name,
    label,
    placeholder,
    helperText,
    error,
    success,
    required = false,
    disabled = false,
    className = "",
    size = "md",
    variant = "outlined",
    fullWidth = true,
    startIcon,
    endIcon,
    type = "text",
    ...restProps
  } = props;

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-4 py-4 text-lg",
  };

  // Variant classes
  const getVariantClasses = () => {
    const baseClasses = "w-full transition-all duration-200 focus:outline-none";

    switch (variant) {
      case "filled":
        return `${baseClasses} bg-gray-100 border-0 border-b-2 border-transparent focus:bg-gray-50 focus:border-instant-mid rounded-t-md`;
      case "underlined":
        return `${baseClasses} bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500instant-mid rounded-none px-0`;
      default: // outlined
        return `${baseClasses} bg-white border border-gray-300 rounded-lg placeholder-instant-mid/50 focus:outline-none focus:ring-2 focus:ring-instant-mid/50 focus:border-transparent`;
      // return `${baseClasses} bg-white border border-gray-300 focus:border-instant-mid rounded-lg`;
    }
  };

  // State-based classes
  const getStateClasses = () => {
    if (disabled) return "opacity-50 cursor-not-allowed bg-gray-50";
    if (error)
      return "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200";
    if (success)
      return "border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200";
    if (isFocused) return "ring-2 ring-blue-200";
    return "";
  };

  // Label classes
  const getLabelClasses = () => {
    const baseClasses =
      "block text-sm font-medium mb-2 transition-colors duration-200";
    if (error) return `${baseClasses} text-red-600`;
    if (success) return `${baseClasses} text-green-600`;
    if (isFocused) return `${baseClasses} text-blue-600`;
    return `${baseClasses} text-gray-700`;
  };

  // Helper text classes
  const getHelperTextClasses = () => {
    const baseClasses = "mt-2 text-sm flex items-center gap-1";
    if (error) return `${baseClasses} text-red-600`;
    if (success) return `${baseClasses} text-green-600`;
    return `${baseClasses} text-gray-500`;
  };

  // Combined input classes
  const inputClasses = `
      ${getVariantClasses()}
      ${sizeClasses[size]}
      ${getStateClasses()}
      ${fullWidth ? "w-full" : ""}
      ${startIcon ? "pl-10" : ""}
      ${
        endIcon ||
        (type === "password" &&
          (props as PasswordInputProps).showPasswordToggle !== false)
          ? "pr-10"
          : ""
      }
      ${className}
    `
    .trim()
    .replace(/\s+/g, " ");

  // Event handlers
  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(true);
    if (type === "textarea") {
      (props as TextareaProps).onFocus?.(
        e as React.FocusEvent<HTMLTextAreaElement>
      );
    } else {
      (
        props as TextInputProps | PasswordInputProps | NumberInputProps
      ).onFocus?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    if (type === "textarea") {
      (props as TextareaProps).onBlur?.(
        e as React.FocusEvent<HTMLTextAreaElement>
      );
    } else {
      (
        props as TextInputProps | PasswordInputProps | NumberInputProps
      ).onBlur?.(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Render password toggle button
  const renderPasswordToggle = () => {
    if (
      type !== "password" ||
      (props as PasswordInputProps).showPasswordToggle === false
    ) {
      return null;
    }

    return (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
        disabled={disabled}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    );
  };

  // Render start icon
  const renderStartIcon = () => {
    if (!startIcon) return null;
    return (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {startIcon}
      </div>
    );
  };

  // Render end icon
  const renderEndIcon = () => {
    if (!endIcon || type === "password") return null;
    return (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {endIcon}
      </div>
    );
  };

  // Render helper text with icon
  const renderHelperText = () => {
    const text = error || success || helperText;
    if (!text) return null;

    return (
      <div className={getHelperTextClasses()}>
        {error && <AlertCircle size={16} />}
        {success && <CheckCircle size={16} />}
        <span>{text}</span>
      </div>
    );
  };

  return (
    // <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
    <div className={`${fullWidth ? "w-full" : ""} mb-`}>
      {label && (
        <label className={getLabelClasses()}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {renderStartIcon()}

        {type === "textarea" ? (
          <textarea
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${inputClasses} ${
              !(props as TextareaProps).resize ? "resize-none" : ""
            }`}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={(props as TextareaProps).rows || 4}
            maxLength={(props as TextareaProps).maxLength}
            minLength={(props as TextareaProps).minLength}
            value={(props as TextareaProps).value}
            onChange={(props as TextareaProps).onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(restProps as any)}
          />
        ) : (
          <input
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={
              type === "number"
                ? undefined
                : (props as TextInputProps).maxLength
            }
            minLength={
              type === "number"
                ? undefined
                : (props as TextInputProps).minLength
            }
            pattern={
              type === "number" ? undefined : (props as TextInputProps).pattern
            }
            min={
              type === "number" ? (props as NumberInputProps).min : undefined
            }
            max={
              type === "number" ? (props as NumberInputProps).max : undefined
            }
            step={
              type === "number" ? (props as NumberInputProps).step : undefined
            }
            value={(props as any).value}
            onChange={(props as any).onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(restProps as any)}
          />
        )}

        {renderEndIcon()}
        {renderPasswordToggle()}
      </div>

      {renderHelperText()}
    </div>
  );
});

FormInput.displayName = "FormInput";

// Demo component showing usage examples
// const FormInputDemo = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     age: "",
//     bio: "",
//     phone: "",
//   });

//   const handleChange =
//     (field: string) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       setFormData((prev) => ({
//         ...prev,
//         [field]: e.target.value,
//       }));
//     };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
//           Reusable Form Input Component
//         </h1>

//         <div className="space-y-6">
//           {/* Basic text input */}
//           <FormInput
//             type="text"
//             label="Full Name"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleChange("name")}
//             required
//             helperText="This will be displayed on your profile"
//           />

//           {/* Email input with icon */}
//           <FormInput
//             type="email"
//             label="Email Address"
//             placeholder="you@example.com"
//             value={formData.email}
//             onChange={handleChange("email")}
//             required
//             startIcon={<span className="text-lg">@</span>}
//             success={
//               formData.email.includes("@") ? "Valid email format" : undefined
//             }
//             error={
//               formData.email && !formData.email.includes("@")
//                 ? "Please enter a valid email"
//                 : undefined
//             }
//           />

//           {/* Password input */}
//           <FormInput
//             type="password"
//             label="Password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange("password")}
//             required
//             helperText="Must be at least 8 characters long"
//           />

//           {/* Number input */}
//           <FormInput
//             type="number"
//             label="Age"
//             placeholder="Enter your age"
//             value={formData.age}
//             onChange={handleChange("age")}
//             min={1}
//             max={120}
//             size="sm"
//           />

//           {/* Phone input with different variant */}
//           <FormInput
//             type="tel"
//             label="Phone Number"
//             placeholder="(555) 123-4567"
//             value={formData.phone}
//             onChange={handleChange("phone")}
//             variant="filled"
//             startIcon={<span className="text-lg">📞</span>}
//           />

//           {/* Textarea */}
//           <FormInput
//             type="textarea"
//             label="Bio"
//             placeholder="Tell us about yourself..."
//             value={formData.bio}
//             onChange={handleChange("bio")}
//             rows={4}
//             maxLength={500}
//             helperText={`${formData.bio.length}/500 characters`}
//             variant="outlined"
//           />

//           {/* Different sizes example */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <FormInput
//               type="text"
//               label="Small"
//               placeholder="Small input"
//               size="sm"
//             />
//             <FormInput
//               type="text"
//               label="Medium"
//               placeholder="Medium input"
//               size="md"
//             />
//             <FormInput
//               type="text"
//               label="Large"
//               placeholder="Large input"
//               size="lg"
//             />
//           </div>

//           {/* Different variants example */}
//           <div className="space-y-4">
//             <FormInput
//               type="text"
//               label="Outlined (Default)"
//               placeholder="Outlined variant"
//               variant="outlined"
//             />
//             <FormInput
//               type="text"
//               label="Filled"
//               placeholder="Filled variant"
//               variant="filled"
//             />
//             <FormInput
//               type="text"
//               label="Underlined"
//               placeholder="Underlined variant"
//               variant="underlined"
//             />
//           </div>

//           {/* Disabled state */}
//           <FormInput
//             type="text"
//             label="Disabled Input"
//             placeholder="This input is disabled"
//             disabled
//             value="Cannot edit this"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormInputDemo;
