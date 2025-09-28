import { IPermissions, TAdminRole } from "@utils/types";

export interface IAdminResponse {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
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

export interface IAdminLogoutRequest {
  admin: IAdminResponse;
}

export interface IValidateTokenResponse {
  admin: IAdminResponse;
  token?: string;
  sessionExpiry?: number; // timestamp in milliseconds
}

export interface IAdminAuthState {
  admin: IAdminResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IAdminLoginCredentials {
  email: string;
  password: string;
}

export interface IAdminLoginResponse {
  token: string;
  admin: IAdminResponse;
}
