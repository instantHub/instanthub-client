import React, { useState, useEffect } from "react";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const CategoriesList = () => {
  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (!categoryDataLoading) {
    console.log(categoryData);
  }

  const [selectedCategoryToDelete, setSlectedCategoryToDelete] = useState(null);
  const [totalProductsToDeleted, setTotalProductsToDeleted] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Modal open for confirming Condition DELETE
  const openModal = (category) => {
    // console.log("selectedCategoryToDelete", category);
    setSlectedCategoryToDelete(category);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (catId) => {
    // console.log("deleteCategory", catId);
    const deletedCategory = await deleteCategory(catId);
    toast.success(deletedCategory.message);
    setIsOpen(false);
  };

  return (
    //Products based on the Category selected
    <div className="p-4 ">
      <div className="flex justify-between">
        <h2 className="text-black text-lg font-bold mb-4">Categories Table</h2>
        <div>
          <Link to={"/admin/add-category"}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded">
              Create Category
            </button>
          </Link>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="py-10 font-serif text-lg border shadow-xl text-green-800 font-bold">
            <th className="px-4 py-4 ">Category</th>
            <th className="px-4 py-2 ">Brands</th>
            <th className="px-4 py-2 ">Category IMG</th>
            <th className="px-4 py-2 ">Edit/Update</th>
            <th className="px-4 py-2 ">Delete</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {/* Products when Category not selected */}
          {!categoryDataLoading &&
            categoryData
              //   .filter((product) => product.category.id != selectedCondition)
              .map((category, index) => (
                <tr
                  key={`${category._id}-${index}`}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-gray-100 border"
                  }
                >
                  <td className="px-4 py-2">{category.name}</td>
                  {/* Brands list */}
                  {category.brands.length != 0 ? (
                    <td className="px-4 py-2 grid grid-cols-2 text-sm">
                      {category.brands.map((brand) => (
                        <h3
                          key={`${category}-${brand.name}-${brand.id}`}
                          className="py-1"
                        >
                          {brand.name}
                        </h3>
                      ))}
                    </td>
                  ) : (
                    <td className="px-4 py-2 text-xs text-red-700 opacity-70">
                      Brands <br />
                      not available
                    </td>
                  )}

                  <td className="px-4 py-2">
                    <img
                      src={import.meta.env.VITE_APP_BASE_URL + category.image}
                      alt="CAT"
                      className="w-[60px] h-[60px] mx-auto "
                    />
                  </td>
                  <td className="flex justify-center px-4 py-2">
                    <Link to={`/admin/update-category/${category.id}`}>
                      <button className="bg-blue-500 flex items-center gap-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit <FaEdit />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(category)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      <MdDeleteForever className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Sure want to delete this Category?
                </h2>
              </div>
              {/* {selectedCategoryToDelete ? (
                <> */}
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <span>Category</span>
                  <h1 className="text-lg font-semibold">
                    {selectedCategoryToDelete?.name}
                  </h1>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Total Number of Brands under this Category</span>
                  <h1 className="text-lg font-semibold">
                    {selectedCategoryToDelete?.brands.length}
                  </h1>
                </div>
              </div>
              <div className="flex justify-around mt-8">
                <button
                  onClick={() => handleDelete(selectedCategoryToDelete.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Yes
                </button>

                <button
                  onClick={closeModal}
                  className="bg-green-700 text-white px-4 py-1 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
