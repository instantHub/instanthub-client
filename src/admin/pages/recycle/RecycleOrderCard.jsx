import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import { useDeleteRecycleOrderMutation } from "../../../features/api/recycle/recycleApi";
import { orderCurrentStatus } from "../../helpers/helper";

const RecycleOrderCard = ({ data, categoryImage }) => {
  //   console.log("data", data);
  const [deleteRecycleOrder] = useDeleteRecycleOrderMutation();

  const navigate = useNavigate();

  // Delete Order
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    borderColor: `${data.status.pending && "border-blue-600"} 
    ${data.status.completed && "border-green-600"} ${
      data.status.cancelled && "border-red-600"
    }`,
  };

  const handleDelete = async (recycleOrderId) => {
    console.log("handledelete", recycleOrderId);
    await deleteRecycleOrder(recycleOrderId);
  };

  return (
    <>
      {/* <div className="shadow rounded-md px-4 py-2 border text-sm max-sm:text-xs"> */}
      <div
        className={`shadow flex items-center cursor-pointer rounded-md py-2 text-sm max-sm:text-xs border ${style.borderColor}`}
      >
        <div className="px-5 max-sm:px-2 mx-auto">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + categoryImage}
            alt={"Product Image"}
            className={`w-[60px] h-[60px] max-sm:h-[50px] mx-auto max-sm:w-[50px]`}
            loading="lazy" // Native lazy loading
          />
        </div>
        <div
          onClick={() => navigate(`/admin/recycleOrder-detail/${data.id}`)}
          className="grow flex flex-col gap-[2px]"
        >
          {/* Order and Product name and variant */}
          <div className="flex flex-col text-start py-1">
            <div>
              <span>Order ID: </span>
              <b>{data.recycleOrderId}</b>
            </div>

            <div className="flex gap-2 justify-start py-1">
              <b>{data.productDetails.productName}</b>
              <b
                className={` ${
                  data.productDetails.productCategory !== "Mobile" && "hidden"
                }`}
              >
                {data.productDetails.productVariant}
              </b>
            </div>
          </div>

          {/* RecyclePrice & Status */}
          <div className="flex gap-2 items-start">
            <div>
              <b>Recycle Price: </b>
              <span>{data.recyclePrice}</span>
            </div>
            <div>
              <b>Status: </b>
              <b>{orderCurrentStatus(data.status)}</b>
            </div>
          </div>

          {/* Schedule time */}
          <div>
            <b>Schedule Pick Up: </b>
            <span>{data.schedulePickUp}</span>
          </div>

          {/* Pin Code */}
          <div>
            <b>Pin Code: </b>
            <span>{data.addressDetails.pinCode}</span>
          </div>

          {/* View or Delete */}
          {/* <div className="flex justify-center gap-2 py-2">
            <div className="grow">
              <Link
                to={`/admin/recycleOrder-detail/${data.id}`}
                className={` font-bold p-1 rounded flex items-center justify-center gap-1 
                    ${orderViewBtnColor(data.status)}`}
                // justify-center gap-1 bg-green-600 hover:bg-green-700`}
              >
                <span>View Detail</span>
                <span>
                  <FaHandsHoldingCircle />
                </span>
              </Link>
            </div>
            <div>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setOrderToDelete(data.id);
                }}
                className="bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div> */}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={orderToDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default RecycleOrderCard;

{
  //     addressDetails
  // :
  // {address: 'No 270 4th Main 2nd Cross', state: 'KARNATAKA', city: 'Bangalore', pinCode: 560032}
  // cancelReason
  // :
  // "Fake Customer"
  // createdAt
  // :
  // "2025-01-01T01:28:06.006Z"
  // customerName
  // :
  // "Yusuf"
  // email
  // :
  // "yousuf337692qureshi@gmail.com"
  // id
  // :
  // "67749a2624c96fdcf5e5fad5"
  // paymentMode
  // :
  // "PhonePe"
  // phone
  // :
  // 6363821097
  // productDetails
  // :
  // productAge
  // :
  // "Between 1-3 Years"
  // productBrand
  // :
  // "Realme"
  // productCategory
  // :
  // "Laptop"
  // productName
  // :
  // "Book Slim Series"
  // productStatus
  // :
  // "Switched On"
  // productVariant
  // :
  // null
  // [[Prototype]]
  // :
  // Object
  // recycleOrderId
  // :
  // "REORD250101YU97001"
  // recyclePrice
  // :
  // 1500
  // schedulePickUp
  // :
  // "January 1, 2025 10:00 AM"
  // status
  // :
  // {pending: false, completed: false, cancelled: true}
}
