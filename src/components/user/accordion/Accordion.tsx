import { useState } from "react";
import { IFAQItem } from "./types";
import { ArrowDownIcon, ArrowUpIcon } from "@icons";
import { Button } from "@components/general";

interface AccordionProps {
  faqs: IFAQItem[];
  bgColor?: string;
  descBGColor?: string;
  borderTop?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  faqs,
  bgColor = "bg-instant-mid/10 hover:bg-instant-mid/25",
  descBGColor = "bg-white",
  borderTop = 2,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <h2 className="text-xl sm:text-3xl font-bold mb-4 text-cente">
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {visibleFaqs.map((faq, index) => (
          <div
            key={index}
            className={`border-t-${borderTop} border-b  overflow-hidden`}
          >
            <button
              onClick={() => toggle(index)}
              className={`flex items-center justify-between w-full px-4 py-3 transition text-left ${bgColor}`}
            >
              <span className="text-sm font-bold text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ArrowUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ArrowDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div
                className={`px-4 py-3 text-sm text-gray-700 ${descBGColor}`}
                // style={{ backgroundColor: descBGColor }}
              >
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
