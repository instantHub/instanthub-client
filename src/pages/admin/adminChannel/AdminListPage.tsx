import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@features/store";
import {
  UseDeleteUserMutation,
  UseGetUsersQuery,
  UserManagementSection,
  UseUpdateUserMutation,
} from "./UserManagementSection";
import { Button, FlexBox, Modal } from "@components/general";
import { PlusIcon } from "@icons";
import { ADMIN_ROLE_ENUM } from "@utils/constants";

import {
  useGetAdminsQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from "@api";
import {
  useGetExecutivesQuery,
  useUpdateExecutiveMutation,
  useDeleteExecutiveMutation,
} from "@features/api/executive";
import {
  useGetPartnersQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} from "@features/api/partners";

import { CreateAdminUserForm } from "./CreateAdminUserForm";

export const AdminListPage = () => {
  const { admin } = useSelector((state: RootState) => state.adminPanel);
  const [createModalRole, setCreateModalRole] = useState<
    ADMIN_ROLE_ENUM | "PARTNER" | null
  >(null);

  return (
    <FlexBox direction="col" align="stretch" gap={8} className="w-full">
      {/* --- Header & Create Buttons --- */}
      <FlexBox justify="end" gap={2} className="w-full">
        <Button
          shape="square"
          onClick={() => setCreateModalRole(ADMIN_ROLE_ENUM.ADMIN)}
          leftIcon={<PlusIcon />}
        >
          Admin
        </Button>
        <Button
          shape="square"
          onClick={() => setCreateModalRole(ADMIN_ROLE_ENUM.SUB_ADMIN)}
          leftIcon={<PlusIcon />}
        >
          Create Sub-Admin
        </Button>
        <Button
          shape="square"
          onClick={() => setCreateModalRole(ADMIN_ROLE_ENUM.EXECUTIVE)}
          variant="primary"
          leftIcon={<PlusIcon />}
        >
          Create Executive
        </Button>
        <Button
          shape="square"
          onClick={() => setCreateModalRole(ADMIN_ROLE_ENUM.MARKETING)}
          variant="primary"
          leftIcon={<PlusIcon />}
        >
          Create Marketing Account
        </Button>
      </FlexBox>

      {/* --- Admins Section --- */}
      <UserManagementSection
        title="Admins"
        useGetUsersQuery={useGetAdminsQuery as unknown as UseGetUsersQuery}
        useUpdateUserMutation={
          useUpdateAdminMutation as unknown as UseUpdateUserMutation
        }
        useDeleteUserMutation={
          useDeleteAdminMutation as unknown as UseDeleteUserMutation
        }
        filterPredicate={(user) => user.email !== admin?.email}
      />

      {/* --- Executives Section --- */}
      <UserManagementSection
        title="Executives"
        useGetUsersQuery={useGetExecutivesQuery as unknown as UseGetUsersQuery}
        useUpdateUserMutation={
          useUpdateExecutiveMutation as unknown as UseUpdateUserMutation
        }
        useDeleteUserMutation={
          useDeleteExecutiveMutation as unknown as UseDeleteUserMutation
        }
      />

      {/* --- Partners Section --- */}
      <UserManagementSection
        title="Partners"
        useGetUsersQuery={useGetPartnersQuery as unknown as UseGetUsersQuery}
        useUpdateUserMutation={
          useUpdatePartnerMutation as unknown as UseUpdateUserMutation
        }
        useDeleteUserMutation={
          useDeletePartnerMutation as unknown as UseDeleteUserMutation
        }
      />

      <Modal
        className="min-w-[400px]"
        isOpen={[
          ADMIN_ROLE_ENUM.ADMIN,
          ADMIN_ROLE_ENUM.SUB_ADMIN,
          ADMIN_ROLE_ENUM.EXECUTIVE,
          ADMIN_ROLE_ENUM.MARKETING,
        ].includes(createModalRole as any)}
        onClose={() => setCreateModalRole(null)}
      >
        {createModalRole && createModalRole !== "PARTNER" && (
          <CreateAdminUserForm
            role={createModalRole}
            onClose={() => setCreateModalRole(null)}
          />
        )}
      </Modal>
    </FlexBox>
  );
};
