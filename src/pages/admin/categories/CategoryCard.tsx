import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCategoryMutation } from "@api";
import { toast } from "react-toastify";
import { ActionButton, ConfirmationModal } from "@components/admin";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { IBrandLite } from "@features/api/brandsApi/types";
import {
  ICategoryResponse,
  ICategoryType,
} from "@features/api/categoriesApi/types";
import { FlexBox, Typography } from "@components/general";

interface ICategoryCardProps {
  category: ICategoryResponse;
}

export const CategoryCard = ({ category }: ICategoryCardProps) => {
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleDelete = async (catId: string): Promise<void> => {
    try {
      const { data } = await deleteCategory(catId);
      toast.success(data?.message || "Category deleted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    }
  };

  function handleEdit(): void {
    navigate(generatePathWithParams(ROUTES.admin.updateCategory, category.id));
  }

  function openDeleteModel(): void {
    setIsModalOpen(true);
  }

  function categoryTypeToString(categoryType: ICategoryType): string[] {
    return Object.entries(categoryType)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
  }

  return (
    <>
      <FlexBox direction="col" className={`shadow-lg rounded-md border pt-2`}>
        <div className="h-full grid grid-cols-4 place-items-center gap-2 px-4  max-sm:px-2 pt-1 pb-2">
          <FlexBox direction="col" gap={1}>
            <img
              src={import.meta.env.VITE_APP_BASE_URL + category.image}
              alt={category.name}
              className="w-[60px] h-fit mx-auto"
              loading="lazy"
            />
            <Typography variant="body" weight="bold">
              {category.name}
            </Typography>
          </FlexBox>

          <FlexBox direction="col" gap={1} className="col-span-3 w-full">
            <Typography variant="body" weight="bold">
              Brands Under {category.name}
            </Typography>
            <FlexBox wrap="wrap" gap={"x-2"}>
              {DisplayBrands(category.brands)}
            </FlexBox>
          </FlexBox>
        </div>

        <FlexBox direction="col" gap={2} className="pb-2">
          <FlexBox gap={2}>
            <Typography weight="bold">Category Type:</Typography>
            <Typography
              className={`px-4 py-1 rounded-lg border transition-all duration-300 bg-blue-600 text-white`}
            >
              {categoryTypeToString(category?.categoryType)}
            </Typography>
          </FlexBox>
          <FlexBox gap={2}>
            <Typography weight="bold">Unique URL:</Typography>
            <Typography
              className={`px-4 py-1 rounded-lg border transition-all duration-300 bg-green-600 text-white`}
            >
              {category.uniqueURL}
            </Typography>
          </FlexBox>
        </FlexBox>

        {/* Edit or Delete */}
        <ActionButton
          actionOne={"Edit"}
          actionOneHandler={handleEdit}
          actionTwo={"Delete"}
          actionTwoHandler={openDeleteModel}
          name={category.name}
        />
      </FlexBox>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        itemToDelete={category.id}
        title="Confirm Deletion"
        detail={`You are about to delete ${category.name} Category. Total Number of Brands under this Category are ${category?.brands.length}.`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

function DisplayBrands(brands: IBrandLite[]): JSX.Element | JSX.Element[] {
  if (brands.length == 0) {
    return <Typography>Brands not available</Typography>;
  }

  return brands.map((brand, i) => (
    <Typography key={brand.id} variant="caption" className="pb-1">
      {i + 1}.{brand.name}
    </Typography>
  ));
}
