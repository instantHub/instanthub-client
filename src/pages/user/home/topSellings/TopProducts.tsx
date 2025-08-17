import { FC, useEffect } from "react";
import { FlexBox } from "@components/general";
import { useLazyGetTopSellingProductsQuery } from "@features/api";
import { useNavigate } from "react-router-dom";
import { SkeletonRow } from "./TopProductsSkeleton";
import { IProductResponse } from "@features/api/productsApi/types";
import { LOCATIONS } from "@utils/constants";

interface ITopProduct {
  totalSold: number;
  product: IProductResponse;
}

interface ITopProductsProps {
  products: ITopProduct[];
}

export const TopProducts: FC<ITopProductsProps> = ({ products }) => {
  //   console.log("products", products);

  const navigate = useNavigate();

  const handleSellNow = (product: any): void => {
    navigate(
      `${LOCATIONS.BENGALURU}/${product?.category?.uniqueURL}/${product?.brand?.uniqueURL}/${product?.uniqueURL}`
    );
  };

  const formatPrice = (price: number): string => {
    const modifiedPrice = price + 8000;
    return `₹${modifiedPrice?.toLocaleString("en-IN")}`;
  };

  //   const handleNavigate = (): void => {};

  return (
    <div className="max-w-[800px] overflow-hidden mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Top Selling Products
      </h1>

      <div
        className="bg-white max-h-[500px] rounded-lg shadow-sm border border-gray-200 overflow-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Header */}
        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 sm:col-span-7">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Top Sellings
              </h2>
            </div>
            <div className="col-span-3 sm:col-span-2 max-sm:hidden">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 text-center">
                Price
              </h2>
            </div>
            <div className="col-span-3 sm:col-span-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 text-center max-sm:text-end">
                Action
              </h2>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="divide-y divide-gray-200 max-sm:hidden">
          {products?.length <= 0
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            : products?.map(({ product }, i) => (
                <div key={i}>
                  <div className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-6 sm:col-span-7 flex items-center space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                            <img
                              src={`${import.meta.env.VITE_APP_BASE_URL}${
                                product?.image
                              }`}
                              alt={product?.name}
                              className="h-[95%]"
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                            {product?.name}
                          </h3>
                          <FlexBox gap={1} justify="start">
                            {product?.category?.categoryType?.multiVariants &&
                              product.variants.map(({ name }) => (
                                <p
                                  key={name}
                                  className="text-xs text-gray-500 mt-1"
                                >
                                  ({name})
                                </p>
                              ))}
                          </FlexBox>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-3 sm:col-span-2 text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          Get Upto
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-red-500">
                          {formatPrice(product?.variants[0]?.price)}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="col-span-3 sm:col-span-3 text-center">
                        <button
                          onClick={() => handleSellNow(product)}
                          className="w-full bg-instant-mid/80 hover:bg-instant-mid text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          Sell Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Mobile optimized alternative layout */}
      <div
        className="sm:hidden mt-4 max-h-[500px] overflow-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-4">
          {products?.length <= 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`mobile-skeleton-${i}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="flex gap-2">
                        <div className="h-3 bg-gray-200 rounded w-10" />
                        <div className="h-3 bg-gray-200 rounded w-10" />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <div className="h-3 bg-gray-200 rounded w-12 mb-1" />
                          <div className="h-5 bg-gray-200 rounded w-16" />
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : products?.map(({ product }, i) => (
                <div key={`mobile-${i}`}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl">
                          <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}${
                              product?.image
                            }`}
                            alt={product?.name}
                            className="h-[95%]"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-gray-900">
                          {product?.name}
                        </h3>
                        <FlexBox gap={1} justify="start">
                          {product?.category?.categoryType?.multiVariants &&
                            product.variants.map(({ name }) => (
                              <p
                                key={name}
                                className="text-[11px] text-gray-500 mt-1"
                              >
                                ({name})
                              </p>
                            ))}
                        </FlexBox>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-gray-500">
                              Get Upto
                            </div>
                            <div className="text-sm font-bold text-red-500">
                              {formatPrice(product?.variants[0]?.price)}
                            </div>
                          </div>
                          <button
                            onClick={() => handleSellNow(product)}
                            className="bg-instant-mid/80 hover:bg-instant-mid text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                          >
                            Sell Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
