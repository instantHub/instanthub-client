import {
  AstroIcon,
  CalendarScheduleFillIcon,
  EmailIcon,
  HomeIcon,
  MapIcon,
  PhoneIcon,
  ProfileIcon,
  ServiceIcon,
} from "@icons";
import { FieldConfig, ServiceConfig } from "./types";
import { SERVICES_NAME } from "@utils/types";

// Service configurations
export const serviceConfigs: Record<SERVICES_NAME, ServiceConfig> = {
  "interior-design": {
    label: "Interior Design",
    icon: <HomeIcon />,
    fields: {
      interiorType: {
        type: "select",
        label: "Interior Type",
        required: true,
        options: [
          "1 BHK",
          "2 BHK",
          "3 BHK",
          "Kitchen",
          "Living Room",
          "Bedroom",
          "Office",
          "Shop",
          "Restaurant",
          "Complete Home",
        ],
        placeholder: "Select interior type",
      },
      rooms: {
        type: "text",
        label: "Number of Rooms",
        placeholder: "Enter number of rooms (if applicable)",
      },
      budget: {
        type: "select",
        label: "Budget Range",
        options: [
          "Under ₹50,000",
          "₹50,000 - ₹1,00,000",
          "₹1,00,000 - ₹2,00,000",
          "₹2,00,000 - ₹5,00,000",
          "Above ₹5,00,000",
        ],
        placeholder: "Select budget range",
      },
    },
  },
  "device-repair": {
    label: "Mobile/Laptop Repair",
    icon: <ServiceIcon />,
    fields: {
      deviceBrand: {
        type: "select",
        label: "Device Brand",
        required: true,
        options: [
          "Apple",
          "Samsung",
          "OnePlus",
          "Xiaomi",
          "Oppo",
          "Vivo",
          "HP",
          "Dell",
          "Lenovo",
          "Asus",
          "Acer",
          "MacBook",
        ],
        placeholder: "Select device brand",
      },
      deviceModel: {
        type: "text",
        label: "Device Model",
        placeholder: "Enter device model (e.g., iPhone 14, MacBook Pro)",
      },
      deviceProblems: {
        type: "checkbox",
        label: "Problems (Select all that apply)",
        required: true,
        multiple: true,
        options: [
          "Screen Damage",
          "Battery Issue",
          "Charging Problem",
          "Speaker/Audio Issue",
          "Camera Problem",
          "Software Issue",
          "Water Damage",
          "Overheating",
          "Keyboard Issue",
          "Touchpad Problem",
          "Performance Issue",
          "Virus/Malware",
        ],
      },
      additionalDetails: {
        type: "textarea",
        label: "Additional Problem Details",
        placeholder: "Describe any additional issues or specific details...",
        rows: 3,
      },
      warrantyStatus: {
        type: "radio",
        label: "Warranty Status",
        options: ["Under Warranty", "Out of Warranty", "Not Sure"],
      },
    },
  },
  catering: {
    label: "Catering Service",
    icon: <AstroIcon />,
    fields: {
      cateringType: {
        type: "radio",
        label: "Catering Type",
        required: true,
        options: ["Vegetarian", "Non-Vegetarian", "Both"],
      },
      guestCount: {
        type: "text",
        label: "Number of Guests",
        required: true,
        placeholder: "Enter expected number of guests",
        validation: (value: string) => {
          const num = parseInt(value);
          if (!value || isNaN(num) || num <= 0)
            return "Please enter a valid number of guests";
          return null;
        },
      },
      cateringItems: {
        type: "checkbox",
        label: "Items Required (Select all that apply)",
        required: true,
        multiple: true,
        options: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Snacks",
          "Beverages",
          "Desserts",
          "Traditional Indian",
          "South Indian",
          "North Indian",
          "Chinese",
          "Continental",
          "Street Food",
          "Party Package",
          "Corporate Meal",
        ],
      },
      eventType: {
        type: "select",
        label: "Event Type",
        options: [
          "Wedding",
          "Birthday Party",
          "Corporate Event",
          "Festival Celebration",
          "Conference",
          "Private Gathering",
          "Other",
        ],
        placeholder: "Select event type",
      },
      specialRequirements: {
        type: "textarea",
        label: "Special Dietary Requirements",
        placeholder: "Any allergies, preferences, or special requests...",
        rows: 3,
      },
    },
  },
  cleaning: {
    label: "Cleaning Service",
    icon: <ProfileIcon />,
    fields: {
      cleaningType: {
        type: "checkbox",
        label: "Cleaning Services Required",
        required: true,
        multiple: true,
        options: [
          "Deep Cleaning",
          "Regular Cleaning",
          "Kitchen Cleaning",
          "Bathroom Cleaning",
          "Carpet Cleaning",
          "Window Cleaning",
          "Post-Construction Cleaning",
        ],
      },
      propertySize: {
        type: "select",
        label: "Property Size",
        required: true,
        options: [
          "1 BHK",
          "2 BHK",
          "3 BHK",
          "4+ BHK",
          "Villa",
          "Office",
          "Shop",
        ],
        placeholder: "Select property size",
      },
      frequency: {
        type: "radio",
        label: "Service Frequency",
        options: ["One-time", "Weekly", "Bi-weekly", "Monthly"],
      },
    },
  },
  other: {
    label: "Other Services",
    icon: <ProfileIcon />,
    fields: {
      serviceDescription: {
        type: "textarea",
        label: "Service Description",
        required: true,
        placeholder: "Please describe your service requirements in detail...",
        rows: 4,
      },
      urgency: {
        type: "radio",
        label: "Urgency Level",
        options: ["Low", "Medium", "High", "Urgent"],
      },
      estimatedDuration: {
        type: "select",
        label: "Estimated Duration",
        options: [
          "1-2 hours",
          "3-4 hours",
          "Half day",
          "Full day",
          "Multiple days",
        ],
        placeholder: "Select estimated duration",
      },
    },
  },
};

// Common field configurations
export const commonFields: Record<string, FieldConfig> = {
  name: {
    type: "text",
    label: "Full Name",
    required: true,
    placeholder: "Enter your full name",
    icon: <ProfileIcon />,
    validation: (value: string) => (!value.trim() ? "Name is required" : null),
  },
  email: {
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Enter your email",
    icon: <EmailIcon />,
    validation: (value: string) => {
      if (!value.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
      return null;
    },
  },
  phone: {
    type: "tel",
    label: "Phone Number",
    required: true,
    placeholder: "Enter your phone number",
    icon: <PhoneIcon />,
    validation: (value: string) => {
      if (!value.trim()) return "Phone is required";
      if (!/^\d{10}$/.test(value.replace(/\D/g, "")))
        return "Phone must be 10 digits";
      return null;
    },
  },
  address: {
    type: "textarea",
    label: "Address",
    required: true,
    placeholder: "Enter your complete address",
    icon: <MapIcon />,
    rows: 3,
    validation: (value: string) =>
      !value.trim() ? "Address is required" : null,
  },
  pincode: {
    type: "text",
    label: "Pincode",
    required: true,
    placeholder: "Enter pincode",
    validation: (value: string) =>
      !value.trim() ? "Pincode is required" : null,
  },
  location: {
    type: "text",
    label: "Location/Area",
    required: true,
    placeholder: "Enter your location/area",
    validation: (value: string) =>
      !value.trim() ? "Location is required" : null,
  },
  serviceDate: {
    type: "date",
    label: "Service Date",
    required: true,
    icon: <CalendarScheduleFillIcon />,
    min: new Date().toISOString().split("T")[0],
    validation: (value: string) => (!value ? "Service date is required" : null),
  },
  serviceTime: {
    type: "time",
    label: "Preferred Time",
    required: true,
    icon: <CalendarScheduleFillIcon />,
    validation: (value: string) => (!value ? "Service time is required" : null),
  },
};
