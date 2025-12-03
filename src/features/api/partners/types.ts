import { TAdminRole } from "@utils/types";
import { IPartnerAddress } from "../partners_requests/types";
import { ICreator } from "../admin/types";

export interface IPartner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  partnerID: string;
  creator: ICreator;
  companyName?: string;
  address: IPartnerAddress;
  role: TAdminRole;
  isActive: boolean;
  lastLogin?: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  sessionExpiry: number;
}

export interface ICreatePartnerPayload {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  address: IPartnerAddress;
  password?: string;
}

export interface IUpdatePartnerPayload {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  isActive?: boolean;
}

export interface IGetPartnersResponse {
  partners: IPartner[];
}
