import { useGetCouponQuery } from "@api";
import { CouponCard } from "./CouponCard";

export const CouponsList = () => {
  const { data: couponsData, isLoading: couponsDataLoading } =
    useGetCouponQuery();

  if (couponsData) {
    console.log(couponsData);
  }

  return (
    <div className="flex flex-col mt-[5%] w-[80%] mx-auto max-sm:w-[98%]  text-sm max-sm:text-xs">
      <h1 className="bold text-[1.4rem] text-center py-2">Coupons List</h1>
      <div className="w-full grid grid-cols-4 gap-4 max-sm:grid-cols-2 px-10 max-sm:px-1 mx-auto py-5">
        {!couponsDataLoading &&
          couponsData.map((coupon) => (
            <CouponCard key={coupon.id} data={coupon} />
          ))}
      </div>
    </div>
  );
};
