import React from "react";
import ServiceFAQs from "./ServiceFAQs";

const ServiceContent = ({ heading = "" }) => {
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
      heading: "Select a Service",
      text: "Browse through our wide range of services such as Mobile Repair, Packers & Movers, A/C & Geyser Repair, Painting Services, and more.",
    },
    {
      heading: "Book Your Service",
      text: "Fill out a simple form or contact us to book your desired service quickly and easily.",
    },
    {
      heading: "Service Confirmation",
      text: "Our team will confirm your booking and provide the details for the scheduled service.",
    },
    {
      heading: "Service Delivery",
      text: "Our experts will deliver the service at your doorstep or at the designated location as per your convenience.",
    },
    {
      heading: "Pay & Review",
      text: "Make the payment after service completion and share your feedback to help us improve.",
    },
  ];

  return (
    <>
      <hr className="w-4/5 max-sm:w-[95%] mx-auto mt-20 mb-10 max-sm:mt-10 max-sm:mb-5" />
      <div className={`${!heading && "hidden"} mt-24`}>
        <p className={` text-lg max-sm:text-sm max-sm:px-5 text-center`}>
          At InstantHub, we make recycling simple, sustainable, and rewarding.
          Turn your old gadgets into value by recycling them responsibly through
          our platform.
        </p>
      </div>

      {/* How it works */}
      <div className="w-5/6 max-sm:w-[90%] mx-auto py-10 max-sm:py-7">
        <h2 className="text-2xl max-sm:text-lg font-bold text-gray-800 mb-12 text-center max-sm:mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-5 max-sm:grid-cols-2 gap-8 max-sm:gap-4 text-center max-14inch:gap-5">
          {howItWorks.map((d, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-lg max-sm:shadow-md text-sm px-2 py-5 border border-secondary rounded-2xl max-sm:text-sm"
            >
              {/* <div className="flex items-center justify-center text-center flex-shrink-0 mr-4 mb-4 pb-2"> */}
              <h3 className="text-lg pb-5 max-sm:pb-3 max-sm:text-sm font-semibold text-gray-800 max-14inch:text-lg">
                {d.heading}
              </h3>
              {/* </div> */}
              <div>
                <p className="text-gray-600 px-4 max-sm:px-1 max-14inch:text-sm max-sm:text-xs">
                  {d.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service FAQs */}
      <ServiceFAQs />
    </>
  );
};

export default ServiceContent;
