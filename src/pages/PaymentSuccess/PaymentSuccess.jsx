import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import PaymentStatusLayout from '../../components/PaymentStatusLayout/PaymentStatusLayout';

/**
 * PaymentSuccess - Success screen after successful payment
 */
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state or use mock data
  const stateData = location.state || {};
  const orderData = {
    orderId: stateData.orderId || '#BLF29382',
    paymentMethod: stateData.paymentMethod || 'UPI',
    totalAmount: stateData.amount || 485,
    timestamp: new Date().toLocaleString()
  };

  // Confetti animation variants
  const confettiVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0.8],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 3
      }
    })
  };

  // Success icon animation
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

  return (
    <PaymentStatusLayout bgGradient="from-green-50 to-emerald-100">
      <div className="text-center space-y-6">
        {/* Confetti Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles 
                className={`w-4 h-4 ${
                  i % 3 === 0 ? 'text-yellow-400' : 
                  i % 3 === 1 ? 'text-green-400' : 'text-blue-400'
                }`} 
              />
            </motion.div>
          ))}
        </div>

        {/* Success Icon */}
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-24 h-24"
        >
          {/* Pulse ring animation - Behind the main icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-24 h-24 bg-green-400 rounded-full z-0"
          />
          
          {/* Main icon - In front of pulse ring */}
          <div className="relative z-10 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            >
              <Check className="w-12 h-12 text-white stroke-[3]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Success Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your order has been placed successfully.
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-green-100"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium text-gray-800">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium text-gray-800">{orderData.paymentMethod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount Paid</span>
              <span className="font-bold text-green-600">₹{orderData.totalAmount}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction Time</span>
                <span className="text-xs text-gray-500">{orderData.timestamp}</span>
              </div>
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
            onClick={() => {
              // Store order data for tracking page
              const trackingData = {
                ...orderData,
                restaurant: {
                  name: "The Urban Tandoor",
                  logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop&crop=center",
                  address: "Sector 56, Gurgaon",
                  contact: "+91 9876543210"
                },
                items: [
                  { name: "Paneer Tikka", qty: 2, price: 280 },
                  { name: "Butter Naan", qty: 1, price: 60 }
                ],
                currentStage: 1,
                stages: [
                  { id: 1, name: "Order Placed", time: "7:58 PM", icon: "📝", description: "Your order has been placed successfully" },
                  { id: 2, name: "Restaurant Accepted", time: null, icon: "✅", description: "Restaurant has confirmed your order" },
                  { id: 3, name: "Food Being Prepared", time: null, icon: "👨‍🍳", description: "Chef is preparing your delicious meal" },
                  { id: 4, name: "Order Packed", time: null, icon: "📦", description: "Your order is packed and ready" },
                  { id: 5, name: "Out for Delivery", time: null, icon: "🚗", description: "Delivery partner is on the way" },
                  { id: 6, name: "Delivered", time: null, icon: "🎉", description: "Order delivered successfully" }
                ],
                etaMinutes: 25,
                partner: {
                  name: "Rahul Kumar",
                  phone: "+91 99999 88888",
                  vehicle: "DL 8C AB 4567",
                  rating: 4.8
                },
                address: "H-22, Sector 56, Gurgaon - 122011",
                userPhone: "+91 9876543210",
                orderTime: "7:58 PM",
                estimatedDelivery: "8:23 PM"
              };
              localStorage.setItem('currentOrder', JSON.stringify(trackingData));
              navigate('/order-tracking');
            }}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:bg-green-600 transition-colors"
          >
            Track Order
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/')}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </motion.button>
        </motion.div>

        {/* Success message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-xs text-gray-500 mt-4"
        >
          You will receive an order confirmation shortly
        </motion.p>
      </div>
    </PaymentStatusLayout>
  );
};

export default PaymentSuccess;