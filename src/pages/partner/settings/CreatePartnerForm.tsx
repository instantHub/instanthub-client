import { FC, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormInput } from "@components/general";
import { ICreatePartnerPayload } from "@features/api/partners/types";
import { useCreatePartnerMutation } from "@features/api";

interface CreatePartnerFormProps {
  onClose: () => void;
}

export const CreatePartnerForm: FC<CreatePartnerFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ICreatePartnerPayload>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
  });

  const [createPartner, { isLoading }] = useCreatePartnerMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPartner(formData).unwrap();
      toast.success("Partner created successfully");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create partner");
    }
  };

  return (
    <div className="space-y-4 ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Create New Partner
        </h2>
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
          label="Full Name"
          placeholder="Enter full name"
          required
        />
        <FormInput
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          placeholder="Enter email address"
          required
        />
        <FormInput
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          placeholder="Enter phone number"
          required
        />
        <FormInput
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          label="Company Name (Optional)"
          placeholder="Enter company name"
        />
        <FormInput
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          placeholder="Enter a strong password"
          required
        />

        <div className="pt-4 flex justify-end gap-2">
          <Button size="md" variant="outline" shape="square" onClick={onClose}>
            Cancel
          </Button>
          <Button size="md" type="submit" shape="square" loading={isLoading}>
            Create Partner
          </Button>
        </div>
      </form>
    </div>
  );
};
