import React from "react";

const ServiceHeaderImage = ({ serviceName, serviceImage }) => {
  return (
    <>
      <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
        <img
          src={import.meta.env.VITE_APP_BASE_URL + serviceImage}
          alt="service image"
          className="w-28 h-28 max-sm:w-20 max-sm:h-20"
        />
      </div>
      <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
        <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
          {serviceName}
        </div>
      </span>
    </>
  );
};

export default ServiceHeaderImage;
