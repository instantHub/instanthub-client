import React from "react";

const CurrentOrdersAndCount = ({ ordersDisplaying = {}, ordersCount = {} }) => {
  const orderCurrentStatus = (status) => {
    if (status == "all")
      return (
        <span className="text-black bg-gradient-to-tr from-blue-200 via-green-200 to-red-200 text-lg max-sm:text-sm px-2 py-[2px] rounded ">
          All Orders
        </span>
      );
    if (status == "pending")
      return (
        <span className="text-blue-700 bg-blue-200 text-lg max-sm:text-sm px-2 py-[2px] rounded ">
          Pending Orders
        </span>
      );
    if (status == "completed")
      return (
        <span className="text-green-700 bg-green-200 text-lg max-sm:text-sm px-2 py-[2px] rounded">
          Completed Orders
        </span>
      );
    if (status == "cancelled")
      return (
        <span className="text-red-700 bg-red-200 text-lg max-sm:text-sm px-2 py-[2px] rounded">
          Cancelled Orders
        </span>
      );
    return "Unknown";
  };

  if (ordersDisplaying.all)
    return (
      <div className="flex flex-col items-center">
        {orderCurrentStatus("all")}
        {ordersCount.all === 0 && (
          <b className="text-black text-xl max-sm:text-lg my-10">
            No Orders To Display
          </b>
        )}
      </div>
    );
  if (ordersDisplaying.pending)
    return (
      <div className="flex flex-col items-center">
        {orderCurrentStatus("pending")}
        {ordersCount.pending === 0 && (
          <b className="text-black text-xl max-sm:text-lg my-10">
            No Pending Orders
          </b>
        )}
      </div>
    );
  if (ordersDisplaying.completed)
    return (
      <div className="flex flex-col items-center">
        {orderCurrentStatus("completed")}
        {ordersCount.completed === 0 && (
          <b className="text-black text-xl max-sm:text-lg my-10">
            No Completed Orders
          </b>
        )}
      </div>
    );
  if (ordersDisplaying.cancelled)
    return (
      <div className="flex flex-col items-center">
        {orderCurrentStatus("cancelled")}
        {ordersCount.cancelled === 0 && (
          <b className="text-black text-xl max-sm:text-lg my-10">
            No Cancelled Orders
          </b>
        )}
      </div>
    );
  return <p>Unknown</p>;
};

export default CurrentOrdersAndCount;
