import { ICategoryResponse } from "../categories/types";

export interface IBrandResponse {
  _id: string;
  name: string;
  image: string;
  uniqueURL: string;
  series: Array<Object>;
  products: Array<string>;
  category: ICategoryResponse;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  canonicalUrl: string;
}

export type IBrandLite = Pick<
  IBrandResponse,
  "_id" | "name" | "image" | "uniqueURL"
>;
