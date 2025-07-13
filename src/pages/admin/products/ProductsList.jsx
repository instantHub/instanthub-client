import React, { useState, useEffect } from "react";
import {
  useGetCategoriesQuery,
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "@api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategory,
  filterProduct,
  filterPage,
  clearFilter,
} from "@features/adminSlices/filterSlice";
import { ConfirmationModal } from "@components/admin";
import { ProductCard } from "./components";
import axios from "axios";
import { ROUTES } from "@routes";
import { ArrowLeftIcon, ArrowRightIcon } from "@icons";

export const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);

  const [showPendingPricing, setShowPendingPricing] = useState(false);
  const [pendingPricingMobiles, setPendingPricingMobiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const filterData = useSelector((state) => state.filter.productsList);
  // console.log("filterData", filterData);

  const [categoryId, setCategoryId] = useState(filterData.category);

  const { data: productsData, isLoading: productsDataLoading } =
    useGetAllProductsQuery({
      // page,
      page: filterData.page,
      limit,
      // search: search,
      search: filterData.product,
      categoryId,
    });

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

  const handleDelete = async (productId) => {
    console.log("handledelete", productId);
    await deleteProduct(productId);
  };

  const selectCategoryFunc = (e) => {
    setCategoryId(e.target.value);
    // setSelectedCategory(e.target.value);
    dispatch(
      filterCategory({
        category: e.target.value,
        from: "productsList",
      })
    );
  };

  useEffect(() => {
    if (productsData) {
      if (filterData.page < 0) {
        dispatch(filterPage({ page: 1, from: "productsList" }));
      } else if (filterData.page > productsData.totalPages) {
        dispatch(
          filterPage({ page: productsData.totalPages, from: "productsList" })
        );
        // setPage(productsData.totalPages);
      }
    }
  }, [productsData]);
  // }, [page, productsData]);

  // All Products with empty prices
  useEffect(() => {
    async function checkPricing() {
      try {
        setLoading(true);
        let result = await axios(
          `${import.meta.env.VITE_APP_BASE_URL}/api/pricing/empty-pricing`
        );
        // console.log("result", result.data);
        setPendingPricingMobiles(result.data);
        setLoading(false);
        if (result.data.length > 0) setShowPendingPricing(true);
      } catch (error) {
        console.log("Error while checking pricing", error);
        setLoading(false);
      }
    }

    checkPricing();
  }, []);

  // console.log(pendingPricingMobiles);
  // console.log(pendingPricingProcessors);

  return (
    //Products based on the Category selected
    <div className="flex flex-col items-center p-4 max-sm:p-1 max-sm:text-sm">
      <div className="text-center">
        <h2 className="text-black font-serif text-2xl max-sm:text-sm font-bold">
          Products Table
        </h2>
      </div>

      {loading ? (
        <div className="w-full text-end px-4">Loading...</div>
      ) : (
        <div className="w-full flex max-sm:flex-col justify-end gap-2 max-sm:gap-1 text-sm max-sm:text-[10px] max-sm:pt-2">
          <p>
            Total: {pendingPricingMobiles.length} products pending for prices
          </p>
          <select
            className="border px-1 py-[2px] rounded disabled:bg-gray-200 w-fit"
            onChange={(e) => {
              dispatch(
                filterProduct({ product: e.target.value, from: "productsList" })
              );
            }}
            // disabled={filterData.product}
          >
            <option value="">View</option>
            {pendingPricingMobiles.map((item, i) => (
              <option key={item.productName} value={item.productName}>
                {i + 1}. {item.productName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filter features */}
      <div className="w-[96%] max-sm:w-full flex justify-evenly flex-wrap gap-2 border rounded-lg shadow my-5 px-5 max-sm:px-1">
        {/* Select Category */}
        <div className="flex items-center">
          <select
            id="category"
            onChange={(e) => selectCategoryFunc(e)}
            value={filterData.category}
            className="px-2 py-1 border rounded text-sm mmax-sm:text-[10px]"
          >
            <option value="">Select Category</option>
            {/* {!categoryDataLoading && */}
            {categoryData?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Product*/}
        <div className="flex justify-around items-center gap-2 my-4">
          <input
            type="search"
            value={filterData.product}
            placeholder="Search a product"
            className="px-2 text-sm py-1 rounded border"
            onChange={(e) => {
              setSearch(e.target.value);
              dispatch(
                filterProduct({ product: e.target.value, from: "productsList" })
              );
              dispatch(filterPage({ page: 1, from: "productsList" }));
            }}
          />
        </div>

        {/* Pagination controls */}
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={() => {
              // setPage((prevPage) => prevPage - 1);
              dispatch(
                filterPage({ page: filterData.page - 1, from: "productsList" })
              );
            }}
            className="bg-blue-700 flex items-center max-sm:text-xs gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
            disabled={productsData?.page === 1}
          >
            <ArrowLeftIcon />
            Previous
          </button>

          <div className="text-center text-lg max-sm:text-xs">
            Page {productsData?.page || "0"} of{" "}
            {productsData?.totalPages || "0"}
          </div>

          <button
            onClick={() => {
              // setPage((prevPage) => prevPage + 1);
              dispatch(
                filterPage({ page: filterData.page + 1, from: "productsList" })
              );
            }}
            className="bg-blue-700 flex items-center max-sm:text-xs gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
            disabled={productsData?.page === productsData?.totalPages}
          >
            Next
            <ArrowRightIcon />
          </button>
        </div>

        {/* Search Page & Clear filer*/}
        <div className="flex justify-around items-center gap-2 my-4">
          <input
            type="number"
            value={filterData.page}
            placeholder="Search a Page"
            className="px-2 text-sm py-1 rounded border max-sm:w-1/2"
            onChange={(e) => {
              // setPage(e.target.value);
              dispatch(
                filterPage({
                  page: Number(e.target.value),
                  from: "productsList",
                })
              );
            }}
            disabled={productsData?.totalPages <= 1}
          />

          <button
            className="text-sm max-sm:text-xs text-red-600 px-1 border border-red-600 rounded disabled:text-gray-400 disabled:border-gray-400"
            onClick={() => {
              dispatch(clearFilter({ clear: "productsList" }));
              setCategoryId("");
            }}
            disabled={!filterData.filtered}
          >
            Clear Filter
          </button>
        </div>

        {/* Create Product Button */}
        <div className="flex items-center">
          <Link to={ROUTES.admin.createProduct}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded max-sm:text-xs">
              Create Product
            </button>
          </Link>
        </div>
      </div>

      {/* {!productsDataLoading && ( */}
      <div className="w-full grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-5 max-sm:gap-3">
        {productsData?.products?.map((product) => (
          <ProductCard
            key={product?.id}
            data={product}
            pendingPricingMobiles={pendingPricingMobiles || []}
          />
        ))}
      </div>
      {/* )} */}

      {/* Pagination controls */}
      <div className="flex flex-col gap-2 justify-center mt-2">
        <div className="flex gap-2 justify-center mt-2">
          {!productsDataLoading && productsData.page > 1 && (
            <button
              onClick={() => {
                dispatch(
                  filterPage({
                    page: filterData.page - 1,
                    from: "productsList",
                  })
                );
              }}
              className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded"
            >
              <ArrowLeftIcon />
              Previous
            </button>
          )}

          {!productsDataLoading &&
            productsData.page !== productsData.totalPages && (
              <button
                onClick={() => {
                  dispatch(
                    filterPage({
                      page: filterData.page + 1,
                      from: "productsList",
                    })
                  );
                }}
                className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded"
              >
                Next
                <ArrowRightIcon />
              </button>
            )}
        </div>
      </div>

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

// export default ProductsList;
