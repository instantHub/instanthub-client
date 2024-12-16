import React, { useState } from "react";
import {
  useGetConditionsQuery,
  useGetCategoryQuery,
  useDeleteConditionMutation,
} from "../../../features/api";
import BackButton from "../../components/BackButton";
import EditButton from "../../components/EditButton";
import { toast } from "react-toastify";
import Table from "../../components/TableView";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "../../features/filterSlice";

const ConditionsList = () => {
  //   const [questions, setQuestions] = useState([]);
  const { data: conditions, isLoading: conditionsLoading } =
    useGetConditionsQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoryQuery();
  const [deleteCondition, { isLoading: deleteLoading }] =
    useDeleteConditionMutation();

  const [selectedCondition, setSelectedCondition] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const filterData = useSelector((state) => state.filter.conditionsList);
  console.log("filterData from ConditionsList", filterData);

  const dispatch = useDispatch();

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

  // if (!conditionsLoading) {
  //   console.log(conditions);
  // }

  const headers = ["Category", "Condition", "Page", "Edit & Delete"];

  const rowRenderer = (condition) => (
    <>
      <td className="text-lg max-sm:text-xs py-2">{condition.category.name}</td>
      <td className="text-lg max-sm:text-xs py-2">{condition.conditionName}</td>
      <td className="text-lg max-sm:text-xs py-2">{condition.page}</td>
      <td className="text-lg max-sm:text-xs text-white py-2">
        <div className="flex gap-2 justify-center">
          <EditButton location={`/admin/updateCondition/${condition.id}`} />
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
              <MdDeleteForever />
            </span>
          </button>
        </div>
      </td>
    </>
  );

  return (
    <>
      <div className="p-4">
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


          <h2 className="text-black text-xl max-sm:text-sm font-serif font-bold mb-4">
            Conditions Table
          </h2>

          <BackButton
            location={"/admin/create-questions"}
            text={"Create Condtion"}
          />
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

export default ConditionsList;

{
  /* <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white bg-gray-800">Category</th>
              <th className="px-4 py-2 text-white bg-gray-800">Condition</th>
              <th className="px-4 py-2 text-white bg-gray-800">Page</th>
              <th className="px-4 py-2 text-white bg-gray-800">
                Edit & Delete
              </th>
            </tr>
          </thead>

          <tbody className="text-center">
            {!conditionsLoading && !selectedCategory
              ? conditions.map((condition, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                  >
                    <td className=" py-2">{condition.category.name}</td>
                    <td className=" py-2">{condition.conditionName}</td>
                    <td className=" py-2">{condition.page}</td>
                    <td className="text-white py-2">
                      <div className="flex gap-2 justify-center">
                        <EditButton
                          location={`/admin/updateCondition/${condition.id}`}
                        />
                        <button
                          className="bg-red-600 px-3 py-1 rounded-md"
                          onClick={() =>
                            openModal(
                              condition.category.id,
                              condition.category.name,
                              condition.id,
                              condition.conditionName
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !conditionsLoading &&
                conditions
                  .filter((cond) => cond.category.id === selectedCategory)
                  .map((condition, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                    >
                      <td className=" py-2">{condition.category.name}</td>
                      <td className=" py-2">{condition.conditionName}</td>
                      <td className=" py-2">{condition.page}</td>
                      <td className="text-white py-2">
                        <div className="flex gap-2 justify-center">
                          <EditButton
                            location={`/admin/updateCondition/${condition.id}`}
                          />
                          <button
                            className="bg-red-600 px-3 py-1 rounded-md"
                            onClick={() =>
                              openModal(
                                condition.category.id,
                                condition.category.name,
                                condition.id,
                                condition.conditionName
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table> */
}
