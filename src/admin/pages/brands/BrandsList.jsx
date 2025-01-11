import React, { useState } from "react";
import {
  useGetCategoryQuery,
  useGetAllBrandQuery,
  useDeleteBrandMutation,
} from "../../../features/api";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import EditButton from "../../components/EditButton";
import { filterCategory } from "../../features/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/TableView";
import ConfirmationModal from "../../components/ConfirmationModal";

const BrandsList = () => {
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandQuery();

  const { data: categoryData, isLoading: categoryDataLoading } =
    useGetCategoryQuery();

  const [deleteBrand, { isLoading: deleteLoading }] = useDeleteBrandMutation();

  // const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    // setSelectedCategory(e.target.value);
    dispatch(filterCategory({ category: e.target.value, from: "brandsList" }));
  };

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState("");

  const handleDelete = async (brandId) => {
    console.log("handledelete", brandId);
    await deleteBrand(brandId);
  };

  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state) => state.filter.brandsList.category
  );

  console.log("selectedCategory", selectedCategory);

  const headers = ["Category", "Brand", "Brand Image", "Edit/Update", "Delete"];

  const rowRenderer = (brand) => (
    <>
      <td className="px-4 py-2">{brand.category.name}</td>
      <td className="px-4 py-2">{brand.name}</td>

      <td className="px-4 py-2">
        <img
          src={import.meta.env.VITE_APP_BASE_URL + brand.image}
          alt="BrandImg"
          className="w-[60px] h-[60px] mx-auto max-sm:w-[40px] max-sm:h-[40px]"
          loading="lazy" // Native lazy loading
        />
      </td>
      <td className="px-4 py-2 max-sm:px-2 max-sm:py-1">
        <div className="flex items-center justify-center">
          <EditButton location={`/admin/update-brand/${brand.id}`} />
        </div>
      </td>
      <td>
        <button
          onClick={() => {
            // handleDelete(brand.id);
            setModalOpen(true);
            setBrandToDelete(brand.id);
          }}
          className="bg-red-600 text-white px-3 py-1 rounded-md"
        >
          <MdDeleteForever className="text-2xl max-sm:text-lg" />
        </button>
      </td>
    </>
  );

  return (
    //Products based on the Category selected
    <div className="p-4 max-sm:text-sm">
      <div className="flex justify-between">
        <h2 className="text-black text-lg font-bold mb-4">Brands Table</h2>
        <div>
          <Link to={"/admin/add-brands"}>
            <button className="bg-blue-700 text-white px-2 py-1 rounded">
              Create Brand
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="condition" className=" mr-2">
          Select Category:
        </label>
        <select
          id="condition"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="p-2 rounded bg-gray-700 text-white max-sm:p-1"
        >
          <option value="">Select</option>
          {!categoryDataLoading &&
            categoryData?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {!brandsLoading && (
        <Table
          headers={headers}
          data={
            !selectedCategory
              ? // selectedCategory === null
                brandsData
              : brandsData?.filter(
                  (brand) => brand.category.id === selectedCategory
                )
          }
          keyExtractor={(item) => item.id}
          rowRenderer={rowRenderer}
        />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={brandToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default BrandsList;
