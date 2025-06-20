import { Button } from "@components/general";
import React, { memo } from "react";

const NextPrevButton = ({ prevHandler, nextHandler, currentPageIndex }) => {
  return (
    <div className="flex items-center gap-5 max-sm:gap-2 mx-2">
      <Button
        variant="instanthub"
        size="md"
        onClick={prevHandler}
        className={`${currentPageIndex === 0 && "hidden"}`}
        fullWidth
      >
        Previous
      </Button>

      {/* <button
        onClick={prevHandler}
        className={`px-2 py-1 bg-secondary-light text-secondary border border-secondary mx-auto rounded w-[35%] mt-6 
                hover:bg-secondary hover:text-secondary-light
                  ${currentPageIndex === 0 && "hidden"}`}
      >
        Previous
      </button>
      <button
        onClick={nextHandler}
        className="px-2 py-1 bg-secondary text-white border mx-auto rounded w-[35%] mt-6 
                hover:bg-secondary-light hover:border-secondary hover:text-secondary"
      >
        Next
      </button> */}

      <Button variant="instanthub" size="md" onClick={nextHandler} fullWidth>
        Next
      </Button>
    </div>
  );
};

export default memo(NextPrevButton);
