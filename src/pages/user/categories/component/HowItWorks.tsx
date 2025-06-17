import { FC } from "react";
import { CalendarScheduleFillIcon, CashIcon, PhoneIcon } from "@icons";
import { FlexBox } from "@components/general";

interface ISteps {
  icon: JSX.Element;
  stepNo: number;
  heading: string;
  description: string;
}
export const HowItWorks: FC = () => {
  const steps: ISteps[] = [
    {
      icon: <PhoneIcon size={24} />,
      stepNo: 1,
      heading: "Check Price",
      description:
        "Select your device & tell us about its current condition, and our advanced AI tech will tailor make the perfect price for you.",
    },
    {
      icon: <CalendarScheduleFillIcon size={32} />,
      stepNo: 2,
      heading: "Schedule Pickup",
      description:
        "Book a free pickup from your home or work at a time slot that best suits your convenience.",
    },
    {
      icon: <CashIcon size={32} />,
      stepNo: 3,
      heading: "Get Paid",
      description:
        "Did we mention you get paid as soon as our executive picks up your device? It's instant payment, cash or bank transfer.",
    },
  ];
  return (
    <div className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
          How Instant Hub Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ icon, stepNo, heading, description }) => (
            <div key={stepNo} className="text-center">
              {/* <div className="w-20 h-20 mx-auto mb-6 bg-instant-mid rounded-full flex items-center justify-center"> */}
              <div className="w-14 sm:w-20 h-14 sm:h-20 mx-auto mb-6 bg-gradient-to-br from-instant-mid to-instant-end rounded-full flex items-center justify-center">
                {icon}
              </div>
              <FlexBox className="mb-4">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-instant-end to-instant-mid text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {stepNo}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {heading}
                </h3>
              </FlexBox>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
