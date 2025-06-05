import React, { useState } from "react";
import { useAssignAgentMutation } from "@api";
import { DateAndTime } from "@components/user";
import { toast } from "react-toastify";

const AssignAgent = ({ orderDetail }) => {
  // console.log("AssignAgent orderDetail", orderDetail);

  const [assignAgent, { isLoading: loadingAssignment }] =
    useAssignAgentMutation();

  const {
    pickedUpDetails: { agentName, pickedUpDate, agentAssigned },
  } = orderDetail;

  const [pickUpDate, setPickUpDate] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const formData = Object.fromEntries(data.entries());

      const pickedUpDetails = {
        agentName: formData.agent,
        pickedUpDate: pickUpDate,
        agentAssigned: true,
      };
      console.log("pickedUpDetails", pickedUpDetails);

      const updatedOrderData = await assignAgent({
        orderId: orderDetail.id,
        data: pickedUpDetails,
      }).unwrap();

      toast.success(updatedOrderData.message);

      console.log("updatedOrderData", updatedOrderData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div className="w-full flex flex-col my-5 text-sm max-sm:text-xs">
      <hr />
      <p className="text-center font-serif text-xl text-wrap max-sm:text-sm my-5">
        Assign An Agent For Order PickUp
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <div className="flex items-center justify-center gap-2">
          <label>Assign Agent:</label>
          <select
            name="agent"
            className="p-1 border rounded"
            // value={agentName}
            required
          >
            <option value="">Select An Agent</option>
            <option value="Shouaib Ahmed">Shouaib Ahmed</option>
            <option value="Nizam Khan">Nizam Khan</option>
            <option value="Ameer Ahmed">Ameer Ahmed</option>
          </select>
        </div>

        <DateAndTime showPreviousDate={false} setSchedule={setPickUpDate} />

        {/* Agent Already Assigned */}
        {agentAssigned && (
          <div className="w-full flex flex-col justify-start items-center gap-1">
            <p className="text-lg max-sm:text-sm">Agent Already Assigned</p>
            <p>
              Assigned Agent:
              <span className="font-semibold"> {agentName}</span>
            </p>
            <p>
              PickUp Date & Time:
              <span className="font-semibold"> {pickedUpDate}</span>
            </p>
          </div>
        )}

        <button
          className="px-2 py-1 border rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-200"
          disabled={loadingAssignment}
        >
          {!agentAssigned ? "Assign" : "Re-Assign"}
          {/* {!orderDetail.pickedUpDetails.agentAssigned ? "Assign" : "Re-Assign"} */}
        </button>
      </form>
    </div>
  );
};

export default AssignAgent;
