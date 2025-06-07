import {
  AlignContent,
  AlignItems,
  FlexDirection,
  FlexWrap,
  Gap,
  JustifyContent,
  ResponsiveValue,
} from "./types";

// Mappers for different flex properties
export const directionMapper = (val: FlexDirection) => `flex-${val}`;
export const justifyMapper = (val: JustifyContent) => `justify-${val}`;
export const alignMapper = (val: AlignItems) => `items-${val}`;
export const alignContentMapper = (val: AlignContent) => `content-${val}`;
export const wrapMapper = (val: FlexWrap) => `flex-${val}`;
export const gapMapper = (val: Gap) => `gap-${val}`;

// Helper function to generate responsive classes
export const generateResponsiveClasses = <T extends string | number>(
  property: string,
  value: ResponsiveValue<T> | undefined,
  mapper: (val: T) => string
): string => {
  if (!value) return "";

  if (typeof value === "object") {
    const classes: string[] = [];

    // Base value (mobile first) - applies to all screen sizes unless overridden
    if (value.base) classes.push(mapper(value.base));

    // Responsive breakpoints
    if (value.sm) classes.push(`sm:${mapper(value.sm)}`);
    if (value.md) classes.push(`md:${mapper(value.md)}`);
    if (value.lg) classes.push(`lg:${mapper(value.lg)}`);
    if (value.xl) classes.push(`xl:${mapper(value.xl)}`);
    if (value["2xl"]) classes.push(`2xl:${mapper(value["2xl"])}`);

    return classes.join(" ");
  }

  return mapper(value);
};
