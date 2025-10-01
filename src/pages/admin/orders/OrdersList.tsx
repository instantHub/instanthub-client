import { useEffect, useState, useMemo, useCallback } from "react";
import {
  useGetCategoriesQuery,
  useLazyGetCancelledOrdersQuery,
  useLazyGetCompletedOrdersQuery,
  useLazyGetPendingOrdersQuery,
  useLazyGetTodaysOrdersQuery,
  useGetOrdersCountQuery,
} from "@api";

import { OrderCard } from "./components";
import { CurrentOrdersAndCount, OrderTabs } from "./components";
import { Loading } from "@components/user";

import { IOrder, IOrdersCount } from "@features/api/ordersApi/types";

export type TDisplayType = "today" | "pending" | "completed" | "cancelled";

export interface IOrdersDisplaying {
  pending: boolean;
  completed: boolean;
  cancelled: boolean;
  today: boolean;
}

export const OrdersList = () => {
  const [activeTab, setActiveTab] = useState<TDisplayType>("today");

  const { data: categoryData = [] } = useGetCategoriesQuery();
  const { data: ordersCountData } = useGetOrdersCountQuery();

  const [
    getTodaysOrders,
    { data: todaysOrders = [], isLoading: isLoadingToday },
  ] = useLazyGetTodaysOrdersQuery();

  const [
    getPendingOrders,
    { data: pendingOrders = [], isLoading: isLoadingPending },
  ] = useLazyGetPendingOrdersQuery();

  const [
    getCompletedOrders,
    { data: completedOrders = [], isLoading: isLoadingCompleted },
  ] = useLazyGetCompletedOrdersQuery();

  const [
    getCancelledOrders,
    { data: cancelledOrders = [], isLoading: isLoadingCancelled },
  ] = useLazyGetCancelledOrdersQuery();

  // Memoize category images to prevent unnecessary re-renders
  const categoryImages = useMemo(() => {
    return categoryData.reduce((acc: Record<string, string>, cat) => {
      if (!acc[cat.name]) acc[cat.name] = cat.image;
      return acc;
    }, {});
  }, [categoryData]);

  // Memoize fetch functions to prevent re-creation on every render
  const fetchFunctions = useMemo(
    () => ({
      today: getTodaysOrders,
      pending: getPendingOrders,
      completed: getCompletedOrders,
      cancelled: getCancelledOrders,
    }),
    [getTodaysOrders, getPendingOrders, getCompletedOrders, getCancelledOrders]
  );

  // Fetch data when tab changes
  useEffect(() => {
    const fetchFunction = fetchFunctions[activeTab];
    if (fetchFunction) {
      fetchFunction();
    }
  }, [activeTab, fetchFunctions]);

  // Memoize orders displaying object
  const ordersDisplaying: IOrdersDisplaying = useMemo(
    () => ({
      today: activeTab === "today",
      pending: activeTab === "pending",
      completed: activeTab === "completed",
      cancelled: activeTab === "cancelled",
    }),
    [activeTab]
  );

  // Memoize orders count with fallback
  const ordersCount: IOrdersCount = useMemo(
    () =>
      ordersCountData || {
        total: { pending: 0, completed: 0, cancelled: 0 },
        today: { pending: 0, completed: 0, cancelled: 0 },
      },
    [ordersCountData]
  );

  // Memoize loading state
  const isLoading = useMemo(
    () =>
      isLoadingToday ||
      isLoadingPending ||
      isLoadingCompleted ||
      isLoadingCancelled,
    [isLoadingToday, isLoadingPending, isLoadingCompleted, isLoadingCancelled]
  );

  // Memoize orders to display
  const ordersToDisplay: IOrder[] = useMemo(() => {
    switch (activeTab) {
      case "today":
        return todaysOrders;
      case "pending":
        return pendingOrders;
      case "completed":
        return completedOrders;
      case "cancelled":
        return cancelledOrders;
      default:
        return [];
    }
  }, [
    activeTab,
    todaysOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
  ]);

  // Memoize tab change handler
  const handleTabChange = useCallback((tab: TDisplayType) => {
    setActiveTab(tab);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <OrderTabs
        handleDisplay={handleTabChange}
        ordersDisplaying={ordersDisplaying}
        ordersCount={ordersCount}
      />

      <div className="flex justify-center mt-2 text-[16px] max-sm:text-sm">
        <CurrentOrdersAndCount
          ordersDisplaying={ordersDisplaying}
          ordersCount={ordersCount}
        />
      </div>

      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-10 max-sm:px-1 mx-auto">
          {ordersToDisplay?.map(
            (order) =>
              order && (
                <OrderCard
                  key={order.id}
                  data={order}
                  categoryImage={
                    categoryImages[order?.productDetails?.productCategory] || ""
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
