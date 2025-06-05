import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetServicesQuery } from "@api";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { clearServiceProblems } from "@features/userSlices/serviceProblemsSlice";
import { useDispatch } from "react-redux";
import { Loading } from "@components/user";
import ServiceContent from "@components/user/static/services/ServiceContent";
import ServiceItemGrid from "../ServiceItemGrid";
import ServiceHeaderImage from "../ServiceHeaderImage";

export const ServiceBrands = () => {
  const { categoryUniqueURL } = useParams();
  console.log("categoryUniqueURL", categoryUniqueURL);

  const dispatch = useDispatch();

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceBrands, setServiceBrand] = useState("");
  console.log("serviceCategory", serviceCategory);
  console.log("serviceBrands", serviceBrands);

  useEffect(() => {
    dispatch(clearServiceProblems());
    if (servicesDataLoading) return;
    const sc = servicesData.serviceCategories;
    const serviceFound = sc.find((s) => s.uniqueURL === categoryUniqueURL);
    setServiceCategory(serviceFound);

    const serviceBrandsFound = servicesData.serviceBrands.filter(
      (sc) => sc.serviceCategoryId.uniqueURL === categoryUniqueURL
    );
    setServiceBrand(serviceBrandsFound);
  }, [servicesData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${serviceCategory?.name} Brand | InstantHub`}</title>
        <meta
          name="description"
          content="InstantHub offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantHub. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs."
        />
        <meta
          name="keywords"
          content="InstantHub, laptop repairs, mobile repairs, painting services, interior designs, pest control services, repair services, maintenance services, instant cash payments, professional services, reliable services, quick repairs, home maintenance"
        />
        <link
          rel="canonical"
          href={`https://www.instanthub.in/services/serviceBrands/${serviceCategory?._id}`}
        />
      </Helmet>
      <div className="mt-8 w-4/5 max-sm:w-[90%] mx-auto">
        <div className="mx-0 mb-6">
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

          <hr className="text-black mt-1" />
        </div>

        {!serviceBrands ? (
          <Loading />
        ) : (
          <div className="flex flex-col">
            <div className="mt-2 mb-5">
              <div className="flex flex-col items-center justify-center cursor-pointer w-full h-full bg-white  sm:min-w-full rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                <ServiceHeaderImage
                  serviceName={serviceCategory.name}
                  serviceImage={serviceCategory.image}
                />
              </div>
            </div>

            <div className="my-1">
              <h2 className="text-xl font-semibold">Select a Brand below</h2>
            </div>

            <div className="grid grid-cols-8 gap-6 max-md:grid-cols-5 max-sm:grid-cols-3">
              <ServiceItemGrid
                services={serviceBrands}
                fromBrands={true}
                displayBig={true}
              />
            </div>
          </div>
        )}
      </div>

      {/* <ServiceFAQs /> */}
      <ServiceContent />
    </>
  );
};
