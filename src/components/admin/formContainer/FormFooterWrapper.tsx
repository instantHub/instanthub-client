import { FC, ReactNode } from "react";

interface IFormFooterWrapperProps {
  children: ReactNode;
  className?: string;
}
export const FormFooterWrapper: FC<IFormFooterWrapperProps> = ({
  children,
  className,
}) => {
  return <div className={`mt-6 border-t pt-4 ${className}`}>{children}</div>;
};
