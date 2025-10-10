import React, { useState, ChangeEvent, FormEvent, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { OrderCancellationForm } from "../OrderCancellationForm";
import { useOrderCancelMutation, useRescheduleOrderMutation } from "@api";
import { ImageIcon, InfoCircleIcon, RightTickIcon } from "@icons";
import {
  Button,
  Dropdown,
  FlexBox,
  FormInput,
  ReusableDatePicker,
  Typography,
} from "@components/general";
import { ITimeSlot, timeSlots } from "@utils/constants";
import { IOrder } from "@features/api/orders/types";
import { ImageSelection } from "@pages/admin/orders/OrderDetail";
import { toast } from "react-toastify";

type OrderCompleteFormProps = {
  orderDetail: IOrder;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setImagesSelected: React.Dispatch<SetStateAction<ImageSelection>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<SetStateAction<Date | null>>;
  finalPriceHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  deviceInfoHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  orderReceivedLoading: boolean;
};

type UploadImageProps = {
  image: "front" | "back" | "optional1" | "optional2";
  setImagesSelected: React.Dispatch<SetStateAction<ImageSelection>>;
};

type DetailWrapperProps = {
  icon: React.ComponentType;
  heading: string;
  children: React.ReactNode;
};

type DetailDivProps = {
  label: string;
  text: React.ReactNode;
  isRequired?: boolean;
  flexColSScr?: boolean;
};

export const OrderCompleteForm: React.FC<OrderCompleteFormProps> = ({
  orderDetail,
  handleSubmit,
  selectedDate,
  setSelectedDate,
  setImagesSelected,
  finalPriceHandler,
  deviceInfoHandler,
  orderReceivedLoading,
}) => {
  const [orderCancel, { isLoading: orderCancelLoading }] =
    useOrderCancelMutation();
  const navigate = useNavigate();

  const [cancelModal, setCancelModal] = useState<boolean>(false);

  const [schedulePickUp, setSchedulePickUp] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot | null>(null);

  const [rescheduleOrder, { isLoading: rescheduleLoading }] =
    useRescheduleOrderMutation();
  const [openRescheduleModal, setOpenRescheduleModal] =
    useState<boolean>(false);
  const [reschedulePickUp, setReschedulePickUp] = useState<Date | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<ITimeSlot | null>(null);
  const [rescheduleReason, setRescheduleReason] = useState<string | null>(null);

  const handleReschedule = async () => {
    if (!reschedulePickUp || !rescheduleSlot || !rescheduleReason) {
      toast.error(
        "Reschedule details are required to reschedule this order..!"
      );
      return;
    }

    try {
      await rescheduleOrder({
        id: orderDetail.id,
        body: {
          newDate: reschedulePickUp,
          newTimeSlot: rescheduleSlot?.value,
          rescheduleReason: rescheduleReason,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log("Error while rescheduling the order.", error);
      toast.error("Error while rescheduling the order, try again later.");
    }
  };

  return (
    <div className="w-full my-5">
      <hr />
      <h2 className="text-center text-xl text-wrap max-sm:text-sm my-5">
        Fill the below required details for completing Order.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w-full"
      >
        {/* Completion Detail */}
        <DetailWrapper icon={RightTickIcon} heading="Completion Details">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Order Picked By"
              isRequired={true}
              text={
                <FormInput
                  placeholder="Order Picked By"
                  required={true}
                  type="text"
                  name="pickedUpBy"
                  value={orderDetail?.assignmentStatus?.assignedTo?.name || ""}
                  size="sm"
                  disabled
                />
              }
            />
            <DetailDiv
              label="Select Pickup Time"
              isRequired
              flexColSScr
              text={
                <FlexBox gap={2}>
                  <ReusableDatePicker
                    selectedDate={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    required={true}
                  />
                  <Dropdown<ITimeSlot>
                    options={timeSlots}
                    value={selectedSlot}
                    onChange={(slot) => setSelectedSlot(slot)}
                    getOptionLabel={(option) => option.label}
                    placeholder="Choose a slot..."
                  />
                </FlexBox>
              }
            />
            <DetailDiv
              label="Purchase Price"
              isRequired={true}
              text={
                <FormInput
                  placeholder="Purchase Price"
                  required={true}
                  type="number"
                  name="finalPrice"
                  onChange={finalPriceHandler}
                  size="sm"
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Device Info */}
        <DetailWrapper icon={InfoCircleIcon} heading="Device Info">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Serial No"
              text={
                <FormInput
                  placeholder="Serial No"
                  type="text"
                  name="serialNumber"
                  onChange={deviceInfoHandler}
                  size="sm"
                />
              }
            />
            <DetailDiv
              label="IMEI No"
              text={
                <FormInput
                  placeholder="IMEI No"
                  type="text"
                  name="imeiNumber"
                  onChange={deviceInfoHandler}
                  size="sm"
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Mandatory ID Proof Images */}
        <DetailWrapper icon={ImageIcon} heading="Required Documents">
          <div className="flex flex-col gap-5 max-sm:gap-3">
            <DetailDiv
              label="Upload Front of Customer ID"
              isRequired={true}
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image="front"
                />
              }
            />
            <DetailDiv
              label="Upload Back of Customer ID"
              isRequired={true}
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image="back"
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Upload Optional Images */}
        <DetailWrapper icon={ImageIcon} heading="Optional Images">
          <div className="flex flex-col gap-5 max-sm:gap-3">
            <DetailDiv
              label="Upload Optional Image 1"
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image="optional1"
                />
              }
            />
            <DetailDiv
              label="Upload Optional Image 2"
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image="optional2"
                />
              }
            />
          </div>
        </DetailWrapper>

        <FlexBox
          justify="around"
          className="col-span-full w-full max-md:flex-col"
        >
          <Button
            type="submit"
            shape="square"
            variant="greenary"
            loading={orderReceivedLoading}
          >
            Order Complete
          </Button>

          <Button
            shape="square"
            variant="instanthub"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                `re-quote?product=${orderDetail?.productId?.uniqueURL}&variant=${orderDetail?.productDetails?.variant?.variantName}`
              );
            }}
          >
            Re-Quote
          </Button>

          <Button
            shape="square"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              setOpenRescheduleModal((prev) => !prev);
            }}
          >
            Reschedule Order
          </Button>

          <Button
            shape="square"
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              setCancelModal(true);
            }}
          >
            Cancel Order
          </Button>
        </FlexBox>
      </form>

      {cancelModal && (
        <OrderCancellationForm
          orderId={orderDetail.id}
          cancelOrder={orderCancel}
          cancelLoading={orderCancelLoading}
          closeModal={() => setCancelModal(false)}
        />
      )}

      <div className={`${!openRescheduleModal ? "hidden" : ""}`}>
        <Typography variant="h5" className="mb-4 text-center">
          Provide the Mandatory Reschedule details:{" "}
        </Typography>
        <FlexBox gap={2} className="max-md:flex-col">
          <ReusableDatePicker
            selectedDate={reschedulePickUp}
            onChange={(date) => setReschedulePickUp(date)}
            required={true}
          />
          <Dropdown<ITimeSlot>
            options={timeSlots}
            value={rescheduleSlot}
            onChange={(slot) => setRescheduleSlot(slot)}
            getOptionLabel={(option) => option.label}
            placeholder="Choose a slot..."
          />

          <FormInput
            placeholder="Reschedule Reason"
            required={true}
            type="text"
            name="reschedule_reason"
            value={rescheduleReason ?? ""}
            onChange={(e) => setRescheduleReason(e.target.value)}
            size="sm"
          />
        </FlexBox>

        <FlexBox>
          <Button
            shape="square"
            variant="greenary"
            onClick={() => handleReschedule()}
            className="mx-auto"
          >
            Submit Reschedule
          </Button>
        </FlexBox>
      </div>
    </div>
  );
};

// --- Helper Components ---

const UploadImage: React.FC<UploadImageProps> = ({
  image,
  setImagesSelected,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagesSelected((prev) => ({
        ...prev,
        [image]: e.target.files![0],
      }));
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      className="cursor-pointer border rounded px-2 py-1 max-sm:w-[90%] text-[15px] max-sm:text-sm"
      onChange={handleFileChange}
    />
  );
};

// Moved styles outside component to prevent re-creation on render
const detailWrapperStyles = {
  detailDiv: "flex items-start gap-2",
  detailIcon:
    "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
  detailHeading: "text-2xl text-start max-sm:text-lg",
  detailSubDiv: "flex flex-col",
};

const DetailWrapper: React.FC<DetailWrapperProps> = ({
  icon: Icon,
  heading,
  children,
}) => {
  return (
    <div className={detailWrapperStyles.detailDiv}>
      <div className={detailWrapperStyles.detailIcon}>
        <Icon />
      </div>
      <div className={detailWrapperStyles.detailSubDiv}>
        <p className={detailWrapperStyles.detailHeading}>{heading}</p>
        <div className={detailWrapperStyles.detailSubDiv}>{children}</div>
      </div>
    </div>
  );
};

const DetailDiv: React.FC<DetailDivProps> = ({
  label,
  text,
  isRequired,
  flexColSScr,
}) => {
  const wrapperClass = `flex gap-1 items-center ${
    flexColSScr ? "max-sm:flex-col max-sm:items-start" : ""
  }`;

  return (
    <div className={wrapperClass}>
      <span className="text-gray-500 text-sm max-sm:text-xs shrink-0">
        {label}: {isRequired && <span className="text-red-600">*</span>}
      </span>
      <span className="text-[16px] max-sm:text-sm">{text}</span>
    </div>
  );
};
