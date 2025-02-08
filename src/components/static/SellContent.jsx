import React from "react";

const SellContent = () => {
  const WhyUs = [
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
  const howItWorks = [
    {
      heading: "Submit Your Device",
      // icon: <TbListDetails />,
      text: `Begin by selecting the electronic item you wish to sell. Whether
                it's a smartphone, laptop, tablet, or gaming console and etc, we accept
                a wide range of devices.`,
    },
    {
      heading: "Get an Instant Quote",
      // icon: <GiPriceTag />,
      text: `Once you've chosen your device, our intuitive platform will
          generate an instant quote based on its condition, age, and
          market value.`,
    },
    {
      heading: "Schedule a Pickup",
      // icon: <RiCalendarScheduleFill />,
      text: `After receiving your quote, simply schedule a pickup time that
          works best for you. Our team will come directly to your location
          to collect the device.`,
    },
    {
      heading: "Receive Instant Payment",
      // icon: <GiTakeMyMoney />,
      text: `Upon inspection of the device, you'll receive an instant cash
          payment. No waiting periods, no hidden fees – just quick and
          reliable service.`,
    },
  ];
  return (
    <>
      <hr className={`w-full mt-10`} />

      {/* How it works */}
      {/* <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 max-sm:py-4 max-sm:px-0"> */}
      <div className="w-5/6 max-sm:w-full mx-auto py-10 max-sm:py-7">
        <h2 className="text-2xl max-sm:text-lg font-bold text-gray-800 mb-12 text-center max-sm:mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-8 max-sm:gap-4 text-center max-14inch:gap-5">
          {howItWorks?.map((d, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-lg max-sm:shadow-md text-sm py-5 border border-secondary rounded-2xl max-sm:text-sm"
            >
              <h3 className="text-lg pb-5 max-sm:pb-3 px-2 max-sm:text-sm font-semibold text-gray-800 max-14inch:text-lg">
                {d.heading}
              </h3>
              <p className="text-gray-600 px-4 max-sm:px-3 max-14inch:text-sm max-sm:text-xs">
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Recycle With Us */}
      <div className="w-5/6 max-sm:w-[90%] mx-auto py-8">
        <p className="text-2xl max-sm:text-lg font-bold text-center mb-8">
          Why Sell with InstantHub?
        </p>
        <div className="">
          {WhyUs?.map((item, index) => (
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
    </>
  );
};

export default SellContent;
