import { IPermissions, TAdminRole } from "@utils/types";
import { IAdmin } from "../admin/types";

export interface IAdminLogoutRequest {
  admin: IAdmin;
}

export interface IAdminAuthState {
  admin: IAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IAdminLoginCredentials {
  email: string;
  password: string;
  role: TAdminRole;
}

export interface IAdminLoginResponse {
  token: string;
  admin: IAdmin;
}
