import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { BsFileArrowDown } from "react-icons/bs";
import { FaAnglesDown } from "react-icons/fa6";

const ServiceBrands = () => {
  const { serviceCategoryId } = useParams();
  // console.log("serviceCategoryId", serviceCategoryId);

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  // console.log("sub services api data", subServicesData);

  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceBrands, setServiceBrand] = useState("");
  // console.log("serviceCategory", serviceCategory);
  // console.log("subServices", serviceBrands);

  const [showSubService, setShowSubService] = useState(false);

  const determinePath = (service) => {
    // const type = service.type.toLowerCase();
    // const id = service._id;
    // if (type === "directservice") {
    //   return `/services/book-service/${id}`;
    // } else if (type === "brand") {
    //   return `/services/serviceBrands/${id}`;
    // } else if (type === "servicesubcategory") {
    //   return `/services/serviceSubCategory/${id}`;
    // } else {
    //   return "#"; // Default path if none of the conditions match
    // }
  };

  useEffect(() => {
    if (!servicesDataLoading) {
      const sc = servicesData.serviceCategories;
      // console.log(sc, "sc");
      const serviceFound = sc.find((s) => s._id === serviceCategoryId);
      setServiceCategory(serviceFound);

      const serviceBrandsFound = servicesData.serviceBrands.filter(
        (sc) => sc.serviceCategoryId._id === serviceCategoryId
      );
      setServiceBrand(serviceBrandsFound);
    }
  }, [servicesData]);

  return (
    <>
      <Helmet>
        <title>{`${serviceCategory?.name} Brand | InstantCashPick`}</title>
        <meta
          name="description"
          content="InstantCashPick offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantCashPick. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs."
        />
        <meta
          name="keywords"
          content="InstantCashPick, laptop repairs, mobile repairs, painting services, interior designs, pest control services, repair services, maintenance services, instant cash payments, professional services, reliable services, quick repairs, home maintenance"
        />
        <link rel="canonical" href={`https://instantcashpick.com/services`} />
      </Helmet>
      <div className="mt-8 w-4/5 mx-auto">
        <div className="mx-0 mb-6">
          {
            <div className="flex items-center gap-1 max-sm:text-xs">
              <span className="flex items-center opacity-60 gap-1">
                <Link to={"/"}>Home</Link>
                <FaAngleRight />
                <Link to={`/services`}>Services</Link>
                <FaAngleRight />
              </span>
              <span>{serviceCategory?.name}</span>
              <FaAngleRight />
              <span>Brands</span>
            </div>
          }
          <hr className="text-black mt-1" />
        </div>

        {!serviceBrands ? (
          // <h1 className="text-5xl text-black opacity-40 mx-auto">Loading...</h1>
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mt-2 mb-5">
              <div className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL + serviceCategory.image
                    }
                    alt="CAT"
                    // className="w-full h-full max-sm:w-32 max-sm:h-32"
                    className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                  />
                </div>
                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                    {serviceCategory.name}
                  </div>
                </span>
              </div>
            </div>

            <div className="my-1">
              <h2 className="text-xl font-semibold">Select a Brand below</h2>
            </div>

            <div className="grid grid-cols-8 gap-6 max-md:grid-cols-5 max-sm:grid-cols-3 max-2sm:grid-cols-2">
              {serviceBrands &&
                serviceBrands
                  // .subCategory
                  //   .filter(
                  //     (sc) => sc.serviceCategoryId._id === serviceCategoryId
                  //   )
                  .map((serviceBrand, i) => (
                    // <Link to={determinePath(serviceBrand)} key={i}>
                    <Link
                      to={`/services/serviceBrandProblems/${serviceBrand._id}`}
                      // key={serviceBrand._id + i}
                      key={i}
                    >
                      <div
                        // key={i}
                        // className="w-28 p-4 cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                        className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                      >
                        <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                          <img
                            src={
                              import.meta.env.VITE_APP_BASE_URL +
                              serviceBrand.image
                            }
                            alt="CAT"
                            className="w-full h-full max-sm:w-32 max-sm:h-32"
                          />
                        </div>
                        <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                          <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                            {serviceBrand.name}
                          </div>
                        </span>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        )}

        <div></div>
      </div>
    </>
  );
};

export default ServiceBrands;
