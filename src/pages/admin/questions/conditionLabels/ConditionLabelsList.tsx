import React, { useState, useMemo } from "react";
import {
  useGetCategoriesQuery,
  useGetConditionsQuery,
  useGetConditionLabelsQuery,
  useDeleteConditionLabelMutation,
  useLazyGetConditionsQuery,
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
import { generatePathWithParams } from "@utils/general";
import { ArrowLeftIcon, DeleteForeverIcon, EditIcon } from "@icons";
import { Button } from "@components/general";
import { useCustomNavigation } from "@hooks";
import { RootState } from "@features/store";

// --- Types ---
interface ConditionLabel {
  _id: string;
  conditionLabel: string;
  conditionLabelImg?: string;
  category: { _id: string; name: string };
  conditionNameId: { _id: string; conditionName: string };
}

export const ConditionLabelsList: React.FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigateTo } = useCustomNavigation();
  const filterData = useSelector(
    (state: RootState) => state.filter.conditionLabelsList
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<
    [string, string, string] | null
  >(null);

  // --- API Hooks ---
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [
    getConditionsByCategory,
    { data: conditionsData = [], isLoading: fetchingConditions },
  ] = useLazyGetConditionsQuery();

  // Logic: Only fetch labels if category is selected.
  // Pass both category and condition to API to let backend handle filtering for performance.
  const { data: conditionLabelsData = [], isLoading: labelsLoading } =
    useGetConditionLabelsQuery(
      {
        categoryId: filterData.category,
        conditionId: filterData.condition,
      },
      { skip: !filterData.category } // Don't call API until category is selected
    );

  const [deleteConditionLabel, { isLoading: deleteLoading }] =
    useDeleteConditionLabelMutation();

  // --- Handlers ---
  const handleDelete = async () => {
    if (!labelToDelete) return;
    const [category, conditionLabelId, conditionLabelName] = labelToDelete;

    try {
      await deleteConditionLabel({ conditionLabelId }).unwrap();
      toast.success(`Successfully deleted ${conditionLabelName}`);
      setModalOpen(false);
    } catch (error) {
      toast.error(`Failed to delete Condition Label`);
    }
  };

  const headers = ["Condition", "Condition Label", "Actions"];

  const rowRenderer = (cl: ConditionLabel) => (
    <>
      <td className="p-3 text-center">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-blue-700">
            {cl.conditionNameId?.conditionName}
          </span>
          <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 uppercase tracking-tight">
            <span>Category:</span>
            <span className="font-semibold text-gray-700">
              {cl.category?.name}
            </span>
          </div>
        </div>
      </td>
      <td className="p-3">
        <div className="flex flex-col items-center gap-2">
          {cl.conditionLabelImg && (
            <img
              src={`${import.meta.env.VITE_APP_BASE_URL}${
                cl.conditionLabelImg
              }`}
              alt={cl.conditionLabel}
              className="w-12 h-12 rounded shadow-sm object-cover border border-gray-100"
            />
          )}
          <span className="text-sm font-medium text-gray-800">
            {cl.conditionLabel}
          </span>
        </div>
      </td>
      <td className="p-3">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            rightIcon={<EditIcon size={16} />}
            onClick={() =>
              navigateTo(
                generatePathWithParams(
                  ROUTES.admin.updateConditionLabel,
                  cl._id
                )
              )
            }
          >
            Edit
          </Button>
          <button
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
            onClick={() => {
              setLabelToDelete([cl.category._id, cl._id, cl.conditionLabel]);
              setModalOpen(true);
            }}
            disabled={deleteLoading}
          >
            <DeleteForeverIcon size={18} />
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="flex flex-col items-center p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Condition Labels Management
          </h2>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
          >
            Create New Label
          </Button>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-wrap items-end gap-6">
          <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Category
            </label>
            <select
              value={filterData.category}
              onChange={(e) => {
                dispatch(
                  filterCategory({
                    category: e.target.value,
                    from: "conditionLabelsList",
                  })
                );
                getConditionsByCategory(e.target.value);
              }}
              className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px]">
            <label className="text-xs font-bold text-gray-500 uppercase">
              Condition
            </label>
            <select
              value={filterData.condition}
              onChange={(e) =>
                dispatch(
                  filterCondition({
                    condition: e.target.value,
                    from: "conditionLabelsList",
                  })
                )
              }
              disabled={!filterData.category}
              className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            >
              <option value="">Select Condition</option>
              {conditionsData
                .filter((c: any) => c.category._id === filterData.category)
                .map((cond: any) => (
                  <option key={cond._id} value={cond._id}>
                    {cond.conditionName}
                  </option>
                ))}
            </select>
          </div>

          <button
            className="mb-1 text-sm font-semibold text-red-600 hover:text-red-800 disabled:text-gray-400"
            onClick={() =>
              dispatch(clearFilter({ clear: "conditionLabelsList" }))
            }
            disabled={!filterData.filtered}
          >
            Clear All Filters
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {labelsLoading ? (
            <div className="p-20 text-center text-gray-400">
              Loading labels...
            </div>
          ) : filterData.category ? (
            <Table
              headers={headers}
              data={conditionLabelsData}
              keyExtractor={(item: ConditionLabel) => item._id}
              rowRenderer={rowRenderer}
            />
          ) : (
            <div className="p-20 text-center flex flex-col items-center gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-gray-500 font-medium">
                Please select a category to view labels
              </p>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Condition Label"
        description={`Are you sure you want to delete "${labelToDelete?.[2]}"? This action is permanent.`}
        itemToDelete={undefined}
      />
    </div>
  );
};
