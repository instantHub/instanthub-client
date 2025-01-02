import React, { useState, useEffect } from "react";
import {
  useGetRecycleOrdersQuery,
  useDeleteRecycleOrderMutation,
} from "../../../features/api";
import RecycleOrderRecieved from "./RecycleOrderRecieved";
import RecycleOrderView from "./RecycleOrderView";
import Table from "../../components/TableView";
import { Link } from "react-router-dom";
import { FaHandsHoldingCircle } from "react-icons/fa6";
import ConfirmationModal from "../../components/ConfirmationModal";
import { GiCardPickup } from "react-icons/gi";

const RecycleOrdersList = () => {
  const { data: recycleOrdersData, isLoading: recycleOrdersDataloading } =
    useGetRecycleOrdersQuery();
  console.log("recycleOrdersData", recycleOrdersData);

  const [deleteRecycleOrder] = useDeleteRecycleOrderMutation();

  const [isOpen, setIsOpen] = useState(false);

  // CALENDER
  let schedulePickUpDate;

  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderToView, setOrderToView] = useState("");
  const [orderViewOpen, setOrderViewOpen] = useState(false);

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const handleDelete = async (recycleOrderId) => {
    console.log("handledelete recycleOrderId:", recycleOrderId);
    await deleteRecycleOrder(recycleOrderId);
  };

  const handleOrderOpen = (recycleOrder) => {
    setSelectedOrder(recycleOrder);
    setIsOpen(true);
    console.log("selectedOrder", selectedOrder);
  };

  const handleOrderView = (recycleOrder) => {
    setOrderToView(recycleOrder);
    setOrderViewOpen(true);
    console.log("setOrderToView", selectedOrder);
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
    if (status?.pending) return <span className="text-blue-600">Pending</span>;
    if (status?.completed)
      return <span className="text-green-600">Completed</span>;
    if (status?.cancelled)
      return <span className="text-red-600">Cancelled</span>;
    return "Unknown";
  };

  const handleViewBtnColor = (status) => {
    if (status.pending) return "bg-blue-500 hover:bg-blue-700";
    if (status.completed) return "bg-green-600 hover:bg-green-700";
    if (status.cancelled) return "bg-red-600 hover:bg-red-700";
    return "bg-black text-white";
  };

  // const headers = [
  //   "Recycle Order ID",
  //   "Product Details",
  //   "Customer Details",
  //   "Address Details",
  //   "Schedule Time",
  //   "Recycle Price",
  //   "PickUp Details",
  //   "Status",
  //   "Update Order",
  //   "Delete Order",
  // ];

  const headers = [
    "Recycle Order Details",
    "Customer Details",
    "Schedule Time",
    "Status",
    "Update Order",
    "Delete Order",
  ];

  const rowRenderer = (recycleOrder) => (
    <>
      {/* Order Details: Order ID - Product Name - Variant - Product Price - Offer Price */}
      <td className="px-4 py-2 max-sm:text-xs ">
        <div className="flex items-center justify-center">
          {/* Order ID - Product Details */}
          <div className="flex flex-col items-start p-1 pl-2 rounded bg- text-[16px] max-sm:text-xs">
            <p className="flex max-sm:flex-col items-center justify-center gap-1">
              <span className="font-semibold">Order ID:</span>
              <span>{recycleOrder.recycleOrderId}</span>
            </p>
            <p>
              <span className="font-semibold">Product: </span>
              <span>{recycleOrder.productDetails.productName} </span>
            </p>

            <p>
              <span className="font-semibold">Product Category: </span>
              <span>{recycleOrder.productDetails.productCategory}</span>
            </p>

            {/* Product Variant and Price */}
            <div className="flex gap-1 opacity-90 justify-center">
              {recycleOrder?.productDetails?.productCategory === "Mobile" ? (
                <div className="flex max-sm:flex-col items-center gap-1 pt-1">
                  <p>
                    <span className="font-semibold">Variant: </span>
                    {recycleOrder?.productDetails?.productVariant}
                  </p>
                  <p>
                    <span className="font-semibold">Recycle Price: </span>
                    {recycleOrder.recyclePrice}
                  </p>
                </div>
              ) : (
                <p>
                  <span className="font-semibold">Recycle Price: </span>
                  {recycleOrder.recyclePrice}
                </p>
              )}
            </div>
            <p>
              <span className="font-semibold">Device Status: </span>
              <span>{recycleOrder.productDetails.productStatus}</span>
            </p>
          </div>
        </div>
      </td>

      {/* Customer Details */}
      <td className="py-2 flex items-center justify-center">
        <div className="flex flex-col items-start">
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>Name:</span>
            <span className="text-sm font-bold ">
              {recycleOrder.customerName}
            </span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>Phone:</span>
            <span className="text-sm font-bold">{recycleOrder.phone}</span>
          </p>
          <p className="text-xs flex flex-col items-center gap-1 max-sm:gap-0 max-sm:hidden">
            <span>Email:</span>
            <span className="text-xs font-bold">{recycleOrder.email}</span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>City:</span>
            <span className=" font-bold">
              {recycleOrder.addressDetails.city}
            </span>
          </p>
          <p className="text-xs flex max-sm:flex-col items-center gap-1 max-sm:gap-0">
            <span>State:</span>
            <span className=" font-bold">
              {recycleOrder.addressDetails.state}
            </span>
          </p>
        </div>
      </td>

      {/* Schedule & Pickup Time */}
      <td className=" px-1 py-3 text-sm max-sm:text-xs">
        <div className="flex flex-col items-center justify-center gap-2 px-2">
          <p className="flex flex-col border rounded overflow-hidden bg-black/40 w-full">
            <span className="px-2 py-1 text-white">Order Schedule Time:</span>
            <span className="bg-white px-2">{recycleOrder.schedulePickUp}</span>
          </p>

          {handleOrderStatus(recycleOrder)}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-2 text-lg max-sm:text-sm font-bold">
        <span>{orderCurrentStatus(recycleOrder.status)}</span>
      </td>

      {/* Recieved / View Button */}
      <td className="px-4 py-2 text-sm ">
        <div className="flex items-center justify-center">
          <Link
            to={`/admin/recycleOrder-detail/${recycleOrder.id}`}
            className={`text-white font-bold p-2 rounded flex items-center justify-center gap-1
                             ${handleViewBtnColor(recycleOrder.status)}`}
          >
            <span>View Detail</span>
            <span>
              <FaHandsHoldingCircle />
            </span>
          </Link>
        </div>
      </td>

      {/* Delete Button */}
      <td>
        <button
          onClick={() => {
            setModalOpen(true);
            setOrderToDelete(recycleOrder.id);
          }}
          className="bg-red-600 text-white px-3 py-1 rounded-md"
        >
          Delete
        </button>
      </td>
    </>
  );

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
      <div className={`p-4`}>
        <h2 className=" text-lg font-bold mb-4">Recycle Orders Table</h2>

        {!recycleOrdersDataloading && (
          <Table
            headers={headers}
            data={recycleOrdersData}
            keyExtractor={(item) => item.id}
            rowRenderer={rowRenderer}
          />
        )}
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
        <div className="flex items-center justify-center ">
          <RecycleOrderRecieved
            selectedOrder={selectedOrder}
            setIsOpen={setIsOpen}
          />
        </div>
      )}

      {orderViewOpen && (
        <RecycleOrderView
          orderToView={orderToView}
          setOrderViewOpen={setOrderViewOpen}
        />
      )} */}
    </>
  );
};

export default RecycleOrdersList;

// Old RowRenderer
{
  // const rowRenderer = (recycleOrder) => (
  //   <>
  //     <td className="px-4 py-2">{recycleOrder.recycleOrderId}</td>
  //     <td className="px-4 py-2">
  //       {recycleOrder.productDetails.productName}{" "}
  //       <div className="flex gap-1 text-sm opacity-50 justify-center">
  //         {recycleOrder.productDetails.productCategory
  //           .toLowerCase()
  //           .includes("mobile") ? (
  //           <>
  //             <span>Variant {recycleOrder.productDetails.productVariant}</span>
  //           </>
  //         ) : null}
  //       </div>
  //     </td>
  //     <td className="px-4 py-2 flex flex-col items-center">
  //       <h2 className="text-xs">
  //         Customer Name:{" "}
  //         <span className="text-sm font-bold">{recycleOrder.customerName}</span>
  //       </h2>
  //       <h2 className="text-xs">
  //         Phone: <span className="text-sm font-bold">{recycleOrder.phone}</span>
  //       </h2>
  //       <h2 className="text-xs">
  //         Email: <span className="text-sm font-bold">{recycleOrder.email}</span>
  //       </h2>
  //     </td>
  //     <td className="w-[10%] px-4 py-2">
  //       <div className="flex flex-col">
  //         <span className="text-xs opacity-70">
  //           Address: {recycleOrder.addressDetails.address}
  //         </span>
  //         <span className="text-xs opacity-70">
  //           State: {recycleOrder.addressDetails.state}
  //         </span>
  //         <span className="text-xs opacity-70">
  //           City: {recycleOrder.addressDetails.city}
  //         </span>
  //         <span className="text-xs opacity-70">
  //           Pincode: {recycleOrder.addressDetails.pinCode}
  //         </span>
  //       </div>
  //     </td>
  //     <td className="px-1 py-2">{recycleOrder.schedulePickUp}</td>
  //     <td className="px-4 py-2">{recycleOrder.recyclePrice}</td>
  //     {/* Order Picked Up time */}
  //     <td className="w-[10%] px-1 py-2">
  //       {recycleOrder.status.toLowerCase() === "pending" ? (
  //         <h2>Pick Up is Pending</h2>
  //       ) : (
  //         <div className="flex flex-col justify-center">
  //           <h2 className="text-sm">
  //             Agent Name:
  //             <span className="font-bold">
  //               {recycleOrder.pickedUpDetails.agentName}
  //             </span>
  //           </h2>
  //           <h2 className="text-sm">
  //             Purchased Price:
  //             <span className="font-bold">{recycleOrder.finalPrice}</span>
  //           </h2>
  //           <h2 className="text-sm">
  //             Time:
  //             <span className="font-bold">
  //               {recycleOrder.pickedUpDetails.pickedUpDate}
  //             </span>
  //           </h2>
  //         </div>
  //       )}
  //     </td>
  //     <td className="px-4 py-2">
  //       {recycleOrder.status.toLowerCase() === "pending" ? (
  //         <h2>{recycleOrder.status.toUpperCase()}</h2>
  //       ) : (
  //         <h2>{recycleOrder.status.toUpperCase()}</h2>
  //       )}
  //     </td>
  //     {recycleOrder.status.toLowerCase() !== "received" ? (
  //       <td className="px-4 py-2 text-sm">
  //         <button
  //           onClick={() => handleOrderOpen(recycleOrder)}
  //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
  //         >
  //           Received
  //         </button>
  //       </td>
  //     ) : (
  //       <td className="px-4 py-2 text-sm">
  //         <button
  //           onClick={() => handleOrderView(recycleOrder)}
  //           className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 rounded"
  //         >
  //           View
  //         </button>
  //       </td>
  //     )}
  //     <td>
  //       <button
  //         onClick={() => handleDelete(recycleOrder.id)}
  //         className="bg-red-600 text-white px-3 py-1 rounded-md"
  //       >
  //         Delete
  //       </button>
  //     </td>
  //   </>
  // );
}

// Orders list table
{
  /* <table className="w-full">
          <thead>
            <tr className="py-10 font-serif text-lg border shadow-xl text-green-800">
              <th className="px-4 py-4">Recycle Order ID</th>
              <th className="px-4 py-2 ">Product Details</th>
              <th className="px-4 py-2 ">Customer Details</th>
              <th className="px-4 py-2 ">Address Details</th>
              <th className="px-4 py-2 ">Schedule Time</th>
              <th className="px-4 py-2 ">Recycle Price</th>
              <th className="px-4 py-2 ">PickUp Details</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Update Order</th>
              <th className="px-4 py-2 ">Delete Order</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {!recycleOrdersDataloading &&
              recycleOrdersData.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                  }
                >
                  <td className="px-4 py-2">{order.recycleOrderId}</td>
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

                  <td className="px-1 py-2">{order.schedulePickUp}</td>
                  <td className="px-4 py-2">{order.recyclePrice}</td>
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
        </table> */
}

// Order Recieved
{
  // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //   <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
  //     <div className="flex justify-between items-center">
  //       <h2 className="text-xl font-semibold mb-4">
  //         Recycle Order Received
  //       </h2>
  //       <button
  //         onClick={() => setIsOpen(false)}
  //         className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
  //       >
  //         x
  //       </button>
  //     </div>
  //     <table className="mx-auto border-collapse w-[90%]">
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Recycle Order ID
  //         </th>
  //         <td className="p-2 border font-semibold">
  //           {selectedOrder.recycleOrderId}
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Product
  //         </th>
  //         <td className="p-2 border">
  //           <div className="flex items-center gap-2">
  //             <span className="font-semibold">
  //               {selectedOrder.productDetails.productName}
  //             </span>
  //             {selectedOrder.productDetails.productCategory
  //               .toLowerCase()
  //               .includes("mobile") ? (
  //               <div>
  //                 <span className="">Variant: </span>
  //                 <span className="font-semibold">
  //                   {selectedOrder.productDetails.productVariant}
  //                 </span>
  //               </div>
  //             ) : null}
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Customer Details
  //         </th>
  //         <td className="p-2 border text-lg">
  //           <div className="flex flex-col">
  //             <div>
  //               Customer Name:
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.customerName}
  //               </span>
  //             </div>
  //             <div>
  //               Email:{" "}
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.email}
  //               </span>
  //             </div>
  //             <div>
  //               Phone:{" "}
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.phone}
  //               </span>
  //             </div>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Address Details
  //         </th>
  //         <td className="p-2 border text-lg">
  //           <div>
  //             <span className="text-lg font-semibold">
  //               {selectedOrder.addressDetails.address},{" "}
  //             </span>
  //           </div>
  //           <div className="flex items-center">
  //             <div>
  //               City:{" "}
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.addressDetails.city},{" "}
  //               </span>
  //             </div>
  //             <div>
  //               State:{" "}
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.addressDetails.state},{" "}
  //               </span>
  //             </div>
  //             <div>
  //               PinCode:
  //               <span className="text-lg font-semibold">
  //                 {selectedOrder.addressDetails.pinCode}.
  //               </span>
  //             </div>
  //           </div>
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Schedule PickUp Date
  //         </th>
  //         <td className="p-2 border text-lg font-semibold">
  //           {selectedOrder.schedulePickUp}
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">Status</th>
  //         <td className="p-2 border text-lg font-semibold">
  //           {selectedOrder.status}
  //         </td>
  //       </tr>
  //       <tr className="border-b">
  //         <th className="text-right bg-slate-100 w-[30%] px-5">
  //           Recycle Price:
  //         </th>
  //         <td className="p-2 border text-lg font-semibold">
  //           {selectedOrder.recyclePrice}
  //         </td>
  //       </tr>
  //     </table>
  //     <hr />
  //     <div onSubmit={handleSubmit} className="text-center mt-4">
  //       <form action="" className="flex flex-col gap-4">
  //         {/* Mandatory Images */}
  //         <div className="flex flex-col gap-1 items-center">
  //           <div className="">
  //             <h2 className="text-lg">
  //               Required Documents<span className="text-red-600">*</span>
  //             </h2>
  //           </div>
  //           <div className="flex">
  //             {/* ID Front Image */}
  //             {/* <div> */}
  //             <label htmlFor="name">
  //               Upload Front of Customer ID
  //               <span className="text-red-600">*</span>
  //             </label>
  //             <input
  //               type="file"
  //               name="name"
  //               id=""
  //               ref={fileInputRef1}
  //               placeholder="Enter Name"
  //               className="border rounded px-2 py-1 w-1/3 mx-auto"
  //               onChange={(e) => {
  //                 setImageSelected1(e.target.files[0]);
  //               }}
  //               required
  //             />
  //             {/* </div> */}
  //             {/* ID Back Image */}
  //             {/* <div> */}
  //             <label htmlFor="name">
  //               Upload Back of Customer ID
  //               <span className="text-red-600">*</span>
  //             </label>
  //             <input
  //               type="file"
  //               name="name"
  //               id=""
  //               ref={fileInputRef2}
  //               placeholder="Enter Name"
  //               className="border rounded px-2 py-1 w-1/3 mx-auto"
  //               onChange={(e) => {
  //                 setImageSelected2(e.target.files[0]);
  //               }}
  //               required
  //             />
  //             {/* </div> */}
  //           </div>
  //         </div>
  //         <hr className="w-1/3 mx-auto" />
  //         {/* Optional Images */}
  //         <div className="flex flex-col gap-1">
  //           <div className="">
  //             <h2 className="text-lg">Optional Documents</h2>
  //           </div>
  //           <div className="flex items-center">
  //             {/* Optional Image 1 */}
  //             <label htmlFor="name">Upload Optional Doc 1</label>
  //             <input
  //               type="file"
  //               name="name"
  //               id=""
  //               ref={fileInputRef4}
  //               placeholder=""
  //               className="border rounded px-2 py-1 w-1/3 mx-auto"
  //               onChange={(e) => {
  //                 setImageSelected3(e.target.files[0]);
  //               }}
  //             />
  //             {/* Optional Image 2 */}
  //             <label htmlFor="name">Upload Optional Doc 2</label>
  //             <input
  //               type="file"
  //               name="name"
  //               id=""
  //               ref={fileInputRef3}
  //               placeholder=""
  //               className="border rounded px-2 py-1 w-1/3 mx-auto"
  //               onChange={(e) => {
  //                 setImageSelected4(e.target.files[0]);
  //               }}
  //             />
  //           </div>
  //           <div className="flex items-center justify-center gap-2 mt-5">
  //             <div className="flex items-center">
  //               <label htmlFor="pickedUpBy">
  //                 Order Picked Up By:
  //                 <span className="text-red-600">* </span>
  //               </label>
  //               <input
  //                 type="text"
  //                 name="pickedUpBy"
  //                 id=""
  //                 ref={fileInputRef3}
  //                 placeholder="Picked Up By Name"
  //                 className="border rounded px-1 mx-auto"
  //                 onChange={(e) => {
  //                   setPickedUpBy(e.target.value);
  //                 }}
  //                 required
  //               />
  //             </div>
  //             <div className="flex flex-col items-center">
  //               <div>
  //                 <label htmlFor="finalPrice">
  //                   Recycle Offered Price:{" "}
  //                   <span className="font-bold">
  //                     {selectedOrder.recyclePrice}
  //                   </span>
  //                 </label>
  //               </div>
  //               <div className="flex items-center">
  //                 <label htmlFor="finalPrice">
  //                   Purchase Price:
  //                   <span className="text-red-600">* </span>
  //                 </label>
  //                 <input
  //                   type="number"
  //                   name="finalPrice"
  //                   id=""
  //                   placeholder="Purchase Price"
  //                   className="border rounded px-1 mx-auto"
  //                   onChange={(e) => {
  //                     setFinalPrice(e.target.value);
  //                   }}
  //                   required
  //                 />
  //               </div>
  //             </div>
  //             <div>
  //               <label htmlFor="datepicker">
  //                 Select Date and Time:
  //                 <span className="text-red-600">* </span>
  //               </label>
  //               <DatePicker
  //                 selected={selectedDate}
  //                 onChange={handleTimeChange}
  //                 showTimeSelect
  //                 // timeFormat="HH:mm" // 24 hours
  //                 timeFormat="h:mm aa" // 12 hours
  //                 timeIntervals={30}
  //                 dateFormat="MMMM d, yyyy h:mm aa"
  //                 timeCaption="Time"
  //                 // minDate={schedulePickUpDate}
  //                 minDate={currentDate}
  //                 minTime={minTime}
  //                 maxTime={maxTime}
  //                 placeholderText="Select PickedUp Time"
  //                 className="border px-1 rounded"
  //                 required
  //               />
  //               {selectedDate && (
  //                 <p className="py-2 text-xl">
  //                   Picket Up time: `
  //                   {selectedDate.toLocaleString("en-US", {
  //                     month: "long",
  //                   })}{" "}
  //                   {selectedDate.getDate()}, {selectedDate.getFullYear()}{" "}
  //                   {selectedDate.toLocaleTimeString("en-US", {
  //                     hour: "numeric",
  //                     minute: "numeric",
  //                     hour12: true,
  //                   })}
  //                   `
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //           <div className="flex justify-center mt-5 gap-2 items-center">
  //             <div>
  //               <label htmlFor="finalPrice">Serial No:</label>
  //               <input
  //                 type="text"
  //                 name="serialNo"
  //                 id=""
  //                 placeholder="Serial No"
  //                 className="border rounded px-1 mx-auto"
  //                 onChange={(e) => {
  //                   setDeviceInfo({
  //                     ...deviceInfo,
  //                     serialNumber: e.target.value,
  //                   });
  //                 }}
  //               />
  //             </div>
  //             <div>
  //               <label htmlFor="finalPrice">IMEI No:</label>
  //               <input
  //                 type="text"
  //                 name="IMEI"
  //                 id=""
  //                 placeholder="IMEI No"
  //                 className="border rounded px-1 mx-auto"
  //                 onChange={(e) => {
  //                   setDeviceInfo({
  //                     ...deviceInfo,
  //                     imeiNumber: e.target.value,
  //                   });
  //                 }}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //         {!orderLoading ? (
  //           <input
  //             type="submit"
  //             value="Mark Received"
  //             name=""
  //             className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
  //           />
  //         ) : (
  //           <input
  //             type="submit"
  //             value="Loading"
  //             name=""
  //             className="border rounded px-2 py-1 w-1/5 bg-green-300 text-white cursor-none mx-auto"
  //           />
  //         )}
  //       </form>
  //     </div>
  //   </div>
  // </div>
}

// Order View
{
  // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //   <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
  //     <div className="flex justify-between items-center">
  //       <h2 className="text-xl font-semibold mb-4">
  //         Recycle Order Received
  //       </h2>
  //       <button
  //         onClick={() => setOrderViewOpen(false)}
  //         className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
  //       >
  //         x
  //       </button>
  //     </div>
  //     <div className="mb-2">
  //       {/* <h2 className="text-xl">Order Detail:</h2> */}
  //       <table className="mx-auto border-collapse w-[90%]">
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Recycle Order ID
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.recycleOrderId}
  //           </td>
  //         </tr>
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Product
  //           </th>
  //           <td className="p-2 border">
  //             <div className="flex items-center gap-2">
  //               <span className="font-semibold">
  //                 {orderToView.productDetails.productName}
  //               </span>
  //               {orderToView.productDetails.productCategory
  //                 .toLowerCase()
  //                 .includes("mobile") ? (
  //                 <div>
  //                   <span className="">Variant: </span>
  //                   <span className="font-semibold">
  //                     {orderToView.productDetails.productVariant}
  //                   </span>
  //                 </div>
  //               ) : null}
  //             </div>
  //           </td>
  //         </tr>
  //         {orderToView.deviceInfo ? (
  //           <tr className="border-b">
  //             <th className="text-right bg-slate-100 w-[30%] px-5">
  //               Device Info
  //             </th>
  //             <td className="p-2 border">
  //               <div className="flex items-center justify- gap-4">
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
  //             </td>
  //           </tr>
  //         ) : null}
  //         {/* Customer Details */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Customer Details
  //           </th>
  //           <td className="p-2 border">
  //             <div className="flex flex-col">
  //               <div>
  //                 Customer Name:{" "}
  //                 <span className="font-semibold">
  //                   {orderToView.customerName}
  //                 </span>
  //               </div>
  //               <div>
  //                 Email:{" "}
  //                 <span className="font-semibold">
  //                   {orderToView.email}
  //                 </span>
  //               </div>
  //               <div>
  //                 Phone:{" "}
  //                 <span className="font-semibold">
  //                   {orderToView.phone}
  //                 </span>
  //               </div>
  //             </div>
  //           </td>
  //         </tr>
  //         {/* Customer Proof */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Cusomer Proof
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             <div className="flex items-center justify-center gap-2 p-1 rounded">
  //               <div className="flex flex-col items-center gap-1">
  //                 <h2>Customer ID Front:</h2>
  //                 <img
  //                   src={
  //                     import.meta.env.VITE_APP_BASE_URL +
  //                     orderToView.customerProofFront
  //                   }
  //                   alt="ConditionLabel"
  //                   className="w-[100px] h-[100px] mx-auto "
  //                 />
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
  //               <div className="flex flex-col items-center gap-1">
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
  //               <div className="flex flex-col items-center gap-1">
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
  //               <div className="flex flex-col items-center gap-1">
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
  //           </td>
  //         </tr>
  //         {/* Address */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Address Details
  //           </th>
  //           <td className="p-2 border">
  //             <div>
  //               <span className="font-semibold">
  //                 {orderToView.addressDetails.address},{" "}
  //               </span>
  //             </div>
  //             <div className="flex items-center gap-1">
  //               <div>
  //                 City:{" "}
  //                 <span className="font-semibold">
  //                   {orderToView.addressDetails.city},
  //                 </span>
  //               </div>
  //               <div>
  //                 State:{" "}
  //                 <span className="font-semibold">
  //                   {orderToView.addressDetails.state},
  //                 </span>
  //               </div>
  //               <div>
  //                 PinCode:
  //                 <span className="font-semibold">
  //                   {orderToView.addressDetails.pinCode}.
  //                 </span>
  //               </div>
  //             </div>
  //           </td>
  //         </tr>
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Schedule PickUp Date
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.schedulePickUp}
  //           </td>
  //         </tr>
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Picked Up By
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.pickedUpDetails.agentName}
  //           </td>
  //         </tr>
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Picked Up Date
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.pickedUpDetails.pickedUpDate}
  //           </td>
  //         </tr>
  //         {/* status */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Status
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.status.toUpperCase()}
  //           </td>
  //         </tr>
  //         {/* Recycle Price */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Recycle Price
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.recyclePrice}
  //           </td>
  //         </tr>
  //         {/* Final Price */}
  //         <tr className="border-b">
  //           <th className="text-right bg-slate-100 w-[30%] px-5">
  //             Final Price
  //           </th>
  //           <td className="p-2 border font-semibold">
  //             {orderToView.finalPrice}
  //           </td>
  //         </tr>
  //       </table>
  //     </div>
  //   </div>
  // </div>
}
