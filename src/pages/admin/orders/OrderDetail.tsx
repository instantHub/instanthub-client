import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
  useOrderReceivedMutation,
  useUploadCustomerProofImageMutation,
} from "@api";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "@components/user";
import { orderCurrentStatus } from "@utils/admin";
import { toast } from "react-toastify";
import {
  AssignAgent,
  ConfirmationModal,
  OrderCompleteForm,
} from "@components/admin";
import { ROUTES } from "@routes";
import {
  ArrowLeftIcon,
  CartIcon,
  CloseIcon,
  ContactIcon,
  DeleteForeverIcon,
  ImageIcon,
  InfoCircleIcon,
  ListIndefiniteIcon,
  MapIcon,
  ProductIcon,
  RightTickIcon,
} from "@icons";
import {
  IDeviceInfo,
  IOrderStatus,
  IPickedUpDetails,
  ORDER_STATUS,
} from "@features/api/ordersApi/types";
import { CustomerIDImage, DetailDiv, DetailWrapper } from "./components";
import { Button, FlexBox } from "@components/general";

// Type Definitions
interface ImageSelection {
  front: File | null;
  back: File | null;
  optional1: File | null;
  optional2: File | null;
}

interface FormData {
  orderId: string;
  customerProofFront: string;
  customerProofBack: string;
  customerOptional1: string | null;
  customerOptional2: string | null;
  pickedUpDetails: IPickedUpDetails;
  deviceInfo?: IDeviceInfo;
  finalPrice: string;
  status: ORDER_STATUS;
}

// Constants
const CONDITION_MAPPING = {
  flawless: "Flawless Condition",
  good: "Good Condition",
  average: "Average Condition",
  damage: "Damaged Condition",
} as const;

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// Component
export const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  // API Hooks
  const { data: orderDetail, isLoading: orderDetailLoading } = useGetOrderQuery(
    orderId!
  );
  console.log("orderDetail", orderDetail);

  const [deleteOrder] = useDeleteOrderMutation();
  const [orderReceived, { isLoading: orderReceivedLoading }] =
    useOrderReceivedMutation();
  const [uploadCustomerProof] = useUploadCustomerProofImageMutation();

  // State
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [orderToDelete, setOrderToDelete] = useState<string>("");
  const [imagesSelected, setImagesSelected] = useState<ImageSelection>({
    front: null,
    back: null,
    optional1: null,
    optional2: null,
  });
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo>({});
  const [pickedUpBy, setPickedUpBy] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Memoized processed deduction set
  const finalDeductionSet = useMemo(() => {
    if (!orderDetail?.finalDeductionSet) return [];

    return orderDetail.finalDeductionSet.map((item) => {
      const processedItem = { ...item };
      const type = item.type.toLowerCase();

      if (type.includes("problem")) {
        processedItem.type = "Problem";
      }

      processedItem.conditions = processedItem.conditions.map((condition) => {
        if (condition.conditionLabel) {
          const lowerLabel = condition.conditionLabel.toLowerCase();
          for (const [key, value] of Object.entries(CONDITION_MAPPING)) {
            if (lowerLabel.includes(key)) {
              return { ...condition, conditionLabel: value };
            }
          }
        }
        return condition;
      });

      return processedItem;
    });
  }, [orderDetail?.finalDeductionSet]);

  // Event Handlers
  const handleGoBack = useCallback(() => {
    navigate(ROUTES.admin.ordersList);
  }, [navigate]);

  const handleDeleteClick = useCallback(() => {
    if (orderDetail) {
      setModalOpen(true);
      setOrderToDelete(orderDetail.id);
    }
  }, [orderDetail]);

  const handleDelete = useCallback(
    async (orderId: string) => {
      try {
        await deleteOrder(orderId);
        navigate(ROUTES.admin.ordersList);
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete order");
      }
    },
    [deleteOrder, navigate]
  );

  const setPickUpHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPickedUpBy(e.target.value);
    },
    []
  );

  const finalPriceHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFinalPrice(e.target.value);
    },
    []
  );

  const deviceInfoHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDeviceInfo((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const downloadImage = useCallback(
    async (imageUrl: string, imageName: string) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${imageName}.jpg`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
        toast.error("Failed to download image");
      }
    },
    []
  );

  const uploadFileHandler = useCallback(
    async (image: File): Promise<string> => {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await uploadCustomerProof(formData).unwrap();
        return res.image;
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Failed to upload image");
      }
    },
    [uploadCustomerProof]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!orderId || !selectedDate) return;

      try {
        if (!imagesSelected.front || !imagesSelected.back) {
          toast.warning("Upload Mandatory Images");
          return;
        }

        const [frontImageURL, backImageURL, optional1URL, optional2URL] =
          await Promise.all([
            uploadFileHandler(imagesSelected.front),
            uploadFileHandler(imagesSelected.back),
            imagesSelected.optional1
              ? uploadFileHandler(imagesSelected.optional1)
              : Promise.resolve(null),
            imagesSelected.optional2
              ? uploadFileHandler(imagesSelected.optional2)
              : Promise.resolve(null),
          ]);

        const pickedUpDetails: IPickedUpDetails = {
          agentName: pickedUpBy,
          pickedUpDate: selectedDate,
          agentAssigned: true,
        };

        const formData: FormData = {
          orderId,
          customerProofFront: frontImageURL,
          customerProofBack: backImageURL,
          customerOptional1: optional1URL,
          customerOptional2: optional2URL,
          pickedUpDetails,
          deviceInfo,
          finalPrice,
          status: ORDER_STATUS.COMPLETED,
        };

        console.log("formData from OrderList handleSubmit", formData);

        await orderReceived(formData);

        // Reset form
        setPickedUpBy("");
        setFinalPrice("");
        setDeviceInfo({});
        setSelectedDate(null);
        setImagesSelected({
          front: null,
          back: null,
          optional1: null,
          optional2: null,
        });

        toast.success("Order completed successfully");
      } catch (error) {
        console.error("Submit error:", error);
        toast.error("Failed to complete order");
      }
    },
    [
      orderId,
      selectedDate,
      imagesSelected,
      uploadFileHandler,
      pickedUpBy,
      deviceInfo,
      finalPrice,
      orderReceived,
    ]
  );

  if (orderDetailLoading) return <Loading />;

  if (!orderDetail) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  console.log("finalDeductionSet", finalDeductionSet);

  return (
    <FlexBox direction="col" gap={2}>
      <FlexBox className="justify-between w-full px-4">
        <Button
          onClick={handleGoBack}
          size="sm"
          shape="square"
          variant="secondary"
          leftIcon={<ArrowLeftIcon size={24} />}
        >
          Back
        </Button>
        <Button
          onClick={handleDeleteClick}
          size="sm"
          shape="square"
          variant="danger"
          rightIcon={<DeleteForeverIcon size={18} />}
        >
          Delete
        </Button>
      </FlexBox>

      {/* Order Detail Content */}
      <FlexBox direction="col" className=" bg-white border rounded-xl w-[95%]">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w-5/6 max-sm:w-fit">
          {/* Order Info */}
          <DetailWrapper icon={CartIcon} heading="Order Details">
            <DetailDiv label="Order ID" text={orderDetail.orderId} />
            <DetailDiv
              label="Offered Price"
              text={orderDetail.offerPrice.toString()}
            />
            <DetailDiv
              label="Scheduled PickUp"
              text={orderDetail.schedulePickUp}
            />
            <DetailDiv
              label="Status"
              text={orderCurrentStatus(orderDetail.status)}
            />
          </DetailWrapper>

          {/* Product Detail */}
          <DetailWrapper icon={ProductIcon} heading="Product Details">
            <DetailDiv label="Product" text={orderDetail.productName} />
            <div className="flex gap-4">
              <DetailDiv
                label="Variant"
                text={orderDetail.variant.variantName}
              />
              <DetailDiv
                label="Price"
                text={orderDetail.variant.price.toString()}
              />
            </div>
          </DetailWrapper>

          {/* Selected Conditions Info */}
          <DetailWrapper
            icon={ListIndefiniteIcon}
            heading="Selected Conditions"
          >
            {finalDeductionSet.length > 0 ? (
              finalDeductionSet.map((deduction, i) => (
                <div key={i}>
                  {deduction.conditions.map((condition) => (
                    <DetailDiv
                      key={condition.conditionLabel}
                      label={deduction.type}
                      text={condition.conditionLabel}
                    />
                  ))}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-[16px] max-sm:text-sm">
                Data not available
              </p>
            )}
          </DetailWrapper>

          {/* Customer Details */}
          <DetailWrapper icon={ContactIcon} heading="Customer Details">
            <DetailDiv label="Name" text={orderDetail.customerName} />
            <DetailDiv label="Phone" text={orderDetail.phone} />
            <DetailDiv label="Email" text={orderDetail.email} />
          </DetailWrapper>

          {/* Address Detail */}
          <DetailWrapper icon={MapIcon} heading="Address Details">
            <DetailDiv
              label="Address"
              text={orderDetail.addressDetails.address}
            />
            <div className="flex gap-4">
              <DetailDiv label="City" text={orderDetail.addressDetails.city} />
              <DetailDiv
                label="State"
                text={orderDetail.addressDetails.state}
              />
            </div>
            <DetailDiv
              label="Pin Code"
              text={orderDetail.addressDetails.pinCode}
            />
          </DetailWrapper>

          {/* Completed Order Details */}
          {orderDetail.status === ORDER_STATUS.COMPLETED &&
            orderDetail.pickedUpDetails && (
              <>
                {/* Completion Detail */}
                <DetailWrapper
                  icon={RightTickIcon}
                  heading="Completion Details"
                >
                  <DetailDiv
                    label="Agent Name"
                    text={orderDetail.pickedUpDetails.agentName}
                  />
                  <DetailDiv
                    label="Picked Up On"
                    text={orderDetail.pickedUpDetails.pickedUpDate}
                  />
                  <div className="flex gap-4">
                    <DetailDiv
                      label="Offered Price"
                      text={orderDetail.offerPrice.toString()}
                    />
                    <DetailDiv
                      label="Final Price"
                      text={orderDetail.finalPrice?.toString() || "N/A"}
                    />
                  </div>
                </DetailWrapper>

                {/* Device Info */}
                <DetailWrapper icon={InfoCircleIcon} heading="Device Info">
                  <DetailDiv
                    label="Serial Number"
                    text={
                      orderDetail.deviceInfo?.serialNumber || "Not Available"
                    }
                  />
                  <DetailDiv
                    label="IMEI Number"
                    text={orderDetail.deviceInfo?.imeiNumber || "Not Available"}
                  />
                </DetailWrapper>

                {/* Customer proof images */}
                {(orderDetail.customerProofFront ||
                  orderDetail.customerProofBack) && (
                  <DetailWrapper icon={ImageIcon} heading="Customer IDs">
                    <div className="grid grid-cols-4 max-sm:grid-cols-2 items-start justify-center gap-3 p-1 rounded">
                      {orderDetail.customerProofFront && (
                        <CustomerIDImage
                          label="Customer ID Front"
                          imageSrc={orderDetail.customerProofFront}
                          imageAlt="Customer Front ID"
                          downloadHandler={() =>
                            downloadImage(
                              BASE_URL + orderDetail.customerProofFront!,
                              `${orderDetail.customerName}-customerProofFront`
                            )
                          }
                        />
                      )}

                      {orderDetail.customerProofBack && (
                        <CustomerIDImage
                          label="Customer ID Back"
                          imageSrc={orderDetail.customerProofBack}
                          imageAlt="Customer Back ID"
                          downloadHandler={() =>
                            downloadImage(
                              BASE_URL + orderDetail.customerProofBack!,
                              `${orderDetail.customerName}-customerProofBack`
                            )
                          }
                        />
                      )}

                      {orderDetail.customerOptional1 && (
                        <CustomerIDImage
                          label="Optional Proof 1"
                          imageSrc={orderDetail.customerOptional1}
                          imageAlt="Optional Proof 1"
                          downloadHandler={() =>
                            downloadImage(
                              BASE_URL + orderDetail.customerOptional1!,
                              `${orderDetail.customerName}-customerOptional1`
                            )
                          }
                        />
                      )}

                      {orderDetail.customerOptional2 && (
                        <CustomerIDImage
                          label="Optional Proof 2"
                          imageSrc={orderDetail.customerOptional2}
                          imageAlt="Optional Proof 2"
                          downloadHandler={() =>
                            downloadImage(
                              BASE_URL + orderDetail.customerOptional2!,
                              `${orderDetail.customerName}-customerOptional2`
                            )
                          }
                        />
                      )}
                    </div>
                  </DetailWrapper>
                )}
              </>
            )}

          {/* Cancelled Order Reason */}
          {orderDetail.status === ORDER_STATUS.CANCELLED &&
            orderDetail.cancelReason && (
              <DetailWrapper icon={CloseIcon} heading="Cancellation Details">
                <DetailDiv
                  label="Cancel Reason"
                  text={orderDetail.cancelReason}
                />
              </DetailWrapper>
            )}
        </div>

        {/* Order Complete Form for Pending Orders */}
        {orderDetail.status === ORDER_STATUS.PENDING && (
          <div>
            <AssignAgent orderDetail={orderDetail} />
            <OrderCompleteForm
              orderDetail={orderDetail}
              handleSubmit={handleSubmit}
              setImagesSelected={setImagesSelected}
              setPickUpHandler={setPickUpHandler}
              finalPriceHandler={finalPriceHandler}
              setSelectedDate={setSelectedDate}
              deviceInfoHandler={deviceInfoHandler}
              orderReceivedLoading={orderReceivedLoading}
            />
          </div>
        )}
      </FlexBox>

      {/* Confirmation Modal */}
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
    </FlexBox>
  );
};
