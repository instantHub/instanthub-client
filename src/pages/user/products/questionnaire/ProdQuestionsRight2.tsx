import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import SelectedProduct from "./SelectedProduct";
import { selectDeductionState } from "@features/slices";
import { CheckCircleIcon, XCircleIcon, SparklesIcon } from "lucide-react";

interface DisplayDataProps {
  keyword: string;
  label: string;
  index?: number;
  isNegative?: boolean;
}

const ProdDeductionsRight2 = () => {
  const { selectedProduct, getUpTo, deductions, singleDeductions } =
    useSelector(selectDeductionState);

  // Group deductions by type for better display
  const groupedDeductions = useMemo(() => {
    const groups: Record<string, string[]> = {};

    deductions?.forEach((deduction) => {
      if (!groups[deduction.type]) {
        groups[deduction.type] = [];
      }
      groups[deduction.type].push(deduction.conditionLabel);
    });

    return groups;
  }, [deductions]);

  const hasEvaluations =
    Object.keys(singleDeductions).length > 0 || deductions?.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 min-w-screen lg:min-w-[500px] lg:max-w-[500px]">
      {/* Selected Product Section */}
      <SelectedProduct selectedProduct={selectedProduct} getUpTo={getUpTo} />

      {/* Evaluation Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-gray-100">
          <SparklesIcon className="w-5 h-5 text-emerald-600" />
          <h2 className="font-bold text-lg text-gray-800">Your Selection</h2>
        </div>

        {!hasEvaluations ? (
          <>
            <EmptySummary />
            <TipsCard />
          </>
        ) : (
          <div className="space-y-4">
            {/* Single Deductions */}
            {Object.entries(singleDeductions).map(([keyword, label]) => (
              <DisplayData
                key={label.conditionLabel + keyword}
                keyword={keyword}
                label={label.conditionLabel}
                isNegative={label.priceDrop > 0}
              />
            ))}

            {/* Grouped Multi Deductions */}
            {Object.entries(groupedDeductions).map(([type, labels]) => (
              <DisplayGroupedData key={type} keyword={type} labels={labels} />
            ))}
          </div>
        )}

        {/* Summary Card */}
        {hasEvaluations && (
          <div className="mt-6 bg-instant-mid/20 rounded-xl p-4 border-2 border-instant-mid">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Total Selections
              </span>
              <span className="text-instant-mid font-bold text-lg">
                {Object.keys(singleDeductions).length +
                  (deductions?.length || 0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdDeductionsRight2;

const EmptySummary: React.FC = () => (
  <div className=" px-4 py-6 text-center">
    <p className="text-sm font-semibold text-secondary">No selections yet</p>
    <p className="mt-2 text-xs text-secondary/70">
      Start answering the questions on the left to build your device evaluation.
    </p>
  </div>
);

const TipsCard: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-inner">
    <h3 className="text-sm font-semibold text-slate-800">
      Tips for a better offer
    </h3>
    <ul className="mt-3 space-y-2 text-sm text-slate-600">
      <li className="leading-relaxed">
        Provide accurate condition details; we validate them during pickup.
      </li>
      <li className="leading-relaxed">
        Keep accessories handy—original boxes and chargers improve the quote.
      </li>
      <li className="leading-relaxed">
        Data will be wiped securely during inspection for your peace of mind.
      </li>
    </ul>
  </div>
);

// Single Data Display Component
const DisplayData: React.FC<DisplayDataProps> = ({
  keyword,
  label,
  isNegative = false,
}) => {
  if (!label) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-emerald-200 transition-colors">
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
            isNegative ? "bg-amber-100" : "bg-instant-mid/15"
          }`}
        >
          {isNegative ? (
            <XCircleIcon className="w-4 h-4 text-amber-600" />
          ) : (
            <CheckCircleIcon className="w-4 h-4 text-instant-mid" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {keyword}
          </h3>
          <p className="text-sm font-medium text-gray-800 leading-snug">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

// Grouped Data Display Component
const DisplayGroupedData: React.FC<{ keyword: string; labels: string[] }> = ({
  keyword,
  labels,
}) => {
  if (!labels.length) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:border-emerald-200 transition-colors">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-instant-mid font-bold text-xs">
            {labels.length}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {keyword}
          </h3>
          <div className="space-y-1">
            {labels.map((label, index) => (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-instant-mid rounded-full"></div>
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
