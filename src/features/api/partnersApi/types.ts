export interface IPartner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  isActive: boolean;
  lastLogin?: string; // ISO Date string
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  sessionExpiry: number;
  token: string;
}

export interface ICreatePartnerPayload {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
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
