import React from "react";

const FormInput = (props) => {
  console.log("FormInput Component");
  const addressDetails =
    props.name == "state" || props.name == "city" || props.name == "pincode";
  return (
    <div>
      {props.name !== "paymentMode" && props.name !== "digitalPaymentMode" ? (
        <>
          <label htmlFor={props.name} className="text-sm">
            {props.name.toUpperCase()}:{" "}
          </label>

          <input
            type={props.type}
            pattern={props.pattern}
            name={props.name}
            placeholder={props.placeholder}
            className={`border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0 ${
              addressDetails ? "" : "w-1/3 max-sm:w-1/2"
            }`}
            onChange={(e) => props.handleChange(e)}
          />
          {/* <span>{props.errorMessage}</span> */}
        </>
      ) : (
        <label className="flex items-center">
          <input
            type={props.type}
            name={props.name}
            value={props.value}
            checked={props.checked}
            onChange={(e) => {
              props.handlePayment(e);
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-900">
            {props.value}
          </span>
        </label>
      )}
    </div>
  );
};

export default FormInput;
