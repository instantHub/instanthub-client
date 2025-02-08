import React, { useState } from "react";
import {
  useDeleteServiceOrderMutation,
  useGetServiceOrderQuery,
} from "../../../features/api/services/servicesApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loader/Loading";
import { orderCurrentStatus } from "../../helpers/helper";
import { IoCartOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { MdCancel, MdDeleteForever, MdOutlineDevices } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsBoxSeam } from "react-icons/bs";
import ConfirmationModal from "../../components/ConfirmationModal";
import ServiceCompletionForm from "./ServiceCompletionForm";
import { toast } from "react-toastify";

const ServiceOrderDetail = () => {
  const { serviceOrderId } = useParams();

  const navigate = useNavigate();

  const { data: serviceOrderDetail, isLoading: serviceOrderDetailLoading } =
    useGetServiceOrderQuery(serviceOrderId);

  console.log("serviceOrderDetail", serviceOrderDetail);

  // Delete Order
  const [deleteServiceOrder] = useDeleteServiceOrderMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const handleDelete = async (serviceOrderId) => {
    console.log("handleDelete serviceOrderId", serviceOrderId);
    try {
      const deletedService = await deleteServiceOrder(serviceOrderId);
      navigate("/admin/services-Orders");
    } catch (error) {
      toast.error("Service Order couldn't be deleted..!!");
    }
  };

  const getServiceName = () => {
    if (serviceOrderDetail.serviceType === "DirectService")
      return serviceOrderDetail.selectedService.name;
    else return serviceOrderDetail.selectedService.serviceCategoryId.name;
  };

  if (serviceOrderDetailLoading) return <Loading />;

  return (
    <div className="relative flex flex-col bg-secondary-light pt-2 pb-5 h-fit shadow-md justify-center items-center w-full">
      {/* Back and Delete */}
      <div className="relative flex justify-between w-full px-4">
        <button
          onClick={() => {
            navigate("/admin/services-orders");
          }}
          className="text-3xl max-sm:text-xl bg-secondary text-secondary-light rounded"
        >
          <TiArrowBackOutline />
        </button>
        <button
          onClick={() => {
            setModalOpen(true);
            setOrderToDelete(serviceOrderDetail.id);
          }}
          className="text-3xl max-sm:text-xl bg-red-600 text-secondary-light rounded"
        >
          <MdDeleteForever />
        </button>
      </div>

      {/* Order Detail */}
      <div className="flex flex-col bg-white justify-center border rounded-xl items-center w-[95%]">
        {/* <div className="my-10 grid grid-cols-2 max-sm:grid-cols-1 w-full"> */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w-5/6 max-sm:w-fit">
          {/* Order Info */}
          <DetailWrapper icon={IoCartOutline} heading="Service Order Details">
            <DetailDiv
              label={`Service Order ID`}
              text={serviceOrderDetail?.serviceOrderId}
            />
            <DetailDiv
              label={`Inspection Charges`}
              text={serviceOrderDetail?.inspectionCharges}
            />
            <DetailDiv
              label={`Scheduled Date`}
              text={serviceOrderDetail?.scheduleDate || "Not Selected"}
            />
            <DetailDiv
              label={`Status`}
              text={orderCurrentStatus(serviceOrderDetail.status)}
            />
          </DetailWrapper>

          {/* Product Detail */}
          <DetailWrapper icon={MdOutlineDevices} heading="Service Details">
            <DetailDiv label={`Service Name`} text={getServiceName()} />
            {serviceOrderDetail.serviceType === "Brand" && (
              <div className="flex flex-col">
                <DetailDiv
                  label={`Selected Brand`}
                  text={serviceOrderDetail?.selectedService?.name}
                />
                <DetailDiv
                  label={`Device Model`}
                  text={
                    serviceOrderDetail?.deviceInfo?.deviceNameModel ||
                    "Not Available"
                  }
                />
                <DetailDiv
                  label={`Device Additional Info`}
                  text={
                    serviceOrderDetail?.deviceInfo?.deviceAdditionalInfo ||
                    "Not Available"
                  }
                />
              </div>
            )}
          </DetailWrapper>

          {/* Problems for Brand Services */}
          {serviceOrderDetail.serviceType === "Brand" && (
            <DetailWrapper icon={BsBoxSeam} heading="Problems">
              {serviceOrderDetail?.problems?.map((problem, i) => (
                <DetailDiv label={"Problem"} text={problem.serviceProblem} />
              ))}
            </DetailWrapper>
          )}

          {/* Customer Details */}
          <DetailWrapper icon={RiContactsLine} heading="Customer Details">
            <DetailDiv label={`Name`} text={serviceOrderDetail?.customerName} />
            <DetailDiv label={`Phone`} text={serviceOrderDetail?.phone} />
            <DetailDiv label={`Email`} text={serviceOrderDetail?.email} />
          </DetailWrapper>

          {/* Address Detail*/}
          <DetailWrapper icon={FaMapLocationDot} heading="Address Details">
            <DetailDiv label={`Address`} text={serviceOrderDetail?.address} />
          </DetailWrapper>

          {/* Completed Order Details */}
          {serviceOrderDetail.status.completed && (
            <>
              {/* Completion Detail*/}
              <DetailWrapper icon={SiTicktick} heading="Completion Details">
                <DetailDiv
                  label={`Agent Name`}
                  text={serviceOrderDetail?.serviceAgent}
                />
                <DetailDiv
                  label={`Service Completed On`}
                  text={serviceOrderDetail?.serviceCompletedOn}
                />

                <DetailDiv
                  label={`Service Final Price`}
                  text={serviceOrderDetail?.serviceFinalPrice}
                />
                {serviceOrderDetail.serviceType === "Brand" &&
                  serviceOrderDetail?.additionalServices?.map((addService) => (
                    <>
                      <p>Addtional Services Provided</p>
                      <DetailDiv
                        label="Service & Price"
                        text={`${addService.name} - ${addService.price} /-`}
                      />
                    </>
                  ))}
              </DetailWrapper>
            </>
          )}

          {/* Cancelled Order Reason */}
          {serviceOrderDetail.status.cancelled && (
            <DetailWrapper icon={MdCancel} heading="Cancellation Details">
              <DetailDiv
                label={`Cancel Reason`}
                text={serviceOrderDetail?.cancelReason}
              />
            </DetailWrapper>
          )}
        </div>

        {/* Service Complete Form */}
        {serviceOrderDetail.status.pending && (
          <div>
            <ServiceCompletionForm
              serviceOrderDetail={serviceOrderDetail}
              serviceOrderId={serviceOrderId}
              DetailWrapper={DetailWrapper}
              DetailDiv={DetailDiv}
            />
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        itemToDelete={orderToDelete}
        title="Confirm Deletion"
        detail={`You are about to delete Service Order: ${serviceOrderDetail.serviceOrderId}`}
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ServiceOrderDetail;

function DetailWrapper({ icon: Icon, heading, children }) {
  const style = {
    detailDiv: "flex items-start gap-2",
    detailIcon:
      "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
    detailHeading: "text-2xl font-serif text-start max-sm:text-lg",
    detailSubDiv: "flex flex-col",
  };

  return (
    <div className={style.detailDiv}>
      <div className={style.detailIcon}>
        <Icon />
      </div>
      <div className={style.detailSubDiv}>
        <p className={style.detailHeading}>{heading}</p>
        <div className={style.detailSubDiv}>{children}</div>
      </div>
    </div>
  );
}

function DetailDiv({ label, text }) {
  const wideContent = label === "Address" || label === "Cancel Reason";
  const style = {
    detailWrapper: `flex  ${
      wideContent ? "items-start" : "items-center"
    } gap-1`,
    detailLabel: "text-gray-500 text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm text-wrap max-sm:max-w-[200px]",
  };
  return (
    <div className={`${style.detailWrapper}`}>
      <span className={`${style.detailLabel}`}>{label}:</span>
      <span className={`${style.detailText}`}>{text}</span>
    </div>
  );
}
