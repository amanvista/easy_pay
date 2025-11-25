import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentSessionId, setPaymentSessionId] = useState(null);

  useEffect(() => {
    // Get payment session ID from URL or session storage
    const sessionId = searchParams.get('session_id') || sessionStorage.getItem('paymentSessionId');
    setPaymentSessionId(sessionId);
  }, [searchParams]);

  const handleBackClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelPayment = () => {
    // Clear payment session data
    sessionStorage.removeItem('pendingOrder');
    sessionStorage.removeItem('paymentSessionId');
    
    // Navigate back to cart
    navigate('/cart');
  };

  const handleContinuePayment = () => {
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition"
            >
              <ChevronLeft size={24} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">Blink</span>
            <span className="text-2xl font-bold text-gray-800">Feast</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
          <p className="text-gray-600 mb-4">
            Please complete your payment in the Cashfree payment window
          </p>
          {paymentSessionId && (
            <p className="text-xs text-gray-400 font-mono">
              Session: {paymentSessionId.substring(0, 20)}...
            </p>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Do not close this window or press the back button while payment is in progress.
            If you need to cancel, use the back button above.
          </p>
        </div>
      </div>

      {/* Cancel Payment Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Cancel Payment?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this payment? Your cart items will be saved, but you'll need to start the payment process again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleContinuePayment}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Continue Payment
              </button>
              <button
                onClick={handleCancelPayment}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
