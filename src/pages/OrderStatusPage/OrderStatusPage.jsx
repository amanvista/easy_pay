import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const OrderStatusPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { orderId: stateOrderId, cart = [], customerInfo = {} } = location.state || {};
  
  // Get order ID from URL params or state
  const orderId = searchParams.get('order_id') || stateOrderId;
  const paymentStatus = searchParams.get('payment');
  
  const [orderStatus, setOrderStatus] = useState({
    paymentVerified: paymentStatus === 'success',
    preparing: false,
    prepared: false,
    packed: false,
    readyForPickup: false
  });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(paymentStatus === 'success');

  // Calculate order total
  const orderTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    const statusUpdates = [
      { delay: 2, status: 'paymentVerified' },
      { delay: 5, status: 'preparing' },
      { delay: 10, status: 'prepared' },
      { delay: 15, status: 'packed' },
      { delay: 20, status: 'readyForPickup' }
    ];

    statusUpdates.forEach(({ delay, status }) => {
      setTimeout(() => {
        setOrderStatus(prev => ({ ...prev, [status]: true }));
      }, delay * 1000);
    });

    return () => clearInterval(timer);
  }, [orderId, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-800">Order {orderId}</h2>
        <p className="text-sm text-gray-600">Time elapsed: {formatTime(timeElapsed)}</p>
      </div>

      {/* Payment Success Banner */}
      {showPaymentSuccess && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-green-800">
                  Payment Successful!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Your payment has been processed successfully. Your order is now being prepared.
                </p>
              </div>
              <button
                onClick={() => setShowPaymentSuccess(false)}
                className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{customerInfo.name || 'Not provided'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-900">{customerInfo.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Order</h3>
            <ul className="space-y-3">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs text-gray-500">× {item.quantity}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center pt-3 mt-3 border-t-2 border-gray-200">
              <span className="text-base font-bold text-gray-900">Total:</span>
              <span className="text-base font-bold text-gray-900">₹{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
          <div className="space-y-4">
            <div className={`flex items-start gap-3 ${orderStatus.paymentVerified ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${orderStatus.paymentVerified ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {orderStatus.paymentVerified ? '✓' : '1'}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Payment Verified</h4>
                <p className="text-xs text-gray-600">Your payment has been confirmed</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${orderStatus.preparing ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${orderStatus.preparing ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {orderStatus.preparing ? '✓' : '2'}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Preparing Your Order</h4>
                <p className="text-xs text-gray-600">Chef has started cooking</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${orderStatus.prepared ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${orderStatus.prepared ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {orderStatus.prepared ? '✓' : '3'}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Order Prepared</h4>
                <p className="text-xs text-gray-600">Your food is ready for packing</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${orderStatus.packed ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${orderStatus.packed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {orderStatus.packed ? '✓' : '4'}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Order Packed</h4>
                <p className="text-xs text-gray-600">Your items have been packed</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${orderStatus.readyForPickup ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${orderStatus.readyForPickup ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {orderStatus.readyForPickup ? '✓' : '5'}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Ready for Pickup</h4>
                <p className="text-xs text-gray-600">Your order is waiting at the counter</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button 
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Back to Home
        </button>
        <button 
          onClick={() => window.print()}
          className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderStatusPage;