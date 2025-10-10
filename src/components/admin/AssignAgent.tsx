import React, { useState } from "react";
import { useAssignOrderToExecutiveMutation, useGetExecutivesQuery } from "@api";
import { toast } from "react-toastify";
import { IOrder } from "@features/api/orders/types";
import { useSelector } from "react-redux";
import { selectAdminState } from "@features/slices";
import { Button, SelectObject, FlexBox, Typography } from "@components/general";
import { IExecutive } from "@features/api/executive/types";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

interface IAssignAgentProps {
  orderDetail: IOrder;
}

export const AssignAgent: React.FC<IAssignAgentProps> = ({ orderDetail }) => {
  const { data: executives, isLoading: executivesLoading } =
    useGetExecutivesQuery();

  const [assignOrderToExecutive, { isLoading: loadingAssignment }] =
    useAssignOrderToExecutiveMutation();

  const [assignedAgent, setAssignedAgent] = useState<IExecutive | null>(null);

  const { admin } = useSelector(selectAdminState);

  const {
    assignmentStatus: { assignedTo, assignedBy, assigned, assignedAt },
  } = orderDetail;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!assignedAgent) {
        toast.error("Please select an agent");
        return;
      }

      console.log("assignedAgent", assignedAgent);

      // const updatedOrderData = await assignAgent({
      const updatedOrderData = await assignOrderToExecutive({
        orderId: orderDetail.id,
        executiveId: assignedAgent?._id!,
        assignmentStatus: {
          assigned: true,
          assignedTo: {
            name: String(assignedAgent?.name),
            phone: String(assignedAgent?.phone),
            role: ADMIN_ROLE_ENUM.EXECUTIVE,
          },
          assignedBy: {
            name: admin?.name!,
            // @ts-ignore
            role: admin?.role!,
          },
          assignedAt: new Date().toISOString(),
        },
      }).unwrap();

      window.location.reload();

      toast.success(updatedOrderData.message);

      console.log("updatedOrderData", updatedOrderData);
    } catch (error: any) {
      console.error("Error assigning agent:", error);
    }
  }

  return (
    <FlexBox direction="col" gap={4}>
      <Typography variant="h4">Assign An Agent For Order PickUp</Typography>

      <hr className="h2 w-full" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <SelectObject<IExecutive>
          label="Executives"
          options={executives}
          value={assignedAgent}
          onChange={setAssignedAgent}
          displayKey="name"
          valueKey="_id"
          placeholder="Choose an executive..."
          clearable
          required
        />

        <Button
          variant="greenary"
          shape="square"
          type="submit"
          disabled={loadingAssignment}
        >
          {!assigned ? "Assign" : "Re-Assign"}
        </Button>
      </form>
    </FlexBox>
  );
};
