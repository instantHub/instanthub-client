import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  useGetOrdersListQuery,
  useUploadCustomerProofImageMutation,
  useOrderReceivedMutation,
  useDeleteOrderMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();
  const [orderReceived] = useOrderReceivedMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  if (!ordersLoading) {
    console.log(ordersData);
  }
  console.log("ordersData", ordersData);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState("");
  const [orderView, setOrderView] = useState("");
  const [orderViewOpen, setOrderViewOpen] = useState(false);
  console.log("imageSelected1", imageSelected1);
  console.log("imageSelected2", imageSelected2);

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

  const handleOrderView = (orderId) => {
    const selectedOrder = ordersData.find((order) => order.id === orderId);
    setOrderView(selectedOrder);
    setOrderViewOpen(true);
    console.log("setOrderView", selectedOrder);
  };

  // File handler
  // const uploadFileHandler = async () => {
  //   const formData = new FormData();
  //   formData.append("image", imageSelected1);

  //   try {
  //     const res = await uploadCustomerProof(formData).unwrap();
  //     console.log("res.image", res.image);

  //     return res.image;
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };
  const uploadFileHandler = async (image) => {
    const formData = new FormData();
    if (image === "front") {
      formData.append("image", imageSelected1);
    } else if (image === "back") {
      formData.append("image", imageSelected2);
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

    console.log("handlesubmit ", imageURL1, imageURL2);

    // const formData = {
    //   orderId: selectedOrder.id,
    //   customerProof: imageURL,
    //   status: "received",
    // };
    const formData = {
      orderId: selectedOrder.id,
      customerProofFront: imageURL1,
      customerProofBack: imageURL2,
      status: "received",
    };

    try {
      const orderData = await orderReceived(formData);
      console.log("orderData", orderData);

      setIsOpen(false);

      // Clear the value of the file input
      fileInputRef1.current.value = "";
      fileInputRef2.current.value = "";
      // Mark the file input as required again
      fileInputRef1.current.required = true;
      fileInputRef2.current.required = true;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const openImageInNewWindow = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  // const downloadImage = (imageUrl) => {
  //   console.log("inside download image");

  //   const anchor = document.createElement("a");
  //   anchor.href = imageUrl;
  //   anchor.download = "image.jpg"; // Change the filename if needed
  //   anchor.click();
  // };

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

  return (
    <>
      {/* //Products based on the Category selected */}
      <div className="p-4 bg-black">
        <h2 className="text-white text-lg font-bold mb-4">Orders Table</h2>
        <div className="mb-4">
          <h1>Orders List</h1>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-gray-800">Order ID</th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Customer Name
              </th>
              <th className="px-4 py-2 text-white bg-gray-800">Product</th>
              <th className="px-4 py-2 text-white bg-gray-800">Email</th>
              <th className="px-4 py-2 text-white bg-gray-800">Phone</th>
              <th className="px-4 py-2 text-white bg-gray-800">Address</th>
              <th className="px-4 py-2 text-white bg-gray-800">OfferPrice</th>
              <th className="px-4 py-2 text-white bg-gray-800">Status</th>
              <th className="px-4 py-2 text-white bg-gray-800">Update Order</th>
              <th className="px-4 py-2 text-white bg-gray-800">Delete Order</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Products when Category is selected */}
            {!ordersLoading &&
              ordersData.map((order, index) => (
                <tr
                  key={`${order._id}-${index}`}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  {/* <td className="px-4 py-2">{product.category.name}</td> */}
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">
                    {order.productId.name}{" "}
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
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">
                    {order.address}
                    <br />
                    <span className="text-xs opacity-70">
                      pincode: {order.pinCode}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.offerPrice}</td>
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
          <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
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
              <h1 className="text-xl">Order Detail:</h1>
              <ul>
                <li className="px-4 py-2">Order ID: {selectedOrder.orderId}</li>
                <li className="px-4 py-2">
                  Customer Name: {selectedOrder.customerName}
                </li>
                <li className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <h1 className="text-lg">Product:</h1>
                    </div>
                    <div className="">
                      {selectedOrder.productId.name}{" "}
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
                  Address: {selectedOrder.address} <br />
                  PinCode: {selectedOrder.pinCode}
                </li>
              </ul>
            </div>

            <hr />

            <div onSubmit={handleSubmit} className="text-center mt-4">
              <form action="" className="flex flex-col gap-2">
                {/* ID Front Image */}
                <label htmlFor="name">Upload Front of Customer ID</label>
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

                {/* ID Back Image */}
                <label htmlFor="name">Upload Back of Customer ID</label>
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

                <input
                  type="submit"
                  value="Mark Received"
                  name=""
                  className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
                />
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
              <h1 className="text-xl">Order Detail:</h1>
              <div>
                <div className="flex justify-center">
                  <h1 className="px-4 py-2">Order ID: {orderView.orderId}</h1>
                  <h1 className="px-4 py-2">
                    Status: {orderView.status.toUpperCase()}
                  </h1>
                </div>
                <h1 className="px-4 py-2">
                  <div className="flex flex-col items-center">
                    <h1>Customer Name: {orderView.customerName}</h1>

                    <div className="flex items-center justify-center gap-3 border p-1 rounded">
                      {/* <h1>Customer ID:</h1>
                      <img
                        src={
                          import.meta.env.VITE_APP_BASE_URL +
                          orderView.customerProof
                        }
                        alt="ConditionLabel"
                        className="w-[100px] h-[100px] mx-auto "
                      /> */}
                      <div>
                        <h1>Customer ID Front:</h1>
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
                    </div>
                  </div>
                </h1>
                <h1 className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <h1 className="text-lg">Product:</h1>
                    </div>
                    <div className="">
                      {orderView.productId.name}{" "}
                      <div className="flex text-sm opacity-50 gap-2 justify-center">
                        <span>Variant {orderView.variant?.variantName}</span>
                        <span>Price {orderView.variant?.price}</span>
                      </div>
                    </div>
                  </div>
                </h1>
                <h1 className="px-4 py-2">
                  Offered Price: {orderView.offerPrice}
                </h1>
                <div className="flex justify-center">
                  <h1 className="px-4 py-2">Email: {orderView.email}</h1>
                  <h1 className="px-4 py-2">PH: {orderView.phone}</h1>
                </div>
                <h1 className="px-4 py-2">
                  Address: {orderView.address} <br />
                  PinCode: {orderView.pinCode}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersList;
