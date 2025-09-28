import { ORDER_STATUS } from "@features/api/ordersApi/types";

type OrderStatusValue = `${ORDER_STATUS}`;

export const orderCurrentStatus = (
  status: OrderStatusValue
): JSX.Element | string => {
  if (status === ORDER_STATUS.PENDING)
    return (
      <span className="text-blue-600 bg-blue-200 text-xs px-2 py-[2px] rounded-full ">
        Pending
      </span>
    );
  if (status === ORDER_STATUS.COMPLETED)
    return (
      <span className="text-green-600 bg-green-200 text-xs px-2 py-[2px] rounded-full">
        Completed
      </span>
    );
  if (status === ORDER_STATUS.CANCELLED)
    return (
      <span className="text-red-600 bg-red-200 text-xs px-2 py-[2px] rounded-full">
        Cancelled
      </span>
    );
  return "Unknown"; // Fallback for any unexpected status values
};

export const orderViewBtnColor = (status: OrderStatusValue): string => {
  if (status === ORDER_STATUS.PENDING)
    return "border border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white";
  if (status === ORDER_STATUS.COMPLETED)
    return "border border-green-600 text-green-600 hover:bg-green-700 hover:text-white";
  if (status === ORDER_STATUS.CANCELLED)
    return "border border-red-600 text-red-600 hover:bg-red-700 hover:text-white";
  return "bg-black text-white";
};
