export const PRODUCT_API_TAG = "Products";

const PRODUCT_BASE_URL = "/api/products";

export const PRODUCT_API_PATHS = {
  BASE: PRODUCT_BASE_URL,
  CREATE: `${PRODUCT_BASE_URL}/create-product`,
  BY_ID: (productId: string) => `${PRODUCT_BASE_URL}/${productId}`,
  SP_BY_CATEGORYID: (categoryId: string) =>
    `${PRODUCT_BASE_URL}/single-product/${categoryId}/by-category`,
  UPDATE: (productSlug: string) =>
    `${PRODUCT_BASE_URL}/update-product/${productSlug}`,
  DELETE: (productId: string) =>
    `${PRODUCT_BASE_URL}/delete-product/${productId}`,
  DETAILS_UNIQUE_URL: (productUniqueURL: string) =>
    `${PRODUCT_BASE_URL}/product-details/${productUniqueURL}`,
  PRODUCT_QUESTIONS: (productId: string) =>
    `${PRODUCT_BASE_URL}/${productId}/product-questions`,
} as const;
