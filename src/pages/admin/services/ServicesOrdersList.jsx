import React, { useState, useEffect } from "react";
import { useGetServicesOrdersQuery } from "@api/servicesApi";
import ServiceOrderCard from "./ServiceOrderCard";
import OrderTabs from "@components/admin/OrderTabs";
import CurrentOrdersAndCount from "@components/admin/CurrentOrdersAndCount";
import Loading from "@components/user/loader/Loading";

const ServicesOrdersList = () => {
  const { data: servicesOrders, isLoading: servicesOrdersLoading } =
    useGetServicesOrdersQuery();
  console.log("servicesOrders", servicesOrders);

  const [ordersDisplaying, setOrdersDiplaying] = useState({
    pending: true,
    completed: false,
    cancelled: false,
    history: false,
  });

  const [serviceOrdersCount, setServiceOrdersCount] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
    total: 0,
  });
  console.log("serviceOrdersCount", serviceOrdersCount);

  function handleDisplay(show) {
    console.log(show);
    let updatedDisplay = {};
    Object.entries(ordersDisplaying).map(([key, _]) => {
      if (show == key) updatedDisplay[show] = true;
      else updatedDisplay[key] = false;
    });
    console.log("updatedDisplay", updatedDisplay);
    setOrdersDiplaying(updatedDisplay);
  }

  // serviceOrdersCount calculation
  useEffect(() => {
    if (servicesOrders) {
      let initialCounts = { pending: 0, completed: 0, cancelled: 0, total: 0 };
      const count = servicesOrders.reduce((acc, ite) => {
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
      setServiceOrdersCount(count);
    }
  }, [servicesOrders]);

  if (servicesOrdersLoading) return <Loading />;

  return (
    <div>
      {/* Pending - Completed - Cancelled Tabs */}
      <OrderTabs
        handleDisplay={handleDisplay}
        ordersDisplaying={ordersDisplaying}
        ordersCount={serviceOrdersCount}
      />

      <div className="flex justify-center mt-2 text-[16px] max-sm:text-sm ">
        <CurrentOrdersAndCount
          ordersDisplaying={ordersDisplaying}
          ordersCount={serviceOrdersCount}
        />
      </div>

      {/* Orders Cards */}
      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="w-full grid grid-cols-3 gap-4 max-sm:gap-2 max-md:grid-cols-2 max-sm:grid-cols-1 px-10 max-sm:px-1 mx-auto">
          {servicesOrders
            ?.filter((order) => {
              // Check if any of the keys in order.status match the true keys in ordersDisplaying
              return Object.keys(order.status).some((key) => {
                if (ordersDisplaying.history) return order;
                else return order.status[key] && ordersDisplaying[key];
              });
            })
            ?.map((order) => {
              return <ServiceOrderCard key={order.id} data={order} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ServicesOrdersList;
