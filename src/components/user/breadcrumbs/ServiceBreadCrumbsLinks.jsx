import { ArrowRightIcon } from "@icons";
import React from "react";
import { Link } from "react-router-dom";

export const ServiceBreadCrumbLinks = ({
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
          <ArrowRightIcon />
        </div>
        <div className={` flex items-center`}>
          {getBreadcrumbLink("/services", { label: "Services" })}
          <ArrowRightIcon />
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
