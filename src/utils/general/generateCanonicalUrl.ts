type ItemType = "category" | "brand" | "product";

interface ICanonicalParams {
  citySlug: string; // e.g., "bengaluru"
  categorySlug: string; // e.g., "sell-old-mobile"
  brandSlug?: string; // e.g., "apple-mobile"
  productSlug?: string; // e.g., "sell-old-iphone-11"
  type: ItemType;
}

export const generateCanonicalUrl = ({
  citySlug,
  categorySlug,
  brandSlug,
  productSlug,
  type,
}: ICanonicalParams): string => {
  console.log("generateCanonicalUrl");

  const baseUrl = "https://www.instanthub.in";

  switch (type) {
    case "category":
      return `${baseUrl}/${citySlug}/${categorySlug}`;

    case "brand":
      if (!brandSlug) throw new Error("Brand slug is required for brand URL");
      return `${baseUrl}/${citySlug}/${categorySlug}/${brandSlug}`;

    case "product":
      if (!brandSlug || !productSlug) {
        throw new Error("Brand and product slugs are required for product URL");
      }
      return `${baseUrl}/${citySlug}/${categorySlug}/${brandSlug}/${productSlug}`;

    default:
      throw new Error("Invalid type for canonical URL");
  }
};
