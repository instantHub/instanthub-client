import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useDashboardDetailsQuery,
  useGetOrdersListQuery,
  useGetRecycleOrdersQuery,
} from "../../../features/api";
import Loading from "../../../components/Loading";
import MonthlyOrdersChart from "./MonthlyOrdersChart";
import DoughnutChart from "./DoughnutChart";
import RadarChart from "./RadarChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const Dashboard = () => {
  const { data: dashboardDetail, isLoading: dashboardDetailLoading } =
    useDashboardDetailsQuery();

  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();

  const { data: recycleOrdersData, isLoading: recycleOrdersLoading } =
    useGetRecycleOrdersQuery();

  console.log("dashboardDetail", dashboardDetail);
  // console.log("ordersData", ordersData);

  const divStyle =
    "relative text-center text-white pt-4 h-[120px] max-h-[120px] border rounded-lg";
  const divDesc = "text-start pl-4 text-lg";
  const divMoreBtn =
    "absolute bottom-0 w-full py-2 text-center rounded-lg cursor-pointer";

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const [monthlyOrders, setMonthlyOrders] = useState();
  const [monthlyRecycleOrders, setMonthlyRecycleOrders] = useState();

  const [categoriesChartData, setCategoriesChartData] = useState();
  const [brandsChartData, setBrandsChartData] = useState();
  const [productsChartData, setProductsChartData] = useState();

  const ordersStatus = [
    {
      label: "Pending",
      count: dashboardDetail?.ordersPendingCount,
    },
    {
      label: "Completed",
      count: dashboardDetail?.ordersCompletedCount,
    },
  ];
  const stockStatus = [
    {
      label: "Stock In",
      count: dashboardDetail?.stocksInCount,
    },
    {
      label: "Stock Out",
      count: dashboardDetail?.stocksOutCount,
    },
  ];

  // monthlyOrders & monthlyRecycleOrders
  useEffect(() => {
    console.log("UseEffect ordersData");
    if (ordersLoading) return;

    const orderDates = ordersData.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      const month = date.getMonth() + 1; // Months are zero-indexed
      const year = date.getFullYear();
      const monthYear = `${months[month]}-${year}`; // Format as "Month-Year"

      const existing = acc.find((item) => item.label === monthYear);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ label: monthYear, count: 1 });
        // acc.push({ month: monthYear, orders: 1 });
      }

      return acc;
    }, []);
    setMonthlyOrders(orderDates);
    // console.log("orderDates", orderDates);

    const recycleOrderDates = recycleOrdersData?.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      const month = date.getMonth() + 1; // Months are zero-indexed
      const year = date.getFullYear();
      const monthYear = `${months[month]}-${year}`; // Format as "Month-Year"

      const existing = acc.find((item) => item.label === monthYear);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ label: monthYear, count: 1 });
        // acc.push({ month: monthYear, orders: 1 });
      }

      return acc;
    }, []);
    setMonthlyRecycleOrders(recycleOrderDates);
    // console.log("recycleOrderDates", recycleOrderDates);
  }, [ordersData]);

  // Chart data for Categories, Brands and Products
  // Category has {name, default set Count = 1} // Brands has {category, brands[Array]} // Products has {categoryName, count}
  useEffect(() => {
    console.log("UseEffect dashboardDetail");

    if (dashboardDetailLoading) return;

    const catData = dashboardDetail?.categories.reduce((acc, curr) => {
      acc.push({ label: curr.name, count: 1 });
      return acc;
    }, []);
    // console.log("catData:", catData);
    setCategoriesChartData(catData);

    const brandData = dashboardDetail?.detailedProductsCount.reduce(
      (acc, curr) => {
        acc.push({
          label: `${curr.category} Brands`,
          count: curr.brands?.length,
        });
        return acc;
      },
      []
    );
    // console.log("brandData:", brandData);
    setBrandsChartData(brandData);

    const prodData = dashboardDetail?.productsCountByCategory.reduce(
      (acc, curr) => {
        acc.push({
          label: curr.categoryName,
          count: curr.count,
        });
        return acc;
      },
      []
    );
    // console.log("prodData:", prodData);
    setProductsChartData(prodData);
  }, [dashboardDetail]);

  // console.log("Charts Data monthlyOrders:", monthlyOrders);
  // console.log("Charts Data monthlyRecycleOrders:", monthlyRecycleOrders);
  // console.log("Charts Data categoriesChartData:", categoriesChartData);
  // console.log("Charts Data brandsChartData:", brandsChartData);
  // console.log("Charts Data productsChartData:", productsChartData);

  const colors = [
    {
      bgColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      bgColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
    {
      bgColor: "rgba(153, 102, 255, 0.6)",
      borderColor: "rgba(153, 102, 255, 1)",
    },
  ];

  // console.log("detailedProductsCount", dashboardDetail?.detailedProductsCount);

  if (dashboardDetailLoading) return <Loading />;

  return (
    <div className="mx-10 mt-5 max-sm:mx-2 pb-10">
      <div className="flex flex-col gap-20 max-sm:gap-10 pl-10">
        {/* Categories and Brands Chart */}
        <div className="flex flex-col gap-2 justify-around items-center border px-3 py-10 rounded-xl shadow-lg">
          <p className="font-serif text-3xl">Categories and Brand Chart</p>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 items-center w-full">
            {/* Categories */}
            <div className="flex flex-col items-center">
              <p className="text-center text-xl">Categories Chart</p>
              <div>
                <p>Total {dashboardDetail?.categories.length} Categories</p>
              </div>
              {/* <PieChart dataProp={dashboardDetail?.categories} /> */}
              {/* <DoughnutChart dataProp={categoriesChartData} /> */}
            </div>

            <hr className="lg:hidden py-5" />

            {/* Brands Chart */}
            <div className="flex flex-col items-center">
              <p className="text-center text-xl">Brands Chart</p>
              <div>
                <p>Total {dashboardDetail?.brandsCount} Brands</p>
              </div>
              {/* <DoughnutChart dataProp={dashboardDetail?.detailedProductsCount}
              chartFor="Brands"
            /> */}
              {/* <DoughnutChart dataProp={brandsChartData} /> */}
            </div>
          </div>
        </div>

        {/* Products Chart */}
        <div className="flex flex-col gap-10 items-center border py-10 rounded-xl shadow-lg px-3">
          <p className="font-serif text-3xl">Products Chart</p>
          {/* PRODUCTS */}
          <div className="flex flex-col items-center">
            <p className="text-center text-xl">Products Per Category Chart</p>
            <div>
              <p>Total {dashboardDetail?.productsCount} Products</p>
            </div>
            {/* DoughnutChart */}
            {/* <DoughnutChart dataProp={productsChartData} /> */}
          </div>

          {/* Brand wise products */}
          <div className="flex flex-wrap justify-center items-center">
            {dashboardDetail?.detailedProductsCount?.map((cat, i) => (
              <div key={i}>
                <p className="text-center text-sm">
                  Brand Wise Products of {cat.category}
                </p>
                {/* <BarChart
                  category={cat.category}
                  data={cat.brands}
                  xTitle="Brands"
                  yTitle="Count"
                  color={colors[i]}
                /> */}
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="flex flex-col items-center border px-3 py-10 max-sm:py-5 rounded-xl shadow-lg">
          <p className="font-serif text-3xl">Orders Chart</p>
          <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center">
            {/* ORDERS */}
            <div className="flex flex-col items-center">
              <p className="text-center text-sm">Month-on-Month Orders</p>
              {/* <BarChart
                data={monthlyOrders}
                category="Orders"
                xTitle="Orders"
                yTitle="Count"
                color={colors[0]}
                chartFor="Orders"
              /> */}

              {/* <div>
                <p className="text-center text-sm">
                  Total {dashboardDetail?.ordersCount} Orders
                </p>
              </div> */}
            </div>

            {/* ORDER STATUS */}
            <div className="flex flex-col items-center">
              <p className="text-center text-sm">Orders Status</p>
              {/* <BarChart
                category={"Orders Status"}
                data={ordersStatus}
                xTitle="Pending / Completed"
                yTitle="Count"
                color={colors[0]}
                chartFor="Orders"
              /> */}
            </div>
            {/* ORDER STOCKS */}
            <div className="flex flex-col items-center">
              <p className="text-center text-sm">Stock Status</p>
              {/* <BarChart
                category={"Stocks Status"}
                data={stockStatus}
                xTitle="Stock In / Out"
                yTitle="Count"
                color={colors[0]}
                chartFor="Orders"
              /> */}
            </div>
          </div>
          <div>
            <p className="text-center font-serif text-xl max-sm:lg">
              Total {dashboardDetail?.ordersCount} Orders
            </p>
          </div>
        </div>

        {/* Recycle Orders Chart*/}
        <div className="flex flex-col items-center border px-3 py-10 max-sm:py-5 rounded-xl shadow-lg">
          <p className="font-serif text-3xl">Recycle Orders Chart</p>
          <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center">
            {/* Recycle Orders */}
            <div className="flex flex-col items-center">
              <p className="text-center text-sm">
                Month-on-Month Recycle Orders
              </p>
              {/* <BarChart
                data={monthlyRecycleOrders}
                category="Recycle Orders"
                xTitle="Recycle Orders"
                yTitle="Count"
                color={colors[1]}
                chartFor="Orders"
              /> */}

              {/* <div>
                <p className="text-center text-sm">
                  Total {dashboardDetail?.recycleOrdersCount} Recycle Orders
                </p>
              </div> */}
            </div>
          </div>
          <div>
            <p className="text-center font-serif text-xl max-sm:lg">
              Total {dashboardDetail?.recycleOrdersCount} Recycle Orders
            </p>
          </div>
        </div>
      </div>

      {/* <div><RadarChart /></div> */}
      <Outlet />
    </div>
  );
};

export default React.memo(Dashboard);

{
  /* <div className="grid grid-cols-4 mx-10 my-20 gap-2 items-center">
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
        <div className={`${divDesc}`}>Total {totalStocksOut} Stocks Out</div>
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
</div>; */
}

{
  // <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 my-10 gap-2 items-center">
  //   <div className={` bg-orange-50 border-orange-500  ${divStyle}`}>
  //     <div className={`text-orange-500 ${divDesc}`}>
  //       Total {dashboardDetail.categoriesCount} Categories
  //     </div>
  //     <div className={`bg-orange-200 text-orange-500 ${divMoreBtn}`}>
  //       <Link to={"/admin/categories-list"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={` bg-green-50 border-green-500  ${divStyle}`}>
  //     <div className={`text-green-700 ${divDesc}`}>
  //       Total {dashboardDetail.brandsCount} Brands
  //     </div>
  //     <div className={`bg-green-200 text-green-700 ${divMoreBtn}`}>
  //       <Link to={"/admin/brands-list"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-blue-50 border-blue-500  ${divStyle}`}>
  //     <div className={`text-blue-700 ${divDesc}`}>
  //       Total {dashboardDetail.productsCount} Products
  //     </div>
  //     <div className={`bg-blue-200 text-blue-700 ${divMoreBtn}`}>
  //       <Link to={"/admin/products-list"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-yellow-50 border-yellow-500 ${divStyle}`}>
  //     <div className={`text-yellow-700 ${divDesc}`}>
  //       Total {dashboardDetail.ordersCount} Orders
  //     </div>
  //     <div className={`bg-yellow-200 text-yellow-700 ${divMoreBtn}`}>
  //       <Link to={"/admin/orders"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-slate-50 border-slate-500 ${divStyle}`}>
  //     <div className={`text-slate-700 ${divDesc}`}>
  //       Total {dashboardDetail.ordersPendingCount} Orders Pending
  //     </div>
  //     <div className={`bg-slate-200 text-slate-700 ${divMoreBtn}`}>
  //       <Link to={"/admin/orders"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-cyan-500 ${divStyle}`}>
  //     <div className={`${divDesc}`}>
  //       Total {dashboardDetail.ordersCompletedCount} Orders Received / Completed
  //     </div>
  //     <div className={`bg-cyan-600 ${divMoreBtn}`}>
  //       <Link to={"/admin/orders"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-red-50 border-red-500 ${divStyle}`}>
  //     <div className={`text-red-700 ${divDesc}`}>
  //       Total {dashboardDetail.stocksInCount} Stocks In
  //     </div>
  //     <div className={`bg-red-200 text-red-700  ${divMoreBtn}`}>
  //       <Link to={"/admin/manage-stocks"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-pink-500 ${divStyle}`}>
  //     <div className={`${divDesc}`}>
  //       Total {dashboardDetail.stocksOutCount} Stocks Out
  //     </div>
  //     <div className={`bg-pink-600 ${divMoreBtn}`}>
  //       <Link to={"/admin/manage-stocks"}>More Info</Link>
  //     </div>
  //   </div>
  //   <div className={`bg-amber-300 ${divStyle}`}>
  //     <div className={`${divDesc}`}>
  //       Total {dashboardDetail.recycleOrdersCount} Recycle Order
  //     </div>
  //     <div className={`bg-amber-500 ${divMoreBtn}`}>
  //       <Link to={"/admin/recycle-orders"}>More Info</Link>
  //     </div>
  //   </div>
  // </div>;
}
