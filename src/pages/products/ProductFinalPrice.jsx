import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetProductDetailsQuery,
} from "../../features/api";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const ProductFinalPrice = () => {
  const selectedProdDetails = useSelector((state) => state.deductions);
  const [formData, setFormData] = useState();
  const [addressDetails, setAddressDetails] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [accessoriesNotSelected, setAccessoriesNotSelected] = useState([]);
  const [accessoriesSelected, setAccessoriesSelected] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  console.log("selectedProdDetails", selectedProdDetails);

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: productDetails, isLoading: productLoading } =
    useGetProductDetailsQuery(productId);
  console.log("productId", productId);
  const [createOrder, { isLoading: ordersLoading }] = useCreateOrderMutation();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

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
    console.log("date", typeof date);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      addressDetails,
    };
    console.log("orderData", orderData);

    // const order = await createOrder(formData);
    const order = await createOrder(orderData);
    console.log("order", order);
    if (order.data.success) {
      closeModal();
      toast.success("Your Order placed successfully");
      navigate(`/categories/brands/productDetails/${productId}`);
    }
  };

  useEffect(() => {
    console.log(
      "!selectedProdDetails.productAge",
      !selectedProdDetails.productAge.conditionLabel
    );
    // console.log("!selectedProdDetails.productAge",selectedProdDetails.productAge);
    if (selectedProdDetails.productName == "") {
      // navigate(`/`);
      navigate(`/categories/brands/productDetails/${productId}`);
    } else if (!selectedProdDetails.productAge.conditionLabel) {
      navigate(`/categories/brands/productDetails/${productId}`);
    }
  }, [selectedProdDetails]);

  useEffect(() => {
    let prodDeductions;
    if (!productLoading) {
      // console.log("productDetails", productDetails);
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
    console.log("prodDeductions", prodDeductions);
    const prodAccessories = prodDeductions.find(
      (pd) => pd.conditionName === "Accessories"
    );
    console.log("prodAccessories", prodAccessories);
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

    console.log("deductedConditionLabels", deductedConditionLabels);
    // Filter out the prodAccessories that are not present in selectedProdDetails.deductions
    const AccessoriesSelected = prodAccessories.conditionLabels.filter(
      (accessory) => {
        // Check if the conditionLabel of the accessory is not present in deductedConditionLabels
        console.log(accessory);
        return deductedConditionLabels.some(
          (label) => label === accessory.conditionLabel
        );
      }
    );
    console.log("AccessoriesSelected", AccessoriesSelected);
    setAccessoriesSelected(AccessoriesSelected);

    // setFormData({
    //   ...formData,
    //   productId,
    //   category: selectedProdDetails.productCategory,
    //   variant: selectedProdDetails.getUpTo,
    //   deductions: selectedProdDetails.deductions,
    //   offerPrice: Math.ceil(
    //     Number(selectedProdDetails.getUpTo.price) -
    //       Number(selectedProdDetails.toBeDeducted) +
    //       Number(selectedProdDetails.toBeAdded)
    //   ),
    //   status: "pending",
    // });
    let deductedPrice =
      Number(selectedProdDetails.getUpTo.price) -
      Number(selectedProdDetails.toBeDeducted) +
      Number(selectedProdDetails.toBeAdded);
    // console.log("selectedProdDetails", selectedProdDetails);

    if (AccessoriesNotSelected.length > 0) {
      console.log("deductedPrice before accessory deducted", deductedPrice);
      AccessoriesNotSelected.map((a) => {
        deductedPrice =
          deductedPrice -
          Number((a.priceDrop * selectedProdDetails.getUpTo.price) / 100);
      });
      console.log("deductedPrice after accessory deducted", deductedPrice);

      setFormData({
        ...formData,
        productId,
        category: selectedProdDetails.productCategory,
        variant: selectedProdDetails.getUpTo,
        deductions: selectedProdDetails.deductions,
        // accessoriesNotAvailable: AccessoriesNotSelected,
        accessoriesAvailable: AccessoriesSelected,
        offerPrice: Math.ceil(deductedPrice),
        status: "pending",
      });
    } else {
      setFormData({
        ...formData,
        productId,
        category: selectedProdDetails.productCategory,
        variant: selectedProdDetails.getUpTo,
        deductions: selectedProdDetails.deductions,
        accessoriesAvailable: AccessoriesSelected,
        offerPrice: Math.ceil(deductedPrice),
        status: "pending",
      });
    }

    setOfferPrice(Math.ceil(deductedPrice));
  }, [selectedProdDetails, productDetails]);

  console.log("formData", formData);
  // console.log("accessoriesNotSelected out", accessoriesNotSelected);

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${
          selectedProdDetails ? `${selectedProdDetails.productName}` : null
        } Online and Get Instant Cash | InstantCashPick`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />

        <meta
          name="keywords"
          content="Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, instantcashpick"
        />
        <link rel="canonical" href="https://instantcashpick.com/" />
      </Helmet>
      <div className="flex flex-col items-center my-10 mx-auto">
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-[20px]">
            Product {"  "}
            <span className="text-[30px] text-yellow-500 font-semibold">
              {selectedProdDetails.productName +
                " " +
                selectedProdDetails.getUpTo.variantName}
            </span>
            <span className="text-[25px] text-green-600 font-bold"></span>
          </h1>

          <h1 className="text-[20px]">
            Offered Price{" "}
            <span className="text-[30px] text-green-600 font-bold">
              {/* {formData.offerPrice && formData.offerPrice} */}
              {offerPrice}
              /-
              {/* {Number(selectedProdDetails.getUpTo.price)}
              {" - "}
              {Number(selectedProdDetails.toBeDeducted)} */}
            </span>
          </h1>
          <h1 className="text-center">
            This is your Products Offered Price based on the following criteria
            which you mentioned
          </h1>
          {/* Selected ConditionLabels Items List */}
          <div>
            <div>
              <h1 className="text-lg font-semibold py-2">
                Selected Conditions
              </h1>
              {selectedProdDetails.deductions.map((deduction, index) => (
                <h1 key={index}>
                  <span>{index + 1}. </span>{" "}
                  <span className="text-lg font-semibold text-red-600">
                    {deduction.conditionLabel}
                  </span>
                </h1>
              ))}
            </div>
            {accessoriesNotSelected.length > 0 ? (
              <div className="mt-4">
                <h1 className="text-lg font-semibold py-2">
                  Accessories Not Selected
                </h1>
                <div>
                  {accessoriesNotSelected.map((a, index) => (
                    <h1 key={index}>
                      {" "}
                      <span>{index + 1}. </span>{" "}
                      <span className="text-lg font-semibold text-red-600">
                        {a.conditionLabel}
                      </span>
                    </h1>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-center">
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
        </div>
      </div>

      {isOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[50%] max-sm:w-[90%]">
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

                <div className="flex gap-4 items-center max-sm:flex-col max-sm:items-start max-sm:gap-1">
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
