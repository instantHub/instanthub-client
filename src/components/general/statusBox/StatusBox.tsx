import React from "react";
import { FlexBox } from "../flexbox";

interface StatusBoxProps {
  icon: React.ReactNode;
  text: React.ReactNode;
  color: "green" | "yellow" | "red" | "blue" | "gray"; // extendable
}

export const StatusBox: React.FC<StatusBoxProps> = ({ icon, text, color }) => {
  const colors = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
    },
    gray: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-800",
    },
  }[color];

  return (
    <div
      className={`mb-3 lg:mb-5 p-3 lg:p-4 rounded-lg border text-center ${colors.bg} ${colors.border}`}
    >
      <FlexBox gap={2}>
        {icon}
        <p className={`${colors.text} text-xs lg:text-base`}>{text}</p>
      </FlexBox>
    </div>
  );
};
