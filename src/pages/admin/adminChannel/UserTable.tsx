import { FC } from "react";
import { EditIcon, EyeOff, Eye, DeleteForeverIcon } from "@icons";
import { Button, Typography } from "@components/general";
import { IAdmin } from "@features/api/admin/types";
import { IExecutive } from "@features/api/executive/types";
import { IPartner } from "@features/api/partners/types";

export type TUser = IAdmin | IExecutive | IPartner;

interface UserTableProps {
  title: string;
  users: TUser[];
  onEdit: (user: TUser) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export const UserTable: FC<UserTableProps> = ({
  title,
  users,
  onEdit,
  onToggleActive,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading {title}...</div>;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow overflow-hidden">
      <Typography variant="h5" className="text-center my-4">
        {title} List
      </Typography>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Table Headers */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex min-w-[150px] px-2 sm:px-6 py-4 text-right text-sm font-medium space-x-1 sm:space-x-2">
                  <Button variant="ghost" onClick={() => onEdit(user)}>
                    <EditIcon className="w-4 h-4 text-blue-600" />
                  </Button>
                  <button
                    title={user.isActive ? "Deactivate" : "Activate"}
                    onClick={() => onToggleActive(user._id, user.isActive)}
                    className="text-blue-600"
                  >
                    {user.isActive ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <Button variant="ghost" onClick={() => onDelete(user._id)}>
                    <DeleteForeverIcon className="w-4 h-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isLoading && users.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No {title} found
        </div>
      )}
    </div>
  );
};
