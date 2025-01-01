import React, { useRef, useState } from "react";
import {
  useGetRecycleOrderQuery,
  useRecycleOrderCompleteMutation,
  useUploadCustomerProofImageMutation,
  useRecycleOrderCancelMutation,
} from "../../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loading from "../../../components/Loading";

const RecycleOrderDetail = () => {
  const { recycleOrderId } = useParams();

  const navigate = useNavigate();

  const { data: recycleOrderDetail, isLoading: recycleOrderDetailLoading } =
    useGetRecycleOrderQuery(recycleOrderId);
  console.log("recycleOrderDetail", recycleOrderDetail);

  const [recycleOrderCancel, { isLoading: recycleOrderCancelLoading }] =
    useRecycleOrderCancelMutation();

  const [cancelReason, setCancelReason] = useState("");
  console.log("cancelReason", cancelReason);

  const [uploadCustomerProof] = useUploadCustomerProofImageMutation();
  const [recycleOrderCompleted, { isLoading: recycleOrderCompletedLoading }] =
    useRecycleOrderCompleteMutation();

  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [deviceInfo, setDeviceInfo] = useState();
  //   console.log("deviceInfo", deviceInfo);

  // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  //   console.log("pickedUpBy", pickedUpBy);

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const uploadFileHandler = async (image) => {
    const formData = new FormData();
    if (image === "front") {
      formData.append("image", imageSelected1);
    } else if (image === "back") {
      formData.append("image", imageSelected2);
    } else if (image === "optional1") {
      formData.append("image", imageSelected3);
    } else if (image === "optional2") {
      formData.append("image", imageSelected4);
    }
    // formData.append("image", imageSelected1);

    try {
      const res = await uploadCustomerProof(formData).unwrap();
      console.log("res.image", res.image);

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image upload handler call
    // const imageURL = await uploadFileHandler();
    const imageURL1 = await uploadFileHandler("front");
    const imageURL2 = await uploadFileHandler("back");

    let imageURL3, imageURL4;
    if (imageSelected3) {
      imageURL3 = await uploadFileHandler("optional1");
      console.log("imageURL3", imageURL3);
    }
    if (imageSelected4) {
      imageURL4 = await uploadFileHandler("optional2");
      console.log("imageURL4", imageURL4);
    }

    console.log("handlesubmit ", imageURL1, imageURL2);

    const formattedDate = {
      agentName: pickedUpBy,
      pickedUpDate: `${selectedDate.toLocaleString("en-US", {
        month: "long",
      })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`,
    };

    const formData = {
      // recycleOrderId: recycleOrderDetail.id,
      customerProofFront: imageURL1,
      customerProofBack: imageURL2,
      customerOptional1: imageURL3 ? imageURL3 : null,
      customerOptional2: imageURL4 ? imageURL4 : null,
      pickedUpDetails: formattedDate,
      deviceInfo,
      finalPrice,
      status: {
        pending: false,
        completed: true,
        cancelled: false,
      },
    };

    console.log("formData from OrderList handleSubmit", formData);

    try {
      const orderData = await recycleOrderCompleted({
        recycleOrderId,
        data: formData,
      }).unwrap();

      console.log("orderData", orderData);

      setIsOpen(false);

      // Clear the value of the file input
      fileInputRef1.current.value = "";
      fileInputRef2.current.value = "";
      fileInputRef3.current.value = "";
      fileInputRef4.current.value = "";
      // Mark the file input as required again
      fileInputRef1.current.required = true;
      fileInputRef2.current.required = true;
      setPickedUpBy("");
      setFinalPrice("");
      setDeviceInfo();
      setSelectedDate();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  async function handleCancelOrder(e) {
    e.preventDefault();
    console.log("handleCancelOrder");
    try {
      const formData = {
        status: {
          pending: false,
          completed: false,
          cancelled: true,
        },
        cancelReason: cancelReason || null,
      };

      const orderCancelData = await recycleOrderCancel({
        recycleOrderId,
        data: formData,
      }).unwrap();
      console.log("orderCancelData", orderCancelData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const orderCurrentStatus = (status) => {
    if (status.pending) return "Pending";
    if (status.completed) return "Completed";
    if (status.cancelled) return "Cancelled";
    return "Unknown";
  };

  const heading = "px-4 py-2 flex items-center gap-2";
  const innerHeading = "flex items-center gap-2";
  const subHeading = "text-sm max-sm:text-xs";
  const detailImp = "text-lg max-sm:text-sm";
  const detail = "text-sm max-sm:text-xs";

  if (recycleOrderDetailLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Order Detail */}
      <div className="">
        {/* Back Button */}
        {/* large screen */}
        <button
          onClick={() => {
            navigate("/admin/recycle-orders");
          }}
          className="max-sm:hidden absolute w-fit top-[7%] left-5 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
        >
          Back
        </button>
        {/* small screen */}
        <button
          onClick={() => {
            navigate("/admin/recycle-orders");
          }}
          className="lg:hidden absolute w-fit top-[7%] right-0 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
        >
          Back
        </button>

        {/* Order ID */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Order ID:</span>
          <span className={`${detailImp}`}>
            {recycleOrderDetail?.recycleOrderId}
          </span>
        </div>

        {/* Order Status */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Order Status:</span>
          <span className={`${detailImp}`}>
            {orderCurrentStatus(recycleOrderDetail.status)}
          </span>
        </div>

        {/* Product & Price */}
        <div className={`${heading}`}>
          <div className="flex flex-col gap-1">
            <p className="text-lg max-sm:text-sm">Product Detail:</p>
            <div className={`${innerHeading}`}>
              <span className={`${subHeading}`}>Product Name:</span>
              <span className={`${detailImp}`}>
                {recycleOrderDetail?.productDetails.productName}
              </span>
            </div>

            {/* Category - Brand - Variant - Status (On / Off) */}
            <div className="flex justify-center text-sm opacity-50 ">
              <div
                className={`${innerHeading} max-sm:flex-col max-sm:items-start`}
              >
                <div className={`${innerHeading}`}>
                  <span className={`${subHeading}`}>Category: </span>
                  <span className={`${detail}`}>
                    {recycleOrderDetail?.productDetails?.productCategory}
                  </span>
                </div>
                <div className={`${innerHeading}`}>
                  <span className={`${subHeading}`}>Brand: </span>
                  <span className={`${detail}`}>
                    {recycleOrderDetail?.productDetails?.productBrand}
                  </span>
                </div>
                {recycleOrderDetail?.productDetails?.productCategory ===
                  "Mobile" && (
                  <div className={`${innerHeading}`}>
                    <span className={`${subHeading}`}>Variant: </span>
                    <span className={`${detail}`}>
                      {recycleOrderDetail?.productDetails?.productVariant}
                    </span>
                  </div>
                )}
                {recycleOrderDetail?.productDetails?.productCategory ===
                  "Laptop" && (
                  <div className={`${innerHeading}`}>
                    <span className={`${subHeading}`}>Device Age: </span>
                    <span className={`${detail}`}>
                      {recycleOrderDetail?.productDetails?.productAge}
                    </span>
                  </div>
                )}
                <div className={`${innerHeading}`}>
                  <span className={`${subHeading}`}>Status:</span>
                  <span className={`${detailImp}`}>
                    {recycleOrderDetail?.productDetails?.productStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Device Info: */}
            {recycleOrderDetail.deviceInfo && (
              <div className="flex items-center justify-center max-sm:flex-col max-sm:items-start gap-4 max-sm:gap-0">
                <p className={`${innerHeading}`}>Device Info:</p>
                <div className="">
                  <div className="flex max-sm:flex-col max-sm:items-start text-sm opacity-70 gap-2 max-sm:gap-0 justify-center">
                    {recycleOrderDetail.deviceInfo.serialNumber ? (
                      <p className={`${heading}`}>
                        <span className={`${innerHeading}`}>
                          Serial Number:
                        </span>
                        <span className={`${detail}`}>
                          {recycleOrderDetail.deviceInfo.serialNumber}
                        </span>
                      </p>
                    ) : null}

                    {recycleOrderDetail.deviceInfo.imeiNumber ? (
                      <p className={`${heading}`}>
                        <span className={`${innerHeading}`}>IMEI Number: </span>
                        <span className={`${detail}`}>
                          {recycleOrderDetail.deviceInfo.imeiNumber}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Details */}
        <div className="px-4 py-2 flex flex-col">
          <p className="text-lg max-sm:text-sm">Customer Detail:</p>

          <div className="flex flex-col">
            <div className="text-xs">
              <span className={`${subHeading}`}>Customer Name: </span>
              <span className={`${detail}`}>
                {recycleOrderDetail?.customerName}
              </span>
            </div>
            <div className="text-xs">
              <span className={`${subHeading}`}>Phone: </span>
              <span className={`${detail}`}>{recycleOrderDetail?.phone}</span>
            </div>
            <div className="text-xs">
              <span className={`${subHeading}`}>Email: </span>
              <span className={`${detail}`}>{recycleOrderDetail?.email}</span>
            </div>
          </div>
        </div>

        {/* Address Detail*/}
        <div className=" px-4 py-2">
          <p className="text-lg max-sm:text-sm">Address Detail:</p>

          <div className="flex flex-col">
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>Address: </span>
              <span className={`${detail} text-sm`}>
                {recycleOrderDetail?.addressDetails.address}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>City: </span>
              <span className={`${detail} text-sm`}>
                {recycleOrderDetail?.addressDetails.city}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>State: </span>
              <span className={`${detail} text-sm`}>
                {recycleOrderDetail?.addressDetails.state}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>Pincode: </span>
              <span className={`${detail} text-sm`}>
                {recycleOrderDetail?.addressDetails.pinCode}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Time: */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Schedule Time:</span>
          <span className={`${detailImp}`}>
            {recycleOrderDetail?.schedulePickUp}
          </span>
        </div>

        {/* Completed Order Details Only */}
        {recycleOrderDetail.status.completed && (
          <>
            <div className={`${heading}`}>
              <span className={`${subHeading}`}>Picked Up Agent: </span>
              <span className={`${detail}`}>
                {recycleOrderDetail.pickedUpDetails.agentName}
              </span>
            </div>

            <div className={`${heading}`}>
              <span className={`${subHeading}`}>Picked Up On: </span>
              <span className={`${detail}`}>
                {recycleOrderDetail.pickedUpDetails.pickedUpDate}
              </span>
            </div>

            {/* Customer proof images to view and download */}
            <div className="flex items-center justify-center gap-3 border p-1 rounded">
              <div className="flex flex-col justify-center gap-2">
                <p className={`${subHeading}`}>Customer ID Front: </p>
                <img
                  src={
                    import.meta.env.VITE_APP_BASE_URL +
                    recycleOrderDetail.customerProofFront
                  }
                  alt="ConditionLabel"
                  className="w-[100px] h-[100px] mx-auto "
                />
                <button
                  onClick={() => {
                    downloadImage(
                      import.meta.env.VITE_APP_BASE_URL +
                        recycleOrderDetail.customerProofFront,
                      `${recycleOrderDetail.customerName}-customerProofFront`
                    );
                  }}
                  className="bg-green-600 px-2 rounded text-white"
                >
                  Download
                </button>
              </div>

              <div className="flex flex-col justify-center gap-2">
                <p className={`${subHeading}`}>Customer ID Back: </p>
                <img
                  src={
                    import.meta.env.VITE_APP_BASE_URL +
                    recycleOrderDetail.customerProofBack
                  }
                  alt="ConditionLabel"
                  className="w-[100px] h-[100px] mx-auto "
                  onClick={() => downloadImage()}
                />
                <button
                  onClick={() => {
                    downloadImage(
                      import.meta.env.VITE_APP_BASE_URL +
                        recycleOrderDetail.customerProofBack,
                      `${recycleOrderDetail.customerName}-customerProofBack`
                    );
                  }}
                  className="bg-green-600 px-2 rounded text-white"
                >
                  Download
                </button>
              </div>

              {recycleOrderDetail.customerOptional1 && (
                <div className="flex flex-col justify-center gap-2">
                  <p className={`${subHeading}`}>Optional Proof1: </p>
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      recycleOrderDetail.customerOptional1
                    }
                    alt="ConditionLabel"
                    className="w-[100px] h-[100px] mx-auto "
                    onClick={() => downloadImage()}
                  />
                  <button
                    onClick={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          recycleOrderDetail.customerOptional1,
                        `${recycleOrderDetail.customerName}-customerOptional1`
                      );
                    }}
                    className="bg-green-600 px-2 rounded text-white"
                  >
                    Download
                  </button>
                </div>
              )}

              {recycleOrderDetail.customerOptional2 && (
                <div className="flex flex-col justify-center gap-2">
                  <p className={`${subHeading}`}>Optional Proof2</p>
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      recycleOrderDetail.customerOptional2
                    }
                    alt="ConditionLabel"
                    className="w-[100px] h-[100px] mx-auto "
                    onClick={() => downloadImage()}
                  />
                  <button
                    onClick={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          recycleOrderDetail.customerOptional2,
                        `${recycleOrderDetail.customerName}-customerOptional2`
                      );
                    }}
                    className="bg-green-600 px-2 rounded text-white"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Final Price */}
            <div className="px-4 py-2 flex gap-4 items-center justify-center">
              Offered Price:
              <span className="font-bold">
                {" "}
                {recycleOrderDetail.offerPrice}
              </span>
              Final Price:
              <span className="font-bold">
                {" "}
                {recycleOrderDetail.finalPrice}
              </span>
            </div>
          </>
        )}

        {/* Cancelled Order Reason */}
        {recycleOrderDetail.status.cancelled && (
          <div className={`${heading}`}>
            <span className={`${subHeading}`}>Cancel Reason: </span>
            <span className={`${detailImp}`}>
              {recycleOrderDetail.cancelReason}
            </span>
          </div>
        )}
      </div>

      <hr />

      {/* Form handler */}
      <div className="text-center mt-4">
        {recycleOrderDetail.status.pending && (
          <>
            {/* Recycle Order Completed Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-sm my-10"
            >
              {/* Mandatory Images */}
              <div className="flex flex-col gap-1 items-center">
                <div className="">
                  <h2 className="text-lg">
                    Required Documents<span className="text-red-600">*</span>
                  </h2>
                </div>
                <div className="flex items-center justify-center max-sm:flex-col max-sm:gap-5">
                  {/* ID Front Image */}
                  <div>
                    <p htmlFor="name">
                      Upload Front of Customer ID
                      <span className="text-red-600">*</span>
                    </p>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef1}
                      placeholder="Enter Name"
                      className="border rounded px-2 py-1 w-4/5 mx-auto"
                      onChange={(e) => {
                        setImageSelected1(e.target.files[0]);
                      }}
                      required
                    />
                  </div>

                  {/* ID Back Image */}
                  <div>
                    <p htmlFor="name">
                      Upload Back of Customer ID
                      <span className="text-red-600">*</span>
                    </p>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef2}
                      placeholder="Enter Name"
                      className="border rounded px-2 py-1 w-4/5 mx-auto"
                      onChange={(e) => {
                        setImageSelected2(e.target.files[0]);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <hr className="w-1/3 mx-auto" />
              {/* Optional Images */}
              <div className="flex flex-col gap-1">
                <div className="">
                  <h2 className="text-lg">Optional Documents</h2>
                </div>
                <div className="flex items-center justify-center max-sm:flex-col max-sm:gap-5">
                  {/* Optional Image 1 */}
                  <div>
                    <p htmlFor="name">Upload Optional Doc 1</p>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef4}
                      placeholder=""
                      className="border rounded px-2 py-1 w-4/5 mx-auto"
                      onChange={(e) => {
                        setImageSelected3(e.target.files[0]);
                      }}
                    />
                  </div>

                  {/* Optional Image 2 */}
                  <div>
                    <p htmlFor="name">Upload Optional Doc 2</p>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef3}
                      placeholder=""
                      className="border rounded px-2 py-1 w-4/5 mx-auto"
                      onChange={(e) => {
                        setImageSelected4(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>

                {/* Order Pickup - Purchase Price - Date Picker */}
                <div className="flex items-center justify-center max-sm:flex-col gap-2 max-sm:gap-5 mt-5">
                  <div className="flex items-center max-sm:flex-col max-sm:gap-1">
                    <p htmlFor="pickedUpBy">
                      Picked Up Agen:
                      <span className="text-red-600">* </span>
                    </p>
                    <input
                      type="text"
                      name="pickedUpBy"
                      id=""
                      ref={fileInputRef3}
                      placeholder="Picked Up By Name"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setPickedUpBy(e.target.value);
                      }}
                      required
                    />
                  </div>

                  {/* Recycle Purchase Price */}
                  <div className="flex flex-col items-center">
                    <div>
                      <p htmlFor="finalPrice">
                        Recycle Offered Price:{" "}
                        <span className="font-bold">
                          {recycleOrderDetail.recyclePrice}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center max-sm:flex-col max-sm:gap-1">
                      <p htmlFor="finalPrice">
                        Purchase Price:
                        <span className="text-red-600">* </span>
                      </p>
                      <input
                        type="number"
                        name="finalPrice"
                        id=""
                        placeholder="Purchase Price"
                        className="border rounded px-1 mx-auto"
                        onChange={(e) => {
                          setFinalPrice(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="relative flex max-sm:flex-col max-sm:gap-1">
                    <p htmlFor="datepicker">
                      Select Pick Up Time:
                      <span className="text-red-600">* </span>
                    </p>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleTimeChange}
                      showTimeSelect
                      // timeFormat="HH:mm" // 24 hours
                      timeFormat="h:mm aa" // 12 hours
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeCaption="Time"
                      // minDate={schedulePickUpDate}
                      minDate={currentDate}
                      minTime={minTime}
                      maxTime={maxTime}
                      placeholderText="Select PickedUp Time"
                      className="border px-1 rounded"
                      required
                    />

                    {selectedDate && (
                      <p className="absolute top-4 py-2 text-sm max-sm:hidden">
                        Picket Up time: `
                        {selectedDate.toLocaleString("en-US", {
                          month: "long",
                        })}{" "}
                        {selectedDate.getDate()}, {selectedDate.getFullYear()}{" "}
                        {selectedDate.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                        `
                      </p>
                    )}
                  </div>
                </div>

                {/* Serial No and IMEI No */}
                <div className="flex justify-center mt-5 gap-2 items-center max-sm:flex-col max-sm:gap-4">
                  <div>
                    <label htmlFor="finalPrice">Serial No:</label>
                    <input
                      type="text"
                      name="serialNo"
                      id=""
                      placeholder="Serial No"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setDeviceInfo({
                          ...deviceInfo,
                          serialNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="finalPrice">IMEI No:</label>
                    <input
                      type="text"
                      name="IMEI"
                      id=""
                      placeholder="IMEI No"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setDeviceInfo({
                          ...deviceInfo,
                          imeiNumber: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {!recycleOrderCompletedLoading ? (
                <input
                  type="submit"
                  value="Mark Completed"
                  className="border rounded px-2 py-1 w-fit bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
                />
              ) : (
                <input
                  type="submit"
                  value="Loading"
                  name=""
                  className="border rounded px-2 py-1 w-fit bg-green-300 text-white cursor-none mx-auto"
                />
              )}
            </form>

            {/* Order Cancel Form */}
            <div className="text-sm max-sm:text-xs py-1 text-center">
              Provide Mandatory Reason If You Are Cancelling the Order.
            </div>
            <form
              onSubmit={handleCancelOrder}
              className="flex justify-center max-sm:flex-col items-center gap-4 pb-10 "
            >
              <div className="flex items-center gap-1 text-[16px] max-sm:text-sm">
                <label htmlFor="reason">
                  <span>Reason:</span>
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="reason"
                  placeholder="Reason for cancellation"
                  className="px-2 py-1 border rounded"
                  onChange={(e) => {
                    setCancelReason(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="text-[16px] max-sm:text-sm">
                <input
                  type="submit"
                  value="Cancel Order"
                  className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RecycleOrderDetail;
