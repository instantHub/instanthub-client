import { FC } from "react";
import { FlexBox, Typography } from "@components/general";
import {
  additionalInfo,
  processStepsData,
  sellFeaturesData,
  whatCanBeSoldData,
} from "src/data";
import { FeaturesContainer } from "./FeaturesContainer";
import { StepsContainer } from "./StepsContainer";

export const GuideHome: FC = () => {
  return (
    <section className="flex flex-col gap-5 px-6 md:px-24 text-gray-600">
      {/* Heading */}
      <FlexBox direction="col" gap={2} align="start">
        <Typography variant="h3" className="max-sm:text-xl">
          Sell Your Gadgets More - Upgrade the Smart Way!
        </Typography>
        <Typography variant="body" className="max-w-4xl">
          Turn your old devices into instant cash. From smartphones and laptops
          to tablets, vehicles, and electronics services - we make selling
          effortless, transparent, and rewarding.
        </Typography>
      </FlexBox>

      {/* Sell Section */}
      <FeaturesContainer
        title="Sell Your Old Devices"
        description="Whether it's your old mobile, a used laptop, a tablet, or even your
          vehicle, we offer the best value without the hassle of finding buyers
          yourself. Just share your device's details, and get paid instantly."
        features={sellFeaturesData}
      />

      {/* Process Section */}
      <section>
        <Typography variant="h4" className="mb-2">
          How It Works
        </Typography>
        <div className="grid md:grid-cols-2 gap-2 sm:gap-6">
          {processStepsData.map((process, idx) => (
            <div key={idx} className="border p-4 rounded-lg">
              <Typography variant="h5" className="mb-2">
                {process.title}
              </Typography>
              <div className="list-decimal list-inside space-y-1">
                {process.steps.map((step, stepIdx) => (
                  <Typography key={stepIdx}>
                    {stepIdx + 1}. {step}
                  </Typography>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <StepsContainer data={whatCanBeSoldData} />

      {/* Additional Info Section */}
      <FlexBox direction="col" gap={2} align="start" className="mt-5">
        {additionalInfo.map((info, idx) => (
          <Typography key={idx} variant="h6">
            {info}
          </Typography>
        ))}
      </FlexBox>
    </section>
  );
};
