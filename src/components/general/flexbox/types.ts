// Type definitions for Tailwind CSS flexbox utilities
export type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";
export type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
export type AlignContent =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";
export type FlexWrap = "wrap" | "wrap-reverse" | "nowrap";
export type Gap =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96
  | "x-1"
  | "x-2"
  | "y-1"
  | "y-2";

// Responsive breakpoint types - mobile first approach
export type ResponsiveValue<T> =
  | T
  | {
      base?: T; // Mobile/default
      sm?: T; // 640px+
      md?: T; // 768px+
      lg?: T; // 1024px+
      xl?: T; // 1280px+
      "2xl"?: T; // 1536px+
    };
