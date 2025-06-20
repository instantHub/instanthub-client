import { FlexBox, Typography } from "@components/general";
import { GoogleMap } from "@components/user/map";
import { memo } from "react";
import { Link } from "react-router-dom";

interface IFooterLinksProps {
  setOpenComplaintBox: (val: boolean) => void;
}

export const FooterLinks = memo(
  ({ setOpenComplaintBox }: IFooterLinksProps) => {
    const listItemStyle =
      "px-2 py-1 text-sm hover:text-base hover:bg-secondary-light hover:text-secondary rounded-md transition-all";

    return (
      <div className="w-full flex max-sm:flex-col justify-evenly gap-6 sm:gap-4">
        {/* Company Section */}
        <FlexBox direction="col" align="start">
          <Typography variant="h5" className="py-2">
            Company
          </Typography>
          <FlexBox
            direction="col"
            align="start"
            className="font-thin space-y-2"
          >
            <Link to="/about" className={listItemStyle}>
              About Us
            </Link>
            <div className={listItemStyle}>
              <p>We also accept Bulk Orders</p>
              <span className="text-xs">(Contact Us)</span>
            </div>
            <div className={listItemStyle}>
              <span>Partner with Us</span>
              <span className="text-xs text-gray-500">Coming soon</span>
            </div>
          </FlexBox>
        </FlexBox>

        <hr className="sm:hidden bg-gray-300 h-[2px] w-full absolut" />

        {/* Support Section */}
        <FlexBox direction="col" align="start">
          <Typography variant="h5" className="py-2">
            Support
          </Typography>
          <FlexBox
            direction="col"
            align="start"
            className="font-thin space-y-2"
          >
            <span className={listItemStyle}>FAQ</span>
            <Link to="/contact-us" className={listItemStyle}>
              Contact Us
            </Link>
            <button
              type="button"
              className={listItemStyle + " text-left w-full"}
              onClick={() => setOpenComplaintBox(true)}
            >
              Drop Your Complaint
            </button>
          </FlexBox>
        </FlexBox>

        <hr className="sm:hidden bg-gray-300 h-[2px] w-full absolut" />

        {/* Address Section */}
        {/* <FlexBox
          direction="col"
          align="start"
          className="sm:items-center space-y-2"
        >
          <Typography variant="h5">Our Office</Typography>
          <address className="text-sm font-thin pl-2 not-italic max-sm:text-xs leading-relaxed">
            Sarjapur Outer Ring Road, Marathahalli
            <br />
            Bengaluru - 37
            <br />
            Ph: +91 8722288017
            <br />
            support@instanthub.in
            <br />
            info@instanthub.in
            <br />
            GST: 29CSJPA4571K1ZE
          </address>
        </FlexBox> */}

        <GoogleMap />
      </div>
    );
  }
);
