import { memo } from "react";

export const FormInput = memo(
  ({
    name,
    type = "text",
    pattern,
    placeholder,
    value,
    checked,
    handleChange,
    handlePayment,
    disabled = false,
  }) => {
    // console.log("FormInput");
    const isAddressField = ["state", "city", "pincode"].includes(name);
    const isPaymentMode = ["paymentMode", "digitalPaymentMode"].includes(name);

    return (
      <div>
        {!isPaymentMode ? (
          <div className="flex items-center gap-1">
            <label htmlFor={name} className="text-sm">
              {/* {name.toUpperCase()}: */}
              {name.slice(0, 1).toUpperCase()}
              {name.slice(1)}:
            </label>
            <input
              type={type}
              pattern={pattern}
              name={name}
              value={value}
              placeholder={placeholder}
              className={`border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0 ${
                isAddressField ? "" : "w-1/3 max-sm:w-1/2"
              }`}
              onChange={handleChange}
            />
          </div>
        ) : (
          <label className="flex items-center">
            <input
              type={type}
              name={name}
              value={value}
              checked={checked}
              onChange={handlePayment}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">
              {value}
            </span>
          </label>
        )}
      </div>
    );
  }
);

// FormInput.propTypes = {
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string,
//   pattern: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
//   checked: PropTypes.bool,
//   handleChange: PropTypes.func.isRequired,
//   handlePayment: PropTypes.func,
// };
