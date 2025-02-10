import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceBreadCrumbLinks = ({
  directService = null,
  brandsService = null,
  subService = null,
}) => {
  const getBreadcrumbLink = (to, data) => (
    <Link to={to} className={`${data.isLast && "font-semibold"}`}>
      {data.label}
    </Link>
  );

  return (
    <div className="mx-0 mb-6">
      <div className="flex items-center gap-1 max-sm:gap-[2px] text-[16px] max-sm:text-xs opacity-60">
        <div className={` flex items-center`}>
          {getBreadcrumbLink("/", { label: "Home" })}
          <FaAngleRight />
        </div>
        <div className={` flex items-center`}>
          {getBreadcrumbLink("/services", { label: "Services" })}
          <FaAngleRight />
        </div>

        {directService && (
          <>
            {getBreadcrumbLink(directService.link, directService)}
            {!directService.isLast && <FaAngleRight />}
          </>
        )}
        {brandsService && (
          <>
            {getBreadcrumbLink(brandsService.link, brandsService)}
            {!brandsService.isLast && <FaAngleRight />}
          </>
        )}

        {subService && (
          <>
            <span className="max-sm:hidden font-semibold max-sm:text-[12px]">
              {subService.label}
            </span>
            <span className="sm:hidden font-semibold max-sm:text-[12px]">
              {`${subService.label}..`}
            </span>
          </>
        )}
      </div>
      <hr className="text-black mt-1" />
    </div>
  );
};

export default ServiceBreadCrumbLinks;
