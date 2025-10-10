import { useState } from "react";
import { toast } from "react-toastify";
import { UpdateAdminForm } from "./UpdateAdminForm";
import { Modal } from "@components/general";
import { TUser, UserTable } from "./UserTable";

export type UseGetUsersQuery = () => {
  data: TUser[];
  isLoading: boolean /* ... other query results */;
};

export type UseUpdateUserMutation = () => [
  (options: { id: string; data: Partial<TUser> }) => Promise<any>,
  any
];

export type UseDeleteUserMutation = () => [(id: string) => Promise<any>, any];

interface UserManagementSectionProps {
  title: string;
  useGetUsersQuery: UseGetUsersQuery;
  useUpdateUserMutation: UseUpdateUserMutation;
  useDeleteUserMutation: UseDeleteUserMutation;
  // Optional: A filter function to exclude certain users, like the logged-in admin
  filterPredicate?: (user: TUser) => boolean;
}

export const UserManagementSection = ({
  title,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  filterPredicate,
}: UserManagementSectionProps) => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editingUser, setEditingUser] = useState<TUser | null>(null);

  const handleEdit = (user: TUser) => {
    setEditingUser(user);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      //   await updateUser({ id, data: { isActive: !currentStatus } }).unwrap();
      toast.success(`${title} status updated successfully!`);
    } catch (error) {
      toast.error(`Failed to update ${title} status.`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${title}?`)) {
      try {
        await deleteUser(id);
        toast.success(`${title} deleted successfully!`);
      } catch (error) {
        toast.error(`Failed to delete ${title}.`);
      }
    }
  };

  const displayedUsers = filterPredicate
    ? users.filter(filterPredicate)
    : users;

  return (
    <>
      <UserTable
        title={title}
        users={displayedUsers}
        isLoading={isLoading}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
        onDelete={handleDelete}
      />
      {/* <Modal
        className="min-w-[400px]"
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
      >
        <UpdateAdminForm
          admin={editingUser} // TODO: Refactor UpdateAdminForm to accept a generic TUser
          onClose={() => setEditingUser(null)}
        />
      </Modal> */}
    </>
  );
};
