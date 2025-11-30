import {
  Button,
  CustomSelect,
  FlexBox,
  FormInput,
  Modal,
} from "@components/general";
import { useSubmitPartnerRequestMutation } from "@api";
import React, { useState } from "react";
import { IPartnerRequestFormData } from "@features/api/partners_requests/types";
import { toast } from "react-toastify";
import { LOCATIONS_CITY } from "@utils/constants";

const AVAILABLE_LOCATIONS = Object.values(LOCATIONS_CITY).map((city, idx) => ({
  id: idx + 1,
  city: city,
}));

const PartnerRequestForm = ({ onClose }: { onClose: () => void }) => {
  const [submitRequest, { isLoading, isError, error }] =
    useSubmitPartnerRequestMutation();
  const [city, setCity] = useState<{
    id: number;
    city: string;
  } | null>(null);

  console.log("AVAILABLE_LOCATIONS", AVAILABLE_LOCATIONS);

  const [formData, setFormData] = useState<IPartnerRequestFormData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    if (!formData.address.city) {
      toast.error("Select a city.");
      return;
    }

    await submitRequest(formData);
    toast.success("Request submitted successfully!");
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} className="mx-2">
      <h2 className="text-xl font-bold mb-4">Be Our Partner</h2>

      {isError && (
        <p className="text-red-500">
          {(error as any)?.data?.message || "Submission failed"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <FormInput
            label="Full Name"
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input"
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          <FormInput
            label="Phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          <FormInput
            label="Business Name"
            type="text"
            name="businessName"
            placeholder="Business Name (optional)"
            value={formData.businessName}
            onChange={handleChange}
            className="input"
          />
        </div>

        <h4 className="mt-12 font-bold text-lg mb-4">Address</h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          <FormInput
            label="Street"
            type="text"
            name="address.street"
            placeholder="Street"
            required
            value={formData.address.street}
            onChange={handleChange}
            className="input"
          />

          <CustomSelect
            label="City"
            options={AVAILABLE_LOCATIONS}
            value={city}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, city: e?.city || "" },
              }));
              setCity(e);
            }}
            displayKey="city"
            valueKey="id"
            placeholder="-- select a city --"
            searchable
            required
          />

          <FormInput
            label="State"
            type="text"
            name="address.state"
            placeholder="State"
            required
            value={formData.address.state}
            onChange={handleChange}
            className="input"
          />
          <FormInput
            label="Pincode"
            type="text"
            name="address.pincode"
            placeholder="Pincode"
            required
            value={formData.address.pincode}
            onChange={handleChange}
            className="input"
          />
        </div>

        <FlexBox justify="around">
          <Button variant="instanthub" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </FlexBox>
      </form>
    </Modal>
  );
};

export default PartnerRequestForm;
