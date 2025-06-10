import React, { ElementType, PropsWithChildren } from "react";
import { variantClasses, weightMap } from "./constants";
import { Breakpoint, FontWeight, TextAlign, TextColor, Variant } from "./types";

export interface TypographyProps {
  as?: ElementType;
  variant?: Variant;
  responsiveVariant?: Partial<Record<Breakpoint, Variant>>;
  weight?: FontWeight;
  align?: TextAlign;
  color?: TextColor;
  uppercase?: boolean;
  italic?: boolean;
  underline?: boolean;
  className?: string;
}

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = ({
  as: Component = "p",
  variant = "body",
  weight,
  align,
  color,
  uppercase,
  italic,
  underline,
  className = "",
  children,
}) => {
  const classes = [
    variantClasses[variant],
    weight ? weightMap[weight] : "",
    align ? `text-${align}` : "",
    color,
    uppercase ? "uppercase" : "",
    italic ? "italic" : "",
    underline ? "underline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
};
