import {
  selectCalculatedAmounts,
  selectDeductionState,
  selectOfferPrice,
} from "@features/slices";
import { useSelector } from "react-redux";

export const ReQuoteCompletion = () => {
  const deductionFull = useSelector(selectDeductionState);
  const d = useSelector(selectCalculatedAmounts);
  const offerPrice = useSelector(selectOfferPrice);
  console.log("d", d);
  console.log("deductionFull", deductionFull);
  console.log("offerPrice", offerPrice);

  return (
    <div>
      <h1>ReQuoteCompletion - PENDING</h1>
    </div>
  );
};
