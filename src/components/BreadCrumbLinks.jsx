import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const BreadCrumbLinks = ({
  brands = null,
  products = null,
  productDetail = null,
  recycle = false,
}) => {
  const getBreadcrumbLink = (to, data) => (
    <Link to={to} className={`${data.isLast && "font-semibold"}`}>
      {data.label}
    </Link>
  );

  return (
    <div className="mx-0 mb-6">
      <div className="flex items-center gap-1 max-sm:gap-[2px] text-[16px] max-sm:text-xs opacity-60">
        <div className={`${recycle && "max-sm:hidden"} flex items-center`}>
          {getBreadcrumbLink("/", { label: "Home" })}
          <FaAngleRight />
        </div>

        {recycle && (
          <>
            {getBreadcrumbLink("/recycle-categories", { label: "Recycle" })}
            <FaAngleRight />
          </>
        )}

        {brands && (
          <>
            {getBreadcrumbLink(brands.link, brands)}
            {!brands.isLast && <FaAngleRight />}
          </>
        )}
        {products && (
          <>
            {getBreadcrumbLink(products.link, products)}
            {!products.isLast && <FaAngleRight />}
          </>
        )}

        {productDetail && (
          <>
            <span className="max-sm:hidden font-semibold max-sm:text-[12px]">
              {productDetail.label}
            </span>
            <span className="sm:hidden font-semibold max-sm:text-[12px]">
              {`${productDetail.label.substring(0, recycle ? 14 : 18)}..`}
            </span>
          </>
        )}
      </div>
      <hr className="text-black mt-1" />
    </div>
  );
};

export default BreadCrumbLinks;
