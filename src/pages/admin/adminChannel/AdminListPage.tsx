import { useState } from "react";
import {
  useGetAdminsQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from "@api";
import { AdminTable } from "./AdminTable";
import { IAdminResponse } from "@features/api/authApi/types";
import { Button, FlexBox, Modal } from "@components/general";
import { PlusIcon } from "@icons";
import { AdminRegisterForm } from "../auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@features/store";
import { UpdateAdminForm } from "./UpdateAdminForm";

export const AdminListPage = () => {
  const { data: admins = [], isLoading } = useGetAdminsQuery();
  console.log("admins", admins);

  const { admin } = useSelector((state: RootState) => state.adminPanel);
  console.log("admin", admin);
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

  const handleToggleActive = async (id: string) => {
    const admin = admins.find((a) => a._id === id);
    await updateAdmin({ id, data: { isActive: !admin?.isActive } });
  };

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
      <Button onClick={openModal} leftIcon={<PlusIcon />}>
        Add new Admin
      </Button>

      <AdminTable
        admins={admins.filter((adm) => adm.email !== admin?.email)}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
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
    </FlexBox>
  );
};
