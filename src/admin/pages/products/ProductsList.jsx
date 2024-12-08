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

const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [deductionSelected, setDeductionSelected] = useState("");
  // console.log("deductionSelected", deductionSelected);

  const dispatch = useDispatch();

  const filterData = useSelector((state) => state.filter.productsList);

  // console.log("filterData", filterData);

  // THUNK START
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSelector((state) => state.search);
  console.log(results.products, loading, error);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(
        fetchSearchResults({
          page: filterData.page,
          limit,
          search: query,
          categoryId,
        })
      );
    } else {
      dispatch(clearSearchResults());
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // THUNK END

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

  // const [filterData, setSelectedCategory] = useState("");
  // console.log(search);

  const handleDelete = async (productId) => {
    console.log("handledelete", productId);
    await deleteProduct(productId);
  };

  const headers = [
    "Category",
    "Brand",
    "Product Name",
    "Variants",
    "Product IMG",
    "Status",
    "Questions",
    "Edit/Update",
    "Delete",
  ];

  const rowRenderer = (product) => (
    <>
      <td className="px-4 py-2">{product.category.name}</td>
      <td className="px-4 py-2">{product.brand.name}</td>
      <td className="px-4 py-2">{product.name}</td>
      {/* Variants */}
      <td className="px-4 py-2">
        <ul>
          {product.category.name === "Mobile"
            ? product.variants.map((variant, i) => (
                <div
                  key={`${variant.id}-${i}`}
                  className="flex gap-2 justify-center"
                >
                  <div className="">
                    <p
                      htmlFor="variantName"
                      className="text-xs max-sm:text-[10px] text-gray-500"
                    >
                      Variant Name
                    </p>
                    <span key={i + 23} className="text-xs" name="variantName">
                      {variant.name}
                    </span>
                  </div>
                  <div>
                    <p
                      htmlFor="variantName"
                      className="text-xs max-sm:text-[10px] text-gray-500"
                    >
                      Variant Price
                    </p>
                    <span key={i + 77} className="text-xs" name="variantName">
                      {variant.price}
                    </span>
                  </div>
                </div>
              ))
            : product.variants.map((variant, i) => (
                <div className="" key={variant.id}>
                  <p
                    htmlFor="price"
                    className="text-xs max-sm:text-[10px] text-gray-500"
                  >
                    Product Price
                  </p>
                  <span key={i + 78} className="text-xs" name="price">
                    {variant.price}
                  </span>
                </div>
              ))}
        </ul>
      </td>
      {/* Image */}
      <td className="px-4 py-2">
        <img
          src={import.meta.env.VITE_APP_BASE_URL + product.image}
          alt="CAT"
          className="w-[60px] h-[60px] mx-auto max-sm:w-[40px] max-sm:h-[40px]"
        />
      </td>
      <td className="px-4 py-2">{product.status}</td>
      {/* PRICEDROP BUTTON */}
      <td className="px-4 py-2">
        {product.category.name === "Mobile" ? (
          <div className="flex flex-col justify-cente">
            <div>
              <select
                onChange={(e) =>
                  setDeductionSelected({
                    [product.id]: e.target.value,
                  })
                }
                className="border-2 border-blue-500 rounded"
              >
                <option value="">Variant</option>
                {product.variantDeductions.map((variantDeduction, index) => (
                  <option
                    key={`${variantDeduction.id}-${index}`}
                    value={variantDeduction.variantName}
                  >
                    {variantDeduction.variantName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {deductionSelected[product.id] && (
                <Link
                  to={`/admin/products/product-questions/${
                    product.id
                  }?variant=${deductionSelected[product.id]}`}
                >
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded">
                    Price Drop
                  </button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Link
              to={`/admin/products/product-questions/${product.id}?variant=${
                deductionSelected[product.id]
              }`}
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded">
                Price Drop
              </button>
            </Link>
          </div>
        )}
      </td>
      <td className="flex justify-center py-2">
        <EditButton location={`/admin/update-product/${product.id}`} />
      </td>
      {/* DELETE */}
      <td>
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-600 text-white px-3 py-2 rounded-md max-sm:text-sm"
        >
          <MdDeleteForever className="text-2xl" />
        </button>
      </td>
    </>
  );

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
    <div className="flex flex-col items-center p-4 max-sm:text-sm">
      <div className="text-center">
        <h2 className="text-black font-serif text-2xl font-bold">
          Products Table
        </h2>
      </div>

      {/* Filter features */}
      <div className="w-[96%] flex justify-evenly gap-2 border rounded-lg shadow-lg my-5 px-5">
        {/* Select Category */}
        <div className="flex my-4 ">
          <select
            id="category"
            onChange={(e) => selectCategoryFunc(e)}
            value={filterData.category}
            className="px-2 py-1 border rounded text-sm"
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
          <input
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
          </button>
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
            className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
            disabled={productsData?.page === 1}
          >
            <FaAngleLeft />
            Previous
          </button>

          <div className="text-center text-lg">
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
            className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
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
            className="px-2 text-sm py-1 rounded border"
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
            className="text-sm text-red-600 px-1 border border-red-600 rounded disabled:text-gray-400 disabled:border-gray-400"
            onClick={() => {
              dispatch(clearFilter({ clear: "productsList" }));
              setCategoryId("");
            }}
            disabled={!filterData.filtered}
          >
            Clear Filter
          </button>
        </div>

        {/* Clear filter */}
        {/* <div className="flex justify-around items-center gap-2 my-4">
          <button
            className="text-red-600 hover:border-b-[1px] border-red-600"
            onClick={() => {
              dispatch(clearFilter({ clear: "productsList" }));
              setCategoryId("");
            }}
          >
            Clear Filter
          </button>
        </div> */}

        {/* Create Product Button */}
        <div className="flex items-center">
          <Link to={"/admin/add-products"}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded">
              Create Product
            </button>
          </Link>
        </div>
      </div>

      {!productsDataLoading && (
        <Table
          headers={headers}
          data={productsData.products}
          keyExtractor={(item) => item.id}
          rowRenderer={rowRenderer}
        />
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
    </div>
  );
};

export default ProductsList;

/* Filters */
//   <div className="flex justify-around items-center mb-5">
//   <div className="my-4 flex gap-2 items-center">
//     <div>
//       <input
//         type="search"
//         name=""
//         id=""
//         placeholder="Search a product"
//         className="px-2 text-sm py-1 rounded border"
//         onChange={(e) => setSearch(e.target.value)}
//       />
//     </div>
//     <div>
//       <button className="bg-green-600 px-2 rounded text-sm py-1 text-white">
//         Search
//       </button>
//     </div>
//   </div>

//   <div className=" my-4 flex gap-2 items-center">
//     <div>
//       <input
//         type="number"
//         placeholder="Search a Page"
//         className="px-2 text-sm py-1 rounded border"
//         onChange={(e) => setPage(e.target.value)}
//         disabled={productsData?.totalPages <= 1}
//       />
//     </div>
//     <div>
//       <button className="bg-green-600 px-2 rounded text-sm py-1 text-white">
//         Page No
//       </button>
//     </div>
//   </div>
// </div>

// <div className="flex items-center justify-between mb-4">
//   {/* Select Category */}
//   <div>
//     <label htmlFor="condition" className=" mr-2">
//       Select Category:
//     </label>
//     <select
//       id="condition"
//       onChange={(e) => {
//         setCategoryId(e.target.value);
//         // setSelectedCategory(e.target.value);
//         dispatch(
//           filterCategory({
//             category: e.target.value,
//             from: "productsList",
//           })
//         );
//       }}
//       value={filterData}
//       className="p-2 rounded bg-gray-700 text-white"
//     >
//       <option value="">Select</option>
//       {!categoryDataLoading &&
//         categoryData.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//     </select>
//   </div>

//   {/* Clear filter */}
//   <div>
//     <button
//       className="text-red-600 hover:border-b-[1px] border-red-600"
//       onClick={(e) => {
//         e.preventDefault();
//         dispatch(clearFilter({ clear: "productsList" }));
//         setCategoryId("");
//       }}
//     >
//       Clear Filter
//     </button>
//   </div>

//   {/* Pagination controls */}
//   <div className="flex gap-2 justify-center">
//     <div className="flex gap-2 justify-center mt-2">
//       {!productsDataLoading && (
//         <button
//           onClick={() => setPage((prevPage) => prevPage - 1)}
//           className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
//           disabled={productsData.page === 1}
//         >
//           <FaAngleLeft />
//           Previous
//         </button>
//       )}

//       {!productsDataLoading && (
//         <div className="text-center text-lg">
//           Page {productsData.page} of {productsData.totalPages}
//         </div>
//       )}

//       {!productsDataLoading && (
//         <button
//           onClick={() => setPage((prevPage) => prevPage + 1)}
//           className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
//           disabled={productsData.page === productsData.totalPages}
//         >
//           Next
//           <FaAngleRight />
//         </button>
//       )}
//     </div>
//   </div>

//   {/* Create Product Button */}
//   <div>
//     <Link to={"/admin/add-products"}>
//       <button className="bg-blue-700 text-white px-2 py-1 rounded">
//         Create Product
//       </button>
//     </Link>
//   </div>
// </div>
