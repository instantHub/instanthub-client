import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../../../features/api/categories/categoriesApi";
import { useGetOrdersListQuery } from "../../../features/api";

import OrderCard from "./OrderCard";
import OrderTabs from "../../../components/admin/OrderTabs";
import CurrentOrdersAndCount from "../../../components/admin/CurrentOrdersAndCount";
import Loading from "../../../components/user/loader/Loading";

const OrdersList = () => {
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();

  const [categoryImages, setCategoryImages] = useState({});

  // console.log("ordersData", ordersData);

  const [ordersDisplaying, setOrdersDiplaying] = useState({
    pending: true,
    completed: false,
    cancelled: false,
    history: false,
  });

  const [ordersCount, setOrdersCount] = useState({});
  console.log("ordersCount", ordersCount);

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

  // ordersCount calculation
  useEffect(() => {
    if (ordersData) {
      let initialCounts = { pending: 0, completed: 0, cancelled: 0, total: 0 };
      const count = ordersData.reduce((acc, ite) => {
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
      setOrdersCount(count);
    }
  }, [ordersData]);

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

  if (ordersLoading) return <Loading />;

  return (
    <div>
      {/* Pending - Completed - Cancelled Tabs */}
      <OrderTabs
        handleDisplay={handleDisplay}
        ordersDisplaying={ordersDisplaying}
        ordersCount={ordersCount}
      />

      <div className="flex justify-center mt-2 text-[16px] max-sm:text-sm ">
        <CurrentOrdersAndCount
          ordersDisplaying={ordersDisplaying}
          ordersCount={ordersCount}
        />
      </div>

      {/* Orders Cards */}
      <div className="mt-2 mb-5 flex flex-col items-center">
        <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1 px-10 max-sm:px-1 mx-auto">
          {ordersData
            ?.filter((order) => {
              // Check if any of the keys in order.status match the true keys in ordersDisplaying
              return Object.keys(order.status).some((key) => {
                if (ordersDisplaying.history) return order;
                else return order.status[key] && ordersDisplaying[key];
              });
            })
            ?.reverse() // Reverse the filtered orders
            ?.map((order) => {
              return (
                <OrderCard
                  key={order.id}
                  data={order}
                  categoryImage={categoryImages[order.productCategory]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
