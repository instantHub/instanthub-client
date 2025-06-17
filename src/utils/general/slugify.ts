export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s/-]/g, "") // allow forward slash `/` and hyphen `-`
    .replace(/\s+/g, "-") // replace whitespace with hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/\/+/g, "/") // collapse multiple slashes (optional)
    .trim();
}
