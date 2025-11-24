import { motion } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentStatusLayout from '../../components/PaymentStatusLayout/PaymentStatusLayout';

/**
 * PaymentFailed - Error screen after failed payment
 */
const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state or use mock data
  const stateData = location.state || {};
  const transactionData = {
    transactionId: stateData.transactionId || '#TXN09234',
    paymentMethod: stateData.paymentMethod || 'Credit Card',
    attemptedAmount: stateData.amount || 485,
    errorCode: 'PAYMENT_FAILED',
    timestamp: new Date().toLocaleString()
  };

  // Error icon animation with shake effect
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    },
    shake: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        delay: 1.5,
        repeat: 2,
        repeatDelay: 3
      }
    }
  };

  // Button hover animation
  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Pulse animation for error state
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <PaymentStatusLayout bgGradient="from-red-50 to-rose-100">
      <div className="text-center space-y-6">
        {/* Error Icon */}
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={["visible", "shake"]}
          className="relative mx-auto w-24 h-24"
        >
          {/* Pulse ring animation - Behind the main icon */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute inset-0 w-24 h-24 bg-red-400 rounded-full z-0"
          />
          
          {/* Main icon - In front of pulse ring */}
          <div className="relative z-10 w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            >
              <X className="w-12 h-12 text-white stroke-[3]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            Something went wrong while processing your payment.
          </p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-red-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Transaction Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-medium text-gray-800">{transactionData.transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-800">{transactionData.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Attempted Amount</span>
              <span className="font-medium text-gray-800">₹{transactionData.attemptedAmount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Code</span>
              <span className="font-medium text-red-600">{transactionData.errorCode}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Attempt Time</span>
                <span className="text-xs text-gray-500">{transactionData.timestamp}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-red-800 mb-1">
                Payment could not be processed
              </p>
              <p className="text-xs text-red-600">
                Please check your payment details and try again. If the problem persists, contact your bank or try a different payment method.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="space-y-3"
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/payment')}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:bg-red-600 transition-colors"
          >
            Retry Payment
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/cart')}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Go Back to Cart
          </motion.button>
        </motion.div>

        {/* Help text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 mb-2">
            Need help? Contact our support team
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs text-red-600 underline hover:text-red-700 transition-colors"
            onClick={() => window.open('tel:+919876543210')}
          >
            Call Support: +91 98765 43210
          </motion.button>
        </motion.div>
      </div>
    </PaymentStatusLayout>
  );
};

export default PaymentFailed;