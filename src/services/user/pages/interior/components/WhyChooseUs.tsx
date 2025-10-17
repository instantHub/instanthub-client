import { Button } from "@components/general";
import { HomeIcon, AstroIcon, CartIcon, SlidesIcon } from "@icons";
import { FC } from "react";

const whyChooseItems = [
  {
    icon: <HomeIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "51040 Design Possibilities",
    description: "Endless customization options for your perfect home",
  },
  {
    icon: <AstroIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
    //   icon: <Archive className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "20% EXTRA Storage",
    description: "Innovative storage solutions that maximize space",
  },
  {
    icon: <CartIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
    //   icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "No Cost EMIs",
    description: "Flexible payment options to suit your budget",
  },
  {
    icon: <SlidesIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
    //   icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
    title: "20 Year Warranty",
    description: "Long-term protection for your investment",
  },
];

interface IWhyChooseUsProps {
  openModal: () => void;
}

export const WhyChooseUs: FC<IWhyChooseUsProps> = ({ openModal }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl lg:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
          Why Choose InstantHub Homes?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyChooseItems.map((item, index) => (
            <div
              key={index}
              className="text-center group p-4 sm:p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-instant-mid/30 transition-colors">
                <div className="text-instant-mid group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12 px-4">
          <Button variant="instanthub" className="*:p-2" onClick={openModal}>
            Talk To Our Designer
          </Button>
        </div>
      </div>
    </section>
  );
};
