import { IProductResponse } from "../productsApi/types";

export interface IOrder {
  id: string;
  orderId: string;
  customerName: string;
  phone: number;
  email: string;
  addressDetails: IAddress;

  productCategory: string;
  productBrand: string;
  productName: string;
  productId: IProductId | IProductResponse;
  variant: IOrderVariant;

  accessoriesAvailable: IAccessoriesAvailable[];
  finalDeductionSet: IFinalDeductionSet[];
  //   deductions: IDeductions[];

  schedulePickUp: string;
  pickedUpDetails: IPickedUpDetails;
  deviceInfo: IDeviceInfo;

  customerProofFront: string;
  customerProofBack: string;
  customerOptional1: string;
  customerOptional2: string;

  // status: IOrderStatus;
  status: ORDER_STATUS;
  assignmentStatus: ASSIGNMENT_STATUS;
  cancelReason: string;

  offerPrice: number;
  paymentMode: string;
  finalPrice: number;

  createdAt: string;
  updatedAt: string;
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

export interface IOrderStatus {
  pending: boolean;
  completed: boolean;
  cancelled: boolean;
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
