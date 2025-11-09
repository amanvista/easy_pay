import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';

/**
 * OrderHeader - Restaurant info and order summary
 */
const OrderHeader = ({ orderData, timeRemaining }) => {
  const formatTime = (minutes) => {
    if (minutes <= 0) return "Delivered";
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (currentStage) => {
    if (currentStage >= 6) return 'bg-green-100 text-green-800 border-green-200';
    if (currentStage >= 5) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (currentStage >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const getStatusText = (currentStage) => {
    if (currentStage >= 6) return 'Delivered';
    if (currentStage >= 5) return 'Out for Delivery';
    if (currentStage >= 4) return 'Ready for Pickup';
    if (currentStage >= 3) return 'Being Prepared';
    if (currentStage >= 2) return 'Confirmed';
    return 'Order Placed';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Restaurant Info */}
        <div className="flex items-start gap-4 flex-1">
          <img
            src={orderData.restaurant.logo}
            alt={orderData.restaurant.name}
            className="w-16 h-16 rounded-xl object-cover border border-gray-200"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h1 className="text-xl font-bold text-gray-900">
                {orderData.restaurant.name}
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(orderData.currentStage)}`}>
                {getStatusText(orderData.currentStage)}
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{orderData.restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href={`tel:${orderData.restaurant.contact}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {orderData.restaurant.contact}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:min-w-[300px] space-y-4">
          {/* ETA */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Estimated Delivery</span>
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                {timeRemaining > 0 ? formatTime(timeRemaining) : "Delivered"}
              </span>
              {timeRemaining > 0 && (
                <span className="text-sm text-gray-600">mins left</span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Expected by {orderData.estimatedDelivery}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Order #{orderData.id}</span>
              <span className="text-sm text-gray-600">{orderData.orderTime}</span>
            </div>
            
            <div className="space-y-1 text-sm text-gray-700 mb-3">
              {orderData.items.map((item, index) => (
                <div key={index}>
                  {item.qty}x {item.name}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total Paid</span>
              <span className="font-bold text-green-600">₹{orderData.total}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              via {orderData.paymentMethod}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderHeader;