import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../features/api";
import {
  addServiceProblems,
  removeServiceProblems,
  clearServiceProblems,
} from "../../features/serviceProblemsSlice";
import { FaAngleRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { BsFileArrowDown } from "react-icons/bs";
import { FaAnglesDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import ServiceFAQs from "./ServiceFAQs";
import ServiceContent from "./ServiceContent";

const ServiceBrands = () => {
  const { serviceBrandId } = useParams();
  // console.log("serviceCategoryId", serviceBrandId);

  const { data: servicesData, isLoading: servicesDataLoading } =
    useGetServicesQuery();

  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceBrand, setServiceBrand] = useState("");
  //   const [serviceProblems, setServiceProblems] = useState("");
  const [serviceProblems, setServiceProblems] = useState("");
  //   console.log("serviceCategory", serviceCategory);
  //   console.log("serviceProblems", serviceProblems);

  const [showSubService, setShowSubService] = useState(false);

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
    if (!servicesDataLoading) {
      const serviceBrands = servicesData.serviceBrands;
      //   console.log("serviceBrands", serviceBrands);

      const serviceBrandFound = serviceBrands.find(
        (sb) => sb._id === serviceBrandId
      );
      setServiceBrand(serviceBrandFound);

      const serviceProbs = servicesData.serviceProblems.filter(
        (sp) =>
          sp.serviceCategoryId._id === serviceBrandFound.serviceCategoryId._id
      );
      setServiceProblems(serviceProbs);
    }
  }, [servicesData]);

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
        <link rel="canonical" href={`https://www.instanthub.in/services`} />
      </Helmet>
      <div className="mt-8 w-4/5 mx-auto">
        <div className="mx-0 mb-6">
          {
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
          }
          <hr className="text-black mt-1" />
        </div>

        {!serviceProblems ? (
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
                      serviceBrand?.serviceCategoryId?.image
                    }
                    alt="CAT"
                    className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                  />
                </div>
                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                    {serviceBrand?.serviceCategoryId?.name}
                  </div>
                </span>
              </div>
              <div className="flex flex-col items-center justify-center cursor-pointer w-[45%] h-full bg-white  sm:min-w-[45%] rounded-0 sm:rounded-xl sm:ring-0 sm:ring-transparent sm:shadow sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500">
                <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                  <img
                    src={
                      import.meta.env.VITE_APP_BASE_URL + serviceBrand?.image
                    }
                    alt="CAT"
                    className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                  />
                </div>
                <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                  <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                    {serviceBrand?.name}
                  </div>
                </span>
              </div>
            </div>

            <div className="my-1">
              <h2 className="text-xl font-semibold">Select a Problem below</h2>
            </div>

            <div className="grid grid-cols-7 gap-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-2sm:grid-cols-2">
              {serviceProblems &&
                serviceProblems.map((serviceBrandProblem, i) => (
                  <div
                    // key={i}
                    key={serviceBrandProblem._id + i}
                    onClick={() =>
                      handleProblemSelection(serviceBrandProblem.name)
                    }
                    className={`overflow-hidden ${
                      serviceProblemsData.some(
                        (sp) => sp.serviceProblem === serviceBrandProblem.name
                      )
                        ? `text-cyan-500 shadow-2xl border border-cyan-500 rounded-xl  shadow-cyan-500 transition-all ease-in-out duration-500`
                        : `sm:rounded-sm border rounded-md sm:shadow-sm transition ease-in-out duration-1000`
                    } flex flex-col items-center my-2 justify-center cursor-pointer w-full h-full bg-white sm:min-w-full sm:ring-0 sm:ring-transparent sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
                  >
                    <div className="flex horizontal w-28 h-28 items-start justify-between max-sm:w-24 max-sm:h-24">
                      <img
                        src={
                          import.meta.env.VITE_APP_BASE_URL +
                          serviceBrandProblem.image
                        }
                        alt="CAT"
                        // className="w-full h-full max-sm:w-32 max-sm:h-32"
                        className="w-28 h-28 max-sm:w-32 max-sm:h-24"
                      />
                    </div>

                    <div
                      className={`${
                        serviceProblemsData.some(
                          (sp) => sp.serviceProblem === serviceBrandProblem.name
                        ) &&
                        "bg-cyan-500 text-white border-cyan-500 transition-all ease-in-out duration-500"
                      } text-center mt-2 border-t  flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full w-full sm:max-h-12`}
                    >
                      <span className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                        {serviceBrandProblem.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {serviceProblemsData.length > 0 ? (
              // <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan to Blue</button>

              // <div className="mx-auto mt-10 bg-cyan-500 py-1 px-8 text-xl text-white rounded">
              <div className="mx-auto mt-10 px-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center mb-2">
                <Link to={`/services/book-service/${serviceBrand._id}?st=b`}>
                  <button>Continue</button>
                </Link>
              </div>
            ) : (
              <div className="mx-auto mt-10 bg-gray-400 font-medium text-sm pointer-events-none px-4 py-2.5 text-center mb-2 text-white rounded">
                <button>Select a Problem</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <ServiceFAQs /> */}
      <ServiceContent />
    </>
  );
};

export default ServiceBrands;
