import { useState } from "react";
import { OrderCancellationForm } from "./OrderCancellationForm";
import { useOrderCancelMutation } from "@api";
import { DateAndTime, InputSubmitBtn } from "@components/user";
import { ImageIcon, InfoCircleIcon, RightTickIcon } from "@icons";
import { Button, FlexBox, FormInput } from "@components/general";
import { useNavigate } from "react-router-dom";

export const OrderCompleteForm = ({
  orderDetail,
  handleSubmit,
  setImagesSelected,
  setPickUpHandler,
  finalPriceHandler,
  setSelectedDate,
  deviceInfoHandler,
  orderReceivedLoading,
}) => {
  const [orderCancel, { isLoading: orderCancelLoading }] =
    useOrderCancelMutation();

  const navigate = useNavigate();

  const [cancelModal, setCancelModal] = useState(false);

  return (
    <div className="w-full my-5">
      <hr />
      <h2 className="text-center  text-xl text-wrap max-sm:text-sm my-5">
        Fill the below required details for completing Order.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w max-sm:w-fit"
      >
        {/* Completion Detail */}
        <DetailWrapper icon={RightTickIcon} heading="Completion Details">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Order Picked By"
              isRequired={true}
              flexColSScr={false}
              text={
                <FormInput
                  placeholder="Order Picked By"
                  isRequired={true}
                  type={"text"}
                  name="pickedUpBy"
                  value={orderDetail?.assignmentStatus?.assignedTo?.name}
                  size="sm"
                  disabled
                  // changeHandler={setPickUpHandler}
                />
                // <InputDiv
                //   // placeholder="Order Picked By"
                //   // isRequired={true}
                //   // type={"text"}
                //   // name="pickedUpBy"
                //   value={orderDetail?.assignmentStatus?.assignedTo?.name}
                //   // changeHandler={setPickUpHandler}
                // />
              }
            />

            <DetailDiv
              label="Select Pickup Time"
              flexColSScr={true}
              text={
                // {/* Date Picker */}
                <DateAndTime
                  label={false}
                  showPreviousDate={true}
                  setSchedule={setSelectedDate}
                />
              }
            />
            <DetailDiv
              label="Purchase Price"
              isRequired={true}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Purchase Price"
                  isRequired={true}
                  type={"number"}
                  name="finalPrice"
                  changeHandler={finalPriceHandler}
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
              isRequired={false}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Serial No"
                  type={"text"}
                  name="serialNumber"
                  changeHandler={deviceInfoHandler}
                />
              }
            />
            <DetailDiv
              label="IMEI No"
              isRequired={false}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="IMEI No"
                  type={"text"}
                  name="imeiNumber"
                  changeHandler={deviceInfoHandler}
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
                  image={"front"}
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
                  image={"back"}
                />
              }
            />
          </div>
        </DetailWrapper>

        {/* Upload Optional Images */}
        <DetailWrapper icon={ImageIcon} heading="Optional Images">
          <div className="flex flex-col gap-5 max-sm:gap-3">
            <DetailDiv
              label={`Upload Optional Image 1`}
              isRequired={false}
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image={"optional1"}
                />
              }
            />
            <DetailDiv
              label={`Upload Optional Image 2`}
              isRequired={false}
              flexColSScr={true}
              text={
                <UploadImage
                  setImagesSelected={setImagesSelected}
                  image={"optional2"}
                />
              }
            />
          </div>
        </DetailWrapper>

        <FlexBox justify="around" className="w-full max-md:flex-col">
          {/* Submit Order Completion */}
          <Button
            type="submit"
            shape="square"
            variant="greenary"
            loading={orderReceivedLoading}
          >
            Order Complete
          </Button>

          {/* Re-Quote */}
          <Button
            shape="square"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                `re-quote?product=${orderDetail?.productId?.uniqueURL}&variant=${orderDetail?.variant?.variantName}`
              );
            }}
          >
            Re-Quote
          </Button>

          {/* Cancel confirmation */}
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
    </div>
  );
};

function UploadImage({ image, setImagesSelected }) {
  return (
    <div className="flex items-center max-sm:items-start max-sm:flex-col gap-2 max-sm:gap-0">
      <input
        type="file"
        className="cursor-pointer border rounded px-2 py-1 max-sm:w-[90%] text-[15px] max-sm:text-sm"
        onChange={(e) => {
          setImagesSelected((prev) => ({
            ...prev,
            [image]: e.target.files[0],
          }));
        }}
      />
    </div>
  );
}

function InputDiv({
  label,
  placeholder,
  isRequired,
  type,
  name,
  changeHandler,
}) {
  console.log(label, isRequired);
  return (
    <div className="flex items-center gap-1">
      <label htmlFor={name} className="text-lg flex max-sm:text-sm">
        <span>{label}</span>
        {/* {isRequired && <span className="text-red-600">* </span>} */}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="border rounded p-1 text-sm"
        onChange={changeHandler}
        required={isRequired}
      />
    </div>
  );
}

function DetailWrapper({ icon: Icon, heading, children }) {
  const style = {
    detailDiv: "flex items-start gap-2",
    detailIcon:
      "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
    detailHeading: "text-2xl  text-start max-sm:text-lg",
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

function DetailDiv({ label, text, isRequired, flexColSScr }) {
  const style = {
    detailWrapper: `flex gap-1 items-center ${
      flexColSScr && "max-sm:flex-col max-sm:items-start"
    }`,
    detailLabel: "text-gray-500  text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm",
  };
  return (
    <div className={`${style.detailWrapper}`}>
      <span className={`${style.detailLabel}`}>
        {label}: {isRequired && <span className="text-red-600">* </span>}
      </span>
      <span className={`${style.detailText}`}>{text}</span>
    </div>
  );
}
