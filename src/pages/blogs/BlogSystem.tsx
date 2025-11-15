import { signatureColorBackground, signatureColorText } from "@utils/styles";
import { FlexBox, Typography } from "@components/general";
import { BlogCarousel } from "./BlogCarousel";

export const BlogSystem = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`${signatureColorBackground} py-16 px-4`}>
        <FlexBox direction="col" className="min-h-[250px]">
          <Typography variant="h1" className="mb-6 text-center">
            Turn Your Old Gadgets Into
            <span className={`block ${signatureColorText}`}>
              Cold Hard Cash
            </span>
          </Typography>
          <Typography variant="h4" className="opacity-90 text-center">
            Expert guides, insider tips, and proven strategies to maximize your
            resale profits
          </Typography>
        </FlexBox>
      </div>

      {/* Featured Articles Carousel */}
      <div className="mx-auto px-8 py-16">
        {/* Section Header */}
        <FlexBox direction="col" className="mb-12">
          <Typography variant="h1" className="mb-4 text-center">
            Latest Selling Guides
          </Typography>
          <Typography variant="h4" className="opacity-90 leading-relaxed">
            Professional advice to help you get top dollar for your electronics
          </Typography>
        </FlexBox>

        {/* Carousel Container */}
        <BlogCarousel />
      </div>

      {/* CTA Section */}
      <div className={`${signatureColorBackground} py-16 px-4`}>
        <FlexBox direction="col" className="min-h-[250px]">
          <Typography variant="h1" className="mb-2 text-center">
            Ready to Turn Your Electronics Into Cash?
          </Typography>
          <Typography variant="h4" className="opacity-90 text-center mb-6">
            Get instant quotes and hassle-free selling experience
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleScrollTop}
              className="bg-white text-instant-mid px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Instant Quote
            </button>
            <button className="border border-instant-mid text-instant-mid px-8 py-4 rounded-xl font-bold hover:bg-white transition-all transform hover:scale-105">
              Learn More
            </button>
          </div>
        </FlexBox>
      </div>
    </div>
  );
};
