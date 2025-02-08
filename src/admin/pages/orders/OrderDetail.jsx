import React, { useEffect, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
  useOrderReceivedMutation,
  useUploadCustomerProofImageMutation,
} from "../../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loader/Loading";
import OrderCompleteForm from "../../components/OrderCompleteForm";
import { orderCurrentStatus } from "../../helpers/helper";
import { FaRegImages } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { MdCancel, MdDeleteForever, MdOutlineDevices } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { RiContactsLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsBoxSeam } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";

const OrderDetail = () => {
  const { orderId } = useParams();

  // Delete Order
  const [deleteOrder] = useDeleteOrderMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState("");

  const navigate = useNavigate();

  const { data: orderDetail, isLoading: orderDetailLoading } =
    useGetOrderQuery(orderId);
  console.log("orderDetail", orderDetail);

  const [orderReceived, { isLoading: orderReceivedLoading }] =
    useOrderReceivedMutation();

  const [finalDeductionSet, setFinalDeductionSet] = useState([]);

  // File Upload
  const [uploadCustomerProof] = useUploadCustomerProofImageMutation();

  const [imagesSelected, setImagesSelected] = useState({
    front: null,
    back: null,
    optional1: null,
    optional2: null,
  });

  const [isAccessoriesAvailable, setIsAccessoriesAvailable] = useState(false);

  // console.log("imagesSelected", imagesSelected);

  const [deviceInfo, setDeviceInfo] = useState();
  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const uploadFileHandler = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await uploadCustomerProof(formData).unwrap();
      console.log("res.image", res.image);

      return res.image;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (orderId) => {
    console.log("handledelete", orderId);
    await deleteOrder(orderId);
    navigate("/admin/orders");
  };

  const setPickUpHandler = (e) => {
    setPickedUpBy(e.target.value);
  };

  const finalPriceHandler = (e) => {
    setFinalPrice(e.target.value);
  };

  const deviceInfoHandler = (e) => {
    const { name: key, value } = e.target;
    setDeviceInfo((prev) => ({ ...prev, [key]: value }));
  };

  const downloadImage = (imageUrl, imageName) => {
    console.log(imageName);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        // link.setAttribute("download", "image.jpg"); // Change the filename if needed
        link.setAttribute("download", `${imageName}.jpg`); // Change the filename if needed
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imagesSelected.front || !imagesSelected.back) {
        toast.warning("Upload Mandatory Images");
        return;
      }

      const frontImageURL = await uploadFileHandler(imagesSelected.front);
      const backImageURL = await uploadFileHandler(imagesSelected.back);

      const optional1URL = imagesSelected.optional1
        ? await uploadFileHandler(imagesSelected.optional1)
        : null;

      const optional2URL = imagesSelected.optional2
        ? await uploadFileHandler(imagesSelected.optional2)
        : null;

      const pickedUpDetails = {
        agentName: pickedUpBy,
        pickedUpDate: selectedDate,
      };

      const formData = {
        orderId,
        customerProofFront: frontImageURL,
        customerProofBack: backImageURL,
        customerOptional1: optional1URL ? optional1URL : null,
        customerOptional2: optional2URL ? optional2URL : null,
        pickedUpDetails,
        deviceInfo,
        finalPrice,
        status: {
          pending: false,
          completed: true,
          cancelled: false,
        },
      };

      console.log("formData from OrderList handleSubmit", formData);

      const orderData = await orderReceived(formData);
      console.log("orderData", orderData);

      setPickedUpBy("");
      setFinalPrice("");
      setDeviceInfo();
      setSelectedDate();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Updating Deductions Name to Shorter Names
  useEffect(() => {
    if (orderDetail) {
      const finalDeductionSet = JSON.parse(
        JSON.stringify(orderDetail.finalDeductionSet)
      );

      // console.log("finalDeductionSet", finalDeductionSet);

      const conditionMapping = {
        flawless: "Flawless Condition",
        good: "Good Condition",
        average: "Average Condition",
        damage: "Damaged Condition",
      };

      const updatedData = finalDeductionSet.map((item) => {
        const type = item.type.toLowerCase();
        if (type.includes("problem")) {
          item.type = "Problem";
        }

        // Checking accessories for old data format
        let accessoriesLen = 0;
        let accessoriesNotAvaiLen = 0;
        // type.includes("accessories") || type.includes("accessoriesnotselected")
        if (type.includes("accessories")) {
          accessoriesLen = item.conditions.length;
        } else if (type.includes("accessoriesnotselected")) {
          accessoriesNotAvaiLen = item.conditions.length;
        }
        setIsAccessoriesAvailable(
          accessoriesLen > 0 || accessoriesNotAvaiLen > 0
        );
        // End

        item.conditions.forEach((condition) => {
          if (condition.conditionLabel) {
            const lowerLabel = condition.conditionLabel.toLowerCase();
            for (const key in conditionMapping) {
              if (lowerLabel.includes(key)) {
                condition.conditionLabel = conditionMapping[key];
                break; // Exit the loop once a match is found
              }
            }
          }
        });
        return item;
      });

      setFinalDeductionSet(updatedData);

      // console.log(updatedData);
    }
  }, [orderDetail]);

  // console.log("finalDeductionSet", orderDetail?.finalDeductionSet);
  // console.log("isAccessoriesAvailable", isAccessoriesAvailable);

  if (orderDetailLoading) return <Loading />;

  return (
    <div className="relative flex flex-col bg-secondary-light pt-2 pb-5 h-fit shadow-md justify-center items-center w-full">
      {/* Back and Delete Button */}
      <div className="relative flex justify-between w-full px-4">
        <button
          onClick={() => {
            navigate("/admin/orders");
          }}
          className="text-3xl max-sm:text-xl bg-secondary text-secondary-light rounded"
        >
          <TiArrowBackOutline />
        </button>
        <button
          onClick={() => {
            setModalOpen(true);
            setOrderToDelete(orderDetail.id);
          }}
          className="text-3xl max-sm:text-xl bg-red-600 text-secondary-light rounded"
        >
          <MdDeleteForever />
        </button>
      </div>

      {/* Order Detail */}
      <div className="flex flex-col bg-white justify-center border rounded-xl items-center w-[95%]">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w-5/6 max-sm:w-fit">
          {/* Order Info */}
          <DetailWrapper icon={IoCartOutline} heading="Order Details">
            <DetailDiv label={`Order ID`} text={orderDetail?.orderId} />
            <DetailDiv label={`Offered Price`} text={orderDetail?.offerPrice} />
            <DetailDiv
              label={`Scheduled PickUp`}
              text={orderDetail?.schedulePickUp}
            />
            <DetailDiv
              label={`Status`}
              text={orderCurrentStatus(orderDetail.status)}
            />
          </DetailWrapper>

          {/* Product Detail */}
          <DetailWrapper icon={MdOutlineDevices} heading="Product Details">
            <DetailDiv label={`Product`} text={orderDetail?.productName} />
            <div className="flex gap-4">
              <DetailDiv
                label={`Variant`}
                text={orderDetail?.variant?.variantName}
              />
              <DetailDiv label={`Price`} text={orderDetail?.variant?.price} />
            </div>
          </DetailWrapper>

          {/* Accessories Available */}
          {isAccessoriesAvailable && (
            <DetailWrapper icon={BsBoxSeam} heading="Accessories">
              {finalDeductionSet.map((deduction, i) => {
                return (
                  <div key={i}>
                    {deduction.type === "Accessories" &&
                      deduction?.conditions?.map((condition) => {
                        return (
                          <DetailDiv
                            label={condition.conditionLabel}
                            text="Available"
                          />
                        );
                      })}
                    {deduction.type === "AccessoriesNotSelected" &&
                      deduction?.conditions?.map((condition) => {
                        return (
                          <DetailDiv
                            label={condition.conditionLabel}
                            text="Not Available"
                          />
                        );
                      })}
                  </div>
                );
              })}
            </DetailWrapper>
          )}

          {/* Selected Conditions Info */}
          <DetailWrapper icon={TbListDetails} heading="Selected Conditions">
            {finalDeductionSet.map((deduction, i) => {
              return (
                <div key={i}>
                  {!deduction.type.toLowerCase().includes("accessories") &&
                    deduction?.conditions?.map((condition) => {
                      return (
                        <DetailDiv
                          label={deduction?.type}
                          text={condition.conditionLabel}
                        />
                      );
                    })}
                </div>
              );
            })}

            {finalDeductionSet.length == 0 && (
              <p className="text-gray-500 text-[16px] max-sm:text-sm">
                Data not available
              </p>
            )}
          </DetailWrapper>

          {/* Customer Details */}
          <DetailWrapper icon={RiContactsLine} heading="Customer Details">
            <DetailDiv label={`Name`} text={orderDetail?.customerName} />
            <DetailDiv label={`Phone`} text={orderDetail?.phone} />
            <DetailDiv label={`Email`} text={orderDetail?.email} />
          </DetailWrapper>

          {/* Address Detail*/}
          <DetailWrapper icon={FaMapLocationDot} heading="Address Details">
            <DetailDiv
              label={`Address`}
              text={orderDetail?.addressDetails?.address}
            />
            <div className="flex gap-4">
              <DetailDiv
                label={`City`}
                text={orderDetail?.addressDetails?.city}
              />
              <DetailDiv
                label={`State`}
                text={orderDetail?.addressDetails?.state}
              />
            </div>
            <DetailDiv
              label={`Pin Code`}
              text={orderDetail?.addressDetails?.pinCode}
            />
          </DetailWrapper>

          {/* Completed Order Details */}
          {orderDetail.status.completed && (
            <>
              {/* Completion Detail*/}
              <DetailWrapper icon={SiTicktick} heading="Completion Details">
                <DetailDiv
                  label={`Agent Name`}
                  text={orderDetail?.pickedUpDetails?.agentName}
                />
                <DetailDiv
                  label={`Picked Up On`}
                  text={orderDetail?.pickedUpDetails?.pickedUpDate}
                />

                <div className="flex gap-4">
                  <DetailDiv
                    label={`Offered Price`}
                    text={orderDetail?.offerPrice}
                  />
                  <DetailDiv
                    label={`Final Price`}
                    text={orderDetail?.finalPrice}
                  />
                </div>
              </DetailWrapper>

              {/* Device Info: */}
              <DetailWrapper icon={BsInfoCircle} heading="Device Info">
                <DetailDiv
                  label={`Serial Number`}
                  text={
                    orderDetail?.deviceInfo?.serialNumber || "Not Available"
                  }
                />
                <DetailDiv
                  label={`IMEI Number`}
                  text={orderDetail?.deviceInfo?.imeiNumber || "Not Available"}
                />
              </DetailWrapper>

              {/* Customer proof images to view or download */}
              <DetailWrapper icon={FaRegImages} heading="Customer IDs">
                {/* Customer proof images to view and download */}
                {/* <div className="flex max-sm:flex-col  items-center justify-center gap-3 p-1 rounded"> */}
                <div className="grid grid-cols-4 max-sm:grid-cols-2 items-start justify-center gap-3 p-1 rounded">
                  <CustomerIDImage
                    label="Customer ID Front"
                    imageSrc={orderDetail.customerProofFront}
                    imageAlt="Customer Front ID"
                    downloadHandler={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          orderDetail.customerProofFront,
                        `${orderDetail.customerName}-customerProofFront`
                      );
                    }}
                  />

                  <CustomerIDImage
                    label="Customer ID Back"
                    imageSrc={orderDetail.customerProofBack}
                    imageAlt="Customer Back ID"
                    downloadHandler={() => {
                      downloadImage(
                        import.meta.env.VITE_APP_BASE_URL +
                          orderDetail.customerProofBack,
                        `${orderDetail.customerName}-customerProofBack`
                      );
                    }}
                  />

                  {orderDetail.customerOptional1 && (
                    <CustomerIDImage
                      label="Optional Proof 1"
                      imageSrc={orderDetail.customerOptional1}
                      imageAlt="Optional Proof 1"
                      downloadHandler={() => {
                        downloadImage(
                          import.meta.env.VITE_APP_BASE_URL +
                            orderDetail.customerOptional1,
                          `${orderDetail.customerName}-customerOptional1`
                        );
                      }}
                    />
                  )}

                  {orderDetail.customerOptional2 && (
                    <CustomerIDImage
                      label="Optional Proof 2"
                      imageSrc={orderDetail.customerOptional2}
                      imageAlt="Optional Proof 2"
                      downloadHandler={() => {
                        downloadImage(
                          import.meta.env.VITE_APP_BASE_URL +
                            orderDetail.customerOptional2,
                          `${orderDetail.customerName}-customerOptional2`
                        );
                      }}
                    />
                  )}
                </div>
              </DetailWrapper>
            </>
          )}

          {/* Cancelled Order Reason */}
          {orderDetail.status.cancelled && (
            <DetailWrapper icon={MdCancel} heading="Cancellation Details">
              <DetailDiv
                label={`Cancel Reason`}
                text={orderDetail?.cancelReason}
              />
            </DetailWrapper>
          )}
        </div>

        {/* Order Complete Form */}
        {orderDetail.status.pending && (
          <div>
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
    </div>
  );
};

export default OrderDetail;

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

function CustomerIDImage({ label, imageSrc, imageAlt, downloadHandler }) {
  const style = {
    detailWrapper: "flex items-center gap-1",
    detailLabel: "text-gray-500 text-sm max-sm:text-xs",
    detailText: "text-[16px] max-sm:text-sm",
  };
  return (
    <div className="flex flex-col justify-center gap-2">
      <p className={`${style.detailLabel}`}>{label}</p>
      <img
        src={`${import.meta.env.VITE_APP_BASE_URL + imageSrc}`}
        alt={imageAlt}
        className="w-[100px] h-fit max-h-[250px] mx-auto "
      />
      <button
        onClick={downloadHandler}
        className="bg-green-600 px-2 rounded text-white"
      >
        Download
      </button>
    </div>
  );
}
