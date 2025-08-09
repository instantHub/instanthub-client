import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@routes";
import { Typography } from "@components/general";

export const ServicesHome = () => {
  let navigate = useNavigate();

  const toggleShowAll = () => {
    navigate(ROUTES.user.services);
  };

  return (
    <>
      <div className="mt-5 w-4/5 max-sm:w-[90%] mx-auto">
        {/* <h1 className="text-lg mb-6 pb-6">
          Avail Our Service..{" "}
          <span className="text-xl text-secondary font-semibold">
            Let's make you life hustle free!
          </span>
        </h1> */}

        <Typography variant="h4">
          Stay tuned, Our Services Coming soon!
        </Typography>

        {/* Ensuring Layout Stability */}
        <div
          className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3 w-full mx-auto items-center justify-center text-center relative"
          // style={{ minHeight: "200px" }} // TODO: Uncomment this when services are available, Prevent layout shift
        ></div>
      </div>
    </>
  );
};
