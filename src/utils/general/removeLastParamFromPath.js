export function removeLastParamFromPath(path) {
  return path.replace(/\/:[^/]+$/, "");
}
