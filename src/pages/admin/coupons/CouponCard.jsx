import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteCouponMutation } from "@api/couponsApi";

const CouponCard = ({ data }) => {
  // console.log("data", data);

  const [deleteCoupon] = useDeleteCouponMutation();

  const style = {
    boldness: "font-semibold max-sm:font-norma",
  };

  const handleDelete = async (couponId, e) => {
    e.preventDefault();
    console.log("delete coupon", couponId);
    const deletedCoupon = await deleteCoupon(couponId);
    console.log("deletedCoupon", deletedCoupon);
    toast.success("Coupon Deleted Successfully..!");
  };

  return (
    <>
      <div
        className={`shadow flex flex-col items-center cursor-pointer rounded-md text-sm max-sm:text-xs border`}
      >
        {/* Coupon Code */}
        <div className="flex flex-col text-start gap-2 py-2">
          <div>
            <span>Coupon Code: </span>
            <span className={`${style.boldness}`}>{data.couponCode}</span>
          </div>
          <div>
            <span>Coupon Value: </span>
            <span className={`${style.boldness}`}>{data.couponValue}</span>
          </div>
        </div>

        {/* Delete */}
        <div className="w-full flex justify-center gap-2 mt-2 overflow-hidden">
          <button
            onClick={(e) => handleDelete(data.id, e)}
            className="w-full flex items-center justify-center border-t border-t-red-200 text-red-600 bg-white px-3 py-1"
          >
            Delete <MdDeleteForever />
          </button>
        </div>
      </div>
    </>
  );
};

export default CouponCard;
