import { IServiceData, SERVICES_NAME } from "@utils/types";

export const serviceData: Record<SERVICES_NAME, IServiceData> = {
  interior: {
    _id: 1,
    name: "Interior",
    // path: "ROUTES.user.services.interior",
    uniqueURL: "interior",
    description:
      "Interior services for your home or office, including cleaning, painting, and decoration.",
    image: "/images/services/categories/interior.jpg",
  },
  acrepair: {
    _id: 2,
    name: "AC Repair",
    uniqueURL: "ac-repair",
    description:
      "AC Repair services for your home or office, including installation, cleaning, and maintenance.",
    image: "/images/services/categories/ac-repair.jpg",
  },
  catering: {
    _id: 3,
    name: "Catering",
    uniqueURL: "catering",
    description:
      "Catering services for your home or office, including installation, cleaning, and maintenance.",
    image: "/images/services/categories/catering.jpg",
  },
  carpentry: {
    _id: 4,
    name: "Carpentry",
    uniqueURL: "carpentry",
    description:
      "Carpentry services for your home or office, including installation, cleaning, and maintenance.",
    image: "/images/services/categories/carpenter.png",
  },
};
