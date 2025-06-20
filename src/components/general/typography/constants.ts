import { Breakpoint, FontWeight, Variant } from "./types";

// export const breakpoints: Breakpoint[] = [
//   "base",
//   "sm",
//   "md",
//   "lg",
//   "xl",
//   "2xl",
// ];

export const variantClasses: Record<Variant, string> = {
  h1: "text-2xl sm:text-4xl font-bold",
  h2: "text-xl sm:text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-lg sm:text-xl font-medium",
  h5: "text-sm sm:text-lg font-medium",
  h6: "text-xs sm:text-base font-medium",
  body: "text-sm",
  caption: "text-xs",
};

export const weightMap: Record<FontWeight, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};
