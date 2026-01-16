export interface ISlider {
  _id: string;
  image: string;
  status: TSliderStatus;
  createdAt?: Date;
}

export type TSliderStatus = "Active" | "Inactive";
