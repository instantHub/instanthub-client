import { HomeIcon, ProductIcon, ServiceIcon } from "@icons";
import { IWhatWeOfferItems } from "@utils/types";

export const ACRepairWhatWeOffer: IWhatWeOfferItems[] = [
  {
    icon: <ServiceIcon className="w-6 h-6 text-blue-600" />,
    title: "AC Repair",
    description:
      "Certified specialists with years of experience in laptop hardware and software repair.",
  },
  {
    icon: <ProductIcon className="w-6 h-6 text-green-500" />,
    title: "AC Installation",
    description:
      "Quick replacement of faulty batteries, charging ports, and power issues with genuine parts.",
  },
  {
    icon: <HomeIcon className="w-6 h-6 text-orange-500" />,
    title: "AC Maintenance",
    description:
      "We provide fast turnaround for most laptop issues to minimize your downtime.",
  },
];
