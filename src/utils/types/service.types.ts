import { FC, ReactNode } from "react";

export interface IServiceData {
  _id: number;
  name: string;
  uniqueURL: string;
  description?: string;
  image: string;
}

export interface IServiceImageCarouselItem {
  id: number;
  image: string;
  title: string;
  description?: string;
  price?: string;
  features?: string[];
}

export interface IWhyChooseItems {
  icon: ReactNode;
  title: string;
  description: string;
}
