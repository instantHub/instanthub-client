import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ServicePolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://instanthub.in/service-policy",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://instanthub.in/service-policy",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Service Policy | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content="Service Policy, Service Policy of Instant Hub, Service Policy of InstantHub, service policy of InstantHub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link
          rel="canonical"
          href="https://instanthub.in/service-policy"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* <div className="mx-10 mb-5 mt-5 px-10 py-2 border rounded shadow-2xl flex flex-col gap-2 max-sm:mx-2 max-sm:px-5"> */}
      <div className="my-5 px-1 py-2 flex flex-col gap-2">
        {/* <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"> */}
        <article className="">
          <h1 className="text-3xl max-sm:text-2xl font-bold mb-6 text-center text-gray-800">
            Service Policy
          </h1>
          <p className="text-gray-600 mb-4 max-sm:text-sm">
            Effective date: 2024
          </p>
          <p className="text-gray-600 mb-6 max-sm:text-sm">
            Welcome to Instant Hub. We are committed to protecting your
            personal information and your right to privacy. If you have any
            questions or concerns about our policy, or our practices with
            regards to your personal information, please contact us at
            8722288017.
          </p>

          <section className="flex flex-col gap-2 mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              1. InstantHub Services and Third Party Services and Sites
            </h2>
            <p className="max-sm:text-sm">
              The information and materials provided in the Site and through the
              Services are intended for general reference only, and may not
              describe all of the terms, conditions, and exceptions applicable
              to InstantHub’s Services. InstantHub presents
              information from Third Parties through the InstantHub Site
              and Services, including prices offered for your items, item
              descriptions, certain Third Party terms of service, and other
              information (“Third Party Information”). InstantHub cannot
              control, and is not responsible for the accuracy of any Third
              Party Information.
            </p>
            <p className="max-sm:text-sm">
              You conduct your actual sales and other transactions directly with
              the Third Parties and, unless otherwise specifically and clearly
              indicated, not with InstantHub. InstantHub cannot
              control any aspect of your sales and transactions with Third
              Parties, and the Third Parties are solely responsible to you for
              all aspects of your sales and transactions with them.
            </p>
            <p className="max-sm:text-sm">
              At times, the InstantHub Site may have links to websites
              hosted by the Third Parties and other entities (the “Additional
              Sites”), or such Additional Sites may have links to the
              InstantHub Site. These links are offered as a convenience and
              for informational purposes only, not as referrals or endorsements
              by InstantHub of the Additional Sites. The Additional Sites
              are maintained by their respective organizations, and those
              organizations are solely responsible for the content of their own
              websites. InstantHub does not verify nor make any warranty or
              representation about the content, accuracy, opinions expressed,
              warranties, products or services, intellectual property
              compliance, or links of such Additional Sites. You should read the
              privacy policies and Terms & Conditions agreements of all
              Additional Sites.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm">
              We collect personal details like your name, contact information,
              and product details during registration and transactions. This
              helps us process your requests and ensure seamless service.
            </p>
          </section>

          {/* Use of Collected Information */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              3. Use of Collected Information
            </h2>
            <ul className="list-disc pl-6 text-gray-600 leading-relaxed max-sm:text-sm">
              <li>Facilitating transactions on the platform.</li>
              <li>Sending order updates and promotional offers.</li>
              <li>Improving platform functionality through feedback.</li>
              <li>Ensuring compliance with legal regulations.</li>
            </ul>
          </section>

          {/* Your Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              4. Your Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm">
              As a user, you agree to provide accurate information, maintain the
              confidentiality of your account details, and ensure compliance
              with our terms of service.
            </p>
          </section>

          {/* Updates to the Policy */}
          <section className="mb-8">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-3">
              5. Updates to the Policy
            </h2>
            <p className="text-gray-600 leading-relaxed max-sm:text-sm">
              This policy is subject to updates to reflect changes in
              regulations, services, or other operational factors. Ensure to
              review it periodically.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default ServicePolicy;
