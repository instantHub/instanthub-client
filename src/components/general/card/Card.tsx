import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({
  children,

  className = "",
}) => {
  return (
    <div className={`p-6 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardProps> = ({
  children,
  icon,
  className = "",
}) => {
  return (
    <h3
      className={`flex gap-2 items-center text-lg font-semibold text-slate-900 ${className}`}
    >
      {icon && <span className="mr-1 flex-shrink-0">{icon}</span>}
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  return (
    <p className={`text-sm text-slate-500 mt-1 ${className}`}>{children}</p>
  );
};

export const CardContent: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 ${className}`}
    >
      {children}
    </div>
  );
};
