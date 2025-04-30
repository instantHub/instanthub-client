import React, { useEffect, useState } from "react";
import {
  useCreateServiceOrderMutation,
  useGetServicesQuery,
} from "@features/api/services/servicesApi";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ServiceFAQs from "../../../components/user/static/services/ServiceFAQs";
import PriceModal from "./PriceModal";
import InputSubmitBtn from "@components/user/InputSubmitBtn";
import DateAndTime from "@components/user/DateAndTime/DateAndTime";

// New Form Validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ServiceBreadCrumbLinks from "@components/user/breadcrumbs/ServiceBreadCrumbsLinks";

const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").trim(),
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|hotmail\.com|aol\.com)$/,
        "Only Gmail, Yahoo, Outlook, iCloud, Hotmail, and AOL are allowed"
      ),
    phone: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d{10}$/, "Phone number must contain only numbers")
      .transform((val) => Number(val)), // Convert to number

    address: z.string().min(8, "Address must be at least 10 characters").trim(),
    pincode: z
      .string()
      .length(6, "Pincode must be exactly 6 digits")
      .regex(/^\d{6}$/, "Pincode must contain only numbers")
      .transform((val) => Number(val)), // Convert to number

    // Conditionally required based on serviceType
    deviceNameModel: z
      .string()
      .trim()
      .min(2, "Model Name must be at least 2 characters")
      .optional(), // Initially optional, we’ll enforce conditionally

    deviceAdditionalInfo: z.string().trim().optional(), // Always optional
  })
  .superRefine((data, ctx) => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get("st"); // Getting 'st' from URL

    // Conditionally require deviceNameModel if serviceType is "repair" or "exchange"
    if (serviceType === "b" && !data.deviceNameModel) {
      ctx.addIssue({
        path: ["deviceNameModel"],
        message: "Model Name is required for this service type",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default function BookService() {
  const { serviceId } = useParams();
  // console.log("serviceId", serviceId);

  const [searchParams] = useSearchParams();
  const st = searchParams.get("st");
  // console.log("service type", st);

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();
  const [createServiceOrder, { isLoading: createServiceOrderLoading }] =
    useCreateServiceOrderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [serviceType, setServiceType] = useState({
    directService: false,
    brandsService: false,
    subService: false,
  });

  const [selectedService, setSelectedService] = useState(null);

  const [schedulePickUp, setSchedulePickUp] = useState(null);

  const [prodPrice, setProdPrice] = useState("");
  const [inspectionCharges, setInspectionCharges] = useState(0);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const ERROR_STYLE = "text-red-500 text-xs";

  const serviceProblemsData = useSelector(
    (state) => state.serviceProblems.serviceProblems
  );
  // console.log("serviceProblemsSlice", serviceProblemsData);

  //   UseEffect to Set Service
  useEffect(() => {
    // console.log("UseEffect of BookService");

    if (servicesDataLoading) return;

    let service;
    if (st === "ds") {
      service = servicesData.serviceCategories.find(
        (sc) => sc._id === serviceId
      );
      // console.log("direct service", service);

      setSelectedService(service);
      setServiceType((prev) => ({ ...prev, directService: true }));
    } else if (st === "b") {
      service = servicesData.serviceBrands.find((sb) => sb._id === serviceId);
      // console.log("brand service", service);

      setSelectedService(service);
      setServiceType((prev) => ({ ...prev, brandsService: true }));
    } else if (st === "ss") {
      service = servicesData.serviceSubProducts.find(
        (sc) => sc._id === serviceId
      );
      // console.log("sub service", service);

      let price = service.price - (service.discount * service.price) / 100;
      setProdPrice(price);
      setSelectedService(service);
      setServiceType((prev) => ({ ...prev, subService: true }));
    }
  }, [servicesData, serviceId]);

  // setting up inspectionCharges
  useEffect(() => {
    if (selectedService) {
      if (st === "ds") {
        setInspectionCharges(selectedService.inspectionCharges);
      } else {
        setInspectionCharges(
          selectedService.serviceCategoryId.inspectionCharges
        );
      }
    }
  }, [selectedService]);

  // UseEffect to handle page refresh
  useEffect(() => {
    // console.log("!serviceProblemsData", serviceProblemsData.length > 0);
    if (st === "b" && serviceProblemsData.length <= 0) {
      navigate(`/services/serviceBrandProblems/${serviceId}`);
    }
  }, [serviceProblemsData]);

  // console.log("selectedService", selectedService);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const {
      name,
      email,
      phone,
      address,
      pincode,
      deviceNameModel,
      deviceAdditionalInfo,
    } = data;

    if (!schedulePickUp) {
      toast.warning("Kindly Select Schedule Date");
      return;
    }

    let formData = {
      selectedService: selectedService,
      customerName: name,
      email: email,
      phone: phone,
      address: address,
      pincode,
      scheduleDate: schedulePickUp,
      status: {
        pending: true,
        completed: false,
        cancelled: false,
      },
      inspectionCharges,
    };

    if (serviceType.brandsService) {
      formData = {
        ...formData,
        serviceType: selectedService.serviceCategoryId.type,
        problems: serviceProblemsData,
        deviceInfo: {
          deviceNameModel: deviceNameModel,
          deviceAdditionalInfo: deviceAdditionalInfo,
        },
      };
    } else if (serviceType.subService) {
      formData = {
        ...formData,
        serviceType: selectedService.serviceCategoryId.type,
        price: prodPrice,
      };
    } else if (serviceType.directService) {
      formData = {
        ...formData,
        serviceType: selectedService.type,
      };
    }

    console.log("formdata", formData);

    try {
      const response = await createServiceOrder(formData);
      // console.log("Service Order created successfully:", response.data);

      if (response.data.success) {
        toast.success(
          "Service ordered successfully, kindly check your email for confirmation"
        );
        navigate(`/services`);
      }
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  function getHeadingTitle() {
    if (serviceType.directService) {
      return ` To book ${selectedService?.name} provide below details to confirm the order.`;
    } else if (serviceType.brandsService) {
      return ` To book ${selectedService?.name} ${selectedService?.serviceCategoryId?.name} provide below details for service confirmation.`;
    } else if (serviceType.subService) {
      return ` To purchase ${selectedService?.name} provide below details to book the order.`;
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Book Your  ${selectedService?.name} ${
          selectedService?.serviceCategoryId
            ? `${selectedService?.serviceCategoryId?.name}`
            : ``
        } | InstantHub`}</title>
        <meta
          name="description"
          content="InstantHub offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantHub. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs."
        />
      </Helmet>

      <div className="mt-8 w-4/5 max-sm:w-[90%] mx-auto">
        {/* Home > Cat > Brand */}
        <div className="mx-0 mb-6">
          <ServiceBreadCrumbLinks
            directService={{
              link: `/services/book-service/${selectedService?._id}?st=${st}`,
              label: selectedService?.name,
              isLast: serviceType.directService,
            }}
            brandsService={
              serviceType.brandsService && {
                link: `/services/serviceBrands/${selectedService?.serviceCategoryId?._id}?st=${st}`,
                label: selectedService?.serviceCategoryId?.name,
                isLast: serviceType.brandsService,
              }
            }
            subService={
              serviceType.subService && {
                link: `/services/serviceSubCategory/${selectedService?.serviceCategoryId?._id}?st=${st}`,
                label: selectedService?.serviceCategoryId?.name,
                isLast: serviceType.subService,
              }
            }
          />
        </div>

        <div className={`flex flex-col`}>
          <div className={`flex flex-col justify-center w-full `}>
            {/* Heading for brand */}
            <h1 className="text-center text-lg max-sm:text-sm mb-5">
              {getHeadingTitle()}
            </h1>

            <div
              className={`w-full flex ${
                serviceType.brandsService
                  ? `flex-row justify-center`
                  : `flex-col items-center justify-center`
              }`}
            >
              {/* Showing Selected Problems */}
              <div className="mb-2 max-sm:hidden">
                {serviceType.brandsService &&
                  serviceProblemsData.length > 0 && (
                    <div className="w-fit mt-2 px-4 py-1 max-h-[500px] overflow-y-auto scrollbar max-sm:text-sm max-sm:w-full">
                      <h2 className="font-semibold border-b mb-1">
                        Selected Problems
                      </h2>
                      {serviceProblemsData.map((sp, i) => (
                        <div key={i}>
                          <span>{sp.serviceProblem}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* FORM TO COLLECT DETAILS */}
              <div className="mx-auto w-1/2 border pb-5 max-sm:w-full">
                <div className="flex flex-col ">
                  <p className="py-2 text-center bg-secondary text-lg text-white">
                    Provide Details For Booking
                  </p>
                  {/* Sub Service - Product Image and Price Details */}
                  {serviceType.subService && (
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
                        <p className="text-[12px] font-[500] pl-2 leading-7 max-sm:text-xs">
                          {selectedService.name}
                        </p>

                        {/* Prod Desc */}
                        <p className="text-sm font-semibold text-start pl-2 max-sm:text-xs">
                          {selectedService.description}
                        </p>

                        {/* PRICING */}
                        <div className="flex mt-2 pl-2 py-1 items-center gap-1">
                          <p className="text-red-500 font-semibold text-lg">
                            ₹{prodPrice}
                          </p>
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

                  {/* Electronics / Brands Services Price Listing Modal */}
                  {serviceType.brandsService && (
                    <>
                      <div className="w-full p-2 flex items-center justify-around gap-2">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="text-sm max-sm:text-xs bg-green-600 text-white px-3 py-1 max-sm:px-2 rounded-full font-semibold"
                        >
                          See Prices
                        </button>

                        <span className="block text-sm max-sm:text-[10px]">
                          * Know the approx prices for the service
                        </span>
                      </div>
                      {isModalOpen && (
                        <PriceModal
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                        />
                      )}
                    </>
                  )}

                  {/* Date and Time Picker */}
                  <div className="mt-5 flex max-sm:flex-col justify-center items-center gap-2">
                    <p className="text-center text-lg max-md:text-sm">
                      Schedule a Date & Time
                    </p>
                    <DateAndTime
                      label={false}
                      showPreviousDate={false}
                      setSchedule={setSchedulePickUp}
                    />
                  </div>

                  {/* Electronic devices additional details */}
                  {serviceType.brandsService && (
                    <div className="mt-5 text-center text-lg max-sm:text-sm">
                      <p>
                        Enter Details about your{" "}
                        {selectedService?.serviceCategoryId?.name.split(" ")[0]}
                      </p>

                      <div className="flex flex-col gap-3 mt-5 pl-5 pr-2">
                        {/* DeviceNameModel Field */}
                        <DeviceInfo
                          label="Enter Name & Model"
                          deviceInfo="deviceNameModel"
                          required
                        >
                          <input
                            {...register("deviceNameModel")}
                            placeholder="Name & Model"
                            className="border-b"
                          />
                          {errors.deviceNameModel && (
                            <p className={ERROR_STYLE}>
                              {errors.deviceNameModel.message}
                            </p>
                          )}
                        </DeviceInfo>

                        {/* DeviceAdditionalInfo Field */}
                        <DeviceInfo
                          label="Add Addtional Info"
                          deviceInfo="deviceAdditionalInfo"
                        >
                          <input
                            {...register("deviceAdditionalInfo")}
                            placeholder="Add additional information"
                            className="border-b"
                          />
                        </DeviceInfo>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 text-center text-lg">
                    Your Contact Details
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 mt-5 pl-5 pr-2"
                  >
                    {/* Name Field */}
                    <div>
                      <input
                        {...register("name")}
                        placeholder="Full Name"
                        className="border-b w-full"
                      />
                      {errors.name && (
                        <p className={ERROR_STYLE}>{errors.name.message}</p>
                      )}
                    </div>
                    {/* Email Field */}
                    <div>
                      <input
                        {...register("email")}
                        placeholder="Email"
                        className="border-b w-full"
                      />
                      {errors.email && (
                        <p className={ERROR_STYLE}>{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      {/* Phone Field */}
                      <input
                        {...register("phone")}
                        placeholder="Mobile No"
                        className="border-b w-full"
                      />
                      {errors.phone && (
                        <p className={ERROR_STYLE}>{errors.phone.message}</p>
                      )}
                    </div>
                    {/* Address Field */}
                    <div>
                      <input
                        {...register("address")}
                        placeholder="Flat / Building / Street"
                        className="border-b w-full"
                      />
                      {errors.address && (
                        <p className={ERROR_STYLE}>{errors.address.message}</p>
                      )}
                    </div>
                    {/* Pincode Field */}
                    <div>
                      <input
                        {...register("pincode")}
                        placeholder="Enter Area PinCode here"
                        className="border-b w-full"
                      />
                      {errors.pincode && (
                        <p className={ERROR_STYLE}>{errors.pincode.message}</p>
                      )}
                    </div>

                    <div>
                      <InputSubmitBtn
                        loading={createServiceOrderLoading}
                        label="Book Now"
                      />
                    </div>
                  </form>
                </div>

                {/* Inspection charges */}
                <div className="w-full mt-5 text-center flex flex-col gap-2">
                  <InspectionCharges
                    serviceType={serviceType}
                    inspectionCharges={inspectionCharges}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <hr className="w-4/5 max-sm:w-[90%] mx-auto mt-20 mb-10" />
        <ServiceFAQs />
      </div>
      {/* <ServiceContent /> */}
    </>
  );
}

const DeviceInfo = ({ label, deviceInfo, required, children }) => {
  return (
    <div className="flex max-sm:flex-co items-center max-sm:items-start gap-4 max-sm:gap-2">
      <label htmlFor={deviceInfo} className="text-[15px]">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {children}
    </div>
  );
};

const InspectionCharges = ({ serviceType, inspectionCharges }) => {
  const { directService, brandsService, subService } = serviceType;

  if (!subService && !brandsService && !directService) return null; // Return early if no valid serviceType

  return (
    <>
      <h2 className="text-center bg-yellow-400 text-lg max-sm:text-sm">
        Rs.{inspectionCharges}{" "}
        {subService ? "Delivery" : "charges for inspection"} at your doorstep
      </h2>
      {directService && (
        <h3 className="bg-red-600 text-white w-fit mx-auto px-1 max-2sm:text-xs">
          <b>Note:</b> Final price will be provided after full inspection.
        </h3>
      )}
    </>
  );
};

// Old handleSubmit
{
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log(
  //   //   selectedDate,
  //   //   time,
  //   //   name,
  //   //   address,
  //   //   email,
  //   //   phone,
  //   //   pincode,
  //   //   deviceNameModel,
  //   //   deviceAdditionalInfo
  //   // );
  //   if (!schedulePickUp) {
  //     toast.warning("Kindly Select Schedule Date");
  //     return;
  //   }
  //   let formData = {
  //     selectedService: selectedService,
  //     customerName: name,
  //     email: email,
  //     phone: phone,
  //     address: address,
  //     pincode,
  //     // scheduleDate: selectedDate,
  //     scheduleDate: schedulePickUp,
  //     // scheduleTime: time,
  //     status: {
  //       pending: true,
  //       completed: false,
  //       cancelled: false,
  //     },
  //     inspectionCharges,
  //   };
  //   if (st === "b") {
  //     formData = {
  //       ...formData,
  //       serviceType: selectedService.serviceCategoryId.type,
  //       problems: serviceProblemsData,
  //       deviceInfo: {
  //         deviceNameModel: deviceNameModel,
  //         deviceAdditionalInfo: deviceAdditionalInfo,
  //       },
  //     };
  //   } else if (st === "ss") {
  //     formData = {
  //       ...formData,
  //       serviceType: selectedService.serviceCategoryId.type,
  //       price: prodPrice,
  //     };
  //   } else if (st === "ds") {
  //     formData = {
  //       ...formData,
  //       serviceType: selectedService.type,
  //     };
  //   }
  //   console.log("formdata", formData);
  //   try {
  //     // const response = await axios.post("/api/services", payload);
  //     const response = await createServiceOrder(formData);
  //     // console.log("Service Order created successfully:", response.data);
  //     if (response.data.success) {
  //       toast.success(
  //         "Service ordered successfully, kindly check your email for confirmation"
  //       );
  //       navigate(`/services`);
  //     }
  //   } catch (error) {
  //     console.error("Error creating service:", error);
  //     // Handle error (e.g., show an error message)
  //   }
  // };
}
