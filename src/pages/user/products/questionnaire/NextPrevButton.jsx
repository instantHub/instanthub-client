import { Button } from "@components/general";
import { selectIsReQuoteTheme } from "@features/slices";
import React, { memo } from "react";
import { useSelector } from "react-redux";

const NextPrevButton = ({ prevHandler, nextHandler, currentPageIndex }) => {
  const reQuoteTheme = useSelector(selectIsReQuoteTheme);

  return (
    <div className="flex items-center gap-5 max-sm:gap-2 mx-2 mt-5">
      <Button
        variant={reQuoteTheme ? "secondary" : "instanthub"}
        size="md"
        shape="square"
        onClick={prevHandler}
        className={`${currentPageIndex === 0 && "hidden"}`}
        fullWidth
      >
        Previous
      </Button>

      <Button
        variant={reQuoteTheme ? "secondary" : "instanthub"}
        size="md"
        shape="square"
        onClick={nextHandler}
        fullWidth
      >
        Next
      </Button>
    </div>
  );
};

export default memo(NextPrevButton);
