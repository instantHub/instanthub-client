import { IPermissions, TAdminRole } from "@utils/types";

export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string | number;
  isActive: boolean;
  adminID: string;
  creator: ICreator;
  loginAttempts: number;
  role: TAdminRole;
  permissions: IPermissions[];
  sessionExpiry: number;
  token: string;
  passwordChangedAt: string;
  department: string;
  lastLogin: string; // ISO timestamp format
  createdAt: string;
}

export interface ICreator {
  id: string;
  name: string;
  role: "partner" | "admin";
}

export interface ICreateAdminPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: TAdminRole;
}
