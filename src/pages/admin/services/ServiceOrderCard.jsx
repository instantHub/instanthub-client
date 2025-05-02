import React from "react";
import { useNavigate } from "react-router-dom";
import { orderCurrentStatus } from "@utils/admin/helper";
import { generatePathWithParams } from "../../../utils/general/generatePathWithParams";
import { ROUTES } from "../../../routes";

const OrderCard = ({ data }) => {
  // console.log("data", data);
  const navigate = useNavigate();

  const image =
    data?.selectedService?.serviceCategoryId?.image ||
    data?.selectedService?.image;

  const style = {
    boldness: "font-semibold max-sm:font-norma",
    borderColor: `${data.status.pending && "border-blue-600"} 
    ${data.status.completed && "border-green-600"} ${
      data.status.cancelled && "border-red-600"
    }`,
  };

  const getServiceName = () => {
    if (data.serviceType === "DirectService") return data.selectedService.name;
    else return data.selectedService.serviceCategoryId.name;
  };

  return (
    <>
      <div
        className={`shadow flex items-center cursor-pointer rounded-md py-2 text-sm max-sm:text-xs border ${style.borderColor}`}
      >
        <div className="px-5 max-sm:px-2 mx-auto">
          <img
            src={import.meta.env.VITE_APP_BASE_URL + image}
            alt={"Servicer Category Image"}
            className={`w-[60px] h-[60px] max-sm:h-[50px] mx-auto max-sm:w-[50px]`}
            loading="lazy" // Native lazy loading
          />
        </div>
        <div
          onClick={() =>
            navigate(
              generatePathWithParams(ROUTES.admin.serviceOrderDetail, data.id)
            )
          }
          className="grow flex flex-col gap-[2px]"
        >
          {/* Order and Product name and variant */}
          <div className="flex flex-col text-start gap-[2px]">
            <div>
              <span>Service Order ID: </span>
              <span className={`${style.boldness}`}>{data.serviceOrderId}</span>
            </div>
          </div>

          {/* Prices */}
          <div
            className={`flex gap-2 max-sm:flex-col max-sm:gap-0 ${
              getServiceName().length > 16 && "flex-col gap-0"
            }`}
          >
            <div className={`flex gap-2 justify-start`}>
              <span className={``}>Service Name</span>
              <span className={`${style.boldness} `}>{getServiceName()}</span>
            </div>
            <div className={`flex gap-2 justify-start`}>
              <span>Inspection Charges: </span>
              <span className={`${style.boldness}`}>
                {data.inspectionCharges}
              </span>
            </div>
          </div>

          {/* Schedule time */}
          <div>
            <span>Schedule Date: </span>
            <span className={`${style.boldness}`}>
              {data.scheduleDate || "Not Selected"}
            </span>
          </div>

          {/* Pin Code & Status */}
          <div className="flex gap-2 items-center">
            <div>
              <span>Pin Code: </span>
              <span className={`${style.boldness}`}>
                {data?.pincode || "Not Applicable"}
              </span>
            </div>

            <div>
              <span>Status: </span>
              <span className={`${style.boldness}`}>
                {orderCurrentStatus(data.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;

// address "No 270 4th Main 2nd Cross"
// cancelReason null
// createdAt "2025-01-02T23:07:01.037Z"
// customerName "Yusuf"
// deviceInfo {deviceNameModel: 'MI Note 10s', deviceAdditionalInfo: 'Need mobile ASAP'}
// email "yousuf337692qureshi@gmail.com"
// id "67771c152654d78546d786d9"
// inspectionCharges 149
// phone 6363821097
// problems (5) [{…}, {…}, {…}, {…}, {…}]
// scheduleDate "January 4, 2025 12:00 AM"
// selectedService {_id: '6769936843734b164553c5ae', serviceCategoryId: {…}, name: 'Samsung', image: '/uploads/services/Samsung.jpg-image-1715789511888-image-1734972264790.webp', __v: 0}
// serviceAgent "Shouaib Ahmed"
// serviceCompletedOn "January 3, 2025 10:00 AM"
// serviceFinalPrice 6000
// serviceOrderId "SERORD250102YU002"
// serviceType "Brand"
// status {pending: false, completed: true, cancelled: false}
