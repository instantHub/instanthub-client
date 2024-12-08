import React, { useRef, useState } from "react";
import {
  useOrderReceivedMutation,
  useUploadCustomerProofImageMutation,
} from "../../../features/api";
import DatePicker from "react-datepicker";
import Table from "../../components/TableView";

const OrderRecieved = ({ setIsOpen, selectedOrder }) => {
  const [uploadCustomerProof, { isLoading: uploadLoading }] =
    useUploadCustomerProofImageMutation();
  const [orderReceived, { isLoading: orderLoading }] =
    useOrderReceivedMutation();

  const [imageSelected1, setImageSelected1] = useState("");
  const [imageSelected2, setImageSelected2] = useState("");
  const [imageSelected3, setImageSelected3] = useState("");
  const [imageSelected4, setImageSelected4] = useState("");
  // console.log("imageSelected1", imageSelected1);
  // console.log("imageSelected2", imageSelected2);
  // console.log("imageSelected3", imageSelected3);
  // console.log("imageSelected4", imageSelected4);

  // Create a ref to store the reference to the file input element
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const [deviceInfo, setDeviceInfo] = useState();

  const [pickedUpBy, setPickedUpBy] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // CALENDER
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  let schedulePickUpDate;

  // Set the minimum time to 10:00 AM
  const minTime = new Date();
  minTime.setHours(10, 0, 0, 0);

  // Set the maximum time to 10:00 PM
  const maxTime = new Date();
  maxTime.setHours(22, 0, 0, 0);

  const handleTimeChange = (date) => {
    console.log("date", typeof date);

    setSelectedDate(date);

    // console.log("formattedDate", formattedDate);
    // setFormData({ ...formData, schedulePickUp: formattedDate });
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

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image upload handler call
    // const imageURL = await uploadFileHandler();
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

    // const formData = {
    //   orderId: selectedOrder.id,
    //   customerProof: imageURL,
    //   status: "received",
    // };
    const formattedDate = {
      agentName: pickedUpBy,
      pickedUpDate: `${selectedDate.toLocaleString("en-US", {
        month: "long",
      })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} ${selectedDate.toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`,
    };

    const formData = {
      orderId: selectedOrder.id,
      customerProofFront: imageURL1,
      customerProofBack: imageURL2,
      customerOptional1: imageURL3 ? imageURL3 : null,
      customerOptional2: imageURL4 ? imageURL4 : null,
      pickedUpDetails: formattedDate,
      deviceInfo,
      finalPrice,
      status: "received",
    };

    console.log("formData from OrderList handleSubmit", formData);

    try {
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

  const orderDetailHeader = [
    "Order ID",
    "Product",
    "Customer Details",
    "Address",
    "OfferPrice",
    "Schedule Time",
  ];

  const detailsRowRenderer = (order) => (
    <>
      <td className="px-4 py-2">{order.orderId}</td>
      {/* Product & Price */}
      <td className="px-4 py-2">
        {order.productName}{" "}
        <div className="flex gap-1 text-sm opacity-50 justify-center">
          {order.category === "Mobile" ? (
            <>
              <span>Variant {order.variant?.variantName}</span>
              <span>Price {order.variant?.price}</span>
            </>
          ) : (
            <span>Price {order.variant?.price}</span>
          )}
        </div>
      </td>
      {/* Customer Details */}
      <td className="px-4 py-2 flex flex-col items-center">
        <h2 className="text-xs">
          Customer Name:{" "}
          <span className="text-sm font-bold">{order.customerName}</span>
        </h2>
        <h2 className="text-xs">
          Phone: <span className="text-sm font-bold">{order.phone}</span>
        </h2>
        <h2 className="text-xs">
          Email: <span className="text-sm font-bold">{order.email}</span>
        </h2>
      </td>
      {/* Address */}
      <td className="w-[10%] px-4 py-2">
        <div className="flex flex-col">
          <span className="text-xs opacity-70">
            Address: {order.addressDetails.address}
          </span>
          <span className="text-xs opacity-70">
            State: {order.addressDetails.state}
          </span>
          <span className="text-xs opacity-70">
            City: {order.addressDetails.city}
          </span>
          <span className="text-xs opacity-70">
            Pincode: {order.addressDetails.pinCode}
          </span>
        </div>
      </td>
      <td className="px-4 py-2">{order.offerPrice}</td>
      <td className="px-1 py-2">{order.schedulePickUp}</td>
    </>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-fit">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Order Received</h2>
          <button
            onClick={() => setIsOpen(false)}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
          >
            x
          </button>
        </div>

        <Table
          headers={orderDetailHeader}
          data={[selectedOrder]}
          keyExtractor={(item) => item.id}
          rowRenderer={detailsRowRenderer}
        />

        <hr />

        <div onSubmit={handleSubmit} className="text-center mt-4">
          <form className="flex flex-col gap-4">
            {/* Mandatory Images */}
            <div className="flex flex-col gap-1 items-center">
              <div className="">
                <h2 className="text-lg">
                  Required Documents<span className="text-red-600">*</span>
                </h2>
              </div>
              {/* ID Proof Images */}
              <div className="flex">
                {/* ID Front Image */}
                <label htmlFor="name">
                  Upload Front of Customer ID
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="name"
                  ref={fileInputRef1}
                  placeholder="Enter Name"
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected1(e.target.files[0]);
                  }}
                  required
                />

                {/* ID Back Image */}
                <label htmlFor="name">
                  Upload Back of Customer ID
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  name="name"
                  id=""
                  ref={fileInputRef2}
                  placeholder="Enter Name"
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected2(e.target.files[0]);
                  }}
                  required
                />
                {/* </div> */}
              </div>
            </div>
            <hr className="w-1/3 mx-auto" />
            {/* Optional Images & Other details */}
            <div className="flex flex-col gap-1">
              <div className="">
                <h2 className="text-lg">Optional Documents</h2>
              </div>
              <div className="flex items-center">
                {/* Optional Image 1 */}
                <label htmlFor="name">Upload Optional Doc 1</label>
                <input
                  type="file"
                  name="name"
                  ref={fileInputRef3}
                  placeholder=""
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected3(e.target.files[0]);
                  }}
                />

                {/* Optional Image 2 */}
                <label htmlFor="name">Upload Optional Doc 2</label>
                <input
                  type="file"
                  name="name"
                  ref={fileInputRef4}
                  placeholder=""
                  className="border rounded px-2 py-1 w-1/3 mx-auto"
                  onChange={(e) => {
                    setImageSelected4(e.target.files[0]);
                  }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-5">
                {/* Pickup details */}
                <div className="flex items-center">
                  <label htmlFor="pickedUpBy">
                    Order Picked Up By:
                    <span className="text-red-600">* </span>
                  </label>
                  <input
                    type="text"
                    name="pickedUpBy"
                    // ref={fileInputRef3}
                    placeholder="Picked Up By Name"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setPickedUpBy(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col items-center">
                  {/* Offered Price */}
                  <div>
                    <label htmlFor="finalPrice">
                      Offered Price:{" "}
                      <span className="font-bold">
                        {selectedOrder.offerPrice}
                      </span>
                    </label>
                  </div>

                  {/* Purchase Price */}
                  <div className="flex items-center">
                    <label htmlFor="finalPrice">
                      Purchase Price:
                      <span className="text-red-600">* </span>
                    </label>
                    <input
                      type="number"
                      name="finalPrice"
                      placeholder="Purchase Price"
                      className="border rounded px-1 mx-auto"
                      onChange={(e) => {
                        setFinalPrice(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label htmlFor="datepicker">
                    Select Date and Time:
                    <span className="text-red-600">* </span>
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleTimeChange}
                    showTimeSelect
                    // timeFormat="HH:mm" // 24 hours
                    timeFormat="h:mm aa" // 12 hours
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="Time"
                    // minDate={schedulePickUpDate}
                    minDate={currentDate}
                    minTime={minTime}
                    maxTime={maxTime}
                    placeholderText="Select PickedUp Time"
                    className="border px-1 rounded"
                    required
                  />

                  {selectedDate && (
                    <p className="py-2 text-xl">
                      Picket Up time: `
                      {selectedDate.toLocaleString("en-US", {
                        month: "long",
                      })}{" "}
                      {selectedDate.getDate()}, {selectedDate.getFullYear()}{" "}
                      {selectedDate.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                      `
                    </p>
                  )}
                </div>
              </div>
              {/* serialNo & IMEI */}
              <div className="flex justify-center mt-5 gap-2 items-center">
                <div>
                  <label htmlFor="finalPrice">Serial No:</label>
                  <input
                    type="text"
                    name="serialNo"
                    placeholder="Serial No"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setDeviceInfo({
                        ...deviceInfo,
                        serialNumber: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="finalPrice">IMEI No:</label>
                  <input
                    type="text"
                    name="IMEI"
                    placeholder="IMEI No"
                    className="border rounded px-1 mx-auto"
                    onChange={(e) => {
                      setDeviceInfo({
                        ...deviceInfo,
                        imeiNumber: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <input
              type="submit"
              value={`${!orderLoading ? "Mark Received" : "Loading"} `}
              className={` ${
                !orderLoading
                  ? "bg-green-600 cursor-pointer"
                  : "bg-green-300 cursor-none"
              } border rounded px-2 py-1 w-1/5 text-white  hover:bg-green-600 mx-auto`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderRecieved;

{
  /* {!orderLoading ? (
              <input
                type="submit"
                value="Mark Received"
                className="border rounded px-2 py-1 w-1/5 bg-green-600 text-white cursor-pointer hover:bg-green-600 mx-auto"
              />
            ) : (
              <input
                type="submit"
                value="Loading"
                className="border rounded px-2 py-1 w-1/5 bg-green-300 text-white cursor-none mx-auto"
              />
            )} */
}
