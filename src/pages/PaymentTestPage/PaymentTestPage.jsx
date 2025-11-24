import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

/**
 * PaymentTestPage - Demo page to test payment status screens
 * This is for development/testing purposes only
 */
const PaymentTestPage = () => {
  const navigate = useNavigate();

  const testSuccessPayment = () => {
    navigate('/payment-success', {
      state: {
        orderId: `BLF${Math.floor(Math.random() * 100000)}`,
        amount: 485,
        paymentMethod: 'UPI'
      }
    });
  };

  const testFailedPayment = () => {
    navigate('/payment-failed', {
      state: {
        transactionId: `TXN${Math.floor(Math.random() * 100000)}`,
        amount: 485,
        paymentMethod: 'Credit Card'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Status Demo
            </h1>
            <p className="text-gray-600 text-sm">
              Test the payment success and failure screens
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={testSuccessPayment}
              className="w-full flex items-center justify-center gap-3 bg-green-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-green-600 transition-colors shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Test Success Screen
            </button>
            
            <button
              onClick={testFailedPayment}
              className="w-full flex items-center justify-center gap-3 bg-red-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-lg"
            >
              <XCircle className="w-5 h-5" />
              Test Failure Screen
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTestPage;