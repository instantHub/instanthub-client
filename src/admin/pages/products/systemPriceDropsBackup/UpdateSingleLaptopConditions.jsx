import React from "react";
import { useUpdateLaptopConfigurationsPriceDropMutation } from "../../../../features/api";
import UpdateButton from "./UpdateButton";

const UpdateSingleLaptopConditions = (props) => {
  const {
    productData,
    selectedProcessorDeductions,
    setSelectedProcessorDeductions,
    setProductData,
  } = props;

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  console.log("selectedProcessorDeductions", selectedProcessorDeductions);

  function handleLaptopPriceDropChange(conditionLabelId, value, check) {
    // Find the condition label by conditionLabelId and update the priceDrop
    // console.log("Simple Deductions", check);

    let updatedData;
    if (check === "priceDrop") {
      updatedData = {
        ...selectedProcessorDeductions,
        deductions: selectedProcessorDeductions.deductions.map((condition) => ({
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

      // console.log("updatedProductData", updatedProductData);
    } else if (check === "operation") {
      console.log("OPERATION", value);

      updatedData = {
        ...selectedProcessorDeductions,
        deductions: selectedProcessorDeductions.deductions.map((condition) => ({
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
    // setProductData(updatedProductData);
    setSelectedProcessorDeductions(updatedData);
  }

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // let updatedProduct = {...productData};
    let updatedProduct = {
      ...productData,
      processorBasedDeduction: productData.processorBasedDeduction.map(
        (pbd) => ({
          ...pbd,
          deductions:
            pbd.processorId === selectedProcessorDeductions.processorId
              ? selectedProcessorDeductions.deductions
              : pbd.deductions,
        })
      ),
    };

    console.log("updated product", updatedProduct);

    try {
      await updatePriceDrop({
        productId: updatedProduct.id,
        data: updatedProduct,
        type: "SingleLaptopConditions",
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  return (
    <div>
      {/* Selected Processor Based Deductions */}
      {selectedProcessorDeductions && (
        <form onSubmit={() => handleSubmit(event)}>
          <div>
            <span className="flex justify-center text-3xl font-serif font-bold">
              {selectedProcessorDeductions.processorName}
            </span>
            <span className="flex justify-center text-lg font-serif">
              Update single {productData.category.name} conditions
            </span>
            {selectedProcessorDeductions.deductions.map((condition, index) => (
              <div
                key={index}
                className={`mb-10 border my-2 py- px- rounded ${
                  index % 2 === 0 ? `` : `bg-gray-100`
                }`}
              >
                <div>
                  <h3 className="text-2xl py-2 font-serif text-center font-extrabold bg-white">
                    {condition.conditionName}
                  </h3>
                </div>
                <hr />
                <div className="flex px-4 py-2 flex-col">
                  {condition.conditionLabels &&
                    condition.conditionLabels.map((conditionLabel, index) => (
                      <div
                        key={index}
                        className={`flex gap-6 items-center mt-2`}
                      >
                        <div>
                          <div>
                            <h3 className="text-sm">
                              {conditionLabel.conditionLabel}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1">
                            {productData.category.name !== "Mobile" ? (
                              <span className="text-lg">₹</span>
                            ) : null}
                            <input
                              type="number"
                              name="priceDrop"
                              value={conditionLabel.priceDrop}
                              className="border px-3 py-1 rounded text-[0.9rem]"
                              placeholder="Price Drop"
                              onChange={(e) =>
                                handleLaptopPriceDropChange(
                                  conditionLabel.conditionLabelId,
                                  parseInt(e.target.value),
                                  e.target.name
                                )
                              }
                              required
                            />
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
                            <h3
                              className={`${
                                conditionLabel.operation === "Subtrack"
                                  ? "bg-red-200"
                                  : "bg-blue-200"
                              } text-black font-bold px-2 py-1 rounded`}
                            >
                              {conditionLabel.operation}
                            </h3>
                          </div>
                          <select
                            name="operation"
                            id=""
                            className="border rounded px-1"
                            onChange={(e) => {
                              if (e.target.value !== "") {
                                handleLaptopPriceDropChange(
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
          </div>
          {/* Update Button */}
          <UpdateButton
            text={`Update Single ${productData.category.name} Conditions`}
            updateLoading={updateLoading}
          />
        </form>
      )}
    </div>
  );
};

export default UpdateSingleLaptopConditions;
