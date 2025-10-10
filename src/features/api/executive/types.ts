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

import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { IPermissions, TAdminRole } from "@utils/types";
import { IOrder } from "../orders/types";

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
