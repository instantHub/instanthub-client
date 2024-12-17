import React from "react";
import FAQ from "./FAQ";

const WhyChooseInstantCashPicks = () => {
  const data = [
    {
      heading: "Instant Cash Payments",
      text: `Say goodbye to waiting for checks to clear or funds to transfer.
        With InstantCashPick, you'll receive cash on the spot.`,
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
          Why Choose InstantCashPick?
        </h2>
        <div className="">
          {data.map((d, index) => (
            <div key={index} className="bg-white mb-4">
              <h3 className="text-lg max-sm:text-[16px] font-bold text-gray-700 ">
                {d.heading}
              </h3>
              <p className="opacity-70 text-sm text-gray-600 max-sm:text-xs">
                {" "}
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* FAQ */}
      {/* <div className="max-w-[85%] mx-auto py-8">
        <h2 className="text-3xl font-bold text-center mb-8 max-sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="bg-white mb-4">
          <h3 className="text-xl font-semibold opacity-90 max-sm:text-lg">
            How do I sell my gadget?
          </h3>
          <p className="opacity-70 max-sm:text-sm">
            Simply visit our website, choose your gadget, and follow the
            instructions to get an instant quote.
          </p>
        </div>
        <div className="bg-white mb-4">
          <h3 className="text-xl font-semibold opacity-90 max-sm:text-lg">
            How will I receive payment?
          </h3>
          <p className="opacity-70 max-sm:text-sm">
            You will receive cash on the spot after we verify the condition of
            your gadget.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default WhyChooseInstantCashPicks;
