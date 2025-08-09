import { SERVICES_LABELS, SERVICES_NAME } from "@utils/types";
import { ReactNode } from "react";

export interface BaseFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  location: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: string;
}

export interface FormData extends BaseFormData {
  [key: string]: any;
}

export interface FieldConfig {
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "date"
    | "time";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[] | { value: string; label: string }[];
  rows?: number;
  validation?: (value: any) => string | null;
  icon?: ReactNode;
  multiple?: boolean;
  min?: string;
}

export interface ServiceConfig {
  label: SERVICES_LABELS;
  icon: ReactNode;
  fields: Record<string, FieldConfig>;
}
