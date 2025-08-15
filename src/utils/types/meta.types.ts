export interface IMetaTag {
  id?: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryMeta extends IMetaTag {
  categoryId: string;
  category?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
}

export interface BrandMeta extends IMetaTag {
  categoryId: string;
  brandId: string;
  category?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
  brand?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
}

export interface ProductMeta extends IMetaTag {
  categoryId: string;
  brandId: string;
  productId: string;
  category?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
  brand?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
  product?: {
    id: string;
    name: string;
    uniqueURL: string;
  };
}

export type MetaType = "category" | "brand" | "product";

export interface MetaFormData {
  type: MetaType;
  categoryId: string;
  brandId?: string;
  productId?: string;
  metaData: Partial<IMetaTag>;
}

export interface Category {
  id: string;
  name: string;
  uniqueURL: string;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  uniqueURL: string;
  categoryId: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  uniqueURL: string;
  categoryId: string;
  brandId: string;
  description?: string;
  price: number;
}
