import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-4">Effective date: [Insert Date]</p>
        <p className="text-gray-600 mb-6">
          Welcome to [Your Website Name] (“we”, “our”, “us”). We are committed
          to protecting your personal information and your right to privacy. If
          you have any questions or concerns about our policy, or our practices
          with regards to your personal information, please contact us at [Your
          Contact Information].
        </p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-600">
            We collect personal information that you voluntarily provide to us
            when you register on the Website, express an interest in obtaining
            information about us or our products and services, when you
            participate in activities on the Website or otherwise when you
            contact us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">
            We use personal information collected via our Website for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations. We use the information we collect or receive:
          </p>
          <ul className="list-disc pl-5 text-gray-600">
            <li>To facilitate account creation and logon process.</li>
            <li>To send you marketing and promotional communications.</li>
            <li>To send administrative information to you.</li>
            <li>Fulfill and manage your orders.</li>
            <li>To post testimonials.</li>
            <li>Request feedback.</li>
            <li>To protect our services.</li>
            <li>To enforce our terms, conditions, and policies.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            3. Will Your Information Be Shared With Anyone?
          </h2>
          <p className="text-gray-600">
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            4. How Long Do We Keep Your Information?
          </h2>
          <p className="text-gray-600">
            We keep your information for as long as necessary to fulfill the
            purposes outlined in this privacy policy unless otherwise required
            by law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            5. How Do We Keep Your Information Safe?
          </h2>
          <p className="text-gray-600">
            We aim to protect your personal information through a system of
            organizational and technical security measures.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            6. Do We Use Cookies and Other Tracking Technologies?
          </h2>
          <p className="text-gray-600">
            We may use cookies and similar tracking technologies to access or
            store information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            7. What Are Your Privacy Rights?
          </h2>
          <p className="text-gray-600">
            You have certain rights under applicable data protection laws. These
            may include the right to access, correct, and delete your personal
            data, and the right to object to certain data processing activities.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            8. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            9. Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have questions or comments about this policy, you may email
            us at [Your Email Address] or by post to:
          </p>
          <address className="text-gray-600 not-italic">
            [Your Company Name] <br />
            [Street Address] <br />
            [City, State, Zip Code] <br />
            [Country]
          </address>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
