import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../features/api";
import ServicesBrands from "./ServiceBrands";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const { data: servicesData, serviceLoading: serviceLoading } =
    useGetServicesQuery();
  const [serviceCategorySelected, setServiceCategorySelected] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [serviceBrandSelected, setServiceBrandSelected] = useState("");
  const [selectedServiceBrand, setSelectedServiceBrand] = useState("");

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.instanthub.in/services",
    name: "InstantHub",
    description:
      "InstantHub offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantHub. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.instanthub.in/services",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`Services | InstantHub`}</title>
        <meta
          name="description"
          content="InstantHub offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantHub. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs."
        />
        <meta
          name="keywords"
          content="InstantHub Service, Instant Service, instant service, laptop repairs, mobile repairs, painting services, interior designs, pest control services, repair services, maintenance services, instant cash payments, professional services, reliable services, quick repairs, home maintenance"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://www.instanthub.in/services" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="mt-5 mx-auto">
        <div className="w-4/5 mx-auto">
          <div className="mx-0 mb-6">
            <h1 className="text-lg pb-6">
              Avail Our Service..{" "}
              <span className="text-xl text-cyan-500 font-semibold">
                Let's make you life hustle free!
              </span>
            </h1>
          </div>

          {serviceLoading ? (
            <div className="flex flex-col justify-center items-center h-32">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-4 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-2sm:grid-cols-2">
                {!serviceLoading &&
                  servicesData?.serviceCategories
                    // ?.filter((sc) => sc.type.toLowerCase() === "directservice")
                    .map(
                      (service, i) => (
                        <Link to={determinePath(service)} key={i}>
                          <div
                            key={i}
                            // className="w-28 p-4 cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                            className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
                          >
                            <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                              <img
                                src={
                                  import.meta.env.VITE_APP_BASE_URL +
                                  service.image
                                }
                                alt="CAT"
                                className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                              />
                            </div>
                            <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                              <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                                {service.name}
                              </div>
                            </span>
                          </div>
                        </Link>
                      )
                      // )
                    )}

                {/* {!serviceLoading &&
              servicesData?.serviceCategories
                ?.filter((sc) => sc.type.toLowerCase() === "brand")
                .map((service, i) => (
                  // service.type.toLowerCase() === "directservice" && (
                  <Link to={`/services/book-service/${service._id}`} key={i}>
                    <div
                      key={i}
                      className="bg-white w-fit h-24 flex items-center justify-center cursor-pointer border border-cyan-500 rounded shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                      onClick={() => {
                        setSelectedServiceCategory(service._id);
                        setServiceCategorySelected(!serviceCategorySelected);
                      }}
                    >
                      <p className="p-2 text-center">{service.name}</p>
                    </div>
                  </Link>
                ))}
            {!serviceLoading &&
              servicesData?.serviceCategories
                ?.filter(
                  (sc) => sc.type.toLowerCase() === "servicesubcategory"
                )
                .map((service, i) => (
                  // service.type.toLowerCase() === "directservice" && (
                  <Link to={`/services/subCategory/${service._id}`} key={i}>
                    <div
                      key={i}
                      className="bg-white w-fit h-24 flex items-center justify-center cursor-pointer border border-cyan-500 rounded shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                      onClick={() => {
                        setSelectedServiceCategory(service._id);
                        setServiceCategorySelected(!serviceCategorySelected);
                      }}
                    >
                      <p className="p-2 text-center">{service.name}</p>
                    </div>
                  </Link>
                ))} */}
              </div>

              {/* List of Service Brands */}
              <div>
                {!serviceLoading &&
                  serviceCategorySelected &&
                  servicesData?.serviceBrands
                    ?.filter(
                      (sb) => sb.serviceCategoryId === selectedServiceCategory
                    )
                    .map((serviceBrand, i) => (
                      <Link to={`/services/subservices/${serviceBrand._id}`}>
                        <p
                          onClick={() => {
                            setSelectedServiceBrand(serviceBrand._id);
                            setServiceBrandSelected(!serviceBrandSelected);
                            // setServiceBrandSelected(!serviceBrandSelected);
                          }}
                        >
                          {/* {serviceBrand.name} */}
                          {/* <ServicesBrands /> */}
                        </p>
                      </Link>
                    ))}

                {serviceCategorySelected && serviceBrandSelected ? (
                  <div>
                    {!serviceLoading &&
                      servicesData?.serviceProblems
                        ?.filter((sp) => sp.brandId === selectedServiceBrand)
                        .map((serviceProblem, i) => (
                          <p>{serviceProblem.name}</p>
                        ))}
                  </div>
                ) : null}
              </div>

              {/* List of SubCategory */}
              <div>
                {!serviceLoading &&
                  servicesData?.subCategory
                    ?.filter(
                      (sc) => sc.serviceCategoryId === selectedServiceCategory
                    )
                    .map((sc, i) => (
                      <Link to={`/services/subServices/${sc._id}`} key={i}>
                        <div
                          key={i}
                          className="bg-white w-fit h-24 flex items-center justify-center cursor-pointer border border-cyan-500 rounded shadow-sm hover:shadow-xl transition ease-in-out duration-500"
                          onClick={() => setServiceCategorySelected(sc._id)}
                        >
                          <p className="p-2 text-center">{sc.name}</p>
                        </div>
                      </Link>
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
