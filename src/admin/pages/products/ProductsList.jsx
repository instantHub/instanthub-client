import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useGetAllProductsQuery,
  useGetCategoryQuery,
  useDeleteProductMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProductsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [deductionSelected, setDeductionSelected] = useState("");
  // console.log("deductionSelected", deductionSelected);
  const {
    data: productsData,
    error,
    isLoading: productsDataLoading,
  } = useGetAllProductsQuery({
    page,
    limit,
    search: search,
  });

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(search);

  const handleDelete = async (productId) => {
    console.log("handledelete", productId);
    await deleteProduct(productId);
  };

  useEffect(() => {
    if (productsData) {
      if (page == 0) {
        setPage(1);
      } else if (page > productsData.totalPages) {
        setPage(productsData.totalPages);
      }
    }
  }, [page, productsData]);

  return (
    //Products based on the Category selected
    <>
      {/* Products based on the Category selected */}
      <div className="p-4 ">
        {/* Search */}
        <div className="flex justify-around items-center mb-5">
          <div className="my-4 flex gap-2 items-center">
            <div>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search a product"
                className="px-2 text-sm py-1 rounded border"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <button className="bg-green-600 px-2 rounded text-sm py-1 text-white">
                Search
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-black font-serif text-2xl font-bold">
              Products Table
            </h2>
          </div>

          <div className=" my-4 flex gap-2 items-center">
            <div>
              <input
                type="number"
                placeholder="Search a Page"
                className="px-2 text-sm py-1 rounded border"
                onChange={(e) => setPage(e.target.value)}
                disabled={productsData?.totalPages <= 1}
              />
            </div>
            <div>
              <button className="bg-green-600 px-2 rounded text-sm py-1 text-white">
                Page No
              </button>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 mb-4"> */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label htmlFor="condition" className=" mr-2">
              Select Category:
            </label>
            <select
              id="condition"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Select</option>
              {!categoryDataLoading &&
                categoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Pagination controls */}
          <div className="flex gap-2 justify-center">
            <div className="flex gap-2 justify-center mt-2">
              {!productsDataLoading && (
                <button
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
                  disabled={productsData.page === 1}
                >
                  <FaAngleLeft />
                  Previous
                </button>
              )}

              {!productsDataLoading && (
                <div className="text-center text-lg">
                  Page {productsData.page} of {productsData.totalPages}
                </div>
              )}

              {!productsDataLoading && (
                <button
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  className="bg-blue-700 flex items-center gap-1 text-white px-2 py-1 rounded disabled:bg-blue-300"
                  disabled={productsData.page === productsData.totalPages}
                >
                  Next
                  <FaAngleRight />
                </button>
              )}
            </div>
          </div>
          <div>
            <Link to={"/admin/add-products"}>
              <button className="bg-blue-700 text-white px-2 py-1 rounded">
                Create Product
              </button>
            </Link>
          </div>
        </div>
        <table className="w-full">
          <thead>
            {/* className="px-4 py-2 text-white bg-gray-800" */}
            <tr className="py-10 font-serif text-lg border shadow-xl text-green-800">
              {!selectedCategory && <th className="px-4 py-2">Category</th>}
              <th className="">Brand</th>
              <th className="px-4 py-4">Product Name</th>
              <th className="px-4 py-2 ">Variants</th>
              <th className="px-4 py-2 ">Product IMG</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Edit/Update</th>
              <th className="px-4 py-2 ">Delete</th>
              <th className="px-4 py-2 ">Questions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {/* Products when Category is selected */}
            {!productsDataLoading &&
              productsData.products
                .filter((product) => product.category.id === selectedCategory)
                .map((product, index) => (
                  <tr
                    key={`${product._id}-${index}`}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    {/* <td className="px-4 py-2">{product.category.name}</td> */}
                    <td className="px-4 py-2">{product.brand.name}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">
                      <ul>
                        {product.category.name === "Mobile"
                          ? product.variants.map((variant, i) => (
                              <div
                                key={`${variant.id}-${i}`}
                                className="flex gap-2 justify-center"
                              >
                                <div className="">
                                  <label
                                    htmlFor="variantName"
                                    className="text-xs text-gray-500"
                                  >
                                    Variant Name
                                  </label>
                                  <li
                                    key={i + 23}
                                    className=""
                                    name="variantName"
                                  >
                                    {variant.name}
                                  </li>
                                </div>
                                <div>
                                  <label
                                    htmlFor="variantName"
                                    className="text-xs text-gray-500"
                                  >
                                    Variant Price
                                  </label>
                                  <li
                                    key={i + 77}
                                    className=""
                                    name="variantName"
                                  >
                                    {variant.price}
                                  </li>
                                </div>
                              </div>
                            ))
                          : product.variants.map((variant, i) => (
                              <div className="">
                                <label
                                  htmlFor="price"
                                  className="text-xs text-gray-500"
                                >
                                  Product Price
                                </label>
                                <li key={i + 78} className="" name="price">
                                  {variant.price}
                                </li>
                              </div>
                            ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={import.meta.env.VITE_APP_BASE_URL + product.image}
                        alt="CAT"
                        className="w-[60px] h-[60px] mx-auto "
                      />
                    </td>
                    <td className="px-4 py-2">{product.status}</td>
                    <td className="px-4 py-2">
                      <Link to={`/admin/update-product/${product.id}`}>
                        <button className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edit <FaEdit className="text-lg" />
                        </button>
                      </Link>
                    </td>
                    {/* DELETE */}
                    <td>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-md"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {/* Testing */}
                      {/* VALIDATE BUTTON */}
                      {product.category.name === "Mobile" ? (
                        <div>
                          <select
                            name=""
                            onChange={(e) =>
                              setDeductionSelected({
                                [product.id]: e.target.value,
                              })
                            }
                          >
                            <option value="">Variant</option>
                            {product.variantDeductions.map(
                              (variantDeduction, index) => (
                                <option
                                  key={`${variantDeduction.id}-${index}`}
                                  value={variantDeduction.variantName}
                                >
                                  {variantDeduction.variantName}
                                </option>
                              )
                            )}
                          </select>
                          {/* Testing END */}
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
                      ) : (
                        <div>
                          <Link
                            to={`/admin/products/product-questions/${
                              product.id
                            }?variant=${deductionSelected[product.id]}`}
                          >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded">
                              Price Drop
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

            {/* Products when Category not selected */}
            {!productsDataLoading &&
              !selectedCategory &&
              productsData.products
                //   .filter((product) => product.category.id != selectedCategory)
                .map((product, index) => (
                  <tr
                    key={`${product._id}-${index}`}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                    }
                  >
                    <td className="px-4 py-2">{product.category.name}</td>
                    <td className="px-4 py-2">{product.brand.name}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">
                      <ul>
                        {product.category.name === "Mobile"
                          ? product.variants.map((variant, i) => (
                              <div
                                key={`${variant.id}-${i}`}
                                className="flex gap-2 justify-center"
                              >
                                <div className="">
                                  <label
                                    htmlFor="variantName"
                                    className="text-xs text-gray-500"
                                  >
                                    Variant Name
                                  </label>
                                  <li
                                    key={i + 23}
                                    className=""
                                    name="variantName"
                                  >
                                    {variant.name}
                                  </li>
                                </div>
                                <div>
                                  <label
                                    htmlFor="variantName"
                                    className="text-xs text-gray-500"
                                  >
                                    Variant Price
                                  </label>
                                  <li
                                    key={i + 77}
                                    className=""
                                    name="variantName"
                                  >
                                    {variant.price}
                                  </li>
                                </div>
                              </div>
                            ))
                          : product.variants.map((variant, i) => (
                              <div className="">
                                <label
                                  htmlFor="price"
                                  className="text-xs text-gray-500"
                                >
                                  Product Price
                                </label>
                                <li key={i + 78} className="" name="price">
                                  {variant.price}
                                </li>
                              </div>
                            ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        // src={"http://localhost:8000" + product.image}
                        src={import.meta.env.VITE_APP_BASE_URL + product.image}
                        alt="CAT"
                        className="w-[60px] h-[60px] mx-auto "
                      />
                    </td>
                    <td className="px-4 py-2">{product.status}</td>
                    {/* EDIT */}
                    <td className="px-4 py-2">
                      <Link to={`/admin/update-product/${product.id}`}>
                        <button className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edit <FaEdit className="text-lg" />
                        </button>
                      </Link>
                    </td>
                    {/* DELETE */}
                    <td>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 text-white px-3 py-2 rounded-md"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {/* Testing */}
                      {/* VALIDATE BUTTON */}
                      {product.category.name === "Mobile" ? (
                        <div>
                          <select
                            name=""
                            onChange={(e) =>
                              setDeductionSelected({
                                [product.id]: e.target.value,
                              })
                            }
                          >
                            <option value="">Variant</option>
                            {product.variantDeductions.map(
                              (variantDeduction, index) => (
                                <option
                                  key={`${variantDeduction._id}-${index}`}
                                  value={variantDeduction.variantName}
                                >
                                  {variantDeduction.variantName}
                                </option>
                              )
                            )}
                          </select>
                          {/* Testing END */}
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
                      ) : (
                        <div>
                          {/* {deductionSelected[product.id] && ( */}
                          <Link
                            to={`/admin/products/product-questions/${product.id}`}
                          >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xs py-2 px-2 rounded">
                              Price Drop
                            </button>
                          </Link>
                          {/* )} */}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="flex flex-col gap-2 justify-center mt-2">
          <div className="flex gap-2 justify-center mt-2">
            {!productsDataLoading && productsData.page > 1 && (
              <button
                onClick={() => setPage((prevPage) => prevPage - 1)}
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
                  onClick={() => setPage((prevPage) => prevPage + 1)}
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
    </>
  );
};

export default ProductsList;
