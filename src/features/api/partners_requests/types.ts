export type RequestStatus = "pending" | "approved" | "rejected";

export interface IPartnerRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  businessName?: string;
  address: IPartnerAddress;
  status: RequestStatus;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPartnerAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IPartnerRequestFormData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  address: IPartnerAddress;
}
