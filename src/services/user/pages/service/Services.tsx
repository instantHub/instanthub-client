import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ServiceContent from "@components/user/static/services/ServiceContent";
import { serviceData } from "../../data";
import { ServiceCategoryItem, ServiceItemGrid } from "@services/user";
import { useGetServiceCategoriesQuery } from "@features/api";

export const Services = () => {
  const { data: serviceCategories, isLoading } = useGetServiceCategoriesQuery();

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
        {/* <div className="w-4/5 max-sm:w-[95%] mx-auto"> */}
        <div className="w-4/5 max-sm:w-[95%] mx-auto">
          <h1 className="text-xl max-sm:text-[16px] pb-6">
            Avail Our Service..{" "}
            <span className="text-2xl max-sm:text-lg text-secondary font-semibold">
              Let's make your life hustle free!
            </span>
          </h1>

          <div className="grid grid-cols-6 gap-x-2 gap-y-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 w-full mx-auto items-center justify-center text-center relative">
            <ServiceItemGrid service={serviceData.interior} showTitle />
            <ServiceItemGrid service={serviceData.acrepair} showTitle />
            <ServiceItemGrid service={serviceData.catering} showTitle />
            <ServiceItemGrid service={serviceData.carpentry} showTitle />
            {serviceCategories?.map((category) => {
              return <ServiceCategoryItem service={category} showTitle />;
            })}
          </div>
        </div>

        <ServiceContent />
      </div>
    </>
  );
};
