import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { IProductResponse } from "../productsApi/types";

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

  // accessoriesAvailable: IAccessoriesAvailable[];
  finalDeductionSet: IFinalDeductionSet[];
  //   deductions: IDeductions[];

  customerIDProof: {
    front: string;
    back: string;
    optional1: string;
    optional2: string;
  };

  schedulePickUp: string;
  completedAt: string;

  status: ORDER_STATUS;

  partner: IPartner;
  // pickedUpDetails: IPickedUpDetails;

  // assignmentStatus: ASSIGNMENT_STATUS;
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
  rescheduleStatus: {
    rescheduled: boolean;
    rescheduledBy: string;
    rescheduleReason: string;
    rescheduleCount: number;
    lastRescheduledDate: Date;
    previousScheduledDates: Array<Date>;
  };
}

export interface IAssignmentStatus {
  assigned: boolean;
  assignedAt: string;

  assignedTo: {
    name: string;
    role: ADMIN_ROLE_ENUM.EXECUTIVE | ADMIN_ROLE_ENUM.PARTNER;
  };
  assignedBy: {
    name: string;
    role: ADMIN_ROLE_ENUM.ADMIN | ADMIN_ROLE_ENUM.PARTNER;
  };
}

// TODO: Update IPartner when implementing partners feature
export interface IPartner {
  id: string;
  name: string;
  email: string;
  phone: number;
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

// export interface IDeductions {
//   conditionLabel: string;
//   priceDrop: number;
//   operation: TOperation;
//   id: string;
//   conditionId: string;
// }
