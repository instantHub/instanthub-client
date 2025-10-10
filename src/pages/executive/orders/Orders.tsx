import { Button, Typography } from "@components/general";
import { Loading } from "@components/user";
import {
  useGetExecutiveOrdersByStatusQuery,
  useGetExecutiveOrdersQuery,
  useGetExecutiveScheduledOrdersQuery,
} from "@features/api";
import { selectAdminState } from "@features/slices";
import { OrderCard } from "./OrderCard";
import { useSelector } from "react-redux";
import { useCategoryImages } from "@hooks";
import { IOrder, ORDER_STATUS } from "@features/api/orders/types";
import { CompactOrderStatusLegend } from "@components/admin";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const ORDERS_API_MAP: Record<string, any> = {
  all: useGetExecutiveOrdersQuery,
  today: useGetExecutiveScheduledOrdersQuery,
  tomorrow: useGetExecutiveScheduledOrdersQuery,
};

export const Orders = () => {
  const { admin } = useSelector(selectAdminState);
  const { type = "all" } = useParams<{ type: "all" | "today" | "tomorrow" }>();

  const useGetOrders = ORDERS_API_MAP[type];

  const queryParams = useMemo(() => {
    if (type === "today" || type === "tomorrow") {
      return { day: type };
    }
    return undefined;
  }, [type]);

  const { data: executiveOrders, isLoading } = useGetOrders(queryParams);

  // const { data: executivePendingOrders } = useGetExecutiveOrdersByStatusQuery(
  //   { id: admin?._id!, status: ORDER_STATUS.PENDING },
  //   { skip: !admin?._id }
  // );
  // console.log("executivePendingOrders", executivePendingOrders);

  // const { data: executiveCompletedOrders } = useGetExecutiveOrdersByStatusQuery(
  //   { id: admin?._id!, status: ORDER_STATUS.COMPLETED },
  //   { skip: !admin?._id }
  // );
  // console.log("executiveCompletedOrders", executiveCompletedOrders);

  const { categoryImages } = useCategoryImages();

  const handleBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log("executiveOrders", executiveOrders);

  return (
    <div>
      <Button variant="outline" shape="square" onClick={handleBack}>
        Back
      </Button>
      <CompactOrderStatusLegend />
      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-10 max-sm:px-1 mx-auto">
          {executiveOrders?.data?.map(
            (order: IOrder) =>
              order && (
                <OrderCard
                  key={order.id}
                  data={order}
                  categoryImage={
                    categoryImages[order.productDetails?.productCategory] || ""
                  }
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
