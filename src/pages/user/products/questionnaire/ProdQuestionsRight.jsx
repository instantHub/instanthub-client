import React from "react";
import { useSelector } from "react-redux";
import SelectedProduct from "./SelectedProduct";
import { selectDeductionState } from "@features/slices";

const ProdDeductionsRight = () => {
  const { selectedProduct, getUpTo, deductions, singleDeductions } =
    useSelector(selectDeductionState);

  return (
    // <div className="border rounded sm:h-[450px] max-h-[550px] overflow-y-auto scrollbar max-sm:w-[90%] max-2sm:w-[95%]">
    <div className="max-h-[550px] border rounded-lg shadow-xl overflow-y-auto scrollbar p-2">
      <SelectedProduct selectedProduct={selectedProduct} getUpTo={getUpTo} />

      {/* Evaluation */}
      <div className="my-6 mx-auto px-4">
        <h2 className="py-3 font-bold text-gray-400">Evaluation</h2>

        <div className="flex flex-col gap-2">
          {Object.entries(singleDeductions)?.map(([keyword, label]) => {
            return (
              <DisplayData
                key={label.conditionLabel + keyword}
                keyword={keyword}
                label={label.conditionLabel}
              />
            );
          })}

          {deductions?.map((deduction, i) => {
            return (
              <DisplayData
                key={deduction.conditionLabel + deduction.type + i}
                index={i}
                keyword={deduction.type}
                label={deduction.conditionLabel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProdDeductionsRight;

function DisplayData({ keyword, label, index = 0 }) {
  return (
    label && (
      <div className="flex flex-col gap-2">
        <h2 className={`font-bold ${index > 0 && "hidden"}`}>{keyword}</h2>
        <p className="pl-2 text-sm">{label}</p>
      </div>
    )
  );
}
