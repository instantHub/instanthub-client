import {
  ICategoryResponse,
  ICategoryType,
} from "@features/api/categoriesApi/types";

export type TState = Pick<ICategoryResponse, "categoryType" | "uniqueURL"> & {
  category: string;
  imageSelected: File | null;
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
