import { FC, useState, useMemo } from "react";
import {
  useGetCategoriesQuery,
  useLazyGetBrandsByCategoryQuery,
  useLazyGetProductsQuery,
} from "@features/api";
import { Button, FlexBox } from "@components/general";

export const MetaTagsList: FC = () => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [getBrands, { data: brandsData, isLoading: brandsLoading }] =
    useLazyGetBrandsByCategoryQuery();

  const [getProducts, { data: productsData, isLoading: productsLoading }] =
    useLazyGetProductsQuery();

  const [selectedData, setSelectedData] = useState({
    categoryUniqueURL: "",
    brandUniqueURL: "",
    productUniqueURL: "",
  });

  const handleCategoryChange = (uniqueURL: string) => {
    setSelectedData({
      categoryUniqueURL: uniqueURL,
      brandUniqueURL: "",
      productUniqueURL: "",
    });
    if (uniqueURL) getBrands(uniqueURL);
  };

  const handleBrandChange = (uniqueURL: string) => {
    setSelectedData((prev) => ({
      ...prev,
      brandUniqueURL: uniqueURL,
      productUniqueURL: "",
    }));
    if (uniqueURL) getProducts({ brandUniqueURL: uniqueURL });
  };

  const handleProductChange = (uniqueURL: string) => {
    setSelectedData((prev) => ({
      ...prev,
      productUniqueURL: uniqueURL,
    }));
  };

  // Decide which dataset to show
  const tableData = useMemo(() => {
    if (selectedData.productUniqueURL) {
      return (
        productsData?.filter(
          (p: any) => p.uniqueURL === selectedData.productUniqueURL
        ) || []
      );
    }
    if (selectedData.brandUniqueURL) {
      return productsData || [];
    }
    if (selectedData.categoryUniqueURL) {
      return brandsData || [];
    }
    return categoriesData || [];
  }, [selectedData, categoriesData, brandsData, productsData]);

  const isMetaMissing = (item: any) => {
    return (
      !item.metaTitle ||
      !item.metaDescription ||
      !item.metaKeywords ||
      item.metaKeywords.length === 0 ||
      !item.canonicalUrl
    );
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <FlexBox justify="between">
        <h1 className="text-2xl font-bold">Meta Tags Overview</h1>
        <Button onClick={goBack}>Back</Button>
      </FlexBox>

      {/* CATEGORY DROPDOWN */}
      <div>
        <label className="block font-medium mb-1">Select Category</label>
        <select
          value={selectedData.categoryUniqueURL}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">-- Select Category --</option>
          {categoriesLoading ? (
            <option>Loading...</option>
          ) : (
            categoriesData?.map((cat: any) => (
              <option key={cat._id} value={cat.uniqueURL}>
                {cat.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* BRAND DROPDOWN */}
      {selectedData.categoryUniqueURL && (
        <div>
          <label className="block font-medium mb-1">Select Brand</label>
          <select
            value={selectedData.brandUniqueURL}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">-- Select Brand --</option>
            {brandsLoading ? (
              <option>Loading...</option>
            ) : (
              brandsData?.map((brand: any) => (
                <option key={brand._id} value={brand.uniqueURL}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      {/* PRODUCT DROPDOWN */}
      {selectedData.brandUniqueURL && (
        <div>
          <label className="block font-medium mb-1">Select Product</label>
          <select
            value={selectedData.productUniqueURL}
            onChange={(e) => handleProductChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">-- Select Product --</option>
            {productsLoading ? (
              <option>Loading...</option>
            ) : (
              productsData?.map((product: any) => (
                <option key={product._id} value={product.uniqueURL}>
                  {product.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-3">Name</th>
              <th className="p-3">Meta Title</th>
              <th className="p-3">Meta Description</th>
              <th className="p-3">Keywords</th>
              <th className="p-3">Canonical URL</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any) => {
              const missing = isMetaMissing(item);
              return (
                <tr
                  key={item._id}
                  className={`text-sm border-t ${
                    missing ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <td className="p-3 font-medium">{item.name}</td>
                  <td className="p-3">
                    {item.metaTitle || (
                      <span className="text-red-500">Missing</span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.metaDescription || (
                      <span className="text-red-500">Missing</span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.metaKeywords?.length ? (
                      item.metaKeywords.join(", ")
                    ) : (
                      <span className="text-red-500">Missing</span>
                    )}
                  </td>
                  <td className="p-3">
                    {item.canonicalUrl || (
                      <span className="text-red-500">Missing</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="space-y-4 hidden">
        {tableData?.map((item: any) => {
          const missing = isMetaMissing(item);
          return (
            <div
              key={item._id}
              className={`p-4 border rounded-lg shadow-sm ${
                missing ? "bg-red-50" : "bg-white"
              }`}
            >
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm">
                <strong>Meta Title:</strong>{" "}
                {item.metaTitle || (
                  <span className="text-red-500">Missing</span>
                )}
              </div>
              <div className="text-sm">
                <strong>Description:</strong>{" "}
                {item.metaDescription || (
                  <span className="text-red-500">Missing</span>
                )}
              </div>
              <div className="text-sm">
                <strong>Keywords:</strong>{" "}
                {item.metaKeywords?.length ? (
                  item.metaKeywords.join(", ")
                ) : (
                  <span className="text-red-500">Missing</span>
                )}
              </div>
              <div className="text-sm">
                <strong>Canonical URL:</strong>{" "}
                {item.canonicalUrl || (
                  <span className="text-red-500">Missing</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
