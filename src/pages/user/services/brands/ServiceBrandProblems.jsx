import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetServicesQuery } from "@api/servicesApi";
import {
  addServiceProblems,
  removeServiceProblems,
} from "@features/userSlices/serviceProblemsSlice";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import ServiceContent from "@components/user/static/services/ServiceContent";
import Loading from "@components/user/loader/Loading";
import ServiceHeaderImage from "../ServiceHeaderImage";

const ServiceBrands = () => {
  const { categoryUniqueURL } = useParams();
  console.log("categoryUniqueURL", categoryUniqueURL);

  const location = localStorage.getItem("location");

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  const [serviceBrand, setServiceBrand] = useState("");

  const [serviceProblems, setServiceProblems] = useState("");

  const [selectedServiceProblems, setSelectedServiceProblems] = useState([]);
  // console.log("selectedServiceProblems", selectedServiceProblems);

  const dispatch = useDispatch();

  const serviceProblemsData = useSelector(
    (state) => state.serviceProblems.serviceProblems
  );
  // console.log("serviceProblemsSlice", serviceProblemsData);

  const handleProblemSelection = (serviceProblem) => {
    // console.log("handleProblemSelection");
    if (
      !selectedServiceProblems.some((sp) => sp.serviceProblem == serviceProblem)
    ) {
      setSelectedServiceProblems([
        ...selectedServiceProblems,
        { serviceProblem: serviceProblem },
      ]);
      dispatch(
        addServiceProblems({
          serviceProblem,
        })
      );
    } else if (
      selectedServiceProblems.some((sp) => sp.serviceProblem == serviceProblem)
    ) {
      setSelectedServiceProblems(
        selectedServiceProblems.filter(
          (selectedServiceProblem) =>
            selectedServiceProblem.serviceProblem !== serviceProblem
        )
      );
      dispatch(
        removeServiceProblems({
          serviceProblem,
        })
      );
    }
  };

  useEffect(() => {
    if (servicesDataLoading) return;

    const serviceBrands = servicesData.serviceBrands;

    const serviceBrandFound = serviceBrands.find(
      (sb) => sb.serviceCategoryId.uniqueURL === categoryUniqueURL
    );
    console.log("serviceBrandFound", serviceBrandFound);
    setServiceBrand(serviceBrandFound);

    const serviceProbs = servicesData.serviceProblems.filter(
      (sp) => sp?.serviceCategoryId?.uniqueURL === categoryUniqueURL
    );
    setServiceProblems(serviceProbs);
  }, [servicesData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!serviceProblems) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`${serviceBrand?.name} ${serviceBrand?.serviceCategoryId?.name} Problems | InstantHub`}</title>
        <meta
          name="description"
          content="InstantHub offers a comprehensive range of services including laptop repairs, mobile repairs, painting services, interior designs, pest control services, and more. Experience fast, reliable, and professional services with InstantHub. Visit our website to learn more about our extensive service offerings and how we can help you with all your repair and maintenance needs."
        />
        <meta
          name="keywords"
          content="InstantHub, laptop repairs, mobile repairs, painting services, interior designs, pest control services, repair services, maintenance services, instant cash payments, professional services, reliable services, quick repairs, home maintenance"
        />
      </Helmet>

      <div className="mt-8 w-4/5 max-sm:w-[90%] mx-auto">
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
            </span>
            <span>{serviceBrand?.serviceCategoryId?.name}</span>
            <FaAngleRight />
            <Link
              className="max-2sm:hidden"
              to={`/services/serviceBrands/${serviceBrand?.serviceCategoryId?._id}`}
            >
              Brands
            </Link>
            <Link
              className="2sm:hidden"
              to={`/services/serviceBrands/${serviceBrand?.serviceCategoryId?._id}`}
            >
              ...
            </Link>
            <FaAngleRight />
            <span>{serviceBrand?.name}</span>
          </div>

          <hr className="text-black mt-1" />
        </div>

        <div className="flex flex-col">
          <div className="mt-2 mb-5 flex justify-center gap-5">
            <div className="flex flex-col items-center justify-center cursor-pointer w-[45%] h-full bg-white  sm:min-w-[45%] rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
              <ServiceHeaderImage
                serviceName={serviceBrand?.serviceCategoryId?.name}
                serviceImage={serviceBrand?.serviceCategoryId?.image}
              />
            </div>
            <div className="flex flex-col items-center justify-center cursor-pointer w-[45%] h-full bg-white  sm:min-w-[45%] rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
              <ServiceHeaderImage
                serviceName={serviceBrand?.name}
                serviceImage={serviceBrand?.image}
              />
            </div>
          </div>

          <div className="my-1">
            <h2 className="text-xl font-semibold">Select a Problem below</h2>
          </div>

          <div className="grid grid-cols-7 gap-6 max-sm:gap-2 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3">
            {serviceProblems &&
              serviceProblems.map((serviceBrandProblem, i) => (
                <div
                  key={serviceBrandProblem._id + i}
                  onClick={() =>
                    handleProblemSelection(serviceBrandProblem.name)
                  }
                  className={`overflow-hidden ${
                    serviceProblemsData.some(
                      (sp) => sp.serviceProblem === serviceBrandProblem.name
                    )
                      ? `text-secondary shadow-2xl border border-secondary rounded-xl  shadow-secondary transition-all ease-in-out duration-500`
                      : `sm:rounded-sm border rounded-md sm:shadow-sm transition ease-in-out duration-1000`
                  } flex flex-col items-center my-2 justify-center cursor-pointer w-full h-full bg-white sm:min-w-full sm:ring-0 sm:ring-transparent sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
                >
                  <div className="flex horizontal w-28 h-28 items-center justify-center max-sm:w-24 max-sm:h-24">
                    <img
                      src={
                        import.meta.env.VITE_APP_BASE_URL +
                        serviceBrandProblem.image
                      }
                      alt="service problems"
                      className="w-28 h-28 max-sm:w-20 max-sm:h-20"
                    />
                  </div>

                  <div
                    className={`${
                      serviceProblemsData.some(
                        (sp) => sp.serviceProblem === serviceBrandProblem.name
                      ) &&
                      "bg-secondary text-white border-secondary transition-all ease-in-out duration-500"
                    } text-center mt-2 border-t  flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full w-full sm:max-h-12`}
                  >
                    <span className="text-[12px] font-[500] leading-7 max-sm:text-[10px]">
                      {serviceBrandProblem.name}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {serviceProblemsData.length > 0 ? (
            // <div className="mx-auto mt-10 bg-secondary py-1 px-8 text-xl text-white rounded">
            <div className="mx-auto mt-10 px-8 text-white bg-gradient-to-r from-secondary to-black/60 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary dark:focus:ring-secondary font-medium rounded-lg text-sm py-2.5 text-center mb-2">
              {/* <Link to={`/services/book-service/${serviceBrand._id}?st=b`}> */}
              <Link
                to={`/${location}/services/${serviceBrand.serviceCategoryId.uniqueURL}?st=b`}
              >
                <button>Continue</button>
              </Link>
            </div>
          ) : (
            <div className="mx-auto mt-10 bg-gray-400 font-medium text-sm pointer-events-none px-4 py-2.5 text-center mb-2 text-white rounded">
              <button>Select a Problem</button>
            </div>
          )}
        </div>
      </div>

      <ServiceContent />
    </>
  );
};

export default ServiceBrands;
