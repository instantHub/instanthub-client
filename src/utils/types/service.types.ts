import { ReactNode } from "react";

export enum SERVICES_NAME {
  INTERIOR = "interior-design",
  AC_REPAIR = "acrepair",
  CARPENTRY = "carpentry",
  CATERING = "catering",
}

export enum SERVICES_LABELS {
  INTERIOR = "Interior Design",
  AC_REPAIR = "AC Repair",
  CARPENTRY = "Carpentry Service",
  CATERING = "Catering Service",
}

export type services = keyof typeof SERVICES_NAME;

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

export interface IWhatWeOfferItems {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface ITestimonial {
  name: string;
  location: string;
  testimonial: string;
  rating: number;
}
