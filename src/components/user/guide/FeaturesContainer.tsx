import { FlexBox, Typography } from "@components/general";
import { FC } from "react";
import { IGuideFeature } from "src/data";

interface IFeaturesContainerProps {
  title: string;
  description: string;
  features: IGuideFeature[];
}
export const FeaturesContainer: FC<IFeaturesContainerProps> = ({
  title,
  description,
  features,
}) => {
  return (
    <FlexBox direction="col" align="start" gap={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body">{description}</Typography>

      <ul className="mt-2 space-y-">
        {features.map((feature, idx) => (
          <li key={idx} className="list-disc list-inside max-sm:text-sm">
            {/* {feature.title && <strong>{feature.title}:</strong>}{" "} */}
            {feature.title && <span>{feature.title}:</span>}{" "}
            {feature.description}
          </li>
        ))}
      </ul>
    </FlexBox>
  );
};
