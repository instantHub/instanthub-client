import React, { useState } from "react";
import {
  useCreateConditionsMutation,
  useGetCategoryQuery,
  useGetConditionsQuery,
} from "../../../features/api";

import { Link } from "react-router-dom";
import CreateConditionLabels from "./CreateConditionLabels";
import { toast } from "react-toastify";
import ListButton from "../../components/ListButton";

function Condtions() {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery();
  const [
    createConditions,
    {
      isLoading: createConditonLoading,
      isSuccess: conditionCreated,
      isError: conditionFailed,
    },
  ] = useCreateConditionsMutation();
  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();

  const [formData, setFormData] = useState({
    category: "",
    conditionName: "",
    page: "",
  });

  // Function to handle changes in the form fields
  const handleChange = (event, field, conditionName) => {
    const { value } = event.target;
    const updatedFormData = { ...formData };
    updatedFormData[conditionName] = value;
    setFormData(updatedFormData);
  };

  // console.log("condition formData", formData);

  // Function to add a new condition name
  const addConditionName = () => {
    setFormData((prevState) => ({
      ...prevState,
      conditionNames: [...prevState.conditionNames, { name: "" }],
    }));
  };

  // Function to delete a condition name
  const deleteConditionName = (index) => {
    setFormData((prevState) => {
      const updatedConditionNames = [...prevState.conditionNames];
      updatedConditionNames.splice(index, 1);
      return { ...prevState, conditionNames: updatedConditionNames };
    });
  };

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
    <>
      <div className="flex flex-col gap-10 w-[90%] mt-[2%] mx-auto">
        <div className="flex gap-4">
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="bold text-[1.4rem] mb-2">Create Condition</h1>
              <div className="flex items-center gap-1">
                <h2>Home </h2>
                <h2 className="pl-1"> / Add Condition</h2>

                <ListButton
                  location={"/admin/conditionsList"}
                  text={"Conditions List"}
                />
              </div>
            </div>
            {/* Create Condition BOX */}
            <div className="bg-white flex border rounded-md shadow-lg">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4  p-5 "
              >
                <div>
                  <h2 className="">Add Condition</h2>
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-4 ">
                  <div className="flex flex-col">
                    <label>Category:</label>
                    <select
                      className="border p-1 rounded"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        });
                      }}
                      required
                    >
                      <option value="">Select a category</option>
                      {!categoryLoading &&
                        categoryData?.map((category) => (
                          <option
                            key={category.id}
                            value={category.id}
                            name="category"
                            className=""
                          >
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
                  <div className="flex items-center">
                    <div className="">
                      <label>Condition Name:</label>
                      <input
                        type="text"
                        name="name"
                        className="border mx-2 py-1 px-2 rounded text-[15px]"
                        placeholder="Enter Condition Name"
                        value={formData.conditionName}
                        onChange={(event) =>
                          handleChange(event, "name", "conditionName")
                        }
                        required
                      />
                    </div>
                    <div className="">
                      <label>Page:</label>
                      <input
                        type="number"
                        name="page"
                        className="border mx-2 py-1 px-2 rounded text-[15px]"
                        placeholder="Enter Page Number"
                        value={formData.page}
                        onChange={(event) =>
                          handleChange(event, "name", "page")
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="py-3 px-2">
                  <button
                    type="submit"
                    className={`w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
                    disabled={createConditonLoading}
                  >
                    {!createConditonLoading ? "Create Condition" : "Loading..."}
                  </button>
                </div>
              </form>

              {/* condition List */}
              <div className="mt-5 ml-5 overflow-y-auto scrollbar max-h-[250px]">
                <p className="w-full text-xl font-semibold">
                  List of selected category's conditions
                </p>
                <ul className="">
                  {!conditionsLoading &&
                    conditionsData
                      ?.filter((cond) => cond.category.id == formData.category)
                      .map((condition) => (
                        <li className="bg-white text-lg px-4 py-2">
                          {condition.conditionName}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <CreateConditionLabels />
      </div>
    </>
  );
}

export default Condtions;
