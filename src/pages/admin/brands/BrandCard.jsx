import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@components/admin/ConfirmationModal";
import { useDeleteBrandMutation } from "@api/brandsApi";
import { toast } from "react-toastify";
import ActionButton from "@components/admin/ActionButton";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";

const BrandCard = ({ data }) => {
  const navigate = useNavigate();
  const [deleteBrand] = useDeleteBrandMutation();

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    btnStyle:
      "w-fit flex items-center gap-1 font-bold py-2 max-sm:py-1 px-4 max-sm:px-2 text-sm max-sm:text-xs border rounded",
    editColor: "text-blue-600 border-blue-600",
    deleteColor: "text-red-600 border-red-600",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (brandId) => {
    const deletedBrand = await deleteBrand(brandId);
    toast.success(deletedBrand.message);
    setIsModalOpen(false);
  };

  function handleEdit() {
    navigate(generatePathWithParams(ROUTES.admin.updateBrand, data.id));
  }

  function openDeleteModel() {
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        className={`w-full shadow flex flex-col justify-center items-center cursor-pointer rounded-md pt-2 text-sm max-sm:text-xs border`}
      >
        {/* Data Display */}
        <div className="w-full h-full grid grid-cols-2 place-items-center gap-2 px-4 max-sm:px-2 pt-1 pb-2 max-sm:pb-1">
          {/* Category Name and Image */}
          <div className="w-full flex flex-col items-center gap-1">
            <p>Category</p>
            <img
              src={import.meta.env.VITE_APP_BASE_URL + data.category.image}
              alt={data.name}
              className="w-[60px] h-fit mx-auto"
              loading="lazy" // Native lazy loading
            />
            <div>
              <span className={`${style.boldness}`}>{data.category.name}</span>
            </div>
          </div>

          {/* Brand Name and Image */}
          <div className="w-full flex flex-col items-center gap-1">
            <p>Brand</p>
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
        </div>
        <div className="w-full p-2 flex max-md:flex-col justify-center items-center gap-1">
          <p>Unique URL: </p>

          <span className={`${style.boldness} text-[16px] max-sm:text-sm`}>
            {data.uniqueURL}
          </span>
        </div>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Edit"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={openDeleteModel}
          name={null}
        />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        itemToDelete={data.id}
        title="Confirm Deletion"
        detail={`You are about to delete ${data.name} Brand.`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default BrandCard;
