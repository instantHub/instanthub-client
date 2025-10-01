import React, { useState } from "react";
import { useAssignAgentMutation } from "@api";
import { DateAndTime } from "@components/user";
import { toast } from "react-toastify";
import { ASSIGNMENT_STATUS, ORDER_STATUS } from "@features/api/ordersApi/types";
import { useSelector } from "react-redux";
import { selectAdminState } from "@features/slices";

export const AssignAgent = ({ orderDetail }) => {
  // console.log("AssignAgent orderDetail", orderDetail);

  const AgentData = {
    shouaib: "Shouaib Ahmed - 87222 20088",
    ameer: "Ameer Ahmed - 87222 20099",
    nizam: "Nizam Khan - 79752 87637",
  };

  const [assignAgent, { isLoading: loadingAssignment }] =
    useAssignAgentMutation();

  const { admin } = useSelector(selectAdminState);

  const {
    assignmentStatus: { assignedTo, assignedBy, assigned, assignedAt },
  } = orderDetail;

  const [pickUpDate, setPickUpDate] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      const formData = Object.fromEntries(data.entries());

      const updatedOrderData = await assignAgent({
        orderId: orderDetail.id,
        data: {
          assignmentStatus: {
            assigned: true,
            assignedTo: {
              name: formData.agent,
              role: ASSIGNMENT_STATUS.EXECUTIVE,
            },
            assignedBy: {
              name: admin.name,
              role: admin.role,
            },
            assignedAt: new Date().toISOString(),
          },
        },
      }).unwrap();

      window.location.reload();

      toast.success(updatedOrderData.message);

      console.log("updatedOrderData", updatedOrderData);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <div className="w-full flex flex-col my-5 text-sm max-sm:text-xs">
      <hr />
      <p className="text-center  text-xl text-wrap max-sm:text-sm my-5">
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
            <option value={AgentData.shouaib}>{AgentData.shouaib}</option>
            <option value={AgentData.ameer}>{AgentData.ameer}</option>
            <option value={AgentData.nizam}>{AgentData.nizam}</option>
          </select>
        </div>

        {/* TODO: check later, currently removing Pickup date and adding assignedAt date */}
        {/* <DateAndTime showPreviousDate={false} setSchedule={setPickUpDate} /> */}

        {/* Agent Already Assigned */}
        {assigned && (
          <div className="w-full flex flex-col justify-start items-center gap-1">
            <p className="text-lg max-sm:text-sm">Agent Already Assigned</p>
            <p>
              Assigned Agent:
              <span className="font-semibold"> {assignedTo.name}</span>
            </p>
            <p>
              Assigned At:
              <span className="font-semibold"> {assignedAt}</span>
            </p>
          </div>
        )}

        <button
          className="px-2 py-1 border rounded bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-200"
          disabled={loadingAssignment}
        >
          {!assigned ? "Assign" : "Re-Assign"}
          {/* {!orderDetail.pickedUpDetails.assigned ? "Assign" : "Re-Assign"} */}
        </button>
      </form>
    </div>
  );
};
