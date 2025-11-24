import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RefundCancellationPolicy = () => {
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
        <h1 className="text-lg font-semibold text-gray-800">Refund & Cancellation Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white my-6 rounded-lg shadow-sm">
        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <p className="text-sm leading-relaxed">
            This refund and cancellation policy outlines how you can cancel or seek a refund for a product/service that you have purchased through the Platform.
          </p>

          <div className="space-y-4 mt-6">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Important Notice</h3>
              <p className="text-sm text-gray-700">
                Cancellations will only be considered if the request is made <strong>1 day</strong> of placing the order.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">1. Cancellation Policy</h2>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>
                  Cancellation requests may not be entertained if the orders have been communicated to sellers/merchants listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery.
                </li>
                <li>
                  In such an event, you may choose to reject the product at the doorstep.
                </li>
                <li>
                  <strong>DELIVOO FOOD SERVICES does not accept cancellation requests for perishable items</strong> like flowers, eatables, etc.
                </li>
                <li>
                  However, refund/replacement can be made if the user establishes that the quality of the product delivered is not good.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">2. Damaged or Defective Items</h2>
              <p className="text-sm leading-relaxed">
                In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/merchant listed on the Platform has checked and determined the same at its own end.
              </p>
              <p className="text-sm leading-relaxed mt-2 font-medium text-orange-600">
                This should be reported within <strong>1 day</strong> of receipt of products.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">3. Product Not as Expected</h2>
              <p className="text-sm leading-relaxed">
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>1 day</strong> of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">4. Warranty Products</h2>
              <p className="text-sm leading-relaxed">
                In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them directly.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">5. Refund Processing</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  In case of any refunds approved by DELIVOO FOOD SERVICES, it will take <strong>1 day</strong> for the refund to be processed to you.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">How to Request Cancellation/Refund</h3>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                <li>Go to your order history</li>
                <li>Select the order you want to cancel/refund</li>
                <li>Click on "Request Cancellation" or "Request Refund"</li>
                <li>Provide reason for cancellation/refund</li>
                <li>Our team will review and process your request</li>
              </ol>
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

export default RefundCancellationPolicy;
