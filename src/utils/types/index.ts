export type TMakePartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export * from "./admin.types";
export * from "./service.types";
export * from "./sidebar.types";
export * from "./routes.types";
export * from "./meta.types";
export * from "./questions.types";
