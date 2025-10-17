import React, { memo } from "react";
import { useGetOrderStatsQuery } from "@features/api";
import {
  Calendar,
  CalendarCheck,
  Clock,
  CheckCircle,
  UserX,
  LucideIcon,
  AlertCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOrderStats } from "@hooks";
import { FlexBox } from "@components/general";

interface OrderCardProps {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string;
  filterKey: string;
  isLoading?: boolean;
}

const OrdersPage: React.FC = () => {
  const { stats, isLoading, isError, error, refetch } = useOrderStats();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">
            Error Loading Orders
          </h2>
          <p className="text-red-600 text-sm mb-4">
            {error && "data" in error
              ? JSON.stringify(error.data)
              : "Failed to fetch order statistics. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const orderCards = [
    {
      title: "Today's Orders",
      count: stats?.today.total ?? 0,
      icon: Calendar,
      color: "blue" as const,
      filterKey: "today",
    },
    {
      title: "Tomorrow's Orders",
      count: stats?.tomorrow.total ?? 0,
      icon: CalendarCheck,
      color: "green" as const,
      filterKey: "tomorrow",
    },
    {
      title: "Pending Orders",
      count: stats?.overall.pending ?? 0,
      icon: Clock,
      color: "yellow" as const,
      filterKey: "pending",
    },
    {
      title: "Completed Orders",
      count: stats?.overall.completed ?? 0,
      icon: CheckCircle,
      color: "purple" as const,
      filterKey: "completed",
    },
    {
      title: "Unassigned Orders",
      count: stats?.overall.unassigned ?? 0,
      icon: UserX,
      color: "gray" as const,
      filterKey: "unassigned",
    },
    {
      title: "Overdue Orders",
      count: stats?.overall.overdue ?? 0,
      icon: AlertCircle,
      color: "red" as const,
      filterKey: "overdue",
    },
    {
      title: "Cancelled Orders",
      count: stats?.overall.cancelled ?? 0,
      icon: X,
      color: "orange" as const,
      filterKey: "cancelled",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Orders Dashboard
          </h1>
          <p className="text-gray-600">
            Select a category to view detailed order information
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {orderCards.map((card) => (
            <OrderCard
              key={card.filterKey}
              title={card.title}
              count={card.count}
              icon={card.icon}
              color={card.color}
              filterKey={card.filterKey}
              isLoading={isLoading}
            />
          ))}
        </div>

        {!isLoading && stats && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 pb-2 mb-2 border-b border-b-gray-200">
                  Today
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-center">
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.today.total}
                    </p>
                    <p className="text-sm text-gray-600">Total</p>
                  </FlexBox>
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-yellow-400">
                      {stats.today.pending}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </FlexBox>
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-green-400">
                      {stats.today.completed}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </FlexBox>
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-red-400">
                      {stats.today.cancelled}
                    </p>
                    <p className="text-sm text-gray-600">Cancelled</p>
                  </FlexBox>
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-gray-400">
                      {stats.today.unassigned}
                    </p>
                    <p className="text-sm text-gray-600">Unassigned</p>
                  </FlexBox>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 pb-2 mb-2 border-b border-b-gray-200">
                  Tomorrow
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 text-center">
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-blue-400">
                      {stats.tomorrow.total}
                    </p>
                    <p className="text-sm text-gray-600">Total</p>
                  </FlexBox>
                  <FlexBox direction="col">
                    <p className="text-2xl font-bold text-gray-400">
                      {stats.tomorrow.unassigned}
                    </p>
                    <p className="text-sm text-gray-600">Unassigned</p>
                  </FlexBox>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderCard: React.FC<OrderCardProps> = memo(
  ({ title, count, icon: Icon, color, filterKey, isLoading = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/admin/orders/${filterKey}`);
    };

    const colorClasses = {
      blue: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100",
      green: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100",
      yellow:
        "bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-100",
      purple:
        "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
      gray: "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100",
      red: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100",
    }[color];

    return (
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
        relative overflow-hidden rounded-xl border-2 p-6 
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${colorClasses}
      `}
        aria-label={`View ${title}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 text-left">
            <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
            {isLoading ? (
              <div className="h-8 w-20 bg-current opacity-20 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold tabular-nums">{count}</p>
            )}
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/50">
            <Icon className="w-6 h-6" strokeWidth={2.5} />{" "}
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      </button>
    );
  }
);

OrderCard.displayName = "OrderCard";

export default OrdersPage;
