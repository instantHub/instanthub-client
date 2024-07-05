import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  useGetOrdersListQuery,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useDeleteOrderMutation,
  useGetRecycleOrdersQuery,
  useRecycleOrderCompleteMutation,
  useDeleteRecycleOrderMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RecycleOrdersList = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const { data: recycleOrdersData, isLoading: recycleOrdersDataloading } =
    useGetRecycleOrdersQuery();
  console.log("recycleOrdersData", recycleOrdersData);
  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");
  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();
  //   const [orderReceived, { isLoading: orderLoading }] =
  //     useOrderReceivedMutation();
  const [recycleOrderReceived, { isLoading: orderLoading }] =
    useRecycleOrderCompleteMutation();
  const [deleteRecycleOrder] = useDeleteRecycleOrderMutation();
  const [deviceInfo, setDeviceInfo] = useState();
  console.log("deviceInfo", deviceInfo);

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  if (!ordersLoading) {
    console.log(ordersData);
  }
  console.log("ordersData", ordersData);

  const [isOpen, setIsOpen] = useState(false);

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

  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderView, setOrderView] = useState("");
  const [orderViewOpen, setOrderViewOpen] = useState(false);
  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  console.log("pickedUpBy", pickedUpBy);
  // console.log("imageSelected1", imageSelected1);
  // console.log("imageSelected2", imageSelected2);
  // console.log("imageSelected3", imageSelected3);
  // console.log("imageSelected4", imageSelected4);

  const handleDelete = async (orderId) => {
    console.log("handledelete", orderId);
    await deleteRecycleOrder(orderId);
  };

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const handleOrderOpen = (recycleOrder) => {
    // const selectedOrder = ordersData.find((order) => order.id === orderId);
    setSelectedOrder(recycleOrder);
    setIsOpen(true);
    console.log("selectedOrder", selectedOrder);
  };

  const handleOrderView = (recycleOrder) => {
    // const selectedOrder = ordersData.find((order) => order.id === orderId);
    setOrderView(recycleOrder);
    setOrderViewOpen(true);
    console.log("setOrderView", selectedOrder);
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
      recycleOrderId: selectedOrder.id,
      customerProofFront: imageURL1,
      customerProofBack: imageURL2,
      customerOptional1: imageURL3 ? imageURL3 : null,
      customerOptional2: imageURL4 ? imageURL4 : null,
      pickedUpDetails: formattedDate,
      deviceInfo,
      finalPrice,
      status: "received",
    };

    console.log("formData from OrderList handleSubmit", formData);

    try {
      const orderData = await recycleOrderReceived(formData);
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

  const downloadImage = (imageUrl, imageName) => {
    console.log(imageName);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        // link.setAttribute("download", "image.jpg"); // Change the filename if needed
        link.setAttribute("download", `${imageName}.jpg`); // Change the filename if needed
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  useEffect(() => {
    console.log("useEffect for selectedOrder");
    console.log(selectedOrder.schedulePickUp);
    // schedulePickUpDate = selectedOrder.schedulePickUp;

    const schedulePickUpString = selectedOrder.schedulePickUp;
    console.log("schedulePickUpString", schedulePickUpString);
    schedulePickUpDate = new Date(schedulePickUpString); // Convert string to Date object
    console.log("schedulePickUpDate", schedulePickUpDate);

    // const schedulePickUpDate = new Date(schedulePickUpString); // Convert string to Date object

    // const schedulePickUpDate = new Date(); // Get current date
    // const minDate = new Date(Math.max(schedulePickUpDate, schedulePickUpDate)); // Set minDate to the maximum of schedulePickUpDate and schedulePickUpDate
  }, [selectedOrder]);

  return (
    <>
      {/* //Products based on the Category selected */}
      <div className="p-4">
        <h2 className=" text-lg font-bold mb-4">Recycle Orders Table</h2>
        {/* <div className="mb-4">
          <h1>Orders List</h1>
        </div> */}
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-gray-800">
                Recycle Order ID
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Product Details
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Customer Details
              </th>
              {/* <th className="px-4 py-2 text-white bg-gray-800">Phone</th> */}
              <th className="px-4 py-2 text-white bg-gray-800">
                Address Details
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Schedule Time
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Recycle Price
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">
                PickUp Details
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">Status</th>
              <th className="px-4 py-2 text-white bg-gray-800">Update Order</th>
              <th className="px-4 py-2 text-white bg-gray-800">Delete Order</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Products when Category is selected */}
            {!recycleOrdersDataloading &&
              recycleOrdersData.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  {/* <td className="px-4 py-2">{product.category.name}</td> */}
                  <td className="px-4 py-2">{order.recycleOrderId}</td>
                  {/* <td className="px-4 py-2">{order.customerName}</td> */}
                  <td className="px-4 py-2">
                    {order.productDetails.productName}{" "}
                    <div className="flex gap-1 text-sm opacity-50 justify-center">
                      {order.productDetails.productCategory
                        .toLowerCase()
                        .includes("mobile") ? (
                        <>
                          <span>
                            Variant {order.productDetails.productVariant}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-2 flex flex-col items-center">
                    <h1 className="text-xs">
                      Customer Name:{" "}
                      <span className="text-sm font-bold">
                        {order.customerName}
                      </span>
                    </h1>
                    <h1 className="text-xs">
                      Phone:{" "}
                      <span className="text-sm font-bold">{order.phone}</span>
                    </h1>
                    <h1 className="text-xs">
                      Email:{" "}
                      <span className="text-sm font-bold">{order.email}</span>
                    </h1>
                  </td>

                  <td className="w-[10%] px-4 py-2">
                    <div className="flex flex-col">
                      <span className="text-xs opacity-70">
                        Address: {order.addressDetails.address}
                      </span>
                      <span className="text-xs opacity-70">
                        State: {order.addressDetails.state}
                      </span>
                      <span className="text-xs opacity-70">
                        City: {order.addressDetails.city}
                      </span>
                      <span className="text-xs opacity-70">
                        Pincode: {order.addressDetails.pinCode}
                      </span>
                    </div>
                  </td>

                  <td className="px-1 py-2">{order.schedulePickUp}</td>
                  <td className="px-4 py-2">{order.recyclePrice}</td>
                  {/* Order Picked Up time */}
                  <td className="w-[10%] px-1 py-2">
                    {order.status.toLowerCase() === "pending" ? (
                      <h1>Pick Up is Pending</h1>
                    ) : (
                      <div className="flex flex-col justify-center">
                        <h1 className="text-sm">
                          Agent Name:
                          <span className="font-bold">
                            {order.pickedUpDetails.agentName}
                          </span>
                        </h1>
                        <h1 className="text-sm">
                          Purchased Price:
                          <span className="font-bold">{order.finalPrice}</span>
                        </h1>
                        <h1 className="text-sm">
                          Time:
                          <span className="font-bold">
                            {order.pickedUpDetails.pickedUpDate}
                          </span>
                        </h1>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.status.toLowerCase() === "pending" ? (
                      <h1>{order.status.toUpperCase()}</h1>
                    ) : (
                      <h1>{order.status.toUpperCase()}</h1>
                    )}
                  </td>

                  {order.status.toLowerCase() !== "received" ? (
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleOrderOpen(order)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                      >
                        Received
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleOrderView(order)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 rounded"
                      >
                        View
                      </button>
                    </td>
                  )}
                  <td>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">
                Recycle Order Received
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>

            <table className="mx-auto border-collapse w-[90%]">
              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Recycle Order ID
                </th>
                <td className="p-2 border font-semibold">
                  {selectedOrder.recycleOrderId}
                </td>
              </tr>
              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Product
                </th>
                <td className="p-2 border">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {selectedOrder.productDetails.productName}
                    </span>

                    {selectedOrder.productDetails.productCategory
                      .toLowerCase()
                      .includes("mobile") ? (
                      <div>
                        <span className="">Variant: </span>
                        <span className="font-semibold">
                          {selectedOrder.productDetails.productVariant}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Customer Details
                </th>
                <td className="p-2 border text-lg">
                  <div className="flex flex-col">
                    <div>
                      Customer Name:
                      <span className="text-lg font-semibold">
                        {selectedOrder.customerName}
                      </span>
                    </div>
                    <div>
                      Email:{" "}
                      <span className="text-lg font-semibold">
                        {selectedOrder.email}
                      </span>
                    </div>
                    <div>
                      Phone:{" "}
                      <span className="text-lg font-semibold">
                        {selectedOrder.phone}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Address Details
                </th>
                <td className="p-2 border text-lg">
                  <div>
                    <span className="text-lg font-semibold">
                      {selectedOrder.addressDetails.address},{" "}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div>
                      City:{" "}
                      <span className="text-lg font-semibold">
                        {selectedOrder.addressDetails.city},{" "}
                      </span>
                    </div>
                    <div>
                      State:{" "}
                      <span className="text-lg font-semibold">
                        {selectedOrder.addressDetails.state},{" "}
                      </span>
                    </div>
                    <div>
                      PinCode:
                      <span className="text-lg font-semibold">
                        {selectedOrder.addressDetails.pinCode}.
                      </span>
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Schedule PickUp Date
                </th>
                <td className="p-2 border text-lg font-semibold">
                  {selectedOrder.schedulePickUp}
                </td>
              </tr>

              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">Status</th>
                <td className="p-2 border text-lg font-semibold">
                  {selectedOrder.status}
                </td>
              </tr>

              <tr className="border-b">
                <th className="text-right bg-slate-100 w-[30%] px-5">
                  Recycle Price:
                </th>
                <td className="p-2 border text-lg font-semibold">
                  {selectedOrder.recyclePrice}
                </td>
              </tr>
            </table>

            <hr />

            <div onSubmit={handleSubmit} className="text-center mt-4">
              <form action="" className="flex flex-col gap-4">
                {/* Mandatory Images */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="">
                    <h1 className="text-lg">
                      Required Documents<span className="text-red-600">*</span>
                    </h1>
                  </div>
                  <div className="flex">
                    {/* ID Front Image */}
                    {/* <div> */}
                    <label htmlFor="name">
                      Upload Front of Customer ID
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef1}
                      placeholder="Enter Name"
                      className="border rounded px-2 py-1 w-1/3 mx-auto"
                      onChange={(e) => {
                        setImageSelected1(e.target.files[0]);
                      }}
                      required
                    />
                    {/* </div> */}

                    {/* ID Back Image */}
                    {/* <div> */}
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
                      className="border rounded px-2 py-1 w-1/3 mx-auto"
                      onChange={(e) => {
                        setImageSelected2(e.target.files[0]);
                      }}
                      required
                    />
                    {/* </div> */}
                  </div>
                </div>
                <hr className="w-1/3 mx-auto" />
                {/* Optional Images */}
                <div className="flex flex-col gap-1">
                  <div className="">
                    <h1 className="text-lg">Optional Documents</h1>
                  </div>
                  <div className="flex items-center">
                    {/* Optional Image 1 */}
                    <label htmlFor="name">Upload Optional Doc 1</label>
                    <input
                      type="file"
                      name="name"
                      id=""
                      ref={fileInputRef4}
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
                      id=""
                      ref={fileInputRef3}
                      placeholder=""
                      className="border rounded px-2 py-1 w-1/3 mx-auto"
                      onChange={(e) => {
                        setImageSelected4(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-5">
                    <div className="flex items-center">
                      <label htmlFor="pickedUpBy">
                        Order Picked Up By:
                        <span className="text-red-600">* </span>
                      </label>
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
                    <div className="flex flex-col items-center">
                      <div>
                        <label htmlFor="finalPrice">
                          Recycle Offered Price:{" "}
                          <span className="font-bold">
                            {selectedOrder.recyclePrice}
                          </span>
                        </label>
                      </div>

                      <div className="flex items-center">
                        <label htmlFor="finalPrice">
                          Purchase Price:
                          <span className="text-red-600">* </span>
                        </label>
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

                    <div>
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
                  <div className="flex justify-center mt-5 gap-2 items-center">
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

                {!ordersLoading ? (
                  <input
                    type="submit"
                    value="Mark Received"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Loading"
                    name=""
                    className="border rounded px-2 py-1 w-1/5 bg-green-300 text-white cursor-none mx-auto"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {orderViewOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">
                Recycle Order Received
              </h2>
              <button
                onClick={() => setOrderViewOpen(false)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>

            <div className="mb-2">
              {/* <h1 className="text-xl">Order Detail:</h1> */}
              <table className="mx-auto border-collapse w-[90%]">
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Recycle Order ID
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.recycleOrderId}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Product
                  </th>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {orderView.productDetails.productName}
                      </span>

                      {orderView.productDetails.productCategory
                        .toLowerCase()
                        .includes("mobile") ? (
                        <div>
                          <span className="">Variant: </span>
                          <span className="font-semibold">
                            {orderView.productDetails.productVariant}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
                {orderView.deviceInfo ? (
                  <tr className="border-b">
                    <th className="text-right bg-slate-100 w-[30%] px-5">
                      Device Info
                    </th>
                    <td className="p-2 border">
                      <div className="flex items-center justify- gap-4">
                        <div className="flex text-sm opacity-70 gap-2 justify-center">
                          {orderView.deviceInfo.serialNumber ? (
                            <p>
                              Serial Number:{" "}
                              <span className="font-bold">
                                {orderView.deviceInfo.serialNumber}
                              </span>
                            </p>
                          ) : null}

                          {orderView.deviceInfo.imeiNumber ? (
                            <p>
                              IMEI Number:{" "}
                              <span className="font-bold">
                                {orderView.deviceInfo.imeiNumber}
                              </span>
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : null}

                {/* Customer Details */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Customer Details
                  </th>
                  <td className="p-2 border">
                    <div className="flex flex-col">
                      <div>
                        Customer Name:{" "}
                        <span className="font-semibold">
                          {orderView.customerName}
                        </span>
                      </div>
                      <div>
                        Email:{" "}
                        <span className="font-semibold">{orderView.email}</span>
                      </div>
                      <div>
                        Phone:{" "}
                        <span className="font-semibold">{orderView.phone}</span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Customer Proof */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Cusomer Proof
                  </th>
                  <td className="p-2 border font-semibold">
                    <div className="flex items-center justify-center gap-2 p-1 rounded">
                      <div className="flex flex-col items-center gap-1">
                        <h1>Customer ID Front:</h1>
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            orderView.customerProofFront
                          }
                          alt="ConditionLabel"
                          className="w-[100px] h-[100px] mx-auto "
                        />
                        <button
                          onClick={() => {
                            downloadImage(
                              import.meta.env.VITE_APP_BASE_URL +
                                orderView.customerProofFront,
                              `${orderView.customerName}-customerProofFront`
                            );
                          }}
                          className="bg-green-600 px-2 rounded text-white"
                        >
                          Download
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <h1>Customer ID Back:</h1>
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            orderView.customerProofBack
                          }
                          alt="ConditionLabel"
                          className="w-[100px] h-[100px] mx-auto "
                          onClick={() => downloadImage()}
                        />
                        <button
                          onClick={() => {
                            downloadImage(
                              import.meta.env.VITE_APP_BASE_URL +
                                orderView.customerProofBack,
                              `${orderView.customerName}-customerProofBack`
                            );
                          }}
                          className="bg-green-600 px-2 rounded text-white"
                        >
                          Download
                        </button>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        {orderView.customerOptional1 ? (
                          <>
                            <h1>Optional Proof1:</h1>
                            <img
                              src={
                                import.meta.env.VITE_APP_BASE_URL +
                                orderView.customerOptional1
                              }
                              alt="ConditionLabel"
                              className="w-[100px] h-[100px] mx-auto "
                              onClick={() => downloadImage()}
                            />
                            <button
                              onClick={() => {
                                downloadImage(
                                  import.meta.env.VITE_APP_BASE_URL +
                                    orderView.customerOptional1,
                                  `${orderView.customerName}-customerOptional1`
                                );
                              }}
                              className="bg-green-600 px-2 rounded text-white"
                            >
                              Download
                            </button>
                          </>
                        ) : null}
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        {orderView.customerOptional2 ? (
                          <>
                            <h1>Optional Proof2</h1>
                            <img
                              src={
                                import.meta.env.VITE_APP_BASE_URL +
                                orderView.customerOptional2
                              }
                              alt="ConditionLabel"
                              className="w-[100px] h-[100px] mx-auto "
                              onClick={() => downloadImage()}
                            />
                            <button
                              onClick={() => {
                                downloadImage(
                                  import.meta.env.VITE_APP_BASE_URL +
                                    orderView.customerOptional2,
                                  `${orderView.customerName}-customerOptional2`
                                );
                              }}
                              className="bg-green-600 px-2 rounded text-white"
                            >
                              Download
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Address */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Address Details
                  </th>
                  <td className="p-2 border">
                    <div>
                      <span className="font-semibold">
                        {orderView.addressDetails.address},{" "}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div>
                        City:{" "}
                        <span className="font-semibold">
                          {orderView.addressDetails.city},
                        </span>
                      </div>
                      <div>
                        State:{" "}
                        <span className="font-semibold">
                          {orderView.addressDetails.state},
                        </span>
                      </div>
                      <div>
                        PinCode:
                        <span className="font-semibold">
                          {orderView.addressDetails.pinCode}.
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Schedule PickUp Date
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.schedulePickUp}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Picked Up By
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.pickedUpDetails.agentName}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Picked Up Date
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.pickedUpDetails.pickedUpDate}
                  </td>
                </tr>

                {/* status */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Status
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.status.toUpperCase()}
                  </td>
                </tr>

                {/* Recycle Price */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Recycle Price
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.recyclePrice}
                  </td>
                </tr>

                {/* Final Price */}
                <tr className="border-b">
                  <th className="text-right bg-slate-100 w-[30%] px-5">
                    Final Price
                  </th>
                  <td className="p-2 border font-semibold">
                    {orderView.finalPrice}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecycleOrdersList;
