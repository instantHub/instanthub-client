import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useLazyGetProcessorDeductionsQuery,
} from "@api";
import { ROUTES } from "@routes";
import { Button, FlexBox, Typography } from "@components/general";
import { ArrowLeftIcon } from "@icons";
import {
  IProductConditionLabels,
  IProductConditions,
} from "@features/api/productsApi/types";
import { DisplayConfiguration } from "./DisplayConfiguration";
import { Loading } from "@components/user";
import { IProcessorDeductionResponse } from "@features/api/processorsApi/type";
import { UpdateSystemComponent } from "./UpdateSystemComponent";

interface ToggleState {
  updateAllSystemConfig: boolean;
  updateSingleSystemConfig: boolean;
  updateAllProcessorsProblems: boolean;
  updateSingleProcessorProblems: boolean;
  showSystemConfiguration: boolean;
}

type ToggleKey = keyof ToggleState;

export const ProductQuestionsList: React.FC = () => {
  console.log("PB - ProductQuestionsList");

  const { productSlug } = useParams<{ productSlug: string }>();

  const { data: productDetail, isLoading: productDetailLoading } =
    useGetProductDetailsQuery(productSlug || "");

  const [getProcessorDeductions, { data: processorDeductions }] =
    useLazyGetProcessorDeductionsQuery();
  //   console.log("processorDeductions", processorDeductions);

  const [selectedDeductions, setSelectedDeductions] = useState<
    IProductConditions[] | null
  >(null);

  const [processorsList, setProcessorsList] = useState<
    IProductConditionLabels[] | null
  >(null);

  const [selectedProcessorDeductions, setSelectedProcessorDeductions] =
    useState<IProcessorDeductionResponse | undefined>(processorDeductions);

  const [toggle, setToggle] = useState<ToggleState>({
    updateAllSystemConfig: false,
    updateSingleSystemConfig: false,
    updateAllProcessorsProblems: false,
    updateSingleProcessorProblems: false,
    showSystemConfiguration: true,
  });

  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(ROUTES.admin.productsList);
  };

  const handleProcessor = async (
    event: ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    console.log("handle processor");
    const processorId = event.target.value;
    await getProcessorDeductions(processorId);
  };

  const handleToggle = (key: ToggleKey) => {
    setToggle((prev) => {
      const resetState: ToggleState = {
        updateAllSystemConfig: false,
        updateSingleSystemConfig: false,
        updateAllProcessorsProblems: false,
        updateSingleProcessorProblems: false,
        showSystemConfiguration: false,
      };

      return {
        ...resetState,
        [key]: !prev[key],
      };
    });
  };

  useEffect(() => {
    if (productDetail) {
      setSelectedDeductions(productDetail.simpleDeductions);

      const processors = productDetail.simpleDeductions.find((d) =>
        d.conditionName?.toLowerCase().includes("processor")
      );
      setProcessorsList(processors?.conditionLabels || null);
    }
  }, [productDetail]);

  useEffect(() => {
    setSelectedProcessorDeductions(processorDeductions);
  }, [processorDeductions]);

  if (productDetailLoading) return <Loading />;

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size="sm"
        shape="square"
        leftIcon={<ArrowLeftIcon />}
        onClick={handleNavigate}
      >
        Back
      </Button>

      <FlexBox direction="col" className="px-4 max-sm:px-2 py-2" fullWidth>
        {/* Heading */}
        <Typography variant="h3" className="my-4">
          {productDetail?.name} - {productDetail?.category.name} Problems &
          Configuration
        </Typography>

        <div className="flex flex-col">
          {/* Buttons Wrapper */}
          <div className="grid grid-cols-5 max-sm:grid-cols-2 justify-center items-center">
            {/* Update Single Configuration */}
            <Button
              onClick={() => handleToggle("updateSingleSystemConfig")}
              isActive={toggle.updateSingleSystemConfig}
              shape="square"
              variant="outline"
            >
              Update Single Configurations
            </Button>

            {/* Update All Configuration */}
            <Button
              onClick={() => handleToggle("updateAllSystemConfig")}
              isActive={toggle.updateAllSystemConfig}
              shape="square"
              variant="outline"
            >
              Update All Configurations
            </Button>

            {/* Show Config Details */}
            <Button
              onClick={() => handleToggle("showSystemConfiguration")}
              isActive={toggle.showSystemConfiguration}
              shape="square"
              variant="outline"
            >
              Configurations
            </Button>

            {/* Update Single Processor Problems */}
            <Button
              onClick={() => handleToggle("updateSingleProcessorProblems")}
              isActive={toggle.updateSingleProcessorProblems}
              shape="square"
              variant="outline"
            >
              Update Single Processor Problems
            </Button>

            {/* Update All Processors Problems */}
            <Button
              onClick={() => handleToggle("updateAllProcessorsProblems")}
              isActive={toggle.updateAllProcessorsProblems}
              shape="square"
              variant="outline"
            >
              Update All Processors Problems
            </Button>
          </div>

          {/* Select Processor */}
          {processorsList &&
            (toggle.updateAllProcessorsProblems ||
              toggle.updateSingleProcessorProblems) && (
              <FlexBox gap={2}>
                <Typography variant="h5">Processors List:</Typography>
                <select
                  className="border border-black rounded"
                  onChange={handleProcessor}
                >
                  <option value="">Select Processor</option>
                  {processorsList.map((processor, i) => (
                    <option value={processor.conditionLabelId} key={i}>
                      {processor.conditionLabel}
                    </option>
                  ))}
                </select>
              </FlexBox>
            )}

          {/* Show Current Laptop Configuration */}
          {toggle.showSystemConfiguration && selectedDeductions && (
            <DisplayConfiguration deductions={selectedDeductions} />
          )}

          {toggle.updateAllSystemConfig && productDetail && (
            <UpdateSystemComponent
              type="AllLaptopConfig"
              productData={productDetail}
              productUniqueURL={productSlug}
            />
          )}

          {toggle.updateSingleSystemConfig && productDetail && (
            <UpdateSystemComponent
              type="SingleLaptopConfig"
              productData={productDetail}
              productUniqueURL={productSlug}
            />
          )}

          {toggle.updateAllProcessorsProblems &&
            productDetail &&
            selectedProcessorDeductions && (
              <UpdateSystemComponent
                type="AllLaptopProblems"
                productData={productDetail}
                selectedProcessorDeductions={selectedProcessorDeductions}
                setSelectedProcessorDeductions={setSelectedProcessorDeductions}
              />
            )}

          {toggle.updateSingleProcessorProblems &&
            productDetail &&
            selectedProcessorDeductions && (
              <UpdateSystemComponent
                type="SingleLaptopProblems"
                productData={productDetail}
                selectedProcessorDeductions={selectedProcessorDeductions}
                setSelectedProcessorDeductions={setSelectedProcessorDeductions}
              />
            )}
        </div>
      </FlexBox>
    </div>
  );
};
