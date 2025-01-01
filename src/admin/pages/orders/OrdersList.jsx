import React, { useState, useEffect } from "react";
import {
  useGetOrdersListQuery,
  useDeleteOrderMutation,
} from "../../../features/api";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../components/TableView";
import OrderRecieved from "./OrderRecieved";
import OrderView from "./OrderView";
import { GiCardPickup } from "react-icons/gi";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import { MdOutlineGridView } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";

const OrdersList = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const [deleteOrder] = useDeleteOrderMutation();

  console.log("ordersData", ordersData);

  const [isOpen, setIsOpen] = useState(false);

  let schedulePickUpDate;

  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderToView, setOrderToView] = useState("");
  const [orderViewOpen, setOrderViewOpen] = useState(false);

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const handleDelete = async (orderId) => {
    console.log("handledelete", orderId);
    await deleteOrder(orderId);
  };

  const handleOrderOpen = (orderId) => {
    const selectedOrder = ordersData.find((order) => order.id === orderId);
    setSelectedOrder(selectedOrder);
    setIsOpen(true);
    console.log("selectedOrder", selectedOrder);
  };

  const handleOrderStatus = (order) => {
    if (order.status.pending) {
      return (
        <p className="px-4 py-1 bg-blue-600 text-white shadow rounded w-full flex items-center justify-center gap-1">
          Pickup Pending <GiCardPickup />
        </p>
      );
    }

    if (order.status.completed) {
      return (
        <p className="flex flex-col border shadow rounded overflow-hidden bg-green-600 w-full">
          <span className="px-2 py-1 text-white">Order Completed On:</span>
          <span className="bg-white px-2">
            {order.pickedUpDetails.pickedUpDate}
          </span>
        </p>
      );
    }

    if (order.status.cancelled) {
      return (
        <p className="px-4 py-1 bg-red-600 text-white shadow rounded w-full flex items-center justify-center gap-1">
          Order Cancelled <GiCardPickup />
        </p>
      );
    }

    // Return null or some default content if none of the conditions match
    return null;
  };

  const orderCurrentStatus = (status) => {
    if (status.pending) return "Pending";
    if (status.completed) return "Completed";
    if (status.cancelled) return "Cancelled";
    return "Unknown";
  };

  const handleViewBtnColor = (status) => {
    if (status.pending) return "bg-blue-500 hover:bg-blue-700";
    if (status.completed) return "bg-green-600 hover:bg-green-700";
    if (status.cancelled) return "bg-red-600 hover:bg-red-700";
    return "bg-black text-white";
  };

  const handleOrderView = (orderId) => {
    const selectedOrder = ordersData.find((order) => order.id === orderId);
    setOrderToView(selectedOrder);
    setOrderViewOpen(true);
    console.log("setOrderToView", selectedOrder);
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

  // const headers = [
  //   "Order Details",
  //   "Product",
  //   "Customer Details",
  //   "Address",
  //   "OfferPrice",
  //   "Schedule Time",
  //   "PickUp Details",
  //   "Status",
  //   "Update Order",
  //   "Delete Order",
  // ];

  const headers = [
    "Order Details",
    "Customer Details",
    "Schedule Time",
    "Status",
    "Update Order",
    "Delete Order",
  ];

  const rowRenderer = (order) => (
    <>
      {/* Order Details: Order ID - Product Name - Variant - Product Price - Offer Price */}
      <td className="px-4 py-2 max-sm:text-xs ">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-start p-1 pl-2 rounded bg- text-[16px] max-sm:text-xs">
            <p className="flex max-sm:flex-col items-center justify-center gap-1">
              <span className="font-semibold">Order ID:</span>
              <span>{order.orderId}</span>
            </p>
            <p>
              <span className="font-semibold">Product: </span>
              <span>{order.productName} </span>
            </p>

            {/* Product Variant and Price */}
            <div className="flex gap-1 opacity-90 justify-center">
              {order.productCategory === "Mobile" ? (
                <div className="flex max-sm:flex-col items-center gap-1 pt-1">
                  <p>
                    <span className="font-semibold">Variant: </span>
                    {order.variant?.variantName}
                  </p>
                  <p>
                    <span className="font-semibold">Product Price: </span>
                    {order.variant?.price}
                  </p>
                </div>
              ) : (
                <p>
                  <span className="font-semibold">Product Price: </span>
                  {order.variant?.price}
                </p>
              )}
            </div>
            <p>
              <span className="font-semibold">Offer Price: </span>
              <span>{order.offerPrice}</span>
            </p>
          </div>
        </div>
      </td>

      {/* Product & Price */}
      {/* <td className="px-4 py-2 text-sm max-sm:text-xs">
        <span>{order.productName} </span>
        <div className="flex gap-1  opacity-50 justify-center">
          {order.productCategory === "Mobile" ? (
            <>
              <span>Variant: {order.variant?.variantName}</span>
              <span>Price: {order.variant?.price}</span>
            </>
          ) : (
            <span>Price: {order.variant?.price}</span>
          )}
        </div>
      </td> */}

      {/* Customer Details */}
      <td className="py-2 flex items-center justify-center">
        <div className="flex flex-col items-start">
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>Name:</span>
            <span className="text-sm font-bold ">{order.customerName}</span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>Phone:</span>
            <span className="text-sm font-bold">{order.phone}</span>
          </p>
          <p className="text-xs flex flex-col items-center gap-1 max-sm:gap-0 max-sm:hidden">
            <span>Email:</span>
            <span className="text-xs font-bold">{order.email}</span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>City:</span>
            <span className=" font-bold">{order.addressDetails.city}</span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>State:</span>
            <span className=" font-bold">{order.addressDetails.state}</span>
          </p>
        </div>
      </td>

      {/* Address */}
      {/* <td className="w-[10%] px-4 py-2">
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
      </td> */}

      {/* Offer Price */}
      {/* <td className="px-4 py-2 text-lg max-sm:text-sm">{order.offerPrice}</td> */}

      {/* Schedule & Pickup Time */}
      <td className=" px-1 py-3 text-sm max-sm:text-xs">
        <div className="flex flex-col items-center justify-center gap-2 px-2">
          <p className="flex flex-col border rounded overflow-hidden bg-black/40 w-full">
            <span className="px-2 py-1 text-white">Order Schedule Time:</span>
            <span className="bg-white px-2">{order.schedulePickUp}</span>
          </p>

          {handleOrderStatus(order)}
        </div>
      </td>

      {/* Order Picked Up time / Detail */}
      {/* <td className="w-[10%] px-1 py-2">
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
      </td> */}

      {/* Status */}
      <td className="px-4 py-2 text-lg max-sm:text-sm font-bold">
        <span>{orderCurrentStatus(order.status)}</span>
      </td>

      {/* Recieved / View Button */}
      <td className="px-4 py-2 text-sm ">
        <div className="flex items-center justify-center">
          <Link
            to={`/admin/order-detail/${order.id}`}
            className={`text-white font-bold p-2 rounded flex items-center justify-center gap-1
                          ${handleViewBtnColor(order.status)}`}
          >
            <span>View Detail</span>
            <span>
              <FaHandsHoldingCircle />
            </span>
          </Link>

          {/* {order?.status?.pending ? (
            <button
              // onClick={() => handleOrderOpen(order.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded flex items-center justify-center gap-1"
            >
              <Link to={`/admin/order-detail/${order.id}`}>
                View Detail
              </Link>
              <span>
                <FaHandsHoldingCircle />
              </span>
            </button>
          ) : (
            <button
              onClick={() => handleOrderView(order.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded flex items-center justify-center gap-1"
            >
              <span>View</span>
              <span>
                <IoMdOpen />
              </span>
            </button>
          )} */}
        </div>
      </td>

      {/* Delete Button */}
      <td>
        <button
          // onClick={() => handleDelete(order.id)}
          onClick={() => {
            setModalOpen(true);
            setOrderToDelete(order.id);
          }}
          className="bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </td>
    </>
  );

  return (
    <>
      <div className="p-4">
        <h2 className=" text-2xl max-sm:text-lg text-center font-serif font-bold mb-4">
          Orders Table
        </h2>
        <Table
          headers={headers}
          data={ordersData}
          keyExtractor={(item) => item.id}
          rowRenderer={rowRenderer}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={orderToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* {isOpen && (
        <OrderRecieved setIsOpen={setIsOpen} selectedOrder={selectedOrder} />
      )} */}

      {/* {orderViewOpen && (
        <OrderView
          orderToView={orderToView}
          setOrderViewOpen={setOrderViewOpen}
        />
      )} */}
    </>
  );
};

export default OrdersList;

{
  /* <table className="w-full">
  <thead>
    <tr className="py-10 font-serif text-lg font-bold border shadow-xl text-green-800">
      <th className="px-4 py-4">Order ID</th>
      <th className="px-4 py-2 ">Product</th>
      <th className="px-4 py-2 ">Customer Details</th>
      <th className="px-4 py-2 ">Address</th>
      <th className="px-4 py-2 ">OfferPrice</th>
      <th className="px-4 py-2 ">Schedule Time</th>
      <th className="px-4 py-2 ">PickUp Details</th>
      <th className="px-4 py-2 ">Status</th>
      <th className="px-4 py-2 ">Update Order</th>
      <th className="px-4 py-2 ">Delete Order</th>
    </tr>
  </thead>

  <tbody className="text-center">
    {ordersData?.map((order, index) => (
      <tr
        key={`${order._id}-${index}`}
        className={index % 2 === 0 ? "bg-white" : "bg-gray-100 border"}
      >
        <td className="px-4 py-2">{order.orderId}</td>
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
            <span className="text-sm font-bold">{order.customerName}</span>
          </h2>
          <h2 className="text-xs">
            Phone: <span className="text-sm font-bold">{order.phone}</span>
          </h2>
          <h2 className="text-xs">
            Email: <span className="text-sm font-bold">{order.email}</span>
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
</table>; */
}

// Order detail from order recieve
{
  /* <div className="text-center mb-2">
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
            </div> */
}

// Order recieved complete
{
  /* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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

    <Table
      headers={orderDetailHeader}
      data={[selectedOrder]}
      keyExtractor={(item) => item.id}
      rowRenderer={detailsRowRenderer}
    />

    <hr />

    <div onSubmit={handleSubmit} className="text-center mt-4">
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 items-center">
          <div className="">
            <h2 className="text-lg">
              Required Documents
              <span className="text-red-600">*</span>
            </h2>
          </div>
          <div className="flex">
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
          </div>
        </div>
        <hr className="w-1/3 mx-auto" />
        <div className="flex flex-col gap-1">
          <div className="">
            <h2 className="text-lg">Optional Documents</h2>
          </div>
          <div className="flex items-center">
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
                  <span className="font-bold">{selectedOrder.offerPrice}</span>
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
</div>; */
}

// Order to view Open
{
  // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //   <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
  //     <div className="flex justify-between items-center">
  //       <h2 className="text-xl font-semibold mb-4">Order Received</h2>
  //       <button
  //         onClick={() => setOrderViewOpen(false)}
  //         className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
  //       >
  //         x
  //       </button>
  //     </div>
  //     <div className="text-center mb-2">
  //       <h2 className="text-xl">Order Detail:</h2>
  //       <div>
  //         <div className="flex justify-center">
  //           <h2 className="px-4 py-2">Order ID: {orderToView.orderId}</h2>
  //           <h2 className="px-4 py-2">
  //             Status: {orderToView.status.toUpperCase()}
  //           </h2>
  //         </div>
  //         <div className="flex justify-center">
  //           <h2 className="px-4 py-2">
  //             Schedule PickUp:{" "}
  //             <span className="font-semibold">
  //               {orderToView.schedulePickUp}
  //             </span>
  //           </h2>
  //           <h2 className="px-4 py-2">
  //             Picked Up By:{" "}
  //             <span className="font-semibold">
  //               {orderToView.pickedUpDetails.agentName}
  //             </span>
  //           </h2>
  //           <h2 className="px-4 py-2">
  //             Picked Up On:{" "}
  //             <span className="font-semibold">
  //               {orderToView.pickedUpDetails.pickedUpDate}
  //             </span>
  //           </h2>
  //         </div>
  //         <h2 className="px-4 py-2">
  //           <div className="flex flex-col items-center">
  //             <h2>Customer Name: {orderToView.customerName}</h2>
  //             <div className="flex items-center justify-center gap-3 border p-1 rounded">
  //               <div>
  //                 <h2>Customer ID Front:</h2>
  //                 <img
  //                   src={
  //                     import.meta.env.VITE_APP_BASE_URL +
  //                     orderToView.customerProofFront
  //                   }
  //                   alt="ConditionLabel"
  //                   className="w-[100px] h-[100px] mx-auto "
  //                 />
  //                 {/* <button
  //                   onClick={() => {
  //                     openImageInNewWindow(
  //                       import.meta.env.VITE_APP_BASE_URL +
  //                         orderToView.customerProofFront
  //                     );
  //                   }}
  //                 >
  //                   View in New Window
  //                 </button> */}
  //                 <button
  //                   onClick={() => {
  //                     downloadImage(
  //                       import.meta.env.VITE_APP_BASE_URL +
  //                         orderToView.customerProofFront,
  //                       `${orderToView.customerName}-customerProofFront`
  //                     );
  //                   }}
  //                   className="bg-green-600 px-2 rounded text-white"
  //                 >
  //                   Download
  //                 </button>
  //               </div>
  //               <div>
  //                 <h2>Customer ID Back:</h2>
  //                 <img
  //                   src={
  //                     import.meta.env.VITE_APP_BASE_URL +
  //                     orderToView.customerProofBack
  //                   }
  //                   alt="ConditionLabel"
  //                   className="w-[100px] h-[100px] mx-auto "
  //                   onClick={() => downloadImage()}
  //                 />
  //                 <button
  //                   onClick={() => {
  //                     downloadImage(
  //                       import.meta.env.VITE_APP_BASE_URL +
  //                         orderToView.customerProofBack,
  //                       `${orderToView.customerName}-customerProofBack`
  //                     );
  //                   }}
  //                   className="bg-green-600 px-2 rounded text-white"
  //                 >
  //                   Download
  //                 </button>
  //               </div>
  //               <div>
  //                 {orderToView.customerOptional1 ? (
  //                   <>
  //                     <h2>Optional Proof1:</h2>
  //                     <img
  //                       src={
  //                         import.meta.env.VITE_APP_BASE_URL +
  //                         orderToView.customerOptional1
  //                       }
  //                       alt="ConditionLabel"
  //                       className="w-[100px] h-[100px] mx-auto "
  //                       onClick={() => downloadImage()}
  //                     />
  //                     <button
  //                       onClick={() => {
  //                         downloadImage(
  //                           import.meta.env.VITE_APP_BASE_URL +
  //                             orderToView.customerOptional1,
  //                           `${orderToView.customerName}-customerOptional1`
  //                         );
  //                       }}
  //                       className="bg-green-600 px-2 rounded text-white"
  //                     >
  //                       Download
  //                     </button>
  //                   </>
  //                 ) : null}
  //               </div>
  //               <div>
  //                 {orderToView.customerOptional2 ? (
  //                   <>
  //                     <h2>Optional Proof2</h2>
  //                     <img
  //                       src={
  //                         import.meta.env.VITE_APP_BASE_URL +
  //                         orderToView.customerOptional2
  //                       }
  //                       alt="ConditionLabel"
  //                       className="w-[100px] h-[100px] mx-auto "
  //                       onClick={() => downloadImage()}
  //                     />
  //                     <button
  //                       onClick={() => {
  //                         downloadImage(
  //                           import.meta.env.VITE_APP_BASE_URL +
  //                             orderToView.customerOptional2,
  //                           `${orderToView.customerName}-customerOptional2`
  //                         );
  //                       }}
  //                       className="bg-green-600 px-2 rounded text-white"
  //                     >
  //                       Download
  //                     </button>
  //                   </>
  //                 ) : null}
  //               </div>
  //             </div>
  //           </div>
  //         </h2>
  //         <h2 className="px-4 py-2">
  //           <div className="flex items-center justify-center gap-4">
  //             <div>
  //               <h2 className="text-lg">Product:</h2>
  //             </div>
  //             <div className="">
  //               {orderToView.productId?.name}{" "}
  //               <div className="flex text-sm opacity-50 gap-2 justify-center">
  //                 {orderToView.category === "Mobile" ? (
  //                   <span>
  //                     Variant {orderToView.variant?.variantName}
  //                   </span>
  //                 ) : null}
  //                 <span>Price {orderToView.variant?.price}</span>
  //               </div>
  //             </div>
  //           </div>
  //           {orderToView.deviceInfo ? (
  //             <div className="flex items-center justify-center gap-4">
  //               <div>
  //                 <h2 className="text-lg">Device Info:</h2>
  //               </div>
  //               <div className="">
  //                 <div className="flex text-sm opacity-70 gap-2 justify-center">
  //                   {orderToView.deviceInfo.serialNumber ? (
  //                     <p>
  //                       Serial Number:{" "}
  //                       <span className="font-bold">
  //                         {orderToView.deviceInfo.serialNumber}
  //                       </span>
  //                     </p>
  //                   ) : null}
  //                   {orderToView.deviceInfo.imeiNumber ? (
  //                     <p>
  //                       IMEI Number:{" "}
  //                       <span className="font-bold">
  //                         {orderToView.deviceInfo.imeiNumber}
  //                       </span>
  //                     </p>
  //                   ) : null}
  //                 </div>
  //               </div>
  //             </div>
  //           ) : null}
  //         </h2>
  //         <h2 className="px-4 py-2 flex gap-4 items-center justify-center">
  //           Offered Price:
  //           <span className="font-bold"> {orderToView.offerPrice}</span>
  //           Final Price:
  //           <span className="font-bold"> {orderToView.finalPrice}</span>
  //         </h2>
  //         <div className="flex justify-center">
  //           <h2 className="px-4 py-2">Email: {orderToView.email}</h2>
  //           <h2 className="px-4 py-2">PH: {orderToView.phone}</h2>
  //         </div>
  //         <h2 className="px-4 py-2">
  //           Address: {orderToView.addressDetails.address} <br />
  //           State: {orderToView.addressDetails.state}, City:{" "}
  //           {orderToView.addressDetails.city}, PinCode:{" "}
  //           {orderToView.addressDetails.pinCode}
  //         </h2>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}
