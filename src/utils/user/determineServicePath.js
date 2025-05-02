import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";

export const determineServicePath = (service) => {
  const type = service.type.toLowerCase();
  const id = service._id;

  if (type === "directservice") {
    return `/services/book-service/${id}?st=ds`;
  } else if (type === "brand") {
    return generatePathWithParams(ROUTES.user.serviceBrands, id);
  } else if (type === "servicesubcategory") {
    return generatePathWithParams(ROUTES.user.serviceSubCategory, id);
  } else {
    return "#"; // Default path if none of the conditions match
  }
};
