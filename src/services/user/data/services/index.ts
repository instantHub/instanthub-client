import { IServiceData } from "@utils/types";

export const serviceData: Record<string, IServiceData> = {
  interior: {
    _id: 1,
    name: "Interior",
    // path: "ROUTES.user.services.interior",
    uniqueURL: "interior",
    description:
      "Interior services for your home or office, including cleaning, painting, and decoration.",
    image: "/images/services/categories/interior.jpg",
  },
};
