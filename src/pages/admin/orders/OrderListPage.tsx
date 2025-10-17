import React, { useState } from "react";
import {
  IGetOrdersByStatusParams,
  ORDER_STATUS,
} from "@features/api/orders/types";
import { useCategoryImages, useOrders } from "@hooks";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { FlexBox } from "@components/general";
import { ROUTES } from "@routes";

const OrderListPage: React.FC = () => {
  const { filter } = useParams<{ filter: string }>();
  console.log("filter", filter);

  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const navigate = useNavigate();
  const { categoryImages } = useCategoryImages();

  // Map filter to API params
  const getStatusParams = (): IGetOrdersByStatusParams => {
    const baseParams: IGetOrdersByStatusParams = {
      status: "all" as any,
      page,
      limit,
    };

    switch (filter) {
      case "today":
        return { ...baseParams, status: "all", dateFilter: "today" };
      case "tomorrow":
        return { ...baseParams, status: "all", dateFilter: "tomorrow" };
      case "pending":
        return { ...baseParams, status: "pending" };
      case "completed":
        return { ...baseParams, status: "completed" };
      case "unassigned":
        return { ...baseParams, status: "unassigned" };
      case "overdue":
        return { ...baseParams, status: "overdue" };
      case "cancelled":
        return { ...baseParams, status: "cancelled" };
      default:
        return { ...baseParams, status: "all" };
    }
  };

  const { orders, pagination, isLoading, isFetching, isError, refetch } =
    useOrders(getStatusParams());

  const getTitle = () => {
    const titles: Record<string, string> = {
      today: "Today's Orders",
      tomorrow: "Tomorrow's Orders",
      pending: "Pending Orders",
      completed: "Completed Orders",
      unassigned: "Unassigned Orders",
    };
    return titles[filter || "today"] || "Orders";
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <span className="font-medium">Back to Orders</span>
        </button>

        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
            {!isLoading && pagination && (
              <p className="text-gray-600 mt-2">
                {pagination.totalOrders}{" "}
                {pagination.totalOrders === 1 ? "order" : "orders"} found
              </p>
            )}
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </header>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 mb-4">Failed to load orders</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}

        {!isLoading && !isError && orders.length > 0 && (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() =>
                    navigate(
                      ROUTES.admin.orderDetail.replace(":orderId", order.id)
                    )
                  }
                  className={`bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow
                        cursor-pointer border border-transparent hover:border-blue-200
                        ${
                          order.assignment.isAssigned
                            ? "bg-blue-100 border-2 border-blue-700"
                            : ""
                        }`}
                >
                  <div className="flex justify-between max-md:flex-col max-sm:gap-2 items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {order.customer.name}
                      </h3>
                      <FlexBox gap={1}>
                        <p className="text-gray-600 text-sm mt-1">
                          Order #{order.orderId}
                        </p>

                        <img
                          src={`${import.meta.env.VITE_APP_BASE_URL}${
                            categoryImages[order?.product?.category] || ""
                          }`}
                          alt="Product Image"
                          className="w-[60px] h-[60px] max-sm:h-[50px] mx-auto max-sm:w-[50px]"
                          loading="lazy"
                        />
                      </FlexBox>
                    </div>
                    <FlexBox gap={2}>
                      {order.isOverdue && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                          <AlertCircle size={14} />
                          Overdue
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </FlexBox>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Product</p>
                      <p className="font-medium text-gray-900">
                        {order.product.name}
                      </p>
                      {order.product?.category === "Mobile" && (
                        <span>{order.product?.variant}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {order.customer.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Offered Price</p>
                      <p className="font-medium text-gray-900">
                        ₹{order.offerPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Final Price</p>
                      <p className="font-medium text-gray-900">
                        {order.status === ORDER_STATUS.COMPLETED
                          ? `₹${order.finalPrice.toFixed(2)}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Scheduled</p>
                      <p className="font-medium text-gray-900">
                        {order.scheduledDate
                          ? `${new Date(
                              order.scheduledDate
                            ).toLocaleDateString()} - ${order.timeSlot}`
                          : order.timeSlot}
                      </p>
                    </div>
                    <div className="lg:text-center">
                      <p className="text-gray-500">Pincode</p>
                      <p className="font-medium text-gray-900">
                        {order.customer.pinCode}
                      </p>
                    </div>
                  </div>

                  {order.assignment.isAssigned && (
                    <FlexBox
                      justify="between"
                      className="mt-4 pt-4 border-t border-blue-500"
                    >
                      <p className="text-sm text-gray-600">
                        Assigned to:{" "}
                        <span className="font-medium text-gray-900">
                          {order.assignment.assignedTo}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Assigned by:{" "}
                        <span className="font-medium text-gray-900">
                          {order.assignment.assignedBy}
                        </span>
                      </p>
                    </FlexBox>
                  )}
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!pagination.hasPrevPage || isFetching}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!pagination.hasNextPage || isFetching}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
