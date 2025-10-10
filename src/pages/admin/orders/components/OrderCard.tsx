// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { orderCurrentStatus } from "@utils/admin";
// import { generatePathWithParams } from "@utils/general/generatePathWithParams";
// import { ROUTES } from "@routes";
// import {
//   ASSIGNMENT_STATUS,
//   IOrder,
//   ORDER_STATUS,
// } from "@features/api/orders/types";

// interface OrderCardProps {
//   data: IOrder;
//   categoryImage: string;
// }

// export const OrderCard: React.FC<OrderCardProps> = ({
//   data,
//   categoryImage,
// }) => {
//   const navigate = useNavigate();

//   const cardColor =
//     data.status == ORDER_STATUS.COMPLETED
//       ? "bg-green-100 border-green-600"
//       : data.status == ORDER_STATUS.CANCELLED
//       ? "bg-red-100 border-red-600"
//       : "";

//   const boldness = "font-semibold max-sm:font-normal";

//   return (
//     <div
//       className={`${
//         data.assignmentStatus.assigned
//           ? "bg-green-100/30 border-green-600"
//           : "bg-orange-100/30 border-orange-600"
//       } ${cardColor} shadow flex items-center cursor-pointer rounded-md py-2 text-sm max-sm:text-xs border `}
//     >
//       {/* Product Image */}
//       <div className="px-5 max-sm:px-2 mx-auto">
//         <img
//           src={`${import.meta.env.VITE_APP_BASE_URL}${categoryImage}`}
//           alt="Product Image"
//           className="w-[60px] h-[60px] max-sm:h-[50px] mx-auto max-sm:w-[50px]"
//           loading="lazy"
//         />
//       </div>

//       {/* Order Info */}
//       <div
//         onClick={() =>
//           navigate(generatePathWithParams(ROUTES.admin.orderDetail, data.id))
//         }
//         className="grow flex flex-col gap-[2px]"
//       >
//         {/* Order ID & Product */}
//         <div className="flex flex-col text-start gap-[2px]">
//           <div>
//             <span>Order ID: </span>
//             <span className={boldness}>{data.orderId}</span>
//           </div>

//           <div className="flex gap-2 justify-start">
//             <span className={boldness}>{data.productDetails?.productName}</span>
//             {data.productDetails?.productCategory === "Mobile" && (
//               <span className={boldness}>
//                 {data.productDetails?.variant.variantName}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Prices */}
//         <div className="flex gap-2">
//           <div>
//             <span>Product Price: </span>
//             <span className={boldness}>
//               {data.productDetails?.variant.price}
//             </span>
//           </div>
//           <div>
//             <span>Offered Price: </span>
//             <span className={boldness}>{data.offerPrice}</span>
//           </div>
//         </div>

//         {/* Customer Name */}
//         <div>
//           <span>Customer Name: </span>
//           <span className={boldness}>{data.customerDetails?.name}</span>
//         </div>

//         {/* Schedule time */}
//         <div>
//           <span>Schedule Pick Up: </span>
//           <span className={boldness}>{data.schedulePickUp}</span>
//         </div>

//         {/* Order Assignment */}
//         <div className="flex gap-2 items-center">
//           <div>
//             <span>Assigned By: </span>
//             <span className={boldness}>
//               {data.assignmentStatus.assigned
//                 ? data.assignmentStatus.assignedBy.name
//                 : ASSIGNMENT_STATUS.UNASSIGNED}
//             </span>
//           </div>
//           <div>
//             <span>Assigned At: </span>
//             <span className={boldness}>
//               {data.assignmentStatus.assigned
//                 ? new Date(
//                     data.assignmentStatus.assignedAt
//                   ).toLocaleDateString()
//                 : ASSIGNMENT_STATUS.UNASSIGNED}
//             </span>
//           </div>
//         </div>

//         {/* Pin Code & Status */}
//         <div className="flex gap-2 items-center">
//           <div>
//             <span>Pin Code: </span>
//             <span className={boldness}>
//               {data.customerDetails?.addressDetails.pinCode}
//             </span>
//           </div>
//           <div>
//             <span>Status: </span>
//             <span className={boldness}>{orderCurrentStatus(data.status)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { useNavigate } from "react-router-dom";
import { orderCurrentStatus } from "@utils/admin";
import { generatePathWithParams } from "@utils/general/generatePathWithParams";
import { ROUTES } from "@routes";
import {
  ASSIGNMENT_STATUS,
  IOrder,
  ORDER_STATUS,
} from "@features/api/orders/types";
import { getOrderCardStyles } from "@components/admin";
import { formatDate } from "@utils/general";

interface OrderCardProps {
  data: IOrder;
  categoryImage: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  data,
  categoryImage,
}) => {
  const navigate = useNavigate();

  // Clean, single source of truth for styles
  const cardStyles = getOrderCardStyles(data);

  const boldness = "font-semibold max-sm:font-normal";

  return (
    <div
      className={`${cardStyles} shadow flex items-center cursor-pointer rounded-md py-2 text-sm max-sm:text-xs border transition-all duration-200 hover:shadow-md`}
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
          <span className={boldness}>
            {formatDate(data.schedulePickUp?.date)}
          </span>
          <span className={boldness}>{data.schedulePickUp.timeSlot}</span>
        </div>

        {/* Order Assignment */}
        <div className="flex gap-2 items-center">
          <div>
            <span>Assigned By: </span>
            <span className={boldness}>
              {data.assignmentStatus.assigned
                ? data.assignmentStatus.assignedBy.name
                : ASSIGNMENT_STATUS.UNASSIGNED}
            </span>
          </div>
          <div>
            <span>Assigned At: </span>
            <span className={boldness}>
              {data.assignmentStatus.assigned
                ? new Date(
                    data.assignmentStatus.assignedAt
                  ).toLocaleDateString()
                : ASSIGNMENT_STATUS.UNASSIGNED}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <span>Assigned To: </span>
          <span className={boldness}>
            {data.assignmentStatus.assigned
              ? data.assignmentStatus.assignedTo.name
              : ASSIGNMENT_STATUS.UNASSIGNED}
          </span>
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
