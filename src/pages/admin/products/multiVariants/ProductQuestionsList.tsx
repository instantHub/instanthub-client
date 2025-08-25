import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetProductDetailsQuery,
  useUpdatePriceDropMutation,
  useLazyGetVariantsQuestionsQuery,
} from "@api";

import { ROUTES } from "@routes";
import { Button, FlexBox, Modal, Typography } from "@components/general";
import { ArrowLeftIcon } from "@icons";
import {
  IConditions,
  IProductResponse,
  TOperation,
} from "@features/api/productsApi/types";
import { IVQResponse } from "@features/api/variantQuestionsApi/types";
import { MOBILE } from "@utils/user/constants";

export type PriceDropChangeType = "priceDrop" | "operation";

export const ProductQuestionsList: React.FC = () => {
  console.log("MV - ProductQuestionsList");

  const { productSlug } = useParams<{ productSlug: string }>();
  const [searchParams] = useSearchParams();
  const selectedVariant = searchParams.get("variant");

  const [selectedDeductions, setSelectedDeductions] = useState<
    IConditions[] | null
  >(null);
  const [selectedVariantToFill, setSelectedVariantToFill] =
    useState<IVQResponse | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState<IProductResponse | null>(null);

  const { data: productDetail } = useGetProductDetailsQuery(productSlug || "");
  const [updatePriceDrop, { isLoading: updateLoading }] =
    useUpdatePriceDropMutation();

  const [
    getVariantsQuestions,
    { data: variantsQuestionsData, isLoading: variantsQuestionsDataLoading },
  ] = useLazyGetVariantsQuestionsQuery();

  const navigate = useNavigate();

  const productCategory = productDetail?.category?.name ?? null;
  const productCategoryType = productDetail?.category?.categoryType ?? {
    processorBased: false,
    multiVariants: false,
    simple: false,
  };

  // 🔹 Common handler for updating priceDrop/operation
  const updateConditionLabels = (
    deductions: IConditions[],
    conditionLabelId: string,
    value: number | string,
    check: PriceDropChangeType
  ): IConditions[] =>
    deductions.map((condition) => ({
      ...condition,
      conditionLabels: condition.conditionLabels.map((label) => {
        if (label.conditionLabelId !== conditionLabelId) return label;
        return {
          ...label,
          ...(check === "priceDrop"
            ? { priceDrop: Number(value) }
            : { operation: value as TOperation }),
        };
      }),
    }));

  const handlePriceDropChange = (
    conditionLabelId: string,
    value: number | string,
    check: PriceDropChangeType
  ): void => {
    if (!productData) return;

    setProductData((prev) => {
      if (!prev) return prev;

      let updatedData: IProductResponse;

      if (productCategoryType.multiVariants && selectedVariant) {
        updatedData = {
          ...prev,
          variantDeductions: prev.variantDeductions.map((variant) =>
            variant.variantName === selectedVariant
              ? {
                  ...variant,
                  deductions: updateConditionLabels(
                    variant.deductions,
                    conditionLabelId,
                    value,
                    check
                  ),
                }
              : variant
          ),
        };
        const selectedVariantData = updatedData.variantDeductions.find(
          (v) => v.variantName === selectedVariant
        );
        setSelectedDeductions(selectedVariantData?.deductions || null);
      } else if (productCategoryType.simple) {
        updatedData = {
          ...prev,
          simpleDeductions: updateConditionLabels(
            prev.simpleDeductions,
            conditionLabelId,
            value,
            check
          ),
        };
        setSelectedDeductions(updatedData.simpleDeductions);
      } else {
        return prev;
      }

      return updatedData;
    });
  };

  const fillVariantPriceDrops = (): void => {
    if (!productData || !selectedVariant || !selectedVariantToFill) return;

    setProductData((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        variantDeductions: prev.variantDeductions.map((variant) =>
          variant.variantName === selectedVariant
            ? { ...variant, deductions: selectedVariantToFill.deductions }
            : variant
        ),
      };

      const updatedVariant = updated.variantDeductions.find(
        (v) => v.variantName === selectedVariant
      );
      setSelectedDeductions(updatedVariant?.deductions || null);
      return updated;
    });

    setIsOpen(false);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!productData) return;

    try {
      await updatePriceDrop({
        productId: productData.id,
        data: productData,
      }).unwrap();
      toast.success("Updated PriceDrops for the Product");
    } catch (error) {
      console.error("Error updating condition:", error);
    }
  };

  // 🔹 Populate data when productDetail changes
  useEffect(() => {
    if (productDetail) {
      setProductData(productDetail);

      if (productCategoryType.multiVariants && selectedVariant) {
        const variantDeduction = productDetail.variantDeductions.find(
          (d) => d.variantName === selectedVariant
        );
        getVariantsQuestions(productDetail.category.id);
        setSelectedDeductions(variantDeduction?.deductions || null);
      } else if (productCategoryType.simple) {
        setSelectedDeductions(productDetail.simpleDeductions);
      }
    }
  }, [productDetail, selectedVariant]);

  return (
    <div className="relative">
      {/* Back Button */}
      <Button
        variant="secondary"
        size="sm"
        shape="square"
        leftIcon={<ArrowLeftIcon />}
        onClick={() => navigate(ROUTES.admin.productsList)}
      >
        Back
      </Button>

      <div className="w-full flex flex-col mx-auto my-1 bg-white px-4 max-sm:px-2 py-2">
        {/* Heading */}
        <div className="flex justify-center m-2">
          <h3 className="absolute top-4 text-xl max-sm:text-lg font-serif font-bold">
            {productData?.name ?? "Loading.."}
          </h3>

          {/* Variants Questions */}
          {productData && productCategoryType.multiVariants && (
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 max-sm:gap-2 text-sm max-sm:text-[10px]">
              {!variantsQuestionsDataLoading &&
                variantsQuestionsData?.map((vq) => (
                  <button
                    key={vq._id}
                    onClick={() => {
                      setSelectedVariantToFill(vq);
                      setIsOpen(true);
                    }}
                    className={`w-full px-2 py-1 rounded text-white ${
                      vq.name === selectedVariantToFill?.name
                        ? "bg-red-600 text-xl"
                        : "bg-green-600"
                    }`}
                  >
                    {vq.name}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Conditions Form */}
        <form onSubmit={handleSubmit}>
          {selectedDeductions?.map((condition) => (
            <div key={condition.id} className="border my-4 max-sm:my-2 rounded">
              <Typography variant="h4" className="text-center font-bold">
                {condition.conditionName}
              </Typography>
              <hr />
              <div className="flex flex-col py-2">
                {condition.conditionLabels.map((label, idx) => (
                  <div
                    key={label.id}
                    className={`flex gap-6 max-sm:gap-1 max-sm:justify-center items-center mt-2 px-4 max-sm:px-2 py-2 ${
                      idx % 2 !== 0 ? "bg-gray-100" : ""
                    }`}
                  >
                    {/* Label + PriceDrop */}
                    <div>
                      <Typography variant="h5">
                        {label.conditionLabel}
                      </Typography>
                      <FlexBox gap={1}>
                        {productCategory !== MOBILE && <b>₹</b>}
                        <input
                          type="number"
                          name="priceDrop"
                          value={label.priceDrop}
                          className="border px-3 py-1 rounded"
                          placeholder="Price Drop"
                          onChange={(e) =>
                            handlePriceDropChange(
                              label.conditionLabelId,
                              parseInt(e.target.value) || 0,
                              e.target.name as PriceDropChangeType
                            )
                          }
                          required
                        />
                        {productCategory === MOBILE && <b>%</b>}
                      </FlexBox>
                    </div>

                    {/* Label Image */}
                    {label.conditionLabelImg && (
                      <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}${
                          label.conditionLabelImg
                        }`}
                        alt="conditionLabelImg"
                        className="w-[60px] h-[60px] mx-auto max-sm:w-[45px] max-sm:h-[45px]"
                      />
                    )}

                    {/* Operation */}
                    <div className="flex gap-4 max-sm:flex-col max-sm:gap-1">
                      <h3
                        className={`${
                          label.operation === "Subtrack"
                            ? "bg-red-200 px-2"
                            : "bg-blue-200 px-4"
                        } text-black font-bold py-1 rounded text-center`}
                      >
                        {label.operation}
                      </h3>
                      <select
                        name="operation"
                        className="border rounded px-1"
                        onChange={(e) =>
                          e.target.value &&
                          handlePriceDropChange(
                            label.conditionLabelId,
                            e.target.value as TOperation,
                            e.target.name as PriceDropChangeType
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

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="greenary"
              shape="square"
              disabled={updateLoading}
            >
              {updateLoading ? "Loading..." : "Update Price Drops"}
            </Button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="p-5">
          <Typography variant="h3">
            Sure want to Update this Variant’s Data?
          </Typography>
          <Typography variant="h5">
            Selected Variant: <strong>{selectedVariantToFill?.name}</strong>
          </Typography>
          <FlexBox justify="around" className="mt-8">
            <Button
              onClick={fillVariantPriceDrops}
              variant="danger"
              shape="square"
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                setSelectedVariantToFill(null);
              }}
              variant="greenary"
              shape="square"
            >
              No
            </Button>
          </FlexBox>
        </Modal>
      )}
    </div>
  );
};
