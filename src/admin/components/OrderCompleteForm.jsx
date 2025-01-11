import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { IoCartOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import OrderCancellationForm from "./OrderCancellationForm";
import { useOrderCancelMutation } from "../../features/api";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

const OrderCompleteForm = ({
  orderDetail,
  handleSubmit,
  fileInputRef1,
  setImageSelected1,
  fileInputRef2,
  setImageSelected2,
  fileInputRef3,
  setImageSelected3,
  fileInputRef4,
  setImageSelected4,
  setPickUpHandler,
  finalPriceHandler,
  selectedDate,
  handleTimeChange,
  deviceInfoHandler,
  orderReceivedLoading,
  //   DetailWrapper,
  //   DetailDiv,
}) => {
  const [orderCancel, { isLoading: orderCancelLoading }] =
    useOrderCancelMutation();

  const [cancelModal, setCancelModal] = useState(false);

  const [cancelReason, setCancelReason] = useState("");
  // console.log("cancelReason", cancelReason);

  // CALENDER
  const currentDate = new Date();

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  function handleReasonChange(e) {
    setCancelReason(e.target.value);
  }

  async function handleCancelOrder(e) {
    e.preventDefault();
    console.log("handleCancelOrder");
    try {
      if (!cancelReason) {
        toast.warning("Provide Reason for cancellation.");
        return;
      }

      const formData = {
        status: {
          pending: false,
          completed: false,
          cancelled: true,
        },
        cancelReason: cancelReason || null,
      };

      const orderCancelData = await orderCancel({
        orderId: orderDetail.id,
        data: formData,
      }).unwrap();
      console.log("orderCancelData", orderCancelData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="w-full my-5">
      <hr />
      <h2 className="text-center font-serif text-xl text-wrap max-sm:text-sm my-5">
        Fill the below required details for completing Order.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w max-sm:w-fit"
      >
        {/* Completion Detail */}
        <DetailWrapper icon={SiTicktick} heading="Completion Details">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Order Picked By"
              isRequired={true}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Order Picked By"
                  isRequired={true}
                  type={"text"}
                  name="pickedUpBy"
                  changeHandler={setPickUpHandler}
                />
              }
            />
            <DetailDiv
              label="Select Pickup Time"
              flexColSScr={true}
              text={
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleTimeChange}
                      showTimeSelect
                      timeFormat="h:mm aa" // 12 hours
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                      minDate={currentDate}
                      minTime={minTime}
                      maxTime={maxTime}
                      placeholderText="Select PickedUp Time"
                      className="border p-1 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <p className="text-xs max-sm:text-xs">
                      Picket Up time:{" "}
                      {!selectedDate && <span>Please select a time</span>}
                      {selectedDate?.toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      {selectedDate?.getDate()} {selectedDate?.getFullYear()}{" "}
                      {selectedDate?.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              }
            />
            <DetailDiv
              label="Purchase Price"
              isRequired={true}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Purchase Price"
                  isRequired={true}
                  type={"number"}
                  name="finalPrice"
                  changeHandler={finalPriceHandler}
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Device Info */}
        <DetailWrapper icon={BsInfoCircle} heading="Device Info">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Serial No"
              isRequired={false}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Serial No"
                  type={"text"}
                  name="serialNumber"
                  changeHandler={deviceInfoHandler}
                />
              }
            />
            <DetailDiv
              label="IMEI No"
              isRequired={false}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="IMEI No"
                  type={"text"}
                  name="imeiNumber"
                  changeHandler={deviceInfoHandler}
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Mandatory ID Proof Images */}
        <DetailWrapper icon={FaRegImages} heading="Required Documents">
          <div className="flex flex-col gap-5 max-sm:gap-3">
            <DetailDiv
              label="Upload Front of Customer ID"
              isRequired={true}
              flexColSScr={true}
              text={
                <UploadImage
                  fileRef={fileInputRef1}
                  imageHandler={(e) => {
                    setImageSelected1(e.target.files[0]);
                  }}
                />
              }
            />
            <DetailDiv
              label="Upload Back of Customer ID"
              isRequired={true}
              flexColSScr={true}
              text={
                <UploadImage
                  fileRef={fileInputRef2}
                  imageHandler={(e) => {
                    setImageSelected2(e.target.files[0]);
                  }}
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Upload Optional Images */}
        <DetailWrapper icon={FaRegImages} heading="Optional Images">
          <div className="flex flex-col gap-5 max-sm:gap-3">
            <DetailDiv
              label={`Upload Optional Image 1`}
              isRequired={false}
              flexColSScr={true}
              text={
                <UploadImage
                  fileRef={fileInputRef3}
                  imageHandler={(e) => {
                    setImageSelected3(e.target.files[0]);
                  }}
                />
              }
            />
            <DetailDiv
              label={`Upload Optional Image 2`}
              isRequired={false}
              flexColSScr={true}
              text={
                <UploadImage
                  fileRef={fileInputRef4}
                  imageHandler={(e) => {
                    setImageSelected4(e.target.files[0]);
                  }}
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Submit Order Completion */}
        <div className="w-fit mx-auto">
          <input
            type="submit"
            value={`${
              !orderReceivedLoading ? "Order Complete" : "Loading..."
            } `}
            className={` bg-green-600 hover:bg-green-700 cursor-pointer rounded px-2 py-1 w-fit text-white disabled:bg-gray-300`}
            disabled={orderReceivedLoading}
          />
        </div>

        {/* Cancel confirmation */}
        <div className="w-fit mx-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              setCancelModal(true);
            }}
            className={`bg-red-600 hover:bg-red-700 cursor-pointer rounded px-2 py-1 w-fit text-white disabled:bg-gray-300`}
          >
            Cancel Order
          </button>
        </div>
      </form>

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
    </div>
  );
};

export default OrderCompleteForm;

function UploadImage({ label, imageRef, required, imageHandler }) {
  return (
    <div className="flex items-center max-sm:items-start max-sm:flex-col gap-2 max-sm:gap-0">
      <label htmlFor="name" className="text-sm">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="file"
        name="name"
        ref={imageRef}
        placeholder=""
        className="cursor-pointer border rounded px-2 py-1 max-sm:w-[90%] text-[15px] max-sm:text-sm"
        onChange={imageHandler}
      />
    </div>
  );
}

function InputDiv({
  label,
  placeholder,
  isRequired,
  type,
  name,
  changeHandler,
}) {
  console.log(label, isRequired);
  return (
    <div className="flex items-center gap-1">
      <label htmlFor={name} className="text-lg flex max-sm:text-sm">
        <span>{label}</span>
        {/* {isRequired && <span className="text-red-600">* </span>} */}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border rounded p-1 text-sm"
        onChange={changeHandler}
        required={isRequired}
      />
    </div>
  );
}

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

function DetailDiv({ label, text, isRequired, flexColSScr }) {
  const style = {
    detailWrapper: `flex gap-1 items-center ${
      flexColSScr && "max-sm:flex-col max-sm:items-start"
    }`,
    detailLabel: "text-gray-500  text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm",
  };
  return (
    <div className={`${style.detailWrapper}`}>
      <span className={`${style.detailLabel}`}>
        {label}: {isRequired && <span className="text-red-600">* </span>}
      </span>
      <span className={`${style.detailText}`}>{text}</span>
    </div>
  );
}

// All Images
{
  //   <div className="flex max-sm:flex-col gap-10 w-full">
  //     {/* Required Images */}
  //     <div className="flex flex-col gap-2">
  //       <p className="text-lg max-sm:text-sm">
  //         <span>Required Documents</span>
  //         <span className="text-red-600">*</span>
  //       </p>
  //       <div className="grid grid-cols-1 max-sm:grid-cols-1 place-items-center gap-5">
  //         {/* ID Front Image */}
  //         <UploadImage
  //           label="Upload Front of Customer ID"
  //           required={true}
  //           fileRef={fileInputRef1}
  //           imageHandler={(e) => {
  //             setImageSelected1(e.target.files[0]);
  //           }}
  //         />
  //         {/* ID Back Image */}
  //         <UploadImage
  //           label="Upload Back of Customer ID"
  //           required={true}
  //           fileRef={fileInputRef2}
  //           imageHandler={(e) => {
  //             setImageSelected2(e.target.files[0]);
  //           }}
  //         />
  //       </div>
  //     </div>
  //     {/* Optional Images */}
  //     <div className="flex flex-col gap-2">
  //       <p className="text-lg max-sm:text-sm">Optional Images</p>
  //       <div className="grid grid-cols-1 max-sm:grid-cols-1 place-items-center gap-5">
  //         {/* ID Front Image */}
  //         <UploadImage
  //           label="Upload Optional Image 1"
  //           required={false}
  //           fileRef={fileInputRef3}
  //           imageHandler={(e) => {
  //             setImageSelected3(e.target.files[0]);
  //           }}
  //         />
  //         {/* ID Back Image */}
  //         <UploadImage
  //           label="Upload Optional Image 2"
  //           required={false}
  //           fileRef={fileInputRef4}
  //           imageHandler={(e) => {
  //             setImageSelected4(e.target.files[0]);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>;
}

// Other details
{
  //   <div className="flex flex-col gap-1 w-full">
  //     {/* Order Picked Up By: */}
  //     <div className="grid grid-cols-2 w-full max-sm:grid-cols-1 place-items-start mx- gap-5 max-sm:gap-3 mt-5">
  //       {/* Pickup details */}
  //       <InputDiv
  //         label="Order Picked By"
  //         isRequired={true}
  //         type={"text"}
  //         name="pickedUpBy"
  //         changeHandler={setPickUpHandler}
  //       />
  //       {/* Date Picker */}
  //       {/* <div className="relative max-sm:flex mb-3"> */}
  //       <div className="relative flex flex-col items-start">
  //         <div className="flex items-center">
  //           <label htmlFor="datepicker" className="text-lg max-sm:text-sm">
  //             <span>Select Pickup Time</span>
  //             <span className="text-red-600">*</span>{" "}
  //           </label>
  //           <DatePicker
  //             selected={selectedDate}
  //             onChange={handleTimeChange}
  //             showTimeSelect
  //             timeFormat="h:mm aa" // 12 hours
  //             timeIntervals={30}
  //             dateFormat="MMMM d, yyyy h:mm aa"
  //             timeCaption="Time"
  //             minDate={currentDate}
  //             minTime={minTime}
  //             maxTime={maxTime}
  //             placeholderText="Select PickedUp Time"
  //             className="border p-1 rounded text-sm"
  //             required
  //           />
  //         </div>
  //         {/* {selectedDate && ( */}
  //         {/* <p className="absolute top-5 py-2 text-lg max-sm:text-sm"> */}
  //         <div>
  //           <p className="text-sm max-sm:text-xs">
  //             {/* Picket Up time: {selectedDate} */}
  //             Picket Up time: {!selectedDate && <span>Please select a time</span>}
  //             {selectedDate?.toLocaleString("en-US", {
  //               month: "long",
  //             })}{" "}
  //             {selectedDate?.getDate()}, {selectedDate?.getFullYear()}{" "}
  //             {selectedDate?.toLocaleTimeString("en-US", {
  //               hour: "numeric",
  //               minute: "numeric",
  //               hour12: true,
  //             })}
  //           </p>
  //         </div>
  //         {/* )} */}
  //       </div>
  //       <div>
  //         <span>Offered Price </span>
  //         <b>{orderDetail.offerPrice}</b>
  //       </div>
  //       {/* Purchase Price */}
  //       <InputDiv
  //         label="Purchase Price"
  //         isRequired={true}
  //         type={"number"}
  //         name="finalPrice"
  //         changeHandler={finalPriceHandler}
  //       />
  //       <InputDiv
  //         label="Serial No"
  //         isRequired={false}
  //         type={"text"}
  //         name="serialNumber"
  //         changeHandler={deviceInfoHandler}
  //       />
  //       <InputDiv
  //         label="IMEI No"
  //         isRequired={false}
  //         type={"text"}
  //         name="imeiNumber"
  //         changeHandler={deviceInfoHandler}
  //       />
  //     </div>
  //   </div>;
}
