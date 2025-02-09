import React, { memo } from "react";

// const WhyChooseInstantCashPicks = () => {
const WhyChooseInstantHubs = () => {
  const data = [
    {
      heading: "Instant Cash Payments",
      text: `Say goodbye to waiting for checks to clear or funds to transfer.
        With InstantHub, you'll receive cash on the spot.`,
    },
    {
      heading: "Convenience",
      text: `Our pickup service saves you time and hassle. No need to travel to a
      store or wait in line – we come to you.`,
    },
    {
      heading: "Competitive Prices",
      text: `We offer fair and competitive prices for your electronic devices,
      ensuring you get the most value for your items.`,
    },
    {
      heading: "Secure Transactions",
      text: ` Your privacy and security are our top priorities. Rest assured that
      your personal information is protected throughout the transaction
      process.`,
    },
  ];

  return (
    <>
      <div className="max-w-[85%] mx-auto py-8">
        <h2 className="text-2xl max-sm:text-xl font-bold text-center mb-8">
          Why Choose InstantHub?
        </h2>
        <div className="">
          {data.map((d, index) => (
            <div key={index} className="bg-white mb-4">
              <h3 className="text-lg max-sm:text-[16px] font-bold text-gray-700 ">
                {d.heading}
              </h3>
              <p className="opacity-90 text-sm text-gray-600 max-sm:text-xs">
                {" "}
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(WhyChooseInstantHubs);
