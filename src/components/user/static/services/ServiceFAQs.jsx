import { ArrowDownIcon, ArrowUpIcon } from "@icons";
import React, { useState } from "react";

const ServiceFAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const faqData = [
    // Services FAQ
    {
      question: "What services does InstantHub provide?",
      answer: `InstantHub offers Packers & Movers, A/c & geyser repair service, Painting services, etc. Visit our services page(instanthub.in/services) for detailed information.`,
    },
    {
      question: "How can I avail of your services?",
      answer:
        "You can start by visiting our website, selecting the service you need, and following the step-by-step instructions provided.",
    },
    {
      question: "What kinds of repairs do you handle?",
      answer:
        "We provide Mobile Repair services, Laptop Repair services for a wide range of devices.",
    },
    {
      question: "Is there a warranty on repairs?",
      answer:
        "Yes, all our repairs come with a warranty of 3 months. And Depend on the type of service.",
    },
    {
      question: "How long does a typical repair take?",
      answer:
        "Most repairs are completed within 1 to 2 days. For complex issues, we'll keep you informed about the timeline.",
    },
    {
      question: "what is the minimum waiting time for services?",
      answer:
        "Normally, we respond to service requests within a minimum of one hour, but in certain exceptional circumstances, it may take up to twenty-four hours.",
    },
    {
      question: "what are the inspection policy and there charges?",
      answer:
        "As per our policy, we do virtual inspections; however, charges will be applicable if the customer requests a physical inspection.",
    },
  ];

  const displayedFAQs = showAll ? faqData : faqData.slice(0, 3);
  return (
    <div
      className={`w-4/5 max-sm:w-[97%] mx-auto p-4 bg- shadow-d rounded-md max-sm:px-1`}
    >
      <h2 className={`text-2xl max-sm:text-xl pl-2 font-bold text-center mb-6`}>
        FAQs
      </h2>
      {displayedFAQs.map((faq, index) => (
        <div key={index} className="mb-4 border-b max-sm:mb-1">
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex justify-between items-center p-4 focus:outline-none"
          >
            <span className="text-[1rem] max-sm:text-sm font-bold text-gray-700 max-sm:text-start">
              {faq.question}
            </span>
            {activeIndex === index ? (
              <ArrowUpIcon size={22} />
            ) : (
              <ArrowDownIcon size={22} />
            )}
          </button>
          {activeIndex === index && (
            <div className="p-4 text-[15px] max-sm:text-xs bg-gray-100 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      <div className="text-center mt-4">
        <button
          onClick={toggleShowAll}
          className=" text-white rounded py-2 text-[16px] max-sm:text-xs pb-1 bg-secondary px-4 hover:border-b hover:border-secondary hover:pb-[3px] transition"
        >
          {showAll ? "Show Less FAQs" : "Show More FAQs"}
        </button>
      </div>
    </div>
  );
};

export default ServiceFAQs;
