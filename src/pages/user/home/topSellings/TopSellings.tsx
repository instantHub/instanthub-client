import { FC } from "react";
import { TopSellingBrands } from "../../categories/component";
import { Loading } from "@components/user";
import { useGetMostSoldProductsAndBrandsQuery } from "@api";
import { TopBrands } from "./TopBrands";
import { TopProducts } from "./TopProducts";

export const TopSellings: FC = () => {
  // @ts-ignore
  const { data: topSellingData, topSellingDataLoading } =
    useGetMostSoldProductsAndBrandsQuery();

  // console.log("topSellingData", topSellingData);

  if (topSellingDataLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <TopSellingBrands brands={topSellingData?.mostSellingBrands} /> */}
      <TopBrands brands={topSellingData?.mostSellingBrands} />
      <TopProducts products={topSellingData?.mostSoldProducts} />
    </div>
  );
};
