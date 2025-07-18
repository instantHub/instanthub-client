import { IServiceData } from "@types";

export const serviceData: Record<string, IServiceData> = {
  interior: {
    id: 1,
    name: "Interior",
    // path: "ROUTES.user.services.interior",
    path: "interior",
    description:
      "Interior services for your home or office, including cleaning, painting, and decoration.",
    image: "/images/services/categories/interior.jpg",
  },
};
