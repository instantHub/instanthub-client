import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetAllBrandQuery,
  useGetAllProductsQuery,
  useGetOrdersListQuery,
  useGetStocksQuery,
  useGetVariantsQuestionsQuery,
  useGetServicesQuery,
  useGetRecycleOrdersQuery,
} from "../../../features/api";
import axios from "axios";

const Dashboard = () => {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandQuery();
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProductsQuery({ search: "" });
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const { data: stocksData, isLoading: stocksDataLoading } =
    useGetStocksQuery();
  const { data: recycleOrdersData, isLoading: recycleOrdersDataloading } =
    useGetRecycleOrdersQuery();

  const [ordersPendingCount, setOrdersPendingCount] = useState();
  const [ordersReceivedCount, setOrdersReceivedCount] = useState();

  const [totalStocksIn, setTotalStocksIn] = useState(0);
  const [totalStocksOut, setTotalStocksOut] = useState(0);

  const divStyle =
    "relative text-center text-white pt-4 h-[120px] max-h-[120px] border rounded-lg";
  const divDesc = "text-start pl-4 text-lg";
  const divMoreBtn =
    "absolute bottom-0 w-full py-2 text-center rounded-lg cursor-pointer";

  useEffect(() => {
    let countIn = 0,
      countOut = 0;
    if (!stocksDataLoading) {
      stocksData?.map((s) => {
        if (s.stockStatus.toLowerCase().includes("in")) {
          countIn = countIn + 1;
        } else if (s.stockStatus.toLowerCase().includes("out")) {
          countOut = countOut + 1;
        }
      });
    }
    setTotalStocksIn(countIn);
    setTotalStocksOut(countOut);
  }, [stocksData]);

  useEffect(() => {
    if (!ordersLoading) {
      const ordersPending = ordersData?.filter(
        (order) => order.status.toLowerCase() === "pending"
      );
      // console.log("ordersPending", ordersPending);
      setOrdersPendingCount(ordersPending.length);

      const ordersReceived = ordersData?.filter(
        (order) => order.status.toLowerCase() === "received"
      );
      // console.log("ordersReceived", ordersReceived);
      setOrdersReceivedCount(ordersReceived.length);
    }
  }, [ordersData]);

  // console.log("ordersPendingCount", ordersPendingCount);
  // console.log("ordersReceivedCount", ordersReceivedCount);

  return (
    <>
      <div className="grid grid-cols-4 mx-10 my-20 gap-2 items-center">
        {/* {isLoading ? <h2>Loading...</h2> : <h3>bjhb {data.name}</h3>} */}
        {!categoryLoading && (
          <div className={` bg-orange-50 border-orange-500  ${divStyle}`}>
            <div className={`text-orange-500 ${divDesc}`}>
              Total {categoryData?.length} Categories
            </div>
            <div className={`bg-orange-200 text-orange-500 ${divMoreBtn}`}>
              <Link to={"/admin/categories-list"}>More Info</Link>
            </div>
          </div>
        )}

        {!brandsLoading && (
          <div className={` bg-green-50 border-green-500  ${divStyle}`}>
            <div className={`text-green-700 ${divDesc}`}>
              Total {brandsData?.length} Brands
            </div>
            <div className={`bg-green-200 text-green-700 ${divMoreBtn}`}>
              <Link to={"/admin/brands-list"}>More Info</Link>
            </div>
          </div>
        )}

        {!productsLoading && (
          <div className={`bg-blue-50 border-blue-500  ${divStyle}`}>
            <div className={`text-blue-700 ${divDesc}`}>
              Total {productsData?.totalProducts} Products
            </div>
            <div className={`bg-blue-200 text-blue-700 ${divMoreBtn}`}>
              <Link to={"/admin/products-list"}>More Info</Link>
            </div>
          </div>
        )}

        {!ordersLoading && (
          <>
            <div className={`bg-yellow-50 border-yellow-500 ${divStyle}`}>
              <div className={`text-yellow-700 ${divDesc}`}>
                Total {ordersData?.length} Orders
              </div>
              <div className={`bg-yellow-200 text-yellow-700 ${divMoreBtn}`}>
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className={`bg-slate-50 border-slate-500 ${divStyle}`}>
              <div className={`text-slate-700 ${divDesc}`}>
                Total {ordersPendingCount} Orders Pending
              </div>
              <div className={`bg-slate-200 text-slate-700 ${divMoreBtn}`}>
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className={`bg-cyan-500 ${divStyle}`}>
              <div className={`${divDesc}`}>
                Total {ordersReceivedCount} Orders Received / Completed
              </div>
              <div className={`bg-cyan-600 ${divMoreBtn}`}>
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className={`bg-red-50 border-red-500 ${divStyle}`}>
              <div className={`text-red-700 ${divDesc}`}>
                Total {totalStocksIn} Stocks In
              </div>
              <div className={`bg-red-200 text-red-700  ${divMoreBtn}`}>
                <Link to={"/admin/manage-stocks"}>More Info</Link>
              </div>
            </div>
            <div className={`bg-pink-500 ${divStyle}`}>
              <div className={`${divDesc}`}>
                Total {totalStocksOut} Stocks Out
              </div>
              <div className={`bg-pink-600 ${divMoreBtn}`}>
                <Link to={"/admin/manage-stocks"}>More Info</Link>
              </div>
            </div>
          </>
        )}

        {!recycleOrdersDataloading && (
          <div className={`bg-amber-300 ${divStyle}`}>
            <div className={`${divDesc}`}>
              Total {recycleOrdersData?.length} Recycle Order
            </div>
            <div className={`bg-amber-500 ${divMoreBtn}`}>
              <Link to={"/admin/recycle-orders"}>More Info</Link>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default React.memo(Dashboard);
