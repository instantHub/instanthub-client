import React, { useEffect, useState } from "react";
import {
  useGetConditionsQuery,
  useUpdateConditionMutation,
} from "../../../features/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";

function UpdateCondition() {
  const { conditionId } = useParams();
  //   console.log(conditionId);

  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();
  const [
    updateCondition,
    { isLoading: updateConditionLoading, isError: updateConditionError },
  ] = useUpdateConditionMutation();

  const [formData, setFormData] = useState({
    category: "",
    conditionName: "",
    page: undefined,
  });

  let conditiontoUpdate;

  useEffect(() => {
    // if (conditionsData) {
    if (!conditionsLoading) {
      conditiontoUpdate = conditionsData.find(
        (condition) => condition.id == conditionId
      );
      console.log("useEffect", conditiontoUpdate);
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: conditiontoUpdate.category.id,
        conditionName: conditiontoUpdate.conditionName,
        page: conditiontoUpdate.page,
      }));
    }
  }, [conditionsData]);
  console.log("formdata", formData);
  console.log("conditiontoUpdate", conditiontoUpdate);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("handleSubmit", conditionId);

    try {
      await updateCondition({
        conditionId: conditionId,
        data: formData,
      }).unwrap();
      // Handle success
      toast.success(`Condition Updated Successfully`);
    } catch (error) {
      console.error("Error updating condition:", error);
      toast.error(`Something went wrong..!`);
    }

    // Send formData to backend or perform any other action
    console.log("handleSubmit", formData);
  };

  return (
    <>
      <div className="flex mt-[5%] w-[80%] mx-auto">
        <div className="grow">
          <div className="flex justify-between items-center">
            <h1 className="bold text-[1.4rem] mb-2">Update Condition</h1>
            <div className="flex items-center gap-1">
              <h2>Home </h2>
              <h2 className="pl-1"> / Update Condition</h2>

              <BackButton location={"/admin/conditionsList"} />
            </div>
          </div>
          <div className="bg-white border rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 ">
              <div className="flex gap-2 items-center">
                <span className="text-xl opacity-75">Update </span>
                {!conditionsLoading && (
                  <h1 className="text-2xl ">
                    {conditiontoUpdate !== undefined
                      ? conditiontoUpdate.category
                      : null}{" "}
                  </h1>
                )}
                <span className="text-xl opacity-75">Condition</span>
              </div>
              <hr />

              <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
                {!conditionsLoading && (
                  <div className="flex flex-row">
                    <div className="">
                      <label>Condition Name:</label>
                      <input
                        type="text"
                        name="conditionName"
                        className="border mx-2 py-1 px-2 rounded text-[15px]"
                        placeholder="Enter Condition Name"
                        value={formData.conditionName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            conditionName: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            page: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="py-3 px-2">
                <button
                  type="submit"
                  className={`w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
                  disabled={updateConditionLoading}
                >
                  {!updateConditionLoading ? "Update Condition" : "Loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCondition;
