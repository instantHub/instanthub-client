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
      question: "Is it safe to sell my phone on InstantHub?",
      answer:
        "It's the safest out there. First and foremost, we ensure your device data is erased completely. You will also receive an invoice for the transaction, as a proof of device ownership transfer.",
    },
    {
      question: "When & how do I get paid?",
      answer:
        "You'll be paid via your chosen mode of payment like UPI, bank transfer, Wallet transfer etc as soon as your device is picked up by our executive.",
    },
    {
      question: "How do I proceed from here?",
      answer:
        "Simple. You take a quote, choose a payment mode and schedule device pickup from home or office at a convenient time slot. Following this, our executive will collect your device as scheduled.",
    },
    {
      question: "Do I need to provide any documents?",
      answer:
        "We'll require copies of your address and identity proof to validate the ownership of device. Additionally, sharing a valid invoice for your device is mandatory if you're selling from other cities than Bengaluru",
    },

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
