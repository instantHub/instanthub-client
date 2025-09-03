import { useState } from "react";
import {
  useGetConditionsQuery,
  useDeleteConditionMutation,
  useGetCategoriesQuery,
} from "@api";
import { toast } from "react-toastify";
import { Table } from "@components/admin";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "@features/adminSlices/filterSlice";
import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general";
import { ArrowLeftIcon, DeleteForeverIcon, EditIcon } from "@icons";
import { Button } from "@components/general";
import { useCustomNavigation } from "@hooks";

export const ConditionsList = () => {
  //   const [questions, setQuestions] = useState([]);
  const { data: conditions, isLoading: conditionsLoading } =
    useGetConditionsQuery();

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [deleteCondition, { isLoading: deleteLoading }] =
    useDeleteConditionMutation();

  const [selectedCondition, setSelectedCondition] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const filterData = useSelector((state) => state.filter.conditionsList);
  console.log("filterData from ConditionsList", filterData);

  const dispatch = useDispatch();

  const { goBack, navigateTo } = useCustomNavigation();

  if (conditions) {
    const cats = conditions.filter(
      (cond) => cond.category.id === filterData?.category
      // (cond) => cond.category.id === selectedCategory
    );
    console.log("conditions", cats);
  }

  // Modal open for confirming Condition DELETE
  const openModal = (categoryId, categoryName, conditionId, conditionName) => {
    console.log(categoryId, categoryName, conditionId, conditionName);
    setSelectedCondition({
      categoryId,
      categoryName,
      conditionId,
      conditionName,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [selectedCategory, setSelectedCategory] = useState(filterData.category);

  const handleDelete = async (category, conditionId) => {
    console.log(category, conditionId);
    try {
      await deleteCondition({ category, conditionId });
      toast.success(
        `Successfully deleted condition ${selectedCondition.conditionName}`
      );
      closeModal();
    } catch (error) {
      toast.error(
        `Failed deleting condition ${selectedCondition.conditionName}`
      );
      console.log(error.message);
    }
  };

  const headers = [
    "Category",
    "Condition",
    "Caption",
    "Configuration",
    "Edit & Delete",
  ];

  const style = { shortText: "text-xs max-sm:text-[10px]" };

  const rowRenderer = (condition) => (
    <>
      <td className=" py-2">{condition.category.name}</td>
      <td className="flex flex-col gap-1 py-2">
        <span>{condition.conditionName}</span>
        <b>Page No. {condition.page}</b>
      </td>

      <td className=" py-2">
        <div className="flex flex-col gap-1">
          <span>
            <b className={`${style.shortText}`}>Keyword: </b>
            {condition.keyword}
          </span>
          <span>
            <b className={`${style.shortText}`}>Description: </b>
            {condition.description}
          </span>
        </div>
      </td>

      <td className="flex flex-col py-2 max-sm:text-[10px]">
        <span className={`${!condition.isMandatory && "line-through"}`}>
          {condition.isMandatory ? "Mandatory" : "Not Mandatory"}
        </span>
        <span>
          {condition.multiSelect ? "Multi Select" : "Not Multi Select"}
        </span>
        <span>{condition.isYesNoType ? "Yes No Type" : "Not Yes No Type"}</span>
        <span>
          {condition.showLabelsImage ? "Show Image" : "Don't Show Image"}
        </span>
      </td>

      <td className=" text-white py-2">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            rightIcon={<EditIcon size={16} />}
            onClick={() =>
              navigateTo(
                generatePathWithParams(
                  ROUTES.admin.updateCondition,
                  condition.id
                )
              )
            }
          >
            Edit
          </Button>
          <button
            className="bg-red-600 px-3 py-1 max-sm:px-2 rounded-md"
            onClick={() =>
              openModal(
                condition.category.id,
                condition.category.name,
                condition.id,
                condition.conditionName
              )
            }
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

  return (
    <>
      <div className="p-4 max-sm:p-1">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-4 mb-4 max-sm:text-sm">
            <div className="w-fit flex justify-around items-center max-sm:flex-col max-sm:items-start gap-2 max-sm:gap-1">
              <label htmlFor="condition" className="text-lg max-sm:text-xs">
                Select Category:
              </label>
              <select
                id="category"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedCondition("");
                  dispatch(
                    filterCategory({
                      category: e.target.value,
                      from: "conditionsList",
                    })
                  );
                }}
                value={selectedCategory}
                className="px-2 py-1 w-fit max-sm:w-4/5 rounded border text-black text-lg max-sm:text-xs"
              >
                <option value="">Search</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-black text-xl max-sm:text-sm  font-bold mb-4">
            Conditions Table
          </h2>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ArrowLeftIcon />}
            onClick={goBack}
          >
            Create Condtion
          </Button>
        </div>

        {!conditionsLoading && (
          <Table
            headers={headers}
            data={
              // !selectedCategory
              !filterData.category
                ? conditions
                : conditions.filter(
                    (cond) => cond.category.id === filterData.category
                    // (cond) => cond.category.id === selectedCategory
                  )
            }
            keyExtractor={(item) => item.id}
            rowRenderer={rowRenderer}
          />
        )}
      </div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Sure want to delete this Condition?
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex gap-4 items-center">
                  <span>Category</span>
                  <h2 className="text-lg font-semibold">
                    {selectedCondition.categoryName}
                  </h2>
                </div>
                <div className="flex gap-4 items-center">
                  <span>Condition</span>
                  <h2 className="text-lg font-semibold">
                    {selectedCondition.conditionName}
                  </h2>
                </div>
              </div>
              <div className="flex justify-around mt-8">
                <button
                  onClick={() =>
                    handleDelete(
                      selectedCondition.categoryId,
                      selectedCondition.conditionId
                    )
                  }
                  className="bg-red-600 text-white px-4 py-1 rounded disabled:cursor-none disabled:bg-gray-300"
                  disabled={deleteLoading}
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
    </>
  );
};
