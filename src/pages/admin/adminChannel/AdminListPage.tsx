import { useState } from "react";
import {
  useGetAdminsQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useGetPartnersQuery,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} from "@api";
import { AdminTable } from "./AdminTable";
import { IAdminResponse } from "@features/api/authApi/types";
import { Button, FlexBox, Modal, Typography } from "@components/general";
import { PlusIcon } from "@icons";
import { AdminRegisterForm } from "../auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@features/store";
import { UpdateAdminForm } from "./UpdateAdminForm";
import { CreatePartnerForm } from "@pages/partner/settings/CreatePartnerForm";
import { PartnerTable } from "./PartnerTable";
import { IPartner } from "@features/api/partnersApi/types";

export const AdminListPage = () => {
  const { data: admins = [], isLoading: isAdminLoading } = useGetAdminsQuery();
  const { data: partnersData, isLoading: isPartnerLoading } =
    useGetPartnersQuery();

  const [updatePartner] = useUpdatePartnerMutation();
  const [deletePartner] = useDeletePartnerMutation();

  // const partners = partnersData?.partners || [];
  console.log("partners useGetPartnersQuery", partnersData);
  console.log("admins useGetAdminsQuery", admins);

  const { admin } = useSelector((state: RootState) => state.adminPanel);
  console.log("admin from store", admin);
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdminResponse | null>(
    null
  );

  const openModal = (): void => {
    setIsModalOpen(true);
  };
  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  const openEditingModal = (): void => {
    setIsEditing(true);
  };
  const closeEditingModal = (): void => {
    setIsEditing(false);
  };

  const handleEdit = (admin: IAdminResponse) => {
    openEditingModal();
    setSelectedAdmin(admin);
  };

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isCreatePartnerModalOpen, setCreatePartnerModalOpen] = useState(false);

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleCloseCreatePartnerModal = () => {
    setCreatePartnerModalOpen(false);
  };

  const handleToggleActive = async (id: string) => {
    const admin = admins.find((a) => a._id === id);
    await updateAdmin({ id, data: { isActive: !admin?.isActive } });
  };

  const handlePartnerEdit = (partner: IPartner) => {
    // Map IPartner to IAdminResponse to reuse the UpdateAdminForm
    const adminDataForForm = {
      _id: partner._id,
      name: partner.name,
      email: partner.email,
      role: "partner", // Hardcode role for the form
      isActive: partner.isActive,
    };
    openEditingModal();
    // TODO: update this
    // setSelectedAdmin(adminDataForForm);
  };

  const handleToggleAdminActive = async (id: string) => {
    const admin = admins.find((a) => a._id === id);
    await updateAdmin({ id, data: { isActive: !admin?.isActive } });
  };

  const handleTogglePartnerActive = async (id: string, isActive: boolean) => {
    try {
      await updatePartner({ id, data: { isActive: !isActive } }).unwrap();
      toast.success("Partner status updated.");
    } catch (error) {
      toast.error("Failed to update partner status.");
    }
  };

  const handlePartnerDelete = async (id: string) => {
    try {
      await deletePartner(id).unwrap();
      toast.success("Partner deleted successfully!");
    } catch (error) {
      toast.error("Partner deleting failed!");
    }
  };

  if (isAdminLoading || isPartnerLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAdmin(id);
      toast.success("Admin deleted successfully!");
    } catch (error) {
      toast.error("Admin deleting failed!");
    }
  };

  return (
    <FlexBox direction="col" align="end">
      <FlexBox justify="around" gap={2}>
        <Button shape="square" onClick={openModal} leftIcon={<PlusIcon />}>
          Add new Admin
        </Button>
        <Button
          shape="square"
          variant="greenary"
          leftIcon={<PlusIcon />}
          onClick={() => setCreatePartnerModalOpen(true)}
        >
          Create Partner
        </Button>
      </FlexBox>

      <AdminTable
        admins={admins.filter((adm) => adm.email !== admin?.email)}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />

      <hr className="w-full my-4 border-t-2 border-gray-200" />

      <PartnerTable
        partners={partnersData as unknown as IPartner[]}
        onEdit={handlePartnerEdit}
        onToggleActive={handleTogglePartnerActive}
        onDelete={handlePartnerDelete}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AdminRegisterForm />
      </Modal>

      <Modal
        className="min-w-[400px]"
        isOpen={isEditing}
        onClose={closeEditingModal}
      >
        <UpdateAdminForm admin={selectedAdmin} onClose={closeEditingModal} />
      </Modal>

      <Modal
        className="min-w-[400px]"
        isOpen={isCreatePartnerModalOpen}
        onClose={handleCloseCreatePartnerModal}
      >
        <CreatePartnerForm onClose={handleCloseCreatePartnerModal} />
      </Modal>
    </FlexBox>
  );
};
