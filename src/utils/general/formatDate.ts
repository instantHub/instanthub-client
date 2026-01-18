export const formatDate = (dateStr: Date) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return ""; // invalid date check

  // return date.toLocaleDateString("en-GB", {
  //   day: "2-digit",
  //   month: "short", // 'short' → 'Oct', use 'long' → 'October'
  //   year: "numeric",
  // });
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
