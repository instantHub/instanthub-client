import { IConditions } from "@features/api/productsApi/types";
import { IExtendedCondition, ISortedConditionsByPage } from "@utils/types";

// Structure of grouped result
interface IGroupedConditions {
  [page: number]: IExtendedCondition[];
}

function groupConditionsByPage(
  conditions: IConditions[]
): ISortedConditionsByPage[] {
  const grouped = conditions.reduce<IGroupedConditions>((acc, condition) => {
    const { page } = condition;

    if (!acc[page]) {
      acc[page] = [];
    }

    const isSelected = { selected: false, selectedLabel: null };

    acc[page].push({ ...condition, isSelected });
    return acc;
  }, {});

  // Convert the grouped object into an array of pages with conditions
  const sortedPages: ISortedConditionsByPage[] = Object.keys(grouped)
    .map(Number) // convert string keys → number
    .sort((a, b) => a - b)
    .map((page) => ({
      page,
      conditions: grouped[page],
    }));

  console.log("sortedPages", sortedPages);

  return sortedPages;
}

// ✅ Email validator
const validateEmail = (email: string): boolean => {
  console.log("email from validation", email);
  const regex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|icloud\.com|hotmail\.com|aol\.com)$/i;

  return regex.test(email.trim()); // Trim spaces & match case-insensitively
};

// ✅ Pin code change handler
const handlePinCodeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAddressDetails: (value: { pinCode: number }) => void,
  addressDetails: { pinCode: number },
  toast: { error: (msg: string) => void }
): void => {
  let value = e.target.value.replace(/\D/g, ""); // remove non-numeric

  if (value.length <= 6) {
    setAddressDetails({ ...addressDetails, pinCode: Number(value) });
  } else {
    toast.error("PinCode cannot be more than 6 digits");
  }
};

// ✅ Phone number change handler
const handlePhoneChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: (value: { phone: number }) => void,
  formData: { phone: number },
  toast: { error: (msg: string) => void }
): void => {
  let value = e.target.value.replace(/\D/g, ""); // remove non-numeric

  if (value.length <= 10) {
    setFormData({ ...formData, phone: Number(value) });
  } else {
    toast.error("Phone Number cannot be more than 10 digits");
  }
};

export {
  groupConditionsByPage,
  validateEmail,
  handlePinCodeChange,
  handlePhoneChange,
};
