// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import {
//   useDashboardDetailsQuery,
//   useGetOrdersListQuery,
//   useGetRecycleOrdersQuery,
// } from "@api";
// import { Loading } from "@components/user";
// import DoughnutChart from "./DoughnutChart";
// import BarChart from "./BarChart";

// const Dashboard = () => {
//   const { data: dashboardDetail, isLoading: dashboardDetailLoading } =
//     useDashboardDetailsQuery();

//   const { data: ordersData, isLoading: ordersLoading } =
//     useGetOrdersListQuery();

//   const { data: recycleOrdersData, isLoading: recycleOrdersLoading } =
//     useGetRecycleOrdersQuery();

//   // console.log("dashboardDetail", dashboardDetail);
//   // console.log("ordersData", ordersData);

//   const divStyle =
//     "relative text-center text-white pt-4 h-[120px] max-h-[120px] border rounded-lg";
//   const divDesc = "text-start pl-4 text-lg";
//   const divMoreBtn =
//     "absolute bottom-0 w-full py-2 text-center rounded-lg cursor-pointer";

//   const months = {
//     1: "January",
//     2: "February",
//     3: "March",
//     4: "April",
//     5: "May",
//     6: "June",
//     7: "July",
//     8: "August",
//     9: "September",
//     10: "October",
//     11: "November",
//     12: "December",
//   };

//   const [monthlyOrders, setMonthlyOrders] = useState();
//   const [monthlyRecycleOrders, setMonthlyRecycleOrders] = useState();

//   const [categoriesChartData, setCategoriesChartData] = useState();
//   const [brandsChartData, setBrandsChartData] = useState();
//   const [productsChartData, setProductsChartData] = useState();

//   const ordersStatus = [
//     {
//       label: "Pending",
//       count: dashboardDetail?.ordersCount?.pending,
//     },
//     {
//       label: "Completed",
//       count: dashboardDetail?.ordersCount?.completed,
//     },
//     {
//       label: "Cancelled",
//       count: dashboardDetail?.ordersCount?.cancelled,
//     },
//   ];
//   const recycleOrdersStatus = [
//     {
//       label: "Pending",
//       count: dashboardDetail?.recycleOrdersCount?.pending,
//     },
//     {
//       label: "Completed",
//       count: dashboardDetail?.recycleOrdersCount?.completed,
//     },
//     {
//       label: "Cancelled",
//       count: dashboardDetail?.recycleOrdersCount?.cancelled,
//     },
//   ];
//   const stockStatus = [
//     {
//       label: "Stocks In",
//       count: dashboardDetail?.stocksCount?.in,
//     },
//     {
//       label: "Stocks Out",
//       count: dashboardDetail?.stocksCount?.out,
//     },
//     {
//       label: "Stocks Lost",
//       count: dashboardDetail?.stocksCount?.lost,
//     },
//   ];

//   // monthlyOrders & monthlyRecycleOrders
//   useEffect(() => {
//     // console.log("UseEffect Dashboard Dates Segregation");
//     // if (ordersLoading) return;

//     const orderDates = ordersData?.reduce((acc, curr) => {
//       const date = new Date(curr.createdAt);
//       const month = date.getMonth() + 1; // Months are zero-indexed
//       const year = date.getFullYear();
//       const monthYear = `${months[month]}-${year}`; // Format as "Month-Year"

//       const existing = acc.find((item) => item.label === monthYear);
//       if (existing) {
//         existing.count += 1;
//       } else {
//         acc.push({ label: monthYear, count: 1 });
//         // acc.push({ month: monthYear, orders: 1 });
//       }

//       return acc;
//     }, []);
//     setMonthlyOrders(orderDates);
//     // console.log("orderDates", orderDates);

//     const recycleOrderDates = recycleOrdersData?.reduce((acc, curr) => {
//       const date = new Date(curr.createdAt);
//       const month = date.getMonth() + 1; // Months are zero-indexed
//       const year = date.getFullYear();
//       const monthYear = `${months[month]}-${year}`; // Format as "Month-Year"

//       const existing = acc.find((item) => item.label === monthYear);
//       if (existing) {
//         existing.count += 1;
//       } else {
//         acc.push({ label: monthYear, count: 1 });
//         // acc.push({ month: monthYear, orders: 1 });
//       }

//       return acc;
//     }, []);
//     setMonthlyRecycleOrders(recycleOrderDates);
//     // console.log("recycleOrderDates", recycleOrderDates);
//   }, [ordersData, recycleOrdersData]);

//   // Chart data for Categories, Brands and Products
//   // Category has {name, default set Count = 1} // Brands has {category, brands[Array]} // Products has {categoryName, count}
//   useEffect(() => {
//     // console.log("UseEffect dashboardDetail");

//     if (dashboardDetailLoading) return;

//     const catData = dashboardDetail?.categories.reduce((acc, curr) => {
//       acc.push({ label: curr.name, count: 1 });
//       return acc;
//     }, []);
//     // console.log("catData:", catData);
//     setCategoriesChartData(catData);

//     const brandData = dashboardDetail?.detailedProductsCount.reduce(
//       (acc, curr) => {
//         acc.push({
//           label: `${curr.category} Brands`,
//           count: curr.brands?.length,
//         });
//         return acc;
//       },
//       []
//     );
//     // console.log("brandData:", brandData);
//     setBrandsChartData(brandData);

//     const prodData = dashboardDetail?.productsCountByCategory.reduce(
//       (acc, curr) => {
//         acc.push({
//           label: curr.categoryName,
//           count: curr.count,
//         });
//         return acc;
//       },
//       []
//     );
//     // console.log("prodData:", prodData);
//     setProductsChartData(prodData);
//   }, [dashboardDetail]);

//   const colors = [
//     {
//       bgColor: "rgba(75, 192, 192, 0.6)",
//       borderColor: "rgba(75, 192, 192, 1)",
//     },
//     {
//       bgColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgba(54, 162, 235, 1)",
//     },
//     {
//       bgColor: "rgba(153, 102, 255, 0.6)",
//       borderColor: "rgba(153, 102, 255, 1)",
//     },
//   ];

//   // console.log("detailedProductsCount", dashboardDetail?.detailedProductsCount);
//   console.log("DashboardDetail");

//   if (dashboardDetailLoading) return <Loading />;

//   return (
//     <div className="mx-10 mt-5 max-sm:mx-2 pb-10 max-sm:pb-5">
//       <div className="flex flex-col gap-20 max-sm:gap-10 pl-">
//         {/* Categories and Brands Chart */}
//         <div className="flex flex-col gap-2 justify-around items-center border px-3 py-10 rounded-xl shadow-lg">
//           <p className="font-serif text-3xl max-sm:text-xl">
//             Categories and Brand Chart
//           </p>
//           <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 items-center w-full">
//             {/* Categories */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-xl max-sm:text-lg">
//                 Categories Chart
//               </p>
//               <div className="max-sm:text-sm">
//                 <p>Total {dashboardDetail?.categories?.length} Categories</p>
//               </div>
//               {/* <PieChart dataProp={dashboardDetail?.categories} /> */}
//               <DoughnutChart dataProp={categoriesChartData} />
//             </div>

//             <hr className="lg:hidden py-5" />

//             {/* Brands Chart */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-xl ">Brands Chart</p>
//               <div className="max-sm:text-sm">
//                 <p>Total {dashboardDetail?.brandsCount} Brands</p>
//               </div>

//               <DoughnutChart dataProp={brandsChartData} />
//             </div>
//           </div>
//         </div>

//         {/* Products Chart */}
//         <div className="flex flex-col gap-10 items-center border py-10 rounded-xl shadow-lg px-3">
//           <p className="font-serif text-3xl max-sm:text-xl">Products Chart</p>
//           {/* PRODUCTS */}
//           <div className="flex flex-col items-center">
//             <p className="text-center text-xl max-sm:text-lg">
//               Products Per Category Chart
//             </p>
//             <div className="max-sm:text-sm">
//               <p>Total {dashboardDetail?.productsCount} Products</p>
//             </div>
//             {/* DoughnutChart */}
//             <DoughnutChart dataProp={productsChartData} />
//           </div>

//           {/* Brand wise products */}
//           <div className="max-sm:hidden flex flex-wrap justify-center items-center">
//             {dashboardDetail?.detailedProductsCount?.map((cat, i) => (
//               <div key={i}>
//                 <p className="text-center text-sm">
//                   Brand Wise Products of {cat.category}
//                 </p>
//                 <BarChart
//                   category={cat.category}
//                   data={cat.brands}
//                   xTitle="Brands"
//                   yTitle="Count"
//                   color={colors[i]}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Orders Chart */}
//         <div className="flex flex-col items-center border px-3 py-10 max-sm:py-5 rounded-xl shadow-lg">
//           <p className="font-serif text-3xl max-sm:text-xl">Orders Chart</p>
//           <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center">
//             {/* ORDERS */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-sm max-sm:text-xs">
//                 Month-on-Month Orders
//               </p>
//               <BarChart
//                 data={monthlyOrders}
//                 category="Orders"
//                 xTitle="Orders"
//                 yTitle="Count"
//                 color={colors[0]}
//                 chartFor="Orders"
//               />
//               {/* Not required currently */}
//               {/* <div>
//                 <p className="text-center text-sm">
//                   Total {dashboardDetail?.ordersCount?.total} Orders
//                 </p>
//               </div> */}
//             </div>

//             {/* ORDER STATUS */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-sm">Orders Status</p>
//               <BarChart
//                 category={"Orders Status"}
//                 data={ordersStatus}
//                 xTitle="Pending / Completed"
//                 yTitle="Count"
//                 color={colors[0]}
//                 chartFor="Orders"
//               />
//             </div>
//             {/* ORDER STOCKS */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-sm">Stock Status</p>
//               <BarChart
//                 category={"Stocks Status"}
//                 data={stockStatus}
//                 xTitle="Stock In / Out"
//                 yTitle="Count"
//                 color={colors[0]}
//                 chartFor="Orders"
//               />
//             </div>
//           </div>
//           <div>
//             <p className="text-center font-serif text-xl max-sm:text-sm">
//               Total {dashboardDetail?.ordersCount?.total} Orders
//             </p>
//           </div>
//         </div>

//         {/* Recycle Orders Chart*/}
//         <div className="flex flex-col items-center border px-3 py-10 max-sm:py-5 rounded-xl shadow-lg">
//           <p className="font-serif text-3xl max-sm:text-xl">
//             Recycle Orders Chart
//           </p>
//           <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center">
//             {/* ORDERS */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-sm max-sm:text-xs">
//                 Month-on-Month Recycle Orders
//               </p>
//               <BarChart
//                 data={monthlyRecycleOrders}
//                 category="Orders"
//                 xTitle="Orders"
//                 yTitle="Count"
//                 color={colors[0]}
//                 chartFor="Orders"
//               />
//               {/* Not required currently */}
//               {/* <div>
//                 <p className="text-center text-sm">
//                   Total {dashboardDetail?.ordersCount?.total} Orders
//                 </p>
//               </div> */}
//             </div>

//             {/* ORDER STATUS */}
//             <div className="flex flex-col items-center">
//               <p className="text-center text-sm">Recycle Orders Status</p>
//               <BarChart
//                 category={"Orders Status"}
//                 data={recycleOrdersStatus}
//                 xTitle="Pending / Completed"
//                 yTitle="Count"
//                 color={colors[0]}
//                 chartFor="Orders"
//               />
//             </div>
//           </div>
//           <div>
//             <p className="text-center font-serif text-xl max-sm:text-sm">
//               Total {dashboardDetail?.recycleOrdersCount?.total} Orders
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* <div><RadarChart /></div> */}
//       <Outlet />
//     </div>
//   );
// };

// export default React.memo(Dashboard);

// {
//   /* <div className="grid grid-cols-4 mx-10 my-20 gap-2 items-center">
//   {!categoryLoading && (
//     <div className={` bg-orange-50 border-orange-500  ${divStyle}`}>
//       <div className={`text-orange-500 ${divDesc}`}>
//         Total {categoryData?.length} Categories
//       </div>
//       <div className={`bg-orange-200 text-orange-500 ${divMoreBtn}`}>
//         <Link to={ROUTES.admin.categoriesList}>More Info</Link>
//       </div>
//     </div>
//   )}

//   {!brandsLoading && (
//     <div className={` bg-green-50 border-green-500  ${divStyle}`}>
//       <div className={`text-green-700 ${divDesc}`}>
//         Total {brandsData?.length} Brands
//       </div>
//       <div className={`bg-green-200 text-green-700 ${divMoreBtn}`}>
//         <Link to={ROUTES.admin.brandsList}>More Info</Link>
//       </div>
//     </div>
//   )}

//   {!productsLoading && (
//     <div className={`bg-blue-50 border-blue-500  ${divStyle}`}>
//       <div className={`text-blue-700 ${divDesc}`}>
//         Total {productsData?.totalProducts} Products
//       </div>
//       <div className={`bg-blue-200 text-blue-700 ${divMoreBtn}`}>
//         <Link to={ROUTES.admin.productsList}>More Info</Link>
//       </div>
//     </div>
//   )}

//   {!ordersLoading && (
//     <>
//       <div className={`bg-yellow-50 border-yellow-500 ${divStyle}`}>
//         <div className={`text-yellow-700 ${divDesc}`}>
//           Total {ordersData?.length} Orders
//         </div>
//         <div className={`bg-yellow-200 text-yellow-700 ${divMoreBtn}`}>
//           <Link to={ROUTES.admin.ordersList}>More Info</Link>
//         </div>
//       </div>
//       <div className={`bg-slate-50 border-slate-500 ${divStyle}`}>
//         <div className={`text-slate-700 ${divDesc}`}>
//           Total {ordersPendingCount} Orders Pending
//         </div>
//         <div className={`bg-slate-200 text-slate-700 ${divMoreBtn}`}>
//           <Link to={ROUTES.admin.ordersList}>More Info</Link>
//         </div>
//       </div>
//       <div className={`bg-secondary ${divStyle}`}>
//         <div className={`${divDesc}`}>
//           Total {ordersReceivedCount} Orders Received / Completed
//         </div>
//         <div className={`bg-secondary ${divMoreBtn}`}>
//           <Link to={ROUTES.admin.ordersList}>More Info</Link>
//         </div>
//       </div>
//       <div className={`bg-red-50 border-red-500 ${divStyle}`}>
//         <div className={`text-red-700 ${divDesc}`}>
//           Total {totalStocksIn} Stocks In
//         </div>
//         <div className={`bg-red-200 text-red-700  ${divMoreBtn}`}>
//           <Link to={ROUTES.admin.manageStocks}>More Info</Link>
//         </div>
//       </div>
//       <div className={`bg-pink-500 ${divStyle}`}>
//         <div className={`${divDesc}`}>Total {totalStocksOut} Stocks Out</div>
//         <div className={`bg-pink-600 ${divMoreBtn}`}>
//           <Link to={ROUTES.admin.manageStocks}>More Info</Link>
//         </div>
//       </div>
//     </>
//   )}

//   {!recycleOrdersDataloading && (
//     <div className={`bg-amber-300 ${divStyle}`}>
//       <div className={`${divDesc}`}>
//         Total {recycleOrdersData?.length} Recycle Order
//       </div>
//       <div className={`bg-amber-500 ${divMoreBtn}`}>
//         <Link to={}>More Info</Link>
//       </div>
//     </div>
//   )}
// </div>; */
// }

// {
//   // <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 my-10 gap-2 items-center">
//   //   <div className={` bg-orange-50 border-orange-500  ${divStyle}`}>
//   //     <div className={`text-orange-500 ${divDesc}`}>
//   //       Total {dashboardDetail.categoriesCount} Categories
//   //     </div>
//   //     <div className={`bg-orange-200 text-orange-500 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.categoriesList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={` bg-green-50 border-green-500  ${divStyle}`}>
//   //     <div className={`text-green-700 ${divDesc}`}>
//   //       Total {dashboardDetail.brandsCount} Brands
//   //     </div>
//   //     <div className={`bg-green-200 text-green-700 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.brandsList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-blue-50 border-blue-500  ${divStyle}`}>
//   //     <div className={`text-blue-700 ${divDesc}`}>
//   //       Total {dashboardDetail.productsCount} Products
//   //     </div>
//   //     <div className={`bg-blue-200 text-blue-700 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.productsList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-yellow-50 border-yellow-500 ${divStyle}`}>
//   //     <div className={`text-yellow-700 ${divDesc}`}>
//   //       Total {dashboardDetail.ordersCount} Orders
//   //     </div>
//   //     <div className={`bg-yellow-200 text-yellow-700 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.ordersList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-slate-50 border-slate-500 ${divStyle}`}>
//   //     <div className={`text-slate-700 ${divDesc}`}>
//   //       Total {dashboardDetail.ordersPendingCount} Orders Pending
//   //     </div>
//   //     <div className={`bg-slate-200 text-slate-700 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.ordersList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-secondary ${divStyle}`}>
//   //     <div className={`${divDesc}`}>
//   //       Total {dashboardDetail.ordersCompletedCount} Orders Received / Completed
//   //     </div>
//   //     <div className={`bg-secondary ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.ordersList}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-red-50 border-red-500 ${divStyle}`}>
//   //     <div className={`text-red-700 ${divDesc}`}>
//   //       Total {dashboardDetail.stocksInCount} Stocks In
//   //     </div>
//   //     <div className={`bg-red-200 text-red-700  ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.manageStocks}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-pink-500 ${divStyle}`}>
//   //     <div className={`${divDesc}`}>
//   //       Total {dashboardDetail.stocksOutCount} Stocks Out
//   //     </div>
//   //     <div className={`bg-pink-600 ${divMoreBtn}`}>
//   //       <Link to={ROUTES.admin.manageStocks}>More Info</Link>
//   //     </div>
//   //   </div>
//   //   <div className={`bg-amber-300 ${divStyle}`}>
//   //     <div className={`${divDesc}`}>
//   //       Total {dashboardDetail.recycleOrdersCount} Recycle Order
//   //     </div>
//   //     <div className={`bg-amber-500 ${divMoreBtn}`}>
//   //       <Link to={}>More Info</Link>
//   //     </div>
//   //   </div>
//   // </div>;
// }

import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import {
  useDashboardDetailsQuery,
  useGetOrdersListQuery,
  useGetRecycleOrdersQuery,
} from "@api";
import { Loading } from "@components/user";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

// Constants moved outside component to prevent recreation
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CHART_COLORS = [
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

// Utility function for processing orders by month
const processOrdersByMonth = (orders) => {
  if (!orders?.length) return [];

  return orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const monthYear = `${MONTHS[date.getMonth()]}-${date.getFullYear()}`;

    const existing = acc.find((item) => item.label === monthYear);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ label: monthYear, count: 1 });
    }
    return acc;
  }, []);
};

// Custom hook for chart data processing
const useChartData = (dashboardDetail) => {
  return useMemo(() => {
    if (!dashboardDetail)
      return {
        categoriesChartData: [],
        brandsChartData: [],
        productsChartData: [],
      };

    const categoriesChartData =
      dashboardDetail.categories?.map((cat) => ({
        label: cat.name,
        count: 1,
      })) || [];

    const brandsChartData =
      dashboardDetail.detailedProductsCount?.map((item) => ({
        label: `${item.category} Brands`,
        count: item.brands?.length || 0,
      })) || [];

    const productsChartData =
      dashboardDetail.productsCountByCategory?.map((item) => ({
        label: item.categoryName,
        count: item.count,
      })) || [];

    return { categoriesChartData, brandsChartData, productsChartData };
  }, [dashboardDetail]);
};

// Custom hook for status data
const useStatusData = (dashboardDetail) => {
  return useMemo(() => {
    if (!dashboardDetail)
      return { ordersStatus: [], recycleOrdersStatus: [], stockStatus: [] };

    const ordersStatus = [
      { label: "Pending", count: dashboardDetail.ordersCount?.pending || 0 },
      {
        label: "Completed",
        count: dashboardDetail.ordersCount?.completed || 0,
      },
      {
        label: "Cancelled",
        count: dashboardDetail.ordersCount?.cancelled || 0,
      },
    ];

    const recycleOrdersStatus = [
      {
        label: "Pending",
        count: dashboardDetail.recycleOrdersCount?.pending || 0,
      },
      {
        label: "Completed",
        count: dashboardDetail.recycleOrdersCount?.completed || 0,
      },
      {
        label: "Cancelled",
        count: dashboardDetail.recycleOrdersCount?.cancelled || 0,
      },
    ];

    const stockStatus = [
      { label: "Stocks In", count: dashboardDetail.stocksCount?.in || 0 },
      { label: "Stocks Out", count: dashboardDetail.stocksCount?.out || 0 },
      { label: "Stocks Lost", count: dashboardDetail.stocksCount?.lost || 0 },
    ];

    return { ordersStatus, recycleOrdersStatus, stockStatus };
  }, [dashboardDetail]);
};

// Reusable chart section component
const ChartSection = ({ title, children, className = "" }) => (
  <div
    className={`flex flex-col items-center border px-3 py-10 max-sm:py-5 rounded-xl shadow-lg ${className}`}
  >
    <h2 className="font-serif text-3xl max-sm:text-xl mb-4">{title}</h2>
    {children}
  </div>
);

// Reusable chart container component
const ChartContainer = ({ title, subtitle, children }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-center text-xl max-sm:text-lg">{title}</h3>
    {subtitle && (
      <div className="max-sm:text-sm mb-2">
        <p>{subtitle}</p>
      </div>
    )}
    {children}
  </div>
);

const Dashboard = () => {
  const { data: dashboardDetail, isLoading: dashboardDetailLoading } =
    useDashboardDetailsQuery();
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersListQuery();
  const { data: recycleOrdersData, isLoading: recycleOrdersLoading } =
    useGetRecycleOrdersQuery();

  // Memoized monthly orders processing
  const monthlyOrders = useMemo(
    () => processOrdersByMonth(ordersData),
    [ordersData]
  );
  const monthlyRecycleOrders = useMemo(
    () => processOrdersByMonth(recycleOrdersData),
    [recycleOrdersData]
  );

  // Custom hooks for data processing
  const { categoriesChartData, brandsChartData, productsChartData } =
    useChartData(dashboardDetail);
  const { ordersStatus, recycleOrdersStatus, stockStatus } =
    useStatusData(dashboardDetail);

  // Show loading state
  if (dashboardDetailLoading || ordersLoading || recycleOrdersLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-10 mt-5 max-sm:mx-2 pb-10 max-sm:pb-5">
      <div className="flex flex-col gap-20 max-sm:gap-10">
        {/* Categories and Brands Chart */}
        <ChartSection
          title="Categories and Brand Chart"
          className="gap-2 justify-around"
        >
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2 items-center w-full">
            <ChartContainer
              title="Categories Chart"
              subtitle={`Total ${
                dashboardDetail?.categories?.length || 0
              } Categories`}
            >
              <DoughnutChart dataProp={categoriesChartData} />
            </ChartContainer>

            <hr className="lg:hidden py-5" />

            <ChartContainer
              title="Brands Chart"
              subtitle={`Total ${dashboardDetail?.brandsCount || 0} Brands`}
            >
              <DoughnutChart dataProp={brandsChartData} />
            </ChartContainer>
          </div>
        </ChartSection>

        {/* Products Chart */}
        <ChartSection title="Products Chart" className="gap-10">
          <ChartContainer
            title="Products Per Category Chart"
            subtitle={`Total ${dashboardDetail?.productsCount || 0} Products`}
          >
            <DoughnutChart dataProp={productsChartData} />
          </ChartContainer>

          {/* Brand wise products - Hidden on mobile */}
          <div className="max-sm:hidden flex flex-wrap justify-center items-center">
            {dashboardDetail?.detailedProductsCount?.map((cat, index) => (
              <div key={`${cat.category}-${index}`}>
                <p className="text-center text-sm">
                  Brand Wise Products of {cat.category}
                </p>
                <BarChart
                  category={cat.category}
                  data={cat.brands}
                  xTitle="Brands"
                  yTitle="Count"
                  color={CHART_COLORS[index % CHART_COLORS.length]}
                />
              </div>
            ))}
          </div>
        </ChartSection>

        {/* Orders Chart */}
        <ChartSection title="Orders Chart">
          <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center mb-4">
            <ChartContainer title="Month-on-Month Orders">
              <BarChart
                data={monthlyOrders}
                category="Orders"
                xTitle="Orders"
                yTitle="Count"
                color={CHART_COLORS[0]}
                chartFor="Orders"
              />
            </ChartContainer>

            <ChartContainer title="Orders Status">
              <BarChart
                category="Orders Status"
                data={ordersStatus}
                xTitle="Pending / Completed"
                yTitle="Count"
                color={CHART_COLORS[0]}
                chartFor="Orders"
              />
            </ChartContainer>

            <ChartContainer title="Stock Status">
              <BarChart
                category="Stocks Status"
                data={stockStatus}
                xTitle="Stock In / Out"
                yTitle="Count"
                color={CHART_COLORS[0]}
                chartFor="Orders"
              />
            </ChartContainer>
          </div>

          <p className="text-center font-serif text-xl max-sm:text-sm">
            Total {dashboardDetail?.ordersCount?.total || 0} Orders
          </p>
        </ChartSection>

        {/* Recycle Orders Chart */}
        <ChartSection title="Recycle Orders Chart">
          <div className="flex max-sm:flex-col max-sm:gap-5 justify-center items-center mb-4">
            <ChartContainer title="Month-on-Month Recycle Orders">
              <BarChart
                data={monthlyRecycleOrders}
                category="Orders"
                xTitle="Orders"
                yTitle="Count"
                color={CHART_COLORS[0]}
                chartFor="Orders"
              />
            </ChartContainer>

            <ChartContainer title="Recycle Orders Status">
              <BarChart
                category="Orders Status"
                data={recycleOrdersStatus}
                xTitle="Pending / Completed"
                yTitle="Count"
                color={CHART_COLORS[0]}
                chartFor="Orders"
              />
            </ChartContainer>
          </div>

          <p className="text-center font-serif text-xl max-sm:text-sm">
            Total {dashboardDetail?.recycleOrdersCount?.total || 0} Orders
          </p>
        </ChartSection>
      </div>

      <Outlet />
    </div>
  );
};

export default React.memo(Dashboard);
