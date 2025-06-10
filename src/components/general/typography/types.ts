export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption";

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TextAlign = "left" | "center" | "right" | "justify";
export type TextColor = `text-${string}`; // Tailwind e.g. text-gray-500, text-red-600
