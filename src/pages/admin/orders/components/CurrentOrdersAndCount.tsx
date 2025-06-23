// import { IOrdersCount } from "@features/api/ordersApi/types";
// import { IOrdersDisplaying } from "@pages/admin/orders/OrdersList";
// import { FC } from "react";

// interface ICurrentOrdersAndCountProps {
//   ordersDisplaying: IOrdersDisplaying;
//   ordersCount: IOrdersCount;
// }

// export const CurrentOrdersAndCount: FC<ICurrentOrdersAndCountProps> = ({
//   ordersDisplaying,
//   ordersCount,
// }) => {
//   // console.log("ordersCount from CurrentOrdersAndCount", ordersDisplaying);
//   const orderCurrentStatus = (status: string) => {
//     if (status == "pending")
//       return (
//         <span className="text-blue-700 bg-blue-200 text-lg max-sm:text-sm px-2 py-[2px] rounded ">
//           Pending Orders
//         </span>
//       );
//     if (status == "completed")
//       return (
//         <span className="text-green-700 bg-green-200 text-lg max-sm:text-sm px-2 py-[2px] rounded">
//           Completed Orders
//         </span>
//       );
//     if (status == "cancelled")
//       return (
//         <span className="text-red-700 bg-red-200 text-lg max-sm:text-sm px-2 py-[2px] rounded">
//           Cancelled Orders
//         </span>
//       );
//     if (status == "today")
//       return (
//         <span className="text-black bg-gradient-to-tr from-blue-200 via-green-200 to-red-200 text-lg max-sm:text-sm px-2 py-[2px] rounded ">
//           Today's Orders
//         </span>
//       );
//     return "Unknown Status";
//   };

//   const todaysTotalCount = (): number => {
//     const { cancelled, completed, pending } = ordersCount.today;
//     return cancelled + completed + pending;
//   };

//   if (ordersDisplaying.today)
//     return (
//       <div className="flex flex-col items-center">
//         {orderCurrentStatus("today")}
//         {todaysTotalCount() === 0 && (
//           <b className="text-black text-xl max-sm:text-lg my-10">
//             No Orders To Display
//           </b>
//         )}
//       </div>
//     );
//   if (ordersDisplaying.pending)
//     return (
//       <div className="flex flex-col items-center">
//         {orderCurrentStatus("pending")}
//         {ordersCount.total.pending === 0 && (
//           <b className="text-black text-xl max-sm:text-lg my-10">
//             No Pending Orders
//           </b>
//         )}
//       </div>
//     );
//   if (ordersDisplaying.completed)
//     return (
//       <div className="flex flex-col items-center">
//         {orderCurrentStatus("completed")}
//         {ordersCount.total.completed === 0 && (
//           <b className="text-black text-xl max-sm:text-lg my-10">
//             No Completed Orders
//           </b>
//         )}
//       </div>
//     );
//   if (ordersDisplaying.cancelled)
//     return (
//       <div className="flex flex-col items-center">
//         {orderCurrentStatus("cancelled")}
//         {ordersCount.total.cancelled === 0 && (
//           <b className="text-black text-xl max-sm:text-lg my-10">
//             No Cancelled Orders
//           </b>
//         )}
//       </div>
//     );
//   return <p>Unknown Orders And Count</p>;
// };

import { IOrdersCount } from "@features/api/ordersApi/types";
import { IOrdersDisplaying } from "@pages/admin/orders/OrdersList";
import { FC, useMemo } from "react";

interface ICurrentOrdersAndCountProps {
  ordersDisplaying: IOrdersDisplaying;
  ordersCount: IOrdersCount;
}

// Status configuration object for better maintainability
const ORDER_STATUS_CONFIG = {
  pending: {
    label: "Pending Orders",
    className: "text-blue-700 bg-blue-200",
    emptyMessage: "No Pending Orders",
  },
  completed: {
    label: "Completed Orders",
    className: "text-green-700 bg-green-200",
    emptyMessage: "No Completed Orders",
  },
  cancelled: {
    label: "Cancelled Orders",
    className: "text-red-700 bg-red-200",
    emptyMessage: "No Cancelled Orders",
  },
  today: {
    label: "Today's Orders",
    className:
      "text-black bg-gradient-to-tr from-blue-200 via-green-200 to-red-200",
    emptyMessage: "No Orders To Display",
  },
} as const;

type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;

// Type guard for valid order status
const isValidOrderStatus = (status: string): status is OrderStatus => {
  return status in ORDER_STATUS_CONFIG;
};

// Reusable status badge component
const StatusBadge: FC<{ status: OrderStatus }> = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <span
      className={`${config.className} text-lg max-sm:text-sm px-2 py-[2px] rounded`}
    >
      {config.label}
    </span>
  );
};

// Reusable empty state component
const EmptyState: FC<{ message: string }> = ({ message }) => (
  <p className="text-black text-xl max-sm:text-lg my-10 font-bold">{message}</p>
);

export const CurrentOrdersAndCount: FC<ICurrentOrdersAndCountProps> = ({
  ordersDisplaying,
  ordersCount,
}) => {
  // Memoized calculation for today's total count
  const todaysTotalCount = useMemo(() => {
    const {
      cancelled = 0,
      completed = 0,
      pending = 0,
    } = ordersCount.today || {};
    return cancelled + completed + pending;
  }, [ordersCount.today]);

  // Determine current active status
  const activeStatus = useMemo(() => {
    const statusEntries = Object.entries(ordersDisplaying) as [
      OrderStatus,
      boolean
    ][];
    const activeEntry = statusEntries.find(([_, isActive]) => isActive);
    return activeEntry?.[0] || null;
  }, [ordersDisplaying]);

  // Early return for invalid or unknown status
  if (!activeStatus || !isValidOrderStatus(activeStatus)) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray-600">Unknown Orders Status</p>
      </div>
    );
  }

  // Get count for current status
  const getCountForStatus = (status: OrderStatus): number => {
    switch (status) {
      case "today":
        return todaysTotalCount;
      case "pending":
        return ordersCount.total?.pending || 0;
      case "completed":
        return ordersCount.total?.completed || 0;
      case "cancelled":
        return ordersCount.total?.cancelled || 0;
      default:
        return 0;
    }
  };

  const currentCount = getCountForStatus(activeStatus);
  const config = ORDER_STATUS_CONFIG[activeStatus];

  return (
    <div className="flex flex-col items-center">
      <StatusBadge status={activeStatus} />
      {currentCount === 0 && <EmptyState message={config.emptyMessage} />}
    </div>
  );
};
