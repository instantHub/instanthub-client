import React from "react";

const OrderCancellationForm = ({ cancelHandler, handleReasonChange }) => {
  return (
    <div className="py-2">
      {/* Order Cancel Form */}
      <div className="text-sm max-sm:text-xs py-1 text-center">
        Provide Mandatory Reason If You Are Cancelling the Order.
      </div>
      <form
        onSubmit={cancelHandler}
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
            placeholder="Reason for cancellation"
            className="px-2 py-1 text-sm max-sm:text-xs h-[100px] w-[300px] max-sm:w-[250px] border rounded"
            onChange={handleReasonChange}
            required
          />
        </div>
        <div className="text-[16px] max-sm:text-sm">
          <input
            type="submit"
            value="Cancel Order"
            className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default OrderCancellationForm;
