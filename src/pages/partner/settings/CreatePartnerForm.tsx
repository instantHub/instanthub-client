import { FC, useState } from "react";
import { toast } from "react-toastify";
import { Button, FormInput } from "@components/general";
import { ICreatePartnerPayload } from "@features/api/partners/types";
import { useCreatePartnerMutation } from "@features/api";
import { IPartnerRequest } from "@features/api/partners_requests/types";

interface CreatePartnerFormProps {
  request: IPartnerRequest;
  onClose: () => void;
}

export const CreatePartnerForm: FC<CreatePartnerFormProps> = ({
  onClose,
  request,
}) => {
  const [formData, setFormData] = useState<ICreatePartnerPayload>({
    _id: request._id,
    name: request.name,
    email: request.email,
    phone: request.phone,
    companyName: request.businessName,
    address: request.address,
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
      window.location.reload();
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
        <div className="space-y-4 mb-4">
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
            disabled
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
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
            disabled
          />
        </div>

        <div>
          <FormInput
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            label="Password"
            placeholder="Enter a strong password"
            required
          />
        </div>

        <div className="flex justify-around gap-2">
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
