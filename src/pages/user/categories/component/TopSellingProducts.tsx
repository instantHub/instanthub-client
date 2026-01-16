// import { FC, useEffect } from "react";
// import { FlexBox } from "@components/general";
// import { useLazyGetTopSellingProductsQuery } from "@features/api";
// import { useNavigate } from "react-router-dom";

// interface ITopSellingProductsProps {
//   categoryName: string;
// }

// export const TopSellingProducts: FC<ITopSellingProductsProps> = ({
//   categoryName,
// }) => {
//   const [getProducts, { data: topSellingProducts }] =
//     useLazyGetTopSellingProductsQuery();

//   const navigate = useNavigate();

//   const handleSellNow = (product: any): void => {
//     console.log("product", product);
//     navigate(`${product?.brand?.uniqueURL}/${product?.uniqueURL}`);
//   };

//   const formatPrice = (price: number): string => {
//     return `₹${price?.toLocaleString("en-IN")}`;
//   };

//   useEffect(() => {
//     if (categoryName) {
//       getProducts(categoryName);
//     }
//   }, [categoryName, getProducts]);

//   return (
//     <div className="max-w-[800px] overflow-hidden mx-auto p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
//         Top Selling {categoryName}s
//       </h1>

//       <div
//         className="bg-white max-h-[500px] rounded-lg shadow-sm border border-gray-200 overflow-scroll"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {/* Header */}
//         <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
//           <div className="grid grid-cols-12 gap-4 items-center">
//             <div className="col-span-6 sm:col-span-7">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900">
//                 Top Selling {categoryName}s
//               </h2>
//             </div>
//             <div className="col-span-3 sm:col-span-2">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900 text-center">
//                 Price
//               </h2>
//             </div>
//             <div className="col-span-3 sm:col-span-3">
//               <h2 className="text-sm sm:text-base font-semibold text-gray-900 text-center">
//                 Action
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Product List */}
//         <div className="divide-y divide-gray-200 max-sm:hidden">
//           {topSellingProducts?.map(({ productId: product }, i) => (
//             <div key={i}>
//               <div className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
//                 <div className="grid grid-cols-12 gap-4 items-center">
//                   {/* Product Info */}
//                   <div className="col-span-6 sm:col-span-7 flex items-center space-x-3 sm:space-x-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-xl sm:text-2xl">
//                         <img
//                           src={`${import.meta.env.VITE_APP_BASE_URL}${
//                             product?.image
//                           }`}
//                           alt={product?.name}
//                           className="h-[95%]"
//                         />
//                       </div>
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
//                         {product?.name}
//                       </h3>
//                       <FlexBox gap={1} justify="start">
//                         {product?.category?.categoryType?.multiVariants &&
//                           product.variants.map(({ name }) => (
//                             <p
//                               key={name}
//                               className="text-xs text-gray-500 mt-1"
//                             >
//                               ({name})
//                             </p>
//                           ))}
//                       </FlexBox>
//                     </div>
//                   </div>

//                   {/* Price */}
//                   <div className="col-span-3 sm:col-span-2 text-center">
//                     <div className="text-xs text-gray-500 mb-1">Get Upto</div>
//                     <div className="text-lg sm:text-xl font-bold text-red-500">
//                       {formatPrice(product?.variants[0].price)}
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <div className="col-span-3 sm:col-span-3 text-center">
//                     <button
//                       onClick={() => handleSellNow(product)}
//                       className="w-full bg-instant-mid/80 hover:bg-instant-mid text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//                     >
//                       Sell Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Mobile optimized alternative layout for very small screens */}
//       <div
//         className="sm:hidden mt-4 max-h-[500px] overflow-scroll"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         <div className="space-y-4">
//           {topSellingProducts?.map(({ productId: product }, i) => (
//             <div key={`mobile-${i}`}>
//               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//                 <div className="flex items-start space-x-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl">
//                       <img
//                         src={`${import.meta.env.VITE_APP_BASE_URL}${
//                           product?.image
//                         }`}
//                         alt={product?.name}
//                         className="h-[95%]"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-base font-medium text-gray-900">
//                       {product?.name}
//                     </h3>
//                     <FlexBox gap={1} justify="start">
//                       {product?.category?.categoryType?.multiVariants &&
//                         product.variants.map(({ name }) => (
//                           <p
//                             key={name}
//                             className="text-[11px] text-gray-500 mt-1"
//                           >
//                             ({name})
//                           </p>
//                         ))}
//                     </FlexBox>
//                     <div className="mt-3 flex items-center justify-between">
//                       <div>
//                         <div className="text-xs text-gray-500">Get Upto</div>
//                         <div className="text-sm font-bold text-red-500">
//                           {formatPrice(product?.variants[0].price)}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => handleSellNow(product)}
//                         className="bg-instant-mid/80 hover:bg-instant-mid text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
//                       >
//                         Sell Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import { FC, useEffect, useState, UIEvent } from "react";
import { FlexBox } from "@components/general";
import { useLazyGetTopSellingProductsQuery } from "@features/api";
import { useNavigate } from "react-router-dom";

interface ITopSellingProductsProps {
  categoryName: string;
}

export const TopSellingProducts: FC<ITopSellingProductsProps> = ({
  categoryName,
}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [getProducts, { isFetching }] = useLazyGetTopSellingProductsQuery();

  const handleSellNow = (product: any): void => {
    navigate(`${product?.brand?.uniqueURL}/${product?.uniqueURL}`);
  };

  const formatPrice = (price: number): string =>
    `₹${price?.toLocaleString("en-IN")}`;

  /* 🔹 Initial load & category change */
  useEffect(() => {
    if (!categoryName) return;

    setPage(1);
    setProducts([]);
    setHasMore(true);

    getProducts({ categoryName, page: 1 }).then((res: any) => {
      setProducts(res?.data?.data || []);
      setHasMore(res?.data?.hasMore);
    });
  }, [categoryName]);

  /* 🔹 Infinite scroll handler */
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (
      scrollHeight - scrollTop <= clientHeight + 60 &&
      hasMore &&
      !isFetching
    ) {
      const nextPage = page + 1;
      setPage(nextPage);

      getProducts({ categoryName, page: nextPage }).then((res: any) => {
        setProducts((prev) => [...prev, ...(res?.data?.data || [])]);
        setHasMore(res?.data?.hasMore);
      });
    }
  };

  return (
    <div className="max-w-[800px] overflow-hidden mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Top Selling {categoryName}s
      </h1>

      {/* ================= DESKTOP LIST ================= */}
      <div
        className="bg-white max-h-[500px] rounded-lg shadow-sm border border-gray-200 overflow-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={handleScroll}
      >
        {/* Header */}
        <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 sm:col-span-7">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Top Selling {categoryName}s
              </h2>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center">Price</div>
            <div className="col-span-3 sm:col-span-3 text-center">Action</div>
          </div>
        </div>

        {/* Product List */}
        <div className="divide-y divide-gray-200 max-sm:hidden">
          {products.map(({ productId: product }, i) => (
            <div key={i} className="px-4 sm:px-6 py-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product */}
                <div className="col-span-6 sm:col-span-7 flex space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}${
                        product?.image
                      }`}
                      alt={product?.name}
                      className="h-[95%]"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <h3 className="font-medium truncate">{product?.name}</h3>
                    <FlexBox gap={1}>
                      {product?.category?.categoryType?.multiVariants &&
                        product?.variants?.map(({ name }: { name: string }) => (
                          <p key={name} className="text-xs text-gray-500">
                            ({name})
                          </p>
                        ))}
                    </FlexBox>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-3 sm:col-span-2 text-center">
                  <div className="text-xs text-gray-500">Get Upto</div>
                  <div className="text-lg font-bold text-red-500">
                    {formatPrice(product?.variants?.[0]?.price)}
                  </div>
                </div>

                {/* Action */}
                <div className="col-span-3 sm:col-span-3 text-center">
                  <button
                    onClick={() => handleSellNow(product)}
                    className="w-full bg-instant-mid/80 hover:bg-instant-mid text-white py-2 rounded-md"
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isFetching && (
            <div className="py-4 text-center text-sm text-gray-500">
              Loading more products...
            </div>
          )}

          {!hasMore && (
            <div className="py-4 text-center text-xs text-gray-400">
              No more products
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE LIST ================= */}
      <div
        className="sm:hidden mt-4 max-h-[500px] overflow-scroll"
        onScroll={handleScroll}
      >
        <div className="space-y-4">
          {products.map(({ productId: product }, i) => (
            <div key={`mobile-${i}`} className="bg-white p-4 rounded-lg">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={`${import.meta.env.VITE_APP_BASE_URL}${
                      product?.image
                    }`}
                    alt={product?.name}
                    className="h-[95%]"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product?.name}</h3>
                  <div className="text-sm font-bold text-red-500 mt-2">
                    {formatPrice(product?.variants?.[0]?.price)}
                  </div>
                  <button
                    onClick={() => handleSellNow(product)}
                    className="mt-3 bg-instant-mid/80 text-white px-4 py-2 rounded-md"
                  >
                    Sell Now
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isFetching && (
            <div className="text-center text-sm text-gray-500">
              Loading more products...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
