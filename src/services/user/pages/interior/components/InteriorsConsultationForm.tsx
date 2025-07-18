import { FC, useState } from "react";
import { Button, FlexBox, FormInput, Typography } from "@components/general";
import { ArrowDownIcon, CloseIcon } from "@icons";
import { signatureColorText } from "@utils/styles";

// Design Consultation Form Component
interface IInteriorConsultationFormProps {
  onClose: () => void;
}

export const InteriorConsultationForm: FC<IInteriorConsultationFormProps> = ({
  onClose,
}) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsappUpdates: true,
  });

  const propertyTypes = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4+ BHK / Duplex",
    "Kitchen Only",
    "Shop",
  ];
  const locations = [
    "Bengaluru",
    "Mumbai",
    "Delhi",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Gurgaon",
    "Noida",
    "Other",
  ];

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", {
      propertyType: selectedPropertyType,
      location: selectedLocation,
      ...formData,
    });
    // Close modal after submission
    onClose();
  };

  return (
    <div className="w-full max-w-4x">
      <div className="flex flex-row max-sm:flex-col">
        {/* Left Side - Image */}
        {/* <div className="hidden md:block w-1/2 relative"> */}
        <div className="w-full sm:w-1/2">
          <div className="relative h-full min-h-[200px] md:min-h-[600px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 md:rounded-l-2xl overflow-hidden">
            {/* Rain Gains Badge */}
            <div className="absolute top-6 left-6 z-10 max-md:hidden">
              <div className="bg-instant-mid/80 text-white  px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-2">
                <span className="text-sm md:text-lg">🌧️</span>
                Start Today
              </div>
            </div>

            {/* Interior Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80">
              <div className="absolute inset-0 bg-gray-600 opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Interior"
                className="w-screen h-[300px] md:h-full object-cover object-bottom"
                // className="w-[400px] h-[400px] object-cover"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 max-md:top-2 left-0 right-0 p-4 md:p-6 text-white">
              <h2 className="text-xs md:text-xl font-bold mb-2 md:mb-4">
                Save Big on
                <br />
                Modular Interiors
                <br />
                at <span className="text-black">25% OFF</span>
              </h2>
              <p className="text-xs md:text-lg mb-3 md:mb-6">
                Hurry, Book Before 31st July 2025
              </p>

              <div className="flex items-center gap-4 text-[10px] md:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white">🎨</span>
                  </div>
                  <div>
                    <div className="font-semibold">Personalised</div>
                    <div className="text-gray-300">Designs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white">💰</span>
                  </div>
                  <div>
                    <div className="font-semibold">0% Interest</div>
                    <div className="text-gray-300">On EMIs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white">🛡️</span>
                  </div>
                  <div>
                    <div className="font-semibold">10-Year</div>
                    <div className="text-gray-300">Warranty</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-[11px] md:text-xs text-white/50">
                *T&C: Offer valid on orders above Rs. 5 Lakh
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-5 md:p-8 md:relative">
          {/* Instant Hub Logo */}
          <Typography
            variant="h3"
            className={`mb-8 max-md:hidden ${signatureColorText}`}
          >
            Instant Hub
          </Typography>

          {/* Close Button */}
          <Button
            variant="ghost"
            className="absolute top-2 md:top-4 right-2 md:right-4"
            onClick={onClose}
          >
            <CloseIcon className="w-6 h-6 text-gray-600" />
          </Button>

          <form className="flex flex-col gap-2 md:gap-4">
            <Typography variant="h4" className="font-bold">
              Get a free design consultation
            </Typography>

            <div className="flex flex-col gap-2">
              {/* Property Type */}
              <div>
                <Typography variant="caption">Property Location</Typography>
                {/* <div className="grid grid-cols-2 gap-3"> */}
                <div className="flex gap-2 items-center text-xs overflow-x-auto whitespace-nowrap scroll-smooth py-2 scroll-on-hover">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedPropertyType(type)}
                      className={`px-2 py-1 rounded-lg border transition-all ${
                        selectedPropertyType === type
                          ? "border-instant-mid bg-instant-mid/5 text-instant-mid"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Location */}
              <FlexBox direction="col" align="start" className="gap-2 relative">
                <Typography>Property Location</Typography>
                <div className="w-full relative">
                  <button
                    type="button"
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="w-full p-2 text-left border border-gray-200 rounded-lg hover:border-instant-mid transition-colors flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedLocation
                          ? "text-instant-mid"
                          : "text-instant-mid/40"
                      }
                    >
                      {selectedLocation || "Property Location"}
                    </span>
                    <ArrowDownIcon
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isLocationOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isLocationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {locations.map((location) => (
                        <button
                          key={location}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsLocationOpen(false);
                          }}
                          className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </FlexBox>

              {/* Name */}
              <FormInput
                variant="outlined"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              {/* Mobile Number */}
              <FlexBox direction="col" align="start">
                <div className="flex w-full">
                  <div className="flex items-center p-2 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                    <span className="text-gray-700">+91</span>
                    <ArrowDownIcon className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="flex-1 p-2 border border-gray-200 rounded-r-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-instant-mid focus:border-transparent"
                  />
                </div>

                {/* WhatsApp Updates */}
                <FlexBox className="gap-3 m-2 text-sm">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={formData.whatsappUpdates}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whatsappUpdates: e.target.checked,
                      })
                    }
                    className="w-3 h-3 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label
                    htmlFor="whatsapp"
                    className="text-gray-700 flex items-center gap-2"
                  >
                    Yes, send me updates via WhatsApp.
                  </label>
                </FlexBox>
              </FlexBox>
            </div>

            <FlexBox direction="col">
              {/* Submit Button */}
              <Button
                variant="instanthub"
                className="rounded-lg"
                onClick={handleSubmit}
                fullWidth
              >
                Book a Free Consultation
              </Button>

              {/* Terms */}
              <p className="text-xs md:text-sm text-gray-500 text-center">
                By submitting, you consent to{" "}
                <a href="#" className="text-instant-mid hover:underline">
                  privacy policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-instant-mid hover:underline">
                  terms of use
                </a>
              </p>
            </FlexBox>
          </form>
        </div>
      </div>
    </div>
  );
};
