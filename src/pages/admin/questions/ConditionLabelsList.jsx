import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetConditionsQuery,
  useGetConditionLabelsQuery,
  useDeleteConditionLabelMutation,
} from "@api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  filterCategory,
  filterCondition,
} from "@features/adminSlices/filterSlice";
import { ConfirmationModal, Table } from "@components/admin";
import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ArrowLeftIcon, DeleteForeverIcon, EditIcon } from "@icons";
import { Button } from "@components/general";
import { useCustomNavigation } from "@hooks";

const ConditionLabelsTable = () => {
  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();
  const { data: conditionLabelsData, isLoading: conditionLabelsLoading } =
    useGetConditionLabelsQuery();
  const [deleteConditionLabel, { isLoading: deleteLoading }] =
    useDeleteConditionLabelMutation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const filterData = useSelector((state) => state.filter.conditionLabelsList);
  // console.log("filterData", filterData);

  const dispatch = useDispatch();

  const { goBack, navigateTo } = useCustomNavigation();

  const selectedCategory = filterData.category;
  // console.log("selectedCategory", selectedCategory);

  const selectedCondition = filterData.condition;
  // console.log("selectedCondition", selectedCondition);

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState("");

  const handleDelete = async (labelData) => {
    const [category, conditionLabelId, conditionLabel] = labelData;
    try {
      await deleteConditionLabel({ category, conditionLabelId });
      toast.success(`Successfully deleted Condition Label ${conditionLabel}`);
    } catch (error) {
      toast.error(`Failed deleting Condition Label ${conditionLabel}`);
      console.log(error.message);
    }
  };

  const headers = ["Condition", "Condition Label", "Edit & Delete"];

  const rowRenderer = (conditionLabel) => (
    <>
      <td className="text-lg max-sm:text-xs flex flex-col gap-1 justify-center items-center">
        <div className="">
          <span>{conditionLabel.conditionNameId?.conditionName}</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-sm max-sm:text-[10px]">Category</span>
          <span>{conditionLabel.category?.name}</span>
        </div>
      </td>
      <td className="text-lg max-sm:text-xs py-2">
        <div>
          {conditionLabel.conditionLabelImg && (
            <img
              src={
                import.meta.env.VITE_APP_BASE_URL +
                conditionLabel.conditionLabelImg
              }
              alt={conditionLabel.conditionLabel}
              className="w-[60px] h-[60px] mx-auto "
            />
          )}
        </div>
        <div>
          <span className="text-sm max-sm:text-[10px]">
            {conditionLabel.conditionLabel}
          </span>
        </div>
      </td>
      <td className="text-white py-2">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            rightIcon={<EditIcon size={16} />}
            onClick={() =>
              navigateTo(
                generatePathWithParams(
                  ROUTES.admin.updateConditionLabel,
                  conditionLabel.id
                )
              )
            }
          >
            Edit
          </Button>
          <button
            className="bg-red-600 px-3 py-1 rounded-md disabled:cursor-none disabled:bg-gray-400"
            onClick={() => {
              setModalOpen(true);
              setLabelToDelete([
                conditionLabel.category.id,
                conditionLabel.id,
                conditionLabel.conditionLabel,
              ]);
            }}
            disabled={deleteLoading}
          >
            <span className="max-sm:hidden">Delete</span>
            <span className="lg:hidden">
              <DeleteForeverIcon />
            </span>
          </button>
        </div>
      </td>
    </>
  );

  const filteredConditionLabels =
    // !conditionLabelsLoading && !categoriesLoading
    !conditionLabelsLoading
      ? !selectedCategory
        ? conditionLabelsData
        : !selectedCondition
        ? conditionLabelsData.filter(
            (cl) => cl.category?.id === selectedCategory
          )
        : conditionLabelsData.filter(
            (cl) =>
              cl.category?.id === selectedCategory &&
              cl.conditionNameId?.id === selectedCondition
          )
      : // .filter((cl) => cl.conditionNameId?.id === selectedCondition)
        [];

  return (
    <div className="flex flex-col items-center p-4 max-sm:p-2 max-sm:text-sm">
      <h2 className="text-black text-lg font-bold mb-4">
        ConditionLabels Table
      </h2>

      {/* Filter features */}
      <div className="w-[96%] flex justify-between max-sm:justify-center flex-wrap gap-2 border rounded-lg shadow-lg my-5 max-sm:py-2 px-5">
        {/* Category, Condition & Clear Filter */}
        <div className="flex justify-evenly flex-wrap gap-2">
          {/* Select Category */}
          <div className="flex my-4 max-sm:my-2 ">
            <select
              id="category"
              onChange={(e) => {
                // setSelectedCategory(e.target.value);
                dispatch(
                  filterCategory({
                    category: e.target.value,
                    from: "conditionLabelsList",
                  })
                );
                // setSelectedCondition("");
              }}
              value={selectedCategory}
              className="px-2 py-1 rounded border text-black"
            >
              <option value="">Select Category</option>
              {!categoriesLoading &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Select Condition */}
          <div className="flex gap-2 my-4 max-sm:my-2">
            <select
              id="condition"
              onChange={(e) => {
                // setSelectedCondition(e.target.value);
                dispatch(
                  filterCondition({
                    condition: e.target.value,
                    from: "conditionLabelsList",
                  })
                );
              }}
              value={selectedCondition}
              className="px-2 py-1 rounded border text-black"
            >
              <option value="">Select Condition</option>
              {!conditionsLoading &&
                conditionsData
                  .filter((c) => c.category.id === selectedCategory)
                  .map((cond) => (
                    <option key={cond.id} value={cond.id}>
                      {cond.conditionName}
                    </option>
                  ))}
            </select>
          </div>

          {/* Clear filter */}
          <div className="flex justify-around items-center gap-2 my-4">
            <button
              className="text-sm text-red-600 px-1 border border-red-600 rounded disabled:text-gray-400 disabled:border-gray-400"
              onClick={() => {
                dispatch(clearFilter({ clear: "conditionLabelsList" }));
              }}
              disabled={!filterData.filtered}
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Create ConditionLabel Button */}
        <div className="flex items-center">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
          >
            Create ConditionLabels
          </Button>
        </div>
      </div>

      {!conditionLabelsLoading && (
        <Table
          headers={headers}
          data={filteredConditionLabels}
          keyExtractor={(item) => item.id}
          rowRenderer={rowRenderer}
        />
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={labelToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this Condition Label? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ConditionLabelsTable;
