// import { useState, useEffect, useCallback } from "react";

// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   filterCategory,
//   filterProduct,
//   filterPage,
//   clearFilter,
// } from "@features/adminSlices/filterSlice";
// import { ConfirmationModal } from "@components/admin";
// import axios from "axios";
// import { ROUTES } from "@routes";
// import { ArrowLeftIcon, ArrowRightIcon } from "@icons";
// import { RootState } from "@features/store";
// import { ProductCard } from "./components";
// import {
//   IAllProductsResponse,
//   IProductResponse,
// } from "@features/api/productsApi/types";
// import { ICategoryResponse } from "@features/api/categories/types";
// import {
//   useDeleteProductMutation,
//   useGetAllProductsQuery,
//   useGetCategoriesQuery,
// } from "@api";
// import {
//   Button,
//   CustomSelect,
//   FlexBox,
//   FormInput,
//   Typography,
// } from "@components/general";
// import { Loading } from "@components/user";

// export interface IPendingPricingMobile {
//   productName: string;
//   variants: string[];
// }

// export const ProductsList = () => {
//   const [limit] = useState<number>(20);
//   const [pendingPricingMobiles, setPendingPricingMobiles] = useState<
//     IPendingPricingMobile[]
//   >([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   const dispatch = useDispatch();
//   const filterData = useSelector(
//     (state: RootState) => state.filter.productsList
//   );

//   const [categoryId, setCategoryId] = useState<string>(filterData.category);

//   // @ts-ignore
//   const { data: productsData, isLoading: productsDataLoading } =
//     useGetAllProductsQuery<IAllProductsResponse>({
//       page: filterData.page,
//       limit,
//       search: filterData.product,
//       categoryId,
//       status: "",
//     });

//   // @ts-ignore
//   const { data: categoryData } = useGetCategoriesQuery<ICategoryResponse[]>();

//   const [deleteProduct] = useDeleteProductMutation();

//   // Delete Modal
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<string>("");

//   const handleDelete = useCallback(
//     async (productId: string) => {
//       try {
//         await deleteProduct(productId);
//       } catch (err) {
//         console.error("Error deleting product:", err);
//       }
//     },
//     [deleteProduct]
//   );

//   const selectCategoryFunc = useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const value = e.target.value;
//       setCategoryId(value);
//       dispatch(filterCategory({ category: value, from: "productsList" }));
//     },
//     [dispatch]
//   );

//   const findPendingPricing = (
//     product: IProductResponse
//   ): IPendingPricingMobile | undefined => {
//     return pendingPricingMobiles.find((pp) => pp.productName === product.name);
//   };

//   // Validate page range
//   useEffect(() => {
//     if (productsData) {
//       if (filterData.page < 1) {
//         dispatch(filterPage({ page: 1, from: "productsList" }));
//       } else if (filterData.page > productsData.totalPages) {
//         dispatch(
//           filterPage({ page: productsData.totalPages, from: "productsList" })
//         );
//       }
//     }
//   }, [productsData, filterData.page, dispatch]);

//   // Fetch pending pricing
//   useEffect(() => {
//     const checkPricing = async () => {
//       try {
//         setLoading(true);
//         const result = await axios.get<IPendingPricingMobile[]>(
//           `${import.meta.env.VITE_APP_BASE_URL}/api/pricing/empty-pricing`
//         );
//         setPendingPricingMobiles(result.data);
//       } catch (error) {
//         console.error("Error while checking pricing", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkPricing();
//   }, []);

//   if (loading) return <Loading />;

//   return (
//     <div className="flex flex-col gap-2 p-1 md:p-4">
//       <CustomSelect
//         label={`Total: ${pendingPricingMobiles.length} products pending for pricing..!`}
//         options={pendingPricingMobiles}
//         onChange={() => {}}
//         displayKey="productName"
//         valueKey="productName"
//         placeholder="View product names..."
//         className="w-72"
//       />

//       {/* Filters */}
//       <div className="w-[96%] flex flex-wrap items-center justify-between gap-3 border rounded-lg shadow px-3 py-2 mb-6">
//         {/* Category */}
//         <select
//           id="category"
//           onChange={selectCategoryFunc}
//           value={filterData.category}
//           className="px-2 py-1 border rounded text-sm"
//         >
//           <option value="">Select Category</option>
//           {categoryData?.map((category: ICategoryResponse) => (
//             <option key={category._id} value={category._id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         <FlexBox className="gap-2 max-sm:flex-col" fullWidth>
//           {/* Search Product */}

//           <FormInput
//             type="search"
//             value={filterData.product}
//             placeholder="Search a product"
//             onChange={(e) => {
//               dispatch(
//                 filterProduct({ product: e.target.value, from: "productsList" })
//               );
//               dispatch(filterPage({ page: 1, from: "productsList" }));
//             }}
//           />

//           {/* Jump to Page */}
//           <FormInput
//             type="number"
//             value={filterData.page}
//             placeholder="Go to page"
//             onChange={(e) =>
//               dispatch(
//                 filterPage({
//                   page: Number(e.target.value),
//                   from: "productsList",
//                 })
//               )
//             }
//             disabled={productsData?.totalPages <= 1}
//           />
//         </FlexBox>

//         <FlexBox justify="around" className="max-sm:flex-col" fullWidth>
//           {/* Clear Filter */}
//           <Button
//             shape="square"
//             variant="danger"
//             size="sm"
//             onClick={() => {
//               dispatch(clearFilter({ clear: "productsList" }));
//               setCategoryId("");
//             }}
//             disabled={!filterData.filtered}
//           >
//             Clear
//           </Button>

//           {/* Pagination Controls */}
//           <FlexBox gap={2}>
//             <Button
//               shape="square"
//               size="sm"
//               leftIcon={<ArrowLeftIcon />}
//               onClick={() =>
//                 dispatch(
//                   filterPage({
//                     page: filterData.page - 1,
//                     from: "productsList",
//                   })
//                 )
//               }
//               disabled={productsData?.page === 1}
//             >
//               Previous
//             </Button>

//             <Typography>
//               Page {productsData?.page || 0} of {productsData?.totalPages || 0}
//             </Typography>

//             <Button
//               shape="square"
//               size="sm"
//               rightIcon={<ArrowRightIcon />}
//               onClick={() =>
//                 dispatch(
//                   filterPage({
//                     page: filterData.page + 1,
//                     from: "productsList",
//                   })
//                 )
//               }
//               disabled={productsData?.page === productsData?.totalPages}
//             >
//               Next
//             </Button>
//           </FlexBox>

//           {/* Create Product */}
//           <Link to={ROUTES.admin.createProduct}>
//             <Button shape="square" size="sm">
//               Create Product
//             </Button>
//           </Link>
//         </FlexBox>
//       </div>

//       {/* Products */}
//       <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {productsData?.products?.map((product: IProductResponse) => (
//           <ProductCard
//             key={product._id}
//             data={product}
//             isPricingPending={findPendingPricing(product)}
//           />
//         ))}
//       </div>

//       {/* Delete Modal */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onConfirm={handleDelete}
//         itemToDelete={productToDelete}
//         title="Confirm Deletion"
//         description="Are you sure you want to delete this item? This action cannot be undone."
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };
