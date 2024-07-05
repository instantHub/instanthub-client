import React, { useEffect, useState } from "react";
import {
  useCreateServiceOrderMutation,
  useGetServicesQuery,
} from "../../features/api";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaAngleRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function BookService() {
  const { serviceId } = useParams();
  console.log("serviceId", serviceId);

  const [searchParams] = useSearchParams();
  const st = searchParams.get("st");
  console.log("service type", st);

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  const [createServiceOrder, { isLoading: createServiceOrderLoading }] =
    useCreateServiceOrderMutation();

  const [selectedService, setSelectedService] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  const [prodPrice, setProdPrice] = useState("");

  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [inspectionCharges, setInspectionCharges] = useState(149);

  const [deviceNameModel, setDeviceNameModel] = useState("");
  const [deviceAdditionalInfo, setDeviceAdditionalInfo] = useState("");

  const navigate = useNavigate();

  const serviceProblemsData = useSelector(
    (state) => state.serviceProblems.serviceProblems
  );
  console.log("serviceProblemsSlice", serviceProblemsData);

  const timings = [
    "9 AM - 11 AM",
    "11 AM - 1 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
    "6 PM - 8 PM",
  ];

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // const formattedDate = `${date.toLocaleString("en-US", {
    //   month: "long",
    // })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
    //   "en-US",
    //   { hour: "numeric", minute: "numeric", hour12: true }
    // )}`;

    // const formattedDate = `${date.toLocaleString("en-US", {
    //   month: "long",
    // })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
    //   "en-US",
    //   { hour: "numeric", minute: "numeric", hour12: true }
    // )}`;
    // // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const handlePinCodeChange = (e) => {
    let value = e.target.value;

    console.log("handlePhoneChange");

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Restrict the length to 10 digits
    if (value.length <= 6) {
      setPincode(Number(e.target.value));
      // setPincode(e.target.value);
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
      setPhone(Number(e.target.value));
    } else {
      toast.error("Phone Number cannot be more than 10 digits");
      return;
    }
  };

  const handleKeyPress = (e) => {
    // Prevent default for non-numeric characters
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  //   UseEffect to Set Service
  useEffect(() => {
    console.log("UseEffect of BookService");

    let service;
    if (!servicesDataLoading) {
      if (st === "b") {
        service = servicesData.serviceBrands.find((sb) => sb._id === serviceId);
        console.log("service", service);
        setSelectedService(service);
        // setInspectionCharges(149);
      } else if (st === "ds") {
        service = servicesData.serviceCategories.find(
          (sc) => sc._id === serviceId
        );
        console.log("service", service);
        setSelectedService(service);
        if (service.name.toLowerCase().includes("interior")) {
          setInspectionCharges(499);
        }
        // else {
        //   setInspectionCharges(149);
        // }
      } else if (st === "ss") {
        service = servicesData.serviceSubProducts.find(
          (sc) => sc._id === serviceId
        );
        console.log("service", service);
        let price = service.price - (service.discount * service.price) / 100;
        setProdPrice(price);
        setSelectedService(service);
        setInspectionCharges(900);
      }
    }
  }, [servicesData, serviceId]);

  // UseEffect to handle page refresh
  useEffect(() => {
    console.log("!serviceProblemsData", serviceProblemsData.length > 0);
    if (st === "b") {
      if (serviceProblemsData.length <= 0) {
        navigate(`/services/serviceBrandProblems/${serviceId}`);
      }
    }
  }, [serviceProblemsData]);

  console.log("selectedService", selectedService);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   selectedDate,
    //   time,
    //   name,
    //   address,
    //   email,
    //   phone,
    //   pincode,
    //   deviceNameModel,
    //   deviceAdditionalInfo
    // );

    let formData = {
      selectedService: selectedService,
      customerName: name,
      email: email,
      phone: phone,
      address: address,
      scheduleDate: selectedDate,
      scheduleTime: time,
      status: "PENDING",
      inspectionCharges,
    };

    if (st === "b") {
      formData = {
        ...formData,
        serviceType: selectedService.serviceCategoryId.type,
        problems: serviceProblemsData,
        deviceInfo: {
          deviceNameModel: deviceNameModel,
          deviceAdditionalInfo: deviceAdditionalInfo,
        },
      };
    } else if (st === "ss") {
      formData = {
        ...formData,
        serviceType: selectedService.serviceCategoryId.type,
        price: prodPrice,
      };
    } else if (st === "ds") {
      formData = {
        ...formData,
        serviceType: selectedService.type,
      };
    }

    console.log("formdata", formData);

    try {
      // const response = await axios.post("/api/services", payload);
      const response = await createServiceOrder(formData);
      console.log("Service Order created successfully:", response.data);

      if (response.data.success) {
        toast.success(
          "Service ordered successfully, kindly check your email for confirmation"
        );
        navigate(`/services`);
      }
      // // Clear the value of the file input
      // fileInputRef.current.value = "";
      // // Mark the file input as required again
      // fileInputRef.current.required = true;
    } catch (error) {
      console.error("Error creating service:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Avail ${selectedService?.name} Services | InstantCashPick`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />
        <meta
          name="keywords"
          content={`Sell
     on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, sell mobiles on instantcashpick`}
        />
        <link rel="canonical" href={`https://instantcashpick.com/`} />
      </Helmet>
      <div className="mt-8 w-4/5 mx-auto">
        <div className="mx-0 mb-6">
          <div className="flex items-center gap-1">
            <div className="flex items-center opacity-60 gap-1 max-sm:text-sm">
              <Link to={"/"}>Home</Link>
              <FaAngleRight />
              <Link
                className={`${st === "ds" ? `` : `max-sm:hidden`}`}
                to={"/services"}
              >
                Service
              </Link>
              <Link
                className={`${st === "ds" ? `hidden` : `sm:hidden`}`}
                to={"/services"}
              >
                ...
              </Link>
              <FaAngleRight />
              {st === "ds" && selectedService ? (
                <Link>{selectedService.name}</Link>
              ) : null}
              {st === "b" && selectedService ? (
                <>
                  <Link
                    className="max-sm:hidden"
                    to={`/services/serviceBrands/${selectedService.serviceCategoryId._id}`}
                  >
                    {selectedService.serviceCategoryId.name}
                  </Link>
                  <Link
                    className="sm:hidden"
                    to={`/services/serviceBrands/${selectedService.serviceCategoryId._id}`}
                  >
                    ...
                  </Link>
                  <FaAngleRight />
                  <Link
                    to={`/services/serviceBrandProblems/${selectedService._id}`}
                  >
                    {selectedService.name}
                  </Link>
                </>
              ) : null}
              {st === "ss" && selectedService ? (
                <>
                  <Link
                    className="max-sm:hidden"
                    to={`/services/serviceSubCategory/${selectedService.serviceCategoryId._id}`}
                  >
                    {selectedService.serviceCategoryId.name}
                  </Link>
                  <Link
                    className="sm:hidden"
                    to={`/services/serviceSubCategory/${selectedService.serviceCategoryId._id}`}
                  >
                    ...
                  </Link>
                  <FaAngleRight />
                  <Link>{selectedService.subServiceId.name}</Link>
                  <FaAngleRight />
                  <Link>{selectedService.name}</Link>
                </>
              ) : null}
            </div>
          </div>

          <hr className="text-black mt-1" />
        </div>

        <div className="flex flex-col">
          {/* <div className="grow-0 w-[30%] border pb-5"> */}
          <div className="mb-2">
            {st === "ds" ? (
              <div>
                <h2 className="mb-1">
                  To book{" "}
                  <span className="font-semibold">
                    {selectedService?.name}{" "}
                  </span>{" "}
                  provide below details to confirm the order.
                </h2>
              </div>
            ) : null}
            {st === "b" ? (
              <div className="flex flex-col items-center">
                <h2 className="text-lg max-sm:text-sm">
                  To book{" "}
                  <span className="font-semibold">
                    {selectedService?.serviceCategoryId?.name}
                  </span>{" "}
                  for{" "}
                  <span className="font-semibold">
                    {selectedService?.name}{" "}
                  </span>
                  provide below details for service confirmation.
                </h2>
                {serviceProblemsData.length > 0 ? (
                  <div className="w-fit mt-2 px-4 py-1 max-h-[50px] overflow-y-auto scrollbar max-sm:text-sm max-sm:w-full">
                    <h2 className="font-semibold border-b mb-1">
                      Selected Problems
                    </h2>
                    {serviceProblemsData.map((sp) => (
                      <div>
                        <span>{sp.serviceProblem}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            {st === "ss" ? (
              <div>
                <h2>
                  To purchase{" "}
                  <span className="font-semibold">
                    {selectedService?.name}{" "}
                  </span>{" "}
                  provide below details to book the order.
                </h2>
              </div>
            ) : null}
          </div>
          <div className="mx-auto w-1/2 border pb-5 max-sm:w-full">
            <div className="flex flex-col ">
              <div className="py-2 text-center bg-cyan-500 text-lg text-white">
                <p>Provide Details For Booking</p>
              </div>

              {/* Sub Service / Furniture */}
              {selectedService?.serviceCategoryId?.type ===
                "ServiceSubCategory" && (
                <div className="grid grid-cols-2 cursor-pointer items-center mx-auto w-full h-full border-b px-4 pb-2 mt-2 bg-white sm:min-w-full">
                  <div className="flex w-36 h-28 items-center justify-center mx-auto max-sm:w-24 max-sm:h-24">
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        selectedService.image
                      }
                      alt="CAT"
                      className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                    />
                  </div>
                  <div className=" mt-2 flex- flex flex-col horizontal items-start justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                    <div className="text-[12px] font-[500] pl-2 leading-7 max-sm:text-xs">
                      <span>{selectedService.name}</span>
                    </div>

                    {/* Prod Desc */}
                    <div className="text-sm font-semibold text-start pl-2 max-sm:text-xs">
                      <span>{selectedService.description}</span>
                    </div>

                    {/* PRICING */}
                    <div className="flex mt-2 pl-2 py-1 items-center gap-1">
                      <div>
                        <span className="text-red-500 font-semibold text-lg">
                          ₹{prodPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-red-500 line-through text-xs">
                          MRP-{selectedService.price}
                        </span>

                        <span className="text-xs">
                          {selectedService.discount}% off
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 text-center text-lg">
                <p>Schedule a Date & Time</p>
              </div>

              {/* <div className="flex mt-5 justify-around max-2sm:flex-col max-2sm:items-start max-2sm:gap-4 max-2sm:mx-auto"> */}
              {/* DATE & TIME */}
              <div className="flex mt-2 justify-around max-2sm:text-xs">
                <div className="">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleTimeChange}
                    timeFormat="h:mm aa" // 12 hours
                    dateFormat="MMMM d, yyyy"
                    minDate={currentDate}
                    className="border-b"
                    placeholderText="Date *"
                    required
                  />
                </div>
                <div>
                  <select
                    name=""
                    onChange={(e) => setTime(e.target.value)}
                    className="text-gray-400 border-b"
                    required
                  >
                    <option value="">
                      Time<span className="text-red-500">*</span>
                    </option>
                    {timings.map((time, i) => (
                      <option value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Electronic devices additional details */}
              {selectedService?.serviceCategoryId?.type === "Brand" && (
                <>
                  <div className="mt-5 text-center text-lg">
                    <h2>
                      Enter Details about your{" "}
                      {selectedService?.serviceCategoryId?.name.split(" ")[0]}
                    </h2>
                  </div>
                  <div>
                    <div className="flex flex-col gap-3 mt-5 pl-5 pr-2">
                      <div className="flex items-center gap-4 max-2sm:flex-col max-2sm:items-start max-2sm:gap-1">
                        <label htmlFor="" className="text-[15px]">
                          Enter Name & Model
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name=""
                          onChange={(e) => setDeviceNameModel(e.target.value)}
                          placeholder="Name & Model"
                          className="border-b"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-4 max-2sm:flex-col max-2sm:items-start max-2sm:gap-1">
                        <label htmlFor="" className="text-[15px]">
                          Add any additional information
                        </label>
                        <input
                          type="text"
                          name=""
                          onChange={(e) =>
                            setDeviceAdditionalInfo(e.target.value)
                          }
                          placeholder="Additional info"
                          className="border-b"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-5 text-center text-lg">
                <p>Your Contact Details</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 mt-5 pl-5 pr-2"
              >
                <div>
                  {/* <label htmlFor="">Name</label> */}
                  <input
                    type="text"
                    name=""
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="border-b w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name=""
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat / Building / Street"
                    className="border-b w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name=""
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border-b w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name=""
                    value={phone}
                    // onChange={(e) => handlePhoneChange(e)}
                    // onKeyPress={handleKeyPress}
                    onChange={handlePhoneChange}
                    placeholder="Mobile No"
                    className="border-b w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name=""
                    value={pincode}
                    onInput={handlePinCodeChange}
                    placeholder="Enter Area PinCode here"
                    className="border-b w-full"
                    required
                  />
                </div>

                <div>
                  <input
                    type="submit"
                    name=""
                    id=""
                    value={`Book Now`}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  />
                </div>
                {st !== "ss" ? (
                  <div>
                    <h2 className="text-center bg-yellow-400 text-lg max-sm:text-sm">
                      Rs.{inspectionCharges} charges for inspection at your
                      doorstep
                    </h2>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-center bg-yellow-400 text-lg max-sm:text-sm">
                      Rs.{inspectionCharges} Delivery charges to your doorstep
                    </h2>
                  </div>
                )}
                <div>
                  {st === "ds" ? (
                    <>
                      <h3 className="bg-red-600 text-white text-center w-fit mx-auto px-1 max-2sm:text-xs">
                        <span className="font-bold">Note:</span> Final price
                        will be provided after full inspection.
                      </h3>
                    </>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
