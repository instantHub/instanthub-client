import { FlexBox, Typography } from "@components/general";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@icons";
import { memo } from "react";

export const SocialLinks = memo(() => (
  <FlexBox direction="col" className="gap-3">
    <Typography>Follow Us On</Typography>
    <FlexBox gap={3}>
      <FacebookIcon className="text-blue-600" />
      <InstagramIcon className="text-orange-600" />
      <WhatsAppIcon
        size={16}
        className="bg-green-600 text-white rounded-full"
      />
    </FlexBox>
  </FlexBox>
));
