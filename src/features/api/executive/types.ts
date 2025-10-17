import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { IPermissions, TAdminRole } from "@utils/types";
import { IOrder } from "../orders/types";

export interface IExecutive {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  loginAttempts: number;
  role: TAdminRole;
  permissions: IPermissions[];
  sessionExpiry: number;
  token: string;
  passwordChangedAt: string;
  orders: any[];
  lastLogin?: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface ICreateExecutivePayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: ADMIN_ROLE_ENUM.EXECUTIVE;
}

export interface IExecutiveOrders {
  data: IOrder[];
  message: string;
}

export interface IExecutiveOrderCountsResponse {
  data: IExecutiveOrderCounts;
}

export interface IExecutiveOrderCounts {
  overall: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  today: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  tomorrow: {
    total: number;
  };
}

// NEW TYPES FOR EXECUTIVE DASHBOARD

export interface IExecutiveStats {
  executive: {
    name: string;
    rating: number;
    totalCompleted: number;
  };
  overall: {
    totalAssigned: number;
    pending: number;
    completed: number;
    overdue: number;
  };
  today: {
    total: number;
    pending: number;
    completed: number;
    overdue: number;
  };
  tomorrow: {
    total: number;
    pending: number;
  };
  performance: {
    weeklyCompleted: number;
    completionRate: string;
  };
}

export interface IExecutiveOrder {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  product: {
    name: string;
    brand: string;
    category: string;
    variant: string;
    variantPrice: number;
  };
  device: {
    serialNumber: string | null;
    imeiNumber: string | null;
  };
  status: string;
  isOverdue: boolean;
  scheduledDate: string;
  timeSlot: string;
  offerPrice: number;
  finalPrice: number;
  paymentMode: string;
  reschedule: {
    isRescheduled: boolean;
    rescheduleCount: number;
  };
  hasProofs: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface IExecutiveOrdersResponse {
  orders: IExecutiveOrder[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    ordersPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    status: string;
    dateFilter: string;
    sortBy: string;
    order: string;
  };
}

export interface IGetExecutiveOrdersParams {
  status?: "pending" | "completed" | "overdue" | "all";
  dateFilter?: "today" | "tomorrow";
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
