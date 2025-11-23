import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-4">
        At <strong>BlinkFeast</strong>, we value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how we
        collect, use, and safeguard the data you share with us when using our
        platform, website, or mobile app.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            1. Information We Collect
          </h2>
          <p className="text-gray-700">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li><strong>Personal details:</strong> Name, phone number, email address, and delivery address.</li>
            <li><strong>Location data:</strong> When you allow location access, we use your GPS coordinates to suggest nearby restaurants or pickup points.</li>
            <li><strong>Payment information:</strong> Processed securely through third-party payment gateways. We do not store your card details.</li>
            <li><strong>Usage data:</strong> Information about how you use our app, including pages visited, order history, and preferences.</li>
            <li><strong>Device information:</strong> Browser type, IP address, and device identifiers to improve performance and security.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li>Process and manage your orders.</li>
            <li>Provide personalized restaurant and meal recommendations.</li>
            <li>Communicate order updates, offers, and promotions.</li>
            <li>Enhance the functionality and performance of our platform.</li>
            <li>Ensure account and payment security.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            3. Sharing of Information
          </h2>
          <p className="text-gray-700">
            BlinkFeast does <strong>not sell or rent</strong> your personal data. However, we may
            share limited information with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li><strong>Partner restaurants</strong> to fulfill your orders.</li>
            <li><strong>Payment processors</strong> to complete transactions securely.</li>
            <li><strong>Service providers</strong> who help us with analytics, notifications, or delivery coordination.</li>
            <li><strong>Law enforcement authorities</strong> if required by applicable law or to protect BlinkFeast and its users.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700">
            We use cookies and similar technologies to enhance your experience,
            remember your preferences, and analyze usage patterns. You can manage
            or disable cookies in your browser settings, but some features may not
            function properly without them.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            5. Data Security
          </h2>
          <p className="text-gray-700">
            We use industry-standard encryption and security measures to protect
            your personal data. However, please note that no online transmission or
            storage system can be 100% secure. You share data with us at your own
            discretion.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            6. Your Rights
          </h2>
          <p className="text-gray-700">
            You may request to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Withdraw consent for marketing communications.</li>
            <li>Request deletion of your data (subject to legal obligations).</li>
          </ul>
          <p className="text-gray-700 mt-2">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:privacy@blinkfeast.com"
              className="text-blue-600 hover:underline"
            >
              privacy@blinkfeast.com
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            7. Data Retention
          </h2>
          <p className="text-gray-700">
            We retain your data for as long as necessary to provide our services,
            comply with legal obligations, or resolve disputes. After that, your
            information will be securely deleted or anonymized.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            8. Updates to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time to reflect changes
            in our practices or legal requirements. Any updates will be posted on
            this page with the revised date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            9. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have questions or concerns regarding this Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:support@blinkfeast.com"
              className="text-blue-600 hover:underline"
            >
              support@blinkfeast.com
            </a>.
          </p>
        </div>
      </section>

      <p className="text-gray-500 text-sm mt-8 text-center">
        © {new Date().getFullYear()} BlinkFeast. All Rights Reserved.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
