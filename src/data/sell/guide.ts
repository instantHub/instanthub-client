export interface IGuideFeature {
  title?: string;
  description: string;
}

export interface IGuideStep {
  title: string;
  description?: string;
  steps: string[];
}

export const sellFeaturesData: IGuideFeature[] = [
  {
    title: "Instant Price Quote",
    description:
      "Enter your device details and get the best market price in seconds.",
  },
  {
    title: "Free Doorstep Pickup",
    description:
      "We'll pick up your device at your preferred time without any charges.",
  },
  {
    title: "Instant Cash Payment",
    description:
      "Get paid immediately at the time of pickup - no waiting, no delays.",
  },
  {
    title: "Any Brand, Any Condition",
    description:
      "We accept most brands and conditions, including damaged or non-functional devices.",
  },
];

// TODO: change these features to services data
export const buyFeaturesData: IGuideFeature[] = [
  {
    title: "Certified Quality",
    description:
      "Every device goes through 30+ point quality checks before being sold.",
  },
  {
    title: "Warranty Protection",
    description: "Enjoy up to 6 months warranty with every purchase.",
  },
  {
    title: "Flexible Returns",
    description:
      "15-day replacement guarantee for peace of mind and customer satisfaction.",
  },
  {
    title: "Affordable Prices",
    description: "Get top-quality devices at up to 50% less than brand-new.",
  },
];

export const whatCanBeSoldData: IGuideStep = {
  title: "What All Can Be Sold On InstantHub?",
  steps: [
    "You can sell almost all mobile phone or laptop brands in India.",
    "Popular laptops, tablets, and gaming consoles are also available on the go.",
    "InstantHub has more than 20 phone brands, and for every device you sell.",
    "Free home pick up",
    "Instant cash payment on pickup.",
  ],
};

export const processStepsData: IGuideStep[] = [
  {
    title: "Selling Your Device",
    steps: [
      "Visit our website or app.",
      "Choose your device category and enter details.",
      "Get an instant price quote.",
      "Book a free pickup and receive instant cash.",
    ],
  },
  {
    title: "Services",
    steps: [
      "Browse our Service section.",
      "Select particular service you need.",
      "Confirm service details and schedule.",
      "Our expert will arrive at your location.",
    ],
  },
];

export const additionalInfo = [
  "Every device sold to us is securely data-wiped to ensure your personal information remains private. We follow industry-standard practices to protect your data before refurbishing or reselling.",
  "You don't need to worry about your old phone's brand when selling or buying through InstantHub. We accept phones from most brands, so selling is easy. Pick the phone category, brand, and model you want to sell. You can also choose your brand from the quick links below.",
];
