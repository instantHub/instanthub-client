const handlePinCodeChange = (e) => {
  let value = e.target.value;

  // Remove non-numeric characters
  value = value.replace(/\D/g, "");

  // Restrict the length to 10 digits
  if (value.length <= 6) {
    setAddressDetails({ ...addressDetails, pinCode: Number(e.target.value) });
  } else {
    toast.error("PinCode cannot be more than 6 digits");
    return;
  }
};

const handlePhoneChange = (e) => {
  let value = e.target.value;

  // Remove non-numeric characters
  value = value.replace(/\D/g, "");

  // Restrict the length to 10 digits
  if (value.length <= 10) {
    setFormData({ ...formData, phone: Number(e.target.value) });
  } else {
    toast.error("Phone Number cannot be more than 10 digits");
  }
};

export const validateEmail = (email) => {
  console.log("email from validation", email);
  const regex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|hotmail\.com|aol\.com)$/i;

  return regex.test(email.trim()); // Trim spaces & match case-insensitively
};
