import { FC, useState } from "react";
import { IStep } from "./types";
import { Typography } from "../typography";
import { FlexBox } from "../flexbox";

interface TimelineProps {
  steps: IStep[];
  activeStep?: number;
  completedSteps?: number[];
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
  title: string;
  subtitle: string;
}

export const VerticalTimeline: FC<TimelineProps> = ({
  steps,
  activeStep = 1,
  completedSteps = [],
  primaryColor = "bg-instant-mid",
  secondaryColor = "bg-gray-200",
  textColor = "text-gray-600",
  backgroundColor = "bg-instant-mid/10",
  className = "",
  title,
  subtitle,
}) => {
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === activeStep) return "active";
    return "inactive";
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          circle: `${primaryColor} text-white shadow-lg`,
          text: "text-gray-900 font-semibold",
          card: "bg-white shadow-lg border border-gray-200",
        };
      case "active":
        return {
          circle: `${primaryColor} text-white shadow-lg ring-4 ring-blue-200`,
          text: "text-gray-900 font-semibold",
          card: "bg-white shadow-xl border border-blue-200 transform scale-105",
        };
      default:
        return {
          circle: `${secondaryColor} text-gray-500`,
          text: textColor,
          card: "bg-white shadow-md border border-gray-200",
        };
    }
  };

  const isLeftSide = (index: number) => index % 2 === 0;

  return (
    <div className={`w-full mx-auto p-8 ${backgroundColor} ${className}`}>
      {/* Header */}
      <FlexBox direction="col" gap={2} className="mb-8">
        <Typography variant="h2">{title}</Typography>
        <Typography variant="h6">{subtitle}</Typography>
      </FlexBox>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 top-0 bottom-0"></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const styles = getStepStyles(status);
          const isLeft = isLeftSide(index);

          return (
            <div key={step.id} className="relative mb-10 last:mb-0">
              <div className="flex items-center">
                {/* Left Side Step */}
                {isLeft ? (
                  <>
                    {/* Left Content */}
                    <div className="w-1/2 pr-3 sm:pr-12">
                      <div
                        className={`
                        p-3 sm:p-6 rounded-lg transition-all duration-300 ease-in-out ml-auto max-w-md
                        ${styles.card}
                      `}
                      >
                        <Typography
                          variant="h4"
                          className={`mb-3 transition-colors duration-300 ${styles.text}`}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body"
                          className={`leading-relaxed transition-colors duration-300 ${textColor}`}
                        >
                          {step.description}
                        </Typography>
                      </div>
                    </div>

                    {/* Center Circle */}
                    <div className="flex-shrink-0 z-10">
                      <div
                        className={`
                        w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold
                        transition-all duration-300 ease-in-out
                        ${styles.circle}
                        ${status === "completed" ? "bg-instant-mid" : ""}

                      `}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Right Empty Space */}
                    <div className="w-1/2 pl-3 sm:pl-12"></div>
                  </>
                ) : (
                  <>
                    {/* Left Empty Space */}
                    <div className="w-1/2 pr-3 sm:pr-12"></div>

                    {/* Center Circle */}
                    <div className="flex-shrink-0 z-10">
                      <div
                        className={`
                        w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg font-bold
                        transition-all duration-300 ease-in-out
                        ${styles.circle}
                        ${status === "completed" ? "bg-instant-mid" : ""}
                      `}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-1/2 pl-3 sm:pl-12">
                      <div
                        className={`
                        p-6 rounded-lg transition-all duration-300 ease-in-out mr-auto max-w-md
                        ${styles.card}
                      `}
                      >
                        <Typography
                          variant="h4"
                          className={`mb-3 transition-colors duration-300 ${styles.text}`}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body"
                          className={`transition-colors duration-300 ${textColor}`}
                        >
                          {step.description}
                        </Typography>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Example usage component
// const TimelineExample: FC = () => {
//   const [activeStep, setActiveStep] = useState(2);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

//   const plumbingSteps: IStep[] = [
//     {
//       id: 1,
//       title: "Request a Quote",
//       description:
//         "Contact us via phone or our online form to describe your issue and get a free, no-obligation quote.",
//     },
//     {
//       id: 2,
//       title: "Schedule Service",
//       description:
//         "We'll work with you to find a convenient appointment time that fits your schedule.",
//     },
//     {
//       id: 3,
//       title: "Problem Solved",
//       description:
//         "Our certified plumber arrives on time, diagnoses the problem, and resolves it efficiently.",
//     },
//   ];

//   const projectSteps: IStep[] = [
//     {
//       id: 1,
//       title: "Discovery Phase",
//       description:
//         "We analyze your requirements and create a detailed project roadmap.",
//     },
//     {
//       id: 2,
//       title: "Design & Planning",
//       description:
//         "Our team creates wireframes and technical specifications for your project.",
//     },
//     {
//       id: 3,
//       title: "Development",
//       description:
//         "We build your solution using the latest technologies and best practices.",
//     },
//     {
//       id: 4,
//       title: "Testing & QA",
//       description:
//         "Rigorous testing ensures your project meets all quality standards.",
//     },
//     {
//       id: 5,
//       title: "Launch & Support",
//       description:
//         "We deploy your project and provide ongoing maintenance and support.",
//     },
//   ];

//   const handleNextStep = () => {
//     if (activeStep < plumbingSteps.length) {
//       setCompletedSteps((prev) => [...prev, activeStep]);
//       setActiveStep((prev) => prev + 1);
//     }
//   };

//   const handleReset = () => {
//     setActiveStep(1);
//     setCompletedSteps([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       {/* Plumbing Example - matches your image */}
//       {/* <VerticalTimeline
//         steps={plumbingSteps}
//         activeStep={activeStep}
//         completedSteps={completedSteps}
//         primaryColor="bg-blue-500"
//         secondaryColor="bg-gray-200"
//         textColor="text-gray-600"
//         backgroundColor="bg-white"
//         className="rounded-lg shadow-lg mb-8"
//       /> */}

//       {/* Control Buttons */}
//       <div className="flex justify-center gap-4 mb-16">
//         <button
//           onClick={handleNextStep}
//           disabled={activeStep > plumbingSteps.length}
//           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//         >
//           Next Step
//         </button>
//         <button
//           onClick={handleReset}
//           className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Project Development Example with 5 Steps - shows alternating pattern */}
//       <VerticalTimeline
//         steps={projectSteps}
//         activeStep={3}
//         completedSteps={[1, 2]}
//         primaryColor="bg-green-500"
//         secondaryColor="bg-gray-300"
//         textColor="text-gray-700"
//         backgroundColor="bg-gradient-to-br from-green-50 to-blue-50"
//         className="rounded-xl shadow-xl"
//         title="Our 5-Step Development Process"
//         subtitle="From concept to launch, we guide you through every step of the development journey."
//       />
//     </div>
//   );
// };

// export default TimelineExample;
