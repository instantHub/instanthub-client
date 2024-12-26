import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.instanthub.in/privacy-policy",
    name: "InstantHub",
    description:
      "Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more..!",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.instanthub.in/privacy-policy",
      "query-input": "required name=search_term_string",
    },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Privacy Policy | InstantHub`}</title>
        <meta
          name="description"
          content="Get instant cash payments with InstantHub on selling your old, unused gadgets with us. Get instant cash at your doorstep. Visit the website to know more!"
        />
        <meta
          name="keywords"
          content="Privacy Policy, Privacy Policy of Instant Hub, Privacy Policy of InstantHub, privacy policy of instanthub, privacy policy of instant hub"
        />
        <meta name="author" content="Yusufulla Qureshi" />
        <link
          rel="canonical"
          href="https://www.instanthub.in/privacy-policies"
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {/* <div className="mx-10 mb-5 mt-5 px-10 py-2 border rounded shadow-2xl flex flex-col gap-2 max-sm:mx-2 max-sm:px-5"> */}
      <div className="my-5 px-1 py-2 flex flex-col gap-2">
        {/* <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"> */}
        <div className="">
          <h1 className="text-3xl max-sm:text-2xl font-bold mb-6 text-center text-gray-800">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-4 max-sm:text-sm">
            Effective date: 2024
          </p>
          <p className="text-gray-600 mb-6 max-sm:text-sm">
            {/* Welcome to Instant Hub. We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about our policy, or our practices with regards to your
            personal information, please contact us at 8722288017.
            <br /> */}
            Thank you for visiting Instant Hub. Your privacy is important to us,
            and we are dedicated to safeguarding your personal data. If you have
            any questions or concerns about this policy or how we handle your
            personal information, please feel free to reach out to us at
            8722288017.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 1. Information We Collect */}
              1. Information We Gather
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* We collect personal information that you voluntarily provide to us
              when you register on the Website, express an interest in obtaining
              information about us or our products and services, when you
              participate in activities on the Website or otherwise when you
              contact us. */}
              We collect the personal details you willingly provide when you:
            </p>
            <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
              <li>Register on our website.</li>
              <li>Show interest in our products, services, or updates.</li>
              <li>
                Participate in activities or interact with us through the
                website.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 2. How We Use Your Information */}
              2. Purpose of Using Your Information
            </h2>
            <p className="text-gray-600 mb-4 max-sm:text-sm">
              {/* We use personal information collected via our Website for a
              variety of business purposes described below. We process your
              personal information for these purposes in reliance on our
              legitimate business interests, in order to enter into or perform a
              contract with you, with your consent, and/or for compliance with
              our legal obligations. We use the information we collect or
              receive:
              <br /> */}
              The information collected via our website is utilized for several
              business-related purposes, including but not limited to:
            </p>
            <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
              {/* <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To send administrative information to you.</li>
              <li>Fulfill and manage your orders.</li>
              <li>To post testimonials.</li>
              <li>Request feedback.</li>
              <li>To protect our services.</li>
              <li>To enforce our terms, conditions, and policies.</li> */}
              <li>Creating and managing user accounts.</li>
              <li>Sending promotional and marketing messages.</li>
              <li>Delivering important updates and notifications.</li>
              <li>Processing and fulfilling orders.</li>
              <li>Displaying user reviews or testimonials.</li>
              <li>Requesting feedback to enhance our services.</li>
              <li>Ensuring the security of our services.</li>
              <li>Enforcing our terms, policies, and agreements.</li>
            </ul>
            <p className="text-gray-600 mb-4 max-sm:text-sm mt-1">
              We rely on your consent, legitimate business interests, contract
              fulfillment, and legal compliance to process this information.
            </p>
          </section>

          <section className="mb-6 max-sm:text-lg">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 3. Will Your Information Be Shared With Anyone? */}
              3. Information Sharing
            </h2>
            <p className="text-gray-600 max-sm:text-sm mb-1">
              {/* We only share information with your consent, to comply with laws,
              to provide you with services, to protect your rights, or to
              fulfill business obligations.
              <br /> */}
              We disclose personal data only:
            </p>
            <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
              <li>With your explicit consent.</li>
              <li> When required by law.</li>
              <li>To deliver services or fulfill business needs.</li>
              <li>
                To safeguard your rights or comply with legal obligations.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 4. How Long Do We Keep Your Information? */}
              4. Retention of Information
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* We keep your information for as long as necessary to fulfill the
              purposes outlined in this privacy policy unless otherwise required
              by law.
              <br /> */}
              Your data is retained for as long as necessary to achieve the
              purposes outlined in this policy unless a longer retention period
              is required by applicable laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 5. How Do We Keep Your Information Safe? */}
              5. Security Measures
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* We aim to protect your personal information through a system of
              organizational and technical security measures.
              <br /> */}
              We prioritize the security of your personal information and
              implement both organizational and technical measures to protect it
              against unauthorized access or misuse.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 6. Do We Use Cookies and Other Tracking Technologies? */}
              6. Use of Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* We may use cookies and similar tracking technologies to access or
              store information.
              <br /> */}
              Our website may use cookies and similar technologies to store or
              access information for enhanced functionality and user experience.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              {/* 7. What Are Your Privacy Rights? */}
              7. Your Privacy Rights
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* You have certain rights under applicable data protection laws.
              These may include the right to access, correct, and delete your
              personal data, and the right to object to certain data processing
              activities.
              <br /> */}
              Under relevant privacy laws, you have rights such as:
            </p>
            <ul className="list-disc pl-5 max-sm:text-sm text-gray-600">
              <li>Accessing and reviewing your personal information.</li>
              <li>Requesting corrections or deletions of your data.</li>
              <li>Objecting to specific data processing activities.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              8. Policy Updates
            </h2>
            <p className="text-gray-600 max-sm:text-sm">
              {/* We may update this privacy policy from time to time in order to
              reflect, for example, changes to our practices or for other
              operational, legal, or regulatory reasons. */}
              This privacy policy may be revised periodically to reflect changes
              in our practices, legal requirements, or operational updates. We
              recommend reviewing this page regularly for any modifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl max-sm:text-lg font-semibold text-gray-700 mb-2">
              9. Contact Us
            </h2>
            <p className="text-gray-600 mb-4 max-sm:text-sm">
              If you have questions or comments about this policy, you may email
              us at support@instanthub.in or by post to:
            </p>
            <address className="text-gray-600 max-sm:text-sm not-italic">
              Instant Hub <br />
              Sy. No. 92, R Greens A.C, <br />
              Sarjapur Outer Ring Road Marathahalli <br />
              <br />
              Bengaluru, Karnataka - 560037 <br />
              India
            </address>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
