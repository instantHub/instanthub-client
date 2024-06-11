import React from "react";
import {
  HiOutlineClipboardList,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCash,
} from "react-icons/hi";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdPriceCheck } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GiPriceTag } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";

const HowItWorks = () => {
  const data = [
    {
      heading: "Submit Your Device",
      icon: <TbListDetails />,
      text: `Begin by selecting the electronic item you wish to sell. Whether
            it's a smartphone, laptop, tablet, or gaming console, we accept
            a wide range of devices.`,
    },
    {
      heading: " Get an Instant Quote",
      icon: <GiPriceTag />,
      text: `Once you've chosen your device, our intuitive platform will
      generate an instant quote based on its condition, age, and
      market value.`,
    },
    {
      heading: "Schedule a Pickup",
      icon: <RiCalendarScheduleFill />,
      text: `After receiving your quote, simply schedule a pickup time that
      works best for you. Our team will come directly to your location
      to collect the device.`,
    },
    {
      heading: "Receive Instant Payment",
      icon: <GiTakeMyMoney />,
      text: `Upon inspection of the device, you'll receive an instant cash
      payment. No waiting periods, no hidden fees – just quick and
      reliable service.`,
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 max-sm:py-4 max-sm:px-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center max-sm:mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-sm:gap-2 max-14inch:gap-5">
          {data.map((d, index) => (
            <div className="flex flex-col items-center px-2 py-10 border border-cyan-500 rounded-2xl max-sm:text-sm">
              <div className="flex items-center justify-center text-center flex-shrink-0 mr-4 mb-4 pb-2">
                <div className="flex gap-1 items-center mb-2">
                  <div className="text-3xl text-gray-600 max-sm:text-xl">{d.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 max-sm:text-sm max-14inch:text-lg">
                    {d.heading}
                  </h3>
                  {/* <hr className="" /> */}
                </div>
              </div>
              <div>
                <p className="text-gray-600 px-4 max-14inch:text-sm">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
