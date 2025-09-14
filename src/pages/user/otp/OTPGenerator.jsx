import React, { useState } from "react";
import { useGenerateOTPMutation } from "@api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { performCalculation } from "@features/slices";
import { LockIcon, LockOpenIcon, PhoneIcon } from "@icons";
import { useIPLocation } from "@hooks";
import {
  Button,
  FlexBox,
  FormInput,
  Modal,
  Typography,
} from "@components/general";

export const OtpGenerator = (props) => {
  const { closeModal } = props;
  const [searchParams] = useSearchParams();
  const productURL = searchParams.get("product");

  const { location } = useIPLocation();

  const [generateOTP, { isLoading: generateOTPLoading }] =
    useGenerateOTPMutation();

  const { selectedProduct, getUpTo } = useSelector((state) => state.deductions);

  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.deductions);

  const navigate = useNavigate();

  // Generate OTP
  const generateOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(newOtp);
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const phoneNumberPattern = /^[0-9]{0,10}$/; // Regular expression to match up to 10 digits
    if (phoneNumberPattern.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      toast.warning("Kindly enter a valid mobile number..!");
      return;
    }

    const otpData = {
      mobileNo: phoneNumber,
      purpose: `${selectedProduct.category.name} - ${selectedProduct.name} (${location.city})`,
    };

    const otpGenerated = await generateOTP(otpData);
    if (otpGenerated.data.success) {
      dispatch(performCalculation());

      toast.success("Success..!");
      const categoryURL = selectedProduct.category.uniqueURL;
      const brandURL = selectedProduct.brand.uniqueURL;
      navigate(
        `/sell/deductions/finalPrice?p=${productURL}&c=${categoryURL}&b=${brandURL}`
      );
    } else if (otpGenerated.data.message.includes("Exceeded")) {
      toast.error("Exceeded limit. Try again later.");
    }
  };

  // OTP Verification
  const verifyOtp = (e) => {
    e.preventDefault();
    const actualOtp = Number(otp); // Example OTP

    if (Number(enteredOtp) === actualOtp) {
      setVerificationStatus("Success! OTP verified.");

      navigate(`/sell/deductions/finalPrice?p=${productURL}`);
    } else {
      toast.error("Wrong OTP. Enter correct OTP number!.");
      setVerificationStatus("Error! OTP verification failed.");
    }
  };

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  return (
    <Modal isOpen={true} onClose={closeModal} className="p-0 bg-black">
      <div className="flex bg-white max-sm:w-[95%] justify-center rounded-xl">
        <img
          src="/images/OTP2.png"
          alt=""
          className="max-sm:hidden"
          loading="lazy" // Native lazy loading
        />
        <FlexBox direction="col">
          <div className="flex m-4 border grow-1 rounded-lg py-2 items-center justify-center gap-2 px-20 max-2sm:px-10">
            <img
              src={import.meta.env.VITE_APP_BASE_URL + selectedProduct.image}
              alt="ProductImg"
              className="size-20 rounded-xl"
              loading="lazy" // Native lazy loading
            />
            <div className="flex flex-col gap-1 max-sm:px-2">
              <div className="text-xl flex gap-2 max-sm:flex-col max-sm:text-sm">
                <h2 className="text-wrap">{selectedProduct.name}</h2>
                {selectedProduct.category.name === "Mobile" ? (
                  <span>{getUpTo.variantName}</span>
                ) : null}
              </div>
              <div>
                <h2 className="text-gray-500 text-sm max-sm:text-xs">
                  Selling Price
                </h2>
              </div>
              <div className="flex items-center text-2xl text-red-500 max-sm:text-sm">
                <span className="text-4xl max-sm:text-2xl text-black">₹</span>
                <h2 className="">XX,XXX</h2>
              </div>
            </div>
          </div>

          {/* This Below will can be used when we implement or include actual OTP generation */}
          <div className="relative w-fit flex flex-col inset-0 bg-black bg-opacity-50 px-4 max-sm:w-[90%] pointer-events-none py-4 rounded-lg">
            {!otp ? (
              <ComingSoonContainer />
            ) : (
              <>
                <div className="flex items-center gap-1 bg-green-200 text-green-700 border mb-5 px-2 py-1 rounded">
                  <LockOpenIcon className="" />
                  <h2 className="text-sm ">Verify OTP to get the best price</h2>
                </div>
                <div>
                  {/* <h2 className="text-sm font-semibold">Verify OTP</h2> */}
                  <form
                    onSubmit={verifyOtp}
                    className="my-4 flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start"
                  >
                    <div>
                      <label
                        htmlFor="otpInput"
                        className="text-sm font-semibold"
                      >
                        Verify OTP:
                      </label>
                      <input
                        type="text"
                        id="otpInput"
                        value={enteredOtp}
                        onChange={handleOtpChange}
                        className="border-b rounded mr-2 px-2 focus:bg-transparent outline-none"
                        placeholder="Enter OTP"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 text-white rounded py-1 px-2 max-sm:text- max-sm:w-full"
                    >
                      Verify OTP
                    </button>
                  </form>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded py-1 px-2"
                    onClick={handleSubmit}
                  >
                    Resent OTP
                  </button>
                </div>
              </>
            )}

            {otp && <p>Your OTP: {otp}</p>}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center sm:items-end max-sm:flex-col gap-2 mb-4 mt-10"
          >
            <FormInput
              size="sm"
              startIcon={<PhoneIcon />}
              label="Enter Your Phone Number"
              type="number"
              maxLength={10}
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter Mobile Number"
              required
            />

            <div>
              <Button
                type="submit"
                variant="greenary"
                shape="square"
                disabled={generateOTPLoading}
              >
                Get Final Price
              </Button>
            </div>
          </form>
        </FlexBox>
        <div className="absolute right-2 top-2 pt-2 pr-2 grow-0 max-sm:pt-1 max-sm:pr-1">
          <button
            onClick={closeModal}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            x
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ComingSoonContainer = () => (
  <>
    <div className="absolute flex flex-col items-center mt-8 max-2sm:mt-12">
      <h2 className="text-white ml-20 text-2xl z-10 font-extrabold max-2sm:ml-6">
        OTP Verification
      </h2>
      <h2 className="text-white ml-20 text-xl z-10 font-bold max-2sm:ml-6">
        Coming Soon
      </h2>
    </div>
    <div className="flex items-center gap-1 bg-green-200 text-green-700 border mb-5 px-2 py-1 rounded ">
      <LockIcon className="" />
      <h2 className="text-sm ">Generate to get the best price</h2>
    </div>
    <div>
      <h2 className="text-sm font-semibold">Enter Your Phone Number</h2>
      <form className="mb-4 flex  max-2sm:flex-col max-2sm:gap-2">
        <div className="">
          <label htmlFor="phoneNumber" className="max-sm:text-sm">
            +91:
          </label>
          <input
            className="border-b rounded mr-2 px-2 focus:bg-transparent outline-none bg-black bg-opacity-50"
            placeholder="Enter Mobile Number"
          />
        </div>

        <Button
          type="submit"
          shape="square"
          variant="greenary"
          size="sm"
          disabled
        >
          Generate OTP
        </Button>
      </form>
    </div>
  </>
);
