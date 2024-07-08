import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../features/api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { BsFileArrowDown } from "react-icons/bs";
import { FaAnglesDown } from "react-icons/fa6";

const ServiceBrands = () => {
  const { subServiceId } = useParams();
  console.log("subServiceId", subServiceId);

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  const [serviceSubCategory, setServiceSubCategory] = useState("");
  const [serviceSubProducts, setServiceSubProducts] = useState("");
  console.log("serviceSubCategory", serviceSubCategory);
  console.log("serviceSubProducts", serviceSubProducts);

  useEffect(() => {
    if (!servicesDataLoading) {
      const serviceSubCat = servicesData.serviceSubCategories.find(
        (ss) => ss._id === subServiceId
      );
      setServiceSubCategory(serviceSubCat);

      const serviceSubProds = servicesData.serviceSubProducts.filter(
        (ssp) => ssp.subServiceId._id === subServiceId
      );
      setServiceSubProducts(serviceSubProds);
    }
  }, [servicesData]);

  return (
    <>
      <Helmet>
        <title>{`${serviceSubCategory?.serviceCategoryId?.name} ${serviceSubCategory?.name} Products | InstantCashPick`}</title>
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
          <div className="flex items-center gap-1 max-sm:text-xs">
            <span className="flex items-center opacity-60 gap-1">
              <Link to={"/"}>Home</Link>
              <FaAngleRight />
              <Link className="max-2sm:hidden" to={`/services`}>
                Services
              </Link>
              <Link className="2sm:hidden" to={`/services`}>
                ...
              </Link>
              <FaAngleRight />
              <Link
                className="max-2sm:hidden"
                to={`/services/serviceSubCategory/${serviceSubCategory?.serviceCategoryId?._id}`}
              >
                {serviceSubCategory?.serviceCategoryId?.name}
              </Link>
              <Link
                className="2sm:hidden"
                to={`/services/serviceSubCategory/${serviceSubCategory?.serviceCategoryId?._id}`}
              >
                ...
              </Link>
              <FaAngleRight />
            </span>
            <span>{serviceSubCategory.name}</span>
          </div>

          <hr className="text-black mt-1" />
        </div>

        {!serviceSubProducts ? (
          // <h1 className="text-5xl text-black opacity-40 mx-auto">Loading...</h1>
          <div className="flex flex-col justify-center items-center h-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mt-2 mb-5 flex justify-center gap-5">
              <div className="flex flex-col items-center justify-center cursor-pointer w-[45%] h-full bg-white  sm:min-w-[45%] rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      serviceSubCategory?.serviceCategoryId?.image
                    }
                    alt="CAT"
                    className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                  />
                </div>
                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                    {serviceSubCategory?.serviceCategoryId?.name}
                  </div>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center cursor-pointer w-[45%] h-full bg-white  sm:min-w-[45%] rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL +
                      serviceSubCategory?.image
                    }
                    alt="CAT"
                    className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                  />
                </div>
                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                    {serviceSubCategory?.name}
                  </div>
                </span>
              </div>
            </div>

            <div className="my-1">
              <h2 className="text-xl font-semibold">Select a Product below</h2>
            </div>

            <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-1">
              {serviceSubProducts &&
                serviceSubProducts
                  // .subCategory
                  //   .filter(
                  //     (sc) => sc.serviceCategoryId._id === serviceCategoryId
                  //   )
                  .map((serviceSubProduct, i) => (
                    <Link
                      to={`/services/book-service/${serviceSubProduct._id}?st=ss`}
                      key={i}
                    >
                      <div
                        key={i}
                        // className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                        className="flex flex-col cursor-pointer w-full h-full border bg-white sm:min-w-full rounded-ss-xl rounded-br-xl hover:shadow-2xl transition ease-in-out duration-500"
                      >
                        <div className="flex horizontal w-28 h-28 items-center justify-center mx-auto max-sm:w-24 max-sm:h-24">
                          <img
                            src={
                              import.meta.env.VITE_APP_BASE_URL +
                              serviceSubProduct.image
                            }
                            alt="CAT"
                            // className="w-full h-full max-sm:w-32 max-sm:h-32"
                            className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                          />
                        </div>
                        {/* <span className="text-center mt-2 flex-1 line-clamp-3 flex flex-col horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12"> */}
                        <div className="text-center mt-2 flex-1 flex flex-col horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                          <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                            <span>{serviceSubProduct.name}</span>
                          </div>
                          {/* Prod Desc */}
                          <div className="text-sm font-semibold text-start pl-2 max-sm:text-xs max-2sm:text-[10px]">
                            <span>{serviceSubProduct.description}</span>
                          </div>
                        </div>
                        <div className="flex flex-col mt-2 pl-2 py-1 items-start justify-start">
                          <div className="flex items-center gap-1">
                            <span className="text-red-500 line-through text-xs max-sm:text-[10px]">
                              MRP{serviceSubProduct.price}
                            </span>

                            <span className="text-xs">
                              {serviceSubProduct.discount}% off
                            </span>
                          </div>

                          <span className="text-red-500 font-semibold text-lg">
                            ₹
                            {serviceSubProduct.price -
                              (serviceSubProduct.discount *
                                serviceSubProduct.price) /
                                100}
                          </span>
                        </div>
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
