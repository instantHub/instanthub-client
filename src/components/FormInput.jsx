// import React from "react";

// const FormInput = (props) => {
//   console.log("FormInput Component");
//   const addressDetails =
//     props.name == "state" || props.name == "city" || props.name == "pincode";
//   return (
//     <div>
//       {props.name !== "paymentMode" && props.name !== "digitalPaymentMode" ? (
//         <>
//           <label htmlFor={props.name} className="text-sm">
//             {props.name.toUpperCase()}:{" "}
//           </label>

//           <input
//             type={props.type}
//             pattern={props.pattern}
//             name={props.name}
//             placeholder={props.placeholder}
//             className={`border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0 ${
//               addressDetails ? "" : "w-1/3 max-sm:w-1/2"
//             }`}
//             onChange={(e) => props.handleChange(e)}
//           />
//           <span>{props.errorMessage}</span>
//         </>
//       ) : (
//         <label className="flex items-center">
//           <input
//             type={props.type}
//             name={props.name}
//             value={props.value}
//             checked={props.checked}
//             onChange={(e) => {
//               props.handlePayment(e);
//             }}
//             className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
//           />
//           <span className="ml-2 text-sm font-medium text-gray-900">
//             {props.value}
//           </span>
//         </label>
//       )}
//     </div>
//   );
// };

// export default FormInput;

import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  name,
  type = "text",
  pattern,
  placeholder,
  value,
  checked,
  handleChange,
  handlePayment,
}) => {
  console.log("FormInput");
  const isAddressField = ["state", "city", "pincode"].includes(name);
  const isPaymentMode = ["paymentMode", "digitalPaymentMode"].includes(name);

  return (
    <div>
      {!isPaymentMode ? (
        <>
          <label htmlFor={name} className="text-sm">
            {name.toUpperCase()}:{" "}
          </label>
          <input
            type={type}
            pattern={pattern}
            name={name}
            placeholder={placeholder}
            className={`border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0 ${
              isAddressField ? "" : "w-1/3 max-sm:w-1/2"
            }`}
            onChange={handleChange}
          />
        </>
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
};

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

export default React.memo(FormInput);
