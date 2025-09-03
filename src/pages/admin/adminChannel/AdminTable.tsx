import { FC } from "react";
import { EditIcon, EyeOff, Eye, DeleteForeverIcon } from "@icons";
import { IAdminResponse } from "@features/api/authApi/types";
import { Button } from "@components/general";

interface AdminTableProps {
  admins: IAdminResponse[];
  onEdit: (admin: IAdminResponse) => void;
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AdminTable: FC<AdminTableProps> = ({
  admins,
  onEdit,
  onToggleActive,
  onDelete,
}) => {
  const handleSendEmail = async () => {
    console.log("handleSendEmail");

    try {
      const data = {
        customerEmail: "shouaibahmed111@gmail.com",
        customerName: "Shouaib Ahmed",
        customerPhone: "8722220088",
        orderId: "CMI000032545",
        invoiceNo: "32813",
        items: [
          { sku: "14669", name: "MacBook Air 2020", price: 27000, qty: 1 },
        ],
        total: 27000,
      };

      const data2 = {
        orderId: "INV-2025-001",
        order: {
          customerName: "Shouaib Ahmed",
          email: "shouaibahmed111@gmail.com",
          phone: "8722220088",
          schedulePickUp: "2025-09-05 14:30",
          addressDetails: {
            address:
              "Near Kumar Mens Wear, Ramna layout 1st floor, Kothanur Police Station",
            state: "Karnataka",
            city: "Bangalore",
            pinCode: "560077",
          },
          productCategory: "Laptop",
          productName: "MacBook Air 2020",
          variant: {
            variantName: "Apple M1, 8GB RAM, 256GB SSD",
          },
          paymentMode: "Cash on Pickup",
          offerPrice: 27000,
        },
      };

      // const res = await fetch("https://api.instantpick.in/api/check/bill", {
      const res = await fetch("http://localhost:8000/api/check/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      });
      console.log("res", res);

      const result = await res.json(); // parse backend response
      console.log("Email sent successfully:", result);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="w-full max-w-[450px] sm:max-w-screen-14inch mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* <Button onClick={handleSendEmail}>Mock Sending Email</Button> */}
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
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {admin.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {admin.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {admin.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      admin.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex min-w-[150px] px-2 sm:px-6 py-4 text-right text-sm font-medium space-x-1 sm:space-x-2">
                  <Button variant="ghost" onClick={() => onEdit(admin)}>
                    <EditIcon className="w-4 h-4 text-blue-600 hover:text-red-900" />
                  </Button>
                  <button
                    title={admin.isActive ? "Deactivate" : "Activate"}
                    onClick={() => onToggleActive(admin._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {admin.isActive ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <Button variant="ghost" onClick={() => onDelete(admin._id)}>
                    <DeleteForeverIcon className="w-4 h-4 text-red-600 hover:text-red-900" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {admins.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No admins found
        </div>
      )}
    </div>
  );
};
