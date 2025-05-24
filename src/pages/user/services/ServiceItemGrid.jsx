import React from "react";
import { Link } from "react-router-dom";
import { determineServicePath } from "@utils/user/determineServicePath";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";

const ServiceItemGrid = ({
  services,
  displayBig,
  showTitle = false,
  fromBrands = false,
}) => {
  function determinePath(service) {
    if (fromBrands) {
      const location = localStorage.getItem("location");
      const uniqueURL = service.serviceCategoryId.uniqueURL;

      return `/${location}/services/brands/problems/${uniqueURL}`;

      // return generatePathWithParams(ROUTES.user.serviceBrandProblems, id);
    } else {
      return determineServicePath(service);
    }
  }
  return services?.map((service) => (
    <div className="flex justify-center" key={service._id}>
      <Link
        to={determinePath(service)}
        className={`flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500 ${
          displayBig ? `w-32 h-32` : `w-28 h-28`
        } max-sm:w-24 max-sm:h-24`}
      >
        <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + service.image}
            alt="service"
            className={`${
              showTitle ? "w-28 h-28 max-sm:w-20 max-sm:h-20" : "justify-center"
            } `}
          />
        </div>
        {/* Optional: display service name */}
        {showTitle && (
          <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
            <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
              {service.name}
            </div>
          </span>
        )}
      </Link>
    </div>
  ));
};

export default ServiceItemGrid;

// className="w-28 p-4 h-28 flex cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
// className="w-32 p-4 h-32 flex cursor-pointer border border-secondary rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500 bg-white"
