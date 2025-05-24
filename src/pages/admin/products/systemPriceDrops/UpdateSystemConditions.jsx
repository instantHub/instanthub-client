import React, { useState } from "react";
import { useUpdateLaptopConfigurationsPriceDropMutation } from "@api/productsApi";
import UpdateButton from "./UpdateButton";
import { toast } from "react-toastify";

const UpdateSystemConditions = (props) => {
  const {
    productData,
    selectedProcessorDeductions,
    setSelectedProcessorDeductions,
    setProductData,
    type,
  } = props;

  console.log("UpdateSystemConditions", type);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  const [isOpen, setIsOpen] = useState(false);

  const title = getTitle();

  function getTitle() {
    let text;
    switch (type) {
      case "AllLaptopConditions":
        text = `All ${productData?.category?.name} Processors Problems`;
        break;
      case "SingleLaptopConditions":
        text = `Single ${productData?.category?.name} Processor Problems`;
        break;
      default:
        text = `Title Not Set`;
        break;
    }
    return text;
  }

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
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  const handleSubmit = async () => {
    try {
      await updatePriceDrop({
        productId: productData.id,
        data: selectedProcessorDeductions,
        // data: updatingSingleLaptop
        //   ? updatedProduct
        //   : selectedProcessorDeductions,
        type,
        brand: productData.brand.name,
      }).unwrap();
      toast.success(
        `Updated PriceDrops for the ${
          productData.name
        }, ${selectedProcessorDeductions.processorName.toUpperCase()} Processor`
      );
      setIsOpen(false);
      // Handle success
    } catch (error) {
      console.error("Error updating conditions:", error);
    }
  };

  console.log("productData", productData && productData);

  return (
    <>
      <div className="w-fit mx-auto">
        {/* Selected Processor Based Deductions */}
        {selectedProcessorDeductions && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            <div>
              <p className="flex justify-center text-3xl max-sm:text-lg font-serif font-bold">
                {selectedProcessorDeductions?.processorName}
              </p>
              <p className="text-center flex max-sm:flex-col justify-center gap-1 text-lg max-sm:text-xs font-serif">
                <span>
                  Update <span className="font-bold"> {title} </span>
                </span>
                <span>Based On The Selected Processor</span>
              </p>
              {selectedProcessorDeductions?.deductions?.map(
                (condition, index) => (
                  <div
                    key={condition.id}
                    className={`border my-4 rounded text-sm max-sm:text-xs`}
                  >
                    <h3 className="text-2xl max-sm:text-lg py-2 font-serif text-center font-extrabold bg-white">
                      {condition.conditionName}
                    </h3>
                    <hr />
                    <div className="flex flex-col">
                      {condition.conditionLabels &&
                        condition.conditionLabels.map(
                          (conditionLabel, index) => (
                            <div
                              key={conditionLabel.id}
                              className={`flex justify-center items-center gap-6 max-sm:gap-1 p-2
                                ${index % 2 === 0 ? `` : `bg-gray-100`}`}
                            >
                              <div>
                                <h3>{conditionLabel.conditionLabel}</h3>

                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border px-3 py-1 rounded"
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
                                  {productData.category.name !== "Mobile" ||
                                  productData.category.name !== "Desktop" ? (
                                    <span className="text-lg">%</span>
                                  ) : null}
                                </div>
                              </div>

                              <div>
                                {conditionLabel.conditionLabelImg && (
                                  <img
                                    src={
                                      import.meta.env.VITE_APP_BASE_URL +
                                      conditionLabel.conditionLabelImg
                                    }
                                    alt="conditionLabelImg"
                                    className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
                                  />
                                )}
                              </div>
                              <div className="flex max-sm:flex-col gap-4 max-sm:gap-1">
                                <h3
                                  className={`${
                                    conditionLabel.operation === "Subtrack"
                                      ? "bg-red-200"
                                      : "bg-blue-200"
                                  } text-black font-bold px-2 py-1 rounded text-center`}
                                >
                                  {conditionLabel.operation}
                                </h3>
                                <select
                                  name="operation"
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
                          )
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
            <UpdateButton
              text={`Update ${title}`}
              updateLoading={updateLoading}
            />
          </form>
        )}
      </div>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`bg-white p-5 rounded-lg shadow-lg w-1/4 max-sm:w-fit`}
            >
              <div className="flex justify-center">
                <h2 className="text-lg max-sm:text-sm text-center">
                  Sure want you to <br />
                  <span className="text-xl max-sm:text-lg font-semibold">
                    Update {title}?
                  </span>
                </h2>
              </div>

              <div className="flex justify-around mt-8">
                <button
                  onClick={() => handleSubmit()}
                  className={`bg-red-600 text-white px-4 py-1 rounded disabled:bg-gray-300 disabled:cursor-none`}
                  disabled={updateLoading}
                >
                  Yes
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className={`bg-green-700 text-white px-4 py-1 rounded`}
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

export default UpdateSystemConditions;
