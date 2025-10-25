import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// --- API and State Imports ---
import { useGenerateOTPMutation } from "@api";
import { createFinalDeductionSet, performCalculation } from "@features/slices";
import { RootState } from "@features/store";

// --- UI Component and Icon Imports ---
import { PhoneIcon } from "@icons";
import {
  Button,
  FlexBox,
  FormInput,
  Modal,
  Typography,
} from "@components/general";

// --- Custom Hook Imports ---
import { useIPLocation } from "@hooks";
import { X } from "lucide-react";

// --- Constants for better maintainability ---
const PHONE_MAX_LENGTH = 10;
const PHONE_INPUT_PATTERN = `[0-9]{${PHONE_MAX_LENGTH}}`;

// --- Prop Types ---
interface OtpGeneratorProps {
  closeModal: () => void;
  isOpen: boolean;
}

/**
 * A modal component to capture a user's phone number and display
 * a product summary before revealing the final price.
 */
export const OtpGenerator: FC<OtpGeneratorProps> = ({ closeModal, isOpen }) => {
  // --- Hooks ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { location } = useIPLocation();

  // --- State ---
  const [phoneNumber, setPhoneNumber] = useState("");

  // --- Redux State ---
  const { getUpTo, selectedProduct, finalDeductionsSetArray } = useSelector(
    (state: RootState) => state.deductions
  );
  console.log("finalDeductionsSetArray", finalDeductionsSetArray);

  // --- RTK Query Mutation ---
  const [generateOTP, { isLoading: isGeneratingOTP }] =
    useGenerateOTPMutation();

  // --- Memoized Handlers for Performance ---
  const handlePhoneNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      // Allow only numeric input up to the max length
      if (/^[0-9]*$/.test(value) && value.length <= PHONE_MAX_LENGTH) {
        setPhoneNumber(value);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (phoneNumber.length < PHONE_MAX_LENGTH) {
        toast.warn(
          `Please enter a valid ${PHONE_MAX_LENGTH}-digit mobile number!`
        );
        return;
      }

      const payload = {
        mobileNo: phoneNumber,
        purpose: `${selectedProduct.category.name} - ${selectedProduct.name} (${location.city})`,
        selectedDeductionSet: finalDeductionsSetArray,
      };

      try {
        await generateOTP(payload).unwrap(); // .unwrap() handles throwing errors
        dispatch(performCalculation());
        toast.success("Success! Redirecting...");

        const { category, brand } = selectedProduct;
        const productURL = searchParams.get("product");
        navigate(
          `/sell/deductions/finalPrice?p=${productURL}&c=${category.uniqueURL}&b=${brand.uniqueURL}`
        );
      } catch (error: any) {
        if (error?.data?.message?.includes("Exceeded")) {
          toast.error(
            "You have exceeded the OTP limit. Please try again later."
          );
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    },
    [
      phoneNumber,
      selectedProduct,
      location.city,
      generateOTP,
      dispatch,
      navigate,
      searchParams,
    ]
  );

  // --- Early return if no product is selected ---
  if (!selectedProduct) {
    return null; // or a loading/error state
  }

  useEffect(() => {
    dispatch(createFinalDeductionSet());
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      {/* Close Button */}
      <button
        onClick={closeModal}
        aria-label="Close modal"
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full leading-none hover:bg-red-700 transition-colors"
      >
        <X size={16} />
      </button>

      <div className="flex gap-5 max-sm:w-[95vw] h-[300px]">
        {/* Left Side Image (Desktop Only) */}
        <img
          src="/images/OTP2.png"
          alt="Phone verification illustration"
          className="hidden sm:block w-1/3 object-cover"
          loading="lazy"
        />

        {/* Right Side Content */}
        <FlexBox direction="col">
          {/* Product Summary */}
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
            <img
              src={import.meta.env.VITE_APP_BASE_URL + selectedProduct.image}
              alt={selectedProduct.name}
              className="size-16 sm:size-20 rounded-lg object-contain"
              loading="lazy"
            />
            <Typography variant="h6" className="font-semibold text-gray-800">
              {selectedProduct.name}
              {selectedProduct.category.name === "Mobile" && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({getUpTo.variantName})
                </span>
              )}
            </Typography>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 mt-8"
          >
            <FormInput
              size="sm"
              startIcon={<PhoneIcon />}
              label="Enter Your Phone Number"
              type="tel" // Use 'tel' for phone numbers for better mobile UX
              pattern={PHONE_INPUT_PATTERN}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="10-digit mobile number"
              required
              className="flex-grow"
            />
            <Button
              type="submit"
              variant="greenary"
              shape="square"
              disabled={
                isGeneratingOTP || phoneNumber.length < PHONE_MAX_LENGTH
              }
              className="w-full sm:w-auto"
            >
              {isGeneratingOTP ? "Sending..." : "Get Final Price"}
            </Button>
          </form>
        </FlexBox>
      </div>
    </Modal>
  );
};
