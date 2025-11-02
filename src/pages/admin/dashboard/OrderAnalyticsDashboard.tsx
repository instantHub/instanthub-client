import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  useGetMonthlyStatsQuery,
  useGetLocationStatsQuery,
  useGetYearlyComparisonQuery,
  useGetCitiesQuery,
} from "@api";
import {
  Calendar,
  MapPin,
  TrendingUp,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { Button, FlexBox } from "@components/general";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OrderAnalyticsDashboard: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [comparisonYears, setComparisonYears] = useState("2024,2025,2026");

  // Fetch data
  const {
    data: monthlyData,
    isLoading: monthlyLoading,
    refetch: refetchMonthly,
  } = useGetMonthlyStatsQuery({
    year: selectedYear,
    location: selectedLocation,
    status: selectedStatus,
  });

  const {
    data: locationData,
    isLoading: locationLoading,
    refetch: refetchLocation,
  } = useGetLocationStatsQuery({
    year: selectedYear,
    status: selectedStatus,
    limit: 10,
  });

  const {
    data: yearlyData,
    isLoading: yearlyLoading,
    refetch: refetchYearly,
  } = useGetYearlyComparisonQuery({
    years: comparisonYears,
  });

  const { data: citiesData } = useGetCitiesQuery();

  // Available years (2025-2026)
  const availableYears = [2024, 2025, 2026];

  // Chart configurations
  const monthlyChartData = {
    labels: monthlyData?.data.monthlyData.map((m) => m.month) || [],
    datasets: [
      {
        label: "Total Orders",
        data: monthlyData?.data.monthlyData.map((m) => m.totalOrders) || [],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Completed",
        data: monthlyData?.data.monthlyData.map((m) => m.completedOrders) || [],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Cancelled",
        data: monthlyData?.data.monthlyData.map((m) => m.cancelledOrders) || [],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const revenueChartData = {
    labels: monthlyData?.data.monthlyData.map((m) => m.month) || [],
    datasets: [
      {
        label: "Revenue (₹)",
        data: monthlyData?.data.monthlyData.map((m) => m.totalRevenue) || [],
        backgroundColor: "rgba(147, 51, 234, 0.8)",
        borderColor: "rgb(147, 51, 234)",
        borderWidth: 1,
      },
    ],
  };

  const locationChartData = {
    labels: locationData?.data.locations.map((l) => l.city) || [],
    datasets: [
      {
        label: "Orders by Location",
        data: locationData?.data.locations.map((l) => l.totalOrders) || [],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(147, 51, 234, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(14, 165, 233, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(34, 211, 238, 0.8)",
          "rgba(251, 146, 60, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const yearlyComparisonData = {
    labels: yearlyData?.data.years || [],
    datasets: [
      {
        label: "Total Orders",
        data: yearlyData?.data.yearlyData.map((y) => y.totalOrders) || [],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Completed",
        data: yearlyData?.data.yearlyData.map((y) => y.completedOrders) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "Cancelled",
        data: yearlyData?.data.yearlyData.map((y) => y.cancelledOrders) || [],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleRefreshAll = () => {
    refetchMonthly();
    refetchLocation();
    refetchYearly();
  };

  if (monthlyLoading || locationLoading || yearlyLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FlexBox justify="between" align="center" className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track and analyze order performance
            </p>
          </div>
          <Button
            onClick={handleRefreshAll}
            variant="outline"
            leftIcon={<RefreshCw size={16} />}
          >
            Refresh Data
          </Button>
        </FlexBox>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Year Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Select Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                {citiesData?.data.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                Order Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Orders"
            value={monthlyData?.data.totals.totalOrders || 0}
            icon={<TrendingUp />}
            color="blue"
          />
          <SummaryCard
            title="Completed"
            value={monthlyData?.data.totals.completedOrders || 0}
            icon={<TrendingUp />}
            color="green"
          />
          <SummaryCard
            title="Pending"
            value={monthlyData?.data.totals.pendingOrders || 0}
            icon={<TrendingUp />}
            color="yellow"
          />
          <SummaryCard
            title="Total Revenue"
            value={`₹${(monthlyData?.data.totals.totalRevenue || 0).toFixed(
              2
            )}`}
            icon={<DollarSign />}
            color="purple"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Orders Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Orders Trend</h3>
            <div className="h-80">
              <Line data={monthlyChartData} options={chartOptions} />
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
            <div className="h-80">
              <Bar data={revenueChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Top 10 Locations</h3>
            <div className="h-80">
              <Doughnut
                data={locationChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Yearly Comparison */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Yearly Comparison</h3>
            <div className="h-80">
              <Bar
                data={yearlyComparisonData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: "top" as const,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "purple";
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

export default OrderAnalyticsDashboard;
