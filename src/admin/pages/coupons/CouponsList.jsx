import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
} from "../../../features/api";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const CouponsList = () => {
  const { data: couponsData, isLoading: couponsDataLoading } =
    useGetCouponQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  if (couponsData) {
    console.log(couponsData);
  }

  const handleDelete = async (couponId, e) => {
    e.preventDefault();
    console.log("delete coupon", couponId);
    const deletedCoupon = await deleteCoupon(couponId);
    console.log("deletedCoupon", deletedCoupon);
    toast.success("Coupon Deleted Successfully..!");
  };

  return (
    <>
      <div className="flex mt-[5%] w-[80%] mx-auto">
        <div className="grow">
          <div className="bg-white border rounded-md shadow-lg">
            <form className="flex flex-col gap-4 p-5 ">
              <div className="flex gap-2 items-center">
                <h1 className="text-xl opacity-75">Coupons List</h1>
              </div>
              <hr />

              <table className="w-full">
                <thead>
                  <tr className="border">
                    <th className="px-4 py-2 text-black">Coupon Code</th>
                    <th className="px-4 py-2 text-black">Coupon Value</th>
                    <th className="px-4 py-2 text-black">Delete</th>
                  </tr>
                </thead>

                <tbody className="text-center border">
                  {!couponsDataLoading &&
                    couponsData.map((coupon, index) => (
                      <tr key={index}>
                        <td>{coupon.couponCode}</td>
                        <td className="">{coupon.couponValue}</td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(coupon.id, e)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md"
                          >
                            <MdDeleteForever className="text-2xl" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponsList;
