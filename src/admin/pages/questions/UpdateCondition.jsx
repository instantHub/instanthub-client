import React, { useEffect, useState } from "react";
import {
  useGetConditionsQuery,
  useUpdateConditionMutation,
} from "../../../features/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import { SubmitButton } from "../../components/SubmitButton";
import FormData from "./FormData";

function UpdateCondition() {
  const { conditionId } = useParams();
  // console.log(conditionId);

  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();
  const [
    updateCondition,
    { isLoading: updateConditionLoading, isError: updateConditionError },
  ] = useUpdateConditionMutation();

  const [formData, setFormData] = useState({
    category: "",
    conditionName: "",
    page: null,
    keyword: "",
    isYesNoType: false,
    description: "",
  });

  let conditiontoUpdate = null;

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
        keyword: conditiontoUpdate.keyword,
        isYesNoType: conditiontoUpdate.isYesNoType || false,
        description: conditiontoUpdate.description,
      }));
    }
  }, [conditionsData]);
  // console.log("formdata", formData);
  // console.log("conditiontoUpdate", conditiontoUpdate);

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
      <div className="flex mt-[5%] w-1/2 max-sm:w-[98%] mx-auto">
        <div className="grow">
          <div className="flex justify-between items-center">
            <h1 className="bold text-xl max-sm:text-lg mb-2">
              Update Condition
            </h1>

            <BackButton location={"/admin/conditionsList"} />
          </div>
          {!conditionsLoading && (
            <div className="bg-white border rounded-md shadow-lg">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-5 "
              >
                <p className="text-xl opacity-75">
                  Update {conditiontoUpdate?.category} Condition
                </p>
                <hr />

                <div className="grid grid-cols-2 gap-2 w-full max-lg:grid-cols-1">
                  {/* Condition Name */}
                  {/* <div className="flex items-center gap-1">
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
                  </div> */}

                  {/* Condition Name */}
                  <FormData
                    label="Condition Name"
                    type="text"
                    value={formData.conditionName}
                    handleChange={(e) =>
                      setFormData({
                        ...formData,
                        conditionName: e.target.value,
                      })
                    }
                  />

                  {/* Keyword */}
                  {/* <div className="flex items-center gap-1">
                    <label>Keyword:</label>
                    <input
                      type="text"
                      name="keyword"
                      value={formData.keyword}
                      className="border py-1 px-2 rounded text-sm max-sm:text-xs"
                      placeholder="Enter a keyword"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          keyword: e.target.value,
                        })
                      }
                      required
                    />
                  </div> */}

                  <FormData
                    label="Keyword"
                    type="text"
                    value={formData.keyword}
                    handleChange={(e) =>
                      setFormData({
                        ...formData,
                        keyword: e.target.value,
                      })
                    }
                  />

                  {/* Page No */}
                  {/* <div className="flex items-center gap-1">
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
                  </div> */}

                  <FormData
                    label="Page No"
                    type="text"
                    value={formData.page}
                    handleChange={(e) =>
                      setFormData({
                        ...formData,
                        page: e.target.value,
                      })
                    }
                  />

                  {/* Description */}
                  <FormData
                    label="Description"
                    type="text"
                    value={formData.description}
                    handleChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />

                  {/* Yes & No */}
                  <div className="flex items-center gap-1">
                    <label>is it Yes & No Condition:</label>
                    <select
                      name="isYesNoType"
                      value={formData.isYesNoType}
                      className="px-1 border rounded"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isYesNoType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>

                <div className="py-3 flex">
                  <SubmitButton loading={updateConditionLoading}>
                    Update Condition
                  </SubmitButton>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateCondition;
