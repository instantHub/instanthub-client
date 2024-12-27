import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const RecycleFAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const faqData = [
    // Recycle FAQ
    {
      question: "What does the Recycle my device mean?",
      answer:
        "Various metals like copper, lead, gold, etc. are used for making a mobile device. Recycling is when these components are extracted from the phone and are used again for manufacturing new devices.",
    },
    {
      question: "Why should I Recycle my device?",
      answer:
        "It is ideal to recycle devices that are no longer in use. Idle devices are usually dumped in landfills or kept unused, resulting in more e-waste and increased carbon footprint. Recycling is a great way to reduce greenhouse emissions that results from mining.",
    },
    {
      question: "How is Recycling different from Selling my X device?",
      answer:
        "Whenever you recycle a device, it directly goes to scrap and then is processed further. It aids in e-waste reduction. However, when you sell a device, it must hold some market value and should be in good condition.",
    },
  ];

  const displayedFAQs = showAll ? faqData : faqData.slice(0, 3);
  return (
    <div
      className={`w-[90%] max-sm:w-[97%] mx-auto p-4 bg- shadow-d rounded-md max-sm:px-1`}
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
              <FaChevronUp size={16} />
            ) : (
              <FaChevronDown size={16} />
            )}
          </button>
          {activeIndex === index && (
            <div className="p-4 text-[15px] max-sm:text-xs bg-gray-100 text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      {faqData.length > 3 && (
        <div className="text-center mt-4">
          <button
            onClick={toggleShowAll}
            className=" text-white rounded py-2 text-[16px] max-sm:text-xs pb-1 bg-secondary px-4 hover:border-b hover:border-secondary hover:pb-[3px] transition"
          >
            {showAll ? "Show Less FAQs" : "Show More FAQs"}
          </button>
        </div>
      )}
    </div>
  );
};

export default RecycleFAQs;
