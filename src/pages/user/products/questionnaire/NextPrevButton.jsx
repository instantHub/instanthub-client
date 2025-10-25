import { selectIsReQuoteTheme } from "@features/slices";
import React, { memo } from "react";
import { useSelector } from "react-redux";

const NextPrevButton = ({ prevHandler, nextHandler, currentPageIndex }) => {
  const reQuoteTheme = useSelector(selectIsReQuoteTheme);
  const hidePrevInFirstPage = currentPageIndex === 0 ? "hidden" : "";

  return (
    <div className="flex items-center gap-5 max-sm:gap-2 mx-2 mt-5">
      <button
        onClick={prevHandler}
        className={`${hidePrevInFirstPage} w-full py-2 rounded-lg bg-gradient-to-r from-instant-mid/20 to-instant-end/20 border border-instant-mid text-instant-mid hover:bg-instant-mid/10`}
      >
        Previous
      </button>

      <button
        onClick={nextHandler}
        className={` w-full py-2 rounded-lg bg-gradient-to-r from-instant-mid/20 to-instant-end/20 border border-instant-mid text-instant-mid hover:bg-instant-mid/10`}
      >
        Next
      </button>
    </div>
  );
};

export default memo(NextPrevButton);
