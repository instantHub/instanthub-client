import React, { useEffect } from "react";
import { useGetServicesQuery } from "@api/servicesApi";
import { Helmet } from "react-helmet-async";
import ServiceContent from "@components/user/static/services/ServiceContent";
import ServiceItemGrid from "./ServiceItemGrid";
import Loading from "@components/user/loader/Loading";

const Services = () => {
  const { data: servicesData, serviceLoading: serviceLoading } =
    useGetServicesQuery();

  // console.log("Services", servicesData);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (serviceLoading) return <Loading />;

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
          content="InstantHub Service, Instant Service, instant service, Instant Mobile Service, Instant Laptop Repair Service, Quick Mobile Repair Service Bangalore, laptop repairs, mobile repairs, painting services, interior designs, pest control services, repair services, maintenance services, instant cash payments, professional services, reliable services, quick repairs, home maintenance"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link rel="canonical" href="https://www.instanthub.in/services" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="mt-5 mx-auto">
        <div className="w-4/5 max-sm:w-[95%] mx-auto">
          <div className="mx-0 px-5">
            <h1 className="text-xl max-sm:text-[16px] pb-6">
              Avail Our Service..{" "}
              <span className="text-2xl max-sm:text-lg text-secondary font-semibold">
                Let's make you life hustle free!
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-7 gap-4 max-sm:gap-[6px] max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3">
            <ServiceItemGrid
              services={servicesData?.serviceCategories.filter(
                (s) => s.status === "Active"
              )}
              displayBig={true}
              showTitle={true}
            />
          </div>
        </div>

        <ServiceContent />
      </div>
    </>
  );
};

export default Services;

{
  /* List of Service Brands */
  // !serviceLoading &&
  //   servicesData?.serviceCategories
  //     .filter((s) => s.status === "Active")
  //     .map((service, i) => (
  //       <Link to={determineServicePath(service)} key={i}>
  //         <div
  //           key={i}
  //           // className="w-28 p-4 cursor-pointer rounded-lg shadow-sm hover:shadow-xl transition ease-in-out duration-500"
  //           className="flex flex-col items-center justify-center border p-1 cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-md sm:rounded-xl sm:ring-0 sm:ring-transparent shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500"
  //         >
  //           <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
  //             <img
  //               src={import.meta.env.VITE_APP_BASE_URL + service.image}
  //               alt="CAT"
  //               className="w-28 h-28 max-sm:w-20 max-sm:h-20"
  //             />
  //           </div>
  //           <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
  //             <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
  //               {service.name}
  //             </div>
  //           </span>
  //         </div>
  //       </Link>
  //     ));
}
