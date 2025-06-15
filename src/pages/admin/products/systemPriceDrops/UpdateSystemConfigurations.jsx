import React, { useEffect, useState } from "react";
import { UpdateButton } from "./UpdateButton";
import { useUpdateLaptopConfigurationsPriceDropMutation } from "@api";
import { toast } from "react-toastify";

const UpdateSystemConfigurations = (props) => {
  const { productDetail, productUniqueURL, type } = props;
  console.log("UpdateSystemConfigurations", type);

  const [selectedDeductions, setSelectedDeductions] = useState(null);

  const [productData, setProductData] = useState(null);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  const [isOpen, setIsOpen] = useState(false);

  // const laptopDesktop = ["laptop", "desktop"];

  const title = getTitle();

  function getTitle() {
    let text;
    switch (type) {
      case "AllLaptopConfig":
        text = `All ${productDetail?.category?.name} Configurations`;
        break;
      case "SingleLaptopConfig":
        text = `Single ${productDetail?.category?.name} Configurations`;
        break;
      default:
        text = `Title Not Set`;
        break;
    }
    return text;
  }

  // Function to handle input change for updating priceDrops
  const handlePriceDropChange2 = (conditionLabelId, value, check) => {
    // Find the condition label by conditionLabelId and update the priceDrop
    console.log("Simple Deductions", check);
    let updatedProductData;
    if (check === "priceDrop") {
      // const updatedProductData = {
      updatedProductData = {
        ...productData,
        simpleDeductions: productData.simpleDeductions.map((condition) => ({
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

      updatedProductData = {
        ...productData,
        simpleDeductions: productData.simpleDeductions.map((condition) => ({
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
    setProductData(updatedProductData);
    setSelectedDeductions(updatedProductData.simpleDeductions);
  };

  const handleSubmit = async () => {
    try {
      await updatePriceDrop({
        productId: productDetail.id,
        data: productData,
        type,
        brand: productData.brand.name,
      }).unwrap();
      toast.success(
        `Updated PriceDrops for the ${productData.name} configurations`
      );
      setIsOpen(false);
      // Handle success
    } catch (error) {
      console.error("Error updating condition:", error.message);
    }
  };

  //  UseEffect to set the Deductions what is selected
  useEffect(() => {
    if (productDetail) {
      // Set the matched product to the component state
      setProductData(productDetail);
      // if (LAPTOP_DESKTOP.includes(productDetail.category.name.toLowerCase())) {
      if (productDetail.category.categoryType.processorBased) {
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail]);

  console.log("selectedDeductions", selectedDeductions);
  console.log(productData && productData);

  return (
    <>
      {/* <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl"> */}
      <div className="w-fit max-sm:w-full flex flex-col mx-auto my-1 bg-white rounded text-sm max-sm:text-xs">
        {/* {productData && productData.category.name === "Laptop" && ( */}
        {productData &&
          // LAPTOP_DESKTOP.includes(productData.category.name.toLowerCase()) && (
          productData.category.categoryType.processorBased && (
            <>
              <h3 className="text-2xl max-sm:text-lg font-serif text-center font-bold">
                {title} to update
              </h3>
              {/* <form onSubmit={handleSubmit}> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                {productData &&
                  selectedDeductions.map((condition, index) => (
                    <div key={condition.id} className={`border my-4 rounded `}>
                      <h3 className="text-2xl max-sm:text-lg font-serif font-bold text-center py-2 bg-white">
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
                                <h3 className="">
                                  {conditionLabel.conditionLabel}
                                </h3>

                                <div className="flex items-center gap-1">
                                  <span className="">₹</span>
                                  <input
                                    type="number"
                                    name="priceDrop"
                                    value={conditionLabel.priceDrop}
                                    className="border-b px-3 py-1 rounded"
                                    placeholder="Price Drop"
                                    onChange={(e) =>
                                      handlePriceDropChange2(
                                        conditionLabel.conditionLabelId,
                                        parseInt(e.target.value),
                                        e.target.name
                                      )
                                    }
                                    required
                                  />
                                </div>

                                <div className="flex max-sm:flex-col gap-4 max-sm:gap-1">
                                  <h3
                                    className={`${
                                      conditionLabel.operation === "Subtrack"
                                        ? "bg-red-200 px-2"
                                        : "bg-blue-200 px-4"
                                    } text-black font-bold py-1 rounded`}
                                  >
                                    {conditionLabel.operation}
                                  </h3>
                                  <select
                                    name="operation"
                                    className="border rounded px-1"
                                    onChange={(e) => {
                                      if (e.target.value !== "") {
                                        handlePriceDropChange2(
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
                  ))}
                <UpdateButton
                  text={`Update ${title}`}
                  updateLoading={updateLoading}
                />
              </form>
            </>
          )}
      </div>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-white p-5 rounded-lg shadow-lg w-1/4`}>
              <div className="flex justify-center">
                <h2 className="text-lg text-center">
                  Sure want you to <br />
                  <span className="text-xl font-semibold">Update {title}?</span>
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

export default UpdateSystemConfigurations;
