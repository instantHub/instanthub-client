import React, { FC, useContext, useState } from "react";
import { useCreateOrderMutation } from "@api";
import { ORDER_EMAIL_MSG } from "@utils/user/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dropdown,
  FlexBox,
  FormInput,
  ReusableDatePicker,
  Typography,
} from "@components/general";
import {
  EmailIcon,
  MapIcon,
  NumbersIcon,
  PhoneIcon,
  ProfileIcon,
  StockpilesIcon,
} from "@icons";
import { StateContext } from "./ProductFinalPrice_v3";
import { ORDER_STATUS } from "@features/api/orders/types";
import { ITimeSlot, timeSlots } from "@utils/constants";

export const SubmitForm2: FC = () => {
  const contextValue = useContext(StateContext);
  if (!contextValue) {
    throw new Error("StateContext is not provided");
  }
  const { state, dispatch, formData, setIsOpen } = contextValue;

  const navigate = useNavigate();

  const [createOrder, { isLoading: ordersLoading, isSuccess: orderSuccess }] =
    useCreateOrderMutation();

  const [schedulePickUp, setSchedulePickUp] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot | null>(null);

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      dispatch({ type: "pinCode", value: value });
    } else {
      toast.error("PinCode cannot be more than 6 digits");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      dispatch({ type: "phone", value: Number(value) });
    } else {
      toast.error("Phone Number cannot be more than 10 digits");
    }
  };

  const handlePaymentModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "selectedPaymentMode", value: e.target.value });
    dispatch({ type: "selectedDigitalPayment", value: "" }); // Reset digital payment selection
  };

  const handleDigitalPaymentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "selectedDigitalPayment", value: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      //   ...formData,
      productId: formData.productId,
      productDetails: {
        productName: formData.productName,
        productBrand: formData.productBrand,
        productCategory: formData.productCategory,
        variant: formData.variant,
      },
      schedulePickUp: {
        date: schedulePickUp,
        timeSlot: selectedSlot?.label,
      },
      customerDetails: {
        name: state.name,
        email: state.email,
        phone: state.phone,
        addressDetails: state.addressDetails,
      },
      status: ORDER_STATUS.PENDING,
      finalDeductionSet: formData.finalDeductionSet,
      paymentMode: state.selectedPaymentMode.toLowerCase().includes("instant")
        ? state.selectedPaymentMode
        : state.selectedDigitalPayment,
      offerPrice: state.coupon.couponCodeApplied
        ? state.specialPrice
        : state.offerPrice,
    };

    console.log("orderData", orderData);

    try {
      const { data: order } = await createOrder(orderData).unwrap();
      console.log("Order created successfully:", order);

      setIsOpen(false);
      toast.success("Order placed, check your email for the bill.");

      const { category, brand, product } = formData?.uniqueURLs;
      // navigate(`/${category}/${brand}/${product}`, {
      //   replace: true,
      // });
      navigate(`/sell/confirmation`, {
        state: { bookedOrder: order },
      });
    } catch (error) {
      console.log("Eror while creating order", error);
      toast.error("Error while Creating Order. Please try after sometime.");
    }
  };

  return (
    <div
      role="dialog"
      className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
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
          <FormInput
            startIcon={<ProfileIcon size={16} />}
            size="sm"
            label="Name"
            type="text"
            name="customerName"
            value={state.name}
            placeholder="Enter Full Name"
            onChange={(e) => {
              dispatch({ type: "name", value: e.target.value });
            }}
            required
          />
          <FlexBox gap={2}>
            <FormInput
              startIcon={<EmailIcon size={16} />}
              size="sm"
              label="Email"
              type="email"
              name="email"
              value={String(state.email)}
              placeholder="Enter Email"
              onChange={(e) => {
                dispatch({ type: "email", value: e.target.value });
              }}
              required
            />
            <FormInput
              startIcon={<PhoneIcon size={16} />}
              size="sm"
              label="Mobile"
              type="number"
              name="phone"
              value={String(state.phone)}
              placeholder="Enter Phone Number"
              onChange={handlePhoneChange}
              required
            />
          </FlexBox>
          <FormInput
            startIcon={<MapIcon size={16} />}
            size="sm"
            label="Address"
            type="text"
            name="address"
            value={String(state.addressDetails.address)}
            placeholder="Add your address"
            onChange={(e) => {
              dispatch({
                type: "address",
                value: e.target.value,
              });
            }}
            required
          />
          <FlexBox gap={2}>
            <FormInput
              startIcon={<MapIcon size={16} />}
              size="sm"
              label="State"
              type="text"
              name="state"
              value={String(state.addressDetails.state)}
              placeholder="Enter State"
              onChange={() => {}}
            />

            <FormInput
              startIcon={<StockpilesIcon size={16} />}
              size="sm"
              label="City"
              type="text"
              name="city"
              value={String(state.addressDetails.city)}
              placeholder="Enter City"
              onChange={() => {}}
            />
          </FlexBox>
          <FormInput
            startIcon={<NumbersIcon size={16} />}
            size="sm"
            label="Pin Code"
            type="number"
            name="pinCode"
            value={String(state.addressDetails.pinCode)}
            onChange={handlePinCodeChange}
            placeholder="Enter Pin Code"
            required
          />

          <FlexBox gap={2}>
            <ReusableDatePicker
              selectedDate={schedulePickUp}
              onChange={(date) => setSchedulePickUp(date)}
              minDate={new Date()}
              required={true}
            />
            <Dropdown<ITimeSlot>
              options={timeSlots}
              value={selectedSlot}
              onChange={(slot) => setSelectedSlot(slot)}
              getOptionLabel={(option) => option.label}
              placeholder="Choose a slot..."
            />
          </FlexBox>

          {/* Payment */}
          <FlexBox
            direction="col"
            gap={2}
            className="w-full py-2 border-t border-b"
          >
            <Typography>Select Payment Mode</Typography>
            <FlexBox direction="col" gap={2}>
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
            </FlexBox>

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
          </FlexBox>
          <Button
            variant="greenary"
            shape="square"
            size="sm"
            loading={ordersLoading}
          >
            Sell
          </Button>
          <Typography
            variant="caption"
            className="text-center bg-yellow-400 text-[11px] max-sm:text-[9px]"
          >
            Note: {ORDER_EMAIL_MSG}
          </Typography>
        </form>
      </div>
    </div>
  );
};

interface PaymentModeProps {
  input: {
    role: string;
    id: string;
    type: string;
    name: string;
    value: string;
  };
  checked: boolean;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: {
    src: string;
    alt: string;
  };
}

// Payment Radio Selector
const PaymentMode: FC<PaymentModeProps> = ({
  input,
  checked,
  changeHandler,
  icon,
}) => {
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
