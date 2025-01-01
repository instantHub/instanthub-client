import React, { useRef, useState } from "react";
import {
  useGetOrderQuery,
  useOrderCancelMutation,
  useOrderReceivedMutation,
  useUploadCustomerProofImageMutation,
} from "../../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Loading from "../../../components/Loading";

const OrderDetail = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const { data: orderDetail, isLoading: orderDetailLoading } =
    useGetOrderQuery(orderId);
  console.log("orderDetail", orderDetail);

  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();

  const [orderReceived, { isLoading: orderReceivedLoading }] =
    useOrderReceivedMutation();

  const [orderCancel, { isLoading: orderCancelLoading }] =
    useOrderCancelMutation();

  const [cancelReason, setCancelReason] = useState("");
  console.log("cancelReason", cancelReason);

  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");
  // console.log("imageSelected1", imageSelected1);
  // console.log("imageSelected2", imageSelected2);
  // console.log("imageSelected3", imageSelected3);
  // console.log("imageSelected4", imageSelected4);

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [deviceInfo, setDeviceInfo] = useState();

  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  let schedulePickUpDate;

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

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

    // const formData = {
    //   orderId: selectedOrder.id,
    //   customerProof: imageURL,
    //   status: "received",
    // };
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
      // orderId: selectedOrder.id,
      orderId,
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
      // status: "received",
    };

    console.log("formData from OrderList handleSubmit", formData);

    try {
      const orderData = await orderReceived(formData);
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

      const orderCancelData = await orderCancel({
        orderId,
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

  if (orderDetailLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* Order Detail */}
      <div className="">
        {/* Back Button */}
        {/* large screen */}
        <button
          onClick={() => {
            navigate("/admin/orders");
          }}
          className="max-sm:hidden absolute w-fit top-[7%] left-5 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
        >
          Back
        </button>
        {/* small screen */}
        <button
          onClick={() => {
            navigate("/admin/orders");
          }}
          className="lg:hidden absolute w-fit top-[7%] right-0 bg-secondary text-secondary-light px-2 py-1 mx-4 my-2 rounded"
        >
          Back
        </button>

        {/* Order ID */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Order ID:</span>
          <span className={`${detailImp}`}>{orderDetail?.orderId}</span>
        </div>

        {/* Order Status */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Order Status:</span>
          <span className={`${detailImp}`}>
            {orderCurrentStatus(orderDetail.status)}
          </span>
        </div>

        {/* Product & Price */}
        <div className={`${heading}`}>
          <div className="flex flex-col gap-1">
            <p className="text-lg max-sm:text-sm">Product Detail:</p>
            <div className={`${innerHeading}`}>
              <span className={`${subHeading}`}>Product Name:</span>
              <span className={`${detailImp}`}>{orderDetail?.productName}</span>
            </div>
            <div className="flex justify-center text-sm opacity-50 ">
              {orderDetail?.productCategory === "Mobile" ? (
                <div className={`${innerHeading}`}>
                  <div className={`${innerHeading}`}>
                    <span className={`${subHeading}`}>Variant: </span>
                    <span className={`${detail}`}>
                      {orderDetail?.variant?.variantName}
                    </span>
                  </div>
                  <div className={`${innerHeading}`}>
                    <span className={`${subHeading}`}>Price:</span>
                    <span className={`${detail}`}>
                      {orderDetail?.variant?.price}
                    </span>
                  </div>
                </div>
              ) : (
                <div className={`${innerHeading}`}>
                  <span className={`${subHeading}`}>Price:</span>
                  <span className={`${detail}`}>
                    {orderDetail?.variant?.price}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="px-4 py-2 flex flex-col">
          <p className="text-lg max-sm:text-sm">Customer Detail:</p>

          <div className="flex flex-col">
            <div className="text-xs">
              <span className={`${subHeading}`}>Customer Name: </span>
              <span className={`${detail}`}>{orderDetail?.customerName}</span>
            </div>
            <div className="text-xs">
              <span className={`${subHeading}`}>Phone: </span>
              <span className={`${detail}`}>{orderDetail?.phone}</span>
            </div>
            <div className="text-xs">
              <span className={`${subHeading}`}>Email: </span>
              <span className={`${detail}`}>{orderDetail?.email}</span>
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
                {orderDetail?.addressDetails.address}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>City: </span>
              <span className={`${detail} text-sm`}>
                {orderDetail?.addressDetails.city}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>State: </span>
              <span className={`${detail} text-sm`}>
                {orderDetail?.addressDetails.state}
              </span>
            </div>
            <div className="text-xs opacity-70">
              <span className={`${subHeading}`}>Pincode: </span>
              <span className={`${detail} text-sm`}>
                {orderDetail?.addressDetails.pinCode}
              </span>
            </div>
          </div>
        </div>

        {/* Offer Price */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>OfferPrice:</span>
          <span className={`${detailImp}`}>{orderDetail?.offerPrice}</span>
        </div>

        {/* Schedule Time: */}
        <div className={`${heading}`}>
          <span className={`${subHeading}`}>Schedule Time:</span>
          <span className={`${detailImp}`}>{orderDetail?.schedulePickUp}</span>
        </div>

        {/* Completed Order Details Only */}
        {orderDetail.status.completed && (
          <>
            <div className={`${heading}`}>
              <span className={`${subHeading}`}>Picked Up Agent: </span>
              <span className={`${detail}`}>
                {orderDetail.pickedUpDetails.agentName}
              </span>
            </div>

            <div className={`${heading}`}>
              <span className={`${subHeading}`}>Picked Up On: </span>
              <span className={`${detail}`}>
                {orderDetail.pickedUpDetails.pickedUpDate}
              </span>
            </div>

            {/* Customer proof images to view and download */}
            <div className="flex items-center justify-center gap-3 border p-1 rounded">
              <div className="flex flex-col justify-center gap-2">
                <p className={`${subHeading}`}>Customer ID Front: </p>
                <img
                  src={
                    import.meta.env.VITE_APP_BASE_URL +
                    orderDetail.customerProofFront
                  }
                  alt="ConditionLabel"
                  className="w-[100px] h-[100px] mx-auto "
                />
                <button
                  onClick={() => {
                    downloadImage(
                      import.meta.env.VITE_APP_BASE_URL +
                        orderDetail.customerProofFront,
                      `${orderDetail.customerName}-customerProofFront`
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
                    orderDetail.customerProofBack
                  }
                  alt="ConditionLabel"
                  className="w-[100px] h-[100px] mx-auto "
                  onClick={() => downloadImage()}
                />
                <button
                  onClick={() => {
                    downloadImage(
                      import.meta.env.VITE_APP_BASE_URL +
                        orderDetail.customerProofBack,
                      `${orderDetail.customerName}-customerProofBack`
                    );
                  }}
                  className="bg-green-600 px-2 rounded text-white"
                >
                  Download
                </button>
              </div>

              {orderDetail.customerOptional1 && (
                <div className="flex flex-col justify-center gap-2">
                  <p className={`${subHeading}`}>Optional Proof1: </p>
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      orderDetail.customerOptional1
                    }
                    alt="ConditionLabel"
                    className="w-[100px] h-[100px] mx-auto "
                    onClick={() => downloadImage()}
                  />
                  <button
                    onClick={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          orderDetail.customerOptional1,
                        `${orderDetail.customerName}-customerOptional1`
                      );
                    }}
                    className="bg-green-600 px-2 rounded text-white"
                  >
                    Download
                  </button>
                </div>
              )}

              {orderDetail.customerOptional2 && (
                <div className="flex flex-col justify-center gap-2">
                  <p className={`${subHeading}`}>Optional Proof2</p>
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      orderDetail.customerOptional2
                    }
                    alt="ConditionLabel"
                    className="w-[100px] h-[100px] mx-auto "
                    onClick={() => downloadImage()}
                  />
                  <button
                    onClick={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          orderDetail.customerOptional2,
                        `${orderDetail.customerName}-customerOptional2`
                      );
                    }}
                    className="bg-green-600 px-2 rounded text-white"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Device Info: */}
            {orderDetail.deviceInfo && (
              <div className="flex items-center justify-center gap-4">
                <div>
                  <h2 className="text-lg">Device Info:</h2>
                </div>
                <div className="">
                  <div className="flex text-sm opacity-70 gap-2 justify-center">
                    {orderDetail.deviceInfo.serialNumber ? (
                      <p>
                        Serial Number:{" "}
                        <span className="font-bold">
                          {orderDetail.deviceInfo.serialNumber}
                        </span>
                      </p>
                    ) : null}

                    {orderDetail.deviceInfo.imeiNumber ? (
                      <p>
                        IMEI Number:{" "}
                        <span className="font-bold">
                          {orderDetail.deviceInfo.imeiNumber}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {/* Final Price */}
            <div className="px-4 py-2 flex gap-4 items-center justify-center">
              Offered Price:
              <span className="font-bold"> {orderDetail.offerPrice}</span>
              Final Price:
              <span className="font-bold"> {orderDetail.finalPrice}</span>
            </div>
          </>
        )}

        {/* Cancelled Order Reason */}
        {orderDetail.status.cancelled && (
          <div className={`${heading}`}>
            <span className={`${subHeading}`}>Cancel Reason: </span>
            <span className={`${detailImp}`}>{orderDetail.cancelReason}</span>
          </div>
        )}
      </div>

      <hr />

      {/* Form handler */}
      <div className="text-center mt-4">
        {orderDetail.status.pending && (
          <>
            {/* Order Recieved Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-10">
              {/* Mandatory Images */}
              <div className="flex flex-col gap-1 items-center">
                <div className="">
                  <h2 className="text-lg">
                    Required Documents<span className="text-red-600">*</span>
                  </h2>
                </div>
                {/* ID Proof Images */}
                <div className="flex max-sm:flex-col gap-2">
                  {/* ID Front Image */}
                  <div className="flex items-center max-sm:flex-col gap-2">
                    <label htmlFor="name">
                      Upload Front of Customer ID
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="name"
                      ref={fileInputRef1}
                      placeholder="Enter Name"
                      className="border rounded px-2 py-1 w-3/4 mx-auto"
                      onChange={(e) => {
                        setImageSelected1(e.target.files[0]);
                      }}
                      required
                    />
                  </div>

                  {/* ID Back Image */}
                  <div className="flex items-center max-sm:flex-col gap-2">
                    <label htmlFor="name">
                      Upload Back of Customer ID
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef2}
                      placeholder="Enter Name"
                      className="border rounded px-2 py-1 w-3/4 mx-auto"
                      onChange={(e) => {
                        setImageSelected2(e.target.files[0]);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
              <hr className="w-1/3 mx-auto" />
              {/* Optional Images & Other details */}
              <div className="flex flex-col gap-1 ">
                <div className="">
                  <h2 className="text-lg">Optional Documents</h2>
                </div>
                <div className="flex items-center max-sm:flex-col gap-2">
                  {/* Optional Image 1 */}
                  <label htmlFor="name">Upload Optional Doc 1</label>
                  <input
                    type="file"
                    name="name"
                    ref={fileInputRef3}
                    placeholder=""
                    className="border rounded px-2 py-1 w-1/3 mx-auto"
                    onChange={(e) => {
                      setImageSelected3(e.target.files[0]);
                    }}
                  />

                  {/* Optional Image 2 */}
                  <label htmlFor="name">Upload Optional Doc 2</label>
                  <input
                    type="file"
                    name="name"
                    ref={fileInputRef4}
                    placeholder=""
                    className="border rounded px-2 py-1 w-1/3 mx-auto"
                    onChange={(e) => {
                      setImageSelected4(e.target.files[0]);
                    }}
                  />
                </div>

                {/* Order Picked Up By: */}
                <div className="flex items-center max-sm:flex-col justify-center gap-2 mt-5">
                  {/* Pickup details */}
                  <div className="flex items-center max-sm:flex-col">
                    <label htmlFor="pickedUpBy">
                      Order Picked Up By:
                      <span className="text-red-600">* </span>
                    </label>
                    <input
                      type="text"
                      name="pickedUpBy"
                      // ref={fileInputRef3}
                      placeholder="Picked Up By Name"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setPickedUpBy(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Offered Price */}
                    <div>
                      <label htmlFor="finalPrice">
                        Offered Price:{" "}
                        <span className="font-bold">
                          {orderDetail.offerPrice}
                        </span>
                      </label>
                    </div>

                    {/* Purchase Price */}
                    <div className="flex items-center max-sm:flex-col">
                      <label htmlFor="finalPrice">
                        Purchase Price:
                        <span className="text-red-600">* </span>
                      </label>
                      <input
                        type="number"
                        name="finalPrice"
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
                  <div className="max-sm:flex max-sm:flex-col">
                    <label htmlFor="datepicker">
                      Select Date and Time:
                      <span className="text-red-600">* </span>
                    </label>
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
                      <p className="py-2 text-xl">
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

                {/* serialNo & IMEI */}
                <div className="flex justify-center max-sm:flex-col mt-5 gap-2 items-center">
                  <div>
                    <label htmlFor="finalPrice">Serial No:</label>
                    <input
                      type="text"
                      name="serialNo"
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

              <input
                type="submit"
                value={`${
                  !orderReceivedLoading ? "Mark Received" : "Loading"
                } `}
                className={` ${
                  !orderReceivedLoading
                    ? "bg-green-600 cursor-pointer"
                    : "bg-green-300 cursor-none"
                } border rounded px-2 py-1 w-fit text-white  hover:bg-green-600 mx-auto`}
              />
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

export default OrderDetail;
