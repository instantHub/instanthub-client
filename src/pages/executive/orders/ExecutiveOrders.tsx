// src/pages/executive/ExecutiveOrders/ExecutiveOrders.tsx
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Package,
  AlertCircle,
  CheckCircle,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button, FlexBox } from "@components/general";
import { Loading } from "@components/user";
import { formatDate } from "@utils/general";
import { useGetExecutiveOrders2Query } from "@features/api";

export const ExecutiveOrders: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get query params
  const status = (searchParams.get("status") as any) || "all";
  const dateFilter = searchParams.get("dateFilter") as
    | "today"
    | "tomorrow"
    | undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  // Fetch orders
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetExecutiveOrders2Query({
      status,
      dateFilter,
      page,
      limit,
      sortBy: "schedulePickUp.date",
      order: "asc",
    });

  // Filter states for mobile
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set("page", "1"); // Reset to page 1 when filtering
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFilterTitle = () => {
    const parts: string[] = [];
    if (dateFilter === "today") parts.push("Today's");
    else if (dateFilter === "tomorrow") parts.push("Tomorrow's");

    if (status === "pending") parts.push("Pending");
    else if (status === "completed") parts.push("Completed");
    else if (status === "overdue") parts.push("Overdue");
    else parts.push("All");

    parts.push("Orders");
    return parts.join(" ");
  };

  if (isLoading) return <Loading />;

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
              : "Failed to fetch orders. Please try again."}
          </p>
          <Button onClick={() => refetch()} variant="danger">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const orders = data?.orders || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <FlexBox justify="between" className="flex-wrap gap-3">
            <FlexBox gap={3} align="center">
              <Button
                onClick={() => navigate("/executive/dashboard")}
                variant="secondary"
                size="sm"
                leftIcon={<ArrowLeft size={18} />}
              >
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {getFilterTitle()}
                </h1>
                {pagination && (
                  <p className="text-sm text-gray-600">
                    {pagination.totalOrders}{" "}
                    {pagination.totalOrders === 1 ? "order" : "orders"}
                  </p>
                )}
              </div>
            </FlexBox>

            <FlexBox gap={2}>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                size="sm"
                leftIcon={<Filter size={18} />}
                className="lg:hidden"
              >
                Filters
              </Button>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                leftIcon={
                  <RefreshCw
                    size={18}
                    className={isFetching ? "animate-spin" : ""}
                  />
                }
              >
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </FlexBox>
          </FlexBox>

          {/* Filters */}
          <div className={`mt-4 ${showFilters ? "block" : "hidden"} lg:block`}>
            <FlexBox gap={2} className="flex-wrap">
              {/* Status Filter */}
              <select
                value={status}
                onChange={(e) => updateFilter("status", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter || ""}
                onChange={(e) => updateFilter("dateFilter", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
              </select>

              {/* Clear Filters */}
              {(status !== "all" || dateFilter) && (
                <Button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  variant="ghost"
                  size="sm"
                >
                  Clear Filters
                </Button>
              )}
            </FlexBox>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 mb-4">
              {status !== "all" || dateFilter
                ? "Try adjusting your filters to see more orders."
                : "You don't have any assigned orders yet."}
            </p>
            {(status !== "all" || dateFilter) && (
              <Button onClick={() => setSearchParams({})} variant="primary">
                View All Orders
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 bg-white rounded-lg p-4 shadow-sm">
            <FlexBox
              justify="between"
              align="center"
              className="flex-wrap gap-4"
            >
              <p className="text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </p>

              <FlexBox gap={2}>
                <Button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  variant="outline"
                  size="sm"
                  leftIcon={<ChevronLeft size={18} />}
                >
                  Previous
                </Button>

                {/* Page Numbers */}
                <FlexBox gap={1} className="hidden sm:flex">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum: number;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (
                        pagination.currentPage >=
                        pagination.totalPages - 2
                      ) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = pagination.currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            pageNum === pagination.currentPage
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </FlexBox>

                <Button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  variant="outline"
                  size="sm"
                  rightIcon={<ChevronRight size={18} />}
                >
                  Next
                </Button>
              </FlexBox>
            </FlexBox>
          </div>
        )}
      </div>
    </div>
  );
};

// Order Card Component
interface OrderCardProps {
  order: any;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <FlexBox justify="between" align="start" className="mb-4 flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {order.customer.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">Order #{order.orderId}</p>
        </div>

        <FlexBox gap={2} className="flex-wrap">
          {order.isOverdue && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
              <AlertCircle size={14} />
              Overdue
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              statusColors[order.status as keyof typeof statusColors]
            }`}
          >
            {order.status}
          </span>
        </FlexBox>
      </FlexBox>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Schedule */}
        <InfoItem
          icon={Calendar}
          label="Scheduled"
          value={formatDate(order.scheduledDate)}
        />
        <InfoItem icon={Clock} label="Time Slot" value={order.timeSlot} />

        {/* Customer Info */}
        <InfoItem icon={Phone} label="Phone" value={order.customer.phone} />
        <InfoItem icon={Mail} label="Email" value={order.customer.email} />

        {/* Location */}
        <InfoItem
          icon={MapPin}
          label="Location"
          value={`${order.customer.city}, ${order.customer.state}`}
        />

        {/* Product */}
        <InfoItem icon={Package} label="Product" value={order.product.name} />
      </div>

      {/* Price & Actions */}
      <FlexBox
        justify="between"
        align="center"
        className="pt-4 border-t border-gray-200"
      >
        <div>
          <p className="text-sm text-gray-600">Offer Price</p>
          <p className="text-lg font-bold text-gray-900">₹{order.offerPrice}</p>
          {order.finalPrice && (
            <p className="text-sm text-green-600">Final: ₹{order.finalPrice}</p>
          )}
        </div>

        <Button
          onClick={() => navigate(`/executive/${order.id}/order-detail`)}
          variant="primary"
          size="sm"
          rightIcon={<Eye size={16} />}
        >
          View Details
        </Button>
      </FlexBox>

      {/* Reschedule Info */}
      {order.reschedule.isRescheduled && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-orange-600">
            ⚠️ Rescheduled {order.reschedule.rescheduleCount} time(s)
          </p>
        </div>
      )}
    </div>
  );
};

// Helper Component
interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2">
    <Icon className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-900 truncate">{value}</p>
    </div>
  </div>
);
