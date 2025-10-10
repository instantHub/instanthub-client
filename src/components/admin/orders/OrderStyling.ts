import { IOrder, ORDER_STATUS } from "@features/api/orders/types";

// Define the styles for each status. This is highly maintainable.
export const ORDER_CARD_STYLES = {
  // High-priority statuses override assignment colors
  [ORDER_STATUS.COMPLETED]: "bg-green-100 border-green-500 text-green-800",
  [ORDER_STATUS.CANCELLED]: "bg-red-100 border-red-500 text-red-800",

  // Default styles are based on assignment status
  ASSIGNED: "bg-blue-100 border-blue-500 text-blue-800",
  UNASSIGNED: "bg-yellow-100 border-yellow-500 text-yellow-800",
};

/**
 * Determines the card's styling based on order status with clear priority.
 * 1. Cancelled/Completed statuses have the highest priority.
 * 2. Otherwise, the style is based on assignment status.
 */
export const getOrderCardStyles = (order: IOrder): string => {
  switch (order.status) {
    case ORDER_STATUS.CANCELLED:
      return ORDER_CARD_STYLES[ORDER_STATUS.CANCELLED];

    case ORDER_STATUS.COMPLETED:
      return ORDER_CARD_STYLES[ORDER_STATUS.COMPLETED];

    // For any other status (like PENDING), check assignment
    default:
      return order.assignmentStatus.assigned
        ? ORDER_CARD_STYLES.ASSIGNED
        : ORDER_CARD_STYLES.UNASSIGNED;
  }
};
