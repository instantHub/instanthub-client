import React, { useState, useEffect } from "react";
import {
  useGetAllProductsQuery,
  useGetCategoryQuery,
  useDeleteProductMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import EditButton from "../../components/EditButton";
import Table from "../../components/TableView";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategory,
  filterProduct,
  filterPage,
  clearFilter,
} from "../../features/filterSlice";
import {
  fetchSearchResults,
  clearSearchResults,
} from "../../features/searchSlice";
import ConfirmationModal from "../../components/ConfirmationModal";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

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

  // console.log(productsData && productsData);

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

  const handleDelete = async (productId) => {
    console.log("handledelete", productId);
    await deleteProduct(productId);
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

  return (
    //Products based on the Category selected
    <div className="flex flex-col items-center p-4 max-sm:p-1 max-sm:text-sm">
      <div className="text-center">
        <h2 className="text-black font-serif text-2xl max-sm:text-sm font-bold">
          Products Table
        </h2>
      </div>

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
            {!categoryDataLoading &&
              categoryData.map((category) => (
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

          {/* NEW THUNK */}
          {/* <input
            type="text"
            className="px-2 text-sm py-1 rounded border"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Trigger search on Enter key press
            placeholder="Search for products"
          />
          <button
            className="px-2  text-sm py-1 rounded border shadow-2xl"
            onClick={handleSearch}
          >
            Search
          </button> */}
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
            <FaAngleLeft />
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
            <FaAngleRight />
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
          <Link to={"/admin/add-products"}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded max-sm:text-xs">
              Create Product
            </button>
          </Link>
        </div>
      </div>

      {!productsDataLoading && (
        <div className="w-full grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-5 max-sm:gap-3">
          {productsData.products.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div>
      )}

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
              <FaAngleLeft />
              Previous
            </button>
          )}
          {/* {!productsDataLoading && productsData.products.length != 0 && ( */}

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
                <FaAngleRight />
              </button>
            )}
          {/* )} */}
        </div>
        {/* {!productsDataLoading && (
            <div className="text-center text-lg">
              Page {productsData.page} of {productsData.totalPages} Pages
            </div>
          )} */}
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

export default ProductsList;
