import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useGetVariantsQuestionsQuery,
  useUpdateVariantQuestionsMutation,
} from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";

export const UpdateVariantQuestions = () => {
  const { variantQuestionsId } = useParams();
  //   console.log("variantQuestionsId", variantQuestionsId);

  const [selectedVariantQuestions, setSelectedVariantQuestions] =
    useState(null);
  const [selectedDeductions, setSelectedDeductions] = useState(null);
  const [operation, setOperation] = useState();

  const {
    data: variantsQuestionsData,
    isLoading: variantsQuestionsDataLoading,
  } = useGetVariantsQuestionsQuery();

  const [updateVariantQuestions, { isLoading: updateLoading }] =
    useUpdateVariantQuestionsMutation();

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (variantsQuestionsData) {
      // Set the matched variant to the component state
      const variantQuestions = variantsQuestionsData.find(
        (vq) => vq._id === variantQuestionsId
      );
      console.log("variantQuestions", variantQuestions);
      setSelectedVariantQuestions(variantQuestions);

      setSelectedDeductions(variantQuestions.deductions);
    }
  }, [variantsQuestionsData]);

  // Handle input changes and update productData state
  // New Approach
  const handlePriceDropChange = (conditionLabelId, value, check) => {
    // Find the condition label by conditionLabelId and update the priceDrop
    console.log("Simple Deductions", check);
    let updatedVariantsData;
    if (check === "priceDrop") {
      // const updatedVariantsData = {
      updatedVariantsData = {
        ...selectedVariantQuestions,
        deductions: selectedVariantQuestions.deductions.map((condition) => ({
          ...condition,
          conditionLabels: condition.conditionLabels.map((label) => ({
            ...label,
            priceDrop:
              label.conditionLabelId === conditionLabelId
                ? value
                : label.priceDrop,
          })),
        })),
      };
      // console.log("updatedVariantsData", updatedVariantsData);
    } else if (check === "operation") {
      // console.log("OPERATION", value);
      updatedVariantsData = {
        ...selectedVariantQuestions,
        deductions: selectedVariantQuestions.deductions.map((condition) => ({
          ...condition,
          conditionLabels: condition.conditionLabels.map((label) => ({
            ...label,
            operation:
              label.conditionLabelId === conditionLabelId
                ? value
                : label.operation,
          })),
        })),
      };
    }
    setSelectedVariantQuestions(updatedVariantsData);
    setSelectedDeductions(updatedVariantsData.deductions);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateVariantQuestions({
        variantQuestionsId: variantQuestionsId,
        data: selectedVariantQuestions,
      }).unwrap();
      toast.success("Updated PriceDrops for the Variant");
      // Handle success
    } catch (error) {
      console.error("Error updating Variant Conditions:", error);
    }
  };

  console.log("selectedVariantQuestions", selectedVariantQuestions);
  // console.log("selectedDeductions", selectedDeductions);

  return (
    <div className="w-fit mx-auto text-sm max-sm:text-xs">
      <div className="w-fit m-2 max-sm:m-1 px-4 max-sm:px-2 py-1 bg-black text-white rounded">
        <Link to={ROUTES.admin.variantsQuestions}>
          <button>Back</button>
        </Link>
      </div>

      <div className="relative flex flex-col mx-auto my-1 bg-white px-4 max-sm:px-1 py-2">
        <div className="relative m-2">
          <h1 className="text-xl max-sm:text-lg text-center font-serif font-bold text-green-700 mb-2">
            {selectedVariantQuestions
              ? `${selectedVariantQuestions.name} Variant`
              : "Loading.."}
          </h1>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          {!variantsQuestionsDataLoading &&
            selectedDeductions &&
            selectedDeductions?.map((condition, index) => (
              <div key={index} className={`border my-2 rounded`}>
                <h2 className="text-2xl max-sm:text-lg py-2 text-center font-serif font-extrabold bg-white">
                  {condition.conditionName}
                </h2>
                <hr />
                <div className="flex flex-col ">
                  {condition.conditionLabels &&
                    condition.conditionLabels?.map((conditionLabel, index) => (
                      <div
                        key={index}
                        className={`flex gap-6 justify-center max-sm:gap-1 p-2 items-center
                          ${index % 2 === 0 && `bg-gray-100`}`}
                      >
                        <div>
                          <h3 className="text-sm max-sm:text-[10px]">
                            {conditionLabel.conditionLabel}
                          </h3>

                          <div className="flex items-center gap-1 w-fit">
                            <input
                              type="number"
                              name="priceDrop"
                              value={conditionLabel.priceDrop}
                              className="border px-3 py-1 rounded w-fit"
                              placeholder="Price Drop"
                              onChange={(e) =>
                                handlePriceDropChange(
                                  conditionLabel.conditionLabelId,
                                  parseInt(e.target.value),
                                  e.target.name
                                )
                              }
                              required
                            />
                            <span>%</span>
                          </div>
                        </div>

                        {conditionLabel.conditionLabelImg && (
                          <div>
                            <img
                              src={
                                import.meta.env.VITE_APP_BASE_URL +
                                conditionLabel.conditionLabelImg
                              }
                              alt="conditionLabelImg"
                              className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
                            />
                          </div>
                        )}
                        <div className="flex gap-4 max-sm:flex-col max-sm:gap-1">
                          <p
                            className={`${
                              conditionLabel.operation === "Subtrack"
                                ? "bg-red-200 px-2"
                                : "bg-blue-200 px-4"
                            } text-black font-bold py-1 rounded text-center`}
                          >
                            {conditionLabel.operation}
                          </p>
                          <select
                            name="operation"
                            className="border rounded px-1"
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                handlePriceDropChange(
                                  conditionLabel.conditionLabelId,
                                  e.target.value,
                                  e.target.name
                                );
                              }
                            }}
                          >
                            <option value="">Select Operation</option>
                            <option value="Subtrack">Subtrack</option>
                            <option value="Add">Add</option>
                          </select>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <div className="flex justify-center my-5">
            <button
              type="submit"
              className={`w-fit bg-green-600 text-white rounded-md p-2 cursor-pointer hover:bg-green-700 disabled:cursor-none disabled:bg-gray-300`}
              disabled={updateLoading}
            >
              {!updateLoading ? "Update PriceDrops" : "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
