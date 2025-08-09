import { useState } from "react";
import { IFAQItem } from "./types";
import { ArrowDownIcon, ArrowUpIcon } from "@icons";
import { Button } from "@components/general";

interface AccordionProps {
  faqs: IFAQItem[];
  bgColor?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  faqs,
  bgColor = "bg-instant-mid/10 hover:bg-instant-mid/25",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {visibleFaqs.map((faq, index) => (
          <div key={index} className="border-t-2 border-b-2  overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className={`flex items-center justify-between w-full px-4 py-3 transition text-left ${bgColor}`}
            >
              <span className="text-sm font-medium text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ArrowUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ArrowDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {faqs.length > 5 && (
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less FAQs" : "Show More FAQs"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
