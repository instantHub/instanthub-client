import {
  ICategoryResponse,
  ICategoryType,
} from "@features/api/categories/types";

export type TState = Pick<ICategoryResponse, "categoryType" | "uniqueURL"> & {
  category: string;
};

export type TStateActionName =
  | "category"
  | "uniqueURL"
  | "imageSelected"
  | keyof ICategoryType;

export type TAction =
  | {
      type: "UPDATE_FIELD";
      name: TStateActionName;
      value: string | File | null;
    }
  | {
      type: "UPDATE_CATEGORY_TYPE";
      name: keyof ICategoryType;
      value: boolean;
    }
  | { type: "RESET" };
