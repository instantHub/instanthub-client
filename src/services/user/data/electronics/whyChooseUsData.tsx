import {
  CartIcon,
  CheckCircle,
  HomeIcon,
  LaptopIcon,
  PhoneIcon,
  ProductIcon,
  RightTickIcon,
  ServiceIcon,
  SlidesIcon,
} from "@icons";
import { IWhyChooseItems } from "@utils/types";

export const whyChooseUsMobileData: IWhyChooseItems[] = [
  {
    icon: <RightTickIcon className="w-6 h-6 text-blue-600" />,
    // icon: '<RightTickIcon className="w-6 h-6 text-blue-600" />',
    title: "Trusted Technicians",
    description:
      "All our technicians are certified and background-verified for reliable and safe mobile repairs.",
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-green-600" />,
    title: "Doorstep Service",
    description:
      "We offer fast and convenient repair services right at your doorstep—no waiting in queues.",
  },
  {
    icon: <CartIcon className="w-6 h-6 text-yellow-500" />,
    title: "Quick Turnaround",
    description:
      "We understand your urgency. Most issues are fixed within 30-60 minutes.",
  },
  // {
  //   icon: <PhoneIcon className="w-6 h-6 text-purple-600" />,
  //   title: "24/7 Customer Support",
  //   description:
  //     "Our support team is always available to assist you with queries or updates.",
  // },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
    title: "High Quality Parts",
    description:
      "We use only genuine and high-quality spare parts to ensure durability and performance.",
  },
  // {
  //   icon: <SlidesIcon className="w-6 h-6 text-red-500" />,
  //   title: "Affordable Pricing",
  //   description:
  //     "Transparent and competitive pricing with no hidden charges. Pay only for what you get.",
  // },
];

export const whyChooseLaptopData: IWhyChooseItems[] = [
  {
    icon: <RightTickIcon className="w-6 h-6 text-blue-600" />,
    title: "Expert Laptop Technicians",
    description:
      "Certified specialists with years of experience in laptop hardware and software repair.",
  },
  {
    icon: <ProductIcon className="w-6 h-6 text-green-500" />,
    title: "Battery & Power Repairs",
    description:
      "Quick replacement of faulty batteries, charging ports, and power issues with genuine parts.",
  },
  {
    icon: <ServiceIcon className="w-6 h-6 text-orange-500" />,
    title: "Same-Day Service Available",
    description:
      "We provide fast turnaround for most laptop issues to minimize your downtime.",
  },
  {
    icon: <LaptopIcon className="w-6 h-6 text-emerald-500" />,
    title: "Software Optimization",
    description:
      "We optimize your laptop for speed, performance, and security—ideal for work and gaming.",
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    title: "Warranty on Repairs",
    description:
      "All repairs come with a warranty, ensuring peace of mind and customer satisfaction.",
  },
];
