import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetSingleVariantQuestionsQuery,
  useUpdateVariantQuestionsMutation,
} from "@api";
import { toast } from "react-toastify";
import { ROUTES } from "@routes";
import { IProductConditions } from "@features/api/productsApi/types";
import { IVQResponse } from "@features/api/variantQuestionsApi/types";

type OperationType = "priceDrop" | "operation";

export const UpdateVariantQuestions = () => {
  const { variantQuestionsId } = useParams<{ variantQuestionsId: string }>();

  const [selectedVariantQuestions, setSelectedVariantQuestions] =
    useState<IVQResponse | null>(null);
  const [selectedDeductions, setSelectedDeductions] = useState<
    IProductConditions[] | null
  >(null);

  const {
    data: variantsQuestionsData,
    isLoading: variantsQuestionsDataLoading,
  } = useGetSingleVariantQuestionsQuery(variantQuestionsId!);

  const [updateVariantQuestions, { isLoading: updateLoading }] =
    useUpdateVariantQuestionsMutation();

  // Sync state with API data
  useEffect(() => {
    if (variantsQuestionsData) {
      setSelectedVariantQuestions(variantsQuestionsData);
      setSelectedDeductions(variantsQuestionsData.deductions);
    }
  }, [variantsQuestionsData]);

  // Handle updating priceDrop or operation
  const handlePriceDropChange = (
    conditionLabelId: string,
    value: number | string,
    field: OperationType
  ) => {
    if (!selectedVariantQuestions) return;

    const updatedVariantsData: IVQResponse = {
      ...selectedVariantQuestions,
      deductions: selectedVariantQuestions.deductions.map((condition) => ({
        ...condition,
        conditionLabels: condition.conditionLabels.map((label) => {
          if (label.conditionLabelId !== conditionLabelId) return label;

          return field === "priceDrop"
            ? { ...label, priceDrop: value as number }
            : { ...label, operation: value as "Add" | "Subtrack" };
        }),
      })),
    };

    setSelectedVariantQuestions(updatedVariantsData);
    setSelectedDeductions(updatedVariantsData.deductions);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!variantQuestionsId || !selectedVariantQuestions) return;

    try {
      await updateVariantQuestions({
        variantQuestionsId,
        data: { deductions: selectedVariantQuestions.deductions },
      }).unwrap();

      toast.success("Updated PriceDrops for the Variant");
    } catch (error) {
      console.error("Error updating Variant Conditions:", error);
      toast.error("Failed to update Variant Conditions");
    }
  };

  return (
    <div className="w-fit mx-auto text-sm max-sm:text-xs">
      {/* Back Button */}
      <div className="w-fit m-2 max-sm:m-1 px-4 max-sm:px-2 py-1 bg-black text-white rounded">
        <Link to={ROUTES.admin.variantsQuestions}>
          <button type="button">Back</button>
        </Link>
      </div>

      {/* Main Card */}
      <div className="relative flex flex-col mx-auto my-1 bg-white px-4 max-sm:px-1 py-2">
        <div className="relative m-2">
          <h1 className="text-xl max-sm:text-lg text-center  font-bold text-green-700 mb-2">
            {selectedVariantQuestions
              ? `${selectedVariantQuestions.name} Variant`
              : "Loading.."}
          </h1>
          <hr />
        </div>

        <form onSubmit={handleSubmit}>
          {!variantsQuestionsDataLoading &&
            selectedDeductions?.map((condition, conditionIdx) => (
              <div key={conditionIdx} className="border my-2 rounded">
                <h2 className="text-2xl max-sm:text-lg py-2 text-center  font-extrabold bg-white">
                  {condition.conditionName}
                </h2>
                <hr />

                <div className="flex flex-col">
                  {condition.conditionLabels.map((conditionLabel, labelIdx) => (
                    <div
                      key={conditionLabel.conditionLabelId ?? labelIdx}
                      className={`flex gap-6 justify-center max-sm:gap-1 p-2 items-center ${
                        labelIdx % 2 === 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      {/* Label + Price Input */}
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
                                parseInt(e.target.value, 10),
                                "priceDrop"
                              )
                            }
                            required
                          />
                          <span>%</span>
                        </div>
                      </div>

                      {/* Label Image */}
                      {conditionLabel.conditionLabelImg && (
                        <div>
                          <img
                            src={`${import.meta.env.VITE_APP_BASE_URL}${
                              conditionLabel.conditionLabelImg
                            }`}
                            alt={conditionLabel.conditionLabel}
                            className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
                          />
                        </div>
                      )}

                      {/* Operation */}
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
                          onChange={(e) =>
                            e.target.value &&
                            handlePriceDropChange(
                              conditionLabel.conditionLabelId,
                              e.target.value,
                              "operation"
                            )
                          }
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

          {/* Submit Button */}
          <div className="flex justify-center my-5">
            <button
              type="submit"
              className="w-fit bg-green-600 text-white rounded-md p-2 cursor-pointer hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={updateLoading}
            >
              {updateLoading ? "Loading..." : "Update PriceDrops"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
