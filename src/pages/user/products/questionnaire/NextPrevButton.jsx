import { Button } from "@components/general";
import React, { memo } from "react";

const NextPrevButton = ({ prevHandler, nextHandler, currentPageIndex }) => {
  return (
    <div className="flex items-center gap-5 max-sm:gap-2 mx-2 mt-5">
      <Button
        variant="instanthub"
        size="md"
        shape="square"
        onClick={prevHandler}
        className={`${currentPageIndex === 0 && "hidden"}`}
        fullWidth
      >
        Previous
      </Button>

      <Button
        variant="instanthub"
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
