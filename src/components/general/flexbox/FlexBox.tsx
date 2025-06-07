import {
  alignContentMapper,
  alignMapper,
  directionMapper,
  gapMapper,
  generateResponsiveClasses,
  justifyMapper,
  wrapMapper,
} from "./helper";
import {
  AlignContent,
  AlignItems,
  FlexDirection,
  FlexWrap,
  Gap,
  JustifyContent,
  ResponsiveValue,
} from "./types";

interface FlexBoxProps {
  children: React.ReactNode;
  direction?: ResponsiveValue<FlexDirection>;
  justify?: ResponsiveValue<JustifyContent>;
  align?: ResponsiveValue<AlignItems>;
  alignContent?: ResponsiveValue<AlignContent>;
  wrap?: ResponsiveValue<FlexWrap>;
  gap?: ResponsiveValue<Gap>;
  fullWidth?: Boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  direction = "row",
  justify = "center",
  align = "center",
  alignContent,
  wrap,
  gap,
  fullWidth = false,
  className = "",
  as: Component = "div",
  style,
  ...props
}) => {
  // Generate all responsive classes
  const directionClasses = generateResponsiveClasses(
    "flex",
    direction,
    directionMapper
  );
  const justifyClasses = generateResponsiveClasses(
    "justify",
    justify,
    justifyMapper
  );
  const alignClasses = generateResponsiveClasses("items", align, alignMapper);
  const alignContentClasses = generateResponsiveClasses(
    "content",
    alignContent,
    alignContentMapper
  );
  const wrapClasses = generateResponsiveClasses("flex", wrap, wrapMapper);
  const gapClasses = generateResponsiveClasses("gap", gap, gapMapper);

  // Combine all classes
  const combinedClasses = [
    "flex",
    directionClasses,
    justifyClasses,
    alignClasses,
    alignContentClasses,
    wrapClasses,
    gapClasses,
    fullWidth ? "w-full px-2" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={combinedClasses} style={style} {...props}>
      {children}
    </Component>
  );
};
