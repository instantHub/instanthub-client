import React from "react";

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
    <div className="max-w-[85%] mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Choose InstantCashPick?
      </h2>
      <div className=" ">
        {data.map((d, index) => (
          <div className="bg-white mb-4">
            <h3 className="text-xl font-semibold opacity-90">{d.heading}</h3>
            <p className="opacity-70"> {d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseInstantCashPicks;
