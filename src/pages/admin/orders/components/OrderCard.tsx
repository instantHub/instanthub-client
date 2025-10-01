import React from "react";
import { useNavigate } from "react-router-dom";
import { orderCurrentStatus } from "@utils/admin";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import { IOrder, ORDER_STATUS } from "@features/api/ordersApi/types";

interface OrderCardProps {
  data: IOrder;
  categoryImage: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  data,
  categoryImage,
}) => {
  const navigate = useNavigate();

  const borderColor =
    data.status == ORDER_STATUS.PENDING
      ? "border-blue-600"
      : data.status == ORDER_STATUS.COMPLETED
      ? "border-green-600"
      : data.status == ORDER_STATUS.CANCELLED
      ? "border-red-600"
      : "border-gray-300";

  const boldness = "font-semibold max-sm:font-normal";

  return (
    <div
      className={`shadow flex items-center cursor-pointer rounded-md py-2 text-sm max-sm:text-xs border ${borderColor}`}
    >
      {/* Product Image */}
      <div className="px-5 max-sm:px-2 mx-auto">
        <img
          src={`${import.meta.env.VITE_APP_BASE_URL}${categoryImage}`}
          alt="Product Image"
          className="w-[60px] h-[60px] max-sm:h-[50px] mx-auto max-sm:w-[50px]"
          loading="lazy"
        />
      </div>

      {/* Order Info */}
      <div
        onClick={() =>
          navigate(generatePathWithParams(ROUTES.admin.orderDetail, data.id))
        }
        className="grow flex flex-col gap-[2px]"
      >
        {/* Order ID & Product */}
        <div className="flex flex-col text-start gap-[2px]">
          <div>
            <span>Order ID: </span>
            <span className={boldness}>{data.orderId}</span>
          </div>

          <div className="flex gap-2 justify-start">
            <span className={boldness}>{data.productDetails?.productName}</span>
            {data.productDetails?.productCategory === "Mobile" && (
              <span className={boldness}>
                {data.productDetails?.variant.variantName}
              </span>
            )}
          </div>
        </div>

        {/* Prices */}
        <div className="flex gap-2">
          <div>
            <span>Product Price: </span>
            <span className={boldness}>
              {data.productDetails?.variant.price}
            </span>
          </div>
          <div>
            <span>Offered Price: </span>
            <span className={boldness}>{data.offerPrice}</span>
          </div>
        </div>

        {/* Customer Name */}
        <div>
          <span>Customer Name: </span>
          <span className={boldness}>{data.customerDetails?.name}</span>
        </div>

        {/* Schedule time */}
        <div>
          <span>Schedule Pick Up: </span>
          <span className={boldness}>{data.schedulePickUp}</span>
        </div>

        {/* Pin Code & Status */}
        <div className="flex gap-2 items-center">
          <div>
            <span>Pin Code: </span>
            <span className={boldness}>
              {data.customerDetails?.addressDetails.pinCode}
            </span>
          </div>
          <div>
            <span>Status: </span>
            <span className={boldness}>{orderCurrentStatus(data.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
