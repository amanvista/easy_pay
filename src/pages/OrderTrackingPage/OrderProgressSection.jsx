// src/components/OrderProgressSection/OrderProgressSection.jsx (Create this new file)

import { motion } from 'framer-motion';
import { XCircle, DollarSign } from 'lucide-react';
import OrderHeader from '../../components/OrderHeader/OrderHeader';
import OrderTimeline from '../../components/OrderTimeline/OrderTimeline';
import DeliveryInfoCard from '../../components/DeliveryInfoCard/DeliveryInfoCard';
// Order status constants (imported from OrderTrackingPage's definition)
const ORDER_STATUS = {
  DELIVERY_ASSIGNED: 9,
  READY: 4,
  PICKED_UP: 5,
  CANCELLED: 6
};

/**
 * OrderProgressSection - Renders the main body of the order tracking page,
 * including Payment Pending screen or the Order Header, Timeline, and Delivery Info.
 */
const OrderProgressSection = ({ 
  orderData, 
  existingDeliveryData, 
  isProcessingPayment, 
  handleRetryPayment, 
  handleConfirmPickupClick 
}) => {

  const isPaymentPending = orderData.paymentStatusId === 1;

  // --- Payment Pending View ---
  if (isPaymentPending) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-xl"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⏳</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Payment Pending
          </h2>
          
          <p className="text-gray-700 mb-2">
            Your order <span className="font-semibold">#{orderData.id}</span> has been created
          </p>
          <p className="text-gray-600 mb-6">
            Please complete the payment to confirm your order
          </p>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 text-left">Order Summary</h3>
            <div className="space-y-3">
              {orderData.items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.qty}x {item.name}</span>
                  <span className="font-medium text-gray-900">₹{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              {orderData.items.length > 3 && (
                <p className="text-sm text-gray-500 text-left">
                  +{orderData.items.length - 3} more items
                </p>
              )}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-600">₹{orderData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Retry Payment Button */}
          <button
            onClick={handleRetryPayment}
            disabled={isProcessingPayment}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
          >
            {isProcessingPayment ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Complete Payment - ₹{orderData.total.toFixed(2)}
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            🔒 Secure payment powered by Cashfree
          </p>
        </div>
      </motion.div>
    );
  }

  // --- Confirmed Order View ---
  return (
    <>
      {/* Cancellation Notice */}
      {orderData.currentStage === ORDER_STATUS.CANCELLED && (
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  // Green container style: Subtle gradient background, soft border, good shadow
  className="mb-6 bg-gradient-to-r from-green-50 to-emerald-100 rounded-xl border border-green-300 p-6 shadow-xl"
>
  <div className="flex items-start gap-5">
    
    {/* Icon Area: Success Icon */}
    <div className="flex-shrink-0 pt-1">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
        {/* Using CheckCircle for a clear "Success/Initiated" visual */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.536-1.586-1.586a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    
    <div className="flex-1">
      <h3 className="text-xl font-extrabold text-green-900 mb-2">
        Refund Successfully Initiated
      </h3>
      
      {/* Refund Information Section */}
      <div className="flex items-start gap-3 bg-green-100 rounded-lg p-4 border border-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0">
          <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3 3H4.5a3 3 0 01-3-3V4.5zM12 11.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" clipRule="evenodd" />
        </svg>

        <div>
          <p className="text-sm text-green-900 font-semibold mb-1">
            Refund Confirmation
          </p>
          <p className="text-sm text-green-700 leading-snug">
            The full amount will be credited to your original payment method within **2-5 business days**.
          </p>
        </div>
      </div>
    </div>
  </div>
</motion.div>
      )}

      {/* Order Header */}
      <OrderHeader orderData={orderData} />

      {/* Order Timeline */}
      <OrderTimeline
        stages={orderData.stages} 
        currentStage={orderData.currentStage} 
      />

      {/* Delivery Info (only for delivery orders) */}
      {orderData.orderType === 'DELIVERY' && (
        <DeliveryInfoCard
          orderData={orderData} 
          existingDeliveryData={existingDeliveryData}
          showPartner={orderData.currentStage >= ORDER_STATUS.DELIVERY_ASSIGNED} 
        />
      )}

      {/* Confirm Pickup Button for PICKUP orders when READY */}
      {orderData.orderType === 'PICKUP' && orderData.currentStage === ORDER_STATUS.READY && (
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📦</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Your Order is Ready for Pickup!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Please collect your order from the restaurant and confirm below
                </p>
              </div>
            </div>
            
            <button
              onClick={handleConfirmPickupClick}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Confirm Pickup - I've Received My Order
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              ⚠️ Only confirm after you have collected your order from the restaurant
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default OrderProgressSection;