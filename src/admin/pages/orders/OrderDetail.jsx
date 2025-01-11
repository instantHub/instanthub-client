import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
  useOrderReceivedMutation,
  useUploadCustomerProofImageMutation,
} from "../../../features/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
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
  // console.log("orderDetail", orderDetail);

  const [orderReceived, { isLoading: orderReceivedLoading }] =
    useOrderReceivedMutation();

  const [finalDeductionSet, setFinalDeductionSet] = useState([]);

  // File Upload
  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();
  const [imageSelected1, setImageSelected1] = useState(null);
  const [imageSelected2, setImageSelected2] = useState(null);
  const [imageSelected3, setImageSelected3] = useState(null);
  const [imageSelected4, setImageSelected4] = useState(null);

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [deviceInfo, setDeviceInfo] = useState();
  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTimeChange = (date) => {
    // console.log("date", date);
    // const formattedDate = {
    //   agentName: pickedUpBy,
    //   pickedUpDate: `${selectedDate.toLocaleString("en-US", {
    //     month: "long",
    //   })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
    //     "en-US",
    //     { hour: "numeric", minute: "numeric", hour12: true }
    //   )}`,
    // };

    setSelectedDate(date);
  };

  const uploadFileHandler = async (image) => {
    const formData = new FormData();
    if (image === "front") {
      formData.append("image", imageSelected1);
    } else if (image === "back") {
      formData.append("image", imageSelected2);
    } else if (image === "optional1") {
      formData.append("image", imageSelected3);
    } else if (image === "optional2") {
      formData.append("image", imageSelected4);
    }
    // formData.append("image", imageSelected1);

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
    const key = e.target.name;
    const value = e.target.value;
    setDeviceInfo((prev) => {
      return { ...prev, [key]: value };
    });
  };
  // console.log("device info", deviceInfo);

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
      if (!imageSelected1 || !imageSelected2) {
        toast.warning("Upload Mandatory Images");
        return;
      }

      // Image upload handler call
      const imageURL1 = await uploadFileHandler("front");
      const imageURL2 = await uploadFileHandler("back");

      let imageURL3, imageURL4;
      if (imageSelected3) {
        imageURL3 = await uploadFileHandler("optional1");
        console.log("imageURL3", imageURL3);
      }
      if (imageSelected4) {
        imageURL4 = await uploadFileHandler("optional2");
        console.log("imageURL4", imageURL4);
      }

      console.log("handlesubmit ", imageURL1, imageURL2);

      const pickedUpDetails = {
        agentName: pickedUpBy,
        pickedUpDate: `${selectedDate.toLocaleString("en-US", {
          month: "long",
        })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
          "en-US",
          { hour: "numeric", minute: "numeric", hour12: true }
        )}`,
      };

      const formData = {
        orderId,
        customerProofFront: imageURL1,
        customerProofBack: imageURL2,
        customerOptional1: imageURL3 ? imageURL3 : null,
        customerOptional2: imageURL4 ? imageURL4 : null,
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

      // try {
      const orderData = await orderReceived(formData);
      console.log("orderData", orderData);

      setIsOpen(false);

      // Clear the value of the file input
      fileInputRef1.current.value = "";
      fileInputRef2.current.value = "";
      fileInputRef3.current.value = "";
      fileInputRef4.current.value = "";
      // Mark the file input as required again
      fileInputRef1.current.required = true;
      fileInputRef2.current.required = true;
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

      console.log("finalDeductionSet", finalDeductionSet);

      const conditionMapping = {
        flawless: "Flawless Condition",
        good: "Good Condition",
        average: "Average Condition",
        damage: "Damaged Condition",
        bill: "Product Bill",
        box: "Product Box",
        "charger available": "Product Charger",
        "original charger": "Product Charger",
      };

      const updatedData = finalDeductionSet.map((item) => {
        const type = item.type.toLowerCase();
        if (type.includes("problem")) {
          item.type = "Problem";
        }
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

      console.log(updatedData);
    }
  }, [orderDetail]);

  // console.log("finalDeductionSet", orderDetail?.finalDeductionSet);

  if (orderDetailLoading) return <Loading />;

  return (
    <div className="relative flex flex-col bg-secondary-light pt-2 pb-5 h-fit shadow-md justify-center items-center w-full">
      {/* Back and Delete */}
      {/* <div className="relative w-full left-[3%]"> */}
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
        {/* <div className="my-10 grid grid-cols-2 max-sm:grid-cols-1 w-full"> */}
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
            {finalDeductionSet.length == 0 && (
              <p className="text-gray-500 text-[16px] max-sm:text-sm">
                Data not available
              </p>
            )}
          </DetailWrapper>

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

        {/* Form handler */}
        {orderDetail.status.pending && (
          <div>
            {/* Order Complete Form */}
            <OrderCompleteForm
              orderDetail={orderDetail}
              handleSubmit={handleSubmit}
              fileInputRef1={fileInputRef1}
              setImageSelected1={setImageSelected1}
              fileInputRef2={fileInputRef2}
              setImageSelected2={setImageSelected2}
              fileInputRef3={fileInputRef3}
              setImageSelected3={setImageSelected3}
              fileInputRef4={fileInputRef4}
              setImageSelected4={setImageSelected4}
              setPickUpHandler={setPickUpHandler}
              finalPriceHandler={finalPriceHandler}
              selectedDate={selectedDate}
              handleTimeChange={handleTimeChange}
              deviceInfoHandler={deviceInfoHandler}
              orderReceivedLoading={orderReceivedLoading}
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
        description="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* {orderDetail?.status?.pending && (
        <OrderCancellationForm
          cancelHandler={handleCancelOrder}
          handleReasonChange={handleReasonChange}
        />
      )} */}
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
