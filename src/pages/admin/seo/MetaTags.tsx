import { FC, useState } from "react";
import { MetaTagsForm } from "./MetaTagForm";
import {
  useGetCategoriesQuery,
  useLazyGetBrandsByCategoryQuery,
  useLazyGetProductsQuery,
} from "@features/api";
import { Button, FlexBox } from "@components/general";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";

export interface ISelectedURLs {
  categoryUniqueURL: string;
  brandUniqueURL: string;
  productUniqueURL: string;
}

export const MetaTags: FC = () => {
  const navigate = useNavigate();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [getBrands, { data: brandsData, isLoading: brandsLoading }] =
    useLazyGetBrandsByCategoryQuery();

  const [getProducts, { data: productsData, isLoading: productsLoading }] =
    useLazyGetProductsQuery();

  const [selectedURLs, setSelectedURLs] = useState<ISelectedURLs>({
    categoryUniqueURL: "",
    brandUniqueURL: "",
    productUniqueURL: "",
  });

  // Handle category change
  const handleCategoryChange = (uniqueURL: string) => {
    setSelectedURLs({
      categoryUniqueURL: uniqueURL,
      brandUniqueURL: "",
      productUniqueURL: "",
    });

    if (uniqueURL) {
      getBrands(uniqueURL);
    }
  };

  // Handle brand change
  const handleBrandChange = (uniqueURL: string) => {
    setSelectedURLs((prev) => ({
      ...prev,
      brandUniqueURL: uniqueURL,
      productUniqueURL: "",
    }));

    if (uniqueURL) {
      getProducts({ brandUniqueURL: uniqueURL }); // Assuming this fetches products for that brand
    }
  };

  // Handle product change
  const handleProductChange = (uniqueURL: string) => {
    setSelectedURLs((prev) => ({
      ...prev,
      productUniqueURL: uniqueURL,
    }));
  };

  const handleNavigate = (): void => {
    navigate(ROUTES.admin.marketing.metaTagList);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <FlexBox justify="between">
        <h1 className="text-2xl font-bold">Manage Meta Tags</h1>
        <Button onClick={handleNavigate}>Meta Tags List</Button>
      </FlexBox>

      {/* CATEGORY DROPDOWN */}
      <div>
        <label className="block font-medium mb-1">Select Category</label>
        <select
          value={selectedURLs.categoryUniqueURL}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">-- Select Category --</option>
          {categoriesLoading ? (
            <option>Loading...</option>
          ) : (
            categoriesData?.map((cat: any) => (
              <option key={cat.id} value={cat.uniqueURL}>
                {cat.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* BRAND DROPDOWN (only show if category is selected) */}
      {selectedURLs.categoryUniqueURL && (
        <div>
          <label className="block font-medium mb-1">Select Brand</label>
          <select
            value={selectedURLs.brandUniqueURL}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">-- Select Brand --</option>
            {brandsLoading ? (
              <option>Loading...</option>
            ) : (
              brandsData?.map((brand: any) => (
                <option key={brand.id} value={brand.uniqueURL}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      {/* PRODUCT DROPDOWN (only show if brand is selected) */}
      {selectedURLs.brandUniqueURL && (
        <div>
          <label className="block font-medium mb-1">Select Product</label>
          <select
            value={selectedURLs.productUniqueURL}
            onChange={(e) => handleProductChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">-- Select Product --</option>
            {productsLoading ? (
              <option>Loading...</option>
            ) : (
              productsData?.map((product: any) => (
                <option key={product.id} value={product.uniqueURL}>
                  {product.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      {/* META TAGS FORM */}
      {selectedURLs.categoryUniqueURL &&
        !selectedURLs.brandUniqueURL &&
        !selectedURLs.productUniqueURL && (
          <MetaTagsForm
            type="category"
            title={`Adding Meta Tags to ${selectedURLs.categoryUniqueURL.toUpperCase()} Category`}
            uniqueURL={selectedURLs.categoryUniqueURL}
            selectedURLS={selectedURLs}
          />
        )}

      {selectedURLs.brandUniqueURL && !selectedURLs.productUniqueURL && (
        <MetaTagsForm
          type="brand"
          title={`Adding Meta Tags to ${selectedURLs.brandUniqueURL.toUpperCase()} Brand`}
          uniqueURL={selectedURLs.brandUniqueURL}
          selectedURLS={selectedURLs}
        />
      )}

      {selectedURLs.productUniqueURL && (
        <MetaTagsForm
          type="product"
          title={`Adding Meta Tags to ${selectedURLs.productUniqueURL.toUpperCase()} Product`}
          uniqueURL={selectedURLs.productUniqueURL}
          selectedURLS={selectedURLs}
        />
      )}
    </div>
  );
};
