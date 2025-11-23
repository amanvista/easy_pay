import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Terms and Conditions
      </h1>

      <p className="text-gray-700 mb-4">
        Welcome to <strong>BlinkFeast</strong>! These Terms and Conditions outline the rules and
        regulations for using our platform. By accessing or using our website, mobile app, or
        services, you agree to comply with these terms.
      </p>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
          <p className="text-gray-700">
            BlinkFeast is a food pre-ordering platform that allows users to place meal orders for
            pickup from partnered restaurants. We aim to help you save time and avoid queues by
            pre-ordering your favorite meals conveniently.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">2. User Accounts</h2>
          <p className="text-gray-700">
            You must create an account to use certain features. You are responsible for maintaining
            the confidentiality of your account credentials and for all activities under your
            account. BlinkFeast reserves the right to suspend or terminate accounts for any misuse.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">3. Ordering and Payments</h2>
          <p className="text-gray-700">
            Orders placed through BlinkFeast are confirmed only after payment (if required) and
            acknowledgment from the restaurant. Prices and availability of menu items are subject to
            change. BlinkFeast is not responsible for errors caused by incorrect information provided
            by restaurants or users.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">4. Cancellation and Refund Policy</h2>
          <p className="text-gray-700">
            Cancellation requests are subject to restaurant approval. Refunds, if applicable, will
            be processed according to the restaurant’s refund policy. BlinkFeast acts only as a
            facilitator and is not liable for delays or denials from restaurants or payment gateways.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">5. Restaurant Responsibility</h2>
          <p className="text-gray-700">
            Restaurants are solely responsible for food preparation, quality, hygiene, and order
            accuracy. BlinkFeast does not prepare or deliver food and cannot guarantee the quality or
            safety of meals provided by third-party restaurants.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">6. User Conduct</h2>
          <p className="text-gray-700">
            Users must not misuse the platform, including providing false information, engaging in
            fraudulent transactions, or attempting to disrupt operations. Any violation may lead to
            permanent suspension or legal action.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">7. Limitation of Liability</h2>
          <p className="text-gray-700">
            BlinkFeast shall not be liable for any indirect, incidental, or consequential damages
            arising from the use or inability to use the platform, including but not limited to
            delays, service interruptions, or data loss.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">8. Privacy Policy</h2>
          <p className="text-gray-700">
            Your privacy is important to us. Please refer to our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            to understand how we collect, use, and safeguard your information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">9. Modifications</h2>
          <p className="text-gray-700">
            BlinkFeast may update these terms at any time. Continued use of our services after
            changes indicates your acceptance of the revised terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">10. Contact Us</h2>
          <p className="text-gray-700">
            For any questions or concerns about these Terms and Conditions, please contact us at{" "}
            <a href="mailto:support@blinkfeast.com" className="text-blue-600 hover:underline">
              support@blinkfeast.com
            </a>
            .
          </p>
        </div>
      </section>

      <p className="text-gray-500 text-sm mt-8 text-center">
        © {new Date().getFullYear()} BlinkFeast. All Rights Reserved.
      </p>
    </div>
  );
};

export default TermsAndConditionsPage;
