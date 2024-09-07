import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateButton from "./UpdateButton";
import {
  useGetProductDetailsQuery,
  useUpdateLaptopConfigurationsPriceDropMutation,
} from "../../../../features/api";
import { toast } from "react-toastify";

const UpdateSystemConfigurations = (props) => {
  const { productDetail, productId, type } = props;
  console.log("UpdateSystemConfigurations", type);

  const [selectedDeductions, setSelectedDeductions] = useState(null);

  const [productData, setProductData] = useState(null);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  const laptopDesktop = ["laptop", "desktop"];

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

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updatePriceDrop({
        productId: productId,
        data: productData,
        type,
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
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
      if (laptopDesktop.includes(productDetail.category.name.toLowerCase())) {
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail]);

  console.log("selectedDeductions", selectedDeductions);

  return (
    <div className="mt-5">
      {/* <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded shadow-xl"> */}
      <div className="w-[95%] flex flex-col mx-auto my-1 bg-white px-4 py-2 rounded ">
        <div className="bg-scroll">
          {/* {productData && productData.category.name === "Laptop" && ( */}
          {productData &&
            laptopDesktop.includes(productData.category.name.toLowerCase()) && (
              <>
                <h3 className="text-2xl font-serif text-center font-bold">
                  {title} to update
                </h3>
                <form onSubmit={handleSubmit}>
                  {productData &&
                    selectedDeductions.map((condition, index) => (
                      <div
                        key={index}
                        className={`mb-10 border my-2 py- px- rounded ${
                          index % 2 === 0 ? `` : `bg-gray-100`
                        }`}
                      >
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-center py-2 bg-white">
                            {condition.conditionName}
                          </h3>
                        </div>
                        <hr />
                        <div className="flex flex-col px-4 py-2">
                          {productData.brand.name === "Apple" &&
                          condition.conditionName === "Processor"
                            ? condition.conditionLabels &&
                              condition.conditionLabels
                                .filter((label) =>
                                  label.conditionLabel
                                    .toLowerCase()
                                    .includes("apple")
                                )
                                .map((conditionLabel, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-center items-center  gap-6  mt-2 pb-1"
                                  >
                                    <div>
                                      <h3 className="text-xl">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <span className="text-lg">₹</span>
                                      <input
                                        type="number"
                                        name="priceDrop"
                                        value={conditionLabel.priceDrop}
                                        className="border-b px-3 py-1 rounded text-lg"
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

                                    <div className="w-[82px] text-center">
                                      <h3
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
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
                                ))
                            : condition.conditionLabels &&
                              condition.conditionLabels
                                .filter(
                                  (label) =>
                                    !label.conditionLabel
                                      .toLowerCase()
                                      .includes("apple")
                                )
                                .map((conditionLabel, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-center items-center  gap-6  mt-2 pb-1"
                                  >
                                    <div>
                                      <h3 className="text-xl">
                                        {conditionLabel.conditionLabel}
                                      </h3>
                                    </div>

                                    <div className="flex items-center gap-1">
                                      <span className="text-lg">₹</span>
                                      <input
                                        type="number"
                                        name="priceDrop"
                                        value={conditionLabel.priceDrop}
                                        className="border-b px-3 py-1 rounded text-lg"
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

                                    <div className="w-[82px] text-center">
                                      <h3
                                        className={`${
                                          conditionLabel.operation ===
                                          "Subtrack"
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
                                ))}
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
      </div>
    </div>
  );
};

export default UpdateSystemConfigurations;
// export default withSystemConfigurations(UpdateSystemConfigurations);
