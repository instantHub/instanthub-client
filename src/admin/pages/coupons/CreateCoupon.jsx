import React, { useState } from "react";
import {
  useDeleteSeriesMutation,
  useCreateCouponMutation,
} from "../../../features/api";
import { toast } from "react-toastify";
import CouponsList from "./CouponsList";

const CreateCoupon = () => {
  const [deleteSeries] = useDeleteSeriesMutation();
  const [createCoupon, { isLoading: createCouponLoading }] =
    useCreateCouponMutation();

  const [couponCode, setCouponCode] = useState("");
  const [couponValue, setCouponValue] = useState("");

  const handleDelete = async (seriesId, e) => {
    e.preventDefault();
    console.log("delete series", seriesId);
    const deletedSeries = await deleteSeries(seriesId);
    toast.success(deletedSeries.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(couponCode, couponValue);

    const formData = {
      couponCode,
      couponValue,
    };

    console.log("formData", formData);

    try {
      const couponCreated = await createCoupon(formData).unwrap();
      console.log("Coupon created", couponCreated);
      toast.success("Coupon created successfull..!");
      setCouponCode("");
      setCouponValue("");
    } catch (error) {
      toast.error(error);
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center mt-10">
        <h1 className="bold text-[1.4rem] mb-2">Add / Create Coupon</h1>

        <div className="bg-white border rounded-md shadow-lg w-[50%] max-2sm:w-[90%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4  p-5 ">
            <div>
              <h2 className="">Add/Create Coupon</h2>
            </div>
            <hr />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="seriesName">Enter New Coupon Name</label>
                <input
                  type="text"
                  id="couponCode"
                  value={couponCode}
                  className=" border p-2 rounded"
                  placeholder="Coupon Name"
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="seriesName">Enter Coupon Value</label>
                <input
                  type="number"
                  id="couponValue"
                  value={couponValue}
                  className=" border p-2 rounded"
                  placeholder="Coupon Value"
                  onChange={(e) => setCouponValue(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="px-2">
              <button
                type="submit"
                className="bg-green-600 text-white rounded-md p-1 w-[20%] cursor-pointer hover:bg-green-700"
              >
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <CouponsList />
      </div>
    </>
  );
};

export default CreateCoupon;
