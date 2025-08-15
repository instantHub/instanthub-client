import { FC } from "react";
import { IStep } from "./types";
import { Typography } from "../typography";
import { FlexBox } from "../flexbox";
import { signatureColorText } from "@utils/styles";

interface MobileStepperProps {
  title: string;
  subtitle: string;
  steps: IStep[];
  activeStep?: number;
  completedSteps?: number[];
  circleColor?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
}

export const MobileStepper: FC<MobileStepperProps> = ({
  title,
  subtitle,
  steps,
  activeStep = 1,
  completedSteps = [],
  circleColor = "bg-instant-mid",
  backgroundColor = "bg-white",
  className = "",
}) => {
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === activeStep) return "active";
    return "inactive";
  };

  const getStepStyles = () => {
    return {
      circle: `${circleColor} text-white`,
      title: "text-gray-900 font-semibold",
      desc: "text-gray-600",
    };
  };

  return (
    <div
      className={`w-full min-h-[450px] px-5 py-10 ${backgroundColor} ${className}`}
    >
      {/* Header */}
      <FlexBox direction="col" gap={2} className="mb-8">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h6">{subtitle}</Typography>
      </FlexBox>
      <div className="flex flex-col gap-8">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const styles = getStepStyles();
          const isEven = index % 2 === 0;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 ${
                isEven ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold shrink-0 ${styles.circle}`}
              >
                {step.id}
              </div>

              {/* Step Text */}
              <div className="flex-1">
                <Typography variant="h5" className={`mb-1 ${styles.title}`}>
                  {step.title}
                </Typography>
                <Typography variant="body" className={`${styles.desc}`}>
                  {step.description}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
