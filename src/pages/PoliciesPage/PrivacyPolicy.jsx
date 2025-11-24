import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 p-4 flex items-center gap-4">
        <ChevronLeft
          size={24}
          className="text-orange-500 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold text-gray-800">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white my-6 rounded-lg shadow-sm">
        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Introduction</h2>
            <p className="text-sm leading-relaxed">
              This Privacy Policy describes how <strong>DELIVOO FOOD SERVICES</strong> and its affiliates (collectively "DELIVOO FOOD SERVICES, we, our, us") collect, use, share, protect or otherwise process your information/personal data through our website <strong>blinkfeast.com</strong> (hereinafter referred to as Platform).
            </p>
            <p className="text-sm leading-relaxed mt-2">
              Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.
            </p>
            <p className="text-sm leading-relaxed mt-2">
              By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Collection of Information</h2>
            <p className="text-sm leading-relaxed">
              We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. Some of the information that we may collect includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-2">
              <li>Personal data/information provided during sign-up such as name, date of birth, address, telephone/mobile number, email ID</li>
              <li>Information shared as proof of identity or address</li>
              <li>Sensitive personal data with your consent, such as bank account, credit/debit card, or other payment instrument information</li>
              <li>Biometric information such as facial features or physiological information (when opted for certain features)</li>
              <li>Behaviour, preferences, and other information you choose to provide on our Platform</li>
              <li>Transaction information on Platform and third-party business partner platforms</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3 font-medium text-orange-600">
              You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Usage of Information</h2>
            <p className="text-sm leading-relaxed">
              We use personal data to provide the services you request. We use your personal data to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-2">
              <li>Assist sellers and business partners in handling and fulfilling orders</li>
              <li>Enhance customer experience</li>
              <li>Resolve disputes and troubleshoot problems</li>
              <li>Inform you about online and offline offers, products, services, and updates</li>
              <li>Customize your experience</li>
              <li>Detect and protect against error, fraud and other criminal activity</li>
              <li>Enforce our terms and conditions</li>
              <li>Conduct marketing research, analysis and surveys</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Sharing of Information</h2>
            <p className="text-sm leading-relaxed">
              We may share your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm mt-2">
              <li>Internally within our group entities, corporate entities, and affiliates</li>
              <li>With third parties such as sellers, business partners, logistics partners, payment processors</li>
              <li>With government agencies or law enforcement if required by law</li>
              <li>To protect rights, property or personal safety of our users or the general public</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              These entities may market to you as a result of such sharing unless you explicitly opt-out.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Security Precautions</h2>
            <p className="text-sm leading-relaxed">
              To protect your personal data from unauthorized access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorized access.
            </p>
            <p className="text-sm leading-relaxed mt-2">
              However, the transmission of information over the internet cannot always be guaranteed as completely secure. Users are responsible for ensuring the protection of login and password records for their account.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Data Deletion and Retention</h2>
            <p className="text-sm leading-relaxed">
              You have an option to delete your account by visiting your profile and settings on our Platform. We may refuse or delay deletion in case of pending grievances, claims, or services.
            </p>
            <p className="text-sm leading-relaxed mt-2">
              We retain your personal data for a period no longer than required for the purpose for which it was collected or as required under applicable law. We may continue to retain your data in anonymized form for analytical and research purposes.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-sm leading-relaxed">
              You may access, rectify, and update your personal data directly through the functionalities provided on the Platform.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Consent</h2>
            <p className="text-sm leading-relaxed">
              By visiting our Platform or providing your information, you consent to the collection, use, storage, disclosure and processing of your information in accordance with this Privacy Policy.
            </p>
            <p className="text-sm leading-relaxed mt-2">
              You consent to us contacting you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent by writing to the Grievance Officer.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Changes to Privacy Policy</h2>
            <p className="text-sm leading-relaxed">
              Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices and will notify you about significant changes as required under applicable laws.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Grievance Officer</h2>
            <p className="text-sm text-gray-700">
              <strong>Company:</strong> DELIVOO FOOD SERVICES<br />
              <strong>Address:</strong> B-15, NEW SEELAMPUR NORTH EAST DELHI GARHI MENDU, New Delhi, India<br />
              <strong>Time:</strong> Monday - Friday (9:00 - 18:00)
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
