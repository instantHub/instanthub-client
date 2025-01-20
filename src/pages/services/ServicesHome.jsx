import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "../../features/api";

const ServicesHome = () => {
  const { data: servicesData, serviceLoading: serviceLoading } =
    useGetServicesQuery();

  let navigate = useNavigate();

  // console.log("Services", servicesData);

  const determinePath = (service) => {
    const type = service.type.toLowerCase();
    const id = service._id;

    if (type === "directservice") {
      return `/services/book-service/${id}?st=ds`;
    } else if (type === "brand") {
      return `/services/serviceBrands/${id}`;
    } else if (type === "servicesubcategory") {
      return `/services/serviceSubCategory/${id}`;
    } else {
      return "#"; // Default path if none of the conditions match
    }
  };

  const toggleShowAll = () => {
    navigate("/services");
  };

  return (
    <>
      <div className="mt-5 mx-auto">
        <div className="w-4/5 max-sm:w-[90%] mx-auto">
          <div className="mx-0 mb-6">
            <h1 className="text-lg pb-6">
              Avail Our Service..{" "}
              <span className="text-xl text-secondary font-semibold">
                Let's make you life hustle free!
              </span>
            </h1>
          </div>

          {serviceLoading ? (
            <div className="flex flex-col justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              {/* <div className="grid grid-cols-7 gap-4 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-2sm:grid-cols-2"> */}
              <div className="grid grid-cols-7 gap-4 max-sm:gap-2 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3">
                {!serviceLoading &&
                  servicesData?.serviceCategories
                    // ?.filter((sc) => sc.type.toLowerCase() === "directservice")
                    .filter((s) => s.status === "Active")
                    .slice(0, 10)
                    .map((service, i) => (
                      <Link to={determinePath(service)} key={i}>
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white sm:min-w-full rounded-md sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                        >
                          <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
                            <img
                              src={
                                import.meta.env.VITE_APP_BASE_URL +
                                service.image
                              }
                              alt="CAT"
                              className="w-28 h-28 max-sm:w-20 max-sm:h-20 "
                              loading="lazy"
                            />
                          </div>
                          <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                            <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                              {service.name}
                            </div>
                          </span>
                        </div>
                      </Link>
                    ))}
                <div className="relative text-center mt-4">
                  <button
                    onClick={toggleShowAll}
                    className="absolute bottom-0 text-lg max-sm:text-xs left-0 text-secondary pt-2 pb-1 hover:border-b hover:border-secondary hover:pb-[3px] transition"
                  >
                    show all services...
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ServicesHome;
