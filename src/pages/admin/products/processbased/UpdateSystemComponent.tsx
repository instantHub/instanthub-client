import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  useUpdateAllLaptopConfigurationsMutation,
  useUpdateAllLaptopProcessorProblemsMutation,
  useUpdateLaptopConfigurationsPriceDropMutation,
  useUpdateSingleLaptopConfigurationMutation,
  useUpdateSingleLaptopProcessorProblemsMutation,
} from "@api";
import { toast } from "react-toastify";
import {
  IConditionLabels,
  IConditions,
  IProductResponse,
} from "@features/api/productsApi/types";
import { IProcessorDeductionResponse } from "@features/api/processorsApi/type";
import { Button, FlexBox, Modal, Typography } from "@components/general";

type UpdateData = IProductResponse | IProcessorDeductionResponse;

type TComponentType =
  | "AllLaptopConfig"
  | "SingleLaptopConfig"
  | "AllLaptopProblems"
  | "SingleLaptopProblems";

type TOperation = "Subtrack" | "Add";

interface IBaseProps {
  type: TComponentType;
  productData: IProductResponse;
}

interface IConfigurationProps extends IBaseProps {
  type: "AllLaptopConfig" | "SingleLaptopConfig";
  productUniqueURL?: string;
}

interface IConditionsProps extends IBaseProps {
  type: "AllLaptopProblems" | "SingleLaptopProblems";
  selectedProcessorDeductions: IProcessorDeductionResponse;
  setSelectedProcessorDeductions: (data: IProcessorDeductionResponse) => void;
  setProductData?: (data: IProductResponse) => void;
}

type UpdateSystemComponentProps = IConfigurationProps | IConditionsProps;

export const UpdateSystemComponent: FC<UpdateSystemComponentProps> = (
  props
) => {
  const { type, productData } = props;
  // console.log("UpdateSystemComponent - productData", productData);

  // Local state
  const [localProductData, setLocalProductData] =
    useState<IProductResponse | null>(null);
  const [selectedDeductions, setSelectedDeductions] = useState<
    IConditions[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdateLaptopConfigurationsPriceDropMutation();

  const [updateAllConfig] = useUpdateAllLaptopConfigurationsMutation();

  const [updateSingleConfig] = useUpdateSingleLaptopConfigurationMutation();

  const [updateSingleProblem] =
    useUpdateSingleLaptopProcessorProblemsMutation();

  const [updateAllProblems] = useUpdateAllLaptopProcessorProblemsMutation();

  // Type guards to determine which props we're dealing with
  const isConditionsComponent = (
    props: UpdateSystemComponentProps
  ): props is IConditionsProps => {
    return type.includes("Problems");
  };

  const isConfigurationComponent = (
    props: UpdateSystemComponentProps
  ): props is IConfigurationProps => {
    return type.includes("Config");
  };

  const getTitle = (): string => {
    switch (type) {
      case "AllLaptopConfig":
        return `All ${productData?.category?.name} Configurations`;
      case "SingleLaptopConfig":
        return `Single ${productData?.category?.name} Configurations`;
      case "AllLaptopProblems":
        return `All ${productData?.category?.name} Processors Problems`;
      case "SingleLaptopProblems":
        return `Single ${productData?.category?.name} Processor Problems`;
      default:
        return "Title Not Set";
    }
  };

  const title = getTitle();

  // Get the appropriate data source based on component type
  const getDataSource = (): IConditions[] | null => {
    if (isConditionsComponent(props)) {
      return props.selectedProcessorDeductions?.deductions || null;
    } else {
      return selectedDeductions;
    }
  };

  // Get the appropriate data to send to API
  const getUpdateData = (): UpdateData | null => {
    if (isConditionsComponent(props)) {
      return props.selectedProcessorDeductions;
    } else {
      return localProductData;
    }
  };

  const handlePriceDropChange = (
    conditionLabelId: string | number,
    value: number,
    field: "priceDrop" | "operation"
  ): void => {
    if (isConditionsComponent(props)) {
      // Handle processor conditions updates
      let updatedData: IProcessorDeductionResponse;
      const { selectedProcessorDeductions, setSelectedProcessorDeductions } =
        props;

      if (field === "priceDrop") {
        updatedData = {
          ...selectedProcessorDeductions,
          deductions: selectedProcessorDeductions.deductions.map(
            (condition) => ({
              ...condition,
              conditionLabels: condition.conditionLabels.map((label) => ({
                ...label,
                priceDrop:
                  label.conditionLabelId === conditionLabelId
                    ? value
                    : label.priceDrop,
              })),
            })
          ),
        };
      } else {
        const operationValue = value as unknown as TOperation;
        updatedData = {
          ...selectedProcessorDeductions,
          deductions: selectedProcessorDeductions.deductions.map(
            (condition) => ({
              ...condition,
              conditionLabels: condition.conditionLabels.map((label) => ({
                ...label,
                operation:
                  label.conditionLabelId === conditionLabelId
                    ? operationValue
                    : label.operation,
              })),
            })
          ),
        };
      }

      setSelectedProcessorDeductions(updatedData);
    } else {
      // Handle configuration updates
      if (!localProductData) return;

      let updatedProductData: IProductResponse;

      if (field === "priceDrop") {
        updatedProductData = {
          ...localProductData,
          simpleDeductions: localProductData.simpleDeductions.map(
            (condition) => ({
              ...condition,
              conditionLabels: condition.conditionLabels.map((label) => ({
                ...label,
                priceDrop:
                  label.conditionLabelId === conditionLabelId
                    ? value
                    : label.priceDrop,
              })),
            })
          ),
        };
      } else {
        const operationValue = value as unknown as TOperation;
        updatedProductData = {
          ...localProductData,
          simpleDeductions: localProductData.simpleDeductions.map(
            (condition) => ({
              ...condition,
              conditionLabels: condition.conditionLabels.map((label) => ({
                ...label,
                operation:
                  label.conditionLabelId === conditionLabelId
                    ? operationValue
                    : label.operation,
              })),
            })
          ),
        };
      }

      setLocalProductData(updatedProductData);
      setSelectedDeductions(updatedProductData.simpleDeductions);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const updateData = getUpdateData();
    if (!updateData) return;

    console.log("updateData", updateData);

    try {
      // await updatePriceDrop({
      //   productId: productData.id,
      //   data: updateData,
      //   type,
      //   // @ts-ignore
      //   brand: productData.brand.name,
      // }).unwrap();
      if (isConfigurationComponent(props) && type === "AllLaptopConfig") {
        console.log("all config");
        await updateAllConfig({
          productId: productData.id,
          updatedProduct: updateData,
          // @ts-ignore
          brand: productData.brand.name,
        }).unwrap();
      }

      if (isConfigurationComponent(props) && type === "SingleLaptopConfig") {
        console.log("single config");
        await updateSingleConfig({
          productId: productData.id,
          updatedProduct: updateData,
        }).unwrap();
      }

      if (isConditionsComponent(props) && type === "SingleLaptopProblems") {
        console.log("single problem");
        await updateSingleProblem({
          updatedData: updateData,
        }).unwrap();
      }

      if (isConditionsComponent(props) && type === "AllLaptopProblems") {
        console.log("all problems");
        await updateAllProblems({
          updatedData: updateData,
        }).unwrap();
      }

      const successMessage = isConditionsComponent(props)
        ? `Updated PriceDrops for the ${productData.name}, ${(
            updateData as IProcessorDeductionResponse
          ).processorName.toUpperCase()} Processor`
        : `Updated PriceDrops for the ${productData.name} configurations`;

      toast.success(successMessage);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Failed to update");
      // toast.error(error?.data?.message);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    conditionLabelId: string
  ): void => {
    const value = parseInt(e.target.value) || 0;
    const field = e.target.name as "priceDrop";
    handlePriceDropChange(conditionLabelId, value, field);
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    conditionLabelId: string
  ): void => {
    if (e.target.value !== "") {
      const value = e.target.value as TOperation;
      handlePriceDropChange(
        conditionLabelId,
        value as unknown as number,
        "operation"
      );
    }
  };

  // Initialize data based on component type
  useEffect(() => {
    if (isConfigurationComponent(props) && productData) {
      setLocalProductData(productData);
      if (productData.category.categoryType.processorBased) {
        setSelectedDeductions(productData.simpleDeductions);
      }
    }
  }, [productData, type]);

  // Get the current data source
  const dataSource = getDataSource();

  // Early returns for invalid states
  if (isConfigurationComponent(props)) {
    if (
      !localProductData ||
      !localProductData.category.categoryType.processorBased ||
      !selectedDeductions
    ) {
      return null;
    }
  } else if (isConditionsComponent(props)) {
    if (!props.selectedProcessorDeductions) {
      return null;
    }
  }

  if (!dataSource) {
    return null;
  }

  // Render processor name for conditions component
  const renderProcessorHeader = () => {
    if (isConditionsComponent(props)) {
      return (
        <Typography variant="h3" align="center">
          {props.selectedProcessorDeductions.processorName}
        </Typography>
      );
    }
    return null;
  };

  // Render price input with appropriate currency/symbol
  const renderPriceInput = (conditionLabel: IConditionLabels) => {
    const showPercentage =
      isConditionsComponent(props) &&
      productData.category.name !== "Mobile" &&
      productData.category.name !== "Desktop";

    const showCurrency = isConfigurationComponent(props);

    return (
      <div className="flex items-center gap-1">
        {showCurrency && <span className="">₹</span>}
        <input
          type="number"
          name="priceDrop"
          value={conditionLabel.priceDrop}
          className={`border px-3 py-1 rounded ${
            showCurrency ? "border-b" : ""
          }`}
          placeholder="Price Drop"
          onChange={(e) =>
            handleInputChange(e, conditionLabel.conditionLabelId)
          }
          required
        />
        {showPercentage && <span className="text-lg">%</span>}
      </div>
    );
  };

  // Render condition label image for conditions component
  const renderConditionImage = (conditionLabel: IConditionLabels) => {
    if (isConditionsComponent(props) && conditionLabel.conditionLabelImg) {
      return (
        <div>
          <img
            src={`${import.meta.env.VITE_APP_BASE_URL}${
              conditionLabel.conditionLabelImg
            }`}
            alt="Conditions label"
            className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-fit max-sm:w-full flex flex-col mx-auto my-1 bg-white rounded text-sm max-sm:text-xs">
        {renderProcessorHeader()}

        {isConditionsComponent(props) && (
          <p className="text-center flex max-sm:flex-col justify-center gap-1 text-lg max-sm:text-xs font-serif">
            <span>
              Update <span className="font-bold">{title}</span>
            </span>
            <span>Based On The Selected Processor</span>
          </p>
        )}

        {isConfigurationComponent(props) && (
          <h3 className="text-2xl max-sm:text-lg font-serif text-center font-bold">
            {title} to update
          </h3>
        )}

        <form onSubmit={handleFormSubmit}>
          {dataSource.map((condition, conditionIndex) => (
            <div key={condition.id} className="border my-4 rounded">
              <h3
                className={`text-2xl max-sm:text-lg font-serif text-center py-2 bg-white ${
                  isConditionsComponent(props) ? "font-extrabold" : "font-bold"
                }`}
              >
                {condition.conditionName}
              </h3>
              <hr />

              <div className="flex flex-col">
                {condition.conditionLabels.map((conditionLabel, labelIndex) => (
                  <div
                    key={conditionLabel.id}
                    className={`flex justify-center items-center gap-6 max-sm:gap-1 p-2 ${
                      labelIndex % 2 === 0 ? "" : "bg-gray-100"
                    }`}
                  >
                    <div>
                      <h3>{conditionLabel.conditionLabel}</h3>
                      {renderPriceInput(conditionLabel)}
                    </div>

                    {renderConditionImage(conditionLabel)}

                    <div className="flex max-sm:flex-col gap-4 max-sm:gap-1">
                      <h3
                        className={`${
                          conditionLabel.operation === "Subtrack"
                            ? "bg-red-200" +
                              (isConfigurationComponent(props) ? " px-2" : "")
                            : "bg-blue-200" +
                              (isConfigurationComponent(props) ? " px-4" : "")
                        } text-black font-bold px-2 py-1 rounded ${
                          isConditionsComponent(props) ? "text-center" : ""
                        }`}
                      >
                        {conditionLabel.operation}
                      </h3>
                      <select
                        name="operation"
                        className="border rounded px-1"
                        onChange={(e) =>
                          handleSelectChange(e, conditionLabel.conditionLabelId)
                        }
                        defaultValue=""
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

          <Button shape="square" loading={updateLoading}>
            Update {title}
          </Button>
        </form>
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="space-y-8"
        >
          <Typography
            variant="h4"
            className="text-lg max-sm:text-sm text-center"
          >
            Sure want you to <br />
            <strong>Update {title}?</strong>
          </Typography>

          <FlexBox gap={2}>
            <Button
              variant="danger"
              shape="square"
              onClick={handleSubmit}
              disabled={updateLoading}
            >
              Yes
            </Button>
            <Button
              variant="greenary"
              shape="square"
              onClick={() => setIsOpen(false)}
              disabled={updateLoading}
            >
              No
            </Button>
          </FlexBox>
        </Modal>
      )}
    </>
  );
};
