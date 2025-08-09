import { CartIcon, HomeIcon, ServiceIcon } from "@icons";
import { IWhatWeOfferItems } from "@utils/types";

export const CarpentryWhatWeOffer: IWhatWeOfferItems[] = [
  {
    icon: <CartIcon className="w-6 h-6 text-amber-800" />,
    title: "Custom Furniture",
    description:
      "We design and build custom furniture tailored to your style and space, ensuring quality craftsmanship and durability.",
  },
  {
    icon: <ServiceIcon className="w-6 h-6 text-amber-800" />,
    title: "Repairs & Restorations",
    description:
      "We repair and restore furniture to its original glory, using high-quality materials and techniques to ensure longevity.",
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-amber-800" />,
    title: "Installation & Assembly",
    description:
      "We provide professional installation and assembly services for all types of furniture, ensuring everything is set up correctly and safely.",
  },
];
