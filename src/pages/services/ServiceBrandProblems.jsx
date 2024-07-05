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

const ServiceBrands = () => {
  const { serviceBrandId } = useParams();
  console.log("serviceCategoryId", serviceBrandId);

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
  console.log("selectedServiceProblems", selectedServiceProblems);

  const dispatch = useDispatch();

  const serviceProblemsData = useSelector(
    (state) => state.serviceProblems.serviceProblems
  );
  console.log("serviceProblemsSlice", serviceProblemsData);

  const handleProblemSelection = (serviceProblem) => {
    console.log("handleProblemSelection");
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
        <title>{`Avail ${serviceBrand?.serviceCategoryId?.name} Services | InstantCashPick`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantCashPick. No more waiting for checks to clear or funds to transfer. Receive cash on the spot quickly and easily."
        />
        <meta
          name="keywords"
          content={`Sell
           on Instant Cash Pick, Instant Cash, Instant Pick, InstantCashPick, instant cash pick, instant cash, instant pick, sell mobiles on instantcashpick`}
        />
        <link rel="canonical" href={`https://instantcashpick.com/`} />
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

            <div className="grid grid-cols-8 gap-6 max-md:grid-cols-5 max-sm:grid-cols-3">
              {serviceProblems &&
                serviceProblems
                  // .subCategory
                  //   .filter(
                  //     (sc) => sc.serviceCategoryId._id === serviceCategoryId
                  //   )
                  .map((serviceBrandProblem, i) => (
                    // <Link to={determinePath(serviceBrand)} key={i}>

                    <>
                      <div
                        key={serviceBrandProblem._id + i}
                        onClick={() =>
                          handleProblemSelection(serviceBrandProblem.name)
                        }
                        className={`${
                          serviceProblemsData.some(
                            (sp) =>
                              sp.serviceProblem === serviceBrandProblem.name
                          )
                            ? `text-cyan-500 shadow-2xl rounded-xl shadow-cyan-500 transition ease-in-out duration-500`
                            : `sm:rounded-sm border sm:shadow-sm transition ease-in-out duration-1000`
                        } flex flex-col items-center py-2 justify-center cursor-pointer w-full h-full bg-white sm:min-w-full rounded-0 sm:ring-0 sm:ring-transparent sm:max-h-56 sm:max-w-44 hover:shadow-xl transition ease-in-out duration-500`}
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
                        <span className="text-center mt-2 flex-1 line-clamp-3 flex horizontal items-center justify-center h-9 sm:h-full sm:w-full sm:max-h-12">
                          <div className="text-[12px] font-[500] leading-7 max-sm:text-xs">
                            {serviceBrandProblem.name}
                          </div>
                        </span>
                      </div>
                    </>
                  ))}
            </div>

            {serviceProblemsData.length > 0 ? (
              <div className="mx-auto mt-10 bg-cyan-500 py-1 px-8 text-xl text-white rounded">
                <Link to={`/services/book-service/${serviceBrand._id}?st=b`}>
                  <button>Continue</button>
                </Link>
              </div>
            ) : (
              <div className="mx-auto mt-10 bg-gray-400 pointer-events-none py-1 px-2 text-xl text-white rounded">
                <button>Select a Problem</button>
              </div>
            )}
          </div>
        )}

        <div></div>
      </div>
    </>
  );
};

export default ServiceBrands;
