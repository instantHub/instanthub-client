import React, { useState } from "react";
import {
  useDeleteServiceOrderMutation,
  useGetServiceOrderQuery,
} from "../../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { orderCurrentStatus } from "../../helpers/helper";
import { IoCartOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { MdCancel, MdDeleteForever, MdOutlineDevices } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsBoxSeam } from "react-icons/bs";
import ConfirmationModal from "../../components/ConfirmationModal";
import ServiceCompletionForm from "./ServiceCompletionForm";

const ServiceOrderDetail = () => {
  const { serviceOrderId } = useParams();

  const navigate = useNavigate();

  const { data: serviceOrderDetail, isLoading: serviceOrderDetailLoading } =
    useGetServiceOrderQuery(serviceOrderId);
  console.log("serviceOrderDetail", serviceOrderDetail);

  // Delete Order
  const [deleteServiceOrder] = useDeleteServiceOrderMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const [cancelModal, setCancelModal] = useState(false);

  const handleDelete = async (serviceOrderId) => {
    console.log("handleDelete serviceOrderId", serviceOrderId);
    try {
      const deletedService = await deleteServiceOrder(serviceOrderId);
      navigate("/admin/services-Orders");
    } catch (error) {
      toast.error("Service Order couldn't be deleted..!!");
    }
  };

  const getServiceName = () => {
    if (serviceOrderDetail.serviceType === "DirectService")
      return serviceOrderDetail.selectedService.name;
    else return serviceOrderDetail.selectedService.serviceCategoryId.name;
  };

  if (serviceOrderDetailLoading) return <Loading />;

  return (
    <div className="relative flex flex-col bg-secondary-light pt-2 pb-5 h-fit shadow-md justify-center items-center w-full">
      {/* Back and Delete */}
      <div className="relative flex justify-between w-full px-4">
        <button
          onClick={() => {
            navigate("/admin/services-orders");
          }}
          className="text-3xl max-sm:text-xl bg-secondary text-secondary-light rounded"
        >
          <TiArrowBackOutline />
        </button>
        <button
          onClick={() => {
            setModalOpen(true);
            setOrderToDelete(serviceOrderDetail.id);
          }}
          className="text-3xl max-sm:text-xl bg-red-600 text-secondary-light rounded"
        >
          <MdDeleteForever />
        </button>
      </div>

      {/* Order Detail */}
      <div className="flex flex-col bg-white justify-center border rounded-xl items-center w-[95%]">
        {/* <div className="my-10 grid grid-cols-2 max-sm:grid-cols-1 w-full"> */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w-5/6 max-sm:w-fit">
          {/* Order Info */}
          <DetailWrapper icon={IoCartOutline} heading="Service Order Details">
            <DetailDiv
              label={`Service Order ID`}
              text={serviceOrderDetail?.serviceOrderId}
            />
            <DetailDiv
              label={`Inspection Charges`}
              text={serviceOrderDetail?.inspectionCharges}
            />
            <DetailDiv
              label={`Scheduled Date`}
              text={serviceOrderDetail?.scheduleDate || "Not Selected"}
            />
            <DetailDiv
              label={`Status`}
              text={orderCurrentStatus(serviceOrderDetail.status)}
            />
          </DetailWrapper>

          {/* Product Detail */}
          <DetailWrapper icon={MdOutlineDevices} heading="Service Details">
            <DetailDiv label={`Service Name`} text={getServiceName()} />
            {serviceOrderDetail.serviceType === "Brand" && (
              <div className="flex flex-col">
                <DetailDiv
                  label={`Selected Brand`}
                  text={serviceOrderDetail?.selectedService?.name}
                />
                <DetailDiv
                  label={`Device Model`}
                  text={
                    serviceOrderDetail?.deviceInfo?.deviceNameModel ||
                    "Not Available"
                  }
                />
                <DetailDiv
                  label={`Device Additional Info`}
                  text={
                    serviceOrderDetail?.deviceInfo?.deviceAdditionalInfo ||
                    "Not Available"
                  }
                />
              </div>
            )}
          </DetailWrapper>

          {/* Problems for Brand Services */}
          {serviceOrderDetail.serviceType === "Brand" && (
            <DetailWrapper icon={BsBoxSeam} heading="Problems">
              {serviceOrderDetail?.problems?.map((problem, i) => (
                <DetailDiv label={"Problem"} text={problem.serviceProblem} />
              ))}
            </DetailWrapper>
          )}

          {/* Customer Details */}
          <DetailWrapper icon={RiContactsLine} heading="Customer Details">
            <DetailDiv label={`Name`} text={serviceOrderDetail?.customerName} />
            <DetailDiv label={`Phone`} text={serviceOrderDetail?.phone} />
            <DetailDiv label={`Email`} text={serviceOrderDetail?.email} />
          </DetailWrapper>

          {/* Address Detail*/}
          <DetailWrapper icon={FaMapLocationDot} heading="Address Details">
            <DetailDiv label={`Address`} text={serviceOrderDetail?.address} />
          </DetailWrapper>

          {/* Completed Order Details */}
          {serviceOrderDetail.status.completed && (
            <>
              {/* Completion Detail*/}
              <DetailWrapper icon={SiTicktick} heading="Completion Details">
                <DetailDiv
                  label={`Agent Name`}
                  text={serviceOrderDetail?.serviceAgent}
                />
                <DetailDiv
                  label={`Service Completed On`}
                  text={serviceOrderDetail?.serviceCompletedOn}
                />

                <DetailDiv
                  label={`Service Final Price`}
                  text={serviceOrderDetail?.serviceFinalPrice}
                />
                {serviceOrderDetail.serviceType === "Brand" &&
                  serviceOrderDetail?.additionalServices?.map((addService) => (
                    
                    <>
                      <p>Addtional Services Provided</p>
                      <DetailDiv
                        label="Service & Price"
                        text={`${addService.name} - ${addService.price} /-`}
                      />
                    </>
                  ))}
              </DetailWrapper>
            </>
          )}

          {/* Cancelled Order Reason */}
          {serviceOrderDetail.status.cancelled && (
            <DetailWrapper icon={MdCancel} heading="Cancellation Details">
              <DetailDiv
                label={`Cancel Reason`}
                text={serviceOrderDetail?.cancelReason}
              />
            </DetailWrapper>
          )}
        </div>

        {/* Form handler */}
        {serviceOrderDetail.status.pending && (
          <div>
            {/* Service Complete Form */}
            <ServiceCompletionForm
              serviceOrderDetail={serviceOrderDetail}
              serviceOrderId={serviceOrderId}
              DetailWrapper={DetailWrapper}
              DetailDiv={DetailDiv}
              setCancelModal={setCancelModal}
            />
          </div>
        )}
      </div>

      {cancelModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="relative bg-white p-6 max-sm:p-4 w-fit max-md:w-[90%] rounded-lg">
            <OrderCancellationForm
              cancelHandler={handleCancelOrder}
              handleReasonChange={handleReasonChange}
            />

            <button
              onClick={() => setCancelModal(false)}
              className="absolute top-0 right-0 px-2 py-1 text-sm bg-red-600 text-white rounded"
            >
              {/* <IoMdCloseCircleOutline /> */} close
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={orderToDelete}
        title="Confirm Deletion"
        detail={`You are about to delete Service Order: ${serviceOrderDetail.serviceOrderId}`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ServiceOrderDetail;

function DetailWrapper({ icon: Icon, heading, children }) {
  const style = {
    detailDiv: "flex items-start gap-2",
    detailIcon:
      "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
    detailHeading: "text-2xl font-serif text-start max-sm:text-lg",
    detailSubDiv: "flex flex-col",
  };

  return (
    <div className={style.detailDiv}>
      <div className={style.detailIcon}>
        <Icon />
      </div>
      <div className={style.detailSubDiv}>
        <p className={style.detailHeading}>{heading}</p>
        <div className={style.detailSubDiv}>{children}</div>
      </div>
    </div>
  );
}

function DetailDiv({ label, text }) {
  const wideContent = label === "Address" || label === "Cancel Reason";
  const style = {
    detailWrapper: `flex  ${
      wideContent ? "items-start" : "items-center"
    } gap-1`,
    detailLabel: "text-gray-500 text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm text-wrap max-sm:max-w-[200px]",
  };
  return (
    <div className={`${style.detailWrapper}`}>
      <span className={`${style.detailLabel}`}>{label}:</span>
      <span className={`${style.detailText}`}>{text}</span>
    </div>
  );
}

// import React, { useRef, useState } from "react";
// import {
//   useGetServiceOrderQuery,
//   useServiceOrderCompleteMutation,
//   useCancelServiceOrderMutation,
// } from "../../../features/api";
// import { useNavigate, useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import Loading from "../../../components/Loading";

// const ServiceOrderDetail = () => {
//   const { serviceOrderId } = useParams();

//   const navigate = useNavigate();

//   const { data: serviceOrderDetail, isLoading: serviceOrderDetailLoading } =
//     useGetServiceOrderQuery(serviceOrderId);
//   console.log("serviceOrderDetail", serviceOrderDetail);

//   const [cancelServiceOrder, { isLoading: cancelServiceOrderLoading }] =
//     useCancelServiceOrderMutation();

//   const [cancelReason, setCancelReason] = useState("");
//   console.log("cancelReason", cancelReason);

//   const [serviceOrderComplete, { isLoading: orderCompleteLoading }] =
//     useServiceOrderCompleteMutation();

//   const [serviceFinalPrice, setServiceFinalPrice] = useState("");
//   const [serviceAgent, setServiceAgent] = useState("");

//   const [serviceCompletedOn, setServiceCompletedOn] = useState();

//   // Additional Services Done
//   const [additionalServices, setAdditionalServices] = useState([
//     { name: "", price: 0 },
//   ]);

//   console.log("additionalServices", additionalServices);

//   // Handler to add a new service entry
//   const addService = (e) => {
//     e.preventDefault();
//     setAdditionalServices([...additionalServices, { name: "", price: "" }]);
//   };

//   // Handler to remove a service entry
//   const removeService = (index) => {
//     const newServices = additionalServices.filter((_, i) => i !== index);
//     setAdditionalServices(newServices);
//   };

//   // Handler to update service details
//   const handleServiceChange = (index, field, value) => {
//     const newServices = [...additionalServices];
//     newServices[index][field] = value;
//     setAdditionalServices(newServices);
//   };

//   // CALENDER
//   const [selectedDate, setSelectedDate] = useState(null);
//   const currentDate = new Date();

//   // Set the minimum time to 10:00 AM
//   const minTime = new Date();
//   minTime.setHours(10, 0, 0, 0);

//   // Set the maximum time to 10:00 PM
//   const maxTime = new Date();
//   maxTime.setHours(22, 0, 0, 0);

//   const handleTimeChange = (date) => {
//     setSelectedDate(date);

//     const formattedDate = `${date.toLocaleString("en-US", {
//       month: "long",
//     })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
//       "en-US",
//       { hour: "numeric", minute: "numeric", hour12: true }
//     )}`;
//     // console.log("formattedDate", formattedDate);
//     setServiceCompletedOn(formattedDate);
//   };

//   async function handleCancelOrder(e) {
//     e.preventDefault();
//     console.log("handleCancelOrder");
//     try {
//       const formData = {
//         status: {
//           pending: false,
//           completed: false,
//           cancelled: true,
//         },
//         cancelReason: cancelReason || null,
//       };
//       console.log(formData);

//       const orderCancelData = await cancelServiceOrder({
//         serviceOrderId,
//         data: formData,
//       }).unwrap();
//       console.log("orderCancelData", orderCancelData);
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("handleSubmit");
//     console.log("serviceOrderDetail", serviceOrderDetail);
//     console.log(
//       serviceFinalPrice,
//       serviceAgent,
//       serviceCompletedOn,
//       additionalServices
//     );

//     let formData = {
//       //   serviceOrderId: serviceOrderDetail.id,
//       serviceFinalPrice,
//       serviceAgent,
//       serviceCompletedOn,
//       // additionalServices,
//       status: {
//         pending: false,
//         completed: true,
//         cancelled: false,
//       },
//     };

//     if (serviceOrderDetail.serviceType.toLowerCase().includes("brand")) {
//       // let blankService = additionalServices.find((as) => as.name.length <= 0);
//       let blankService = additionalServices[0].name.length <= 0;
//       if (!blankService) {
//         formData.additionalServices = additionalServices;
//       }
//     }

//     console.log("formData from handleSubmit", formData);

//     try {
//       const serviceOrderCompleted = await serviceOrderComplete({
//         serviceOrderId: serviceOrderDetail.id,
//         data: formData,
//       }).unwrap();
//       console.log("serviceOrderCompleted", serviceOrderCompleted);
//       setServiceFinalPrice("");
//       setServiceAgent("");
//       setServiceCompletedOn("");
//       setSelectedDate();
//       setAdditionalServices[{ name: "", price: 0 }];
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   };

//   const orderCurrentStatus = (status) => {
//     if (status.pending) return "Pending";
//     if (status.completed) return "Completed";
//     if (status.cancelled) return "Cancelled";
//     return "Unknown";
//   };

//   const heading = "px-4 py-2 flex items-center gap-2";
//   const innerHeading = "flex items-center gap-2";
//   const subHeading = "text-sm max-sm:text-xs";
//   const detailImp = "text-lg max-sm:text-sm";
//   const detail = "text-sm max-sm:text-xs";

//   if (serviceOrderDetailLoading) return <Loading />;

//   return (
//     <div className="flex flex-col justify-center items-center w-full py-10">
//       {/* Order Detail */}
//       <div className="">
//         {/* Back Button */}
//         {/* large screen */}
//         <button
//           onClick={() => {
//             navigate("/admin/services-orders");
//           }}
//           className="max-sm:hidden absolute w-fit top-[7%] left-5 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
//         >
//           Back
//         </button>
//         {/* small screen */}
//         <button
//           onClick={() => {
//             navigate("/admin/services-orders");
//           }}
//           className="lg:hidden absolute w-fit top-[7%] right-0 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
//         >
//           Back
//         </button>

//         {/* Order ID */}
//         <div className={`${heading}`}>
//           <span className={`${subHeading}`}>Service Order ID:</span>
//           <span className={`${detailImp}`}>
//             {serviceOrderDetail?.serviceOrderId}
//           </span>
//         </div>

//         {/* Service Requested */}
//         <div className={`${heading}`}>
//           <span className={`${subHeading}`}>Service Requested: </span>
//           <span className={`${detailImp}`}>
//             {serviceOrderDetail.serviceType === "Brand" ? (
//               <span>
//                 {serviceOrderDetail?.selectedService?.serviceCategoryId?.name}
//               </span>
//             ) : (
//               <span>{serviceOrderDetail?.selectedService?.name}</span>
//             )}
//           </span>
//         </div>

//         {/* Brand Type Service Details */}
//         {serviceOrderDetail.serviceType === "Brand" && (
//           <>
//             <div className={`${heading}`}>
//               <span className={`${subHeading}`}>Service for: </span>
//               <span className={`${detailImp}`}>
//                 {serviceOrderDetail?.selectedService?.name}
//               </span>
//             </div>
//             {/* Problems */}
//             <div className={`${heading} flex flex-col py-2`}>
//               <span className={`${subHeading}`}>Problems: </span>

//               {serviceOrderDetail.problems.length > 0 ? (
//                 serviceOrderDetail.problems.map((p, i) => (
//                   <span key={i} className={`${detailImp}`}>
//                     {p.serviceProblem}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-red-500">-</p>
//               )}
//             </div>
//           </>
//         )}

//         {/* Device Info */}
//         {serviceOrderDetail.serviceType === "Brand" && (
//           <div className={`${heading} max-sm:flex-col max-sm:items-start`}>
//             <span className={`${subHeading}`}>Device Name / Model:</span>
//             <span className={`${detailImp}`}>
//               {serviceOrderDetail?.deviceInfo.deviceNameModel}
//             </span>
//             <span className={`${subHeading}`}>Additional Info:</span>
//             <span className={`${detailImp}`}>
//               {serviceOrderDetail?.deviceInfo.deviceAdditionalInfo}
//             </span>
//           </div>
//         )}

//         {/* Order Status */}
//         <div className={`${heading}`}>
//           <span className={`${subHeading}`}>Order Status:</span>
//           <span className={`${detailImp}`}>
//             {orderCurrentStatus(serviceOrderDetail?.status)}
//           </span>
//         </div>

//         {/* Customer Details */}
//         <div className="px-4 py-2 flex flex-col">
//           <p className="text-lg max-sm:text-sm">Customer Detail:</p>

//           <div className="flex flex-col">
//             <div className="text-xs">
//               <span className={`${subHeading}`}>Customer Name: </span>
//               <span className={`${detail}`}>
//                 {serviceOrderDetail?.customerName}
//               </span>
//             </div>
//             <div className="text-xs">
//               <span className={`${subHeading}`}>Phone: </span>
//               <span className={`${detail}`}>{serviceOrderDetail?.phone}</span>
//             </div>
//             <div className="text-xs">
//               <span className={`${subHeading}`}>Email: </span>
//               <span className={`${detail}`}>{serviceOrderDetail?.email}</span>
//             </div>
//           </div>
//         </div>

//         {/* Address Detail*/}
//         <div className=" px-4 py-2">
//           <p className="text-lg max-sm:text-sm">Address Detail:</p>

//           <div className="flex flex-col">
//             <div className="text-xs opacity-70">
//               <span className={`${subHeading}`}>Address: </span>
//               <span className={`${detail} text-sm`}>
//                 {serviceOrderDetail?.address}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Schedule Time: */}
//         <div className={`${heading}`}>
//           <span className={`${subHeading}`}>Schedule Date:</span>
//           <span className={`${detailImp}`}>
//             {serviceOrderDetail?.scheduleDate}
//           </span>
//         </div>

//         {/* Inspection Charges */}
//         <div className={`${heading}`}>
//           <span className={`${subHeading}`}>Inspection Charges: </span>
//           <span className={`${detailImp}`}>
//             {serviceOrderDetail?.inspectionCharges}
//           </span>
//         </div>

//         <hr />

//         {/* Completed Order Details Only */}
//         {serviceOrderDetail.status.completed && (
//           <>
//             {/* <div>Order Completed</div> */}
//             <div className={`${heading}`}>
//               <span className={`${subHeading}`}>Service Agent: </span>
//               <span className={`${detailImp}`}>
//                 {serviceOrderDetail?.serviceAgent}
//               </span>
//             </div>

//             <div className={`${heading}`}>
//               <span className={`${subHeading}`}>Service Completed On: </span>
//               <span className={`${detailImp}`}>
//                 {serviceOrderDetail?.serviceCompletedOn}
//               </span>
//             </div>

//             {/* Final Price */}
//             <div className={`${heading}`}>
//               <span className={`${subHeading}`}>Service Final Price: </span>
//               <span className={`${detailImp}`}>
//                 {serviceOrderDetail.serviceFinalPrice}
//               </span>
//             </div>

//             {/* Additional SERVICES Provided */}
//             {serviceOrderDetail.serviceType.toLowerCase().includes("brand") &&
//               serviceOrderDetail.additionalServices.length > 0 && (
//                 <div className="border rounded  mx-10 max-sm:mx-5 w-fit">
//                   <p className="text-center bg-gray-300">
//                     Additional Service Provided
//                   </p>

//                   {/* <div className="p-2 rounded flex flex-col items-start text-lg"> */}
//                   <div className="p-2 text-lg">
//                     {serviceOrderDetail.additionalServices.map((s, i) => (
//                       //   <div className="flex items-center justify-evenly gap-5">
//                       <div className="grid grid-cols-2 gap-5 max-sm:gap-2">
//                         <div>
//                           <span key={i} className={`${subHeading}`}>
//                             Service Name:{" "}
//                           </span>
//                           <span className={`${detail}`}>{s.name}</span>
//                         </div>
//                         <div>
//                           <span key={i} className={`${subHeading}`}>
//                             Service Price:{" "}
//                           </span>
//                           <span className={`${detail}`}>{s.price}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//             {/* Sub Services */}
//             {serviceOrderDetail.serviceType === "ServiceSubCategory" && (
//               <>
//                 <tr className="border-b">
//                   <th className="text-left bg-gray-300 w-[30%] px-5">
//                     Selected{" "}
//                     {serviceOrderDetail.selectedService.serviceCategoryId.name}
//                   </th>
//                   <td className="p-2 border text-lg font-semibold">
//                     {serviceOrderDetail.selectedService.name}
//                   </td>
//                 </tr>
//                 <tr className="border-b">
//                   <th className="text-left bg-gray-300 w-[30%] px-5">
//                     {serviceOrderDetail.selectedService.serviceCategoryId.name}{" "}
//                     Price
//                   </th>
//                   <td className="p-2 border text-lg font-semibold">
//                     {serviceOrderDetail.price}
//                   </td>
//                 </tr>
//               </>
//             )}
//           </>
//         )}

//         {/* Cancelled Order Reason */}
//         {serviceOrderDetail.status.cancelled && (
//           <div className={`${heading}`}>
//             <span className={`${subHeading}`}>Cancel Reason: </span>
//             <span className={`${detailImp} text-wrap`}>
//               {serviceOrderDetail.cancelReason}
//             </span>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Form handler */}
//       <div className="text-center">
//         {/* {serviceOrderDetail && ( */}
//         {serviceOrderDetail.status.pending && (
//           <>
//             {/* Service Order Completed Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col gap-4 text-sm my-10"
//             >
//               <div className="bg-white p-10 ">
//                 <h2 className="text-xl max-sm:text-sm font-semibold mb-4 text-center">
//                   Mark Service Completed.
//                 </h2>

//                 <div className="grid grid-cols-2 max-sm:grid-cols-1 place-content-start place-items-start mx-auto items-center gap-4 mt-5">
//                   <div className="grid grid-cols-2 gap-1 place-items-start">
//                     <label htmlFor="">Serviced By:</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={serviceAgent}
//                       onChange={(e) => setServiceAgent(e.target.value)}
//                       className="border px-2"
//                       placeholder="Agent Name"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-1 place-items-start">
//                     <label htmlFor="">Service Final Price:</label>
//                     <input
//                       type="number"
//                       value={serviceFinalPrice}
//                       onChange={(e) => setServiceFinalPrice(e.target.value)}
//                       className="border px-2"
//                       placeholder="Enter Service Price"
//                       required
//                     />
//                   </div>

//                   {/* Date Picker */}
//                   <div className="">
//                     <div className="grid grid-cols-2 gap-1 place-items-start">
//                       <label htmlFor="datepicker">
//                         Completed On:
//                         <span className="text-red-600">* </span>
//                       </label>
//                       <DatePicker
//                         selected={selectedDate}
//                         // selected={schedulePickUpDate}
//                         onChange={handleTimeChange}
//                         showTimeSelect
//                         // timeFormat="HH:mm" // 24 hours
//                         timeFormat="h:mm aa" // 12 hours
//                         timeIntervals={30}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         timeCaption="Time"
//                         // minDate={schedulePickUpDate}
//                         minDate={currentDate}
//                         minTime={minTime}
//                         maxTime={maxTime}
//                         placeholderText="Select PickedUp Time"
//                         className="border px-1 rounded"
//                         required
//                       />
//                     </div>

//                     {/* {schedulePickUpDate && ( */}
//                     <p className="py-2 text-xl">{serviceCompletedOn}</p>
//                     {/* )} */}
//                   </div>

//                   {/* Additional Service */}
//                   {serviceOrderDetail.serviceType === "Brand" && (
//                     <div className="flex flex-col gap-2">
//                       <p className="mx-auto border-b">
//                         Additional Service Details
//                       </p>
//                       {additionalServices.map((service, index) => (
//                         <div
//                           key={index}
//                           // className="grid grid-cols-3 w-full items-center gap-4"
//                           className="flex w-full items-center gap-4"
//                         >
//                           <div className="grid grid-cols-2 items-center">
//                             <label htmlFor="">Service Name</label>
//                             <input
//                               type="text"
//                               className="border px-2"
//                               placeholder="Service Name"
//                               value={service.name}
//                               onChange={(e) =>
//                                 handleServiceChange(
//                                   index,
//                                   "name",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>
//                           <div className="grid grid-cols-2 items-center">
//                             <label htmlFor="">Service Price</label>
//                             <input
//                               type="number"
//                               className="border px-2"
//                               placeholder="Service Price"
//                               value={service.price}
//                               onChange={(e) =>
//                                 handleServiceChange(
//                                   index,
//                                   "price",
//                                   e.target.value
//                                 )
//                               }
//                               required
//                             />
//                           </div>
//                           {index === additionalServices.length - 1 && (
//                             <div>
//                               <button
//                                 className="px-2 py-1 bg-red-500 rounded text-white"
//                                 onClick={() => removeService(index)}
//                               >
//                                 X
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                       <div>
//                         <button
//                           className="px-2 py-1 bg-blue-500 rounded text-white"
//                           onClick={addService}
//                         >
//                           Add
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-2 gap-1 place-items-start">
//                     <label htmlFor="">Status</label>
//                     <input type="text" placeholder="Completed" disabled />
//                   </div>
//                 </div>

//                 <button className="bg-green-600 text-white px-4 py-1 rounded mt-5">
//                   Completed
//                 </button>
//               </div>
//             </form>

//             {/* Order Cancel Form */}
//             <div className="text-sm max-sm:text-xs py-1 text-center">
//               Provide Mandatory Reason If You Are Cancelling the Order.
//             </div>
//             <form
//               onSubmit={handleCancelOrder}
//               className="flex justify-center max-sm:flex-col items-center gap-4 pb-10 "
//             >
//               <div className="flex items-center gap-1 text-[16px] max-sm:text-sm">
//                 <label htmlFor="reason">
//                   <span>Reason:</span>
//                   <span className="text-red-600">*</span>
//                 </label>

//                 <textarea
//                   type="textarea"
//                   name="reason"
//                   placeholder="Reason for cancellation"
//                   className="px-2 py-1 text-sm max-sm:text-xs h-[100px] w-[300px] max-sm:w-[250px] border rounded"
//                   onChange={(e) => {
//                     setCancelReason(e.target.value);
//                   }}
//                   required
//                 />
//               </div>
//               <div className="text-[16px] max-sm:text-sm">
//                 <input
//                   type="submit"
//                   value="Cancel Order"
//                   className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
//                 />
//               </div>
//             </form>
//           </>
//         )}

//         {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"> */}
//       </div>
//     </div>
//   );
// };

// export default ServiceOrderDetail;
