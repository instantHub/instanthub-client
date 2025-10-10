export const formatDate = (dateStr: Date) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return ""; // invalid date check

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short", // 'short' → 'Oct', use 'long' → 'October'
    year: "numeric",
  });
};
