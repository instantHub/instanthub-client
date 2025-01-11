import React from "react";
import { useNavigate } from "react-router-dom";
import { orderCurrentStatus } from "../../helpers/helper";

const OrderCard = ({ data }) => {
  //   console.log("data", data);
  const navigate = useNavigate();

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    borderColor: `${data.status.pending && "border-blue-600"} 
    ${data.status.completed && "border-green-600"} ${
      data.status.cancelled && "border-red-600"
    }`,
  };

  return (
    <>
      <div className={`shadow cursor-pointer rounded-md px-4 py-2 text-sm max-sm:text-xs border ${style.borderColor}`}>
        <div
          onClick={() => navigate(`/admin/order-detail/${data.id}`)}
          className="flex flex-col gap-[2px]"
        >
          {/* Order and Product name and variant */}
          <div className="flex flex-col text-start gap-[2px]">
            <div>
              <span>Order ID: </span>
              <span className={`${style.boldness}`}>{data.orderId}</span>
            </div>

            <div className="flex gap-2 justify-start">
              <span className={`${style.boldness}`}>{data.productName}</span>
              <span
                className={`${style.boldness} ${
                  data.productCategory !== "Mobile" && "hidden"
                }`}
              >
                {data.variant.variantName}
              </span>
            </div>
          </div>

          {/* Prices */}
          <div className="flex gap-2">
            <div>
              <span>Product Price: </span>
              <span className={`${style.boldness}`}>{data.variant.price}</span>
            </div>
            <div>
              <span>Offered Price: </span>
              <span className={`${style.boldness}`}>{data.offerPrice}</span>
            </div>
          </div>

          {/* Schedule time */}
          <div>
            <span>Schedule Pick Up: </span>
            <span className={`${style.boldness}`}>{data.schedulePickUp}</span>
          </div>

          {/* Pin Code & Status */}
          <div className="flex gap-2 items-center">
            <div>
              <span>Pin Code: </span>
              <span className={`${style.boldness}`}>
                {data.addressDetails.pinCode}
              </span>
            </div>

            <div>
              <span>Status: </span>
              <span className={`${style.boldness}`}>
                {orderCurrentStatus(data.status)}
              </span>
            </div>
          </div>

          {/* View or Delete - Only in Laptop Mode */}
          {/* <div className="max-sm:hidden flex justify-center gap-2 py-2">
            <div className="grow">
              <Link
                to={`/admin/order-detail/${data.id}`}
                className={`font-bold p-1 rounded flex items-center 
                    justify-center gap-1 ${orderViewBtnColor(data.status)}`}
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
    </>
  );
};

export default OrderCard;

// accessoriesAvailable : (2) [{…}, {…}]
// addressDetails : {address: 'No 270 4th Main 2nd Cross', state: 'KARNATAKA', city: 'Bangalore', pinCode: 560032}
// cancelReason : "Testing cancel to delete stock"
// customerName : "Yusuf"
// deductions : (4) [{…}, {…}, {…}, {…}]
// email : "yousuf337692qureshi@gmail.com"
// id : "6776956a6783a2a7966d42d7"
// offerPrice : 4278
// orderId : "ORD250102YU097004"
// paymentMode : "Instant Cash"
// phone : 6363821097
// productBrand : "Samsung"
// productCategory : "Mobile"
// productId : {name: 'Samsung Galaxy A12', id: '665f4f923c216ac53e8c8f3e'}
// productName : "Samsung Galaxy A12"
// schedulePickUp : "January 2, 2025 6:00 PM"
// status : {pending: false, completed: false, cancelled: true}
// variant : {variantName: '4GB / 64GB ', price: 4860}
