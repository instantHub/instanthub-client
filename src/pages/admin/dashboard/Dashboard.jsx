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
