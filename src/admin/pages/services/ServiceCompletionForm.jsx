import React, { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  useCancelServiceOrderMutation,
  useServiceOrderCompleteMutation,
} from "../../../features/api/services/servicesApi";
import OrderCancellationForm from "../../components/OrderCancellationForm";
import DateAndTime from "../../../components/DateAndTime/DateAndTime";
import { SubmitButton } from "../../components/SubmitButton";

const ServiceCompletionForm = ({
  serviceOrderDetail,
  serviceOrderId,
  DetailWrapper,
  DetailDiv,
}) => {
  const [cancelServiceOrder, { isLoading: cancelServiceOrderLoading }] =
    useCancelServiceOrderMutation();

  const [serviceOrderComplete, { isLoading: orderCompleteLoading }] =
    useServiceOrderCompleteMutation();

  const [serviceFinalPrice, setServiceFinalPrice] = useState("");
  const [serviceAgent, setServiceAgent] = useState("");

  const [serviceCompletedOn, setServiceCompletedOn] = useState(null);

  const [cancelModal, setCancelModal] = useState(false);

  // Additional Services Done
  const [additionalServices, setAdditionalServices] = useState([
    { name: "", price: 0 },
  ]);

  // Handler to add a new service entry
  const addService = (e) => {
    e.preventDefault();
    setAdditionalServices([...additionalServices, { name: "", price: "" }]);
  };

  // Handler to remove a service entry
  const removeService = (index) => {
    const newServices = additionalServices.filter((_, i) => i !== index);
    setAdditionalServices(newServices);
  };

  // Handler to update service details
  const handleServiceChange = (index, field, value) => {
    const newServices = [...additionalServices];
    newServices[index][field] = value;
    setAdditionalServices(newServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");

    // console.log(
    //   serviceFinalPrice,
    //   serviceAgent,
    //   serviceCompletedOn,
    //   additionalServices
    // );

    let formData = {
      serviceFinalPrice,
      serviceAgent,
      serviceCompletedOn,
      status: {
        pending: false,
        completed: true,
        cancelled: false,
      },
    };

    if (serviceOrderDetail.serviceType.toLowerCase().includes("brand")) {
      // let blankService = additionalServices.find((as) => as.name.length <= 0);
      let blankService = additionalServices[0].name.length <= 0;
      if (!blankService) {
        formData.additionalServices = additionalServices;
      }
    }

    console.log("formData from Service handleSubmit", formData);

    try {
      const serviceOrderCompleted = await serviceOrderComplete({
        serviceOrderId: serviceOrderDetail.id,
        data: formData,
      }).unwrap();
      console.log("serviceOrderCompleted", serviceOrderCompleted);

      toast.success("Order completed..!!");

      setServiceFinalPrice("");
      setServiceAgent("");
      setServiceCompletedOn("");
      setAdditionalServices[{ name: "", price: 0 }];
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-full my-5">
      <hr />
      <h2 className="text-center font-serif text-xl text-wrap max-sm:text-sm my-5">
        Fill the below required details for completing Order.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-2 max-sm:grid-cols-1 place-items-start place-content-center gap-14 max-sm:gap-5 py-10 max-sm:py-5 w max-sm:w-fit"
      >
        {/* Completion Detail */}
        <DetailWrapper icon={SiTicktick} heading="Completion Details">
          <div className="flex flex-col gap-2">
            <DetailDiv
              label="Serviced By"
              isRequired={true}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Serviced By"
                  isRequired={true}
                  type={"text"}
                  name="pickedUpBy"
                  value={serviceAgent}
                  changeHandler={(e) => setServiceAgent(e.target.value)}
                />
              }
            />

            {/* Time */}
            <DetailDiv
              label="Completed On"
              flexColSScr={true}
              text={
                <DateAndTime
                  label={false}
                  showPreviousDate={true}
                  setSchedule={setServiceCompletedOn}
                />
              }
            />

            <DetailDiv
              label="Final Price"
              isRequired={true}
              flexColSScr={false}
              text={
                <InputDiv
                  placeholder="Service Final Price"
                  isRequired={true}
                  type={"number"}
                  value={serviceFinalPrice}
                  name="serviceFinalPrice"
                  changeHandler={(e) => setServiceFinalPrice(e.target.value)}
                />
              }
            />

            <DetailDiv
              label="Status"
              isRequired={false}
              flexColSScr={false}
              text={"Completed"}
            />
          </div>
        </DetailWrapper>

        {/* Additional Service */}
        {serviceOrderDetail.serviceType === "Brand" && (
          <DetailWrapper
            icon={BsInfoCircle}
            heading="Additional Service Details"
          >
            {additionalServices.map((service, index) => (
              <div className="flex flex-col gap-2">
                <DetailDiv
                  label="Service Name"
                  isRequired={true}
                  flexColSScr={false}
                  text={
                    <InputDiv
                      placeholder="Service Name"
                      type={"text"}
                      value={service.name}
                      name="serviceName"
                      changeHandler={(e) =>
                        handleServiceChange(index, "name", e.target.value)
                      }
                    />
                  }
                />
                <DetailDiv
                  label="Service Price"
                  isRequired={true}
                  flexColSScr={false}
                  text={
                    <InputDiv
                      placeholder="Service Price"
                      type={"number"}
                      value={service.price}
                      name="servicePrice"
                      changeHandler={(e) =>
                        handleServiceChange(index, "price", e.target.value)
                      }
                    />
                  }
                />
                <div className="flex justify-end w-full gap-2">
                  {index === additionalServices.length - 1 &&
                    additionalServices.length !== 1 && (
                      <button
                        className="px-2 py-1 bg-red-500 rounded text-white"
                        onClick={() => removeService(index)}
                      >
                        X
                      </button>
                    )}
                  <button
                    className="px-2 py-1 bg-blue-500 rounded text-white"
                    onClick={addService}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </DetailWrapper>
        )}

        {/* Submit Order Completion */}
        <div className="w-full mx-auto">
          <SubmitButton loading={orderCompleteLoading}>
            Service Completed
          </SubmitButton>
        </div>

        {/* Cancel confirmation */}
        <div className="w-fit mx-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              setCancelModal(true);
            }}
            className={`bg-red-600 hover:bg-red-700 cursor-pointer rounded px-2 py-1 w-fit text-white disabled:bg-gray-300`}
          >
            Cancel Order
          </button>
        </div>
      </form>

      {cancelModal && (
        <OrderCancellationForm
          orderId={serviceOrderId}
          cancelOrder={cancelServiceOrder}
          cancelLoading={cancelServiceOrderLoading}
          closeModal={() => setCancelModal(false)}
        />
      )}
    </div>
  );
};

export default ServiceCompletionForm;

function InputDiv({
  label,
  placeholder,
  isRequired,
  type,
  name,
  value,
  changeHandler,
}) {
  console.log(label, isRequired);
  return (
    <div className="flex items-center gap-1">
      <label htmlFor={name} className="text-lg flex max-sm:text-sm">
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="border rounded p-1 text-sm"
        onChange={changeHandler}
        required={isRequired}
      />
    </div>
  );
}

// function DetailWrapper({ icon: Icon, heading, children }) {
//   const style = {
//     detailDiv: "flex items-start gap-2",
//     detailIcon:
//       "rounded-full bg-secondary-light p-3 max-sm:p-[7px] text-lg max-sm:text-sm",
//     detailHeading: "text-2xl font-serif text-start max-sm:text-lg",
//     detailSubDiv: "flex flex-col",
//   };

//   return (
//     <div className={style.detailDiv}>
//       <div className={style.detailIcon}>
//         <Icon />
//       </div>
//       <div className={style.detailSubDiv}>
//         <p className={style.detailHeading}>{heading}</p>
//         <div className={style.detailSubDiv}>{children}</div>
//       </div>
//     </div>
//   );
// }

// function DetailDiv({ label, text, isRequired, flexColSScr }) {
//   const style = {
//     detailWrapper: `flex gap-1 items-center ${
//       flexColSScr && "max-sm:flex-col max-sm:items-start"
//     }`,
//     detailLabel: "text-gray-500  text-sm max-sm:text-xs",
//     detailText: "text-[16px] max-sm:text-sm",
//   };
//   return (
//     <div className={`${style.detailWrapper}`}>
//       <span className={`${style.detailLabel}`}>
//         {label}: {isRequired && <span className="text-red-600">* </span>}
//       </span>
//       <span className={`${style.detailText}`}>{text}</span>
//     </div>
//   );
// }
