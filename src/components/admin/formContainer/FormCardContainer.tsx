import { ReactNode } from "react";

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode; // 👈 extra slot for button/link
}

export const FormCardContainer = ({
  title,
  description,
  children,
  className = "",
  headerAction,
}: FormCardProps) => {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200 ${className}`}
    >
      {/* Header with action */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>

      {/* Body */}
      <div className="space-y-4">{children}</div>
    </div>
  );
};
