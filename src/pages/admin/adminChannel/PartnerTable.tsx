import { FC } from "react";
import { IPartner } from "@features/api/partnersApi/types";
import { Button, Typography } from "@components/general";
import { DeleteForeverIcon, EditIcon, Eye, EyeOff } from "@icons";

interface PartnerTableProps {
  partners: IPartner[];
  onEdit: (partner: IPartner) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export const PartnerTable: FC<PartnerTableProps> = ({
  partners,
  onEdit,
  onToggleActive,
  onDelete,
}) => {
  return (
    <div className="w-full max-w-[450px] sm:max-w-screen-14inch mx-auto bg-white rounded-lg shadow overflow-hidden">
      <Typography variant="h5" className="text-center my-4">
        PARTNERS List
      </Typography>

      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Company
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
            {partners.map((partner) => (
              <tr key={partner._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {partner.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {partner.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {partner.companyName || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      partner.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {partner.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex min-w-[150px] px-2 sm:px-6 py-4 text-right text-sm font-medium space-x-1 sm:space-x-2">
                  <Button variant="ghost" onClick={() => onEdit(partner)}>
                    <EditIcon className="w-4 h-4 text-blue-600 hover:text-red-900" />
                  </Button>
                  <button
                    title={partner.isActive ? "Deactivate" : "Activate"}
                    onClick={() =>
                      onToggleActive(partner._id, partner.isActive)
                    }
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {partner.isActive ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <Button variant="ghost" onClick={() => onDelete(partner._id)}>
                    <DeleteForeverIcon className="w-4 h-4 text-red-600 hover:text-red-900" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {partners.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No partners found
        </div>
      )}
    </div>
  );
};
