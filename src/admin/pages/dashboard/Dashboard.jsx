import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetAllBrandQuery,
  useGetAllProductsQuery,
  useGetOrdersListQuery,
  useGetStocksQuery,
} from "../../../features/api";

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

  const [ordersPendingCount, setOrdersPendingCount] = useState();
  const [ordersReceivedCount, setOrdersReceivedCount] = useState();

  const [totalStocksIn, setTotalStocksIn] = useState(0);
  const [totalStocksOut, setTotalStocksOut] = useState(0);

  useEffect(() => {
    let countIn = 0,
      countOut = 0;
    if (!stocksDataLoading) {
      stocksData.map((s) => {
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
      const ordersPending = ordersData.filter(
        (order) => order.status.toLowerCase() === "pending"
      );
      console.log("ordersPending", ordersPending);
      setOrdersPendingCount(ordersPending.length);

      const ordersReceived = ordersData.filter(
        (order) => order.status.toLowerCase() === "received"
      );
      console.log("ordersReceived", ordersReceived);
      setOrdersReceivedCount(ordersReceived.length);
    }
  }, [ordersData]);

  console.log("ordersPendingCount", ordersPendingCount);
  console.log("ordersReceivedCount", ordersReceivedCount);

  const dispatch = useDispatch();

  return (
    <>
      <div className="grid grid-cols-4 mx-10 my-20 gap-2 items-center">
        {/* {isLoading ? <h1>Loading...</h1> : <h3>bjhb {data.name}</h3>} */}
        {!categoryLoading && (
          <div className="bg-orange-500 text-center text-white pt-4">
            <div className="text-start pl-4 my-2 text-lg">
              Total {categoryData.length} Categories
            </div>
            <div className="py-2 text-center bg-orange-600">
              <Link to={"/admin/categories-list"}>More Info</Link>
            </div>
          </div>
        )}

        {!brandsLoading && (
          <div className="bg-green-500 text-center text-white pt-4 ">
            <div className="text-start pl-4 my-2 text-lg">
              Total {brandsData.length} Brands
            </div>
            <div className="py-2 text-center bg-green-600">
              <Link to={"/admin/brands-list"}>More Info</Link>
            </div>
          </div>
        )}

        {!productsLoading && (
          <div className="bg-blue-500 text-center text-white pt-4 ">
            <div className="text-start pl-4 my-2 text-lg">
              Total {productsData.totalProducts} Products
            </div>
            <div className="py-2 text-center bg-blue-600">
              <Link to={"/admin/products-list"}>More Info</Link>
            </div>
          </div>
        )}
        {!ordersLoading && (
          <>
            <div className="bg-yellow-500 text-center text-white pt-4 ">
              <div className="text-start pl-4 my-2 text-lg">
                Total {ordersData.length} Orders
              </div>
              <div className="py-2 text-center bg-yellow-600">
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className="bg-slate-500 text-center text-white pt-4 ">
              <div className="text-start pl-4 my-2 text-lg">
                Total {ordersPendingCount} Orders Pending
              </div>
              <div className="py-2 text-center bg-slate-600">
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className="bg-cyan-500 text-center text-white pt-4 ">
              <div className="text-start pl-4 my-2 text-lg">
                Total {ordersReceivedCount} Orders Received / Completed
              </div>
              <div className="py-2 text-center bg-cyan-600">
                <Link to={"/admin/orders"}>More Info</Link>
              </div>
            </div>
            <div className="bg-red-700 text-center text-white pt-4 ">
              <div className="text-start pl-4 my-2 text-lg">
                Total {totalStocksIn} Stocks In
              </div>
              <div className="py-2 text-center bg-red-800">
                <Link to={"/admin/manage-stocks"}>More Info</Link>
              </div>
            </div>
            <div className="bg-pink-400 text-center text-white pt-4 ">
              <div className="text-start pl-4 my-2 text-lg">
                Total {totalStocksOut} Stocks Out
              </div>
              <div className="py-2 text-center bg-pink-600">
                <Link to={"/admin/manage-stocks"}>More Info</Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
