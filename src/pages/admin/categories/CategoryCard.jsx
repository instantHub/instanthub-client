import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@components/admin/ConfirmationModal";
import { useDeleteCategoryMutation } from "@api/categoriesApi";
import { toast } from "react-toastify";
import ActionButton from "@components/admin/ActionButton";

const ListCard = ({ data }) => {
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCategoryMutation();

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    btnStyle:
      "w-fit flex items-center gap-1 font-bold py-2 px-4 max-sm:px-2 text-sm max-sm:text-xs border rounded",
    editColor: "text-blue-600 border-blue-600",
    deleteColor: "text-red-600 border-red-600",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (catId) => {
    const deletedCategory = await deleteCategory(catId);
    toast.success(deletedCategory.message);
    setIsModalOpen(false);
  };

  function handleEdit() {
    navigate(`/admin/update-category/${data.id}`);
  }

  function openDeleteModel() {
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        //   onClick={() => navigate(`/admin/update-category/${data.id}`)}
        className={`w-full shadow flex flex-col justify-center items-center cursor-pointer rounded-md pt-2 text-sm max-sm:text-xs border`}
      >
        {/* Data Display */}
        <div className="h-full grid grid-cols-4 place-items-center gap-2 px-4  max-sm:px-2 pt-1 pb-2 max-sm:pb-">
          {/* Category Name and Image */}
          <div className="col-span-1 flex flex-col items-center gap-1">
            <img
              src={import.meta.env.VITE_APP_BASE_URL + data.image}
              alt={data.name}
              className="w-[60px] h-fit mx-auto"
              loading="lazy" // Native lazy loading
            />
            <div>
              <span className={`${style.boldness}`}>{data.name}</span>
            </div>
          </div>

          {/* Brands */}
          <div className="col-span-3 flex flex-col items-center w-full">
            <div className="font-semibold">Brands Under {data.name} </div>
            <div
              className={`flex flex-wrap gap-x-2 max-sm:gap-x-1 gap-y-1 max-sm:gap-y-[2px] p-1 max-sm:px-1 text-sm max-sm:text-[10px]`}
            >
              {DisplayBrands(data.brands)}
            </div>
          </div>
        </div>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Edit"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={openDeleteModel}
          name={data.name}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        itemToDelete={data.id}
        title="Confirm Deletion"
        detail={`You are about to delete ${data.name} Category. Total Number of Brands under this Category are ${data?.brands.length}.`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default ListCard;

function DisplayBrands(brands) {
  if (brands.length == 0) return "Brands not available";

  return brands.map((brand, i) => (
    <p key={brand.id} className="pb-1">
      {i + 1}.{brand.name}
    </p>
  ));
}
