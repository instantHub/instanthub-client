export const PERMISSIONS = {
  READ: ["admin", "executive", "marketing"],
  CREATE: ["admin"],
  UPDATE: ["admin"],
  DELETE: ["admin"],
  EXECUTIVE: ["admin", "executive"],
  MARKETING: ["admin", "marketing"],
} as const;
