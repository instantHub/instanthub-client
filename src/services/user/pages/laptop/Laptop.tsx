import { FC, useEffect } from "react";

import {
  useLazyGetServiceBrandByCategoryQuery,
  useLazyGetServiceProblemsByCategoryQuery,
} from "@features/api";

import { useLocation } from "react-router-dom";
import { ElectronicServiceWrapper } from "@services/user/components";
import { whyChooseLaptopData } from "@services/user/data/electronics";

export const Laptop: FC = () => {
  const location = useLocation();
  console.log(location.state);

  const [getBrands, { data: brands, isLoading: isLoadingBrands }] =
    useLazyGetServiceBrandByCategoryQuery();
  const [getProblems, { data: problems, isLoading: isLoadingProblems }] =
    useLazyGetServiceProblemsByCategoryQuery();

  const parentService = location.state;

  useEffect(() => {
    if (parentService?._id) {
      getBrands(parentService._id);
      getProblems(parentService._id);
    }
  }, []);

  return (
    <ElectronicServiceWrapper
      serviceCategory={parentService}
      title="Instant Hub - Laptop Service"
      fetchBrands={getBrands}
      fetchProblems={getProblems}
      brands={brands}
      problems={problems}
      isLoadingBrands={isLoadingBrands}
      isLoadingProblems={isLoadingProblems}
      whyChooseUsData={whyChooseLaptopData}
    >
      {/* <h1>Coming from laptop</h1> */}
    </ElectronicServiceWrapper>
  );
};
