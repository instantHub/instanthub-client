import React, { useState, useEffect } from "react";
import { useGetProductDetailsQuery } from "../../features/api/products/productsApi";
import { useCreateRecycleOrderMutation } from "../../features/api/recycle/recycleApi";
import { useParams, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput";
import Loading from "../../components/loader/Loading";
import RecycleContent from "./RecycleContent";
import LocationSelector from "../../components/LocationSelector";
import { LAPTOP, MOBILE } from "../../utils/constants";
import BreadCrumbLinks from "../../components/BreadCrumbLinks";
import DateAndTime from "../../components/DateAndTime";
import { SubmitButton } from "../../admin/components/SubmitButton";
import InputSubmitBtn from "../../components/InputSubmitBtn";

const RecycleProductDetail = () => {
  const { prodId } = useParams();
  const { data: productDetails, isLoading } = useGetProductDetailsQuery(prodId);
  const [createRecycleOrder, { isLoading: orderLoading }] =
    useCreateRecycleOrderMutation();
  const [variantSelected, setVariantSelected] = useState([]);
  const [selectedDiv, setSelectedDiv] = useState();

  const [checkMobileOn, setCheckMobileOn] = useState(false);
  const [checkLaptopOn, setCheckLaptopOn] = useState(false);

  const [deviceStatus, setDeviceStatus] = useState("");

  const [ageSelected, setAgeSelected] = useState("");

  const [recyclePrice, setRecyclePrice] = useState(500);
  // console.log("recyclePrice", recyclePrice);

  const [orderOpen, setOrderOpen] = useState(false);
  const [address, setAddress] = useState({
    address: "",
    state: "",
    city: "",
    pinCode: "",
  });
  const [addressDetails, setAddressDetails] = useState();

  const navigate = useNavigate();

  const [schedulePickUp, setSchedulePickUp] = useState(null);

  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [selectedDigitalPayment, setSelectedDigitalPayment] = useState("");

  const [showLocation, setShowLocation] = useState(false);

  const handlePaymentModeChange = (e) => {
    console.log("handlePaymentModeChange");
    setSelectedPaymentMode(e.target.value);
    setSelectedDigitalPayment(""); // Reset digital payment selection
  };

  const handleDigitalPaymentChange = (e) => {
    setSelectedDigitalPayment(e.target.value);
  };

  const handleToggle = (variantSelected) => {
    setVariantSelected(variantSelected);
    setSelectedDiv(variantSelected.id);
  };

  // console.log("variantSelected", variantSelected);
  // console.log("productDetails", productDetails);

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
    if (value.length > 10) {
      toast.error("Phone Number cannot be more than 10 digits");
    }
    // if (value.length <= 10) {
    //   setFormData({ ...formData, phone: Number(e.target.value) });
    // } else {
    //   toast.error("Phone Number cannot be more than 10 digits");
    // }
  };

  const handleAddress = (state, city) => {
    setAddress((prev) => {
      return { ...prev, state, city };
    });
  };

  // useEffect to select product variant
  useEffect(() => {
    if (!isLoading) {
      if (productDetails?.category?.name !== MOBILE) {
        handleToggle(productDetails.variants[0]);
      }
    }
    // setLoadedInitially(true);
  }, [productDetails]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");

    if (
      selectedPaymentMode === "" ||
      (selectedPaymentMode.toLowerCase().includes("digital") &&
        selectedDigitalPayment === "")
    ) {
      toast.error("Select Payment Mode..!");
      return;
    }

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data.entries());
    console.log("formData", formData);

    for (const i in formData) {
      // console.log(`${i}: ${formData[i]}`);
      if (formData[i] === "") {
        toast.error("Fill all the fields..!!");
        return;
      }
    }

    const orderData = {
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      schedulePickUp,
      addressDetails: {
        address: formData.address,
        state: address.state,
        city: address.city,
        pinCode: formData.pinCode,
      },
      productDetails: {
        productName: productDetails.name,
        productBrand: productDetails.brand.name,
        productCategory: productDetails.category.name,
        productVariant:
          productDetails.category.name === MOBILE ? variantSelected.name : null,
        productAge:
          productDetails.category.name === LAPTOP ? ageSelected : null,
        productStatus: deviceStatus,
      },
      paymentMode: selectedPaymentMode.toLowerCase().includes("instant")
        ? selectedPaymentMode
        : selectedDigitalPayment,
      recyclePrice,
      status: {
        pending: true,
        completed: false,
        cancelled: false,
      },
    };
    console.log("orderData", orderData);

    try {
      const order = await createRecycleOrder(orderData);
      console.log("order", order);
      if (order.data.success) {
        toast.success("Your Order placed successfully");
        navigate(`/recycle-categories`);
      }
    } catch (error) {
      console.log("Error while booking recycle product:- ", error.message);
    }
  };

  function handleBookOrder(price) {
    setRecyclePrice(price);
    setShowLocation(true);
  }

  if (!productDetails) return <Loading />;

  const { category, brand, name } = productDetails;

  const MOBILE_CATEGORY = category?.name === MOBILE ? true : false;
  const LAPTOP_CATEGORY = category?.name === LAPTOP ? true : false;

  return (
    <>
      <Helmet>
        <title>{`Sell Old ${
          productDetails
            ? `${productDetails.name} ${productDetails.category.name}`
            : null
        }| InstantHub`}</title>

        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />

        <meta
          name="keywords"
          content="sell old mobiles online, sell old mobile online, sell old laptops online, sell old laptop online,sell old products on Instant Hub, Instant Cash, Instant Pick, InstantHub, instant hub, instant hub, instant pick, instanthub"
        />
        <link
          rel="canonical"
          href={`https://www.instanthub.in/recycle-categories/recycle-brands/recycle-productDetails/${prodId}`}
        />
      </Helmet>

      <div className="w-[80%] mx-auto my-5 max-md:w-[90%]">
        <p className="pb-5 text-2xl font-bold max-sm:text-sm max-sm:font-semibold">
          <span>Sell your </span>
          <span>
            {productDetails
              ? `${productDetails?.brand?.name} ${productDetails?.name} ${productDetails?.category?.name} `
              : null}
          </span>
          <span>to recycle and get Instant Cash</span>
        </p>
        {showLocation && (
          <LocationSelector
            handleAddress={handleAddress}
            setShowLocation={setShowLocation}
            setIsOpen={setOrderOpen}
          />
        )}

        {/* Header Links: Home > Category > Brand > Products > ProductName */}
        <BreadCrumbLinks
          recycle={true}
          brands={{
            link: `/recycle-categories/recycle-brands/${category?.id}`,
            label: `Recycle ${category?.name}`,
          }}
          products={{
            link: `/recycle-categories/recycle-brands/recycle-products/${brand.id}`,
            label: `${brand?.name}`,
          }}
          productDetail={{ link: ``, label: name, isLast: true }}
        />

        <div className="bg-white flex flex-col sm:flex-row px-3 sm:p-6 max-sm:pb-3 max-sm:flex-col bg-[url('/images/recycle1.png')] bg-center bg-no-repeat">
          {/* IMAGE */}
          <div className="sm:flex items-center justify-center mr-5 w-full sm:max-w-xs max-sm:size-32 sm:w-1/3 h-20 sm:h-96 max-sm:mx-auto">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={import.meta.env.VITE_APP_BASE_URL + productDetails.image}
                alt="CAT"
                className="size-48 max-sm:size-32"
              />
            </div>
          </div>

          {/* Products Details */}
          <div
            className={`flex flex-col  w-full sm:w-2/3 max-sm:gap-6 max-14inch:gap-12 ${
              productDetails.category.name === "Mobile" ? `gap-16` : `gap-10`
            }`}
          >
            <div className="mt-6 flex gap-2 items-center">
              <h1 className="text-3xl">{productDetails.name}</h1>
              {productDetails.category.name === "Mobile" &&
                variantSelected.length != 0 && (
                  <h3 className="text-2xl">({variantSelected.name})</h3>
                )}
            </div>
            {/* Check if it is Mobile Product */}
            <div className="">
              {productDetails.category.name.toLowerCase().includes("mobile") ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xl max-sm:text-sm">
                    Recyle price will range between 500 - 700 <br /> based on
                    the product status
                  </div>
                  <div>
                    <p>Choose a Variant</p>
                    <p className="opacity-40 text-sm">
                      Select a variant and click on Recycle to know the recyle
                      price
                    </p>
                  </div>

                  {/* Variants */}
                  <div className="flex flex-row flex-wrap list-none p-0 my-0 -mx-2">
                    {productDetails.variants.map((variantSelected) => (
                      <div
                        key={variantSelected.id}
                        className="p-2 w-1/2 sm:w-40 sm:max-w-full"
                        onClick={() => handleToggle(variantSelected)}
                      >
                        <div
                          className={`${
                            selectedDiv == variantSelected.id
                              ? "bg-amber-500 text-white"
                              : "bg-white"
                          } flex items-center rounded-md cursor-pointer p-2.5 ring-0 ring-transparent shadow`}
                        >
                          <span className="border border-solid border-surface-dark rounded-full w-5 h-5 mr-1.5"></span>
                          <span className="text-sm flex-1 flex justify-center">
                            {variantSelected.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4">
                  <div className="text-xl max-sm:text-sm">
                    Recyle price will range between 500 - 1500 <br /> based on
                    the product status
                  </div>
                  <div className="flex items-center text-5xl text-black bg-white w-fit mb-4">
                    <p className="opacity-40 text-sm">
                      Click on Recycle to know the recylce price
                    </p>
                  </div>
                </div>
              )}

              {variantSelected.length != 0 ? (
                <div
                  className="flex items-center w-fit bg-emerald-600 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    if (MOBILE_CATEGORY) {
                      setCheckMobileOn(true);
                    } else if (LAPTOP_CATEGORY) {
                      // setCheckLaptopAge(true);
                      setCheckLaptopOn(true);
                    }
                  }}
                >
                  <button className="px-4">Recycle</button>
                  <FaAngleRight />
                </div>
              ) : (
                <div>
                  <button
                    className="bg-emerald-500 mt-2 text-white px-8 py-2 rounded-md disabled:bg-gray-400 disabled:opacity-30 disabled:text-black"
                    disabled
                  >
                    Recycle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <RecycleContent heading={false} />
        {checkMobileOn && (
          <CheckStatus
            product={{
              category: productDetails?.category?.name,
              name: productDetails?.name,
              variant: variantSelected.name,
            }}
            setIsOpen={setCheckMobileOn}
            handleBookOrder={handleBookOrder}
            setDeviceStatus={setDeviceStatus}
          />
        )}
        {checkLaptopOn && (
          <CheckStatus
            product={{
              category: productDetails?.category?.name,
              name: productDetails?.name,
              variant: variantSelected.name,
            }}
            setIsOpen={setCheckLaptopOn}
            handleBookOrder={handleBookOrder}
            setDeviceStatus={setDeviceStatus}
            setAgeSelected={setAgeSelected}
          />
        )}

        {/* Fill out the details to book order */}
        {orderOpen && (
          <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 max-sm:px-4 max-sm:py-2 rounded-lg shadow-lg w-[50%] max-lg:w-[90%]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">
                  Enter your details
                </h2>
                <button
                  onClick={() => setOrderOpen(false)}
                  className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  x
                </button>
              </div>
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 justify-center"
                >
                  <FormInput
                    name="customerName"
                    pattern="^[A-Za-z]{3,16}"
                    placeholder="Enter Name"
                    errorMessage="Min 3 characters required..!"
                    required={true}
                  />
                  <FormInput
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                  />
                  <FormInput
                    type="number"
                    name="phone"
                    placeholder="Enter Phone Number"
                    handleChange={handlePhoneChange}
                  />
                  <FormInput
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                  />
                  <div className="flex gap-4 items-center max-md:flex-col max-sm:items-start max-sm:gap-1">
                    <FormInput
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={address.state}
                      disabled="true"
                    />
                    <FormInput
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={address.city}
                      disabled="true"
                    />
                  </div>
                  <FormInput
                    type="number"
                    name="pinCode"
                    placeholder="Enter Pincode"
                    handleChange={handlePinCodeChange}
                  />

                  <DateAndTime
                    label={true}
                    showPreviousDate={false}
                    setSchedule={setSchedulePickUp}
                  />

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <FormInput
                        type="radio"
                        name="paymentMode"
                        value="Instant Cash"
                        checked={selectedPaymentMode === "Instant Cash"}
                        handlePayment={handlePaymentModeChange}
                      />

                      <div className="mx-2">
                        <img
                          src="/images/instantcash.webp"
                          alt="upi"
                          className="w-16 h-7 max-sm:w-12 max-sm:h-5"
                        />
                      </div>
                    </label>

                    <label className="flex items-center">
                      <FormInput
                        type="radio"
                        name="paymentMode"
                        value="Digital Payments"
                        checked={selectedPaymentMode === "Digital Payments"}
                        handlePayment={handlePaymentModeChange}
                      />
                      <div className="mx-2">
                        <img
                          src="/images/upi2.webp"
                          alt="upi"
                          className="w-14 h-7 max-sm:w-12 max-sm:h-5"
                        />
                      </div>
                    </label>

                    {selectedPaymentMode === "Digital Payments" && (
                      <div className="ml-6 mt-2 space-y-2">
                        <label className="flex items-center">
                          <FormInput
                            type="radio"
                            name="digitalPaymentMode"
                            value="GPay"
                            checked={selectedDigitalPayment === "GPay"}
                            handlePayment={handleDigitalPaymentChange}
                          />
                        </label>
                        <label className="flex items-center">
                          <FormInput
                            type="radio"
                            name="digitalPaymentMode"
                            value="PhonePe"
                            checked={selectedDigitalPayment === "PhonePe"}
                            handlePayment={handleDigitalPaymentChange}
                          />
                        </label>
                        <label className="flex items-center">
                          <FormInput
                            type="radio"
                            name="digitalPaymentMode"
                            value="UPI"
                            checked={selectedDigitalPayment === "UPI"}
                            handlePayment={handleDigitalPaymentChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* <SubmitButton loading={orderLoading} type="primary">
                    Sell
                  </SubmitButton> */}

                  <InputSubmitBtn loading={orderLoading} label="Book Recycle" />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecycleProductDetail;

function CheckStatus({
  product,
  setIsOpen,
  handleBookOrder,
  setDeviceStatus,
  setAgeSelected,
}) {
  const [status, setStatus] = useState({
    on: false,
    off: false,
    selected: false,
  });

  const MOBILE_CATEGORY = product.category === MOBILE ? true : false;

  const [laptopAge, setLaptopAge] = useState({
    belowThree: false,
    aboveThree: false,
    selected: false,
  });

  const price = MOBILE_CATEGORY
    ? status.selected
      ? status.on
        ? 700
        : 500
      : "Select On / Off"
    : status.selected && laptopAge.selected
    ? status.on && laptopAge.belowThree
      ? 1500
      : 500
    : "Select On / Off";

  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 max-sm:px-2 max-sm:py-5 rounded-lg shadow-lg w-[40%] max-lg:w-[60%] max-sm:w-[80%] max-2sm:w-[95%]">
        <h2 className="text-xl font-semibold mb-4 text-center max-sm:text-sm">
          Would You Like to Recycle this {product.category}?
        </h2>

        <p className="font-semibold">
          Kindly select your {product.category} Status
        </p>

        {/* On - Off Radio Buttons */}
        <CheckOnOff
          status={status}
          setStatus={setStatus}
          setDeviceStatus={setDeviceStatus}
        />

        {product.category === "Laptop" && status.selected && (
          <>
            <p className="font-semibold">
              Kindly select your {product.category} Age
            </p>
            <CheckAge
              data={laptopAge}
              setData={setLaptopAge}
              setAgeSelected={setAgeSelected}
            />
          </>
        )}

        <div className="flex gap-2 items-center my-2">
          <span>Recycle Price</span>
          <span
            className={`${
              status.selected ? "text-lg" : "text-sm"
            } font-semibold`}
          >
            {price}
          </span>
        </div>

        <div className="flex gap-4 items-center max-sm:text-sm">
          <span>{product.category} Name</span>
          <span className="text-lg font-semibold max-sm:text-sm">
            {product.name}
          </span>
        </div>

        {product.category.toLowerCase().includes("mobile") && (
          <div className="flex gap-4 items-center">
            <span>Variant</span>
            <span className="text-lg max-sm:text-sm font-semibold">
              {product.variant}
            </span>
          </div>
        )}

        <Buttons
          status={status}
          category={product.category}
          laptopAge={laptopAge}
          yesHandler={() => {
            setIsOpen(false);
            handleBookOrder(price);
          }}
          noHandler={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

function CheckOnOff({ status, setStatus, setDeviceStatus }) {
  return (
    <div className="w-full flex justify-center items-center gap-4 my-4 text-[16px] max-sm:text-sm">
      <label htmlFor="switch-on" className="w-full cursor-pointer">
        <input
          type="radio"
          id="switch-on"
          name="statusToggle"
          checked={status.on}
          onChange={() => {
            setStatus({ on: true, off: false, selected: true });
            setDeviceStatus("Switch On");
          }}
          className="hidden"
        />
        <span
          className={`inline-block p-2 border rounded-md ${
            status.on
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          } `}
        >
          Switch On
        </span>
      </label>

      <label htmlFor="switch-off" className="w-full cursor-pointer">
        <input
          type="radio"
          id="switch-off"
          name="statusToggle"
          checked={status.off}
          onChange={() => {
            setStatus({ on: false, off: true, selected: true });
            setDeviceStatus("Switch Off");
          }}
          className="hidden"
        />
        <span
          className={`inline-block p-2 border rounded-md ${
            status.off
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          } `}
        >
          Switch Off
        </span>
      </label>
    </div>
  );
}

function CheckAge({ data, setData, setAgeSelected }) {
  return (
    <div className="flex justify-around items-center gap-4 my-4 text-[16px] max-sm:text-sm">
      <label
        htmlFor="on"
        className="w-full"
        onClick={() => {
          setData({
            belowThree: true,
            aboveThree: false,
            selected: true,
          });
          setAgeSelected("Between 1-3 Years");
        }}
      >
        <input
          type="radio"
          name="belowThree"
          checked={data.belowThree}
          required
        />{" "}
        Between 1-3 Years
      </label>
      <label
        htmlFor="on"
        className="w-full"
        onClick={() => {
          setData({
            belowThree: false,
            aboveThree: true,
            selected: true,
          });
          setAgeSelected("More Than 3 Years");
        }}
      >
        <input
          type="radio"
          name="aboveThree"
          checked={data.aboveThree}
          required
        />
        More Than 3 Years
      </label>
    </div>
  );
}

function Buttons({ status, category, laptopAge, yesHandler, noHandler }) {
  const disable =
    !status.selected || (category !== "Mobile" && !laptopAge.selected);

  return (
    <div className="w-full flex justify-around mt-8 items-center">
      <button
        onClick={yesHandler}
        className="bg-green-600 text-white mx-auto px-4 py-1 rounded h-fit w-fit disabled:bg-gray-400"
        disabled={disable}
        // disabled={!status.selected}
      >
        Yes
      </button>
      <img
        src="/images/recycle1.png"
        alt="logo"
        className="w-[88px] h-[70px] max-2sm:w-[60px] max-2sm:h-[55px]"
      />
      <button
        onClick={noHandler}
        className="bg-red-700 text-white mx-auto px-4 py-1 rounded h-fit w-fit"
      >
        No
      </button>
    </div>
  );
}
