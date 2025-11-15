import React from "react";

// TypeScript interface for blog post sections (optional, but good for structure)
interface BlogSection {
  id: string;
  title: string;
  content: JSX.Element; // Use JSX.Element to allow rich content like paragraphs, lists, etc.
  image?: string; // Optional image URL for the section
}

export const iPhone17: React.FC = () => {
  // Define blog post content as structured data
  const blogContent: BlogSection[] = [
    {
      id: "introduction",
      title: "Introduction: The Next Chapter is Here",
      content: (
        <>
          <p className="mb-4">
            The wait is over. Apple has officially unveiled the iPhone 17
            series, and it's clear this generation marks a significant leap,
            especially for the standard models. Following months of
            anticipation, the new lineup is here, pushing boundaries in
            performance, display technology, and camera capabilities.
          </p>
          <p className="mb-4">
            This generation isn't just an incremental upgrade; it’s a major
            refinement of the smartphone experience. With groundbreaking camera
            systems across the board and a display that truly melts into your
            palm, let's dive into our hands-on review of all models in the new
            iPhone 17 lineup.
          </p>
        </>
      ),
    },
    {
      id: "design",
      title: "Overall Design & Aesthetic",
      image:
        "https://images.unsplash.com/photo-1695420999527-2c1762c68661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            Apple's design philosophy continues to evolve. The standard iPhone
            17 features a robust aluminum frame with more subtle curvatures,
            improving ergonomics. The biggest design news, however, is the
            all-new **iPhone 17 Air**, which replaces the "Plus" model with an
            impressively thin 5.6mm titanium chassis.
          </p>
          <p className="mb-4">
            The Pro models feature a new{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              unibody aluminum design
            </strong>
            , which incorporates a "camera plateau" that blends the camera
            system more seamlessly into the body. Bezels are thinner across all
            models, and the{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Dynamic Island
            </strong>{" "}
            is noticeably smaller, becoming a more discreet pill-shape that
            maximizes screen real estate.
          </p>
        </>
      ),
    },
    {
      id: "display",
      title: "Display Innovations",
      image:
        "https://images.unsplash.com/photo-1682695795493-15777a56885e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            This is the year the standard iPhone truly caught up. The iPhone 17
            and 17 Air now feature{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              ProMotion technology
            </strong>{" "}
            with an adaptive 120Hz refresh rate and an **Always-On display**,
            finally eliminating a key differentiator to the Pro line.
          </p>
          <p className="mb-4">
            The Pro and Pro Max models, while not adopting the rumored
            Micro-LED, feature an incredibly bright Super Retina XDR display
            with a new{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              anti-reflective coating
            </strong>
            , making a huge difference in direct sunlight. All four models boast
            an impressive **3000 nits peak outdoor brightness**.
          </p>
        </>
      ),
    },
    {
      id: "chipset",
      title: "Chipset & Performance (A19 Series)",
      image:
        "https://images.unsplash.com/photo-1695420999527-2c1762c68661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            At the heart of the new lineup are two new chips. The iPhone 17 and
            17 Air are powered by the formidable{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              A19 Bionic chip
            </strong>
            , featuring a 6-core CPU and 5-core GPU that deliver blistering
            performance.
          </p>
          <p className="mb-4">
            The Pro models get the top-tier{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              A19 Pro chip
            </strong>
            , which packs a 6-core GPU and 12GB of RAM. More importantly, the
            Pro models include a new{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              vapor chamber thermal system
            </strong>
            , allowing for up to 40% better-sustained performance during intense
            tasks like gaming and 8K video rendering.
          </p>
        </>
      ),
    },
    {
      id: "camera",
      title: "Camera System Overhaul",
      image:
        "https://images.unsplash.com/photo-1610945415295-cf82390f7a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            This is the biggest update of the year. The Pro models now feature a{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              triple 48MP Fusion camera system
            </strong>
            . The Main and Ultra Wide sensors are 48MP, and they are joined by
            an all-new{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              48MP 4x Telephoto lens
            </strong>{" "}
            (a 100mm equivalent focal length).
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Pro Zoom:
              </strong>{" "}
              The new 48MP telephoto sensor allows for a new{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                8x "optical-quality" zoom
              </strong>{" "}
              by using the central 12MP of the sensor, and digital zoom now
              reaches 40x.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Standard Model Upgrade:
              </strong>{" "}
              The base iPhone 17 and 17 Air also see a massive jump, now
              featuring a{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                dual 48MP camera system
              </strong>
              , bringing a high-resolution Ultra Wide lens to the standard
              models for the first time.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Front Camera:
              </strong>{" "}
              All four models get the new{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                18MP Center Stage front camera
              </strong>
              , a significant boost in detail for selfies and video calls.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "battery",
      title: "Battery Life & Charging",
      image:
        "https://images.unsplash.com/photo-1629851410292-0b1a8f9f0f9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            Thanks to the more efficient A19 chips, battery life is excellent.
            The standard iPhone 17 delivers up to{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              30 hours of video playback
            </strong>
            , a 6-hour increase over its predecessor. The iPhone 17 Pro Max
            remains the battery king, offering up to 37 hours.
          </p>
          <p className="mb-4">
            Charging speeds have also improved. All models now support{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              40W wired charging
            </strong>
            , capable of getting you to 50% in just 20 minutes. Wireless
            charging gets a boost to 25W for both MagSafe and Qi2.
          </p>
        </>
      ),
    },
    {
      id: "connectivity",
      title: "Connectivity",
      image:
        "https://images.unsplash.com/photo-1695420999527-2c1762c68661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Placeholder image
      content: (
        <>
          <p className="mb-4">
            The entire iPhone 17 lineup is at the forefront of connectivity,
            thanks to Apple's new in-house{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Apple N1 networking chip
            </strong>
            .
          </p>
          <p className="mb-4">
            This new chip enables support for{" "}
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Wi-Fi 7
            </strong>
            , bringing unparalleled wireless speeds and lower latency. It also
            powers **Bluetooth 6** and Thread networking technology. The Pro
            models continue to feature a high-speed USB-C port with USB 3 speeds
            for rapid data transfer.
          </p>
        </>
      ),
    },
    {
      id: "models",
      title: "Model-Specific Features & Differentiation",
      content: (
        <>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17:
              </strong>{" "}
              The new baseline. Now features a 6.3" 120Hz ProMotion display, A19
              chip, and a dual 48MP camera system. This is the biggest
              "standard" model upgrade in years.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Air:
              </strong>{" "}
              Replaces the Plus. Features the same specs as the iPhone 17 but in
              an incredibly thin 5.6mm titanium body, making it a premium,
              lightweight-focused option.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Pro:
              </strong>{" "}
              The compact powerhouse. Features the 6.3" ProMotion display, A19
              Pro chip with 12GB RAM, vapor chamber cooling, and the new triple
              48MP camera system with 4x telephoto.
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Pro Max:
              </strong>{" "}
              The ultimate device. Has all the features of the Pro in a larger
              6.9" body, with the best battery life of the entire lineup (up to
              37 hours).
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "pricing",
      title: "Pricing & Availability (Official India Prices)",
      content: (
        <>
          <p className="mb-4">
            The iPhone 17 series is available for pre-order now and will be in
            stores starting later this month. The official Indian pricing (MRP)
            is as follows:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 (256GB):
              </strong>{" "}
              Starting at{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                ₹82,900
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Air (256GB):
              </strong>{" "}
              Starting at{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                ₹1,19,900
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Pro (256GB):
              </strong>{" "}
              Starting at{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                ₹1,34,900
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                iPhone 17 Pro Max (256GB):
              </strong>{" "}
              Starting at{" "}
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                ₹1,49,900
              </strong>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content: (
        <>
          <p className="mb-4">
            The iPhone 17 series is a landmark release, largely because it
            finally brings premium features like ProMotion and a high-res Ultra
            Wide camera to the standard model. This makes the base iPhone 17 the
            most compelling "standard" iPhone in years.
          </p>
          <p className="mb-4">
            For power users, the Pro models deliver, with the new A19 Pro chip's
            sustained performance and a truly revolutionary triple 48MP camera
            system that redefines mobile photography and videography. The iPhone
            17 Pro and Pro Max are, without a doubt, the new creative
            powerhouses to beat.
          </p>
        </>
      ),
    },
  ];

  // State for mobile Table of Contents visibility
  const [isTocOpen, setIsTocOpen] = React.useState(false);

  // Function to smoothly scroll to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsTocOpen(false); // Close ToC on mobile after clicking
    }
  };

  return (
    <div className="w-full bg-white-50 dark:bg-white-900 text-gray-800 dark:text-gray-200">
      {/* Header (You can uncomment this if you have a header component) */}
      {/* <header className="bg-white dark:bg-white-800 shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center max-w-3xl">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            iTech Insights
          </h1>
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsTocOpen(!isTocOpen)}
            aria-label="Toggle Table of Contents"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header> */}

      <main className="w-full mx-auto p-4">
        {/* Main Blog Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mt-8 mb-8 leading-tight text-gray-900 dark:text-gray-100">
          iPhone 17 Review: The Biggest Leap in Years
        </h2>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
          A hands-on review of Apple's new lineup, from the base model to the
          Pro Max.
        </p>

        {/* Mobile Table of Contents */}
        {isTocOpen && (
          <div className="md:hidden bg-white dark:bg-white-800 shadow-lg rounded-lg p-4 mb-6 transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {blogContent.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left w-full block py-1"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Table of Contents */}
          <nav className="hidden md:block w-[550px] text-wrap p-4 bg-white dark:bg-white-800 shadow-lg rounded-lg z-0">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {blogContent.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-left w-full block py-1"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <article className="prose dark:prose-invert">
            {blogContent.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-12 scroll-section" // Make sure your global CSS has .scroll-section { scroll-margin-top: 80px; }
              >
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {section.title}
                </h3>
                {section.image && (
                  <img
                    src={section.image}
                    alt={`Illustration for ${section.title}`}
                    className="w-full h-auto rounded-lg shadow-md mb-6 object-cover"
                    style={{ maxHeight: "400px" }} // Constrain image height
                  />
                )}
                {section.content}
              </section>
            ))}
          </article>
        </div>
      </main>
    </div>
  );
};
