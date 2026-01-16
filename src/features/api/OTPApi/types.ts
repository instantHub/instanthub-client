import { IFinalDeductionSet } from "@features/slices";

export interface IPhoneNumber {
  _id: string;
  mobileNumber: string;
  purpose: string;
  totalOTPsTaken: number;
  selectedDeductionSet: IFinalDeductionSet[];
  offeredPrice?: number;
  updatedAt: string;
}
