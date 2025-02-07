import React, { useState } from "react";
import { useGetCategoryQuery } from "../../../features/api/categories/categoriesApi";
import { useCreateConditionsMutation } from "../../../features/api";
import { toast } from "react-toastify";
import ListButton from "../../components/ListButton";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "../../features/filterSlice";
import { SubmitButton } from "../../components/SubmitButton";
import FormData from "./FormData";

function Condtions() {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  const [createConditions, { isLoading: createConditonLoading }] =
    useCreateConditionsMutation();

  const filterData = useSelector((state) => state.filter.conditionsList);
  //   console.log("filterData from Conditions", filterData);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    category: filterData.category,
    conditionName: "",
    page: "",
    keyword: "",
    isYesNoType: false,
    description: "",
  });

  console.log("formData", formData);

  // Function to handle changes in the form fields
  const handleChange = (event, conditionName) => {
    const { value } = event.target;
    const updatedFormData = { ...formData };
    updatedFormData[conditionName] = value;
    setFormData(updatedFormData);
  };

  console.log("condition formData", formData);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("handleSubmit", formData);

    try {
      const condition = await createConditions(
        JSON.stringify(formData)
      ).unwrap();
      console.log("condition created", condition);
      if (condition.message?.includes("Duplicate")) {
        toast.warning(condition.message);
        return;
      } else if (condition.message?.includes("Create atleast one")) {
        toast.warning(condition.message);
        return;
      }
      toast.success("Conditions created successfull..!");
    } catch (error) {
      console.log("Error while creating condition:- ", error);
      toast.error("Conditions creation failed..!");
    }
  };

  return (
    // <div className="flex gap-4">
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="bold text-lg max-sm:text-sm mb-2">Create Condition</h1>
        <ListButton
          location={"/admin/conditionsList"}
          text={"Conditions List"}
        />
      </div>
      {/* Create Condition BOX */}
      <div className="flex">
        <div className="bg-white flex justify-center border rounded-md shadow-lg w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-4 px-4 max-sm:px-2 py-4 max-sm:py-2"
          >
            <h2 className="text-lg max-sm:text-sm">Add Condition</h2>
            <hr />

            {/* Select Category */}
            <div className="flex items-center gap-2">
              <label>Category:</label>
              <select
                className="border p-1 rounded text-lg max-sm:text-sm"
                value={formData.category}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  });
                  dispatch(
                    filterCategory({
                      category: e.target.value,
                      from: "conditionsList",
                    })
                  );
                }}
                required
              >
                <option value="">Select a category</option>
                {categoryData?.map((category) => (
                  <option key={category.id} value={category.id} name="category">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
              {/* Condition Name */}
              <FormData
                label="Condition Name"
                type="text"
                value={formData.conditionName}
                handleChange={(e) => handleChange(e, "conditionName")}
              />

              {/* Page No */}
              <FormData
                label="Page No"
                type="number"
                value={formData.page}
                handleChange={(e) => handleChange(e, "page")}
              />

              {/* Keyword */}
              <FormData
                label="Keyword"
                type="text"
                value={formData.keyword}
                handleChange={(e) => handleChange(e, "keyword")}
              />

              {/* Description */}
              <FormData
                label="Description"
                type="text"
                value={formData.description}
                handleChange={(e) => handleChange(e, "description")}
              />

              {/* Yes & No */}
              <div className="flex items-center gap-1">
                <label>is it Yes & No Condition:</label>
                <select
                  name="isYesNoType"
                  value={formData.isYesNoType}
                  className="px-1 border rounded"
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      isYesNoType: event.target.value,
                    }));
                  }}
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="py-3">
              <SubmitButton loading={createConditonLoading}>
                Create Condition
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Condtions;
