import { ROUTES } from "@routes";
import { generatePathWithParams } from "@utils/general";

export const determineServicePath = (service) => {
  const type = service?.type?.toLowerCase();
  const id = service?._id;
  const serviceUniqueURL = service?.uniqueURL;

  // console.log("determineServicePath", type);

  if (type === "directservice") {
    // return `/services/book-service/${id}?st=ds`;
    return `/services/${serviceUniqueURL}?st=ds`;
  } else if (type === "brand") {
    return `/services/brands/${serviceUniqueURL}`;
    // return generatePathWithParams(ROUTES.user.serviceBrands, id);
  } else if (type === "servicesubcategory") {
    return generatePathWithParams(ROUTES.user.serviceSubCategory, id);
  } else {
    return "#"; // Default path if none of the conditions match
  }
};
