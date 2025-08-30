import { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategory,
  filterProduct,
  filterPage,
  clearFilter,
} from "@features/adminSlices/filterSlice";
import { ConfirmationModal } from "@components/admin";
import axios from "axios";
import { ROUTES } from "@routes";
import { ArrowLeftIcon, ArrowRightIcon } from "@icons";
import { RootState } from "@features/store";
import { ProductCard } from "./components";
import {
  IAllProductsResponse,
  IProductResponse,
} from "@features/api/productsApi/types";
import { ICategoryResponse } from "@features/api/categoriesApi/types";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "@api";

export interface IPendingPricingMobile {
  productName: string;
  variants: string[];
}

export const ProductsList = () => {
  const [limit] = useState<number>(20);
  const [pendingPricingMobiles, setPendingPricingMobiles] = useState<
    IPendingPricingMobile[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const filterData = useSelector(
    (state: RootState) => state.filter.productsList
  );

  const [categoryId, setCategoryId] = useState<string>(filterData.category);

  // @ts-ignore
  const { data: productsData, isLoading: productsDataLoading } =
    useGetAllProductsQuery<IAllProductsResponse>({
      page: filterData.page,
      limit,
      search: filterData.product,
      categoryId,
    });

  // @ts-ignore
  const { data: categoryData } = useGetCategoriesQuery<ICategoryResponse[]>();

  const [deleteProduct] = useDeleteProductMutation();

  // Delete Modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string>("");

  const handleDelete = useCallback(
    async (productId: string) => {
      try {
        await deleteProduct(productId);
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    },
    [deleteProduct]
  );

  const selectCategoryFunc = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setCategoryId(value);
      dispatch(filterCategory({ category: value, from: "productsList" }));
    },
    [dispatch]
  );

  const findPendingPricing = (
    product: IProductResponse
  ): IPendingPricingMobile | undefined => {
    return pendingPricingMobiles.find((pp) => pp.productName === product.name);
  };

  // Validate page range
  useEffect(() => {
    if (productsData) {
      if (filterData.page < 1) {
        dispatch(filterPage({ page: 1, from: "productsList" }));
      } else if (filterData.page > productsData.totalPages) {
        dispatch(
          filterPage({ page: productsData.totalPages, from: "productsList" })
        );
      }
    }
  }, [productsData, filterData.page, dispatch]);

  // Fetch pending pricing
  useEffect(() => {
    const checkPricing = async () => {
      try {
        setLoading(true);
        const result = await axios.get<IPendingPricingMobile[]>(
          `${import.meta.env.VITE_APP_BASE_URL}/api/pricing/empty-pricing`
        );
        setPendingPricingMobiles(result.data);
      } catch (error) {
        console.error("Error while checking pricing", error);
      } finally {
        setLoading(false);
      }
    };

    checkPricing();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 text-sm">
      <h2 className="text-center text-2xl font-bold font-serif mb-4">
        Products Table
      </h2>

      {loading ? (
        <div className="w-full text-right px-4">Loading...</div>
      ) : (
        <div className="w-full flex flex-wrap justify-end gap-2 text-xs sm:text-sm mb-4">
          <p>Total: {pendingPricingMobiles.length} products pending pricing</p>
          <select
            className="border px-2 py-1 rounded disabled:bg-gray-200"
            onChange={(e) =>
              dispatch(
                filterProduct({ product: e.target.value, from: "productsList" })
              )
            }
          >
            <option value="">View Pending</option>
            {pendingPricingMobiles.map((item, i) => (
              <option key={item.productName} value={item.productName}>
                {i + 1}. {item.productName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filters */}
      <div className="w-[96%] flex flex-wrap items-center justify-between gap-3 border rounded-lg shadow px-3 py-2 mb-6">
        {/* Category */}
        <select
          id="category"
          onChange={selectCategoryFunc}
          value={filterData.category}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value="">Select Category</option>
          {categoryData?.map((category: ICategoryResponse) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Search Product */}
        <input
          type="search"
          value={filterData.product}
          placeholder="Search a product"
          className="px-2 py-1 border rounded text-sm"
          onChange={(e) => {
            dispatch(
              filterProduct({ product: e.target.value, from: "productsList" })
            );
            dispatch(filterPage({ page: 1, from: "productsList" }));
          }}
        />

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              dispatch(
                filterPage({ page: filterData.page - 1, from: "productsList" })
              )
            }
            className="bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1 disabled:bg-blue-300"
            disabled={productsData?.page === 1}
          >
            <ArrowLeftIcon /> Previous
          </button>

          <span className="text-sm">
            Page {productsData?.page || 0} of {productsData?.totalPages || 0}
          </span>

          <button
            onClick={() =>
              dispatch(
                filterPage({ page: filterData.page + 1, from: "productsList" })
              )
            }
            className="bg-blue-700 text-white px-2 py-1 rounded flex items-center gap-1 disabled:bg-blue-300"
            disabled={productsData?.page === productsData?.totalPages}
          >
            Next <ArrowRightIcon />
          </button>
        </div>

        {/* Jump to Page */}
        <input
          type="number"
          value={filterData.page}
          placeholder="Go to page"
          className="px-2 py-1 border rounded w-20 text-sm"
          onChange={(e) =>
            dispatch(
              filterPage({ page: Number(e.target.value), from: "productsList" })
            )
          }
          disabled={productsData?.totalPages <= 1}
        />

        {/* Clear Filter */}
        <button
          className="text-sm text-red-600 px-2 py-1 border border-red-600 rounded disabled:text-gray-400 disabled:border-gray-400"
          onClick={() => {
            dispatch(clearFilter({ clear: "productsList" }));
            setCategoryId("");
          }}
          disabled={!filterData.filtered}
        >
          Clear
        </button>

        {/* Create Product */}
        <Link to={ROUTES.admin.createProduct}>
          <button className="bg-blue-700 text-white px-2 py-1 rounded text-sm">
            Create Product
          </button>
        </Link>
      </div>

      {/* Products */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {productsData?.products?.map((product: IProductResponse) => (
          <ProductCard
            key={product.id}
            data={product}
            // pendingPricingMobiles={pendingPricingMobiles}
            isPricingPending={findPendingPricing(product)}
          />
        ))}
      </div>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={productToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
