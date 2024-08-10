import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetCouponQuery,
  useGetProductDetailsQuery,
} from "../../features/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { FaAngleRight } from "react-icons/fa6";
import FAQ from "../../components/FAQ";
import { GiPartyPopper } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";

const ProductFinalPrice = () => {
  const { data: couponsData, isLoading: couponsDataLoading } =
    useGetCouponQuery();
  const [couponCode, setCouponCode] = useState("");
  const [couponPrice, setCouponPrice] = useState("");
  const [couponCodeApplied, setCouponCodeApplied] = useState(false);
  const selectedProdDetails = useSelector((state) => state.deductions);
  const [formData, setFormData] = useState();
  const [addressDetails, setAddressDetails] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [specialPrice, setSpecialPrice] = useState();
  const [accessoriesNotSelected, setAccessoriesNotSelected] = useState([]);
  const [accessoriesSelected, setAccessoriesSelected] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [couponView, setCouponView] = useState(false);
  const currentDate = new Date();

  const couponDiv = useRef(null);

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  console.log("selectedProdDetails", selectedProdDetails);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  // console.log("productId", productId);
  const { data: productDetails, isLoading: productLoading } =
    useGetProductDetailsQuery(productId);
  // console.log("productDetails", productDetails);
  const [createOrder, { isLoading: ordersLoading }] = useCreateOrderMutation();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedDigitalPayment, setSelectedDigitalPayment] = useState("");

  const handlePaymentModeChange = (e) => {
    setSelectedPaymentMode(e.target.value);
    setSelectedDigitalPayment(""); // Reset digital payment selection
  };

  const handleDigitalPaymentChange = (e) => {
    setSelectedDigitalPayment(e.target.value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePinCodeChange = (e) => {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Restrict the length to 10 digits
    if (value.length <= 6) {
      setAddressDetails({ ...addressDetails, pinCode: Number(e.target.value) });
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

  const handleTimeChange = (date) => {
    setSelectedDate(date);

    const formattedDate = `${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    )}`;
    // console.log("formattedDate", formattedDate);
    setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const handleCoupon = async () => {
    // console.log("handleCoupon", couponCode);
    const couponFound = couponsData.find((c) => c.couponCode === couponCode);
    // console.log("couponFound", couponFound);
    if (couponFound) {
      const currentPrice = offerPrice;

      // PERCENTAGE CALCULATIONS FOR COUPON
      // const couponValue = (couponFound.couponValue * currentPrice) / 100;

      // AMOUNT CALCULATION FOR COUPON
      const couponValue = couponFound.couponValue;

      setCouponPrice(couponValue);

      const finalPrice = couponValue + offerPrice;

      setCouponCodeApplied(true);
      setSpecialPrice(finalPrice);
      setCouponView(false);
      toast.success("Coupon Code Applied Successfully");
    } else {
      toast.error("Invalid Coupon Code..!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      selectedPaymentMode === "" ||
      (selectedPaymentMode.toLowerCase().includes("digital") &&
        selectedDigitalPayment === "")
    ) {
      toast.error("Select Payment Mode..!");
      return;
    }

    const orderData = {
      ...formData,
      addressDetails,
      paymentMode: selectedPaymentMode.toLowerCase().includes("instant")
        ? selectedPaymentMode
        : selectedDigitalPayment,
      offerPrice: couponCodeApplied ? specialPrice : offerPrice,
    };
    // console.log("orderData", orderData);

    // const order = await createOrder(formData);
    const order = await createOrder(orderData);
    // console.log("order", order);
    if (order.data.success) {
      closeModal();
      toast.success("Your Order placed successfully");
      navigate(`/categories/brands/productDetails/${productId}`);
    }
  };

  // UseEffect to handle page refresh
  useEffect(() => {
    // console.log(
    //   "!selectedProdDetails.productAge",
    //   !selectedProdDetails.productAge.conditionLabel
    // );
    if (selectedProdDetails.productName == "") {
      // navigate(`/`);
      navigate(`/categories/brands/productDetails/${productId}`);
    } else if (!selectedProdDetails.productAge.conditionLabel) {
      navigate(`/categories/brands/productDetails/${productId}`);
    } else if (
      selectedProdDetails.productPhysicalCondition.conditionLabel === ""
    ) {
      navigate(`/categories/brands/productDetails/${productId}`);
    }
  }, [selectedProdDetails]);

  // UseEffect to get complete final data
  useEffect(() => {
    let prodDeductions;
    if (!productLoading) {
      console.log("productDetails", productDetails);
      if (productDetails.category.name === "Mobile") {
        prodDeductions = productDetails.variantDeductions.find(
          (vd) =>
            vd.variantName === String(selectedProdDetails.getUpTo.variantName)
        );
        prodDeductions = prodDeductions.deductions;
      } else if (productDetails.category.name !== "Mobile") {
        prodDeductions = productDetails.simpleDeductions;
      }
    }
    // console.log("prodDeductions", prodDeductions);
    const prodAccessories = prodDeductions.find(
      (pd) => pd.conditionName === "Accessories"
    );
    // console.log("prodAccessories", prodAccessories);
    // console.log(
    //   "selectedProdDetails.deductions",
    //   selectedProdDetails.deductions
    // );

    // Get the condition labels from selectedProdDetails.deductions
    const deductedConditionLabels = selectedProdDetails.deductions.map(
      (item) => item.conditionLabel
    );
    // console.log("deductedConditionLabels",deductedConditionLabels);

    // Filter out the prodAccessories that are not present in selectedProdDetails.deductions
    const AccessoriesNotSelected = prodAccessories.conditionLabels.filter(
      (accessory) => {
        // Check if the conditionLabel of the accessory is not present in deductedConditionLabels
        return !deductedConditionLabels.some(
          (label) => label === accessory.conditionLabel
        );
      }
    );
    setAccessoriesNotSelected(AccessoriesNotSelected);

    // console.log("deductedConditionLabels", deductedConditionLabels);
    // Filter out the prodAccessories that are not present in selectedProdDetails.deductions
    const AccessoriesSelected = prodAccessories.conditionLabels.filter(
      (accessory) => {
        // Check if the conditionLabel of the accessory is not present in deductedConditionLabels
        // console.log(accessory);
        return deductedConditionLabels.some(
          (label) => label === accessory.conditionLabel
        );
      }
    );
    // console.log("AccessoriesSelected", AccessoriesSelected);
    setAccessoriesSelected(AccessoriesSelected);

    let deductedPrice =
      Number(selectedProdDetails.getUpTo.price) -
      Number(selectedProdDetails.toBeDeducted) +
      Number(selectedProdDetails.toBeAdded);
    // console.log("selectedProdDetails", selectedProdDetails);

    if (AccessoriesNotSelected.length > 0) {
      // console.log("deductedPrice before accessory deducted", deductedPrice);

      AccessoriesNotSelected.map((a) => {
        if (productDetails.category.name.includes("Mobile")) {
          deductedPrice =
            deductedPrice -
            Number((a.priceDrop * selectedProdDetails.getUpTo.price) / 100);
        } else {
          deductedPrice = deductedPrice - Number(a.priceDrop);
        }
        console.log("AccessoriesNotSelected", a);
      });
      // console.log("deductedPrice after accessory deducted", deductedPrice);

      setFormData({
        ...formData,
        productId,
        productName: selectedProdDetails.productName,
        productBrand: productDetails.brand.name,
        productCategory: selectedProdDetails.productCategory,
        variant: selectedProdDetails.getUpTo,
        deductions: selectedProdDetails.deductions,
        // accessoriesNotAvailable: AccessoriesNotSelected,
        accessoriesAvailable: AccessoriesSelected,
        // offerPrice: Math.ceil(deductedPrice),
        status: "pending",
      });
    } else {
      setFormData({
        ...formData,
        productId,
        productName: selectedProdDetails.productName,
        productBrand: productDetails.brand.name,
        productCategory: selectedProdDetails.productCategory,
        variant: selectedProdDetails.getUpTo,
        deductions: selectedProdDetails.deductions,
        accessoriesAvailable: AccessoriesSelected,
        // offerPrice: Math.ceil(deductedPrice),
        status: "pending",
      });
    }

    if (
      deductedPrice > 500 &&
      deductedPrice < selectedProdDetails.getUpTo.price
    ) {
      setOfferPrice(Math.ceil(deductedPrice));
    } else if (deductedPrice > selectedProdDetails.getUpTo.price) {
      setOfferPrice(selectedProdDetails.getUpTo.price);
    } else {
      setOfferPrice(500);
    }
  }, [selectedProdDetails, productDetails]);

  // console.log("formData", formData);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${
          selectedProdDetails ? `${selectedProdDetails.productName}` : null
        } Online and Get Instant Cash | InstantCashPick`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>

      <div className="flex flex-col justify-between items- pt-2 px-10 bg-slate-200 bg-opacity-10 w-full max-2sm:px-4">
        <div className=" justify-start items-start mb-2">
          <Link to={`/categories/brands/productDetails/${productDetails?.id}`}>
            <button className=" text-cyan-600 bg-white px-2 py-1 border border-cyan-600 rounded">
              Back
            </button>
          </Link>
        </div>

        <div className="w-full flex gap-10 max-sm:flex-col">
          {/* Left */}
          <div
            className={`${
              couponCodeApplied ? ` max-h-[630px]` : ` max-h-[600px]`
            } w-[40%] bg-white grow-0 border-l border-r px-4 py-2 shadow-md flex flex-col items-center justify-center max-sm:w-full`}
          >
            <div className="flex justify-center items-center">
              <div>
                <img
                  src={`${import.meta.env.VITE_APP_BASE_URL}${
                    productDetails && productDetails.image
                  }`}
                  alt="productImage"
                  className="size-20 max-sm:size-24"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 text-lg text-yellow-500 font-semibold max-sm:text-xl">
                  <span>{selectedProdDetails.productName}</span>
                  {productDetails?.category.name === "Mobile" ? (
                    <span>{selectedProdDetails.getUpTo.variantName}</span>
                  ) : null}
                </div>
                {/* <h2 className="text-xl">
                Offered Price{" "}
                <span className="text-[30px] text-green-600 font-bold">
                  {offerPrice}
                  /-
                </span>
              </h2> */}
              </div>
            </div>

            <div className="flex w-full justify-end mt-5">
              <Link
                to={`/sell/deductions?productId=${productDetails?.id}&variant=${selectedProdDetails?.getUpTo.variantName}`}
              >
                <button
                  className="px-2 border-b rounded"
                  // onClick={() => window.location.reload()}
                >
                  Recalculate
                </button>
              </Link>
            </div>

            {/* Price Summary */}
            <div className="flex flex-col w-full items-start mt-2 mb-7 gap-4 border rounded shadow-md px-4 py-2">
              <h2 className="pb-2 border-b">Price Summary</h2>
              <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
                <h2>Offered Price</h2>
                <span>₹{offerPrice}</span>
              </div>
              <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
                <h2>PickUp Charges</h2>
                <div className="flex items-center">
                  <span className="text-green-500">Free</span>
                  <span className="pl-1 line-through">₹100</span>
                </div>
              </div>
              <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
                <h2>Processing Fee</h2>
                <div className="flex items-center">
                  <span className="text-green-500">Free</span>
                  <span className="pl-1 line-through">₹50</span>
                </div>
              </div>
              {couponCodeApplied && (
                <div className="w-full flex justify-between items-center pb-3 border-b">
                  <h2 className="flex items-center gap-1">
                    Coupon
                    <span className="flex gap-1 items-center text-green-600">
                      {couponCode} Applied
                      <GiPartyPopper />
                    </span>
                  </h2>
                  <div className="flex items-center">
                    <span className="pl-1">₹{couponPrice}</span>
                  </div>
                </div>
              )}
              <div className="w-full flex justify-between gap-6 items-center pb-3 border-b">
                <h2>Total</h2>
                {couponCodeApplied ? (
                  <span>₹{specialPrice}</span>
                ) : (
                  <span>₹{offerPrice}</span>
                )}
              </div>
              {/* <div className="w-full flex justify-center">
                {offerPrice > 500 ? (
                  <button
                    onClick={openModal}
                    className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
                  >
                    Sell
                  </button>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/recycle-categories/recycle-brands/recycle-productDetails/${productId}`
                        )
                      }
                      className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded max-sm:text-sm"
                    >
                      Recycle this product
                    </button>
                    <p className="text-sm text-center text-gray-500 max-sm:text-xs">
                      Since your product value is very low you can recycle this
                      product with us.
                    </p>
                  </div>
                )}
              </div> */}
              <div className="w-full flex justify-center">
                <button
                  onClick={openModal}
                  className="w-3/4 px-4 py-1 border text-white bg-green-600 rounded"
                >
                  Sell
                </button>
              </div>
            </div>

            <div className="w-full px-4 py-4 border rounded shadow-md">
              <div
                className="flex justify-between items-center"
                onClick={() => setCouponView(true)}
                ref={couponDiv}
              >
                <div className="flex items-center gap-2">
                  <span>
                    <img
                      src="/images/apply_coupon.webp"
                      alt="applycoupon"
                      className="size-5"
                    />
                  </span>
                  <span>Apply Coupon</span>
                </div>
                <div>
                  <FaAngleRight />
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-center">
            <h2>Want to sell?..</h2>
            <h2 className="text-center">
              Click on "Sell" below and book your order for Instant Cash Pick
            </h2>
            <button
              onClick={openModal}
              className="px-4 py-1 border text-white bg-[#E27D60] rounded"
            >
              Sell
            </button>
          </div> */}
          </div>

          {/* Right */}
          <div className="w-full grow flex flex-col items-center max-sm:w-full">
            <div className="w-3/4 p-4 max-h-[550px] flex flex-col shadow-md overflow-y-auto scrollbar max-sm:w-full">
              <div className="flex items-center justify-center">
                <p className="text-center">
                  This is your Products Offered Price based on the <br />
                  following criteria that you selected
                </p>
              </div>

              {/* Selected ConditionLabels Items List */}
              {/* <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold py-2">
                  Selected Creteria
                </h2>
                {selectedProdDetails.deductions.map((deduction, index) => (
                  <h2 key={index}>
                    <span>{index + 1}. </span>{" "}
                    <span
                      className={`${
                        deduction.operation.toLowerCase().includes("add")
                          ? `text-green-600`
                          : `text-red-500`
                      } text-lg font-semibold`}
                    >
                      {deduction.conditionLabel}
                    </span>
                  </h2>
                ))}
              </div> */}
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold py-2">
                  Positive Creteria
                </h2>
                {selectedProdDetails.deductions
                  .filter((d) => d.operation.toLowerCase().includes("add"))
                  .map((deduction, index) => (
                    <h2 key={index}>
                      <span>{index + 1}. </span>{" "}
                      <span
                        className={`${
                          deduction.operation.toLowerCase().includes("add")
                            ? `text-green-600`
                            : `text-red-500`
                        } text-lg font-semibold`}
                      >
                        {deduction.conditionLabel}
                      </span>
                    </h2>
                  ))}
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold py-2">
                  Negative Creteria
                </h2>
                {selectedProdDetails.deductions
                  .filter((d) => d.operation.toLowerCase().includes("subtrack"))
                  .map((deduction, index) => (
                    <h2 key={index}>
                      <span>{index + 1}. </span>{" "}
                      <span
                        className={`${
                          deduction.operation.toLowerCase().includes("add")
                            ? `text-green-600`
                            : `text-red-500`
                        } text-lg font-semibold`}
                      >
                        {deduction.conditionLabel}
                      </span>
                    </h2>
                  ))}
              </div>
              {accessoriesNotSelected.length > 0 ? (
                <div className="flex flex-col items-start">
                  <h2 className="text-lg font-semibold py-2">
                    Accessories Not Selected
                  </h2>
                  <div>
                    {accessoriesNotSelected.map((a, index) => (
                      <h2 key={index}>
                        <span>{index + 1}. </span>{" "}
                        <span className="text-lg font-semibold text-red-600">
                          {a.conditionLabel}
                        </span>
                      </h2>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="w-3/4 mt-5 flex items-center justify-center max-lg:w-full">
              <FAQ />
            </div>
          </div>
        </div>
      </div>

      {couponView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white pt-5 px-8 rounded-lg shadow-lg w-fit">
            <div className="flex flex-col items-start justify-center gap-2">
              <label htmlFor="">Add Coupon Code</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Coupon Code"
                className="px-2 py-1 border rounded"
                onChange={(e) => setCouponCode(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-center justify-center my-4">
              {!couponCodeApplied ? (
                <button
                  onClick={() => handleCoupon()}
                  className="bg-green-700 text-white px-4 py-1 rounded"
                >
                  Apply
                </button>
              ) : (
                <button
                  onClick={() => handleCoupon()}
                  className="bg-gray-500 text-white px-4 py-1 rounded pointer-events-none opacity-30"
                >
                  Apply
                </button>
              )}
              <button
                onClick={() => setCouponView(false)}
                className="bg-red-700 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
            {couponCodeApplied ? (
              <div className="pb-3 text-center">
                <p className="text-red-600 flex items-center ">
                  Coupon Already Applied <FcCancel />
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {isOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[60%] max-lg:w-3/4 max-sm:w-[90%]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Enter your details</h2>
              <button
                onClick={closeModal}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>
            <p></p>
            <div>
              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 justify-center"
              >
                <div>
                  <label htmlFor="name" className="max-sm:text-md">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Name"
                    className="border rounded px-2 py-1 w-1/3 max-sm:w-1/2 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter email"
                    className="border rounded px-2 py-1 w-1/3 max-sm:w-1/2 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number: </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter phone number"
                    className="border rounded px-2 py-1 w-1/3 max-sm:w-1/2 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                    // onChange={(e) =>
                    //   setFormData({ ...formData, phone: Number(e.target.value) })
                    // }
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address">Address: </label>
                  <input
                    type="text"
                    name="address"
                    // value={addressDetails.address}
                    id=""
                    placeholder="Add your address"
                    className="border w-[75%] rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                    onChange={(e) =>
                      setAddressDetails({
                        ...addressDetails,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* State, City, Pincode */}
                <div className="flex gap-4 items-center max-lg:flex-col max-sm:items-start max-sm:gap-1">
                  <div>
                    <label htmlFor="city">State: </label>
                    <input
                      type="text"
                      // value={addressDetails.state}
                      id=""
                      placeholder="Enter State"
                      className="border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                      onChange={(e) =>
                        setAddressDetails({
                          ...addressDetails,
                          state: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="">
                    <label htmlFor="pincode">City: </label>
                    <input
                      type="text"
                      name="city"
                      // value={addressDetails.city}
                      placeholder="Enter City"
                      className="border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                      onChange={(e) =>
                        setAddressDetails({
                          ...addressDetails,
                          city: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="max-sm:text-md">
                      PinCode:{" "}
                    </label>
                    <input
                      type="number"
                      name="pinCode"
                      // value={addressDetails.pinCode}
                      id=""
                      placeholder="Add PinCode"
                      className="border rounded px-2 py-1 max-sm:text-sm max-sm:px-1 max-sm:py-0"
                      onChange={handlePinCodeChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <h2 className="max-sm:text-md">Select Date and Time:</h2>{" "}
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleTimeChange}
                    showTimeSelect
                    // timeFormat="HH:mm" // 24 hours
                    timeFormat="h:mm aa" // 12 hours
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    minDate={currentDate}
                    minTime={minTime}
                    maxTime={maxTime}
                    className="border px-1 rounded max-sm:text-sm max-sm:px-1 max-sm:py-0"
                    placeholderText="Schedule Pickup"
                    required
                  />
                </div>
                <div>
                  {selectedDate && (
                    <p>
                      Scheduled time:{" "}
                      <span className="font-semibold">
                        {formData.schedulePickUp}
                      </span>{" "}
                    </p>
                  )}
                </div>

                {/* Payment */}
                <div className="pb-2">
                  <h2 className="text-xl mb-4 max-sm:text-lg">
                    Select Payment Mode
                  </h2>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        id="instantCash"
                        type="radio"
                        name="paymentMode"
                        value="Instant Cash"
                        checked={selectedPaymentMode === "Instant Cash"}
                        onChange={handlePaymentModeChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Instant Cash
                      </span>
                      <div className="mx-2">
                        <img
                          src="/images/instantcash.webp"
                          alt="upi"
                          className="w-16 h-7"
                        />
                      </div>
                    </label>
                    <label className="flex items-center">
                      <input
                        id="digitalPayments"
                        type="radio"
                        name="paymentMode"
                        value="Digital Payments"
                        checked={selectedPaymentMode === "Digital Payments"}
                        onChange={handlePaymentModeChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Digital Payments
                      </span>
                      <div className="mx-2">
                        <img
                          src="/images/upi2.webp"
                          alt="upi"
                          className="w-14 h-7"
                        />
                      </div>
                    </label>

                    {selectedPaymentMode === "Digital Payments" && (
                      <div className="ml-6 mt-2 space-y-2">
                        <label className="flex items-center">
                          <input
                            id="gpay"
                            type="radio"
                            name="digitalPaymentMode"
                            value="GPay"
                            checked={selectedDigitalPayment === "GPay"}
                            onChange={handleDigitalPaymentChange}
                            className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                            GPay
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            id="phonepe"
                            type="radio"
                            name="digitalPaymentMode"
                            value="PhonePe"
                            checked={selectedDigitalPayment === "PhonePe"}
                            onChange={handleDigitalPaymentChange}
                            className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                            PhonePe
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            id="upi"
                            type="radio"
                            name="digitalPaymentMode"
                            value="UPI"
                            checked={selectedDigitalPayment === "UPI"}
                            onChange={handleDigitalPaymentChange}
                            className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-900 max-sm:text-xs">
                            UPI
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {!ordersLoading ? (
                  <input
                    type="submit"
                    value="Sell"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-700 max-sm:text-sm"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Loading"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-blue-300 text-white cursor-none max-sm:text-sm"
                    disabled
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFinalPrice;
