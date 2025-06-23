/**
 * Cleans and formats a comma-separated string of keywords
 *
 * @param raw - Comma-separated keywords string
 * @returns Cleaned string like "keyword1, keyword2, keyword3"
 */
export function formatMetaKeywords(raw: string): string {
  if (!raw || typeof raw !== "string") return "";

  return raw
    .split(",") // Split by commas
    .map((k) => k.trim()) // Trim each keyword
    .filter(Boolean) // Remove empty strings
    .map((k) => k.toLowerCase()) // Lowercase normalization
    .map((k) => k.replace(/\s+/g, " ")) // Collapse multiple spaces
    .map((k) => k.replace(/[^\w\s\-]/g, "")) // Optional: remove special chars
    .filter((val, i, self) => self.indexOf(val) === i) // Remove duplicates
    .join(", ");
}
