import React, { useState } from "react";
import { toast } from "react-toastify";
import { SubmitButton } from "./SubmitButton";

const OrderCancellationForm = ({
  orderId,
  cancelOrder,
  cancelLoading = false,
  closeModal,
}) => {
  const [cancelReason, setCancelReason] = useState("");

  async function handleCancelOrder(e) {
    e.preventDefault();

    try {
      const formData = {
        status: {
          pending: false,
          completed: false,
          cancelled: true,
        },
        cancelReason: cancelReason || null,
      };

      const canceledData = await cancelOrder({
        orderId,
        data: formData,
      }).unwrap();

      console.log("canceledData", canceledData);
      toast.success(canceledData.message || "Cancelled successfully!!");

      closeModal();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative bg-white pt-8 px-4 max-sm:px-2 w-fit max-md:w-[90%] rounded-lg">
        {/* Order Cancel Form */}
        <div className="text-sm max-sm:text-xs py-1 text-center">
          Provide Mandatory Reason If You Are Cancelling the Order.
        </div>
        <form
          onSubmit={handleCancelOrder}
          className="flex justify-center flex-col items-center gap-4 pb-10 "
        >
          <div className="flex max-sm:flex-col items-start gap-1 text-[16px] max-sm:text-sm">
            <label htmlFor="reason">
              <span>Reason:</span>
              <span className="text-red-600">*</span>
            </label>

            <textarea
              type="textarea"
              name="reason"
              value={cancelReason}
              placeholder="Reason for cancellation"
              className="px-2 py-1 text-sm max-sm:text-xs h-[100px] w-[300px] max-sm:w-[250px] border rounded"
              onChange={(e) => setCancelReason(e.target.value)}
              required
            />
          </div>
          <div className="text-[16px] max-sm:text-sm">
            {/* <input
              type="submit"
              value="Cancel Order"
              className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer disabled:bg-gray-200"
              disabled={cancelLoading}
            /> */}
            <SubmitButton loading={cancelLoading} type="secondary">
              Cancel Order
            </SubmitButton>
          </div>
        </form>
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 px-2 py-1 text-sm bg-red-600 text-white rounded"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default OrderCancellationForm;
