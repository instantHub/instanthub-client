import React, { useState } from "react";
import {
  useAssignOrderToExecutiveMutation,
  useAssignOrderToPartnerMutation,
  useGetExecutivesQuery,
  useGetPartnersQuery,
} from "@api";
import { toast } from "react-toastify";
import { IOrder } from "@features/api/orders/types";
import { useSelector } from "react-redux";
import { selectAdminState } from "@features/slices";
import { Button, SelectObject, FlexBox, Typography } from "@components/general";
import { IExecutive } from "@features/api/executive/types";
import { ADMIN_ROLE_ENUM } from "@utils/constants";
import { IPartner } from "@features/api/partners/types";

type TAssignmentRoles = ADMIN_ROLE_ENUM.EXECUTIVE | ADMIN_ROLE_ENUM.PARTNER;

interface IAssignAgentProps {
  orderDetail: IOrder;
  role: TAssignmentRoles;
}

const ROLE_QUERY_MAP: Record<TAssignmentRoles, any> = {
  [ADMIN_ROLE_ENUM.EXECUTIVE]: useGetExecutivesQuery,
  [ADMIN_ROLE_ENUM.PARTNER]: useGetPartnersQuery,
};
const ROLE_MUTATION_MAP: Record<TAssignmentRoles, any> = {
  [ADMIN_ROLE_ENUM.EXECUTIVE]: useAssignOrderToExecutiveMutation,
  [ADMIN_ROLE_ENUM.PARTNER]: useAssignOrderToPartnerMutation,
};

export const AssignAgent: React.FC<IAssignAgentProps> = ({
  orderDetail,
  role,
}) => {
  const { data: users } = ROLE_QUERY_MAP[role]();

  const [assignOrder, { isLoading: assignmentLoading }] =
    ROLE_MUTATION_MAP[role]();

  const [assignedAgent, setAssignedAgent] = useState<
    IExecutive | IPartner | null
  >(null);

  const { admin } = useSelector(selectAdminState);

  const {
    assignmentStatus: { assignedTo, assignedBy, assigned, assignedAt },
  } = orderDetail;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const alreadyAssignedToExec =
      assignedTo?.role === ADMIN_ROLE_ENUM.EXECUTIVE;

    const alreadyAssignedToPartner =
      assignedTo?.role === ADMIN_ROLE_ENUM.PARTNER;

    try {
      if (!assignedAgent) {
        toast.error("Please select an agent");
        return;
      }

      if (alreadyAssignedToExec && role === ADMIN_ROLE_ENUM.PARTNER) {
        toast.error(
          "Please unassign this order from Executive to assign a Partner"
        );
        return;
      }

      if (alreadyAssignedToPartner && role === ADMIN_ROLE_ENUM.EXECUTIVE) {
        toast.error(
          "Please unassign this order from Partner to assign an Executive."
        );
        return;
      }

      console.log("assignedAgent", assignedAgent);

      // const updatedOrderData = await assignOrderToExecutive({
      if (role === ADMIN_ROLE_ENUM.EXECUTIVE) {
        const updatedOrderData = await assignOrder({
          orderId: orderDetail._id,
          executiveId: assignedAgent?._id!,
          assignmentStatus: {
            assigned: true,
            assignedTo: {
              name: String(assignedAgent?.name),
              phone: String(assignedAgent?.phone),
              role: ADMIN_ROLE_ENUM.EXECUTIVE,
              id: (assignedAgent as IExecutive).executiveID,
            },
            assignedBy: {
              name: admin?.name!,
              // @ts-ignore
              role: admin?.role!,
            },
            assignedAt: new Date().toISOString(),
          },
        }).unwrap();
        toast.success(updatedOrderData.message);
      } else {
        const updatedOrderData = await assignOrder({
          _orderId: orderDetail._id,
          _userId: assignedAgent?._id!,
          userRole: ADMIN_ROLE_ENUM.PARTNER,
          assignmentStatus: {
            assigned: true,
            assignedTo: {
              name: String(assignedAgent?.name),
              phone: String(assignedAgent?.phone),
              role: ADMIN_ROLE_ENUM.PARTNER,
              id: (assignedAgent as IPartner).partnerID,
            },
            assignedBy: {
              name: admin?.name!,
              // @ts-ignore
              role: admin?.role!,
            },
            assignedAt: new Date().toISOString(),
          },
        }).unwrap();
        toast.success(updatedOrderData.message);
      }

      window.location.reload();
    } catch (error: any) {
      console.error("Error assigning agent:", error);
    }
  }

  return (
    <FlexBox direction="col" gap={4}>
      <Typography variant="h4">
        Assign An {role.toUpperCase()} For Order PickUp
      </Typography>

      <hr className="h2 w-full" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <SelectObject<IExecutive | IPartner>
          label={role.toUpperCase()}
          options={users}
          value={assignedAgent}
          onChange={setAssignedAgent}
          displayKey="name"
          valueKey="_id"
          placeholder={`Choose an ${role}...`}
          clearable
          required
        />

        <Button
          variant="greenary"
          shape="square"
          type="submit"
          disabled={assignmentLoading}
        >
          {!assigned ? "Assign" : "Re-Assign"}
        </Button>
      </form>
    </FlexBox>
  );
};
