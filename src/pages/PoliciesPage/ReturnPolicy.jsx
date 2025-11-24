import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReturnPolicy = () => {
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
        <h1 className="text-lg font-semibold text-gray-800">Return Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white my-6 rounded-lg shadow-sm">
        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-sm font-medium text-gray-900">
              We offer refund/exchange within first <strong>1 day</strong> from the date of your purchase.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              If 1 day has passed since your purchase, you will not be offered a return, exchange or refund of any kind.
            </p>
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Eligibility for Returns/Exchange</h2>
              <p className="text-sm leading-relaxed mb-3">
                In order to become eligible for a return or an exchange, the following conditions must be met:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>The purchased item should be <strong>unused</strong> and in the same condition as you received it</li>
                <li>The item must have <strong>original packaging</strong></li>
                <li>If the item was purchased on a sale, then the item may <strong>not be eligible</strong> for a return/exchange</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Replacement Policy</h2>
              <p className="text-sm leading-relaxed">
                Only items that are found <strong>defective or damaged</strong> will be replaced by us (based on an exchange request).
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Exempted Categories</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  You agree that there may be certain categories of products/items that are exempted from returns or refunds. Such categories of products would be identified to you at the time of purchase.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Return Process</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Request Return/Exchange</h4>
                    <p className="text-sm text-gray-600">Submit your return or exchange request through your order history</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Product Inspection</h4>
                    <p className="text-sm text-gray-600">Once your returned product is received, we will inspect it</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notification</h4>
                    <p className="text-sm text-gray-600">We will send you an email to notify you about receipt of the returned/exchanged product</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Quality Check & Processing</h4>
                    <p className="text-sm text-gray-600">If approved after quality check, your request will be processed in accordance with our policies</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700">
                If you have any questions about our return policy, please contact our customer service team. We're here to help!
              </p>
            </div>
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

export default ReturnPolicy;
