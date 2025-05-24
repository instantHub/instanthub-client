import React, { useState } from "react";
import DateAndTime from "@components/user/DateAndTime/DateAndTime";
import InputSubmitBtn from "@components/user/InputSubmitBtn";
import { useCreateOrderMutation } from "@api/ordersApi";
import { ORDER_EMAIL_MSG } from "@utils/user/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";

const SubmitForm = ({ formData, setFormData, reducer, setIsOpen }) => {
  const { state, dispatch } = reducer;
  console.log("state from submit form of final price", state);

  const navigate = useNavigate();

  const [createOrder, { isLoading: ordersLoading }] = useCreateOrderMutation();

  const [schedulePickUp, setSchedulePickUp] = useState(null);
  console.log("schedulePickUp", schedulePickUp);

  const handlePinCodeChange = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Restrict the length to 10 digits
    if (value.length <= 6) {
      dispatch({ type: "pinCode", value: Number(e.target.value) });
    } else {
      toast.error("PinCode cannot be more than 6 digits");
      return;
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Restrict the length to 10 digits
    if (value.length <= 10) {
      setFormData({ ...formData, phone: Number(e.target.value) });
    } else {
      toast.error("Phone Number cannot be more than 10 digits");
    }
  };

  const handlePaymentModeChange = (e) => {
    dispatch({ type: "selectedPaymentMode", value: e.target.value });
    dispatch({ type: "selectedDigitalPayment", value: "" }); // Reset digital payment selection
  };

  const handleDigitalPaymentChange = (e) => {
    dispatch({ type: "selectedDigitalPayment", value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      state.selectedPaymentMode === "" ||
      (state.selectedPaymentMode.toLowerCase().includes("digital") &&
        state.selectedDigitalPayment === "")
    ) {
      toast.error("Select Payment Mode..!");
      return;
    }

    const orderData = {
      ...formData,
      schedulePickUp,
      addressDetails: state.addressDetails,
      status: { pending: true, completed: false, cancelled: false },
      paymentMode: state.selectedPaymentMode.toLowerCase().includes("instant")
        ? state.selectedPaymentMode
        : state.selectedDigitalPayment,
      offerPrice: state.coupon.couponCodeApplied
        ? state.specialPrice
        : state.offerPrice,
    };
    console.log("orderData", orderData);

    try {
      const order = await createOrder(orderData);
      // console.log("order", order);

      if (order.data.success) {
        setIsOpen(false);
        toast.success("Order placed, check your email for the bill.");
        // navigate(
        //   generatePathWithParams(
        //     ROUTES.user.productDetails,
        //     formData.productUniqueURL
        //   )
        // );
        const { category, brand, product } = formData?.uniqueURLs;
        const location = localStorage.getItem("location");
        console.log(
          "`${category}/${brand}/${product}`",
          `${category}/${brand}/${product}`
        );
        navigate(`/${location}/${category}/${brand}/${product}`, {
          replace: true,
        });
      }
    } catch (error) {
      console.log("Eror while creating order", error);
      toast.error("Error while Creating Order. Please try after sometime.");
    }
  };
  // http://localhost:5173/sell-mobile/used-apple-mobile/Apple%20iPhone%2012%20Pro%20Max
  // http://localhost:5173/bengaluru/sell-mobile/used-apple-mobile/Apple%20iPhone%2012%20Pro%20Max

  return (
    <div
      role="dialog"
      className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative bg-white p-6 max-sm:py-2 max-sm:px-4 rounded-lg shadow-lg w-fit max-lg:w-3/4 max-sm:w-[90%]">
        <h2 className="text-xl max-sm:text-lg font-semibold mb-4">
          Enter your details
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className=" absolute top-0 right-0 max-sm:text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          close
        </button>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-2 justify-center"
        >
          {/* Name */}
          <FormData
            input={{ label: "Name", type: "text", name: "name" }}
            value={formData.customerName}
            placeHolder="Enter Full Name"
            changeHandler={(e) => {
              setFormData({ ...formData, customerName: e.target.value });
            }}
          />

          {/* Email */}
          <FormData
            input={{ label: "Email", type: "email", name: "email" }}
            value={formData.email}
            placeHolder="Enter Email"
            changeHandler={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />

          {/* Phone Number */}
          <FormData
            input={{ label: "Mobile", type: "number", name: "phone" }}
            value={formData.phone}
            placeHolder="Enter Phone Number"
            changeHandler={handlePhoneChange}
          />

          {/* Address */}
          <FormData
            input={{ label: "Address", type: "text", name: "address" }}
            value={state.addressDetails.address}
            placeHolder="Add your address"
            changeHandler={(e) => {
              dispatch({
                type: "address",
                value: e.target.value,
              });
            }}
          />

          {/* State */}
          <FormData
            input={{ label: "State", type: "text", name: "pinCOde" }}
            value={state.addressDetails.state}
            placeHolder="Enter State"
            readOnly={true}
          />

          {/* City */}
          <FormData
            input={{ label: "City", type: "text", name: "pinCOde" }}
            value={state.addressDetails.city}
            placeHolder="Enter City"
            readOnly={true}
          />

          {/* Pincode */}
          <FormData
            input={{ label: "PinCode", type: "number", name: "pinCOde" }}
            value={state.addressDetails.pinCode}
            placeHolder="Add PinCode"
            changeHandler={handlePinCodeChange}
          />

          {/* Date Picker */}
          <DateAndTime
            showPreviousDate={false}
            setSchedule={setSchedulePickUp}
          />

          {/* Payment */}
          <div className="flex flex-col gap-2 justify-center w-full items-center py-2 border-t border-b">
            <h2 className="text-lg max-sm:text-sm">Select Payment Mode</h2>
            <div className="flex flex-col gap-2">
              <PaymentMode
                input={{
                  role: "radio",
                  id: "instantCash",
                  type: "radio",
                  name: "paymentMode",
                  value: "Instant Cash",
                }}
                checked={state.selectedPaymentMode === "Instant Cash"}
                changeHandler={handlePaymentModeChange}
                icon={{
                  src: "/images/instantcash.webp",
                  alt: "instantcash",
                }}
              />

              <PaymentMode
                input={{
                  role: "radio",
                  id: "digitalPayments",
                  type: "radio",
                  name: "paymentMode",
                  value: "Digital Payments",
                }}
                checked={state.selectedPaymentMode === "Digital Payments"}
                changeHandler={handlePaymentModeChange}
                icon={{ src: "/images/upi2.webp", alt: "digitalpayment" }}
              />
            </div>

            {state.selectedPaymentMode === "Digital Payments" && (
              <div className="grid grid-cols-3 place-items-center items-center gap-2">
                <PaymentMode
                  input={{
                    role: "radio",
                    id: "gpay",
                    type: "radio",
                    name: "digitalPaymentMode",
                    value: "GPay",
                  }}
                  checked={state.selectedDigitalPayment === "GPay"}
                  changeHandler={handleDigitalPaymentChange}
                />
                <PaymentMode
                  input={{
                    role: "radio",
                    id: "phonepe",
                    type: "radio",
                    name: "digitalPaymentMode",
                    value: "PhonePe",
                  }}
                  checked={state.selectedDigitalPayment === "PhonePe"}
                  changeHandler={handleDigitalPaymentChange}
                />
                <PaymentMode
                  input={{
                    role: "radio",
                    id: "upi",
                    type: "radio",
                    name: "digitalPaymentMode",
                    value: "UPI",
                  }}
                  checked={state.selectedDigitalPayment === "UPI"}
                  changeHandler={handleDigitalPaymentChange}
                />
              </div>
            )}
          </div>

          <InputSubmitBtn
            loading={ordersLoading}
            label="Sell"
            ariaLabel="Order Booking Submit Button"
          />

          <span className="text-center bg-yellow-400 text-[11px] max-sm:text-[9px]">
            Note: {ORDER_EMAIL_MSG}
          </span>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;

// Label & Input Field
const FormData = ({ input, value, placeHolder, changeHandler, readOnly }) => {
  const { label, type, name } = input;
  return (
    <div className="grid grid-cols-4 gap-1 place-items-end items-center">
      <label htmlFor={name} className="max-sm:text-sm w-fit max-sm:col-span-">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeHolder}
        className="col-span-3 border rounded px-2 py-1 w-full max-sm:text-sm max-sm:px-1 max-sm:py-0 read-only:bg-secondary-light"
        onChange={changeHandler}
        readOnly={readOnly}
        required
      />
    </div>
  );
};

// Payment Radio Selector
const PaymentMode = ({ input, checked, changeHandler, icon }) => {
  return (
    <div className="flex items-center justify-start">
      <label className="flex items-center">
        <input
          role={input.role}
          id={input.id}
          type={input.type}
          name={input.name}
          value={input.value}
          checked={checked}
          onChange={changeHandler}
          className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
          {input.value}
        </span>
        {icon && (
          <img
            src={icon.src}
            alt={icon.alt}
            className="w-16 h-7 max-sm:w-12 max-sm:h-5 mx-1"
          />
        )}
      </label>
    </div>
  );
};

{
  /* <input
          type="submit"
          value={`${!ordersLoading ? "Sell" : "Loading..."} `}
          className="border rounded px-2 py-1 bg-green-600 text-white cursor-pointer hover:bg-green-700 max-sm:text-sm disabled:bg-green-300 disabled:cursor-none"
          aria-label="Order Booking Submit Button"
          disabled={ordersLoading}
          aria-disabled={ordersLoading}
        /> */
}
