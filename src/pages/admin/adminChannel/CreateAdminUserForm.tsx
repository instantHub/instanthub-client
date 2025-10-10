import React, { FC, useState } from "react";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { EmailIcon, LockIcon, PhoneIcon, ProfileIcon } from "@icons";
import { toast } from "react-toastify";
import { ADMIN_ROLE_ENUM } from "@utils/constants";
import {
  useCreateAdminMutation,
  useCreatePartnerMutation,
} from "@features/api";
import { useCreateExecutiveMutation } from "@features/api/executive";
import { TAdminRole } from "@utils/types";

interface CreateAdminUserFormProps {
  role: ADMIN_ROLE_ENUM;
  onClose: () => void;
}

export const CreateAdminUserForm: FC<CreateAdminUserFormProps> = ({
  role,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>(""); // Added name field

  //   const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const ROLE_MUTATION_MAP: Record<TAdminRole, any> = {
    [ADMIN_ROLE_ENUM.ADMIN]: useCreateAdminMutation,
    [ADMIN_ROLE_ENUM.SUB_ADMIN]: useCreateAdminMutation,
    [ADMIN_ROLE_ENUM.EXECUTIVE]: useCreateExecutiveMutation,
    [ADMIN_ROLE_ENUM.PARTNER]: useCreatePartnerMutation,
    [ADMIN_ROLE_ENUM.MARKETING]: useCreateAdminMutation,
  };

  const [createAccount, { isLoading }] = ROLE_MUTATION_MAP[role]();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      console.log("form data", { name, email, phone, password, role });

      await createAccount({ name, email, phone, password, role }).unwrap();
      toast.success(`${role} created successfully!`);
      onClose();
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error: any) {
      console.error(`Failed to create ${role}:`, error);
      toast.error(error?.data?.message || `Failed to create ${role}.`);
    }
  };

  return (
    <div className="">
      <Typography variant="h5" className="mb-6 text-center capitalize">
        Create New {role.replace("_", " ")}
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          startIcon={<ProfileIcon size={16} />}
          size="sm"
          label="Name"
          type="text"
          name="name"
          value={name}
          placeholder={`Enter ${role.replace("_", " ")} Name`}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormInput
          startIcon={<EmailIcon size={16} />}
          size="sm"
          label="Email"
          type="email"
          name="email"
          value={email}
          placeholder={`Enter ${role.replace("_", " ")} Email`}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          startIcon={<PhoneIcon size={16} />}
          size="sm"
          label="Phone Number"
          type="tel" // Use 'tel' for phone numbers
          name="phone"
          value={phone}
          placeholder={`Enter ${role.replace("_", " ")} Phone Number`}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <FormInput
          startIcon={<LockIcon size={16} />}
          size="sm"
          label="Password"
          type="password"
          name="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FlexBox justify="end" gap={2} className="mt-6">
          <Button
            type="button"
            variant="secondary"
            shape="square"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="greenary"
            shape="square"
            loading={isLoading}
          >
            Create {role.replace("_", " ")}
          </Button>
        </FlexBox>
      </form>
    </div>
  );
};
