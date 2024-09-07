import React, { useEffect, useState } from "react";
import { useGenerateOTPMutation } from "../../features/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GiDialPadlock } from "react-icons/gi";
import { BsUnlockFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  addDeductions,
  removeDeductions,
  addProductAge,
} from "../../features/deductionSlice";

const OtpGenerator = (props) => {
  const { closeModal } = props;
  // Query Params
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const selectedProdDetails = useSelector((state) => state.deductions);
  // console.log("selectedProdDetails", selectedProdDetails);

  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [generateOTP, { isLoading: generateOTPLoading }] =
    useGenerateOTPMutation();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  // Dispatch
  const dispatch = useDispatch();
  // Slice Data
  const laptopSlice = useSelector((state) => state.laptopDeductions);
  const data = useSelector((state) => state.deductions);
  // console.log("useSelector from OTP", laptopSlice, data);

  const laptopDesktop = ["laptop", "desktop"];

  const navigate = useNavigate();

  // Generate OTP
  const generateOtp = () => {
    // Generate a random OTP (example)
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
    // Send the OTP to the user's phone number (backend logic)

    if (phoneNumber.length < 10) {
      toast.warning("Kindly enter a valid mobile number..!");
      return;
    }

    const otpData = {
      mobileNo: phoneNumber,
    };

    const otpGenerated = await generateOTP(otpData);
    // console.log("otpGenerated", otpGenerated);
    if (otpGenerated.data.success) {
      // console.log("success");
      // toast.success("OTP Generated");
      // setOtp(otpGenerated.data.data.otp);

      // if (data.productCategory.toLowerCase().includes("laptop")) {
      if (laptopDesktop.includes(data.productCategory.toLowerCase())) {
        dispatch(addDeductions(laptopSlice.processor));
        dispatch(addDeductions(laptopSlice.hardDisk));
        dispatch(addDeductions(laptopSlice.ram));
        dispatch(addDeductions(laptopSlice.screenSize));
        dispatch(addDeductions(laptopSlice.graphic));
        dispatch(addDeductions(laptopSlice.screenCondition));
        dispatch(addDeductions(data.productAge));
        dispatch(addDeductions(laptopSlice.physicalCondition));
      } else if (data.productCategory.toLowerCase().includes("mobile")) {
        dispatch(addDeductions(data.productAge));
        dispatch(addDeductions(data.productScreenCondition));
        dispatch(addDeductions(data.productPhysicalCondition));
        dispatch(addDeductions(data.productPanelCondition));
        dispatch(addDeductions(data.productDisplayDefect));
      }

      // Until OTP is applied
      toast.success("Success..!");
      navigate(`/sell/deductions/finalPrice?productId=${productId}`);
    } else if (otpGenerated.data.message.includes("Exceeded")) {
      // toast.error("Exceeded OTP limit. Try again later.");
      toast.error("Exceeded limit. Try again later.");
    }
  };
  // END Generate OTP

  // OTP Verification
  const verifyOtp = (e) => {
    e.preventDefault();
    // Assume the actual OTP is fetched from backend or stored in state
    const actualOtp = Number(otp); // Example OTP
    // console.log("verifyOtp actualOtp", actualOtp);

    if (Number(enteredOtp) === actualOtp) {
      setVerificationStatus("Success! OTP verified.");

      navigate(`/sell/deductions/finalPrice?productId=${productId}`);
    } else {
      toast.error("Wrong OTP. Enter correct OTP number!.");
      setVerificationStatus("Error! OTP verification failed.");
    }
  };

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };
  // END OTP Verification

  // useEffect(() => {
  // console.log("OTP from useEffect", otp);
  // }, [otp]);

  // useEffect(() => {
  //   if (selectedProdDetails.productName == "") {
  //     navigate(`/categories/brands/productDetails/${productId}`);
  //     // /categories/brands/productDetails/6643523e84ef9ccb0a2ec86f
  //   }
  // });

  return (
    <div className="flex bg-white max-sm:w-[90%] justify-center rounded-xl">
      <div className="">
        <img
          src="/images/OTP2.png"
          alt=""
          // className="w-full h-auto transform transition-transform hover:scale-110"
          className="max-sm:hidden"
        />
      </div>
      {/* <div className="flex flex-col justify-center items-center bg-white max-sm:w-[90%] rounded-xl"> */}
      <div className="flex flex-col grow-1 mt-6 items-center max-sm:mb-8">
        <div className="flex">
          <div className="flex m-4 border grow-1 rounded-lg py-2 items-center justify-center gap-2 px-20 max-2sm:px-10">
            <div>
              <img
                src={
                  import.meta.env.VITE_APP_BASE_URL +
                  selectedProdDetails.productImage
                }
                alt="ProductImg"
                className="size-20 rounded-xl"
              />{" "}
            </div>
            <div className="flex flex-col gap-1 max-sm:px-2">
              <div className="text-xl flex gap-2 max-sm:flex-col max-sm:text-sm">
                <h1>{selectedProdDetails.productName}</h1>
                {selectedProdDetails.productCategory === "Mobile" ? (
                  <span>{selectedProdDetails.getUpTo.variantName}</span>
                ) : null}
              </div>
              <div>
                <h1 className="text-gray-500 text-sm max-sm:text-xs">
                  Selling Price
                </h1>
              </div>
              <div className="flex items-center text-2xl text-red-500 max-sm:text-sm">
                <FaIndianRupeeSign />
                <h1 className="">XX,XXX</h1>
              </div>
            </div>
          </div>
        </div>
        {/* fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 */}
        <div className="relative w-fit flex flex-col inset-0 bg-black bg-opacity-50 px-4 max-sm:w-[90%] pointer-events-none py-4 rounded-lg">
          {/* <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-whie text-xl z-10">Coming Soon</h1>
          </div> */}
          {!otp ? (
            <>
              <div className="absolute flex flex-col items-center mt-8 max-2sm:mt-12">
                <h1 className="text-white ml-20 text-2xl z-10 font-extrabold max-2sm:ml-6">
                  OTP Verification
                </h1>
                <h1 className="text-white ml-20 text-xl z-10 font-bold max-2sm:ml-6">
                  Coming Soon
                </h1>
              </div>
              <div className="flex items-center gap-1 bg-green-200 text-green-700 border mb-5 px-2 py-1 rounded ">
                {/* <GiDialPadlock className="text-lg" /> */}
                <FaLock className="" />
                <h1 className="text-sm ">Generate to get the best price</h1>
              </div>
              <div className="">
                <h2 className="text-sm font-semibold">
                  Enter Your Phone Number
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="mb-4 flex  max-2sm:flex-col max-2sm:gap-2"
                >
                  <div className="">
                    <label htmlFor="phoneNumber" className="max-sm:text-sm">
                      +91:
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      maxLength={10}
                      // value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      // className="border-b rounded mr-2 px-2 focus:bg-transparent outline-none "
                      className="border-b rounded mr-2 px-2 focus:bg-transparent outline-none bg-black bg-opacity-50"
                      placeholder="Enter Mobile Number"
                      required
                    />
                    {phoneNumber.length > 10 && (
                      <p className="text-red-500">
                        Phone number cannot exceed 10 digits.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    // className="bg-green-600 text-white min-w-fit rounded py-1 px-2 max-sm:px-1"
                    className="bg-green-600 text-gray-400 min-w-fit rounded py-1 px-2 max-sm:px-1 bg-black bg-opacity-50"
                  >
                    Generate OTP
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 bg-green-200 text-green-700 border mb-5 px-2 py-1 rounded">
                <FaLockOpen className="" />
                <h1 className="text-sm ">Verify OTP to get the best price</h1>
              </div>
              <div>
                {/* <h2 className="text-sm font-semibold">Verify OTP</h2> */}
                <form
                  onSubmit={verifyOtp}
                  className="my-4 flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start"
                >
                  <div>
                    <label htmlFor="otpInput" className="text-sm font-semibold">
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
        <div className="flex flex-col justify-center mt-10">
          <h2 className="text-sm font-semibold">Enter Your Phone Number</h2>
          <form
            onSubmit={handleSubmit}
            className="mb-4 flex  max-2sm:flex-col max-2sm:gap-2"
          >
            <div className="">
              <label htmlFor="phoneNumber" className="max-sm:text-sm">
                +91:
              </label>
              <input
                type="number"
                maxLength={10}
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="border-b rounded mr-2 px-2 focus:bg-transparent outline-none "
                placeholder="Enter Mobile Number"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white min-w-fit rounded py-1 px-2 max-sm:px-1"
            >
              Get Final Price
            </button>
          </form>
        </div>
      </div>
      <div className="pt-2 pr-2 grow-0 max-sm:pt-1 max-sm:pr-1">
        <button
          onClick={closeModal}
          className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default OtpGenerator;
