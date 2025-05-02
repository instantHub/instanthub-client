/**
 * Replaces `:param` in route with actual values
 * @param {string} path - Route path with params (e.g. "/categories/brands/:catId")
 * @param {Object} params - Key-value map of param names and values
 * @returns {string} Final path with params replaced
 */
export function generatePathWithParams(path, params) {
  //   return Object.entries(params).reduce(
  //     (updatedPath, [key, value]) => updatedPath.replace(`:${key}`, value),
  //     path
  //   );

  const lastColonIndex = path.lastIndexOf(":");
  if (lastColonIndex === -1) return path; // no param to replace

  const basePath = path.slice(0, lastColonIndex);

  return `${basePath}${params}`;
}
