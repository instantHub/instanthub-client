import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import TermsOfUse from "./TermsOfUse";
import ServicePolicy from "./ServicePolicy";

type PolicyKey = "privacy" | "conditions" | "use" | "service";

export const AllTermsAndPolicies: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("privacy")) {
      setActivePolicy("privacy");
    } else if (location.pathname.includes("conditions")) {
      setActivePolicy("conditions");
    } else if (location.pathname.includes("use")) {
      setActivePolicy("use");
    } else if (location.pathname.includes("service-policy")) {
      setActivePolicy("service");
    }
  }, [location.pathname]);

  const activeSideBar =
    "text-green-600 font-extrabold text-[22px] max-md:text-2xl max-sm:text-sm border-b border-dashed pb-2";
  const nonActiveSideBar =
    "text-xl max-md:text-xl max-sm:text-sm border-b border-dashed pb-2 text-gray-600 font-semibold hover:text-green-600";

  return (
    <div className="mx-10 flex items-center justify-center bg-white max-md:mx-5">
      <div className="flex justify-center max-md:flex-col max-md:items-center max-md:gap-5">
        {/* Sidebar */}
        <div className="px-5">
          <div
            className="mt-[30px] h-[300px] w-[300px] max-md:w-[300px] max-sm:w-[250px] 
                       flex flex-col gap-6 max-sm:gap-2 px-4 py-10 max-sm:py-4 
                       border-r shadow-inner max-md:mt-5 max-md:h-fit 
                       max-sm:items-center max-sm:grid max-sm:grid-cols-2"
          >
            <div
              onClick={() => navigate("/privacy-policies")}
              className={`${
                activePolicy === "privacy" ? activeSideBar : nonActiveSideBar
              } mt-10 max-sm:mt-0`}
            >
              Privacy Policy
            </div>
            <div
              onClick={() => navigate("/service-policy")}
              className={`${
                activePolicy === "service" ? activeSideBar : nonActiveSideBar
              }`}
            >
              Service Policy
            </div>
            <div
              onClick={() => navigate("/terms-conditions")}
              className={`${
                activePolicy === "conditions" ? activeSideBar : nonActiveSideBar
              }`}
            >
              Terms & Conditions
            </div>
            <div
              onClick={() => navigate("/terms-of-use")}
              className={`${
                activePolicy === "use" ? activeSideBar : nonActiveSideBar
              }`}
            >
              Terms Of Use
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              activePolicy !== "privacy" && "hidden"
            }`}
          >
            {activePolicy === "privacy" && <PrivacyPolicy />}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              activePolicy !== "service" && "hidden"
            }`}
          >
            {activePolicy === "service" && <ServicePolicy />}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              activePolicy !== "conditions" && "hidden"
            }`}
          >
            {activePolicy === "conditions" && <TermsAndConditions />}
          </div>
          <div
            className={`max-h-screen overflow-scroll scrollbar ${
              activePolicy !== "use" && "hidden"
            }`}
          >
            {activePolicy === "use" && <TermsOfUse />}
          </div>
        </div>
      </div>
    </div>
  );
};
