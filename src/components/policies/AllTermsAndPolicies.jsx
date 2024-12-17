import React, { useEffect, useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import TermsOfUse from "./TermsOfUse";
import { useLocation, useNavigate } from "react-router-dom";
import ServicePolicy from "./ServicePolicy";

const TermsAndPolicies = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [servicePolicy, setServicePolicy] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("locaiton", location.pathname);

  const showPrivacyPolicy = () => {
    setPrivacyPolicy(true);
    setTermsOfUse(false);
    setTermsAndConditions(false);
    setServicePolicy(false);
  };

  useEffect(() => {
    if (location.pathname.includes("privacy")) {
      showPrivacyPolicy();
    } else if (location.pathname.includes("conditions")) {
      setTermsAndConditions(true);
      setPrivacyPolicy(false);
      setTermsOfUse(false);
      setServicePolicy(false);
    } else if (location.pathname.includes("use")) {
      setTermsOfUse(true);
      setPrivacyPolicy(false);
      setTermsAndConditions(false);
      setServicePolicy(false);
    } else if (location.pathname.includes("service-policy")) {
      setServicePolicy(true);
      setPrivacyPolicy(false);
      setTermsOfUse(false);
      setTermsAndConditions(false);
    }
  });

  const activeSideBar =
    "text-green-600 font-extrabold text-[22px] max-md:text-2xl max-sm:text-sm border-b border-dashed pb-2";
  const nonActiveSideBar =
    "text-xl max-md:text-xl max-sm:text-sm border-b border-dashed pb-2 text-gray-600 font-semibold";

  return (
    <div className="mx-10 flex items-center justify-center bg-white max-md:mx-5">
      <div className="flex justify-center max-md:flex-col max-md:items-center max-md:gap-5">
        <div className="px-5">
          {/* <div className="mt-[200px] h-[300px] w-[200px] max-md:w-[300px] max-2sm:w-[250px] flex flex-col gap-6 px-4 py-10 border-r rounded-lg shadow-2xl text-2xl max-md:mt-5 max-md:h-fit max-sm:items-center"> */}
          <div
            className=" mt-[30px] h-[300px] w-[300px] max-md:w-[300px] max-sm:w-[250px] flex flex-col gap-6 max-sm:gap-2 px-4 py-10 max-sm:py-4 
                           border-r shadow-inner max-md:mt-5 max-md:h-fit max-sm:items-center
                           max-sm:grid max-sm:grid-cols-2"
          >
            <div
              onClick={() => navigate("/privacy-policies")}
              className={`${
                privacyPolicy ? activeSideBar : nonActiveSideBar
              } mt-10 max-sm:mt-0`}
            >
              Privacy Policy
            </div>
            <div
              onClick={() => navigate("/service-policy")}
              className={`${servicePolicy ? activeSideBar : nonActiveSideBar}`}
            >
              Service Policy
            </div>
            <div
              onClick={() => navigate("/terms-conditions")}
              className={`${
                termsAndConditions ? activeSideBar : nonActiveSideBar
              }`}
            >
              Terms & Conditions
            </div>
            <div
              onClick={() => navigate("/terms-of-use")}
              className={`${termsOfUse ? activeSideBar : nonActiveSideBar}`}
            >
              Terms Of Use
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              !privacyPolicy && "hidden"
            }`}
          >
            {privacyPolicy ? <PrivacyPolicy /> : null}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              !servicePolicy && "hidden"
            }`}
          >
            {servicePolicy ? <ServicePolicy /> : null}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              !termsAndConditions && "hidden"
            }`}
          >
            {termsAndConditions ? <TermsAndConditions /> : null}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              !termsOfUse && "hidden"
            }`}
          >
            {termsOfUse ? <TermsOfUse /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPolicies;
