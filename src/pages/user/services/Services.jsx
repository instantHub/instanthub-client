import React, { useEffect } from "react";
import { useGetServicesQuery } from "@api";
import { Helmet } from "react-helmet-async";
import ServiceContent from "@components/user/static/services/ServiceContent";
import ServiceItemGrid from "./ServiceItemGrid";
import { Loading } from "@components/user";

export const Services = () => {
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
