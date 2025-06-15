import React, { useEffect, useState } from "react";
import { useGetConditionsQuery, useUpdateConditionMutation } from "@api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormData from "./FormData";
import { ROUTES } from "@routes";
import { Button } from "@components/general";
import { useCustomNavigation } from "@hooks";
import { ArrowLeftIcon } from "@icons";

function UpdateCondition() {
  const { conditionId } = useParams();
  // console.log(conditionId);

  const { data: conditionsData, isLoading: conditionsLoading } =
    useGetConditionsQuery();
  const [
    updateCondition,
    { isLoading: updateConditionLoading, isError: updateConditionError },
  ] = useUpdateConditionMutation();

  const { goBack } = useCustomNavigation();

  const [formData, setFormData] = useState({
    category: "",
    conditionName: "",
    page: 0,
    keyword: "",
    description: "",
    isYesNoType: false,
    isMandatory: false,
    showLabelsImage: false,
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
        description: conditiontoUpdate.description,
        isMandatory: conditiontoUpdate.isMandatory,
        multiSelect: conditiontoUpdate.multiSelect,
        isYesNoType: conditiontoUpdate.isYesNoType,
        showLabelsImage: conditiontoUpdate.showLabelsImage,
      }));
    }
  }, [conditionsData]);
  console.log("formdata", formData);
  // console.log("conditiontoUpdate", conditiontoUpdate);

  function handleCheckBox(e) {
    console.log(e.target, e.target.checked);
    const { name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: !prev[name] };
    });
  }

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
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<ArrowLeftIcon />}
              onClick={goBack}
            >
              Back
            </Button>
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
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-4 max-md:grid-cols-2 items-center gap-2 text-sm max-sm:text-xs">
                  {/* Is Mandatory */}
                  <div>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="isMandatory"
                        checked={formData.isMandatory}
                        onChange={handleCheckBox}
                      />
                      <span>Mandatory</span>
                    </label>
                  </div>

                  {/* Multi Select */}
                  <div>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="multiSelect"
                        checked={formData.multiSelect}
                        onChange={handleCheckBox}
                      />
                      <span>Multi Select</span>
                    </label>
                  </div>

                  {/* Yes & No */}
                  <div>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="isYesNoType"
                        checked={formData.isYesNoType}
                        disabled={formData.multiSelect}
                        onChange={handleCheckBox}
                      />
                      <span>Yes & No Condition</span>
                    </label>
                  </div>

                  {/* Show Images */}
                  <div>
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="showLabelsImage"
                        checked={formData.showLabelsImage}
                        disabled={formData.isYesNoType}
                        onChange={handleCheckBox}
                      />
                      <span>Show Images</span>
                    </label>
                  </div>
                </div>

                <div className="py-3 flex">
                  <Button
                    type="submit"
                    variant="greenary"
                    loading={updateConditionLoading}
                    fullWidth
                  >
                    Update Condition
                  </Button>
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
