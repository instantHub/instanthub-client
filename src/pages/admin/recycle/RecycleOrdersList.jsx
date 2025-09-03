import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery, useGetRecycleOrdersQuery } from "@api";
import RecycleOrderCard from "./RecycleOrderCard";
import { Loading } from "@components/user";
import { CurrentOrdersAndCount, OrderTabs } from "../orders/components";

const RecycleOrdersList = () => {
  const { data: recycleOrdersData, isLoading: recycleOrdersDataloading } =
    useGetRecycleOrdersQuery();
  console.log("recycleOrdersData", recycleOrdersData);

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoriesQuery();
  const [categoryImages, setCategoryImages] = useState({});

  const [recycleOrdersDisplaying, setRecycleOrdersDisplaying] = useState({
    pending: true,
    completed: false,
    cancelled: false,
    history: false,
  });

  function handleDisplay(show) {
    console.log(show);
    let updatedDisplay = {};
    Object.entries(recycleOrdersDisplaying).map(([key, _]) => {
      if (show == key) updatedDisplay[show] = true;
      else updatedDisplay[key] = false;
    });
    console.log("updatedDisplay", updatedDisplay);
    setRecycleOrdersDisplaying(updatedDisplay);
  }

  const [recycleOrdersCount, setRecycleOrdersCount] = useState({});
  // console.log("recycleOrdersCount", recycleOrdersCount);

  // Setting Category Images
  useEffect(() => {
    if (categoryData) {
      let images = categoryData.reduce((acc, ite) => {
        if (!acc[ite.name]) acc[ite.name] = ite.image;
        return acc;
      }, {});
      setCategoryImages(images);
    }
  }, [categoryData]);

  // ordersCount calculation
  useEffect(() => {
    if (recycleOrdersData) {
      let initialCounts = { pending: 0, completed: 0, cancelled: 0, total: 0 };
      const count = recycleOrdersData.reduce((acc, ite) => {
        if (ite.status.pending) {
          acc.pending += 1;
        } else if (ite.status.completed) {
          acc.completed += 1;
        } else if (ite.status.cancelled) {
          acc.cancelled += 1;
        }
        acc.total += 1;

        return acc;
      }, initialCounts);
      setRecycleOrdersCount(count);
    }
  }, [recycleOrdersData]);

  if (recycleOrdersDataloading) return <Loading />;

  return (
    <div>
      {/* Pending - Completed - Cancelled Tabs */}
      <OrderTabs
        handleDisplay={handleDisplay}
        ordersDisplaying={recycleOrdersDisplaying}
        ordersCount={recycleOrdersCount}
      />

      <div className="flex justify-center mt-2 text-[16px] max-sm:text-sm ">
        <CurrentOrdersAndCount
          ordersDisplaying={recycleOrdersDisplaying}
          ordersCount={recycleOrdersCount}
        />
      </div>

      {/* Reycle Orders Cards */}
      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="w-full px-10 max-sm:px-2 mx-auto grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {recycleOrdersData
            ?.filter((order) => {
              // Check if any of the keys in order.status match the true keys in ordersDisplaying
              return Object.keys(order.status).some((key) => {
                if (recycleOrdersDisplaying.history) return order;
                else return order.status[key] && recycleOrdersDisplaying[key];
              });
            })
            ?.map((order) => {
              return (
                <RecycleOrderCard
                  key={order.id}
                  data={order}
                  categoryImage={
                    categoryImages[order.productDetails.productCategory]
                  }
                />
              );
            })}
        </div>
      </div>
    </div>
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
            <tr className="py-10  text-lg border shadow-xl text-green-800">
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
