import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { IProductResponse } from "../productsApi/types";
import { IPartner } from "../partners/types";

export interface IOrder {
  id: string;
  orderId: string;
  productId: IProductId | IProductResponse;

  productDetails: {
    productCategory: string;
    productBrand: string;
    productName: string;
    variant: IOrderVariant;
  };
  deviceInfo: IDeviceInfo;

  customerDetails: {
    name: string;
    phone: number;
    email: string;
    addressDetails: IAddress;
  };

  finalDeductionSet: IFinalDeductionSet[];

  customerIDProof: {
    front: string;
    back: string;
    optional1: string;
    optional2: string;
  };

  schedulePickUp: {
    date: Date;
    timeSlot: string;
  };

  schedulePickUpRaw?: string;
  completedAt: Date;

  status: ORDER_STATUS;

  partner: IPartner;

  assignmentStatus: IAssignmentStatus;
  rescheduleStatus: IRescheduleStatus;

  cancellationDetails: ICancellationDetails;

  paymentMode: string;
  offerPrice: number;
  finalPrice: number;

  createdAt: string;
  updatedAt: string;
}

export interface ICancellationDetails {
  cancelledBy: string;
  cancelReason: string;
  cancelledAt: string;
}

export interface IRescheduleStatus {
  rescheduled: boolean;
  rescheduledBy: string;
  rescheduleReason: string;
  rescheduleCount: number;
  lastRescheduledDate: Date;
  previousScheduledDates: Array<Date>;
}

export interface IAssignmentStatus {
  assigned: boolean;
  assignedAt: string;

  assignedTo: {
    name: string;
    phone: string;
    role: ADMIN_ROLE_ENUM.EXECUTIVE | ADMIN_ROLE_ENUM.PARTNER;
  };
  assignedBy: {
    name: string;
    role: ADMIN_ROLE_ENUM.ADMIN | ADMIN_ROLE_ENUM.PARTNER;
  };
}

export interface IOrdersCount {
  today: {
    pending: number;
    completed: number;
    cancelled: number;
  };
  total: {
    pending: number;
    completed: number;
    cancelled: number;
  };
}

export interface IProductId {
  name: string;
  id: string;
  uniqueURL: string;
}

export interface IOrderVariant {
  variantName: string;
  price: number;
}

export interface IAddress {
  address: string;
  state: string;
  city: string;
  pinCode: string;
}

export enum ORDER_STATUS {
  IN_PROGRESS = "in-progress",
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// assignmentStatus
export enum ASSIGNMENT_STATUS {
  UNASSIGNED = "unassigned",
  PARTNER = "partner",
  EXECUTIVE = "executive",
}

export type TOperation = "Add" | "Subtract";

export interface IFinalDeductionSet {
  type: string;
  conditions: IFDSetCondition[];
}

export interface IFDSetCondition {
  conditionLabel: string;
  operation: TOperation;
  priceDrop: number;
  type: string;
}

export interface IAccessoriesAvailable {
  conditionLabelId: string;
  conditionLabel: string;
  conditionId: string;
  isSelected: boolean;
}

export interface IDeviceInfo {
  serialNumber?: string;
  imeiNumber?: string;
}

export interface IPickedUpDetails {
  agentAssigned: boolean;
  agentName: string;
  pickedUpDate: string;
}

export interface IRescheduleOrderArgs {
  id: string;
  body: {
    newDate: Date;
    newTimeSlot: string;
    rescheduleReason: string;
  };
}

export interface IOrderStats {
  overall: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    unassigned: number;
    overdue: number;
  };
  today: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
    unassigned: number;
  };
  tomorrow: {
    total: number;
    unassigned: number;
  };
  locationStats: ILocationStat[]; // <-- Add this
}

// NEW
export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface IProduct {
  name: string;
  brand: string;
  category: string;
  variant: string;
  variantPrice: number;
}

export interface IDevice {
  serialNumber: string;
  imeiNumber: string;
}

export interface IAssignment {
  isAssigned: boolean;
  assignedTo: string | null;
  assignedToPhone: string | null;
  assignedToRole: string | null;
  assignedAt: string | null;
  assignedBy: string | null;
}

export interface IReschedule {
  isRescheduled: boolean;
  rescheduleCount: number;
  rescheduleReason: string | null;
  lastRescheduledDate: string | null;
}

export interface ICancellation {
  cancelledBy: string | null;
  cancelReason: string | null;
  cancelledAt: string | null;
}

export interface IOrder2 {
  id: string;
  orderId: string;
  customer: ICustomer;
  product: IProduct;
  device: IDevice;
  status: "pending" | "completed" | "cancelled" | "in-progress";
  isOverdue: boolean;
  scheduledDate: string;
  timeSlot: string;
  offerPrice: number;
  finalPrice: number;
  paymentMode: string;
  assignment: IAssignment;
  reschedule: IReschedule;
  cancellation: ICancellation | null;
  createdAt: string;
  completedAt: string | null;
}

export interface IOrdersResponse {
  orders: IOrder2[];
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

// Define the new location stat type
export interface ILocationStat {
  location: string;
  totalPending: number;
  todayPending: number;
}

export interface IGetOrdersByStatusParams {
  status:
    | "pending"
    | "completed"
    | "cancelled"
    | "in-progress"
    | "unassigned"
    | "overdue"
    | "all";
  dateFilter?: "today" | "tomorrow";
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  location?: string; // <-- Add this
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
