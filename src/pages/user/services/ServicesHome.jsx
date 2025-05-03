import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@api/servicesApi";
import { ROUTES } from "../../../routes";
import ServiceItemGrid from "./ServiceItemGrid";

const ServicesHome = () => {
  const { data: servicesData, isLoading: serviceLoading } =
    useGetServicesQuery();

  let navigate = useNavigate();

  const toggleShowAll = () => {
    navigate(ROUTES.user.services);
  };

  return (
    <>
      <div className="mt-5 w-4/5 max-sm:w-[90%] mx-auto">
        <h1 className="text-lg mb-6 pb-6">
          Avail Our Service..{" "}
          <span className="text-xl text-secondary font-semibold">
            Let's make you life hustle free!
          </span>
        </h1>

        {/* Ensuring Layout Stability */}
        <div
          className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-3 w-full mx-auto items-center justify-center text-center relative"
          style={{ minHeight: "200px" }} // Prevent layout shift
        >
          {serviceLoading ? (
            <>
              {/* Skeleton Loaders for Placeholder */}
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="w-32 h-32 max-sm:w-24 max-sm:h-24 bg-gray-200 animate-pulse rounded-lg"
                ></div>
              ))}
            </>
          ) : (
            <>
              <ServiceItemGrid
                services={servicesData?.serviceCategories.slice(0, 10)}
                displayBig={true}
                showTitle={true}
              />
              <div className="relative text-center mt-4">
                <button
                  onClick={toggleShowAll}
                  className="absolute h-full w-full text-sm max-sm:text-xs bottom-0 left-0 text-secondary hover:border-b hover:border-secondary"
                >
                  show all services...
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesHome;
