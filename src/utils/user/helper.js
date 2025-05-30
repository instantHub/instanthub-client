function groupConditionsByPage(conditions) {
  // console.log("IN groupConditionsByPage", conditions);
  const grouped = conditions.reduce((acc, condition) => {
    const { page } = condition;
    // console.log("condition", condition);
    if (!acc[page]) {
      acc[page] = [];
    }
    // acc[page].push(condition);
    const isSelected = { selected: false, selectedLabel: null };
    // const multiSelect = condition.conditionName.includes("Problem");

    acc[page].push({ ...condition, isSelected });
    return acc;
  }, {});

  // Convert the grouped object into an array of pages with conditions
  const sortedPages = Object.keys(grouped)
    .sort((a, b) => a - b)
    .map((page) => ({
      page,
      conditions: grouped[page],
    }));

  // console.log("sortedPages", sortedPages);

  return sortedPages;
}

const validateEmail = (email) => {
  console.log("email from validation", email);
  const regex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|hotmail\.com|aol\.com)$/i;

  return regex.test(email.trim()); // Trim spaces & match case-insensitively
};

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

export { groupConditionsByPage, validateEmail };
