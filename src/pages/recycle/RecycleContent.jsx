import React from "react";
import RecycleFAQs from "./RecycleFAQs";

const RecycleContent = ({ heading }) => {
  const whyRecycle = [
    {
      heading: "Best Resale Value",
      text: "Get the highest assured resale value for your devices.",
    },
    {
      heading: "Eco-Friendly",
      text: "Help us reduce e-waste and protect the environment.",
    },
    {
      heading: "Hassle-Free Process",
      text: "A seamless experience from device evaluation to payout.",
    },
    {
      heading: "Fast Payments",
      text: "Receive payments directly into your account after successful pickup and verification.",
    },
  ];

  const howItWorks = [
    {
      heading: "What We Accept",
      text: "Mobiles & Laptops.",
    },
    {
      heading: "Device Evaluation",
      text: "Fill in the details of your device for an instant quote.",
    },
    {
      heading: "Pickup/Drop-off",
      text: "Schedule a free pickup or drop off your device at our nearest center.",
    },
    {
      heading: "Get Paid",
      text: "After verification, receive your payment instantly.",
    },
  ];

  return (
    <>
      <hr className={`${heading ? "hidden" : "w-full mt-10"}`} />
      <div className={`${!heading && "hidden"} mt-24`}>
        <p className={` text-lg max-sm:text-sm max-sm:px-5 text-center`}>
          At InstantHub, we make recycling simple, sustainable, and rewarding.
          Turn your old gadgets into value by recycling them responsibly through
          our platform.
        </p>
      </div>
      {/* How it works */}
      {/* <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 max-sm:py-4 max-sm:px-0"> */}
      <div className="w-5/6 max-sm:w-[90%] mx-auto py-10 max-sm:py-7">
        <h2 className="text-2xl max-sm:text-lg font-bold text-gray-800 mb-12 text-center max-sm:mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-8 max-sm:gap-4 text-center max-14inch:gap-5">
          {howItWorks.map((d, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-lg max-sm:shadow-md text-sm px-2 py-5 border border-cyan-500 rounded-2xl max-sm:text-sm"
            >
              {/* <div className="flex items-center justify-center text-center flex-shrink-0 mr-4 mb-4 pb-2"> */}
              <h3 className="text-lg pb-5 max-sm:pb-3 max-sm:text-sm font-semibold text-gray-800 max-14inch:text-lg">
                {d.heading}
              </h3>
              {/* </div> */}
              <div>
                <p className="text-gray-600 px-4 max-14inch:text-sm max-sm:text-xs">
                  {d.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Why Recycle With Us */}
      {/* <div className="max-w-full mx-auto py-10 max-sm:py-7">
        <h2 className="text-2xl max-sm:text-lg font-bold text-gray-800 mb-12 text-center max-sm:mb-6">
          Why Recycle with InstantHub?
        </h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-8 max-sm:gap-2 text-center max-14inch:gap-5">
          {whyRecycle.map((d, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-sm px-2 py-5 border border-cyan-500 rounded-2xl max-sm:text-sm"
            >
              <h3 className="text-lg pb-5 max-sm:pb-3 max-sm:text-sm font-semibold text-gray-800 max-14inch:text-lg">
                {d.heading}
              </h3>
              <div>
                <p className="text-gray-600 px-4 max-14inch:text-sm max-sm:text-xs">
                  {d.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* Why Recycle With Us */}
      <div className="w-5/6 max-sm:w-[90%] mx-auto py-8">
        <p className="text-2xl max-sm:text-lg font-bold text-center mb-8">
          Why Recycle with InstantHub?
        </p>
        <div className="">
          {whyRecycle.map((item, index) => (
            <div key={index} className="bg-white mb-4">
              <h3 className="text-[17px] max-sm:text-sm font-bold text-gray-700 ">
                {item.heading}
              </h3>
              <p className="opacity-70 text-sm max-sm:text-xs text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <RecycleFAQs />
    </>
  );
};

export default RecycleContent;
