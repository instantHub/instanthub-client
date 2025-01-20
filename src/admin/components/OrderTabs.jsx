import React from "react";

const OrderTabs = ({ handleDisplay, ordersDisplaying, ordersCount }) => {
  const tabStyle =
    "w-full flex items-center justify-center gap-1 py-3 transition-all ease-linear duration-1000";
  const activeTab = "border-b-4 max-sm:border-b-2 border-b-secondary";
  const countStyle =
    "border bg-black text-white px-2 max-sm:px-1 max-sm:text-xs rounded-full ";

  return (
    <div className="w-full grid grid-cols-4 max-sm:grid-cols-[1fr,1fr,1fr,auto] max-sm:px-2 border text-[16px] max-sm:text-xs">
      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.pending ? activeTab : ""
        } `}
        onClick={() => handleDisplay("pending")}
      >
        <span>Pending</span>
        <span className={`${countStyle}`}>{ordersCount.pending}</span>
      </button>

      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.completed ? activeTab : ""
        }`}
        onClick={() => handleDisplay("completed")}
      >
        <span>Completed</span>
        <span className={`${countStyle}`}>{ordersCount.completed}</span>
      </button>

      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.cancelled ? activeTab : ""
        }`}
        onClick={() => handleDisplay("cancelled")}
      >
        <span>Cancelled</span>
        <span className={`${countStyle}`}>{ordersCount.cancelled}</span>
      </button>

      <button
        className={`col-auto ${tabStyle} ${
          ordersDisplaying.history ? activeTab : ""
        } `}
        onClick={() => handleDisplay("history")}
      >
        <span>History</span>
        <span className={`${countStyle}`}>{ordersCount.total}</span>
      </button>
    </div>
  );
};

export default OrderTabs;
