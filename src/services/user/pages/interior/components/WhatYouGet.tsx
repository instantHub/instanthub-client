import { FC } from "react";
import { Button } from "@components/general";
import {
  AirtableIcon,
  GitDiffIcon,
  HomeIcon,
  MultipleIcon,
  ProductIcon,
  StockpilesIcon,
} from "@icons";

const services = [
  {
    icon: <StockpilesIcon />,
    title: "Home Improvement Services",
    description:
      "Painting, Bathroom Remodelling, Tiling, Plumbing, Electrical, Civil Work, Deep Cleaning",
  },
  {
    icon: <GitDiffIcon />,
    title: "Living/Dining Room",
    description:
      "TV Unit, TV Back Panelling, Crockery Unit, Bar Unit, Bookshelf",
  },
  {
    icon: <ProductIcon />,
    title: "Kitchen",
    description: "Countertops, Backsplashes, Accessories, Shutters, Storage",
  },

  {
    icon: <MultipleIcon />,
    title: "Bedroom",
    description:
      "Wardrobes, TV Unit, Bed with Storage, Dressing Unit, Study Unit",
  },
  {
    icon: <HomeIcon />,
    title: "Interior Design Services",
    description:
      "False Ceiling, Wall Panelling, Decor Accents, Lighting, Furnishing, Appliances",
  },
  {
    icon: <AirtableIcon />,
    title: "Innovative Storage",
    description:
      "Janitor Unit, Skirting Drawer, Pantry Pull Out, Appliance Garage, Hidden Bar Cabinet, Magic Corner",
  },
];

interface IWhatYouGetProps {
  style?: string;
  openModal: () => void;
}

export const WhatYouGet: FC<IWhatYouGetProps> = ({ style, openModal }) => {
  return (
    <section className={`w-full py-10 sm:py-20 px-4 ${style}`}>
      <h2 className="text-2xl font-semibold text-center mb-8">What You Get</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(({ description, icon, title }, index) => (
          <div key={index} className="text-center px-4">
            <h3 className="flex gap-2 items-center justify-center font-bold text-lg mb-1">
              {icon}
              {title}
            </h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button size="lg" variant="instanthub" onClick={openModal}>
          Get Free Estimates
        </Button>
      </div>
    </section>
  );
};
