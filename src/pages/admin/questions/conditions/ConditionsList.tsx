import React, { useState, useMemo, ChangeEvent, useEffect } from "react";
import {
  useGetConditionsQuery,
  useDeleteConditionMutation,
  useGetCategoriesQuery,
  useLazyGetConditionsQuery,
} from "@api";
import { toast } from "react-toastify";
import { Table } from "@components/admin";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "@features/adminSlices/filterSlice";
import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general";
import { ArrowLeftIcon, DeleteForeverIcon, EditIcon } from "@icons";
import { Button, FlexBox } from "@components/general";
import { useCustomNavigation } from "@hooks";
import { ICondition } from "@features/api/conditionsApi/types";
import { RootState } from "@features/store";

// --- Interfaces ---
interface SelectedConditionState {
  categoryId: string;
  categoryName: string;
  conditionId: string;
  conditionName: string;
}

export const ConditionsList: React.FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigateTo } = useCustomNavigation();

  // Queries & Mutations
  const [
    getConditionsByCategory,
    { data: conditionsData = [], isLoading: fetchingConditions },
  ] = useLazyGetConditionsQuery();

  const { data: categories = [] } = useGetCategoriesQuery();
  const [deleteCondition, { isLoading: deleteLoading }] =
    useDeleteConditionMutation();

  // Local State
  const [selectedCondition, setSelectedCondition] =
    useState<SelectedConditionState | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Redux State
  const filterData = useSelector(
    (state: RootState) => state.filter.conditionsList
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filterData.category || ""
  );

  // --- Handlers ---
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    getConditionsByCategory(categoryId);
    dispatch(filterCategory({ category: categoryId, from: "conditionsList" }));
  };

  const openModal = (item: ICondition) => {
    setSelectedCondition({
      categoryId: item.category._id,
      categoryName: item.category.name,
      conditionId: item._id,
      conditionName: item.conditionName,
    });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedCondition) return;
    try {
      await deleteCondition({
        conditionId: selectedCondition.conditionId,
      }).unwrap();
      toast.success(`Deleted: ${selectedCondition.conditionName}`);
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete condition");
    }
  };

  const headers = [
    "Category",
    "Condition",
    "Details",
    "Configuration",
    "Actions",
  ];

  const rowRenderer = (condition: ICondition) => (
    <>
      <td className="px-4 py-3 text-sm font-medium text-gray-700">
        {condition.category.name}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-blue-600">
            {condition.conditionName}
          </span>
          <span className="text-xs text-gray-500 font-semibold italic">
            Page: {condition.page}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 max-w-xs">
        <div className="flex flex-col gap-1 text-xs">
          <p>
            <span className="font-bold text-gray-600">Keyword:</span>{" "}
            {condition.keyword}
          </p>
          <p className="line-clamp-2 text-gray-500 italic">
            "{condition.description}"
          </p>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          <Badge active={condition.isMandatory} label="Mandatory" />
          <Badge active={condition.multiSelect} label="Multi" />
          <Badge active={condition.isYesNoType} label="Yes/No" />
          <Badge active={condition.showLabelsImage} label="Images" />
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() =>
              navigateTo(
                generatePathWithParams(
                  ROUTES.admin.updateCondition,
                  condition._id
                )
              )
            }
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit"
          >
            <EditIcon size={20} />
          </button>
          <button
            onClick={() => openModal(condition)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
          >
            <DeleteForeverIcon size={20} />
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="p-2 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
          <div className="flex flex-col w-full md:w-auto gap-2">
            <label
              htmlFor="category-select"
              className="text-xs font-bold uppercase tracking-wider text-gray-500"
            >
              Filter by Category
            </label>
            <select
              id="category-select"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-medium bg-gray-50"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <FlexBox direction="col">
            <h2 className="hidden md:block text-xl font-extrabold text-gray-800">
              Conditions Registry
            </h2>
            <p className="text-sm">Select a category to view its conditions</p>
          </FlexBox>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
            className="w-full md:w-auto shadow-sm"
          >
            Create New Condition
          </Button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {fetchingConditions ? (
            <div className="p-20 text-center text-gray-400 font-medium">
              Loading conditions...
            </div>
          ) : (
            <Table
              headers={headers}
              // data={filteredConditions}
              data={conditionsData}
              keyExtractor={(item: ICondition) => item._id}
              rowRenderer={rowRenderer}
            />
          )}
        </div>
      </div>

      {/* Modernized Delete Modal */}
      {isOpen && selectedCondition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <DeleteForeverIcon className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Are you sure you want to delete{" "}
                <span className="font-bold text-gray-800">
                  "{selectedCondition.conditionName}"
                </span>
                ? This action belongs to category{" "}
                <span className="font-medium">
                  {selectedCondition.categoryName}
                </span>{" "}
                and cannot be undone.
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse gap-3">
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300"
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Component ---
const Badge: React.FC<{ active: boolean; label: string }> = ({
  active,
  label,
}) => (
  <span
    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
      active
        ? "bg-green-100 text-green-700 border border-green-200"
        : "bg-gray-100 text-gray-400 border border-gray-200 line-through opacity-60"
    }`}
  >
    {label}
  </span>
);
