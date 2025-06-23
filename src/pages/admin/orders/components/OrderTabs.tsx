import { IOrdersCount } from "@features/api/ordersApi/types";
import {
  IOrdersDisplaying,
  TDisplayType,
} from "@pages/admin/orders/OrdersList";
import { FC } from "react";

interface IOrderTabsProps {
  handleDisplay: (show: TDisplayType) => void;
  ordersDisplaying: IOrdersDisplaying;
  ordersCount: IOrdersCount;
}

export const OrderTabs: FC<IOrderTabsProps> = ({
  handleDisplay,
  ordersDisplaying,
  ordersCount,
}) => {
  const tabStyle =
    "w-full flex items-center justify-center gap-1 py-3 transition-all ease-linear duration-1000";
  const activeTab = "border-b-4 max-sm:border-b-2 border-b-secondary";
  const countStyle =
    "border bg-black text-white px-2 max-sm:px-1 max-sm:text-xs rounded-full ";

  const todaysTotalCount = (): number => {
    const { cancelled, completed, pending } = ordersCount.today;
    return cancelled + completed + pending;
  };

  return (
    <div className="w-full grid grid-cols-4 max-sm:grid-cols-[1fr,1fr,1fr,auto] max-sm:px-2 border text-[16px] max-sm:text-xs">
      <button
        className={`col-auto ${tabStyle} ${
          ordersDisplaying.today ? activeTab : ""
        } `}
        onClick={() => handleDisplay("today")}
      >
        <span>Today</span>
        <span className={`${countStyle}`}>{todaysTotalCount()}</span>
      </button>

      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.pending ? activeTab : ""
        } `}
        onClick={() => handleDisplay("pending")}
      >
        <span>Pending</span>
        <span className={`${countStyle}`}>{ordersCount.total.pending}</span>
      </button>

      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.completed ? activeTab : ""
        }`}
        onClick={() => handleDisplay("completed")}
      >
        <span>Completed</span>
        <span className={`${countStyle}`}>{ordersCount.total.completed}</span>
      </button>

      <button
        className={`col-span-1 ${tabStyle} ${
          ordersDisplaying.cancelled ? activeTab : ""
        }`}
        onClick={() => handleDisplay("cancelled")}
      >
        <span>Cancelled</span>
        <span className={`${countStyle}`}>{ordersCount.total.cancelled}</span>
      </button>
    </div>
  );
};
