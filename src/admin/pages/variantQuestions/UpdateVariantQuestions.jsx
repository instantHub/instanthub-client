import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  useGetVariantsQuestionsQuery,
  useUpdateVariantQuestionsMutation,
} from "../../../features/api";
import { toast } from "react-toastify";

const UpdateVariantQuestions = () => {
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
    <div className="">
      <div className="flex items-center justify-between mx-4">
        <div className="inline-block m-4 px-4 py-1 bg-blue-600 text-white rounded">
          <Link to={"/admin/variants-questions"}>
            <button>Back</button>
          </Link>
        </div>
      </div>

      <div className="relative w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl">
        <div className="relative m-2">
          <h1 className="text-4xl text-center font-serif font-bold text-green-700 mb-2">
            {selectedVariantQuestions
              ? `${selectedVariantQuestions.name} Variant`
              : "Loading.."}
          </h1>
          <hr />
        </div>

        <div className="bg-scroll">
          <div>
            <h1>Variant Questions</h1>
            <form onSubmit={handleSubmit}>
              {!variantsQuestionsDataLoading &&
                selectedDeductions &&
                selectedDeductions.map((condition, index) => (
                  <div
                    key={index}
                    className={`mb-10 border my-2 py- px- rounded ${
                      index % 2 === 0 ? `` : `bg-gray-100`
                    }`}
                  >
                    <div>
                      <h1 className="text-2xl py-2 text-center font-serif font-extrabold bg-white">
                        {condition.conditionName}
                      </h1>
                    </div>
                    <hr />
                    <div className="flex px-4 py-2 flex-col">
                      {condition.conditionLabels &&
                        condition.conditionLabels.map(
                          (conditionLabel, index) => (
                            <div
                              key={index}
                              className={`flex gap-6 items-center mt-2`}
                            >
                              <div>
                                <div>
                                  <h1 className="text-sm">
                                    {conditionLabel.conditionLabel}
                                  </h1>
                                </div>

                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border px-3 py-1 rounded text-[0.9rem]"
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
                                  <h1>%</h1>
                                </div>
                              </div>

                              <div>
                                <img
                                  src={
                                    import.meta.env.VITE_APP_BASE_URL +
                                    conditionLabel.conditionLabelImg
                                  }
                                  alt="conditionLabelImg"
                                  className="w-[60px] h-[60px] mx-auto "
                                />
                              </div>
                              <div className="flex gap-4">
                                <div className="w-[82px] text-center">
                                  <h1
                                    className={`${
                                      conditionLabel.operation === "Subtrack"
                                        ? "bg-red-200"
                                        : "bg-blue-200"
                                    } text-black font-bold px-2 py-1 rounded`}
                                  >
                                    {conditionLabel.operation}
                                  </h1>
                                </div>
                                <select
                                  name="operation"
                                  id=""
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
                            // ))
                          )
                        )}
                    </div>
                  </div>
                ))}
              <div className="py-3 px-2">
                <button
                  type="submit"
                  className="w-[20%] bg-green-600 text-white rounded-md p-1 cursor-pointer hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVariantQuestions;
