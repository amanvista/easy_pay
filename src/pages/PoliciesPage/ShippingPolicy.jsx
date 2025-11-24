import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShippingPolicy = () => {
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
        <h1 className="text-lg font-semibold text-gray-800">Shipping Policy</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 bg-white my-6 rounded-lg shadow-sm">
        <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Shipping Partners</h2>
              <p className="text-sm leading-relaxed">
                The orders for the user are shipped through registered domestic courier companies and/or speed post only.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Shipping Timeline</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm leading-relaxed">
                  Orders are shipped within <strong>1 day</strong> from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation.
                </p>
              </div>
              <p className="text-sm leading-relaxed mt-3">
                Delivery of the shipment is subject to courier company/post office norms.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Delivery Address</h2>
              <p className="text-sm leading-relaxed">
                Delivery of all orders will be made to the <strong>address provided by the buyer</strong> at the time of purchase.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                Delivery of our services will be confirmed on your email ID as specified at the time of registration.
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Delivery Delays</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm leading-relaxed">
                  Platform Owner shall <strong>not be liable</strong> for any delay in delivery by the courier company/postal authority.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Shipping Costs</h2>
              <p className="text-sm leading-relaxed">
                If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is <strong>not refundable</strong>.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Track Your Order</h3>
              <p className="text-sm text-gray-700">
                You can track your order status from your order history page. Once shipped, you will receive tracking information via email and SMS.
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

export default ShippingPolicy;
