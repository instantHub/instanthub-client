export const PURCHASE_ORDERS_API_TAG = "Orders";
export const PURCHASE_ORDER_DETAIL_API_TAG = "Order Detail";
export const PURCHASE_ORDER_STATS_API_TAG = "OrderStats";

export const PURCHASE_ORDER_BASE_API = "/api/purchase-order";

export const PURCHASE_ORDER_API_PATHS = {
  BASE: PURCHASE_ORDER_BASE_API,
  COMPLETE: `${PURCHASE_ORDER_BASE_API}/complete`,
  STATS: `${PURCHASE_ORDER_BASE_API}/stats`,
  ASSIGN_PARTNER: `${PURCHASE_ORDER_BASE_API}/assign-order`,

  BY_ID: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}`,
  DETAILS: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/details`,
  CANCEL: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/cancel`,
  DELETE: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/delete`,
  REOPEN: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/reopen`,
  RESCHEDULE: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/reschedule`,
  CUSTOMER: (id: string) => `${PURCHASE_ORDER_BASE_API}/${id}/customer`,

  BY_STATUS_QUERY: (params: string) =>
    `${PURCHASE_ORDER_BASE_API}/by-status?${params}`,

  UNASSIGN_ORDER: (id: string) =>
    `${PURCHASE_ORDER_BASE_API}/${id}/unassign-order`,
} as const;
