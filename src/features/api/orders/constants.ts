export const ORDERS_API_TAG = "Orders";
export const ORDER_DETAIL_API_TAG = "Order Detail";
export const ORDER_STATS_API_TAG = "OrderStats";

export const ORDER_API_PATHS = {
  BASE: "/api/orders",
  BY_ID: (id: string) => `/api/orders/${id}`,
} as const;
