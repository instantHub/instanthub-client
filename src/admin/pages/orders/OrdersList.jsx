import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  useGetOrdersListQuery,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useDeleteOrderMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrdersList = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");
  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();
  const [orderReceived, { isLoading: orderLoading }] =
    useOrderReceivedMutation();
  const [deleteOrder] = useDeleteOrderMutation();
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
    await deleteOrder(orderId);
  };

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
  };

  const handleOrderOpen = (orderId) => {
    const selectedOrder = ordersData.find((order) => order.id === orderId);
    setSelectedOrder(selectedOrder);
    setIsOpen(true);
    console.log("selectedOrder", selectedOrder);
  };

  const handleOrderView = (orderId) => {
    const selectedOrder = ordersData.find((order) => order.id === orderId);
    setOrderView(selectedOrder);
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
      orderId: selectedOrder.id,
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

  const openImageInNewWindow = (imageUrl) => {
    window.open(imageUrl, "_blank");
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
        <h2 className=" text-lg font-bold mb-4">Orders Table</h2>
        {/* <div className="mb-4">
          <h2>Orders List</h2>
        </div> */}
        <table className="w-full">
          <thead>
            <tr className="py-10 font-serif text-lg font-bold border shadow-xl text-green-800">
              <th className="px-4 py-4">Order ID</th>
              {/* <th className="px-4 py-2 ">
                Customer Name
              </th> */}
              <th className="px-4 py-2 ">Product</th>
              <th className="px-4 py-2 ">
                Customer Details
              </th>
              {/* <th className="px-4 py-2 ">Phone</th> */}
              <th className="px-4 py-2 ">Address</th>
              <th className="px-4 py-2 ">OfferPrice</th>
              <th className="px-4 py-2 ">
                Schedule Time
              </th>
              <th className="px-4 py-2 ">
                PickUp Details
              </th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Update Order</th>
              <th className="px-4 py-2 ">Delete Order</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Products when Category is selected */}
            {!ordersLoading &&
              ordersData.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                  }
                >
                  {/* <td className="px-4 py-2">{product.category.name}</td> */}
                  <td className="px-4 py-2">{order.orderId}</td>
                  {/* <td className="px-4 py-2">{order.customerName}</td> */}
                  <td className="px-4 py-2">
                    {order.productName}{" "}
                    <div className="flex gap-1 text-sm opacity-50 justify-center">
                      {order.category === "Mobile" ? (
                        <>
                          <span>Variant {order.variant?.variantName}</span>
                          <span>Price {order.variant?.price}</span>
                        </>
                      ) : (
                        <span>Price {order.variant?.price}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 flex flex-col items-center">
                    <h2 className="text-xs">
                      Customer Name:{" "}
                      <span className="text-sm font-bold">
                        {order.customerName}
                      </span>
                    </h2>
                    <h2 className="text-xs">
                      Phone:{" "}
                      <span className="text-sm font-bold">{order.phone}</span>
                    </h2>
                    <h2 className="text-xs">
                      Email:{" "}
                      <span className="text-sm font-bold">{order.email}</span>
                    </h2>
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

                  <td className="px-4 py-2">{order.offerPrice}</td>
                  <td className="px-1 py-2">{order.schedulePickUp}</td>
                  {/* Order Picked Up time */}
                  <td className="w-[10%] px-1 py-2">
                    {order.status.toLowerCase() === "pending" ? (
                      <h2>Pick Up is Pending</h2>
                    ) : (
                      <div className="flex flex-col justify-center">
                        <h2 className="text-sm">
                          Agent Name:
                          <span className="font-bold">
                            {order.pickedUpDetails.agentName}
                          </span>
                        </h2>
                        <h2 className="text-sm">
                          Purchased Price:
                          <span className="font-bold">{order.finalPrice}</span>
                        </h2>
                        <h2 className="text-sm">
                          Time:
                          <span className="font-bold">
                            {order.pickedUpDetails.pickedUpDate}
                          </span>
                        </h2>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {order.status.toLowerCase() === "pending" ? (
                      <h2>{order.status.toUpperCase()}</h2>
                    ) : (
                      <h2>{order.status.toUpperCase()}</h2>
                    )}
                  </td>

                  {order.status.toLowerCase() !== "received" ? (
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleOrderOpen(order.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                      >
                        Received
                      </button>
                    </td>
                  ) : (
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleOrderView(order.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
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
              <h2 className="text-xl font-semibold mb-4">Order Received</h2>
              <button
                onClick={() => setIsOpen(false)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>

            <div className="text-center mb-2">
              <h2 className="text-xl">Order Detail:</h2>
              <ul>
                <li className="px-4 py-2">Order ID: {selectedOrder.orderId}</li>
                <li className="px-4 py-2">
                  Customer Name: {selectedOrder.customerName}
                </li>
                <li className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <h2 className="text-lg">Product:</h2>
                    </div>
                    <div className="">
                      {selectedOrder.productName}{" "}
                      <div className="flex text-sm opacity-50 gap-2 justify-center">
                        <span>
                          Variant {selectedOrder.variant?.variantName}
                        </span>
                        <span>Price {selectedOrder.variant?.price}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="px-4 py-2">
                  Offered Price: {selectedOrder.offerPrice}
                </li>
                <li className="px-4 py-2">Email: {selectedOrder.email}</li>
                <li className="px-4 py-2">PH: {selectedOrder.phone}</li>
                <li className="px-4 py-2">
                  Address: {selectedOrder.addressDetails.address},{" "}
                  {selectedOrder.addressDetails.city},{" "}
                  {selectedOrder.addressDetails.state}. <br />
                  PinCode: {selectedOrder.addressDetails.pinCode}
                </li>
                <li className="px-4 py-2">
                  Schedule PickUp Date: {selectedOrder.schedulePickUp}
                </li>
              </ul>
            </div>

            <hr />

            <div onSubmit={handleSubmit} className="text-center mt-4">
              <form action="" className="flex flex-col gap-4">
                {/* Mandatory Images */}
                <div className="flex flex-col gap-1 items-center">
                  <div className="">
                    <h2 className="text-lg">
                      Required Documents<span className="text-red-600">*</span>
                    </h2>
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
                    <h2 className="text-lg">Optional Documents</h2>
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
                          Offered Price:{" "}
                          <span className="font-bold">
                            {selectedOrder.offerPrice}
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
              <h2 className="text-xl font-semibold mb-4">Order Received</h2>
              <button
                onClick={() => setOrderViewOpen(false)}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                x
              </button>
            </div>

            <div className="text-center mb-2">
              <h2 className="text-xl">Order Detail:</h2>
              <div>
                <div className="flex justify-center">
                  <h2 className="px-4 py-2">Order ID: {orderView.orderId}</h2>
                  <h2 className="px-4 py-2">
                    Status: {orderView.status.toUpperCase()}
                  </h2>
                </div>
                <div className="flex justify-center">
                  <h2 className="px-4 py-2">
                    Schedule PickUp:{" "}
                    <span className="font-semibold">
                      {orderView.schedulePickUp}
                    </span>
                  </h2>
                  <h2 className="px-4 py-2">
                    Picked Up By:{" "}
                    <span className="font-semibold">
                      {orderView.pickedUpDetails.agentName}
                    </span>
                  </h2>
                  <h2 className="px-4 py-2">
                    Picked Up On:{" "}
                    <span className="font-semibold">
                      {orderView.pickedUpDetails.pickedUpDate}
                    </span>
                  </h2>
                </div>
                <h2 className="px-4 py-2">
                  <div className="flex flex-col items-center">
                    <h2>Customer Name: {orderView.customerName}</h2>

                    <div className="flex items-center justify-center gap-3 border p-1 rounded">
                      <div>
                        <h2>Customer ID Front:</h2>
                        <img
                          src={
                            import.meta.env.VITE_APP_BASE_URL +
                            orderView.customerProofFront
                          }
                          alt="ConditionLabel"
                          className="w-[100px] h-[100px] mx-auto "
                        />
                        {/* <button
                          onClick={() => {
                            openImageInNewWindow(
                              import.meta.env.VITE_APP_BASE_URL +
                                orderView.customerProofFront
                            );
                          }}
                        >
                          View in New Window
                        </button> */}
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

                      <div>
                        <h2>Customer ID Back:</h2>
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

                      <div>
                        {orderView.customerOptional1 ? (
                          <>
                            <h2>Optional Proof1:</h2>
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
                      <div>
                        {orderView.customerOptional2 ? (
                          <>
                            <h2>Optional Proof2</h2>
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
                  </div>
                </h2>
                <h2 className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <h2 className="text-lg">Product:</h2>
                    </div>
                    <div className="">
                      {orderView.productId?.name}{" "}
                      <div className="flex text-sm opacity-50 gap-2 justify-center">
                        {orderView.category === "Mobile" ? (
                          <span>Variant {orderView.variant?.variantName}</span>
                        ) : null}
                        <span>Price {orderView.variant?.price}</span>
                      </div>
                    </div>
                  </div>
                  {orderView.deviceInfo ? (
                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <h2 className="text-lg">Device Info:</h2>
                      </div>
                      <div className="">
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
                    </div>
                  ) : null}
                </h2>
                <h2 className="px-4 py-2 flex gap-4 items-center justify-center">
                  Offered Price:
                  <span className="font-bold"> {orderView.offerPrice}</span>
                  Final Price:
                  <span className="font-bold"> {orderView.finalPrice}</span>
                </h2>
                <div className="flex justify-center">
                  <h2 className="px-4 py-2">Email: {orderView.email}</h2>
                  <h2 className="px-4 py-2">PH: {orderView.phone}</h2>
                </div>
                <h2 className="px-4 py-2">
                  Address: {orderView.addressDetails.address} <br />
                  State: {orderView.addressDetails.state}, City:{" "}
                  {orderView.addressDetails.city}, PinCode:{" "}
                  {orderView.addressDetails.pinCode}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersList;
