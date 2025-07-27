export interface IServiceCategory {
  _id?: string;
  name: string;
  image?: string;
  inspectionCharges: number;
  status: string;
  uniqueURL: string;
}

export interface IServiceBrand {
  _id?: string;
  serviceCategoryId: string;
  name: string;
  uniqueURL: string;
  image?: string;
}

export type TServiceBrand = IServiceBrand;
// export type TServiceBrand = Omit<IServiceBrand, "_id">;

export interface IServiceProblem {
  _id?: string;
  serviceCategoryId: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
}
