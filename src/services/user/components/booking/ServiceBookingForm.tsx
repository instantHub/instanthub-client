import { useState, useMemo, useCallback, FC } from "react";
import { commonFields, serviceConfigs } from "./config";
import { ProfileIcon } from "@icons";
import { FormData } from "./types";
import { FormField } from "./FormField";

interface IServiceBookingFormProps {
  serviceTyep: string;
}

export const ServiceBookingForm: FC<IServiceBookingFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    location: "",
    serviceDate: "",
    serviceTime: "",
    serviceType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Memoized service types for performance
  const serviceTypes = useMemo(
    () => [
      { value: "", label: "Select a service", icon: <ProfileIcon /> },
      ...Object.entries(serviceConfigs).map(([key, config]) => ({
        value: key,
        label: config.label,
        icon: config.icon,
      })),
    ],
    []
  );

  // Memoized current service config
  //   const currentServiceConfig = useMemo(
  //     () => (formData.serviceType ? serviceConfigs[formData.serviceType] : null),
  //     [formData.serviceType]
  //   );
  const currentServiceConfig = useMemo(
    () => (formData.serviceType ? "" : null),
    [formData.serviceType]
  );

  const handleInputChange = useCallback(
    (field: string, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate common fields
    Object.entries(commonFields).forEach(([key, config]) => {
      if (config.validation) {
        const error = config.validation(formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    // Validate service-specific fields
    // if (currentServiceConfig) {
    //   Object.entries(currentServiceConfig.fields).forEach(([key, config]) => {
    //     if (config.required) {
    //       const value = formData[key];
    //       if (config.multiple) {
    //         if (!Array.isArray(value) || value.length === 0) {
    //           newErrors[key] = `${config.label} is required`;
    //         }
    //       } else if (!value || (typeof value === "string" && !value.trim())) {
    //         newErrors[key] = `${config.label} is required`;
    //       }
    //     }

    //     if (config.validation && formData[key]) {
    //       const error = config.validation(formData[key]);
    //       if (error) newErrors[key] = error;
    //     }
    //   });
    // }

    // Service type validation
    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentServiceConfig]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Form submitted successfully! Check console for details.");
    }
  }, [formData, validateForm]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Service Booking
            </h1>
            <p className="text-gray-600">
              Fill out the form to book your preferred service
            </p>
          </div>

          <div className="space-y-6">
            {/* Service Type Selection */}
            <FormField
              fieldKey="serviceType"
              config={{
                type: "select",
                label: "Service Type",
                required: true,
                options: serviceTypes.map((s) => ({
                  value: s.value,
                  label: s.label,
                })),
              }}
              value={formData.serviceType}
              onChange={handleInputChange}
              error={errors.serviceType}
            />

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                fieldKey="name"
                config={commonFields.name}
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <FormField
                fieldKey="email"
                config={commonFields.email}
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                fieldKey="phone"
                config={commonFields.phone}
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
              />
              <FormField
                fieldKey="pincode"
                config={commonFields.pincode}
                value={formData.pincode}
                onChange={handleInputChange}
                error={errors.pincode}
              />
            </div>

            <FormField
              fieldKey="address"
              config={commonFields.address}
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
            />

            <FormField
              fieldKey="location"
              config={commonFields.location}
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                fieldKey="serviceDate"
                config={commonFields.serviceDate}
                value={formData.serviceDate}
                onChange={handleInputChange}
                error={errors.serviceDate}
              />
              <FormField
                fieldKey="serviceTime"
                config={commonFields.serviceTime}
                value={formData.serviceTime}
                onChange={handleInputChange}
                error={errors.serviceTime}
              />
            </div>

            {/* Service-specific fields */}
            {/* {currentServiceConfig && (
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {currentServiceConfig.label} Details
                </h3>
                {Object.entries(currentServiceConfig.fields).map(
                  ([key, config]) => (
                    <FormField
                      key={key}
                      fieldKey={key}
                      config={config}
                      value={formData[key]}
                      onChange={handleInputChange}
                      error={errors[key]}
                    />
                  )
                )}
              </div>
            )} */}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
