import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = (props) => {
  const { from } = props;
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const faqData = [
    {
      question: "How did you calculate my device price?",
      answer:
        "We evaluate devices on the basis of their condition, age, supply, demand & value in the resale market. All these factors are accounted for by our in house expertise to determine the best resale value of your device.",
    },
    {
      question: "Is it safe to sell my phone on InstantCashPick?",
      answer:
        "It’s the safest out there. First and foremost, we ensure your device data is erased completely. You will also receive an invoice for the transaction, as a proof of device ownership transfer.",
    },
    // {
    //   question: "How does Voucher payment work?",
    //   answer:
    //     "We have special vouchers available like Amazon, Flipkart, Croma, etc. to offer extra value for your device. In case you choose one of these vouchers, the complete payment (including the quote price and any additional offer) will be made through the voucher alone. You can redeem at its respective e-store/store.",
    // },
    {
      question: "When & how do I get paid?",
      answer:
        "You’ll be paid via your chosen mode of payment like UPI, bank transfer, Wallet transfer etc as soon as your device is picked up by our executive.",
    },
    {
      question: "How do I proceed from here?",
      answer:
        "Simple. You take a quote, choose a payment mode and schedule device pickup from home or office at a convenient time slot. Following this, our executive will collect your device as scheduled.",
    },
    {
      question: "Do I need to provide any documents?",
      answer:
        "We’ll require copies of your address and identity proof to validate the ownership of device. Additionally, sharing a valid invoice for your device is mandatory if you’re selling from other cities than Bengaluru",
      // "We’ll require copies of your address and identity proof to validate the ownership of device. Additionally, sharing a valid invoice for your device is mandatory if you’re selling in Bengaluru, Mangalore, Noida & Ghaziabad.",
    },
  ];

  const displayedFAQs = showAll ? faqData : faqData.slice(0, 3);

  return (
    <div
      className={`p-4 bg- shadow-d rounded-md ${
        from === "home" ? `w-[90%] mx-auto max-sm:w-full` : `w-full`
      } max-sm:px-1`}
    >
      <h2
        className={`${
          from === "home"
            ? `text-2xl max-sm:text-xl pl-2 font-bold text-center mb-6`
            : `text-2xl max-sm:text-xl pl-2 font-bold text-start mb-6`
        }`}
      >
        FAQs
      </h2>
      {displayedFAQs.map((faq, index) => (
        <div key={index} className="mb-4 border-b max-sm:mb-1">
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex justify-between items-center p-4 focus:outline-none"
          >
            <span className="text-lg max-sm:text-sm font-bold text-gray-700 max-sm:text-start">
              {faq.question}
            </span>
            {activeIndex === index ? (
              <FaChevronUp size={16} />
            ) : (
              <FaChevronDown size={16} />
            )}
          </button>
          {activeIndex === index && (
            <div className="p-4 text-[16px] max-sm:text-xs bg-gray-100 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
      <div className="text-center mt-4">
        <button
          onClick={toggleShowAll}
          className=" text-white rounded py-2 text-[16px] max-sm:text-xs pb-1 bg-cyan-500 px-4 hover:border-b hover:border-cyan-600 hover:pb-[3px] transition"
        >
          {showAll ? "Show Less FAQs" : "Show More FAQs"}
        </button>
      </div>
    </div>
  );
};

export default FAQ;
