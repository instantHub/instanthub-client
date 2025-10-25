import { IFinalDeductionSet } from "@features/slices";

export interface IPhoneNumber {
  id: string | number;
  mobileNumber: string;
  purpose: string;
  totalOTPsTaken: number;
  selectedDeductionSet: IFinalDeductionSet[];
  updatedAt: string;
}
