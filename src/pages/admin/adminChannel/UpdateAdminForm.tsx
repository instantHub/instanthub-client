// components/UpdateAdminForm.tsx
import { FC, useEffect, useState } from "react";
import { IAdmin } from "@features/api/admin/types";
import { useUpdateAdminMutation } from "@api";
import { toast } from "react-toastify";
import { Button, FormInput } from "@components/general";

interface UpdateAdminFormProps {
  admin: IAdmin | null;
  onClose: () => void;
}

export const UpdateAdminForm: FC<UpdateAdminFormProps> = ({
  admin,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    isActive: true,
  });

  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      });
    }
  }, [admin]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin?._id) return;

    try {
      await updateAdmin({ id: admin._id, data: formData }).unwrap();
      toast.success("Admin updated successfully");
      onClose();
    } catch (err: any) {
      toast.error("Update failed!");
    }
  };

  if (!admin) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 overflow-y-auto max-h-[90vh]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Edit Admin</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          placeholder="Name"
        />

        <FormInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          placeholder="Email"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            required
          >
            <option value="admin">Admin</option>
            <option value="executive">Executive</option>
            <option value="marketing">Marketing</option>
            <option value="partner">Partner</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            name="isActive"
            type="checkbox"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button size="md" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button size="md" type="submit" loading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
