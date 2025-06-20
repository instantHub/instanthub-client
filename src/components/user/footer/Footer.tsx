import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ComplaintBox } from "../ComplaintBox";
import { FlexBox, Typography } from "@components/general";
import { FooterLinks, SocialLinks } from "./components";

export const Footer: FC = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState<boolean>(false);

  return (
    <footer className="bg-instant-mid/10 mt-5 text-secondary w-full px-4 pt-10 pb-10 max-sm:mb-10">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6">
        <FlexBox className="justify-between items-start max-sm:flex-col max-sm:gap-6">
          <FlexBox
            direction="col"
            className="max-sm:w-full justify-evenly max-sm:flex-row gap-4 mx-10"
          >
            <img
              src="/images/logo-transparent.png"
              alt="logo"
              className="w-[120px] sm:mb-4"
              loading="lazy"
            />
            <SocialLinks />
          </FlexBox>

          {/* Footer Navigation Links */}
          <FooterLinks setOpenComplaintBox={setOpenComplaintBox} />
        </FlexBox>

        {/* Bottom Section */}
        <FlexBox direction="col" className="items-center gap-2 text-xs">
          <FlexBox className="flex-wrap justify-center gap-4">
            <Link
              to="/terms-conditions"
              className="border-b border-gray-400 pb-0.5"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy-policies"
              className="border-b border-gray-400 pb-0.5"
            >
              Privacy Policy
            </Link>
            <Link
              to="/service-policy"
              className="border-b border-gray-400 pb-0.5"
            >
              Service Policy
            </Link>
            <Link
              to="/terms-of-use"
              className="border-b border-gray-400 pb-0.5"
            >
              Terms of Use
            </Link>
          </FlexBox>
          <Typography variant="caption" className="text-center mt-2">
            All Rights Reserved © 2025 - Instant Hub
          </Typography>
        </FlexBox>
      </div>

      {openComplaintBox && (
        <ComplaintBox setOpenComplaintBox={setOpenComplaintBox} />
      )}
    </footer>
  );
};
