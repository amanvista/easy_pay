import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useEffect } from 'react';
import restaurantService from '../../services/restaurantService';
import { useState } from 'react';

/**
 * OrderHeader - Restaurant info and order summary
 */
const OrderHeader = ({ orderData }) => {
  
  const [restaurantData, setRestaurantData] = useState({})
  useEffect(()=>{
    const resetaurantId = orderData?.restaurantId
    console.log(resetaurantId,'restaurantId')
    if(resetaurantId){
      const fetchRestaurant = async ()=>{
    const restaurantData = await restaurantService.getRestaurantById(resetaurantId)
    setRestaurantData(restaurantData)
      }
      fetchRestaurant();
    }
  },[orderData?.resetaurantId])

  const getStatusColor = (currentStage) => {
    // Terminal states
    if (currentStage === 6) return 'bg-red-100 text-red-800 border-red-200'; // CANCELLED
    if (currentStage === 7) return 'bg-red-100 text-red-800 border-red-200'; // REJECTED
    if (currentStage === 13) return 'bg-red-100 text-red-800 border-red-200'; // DELIVERY_FAILED
    
    // Success states
    if (currentStage === 12 || currentStage === 5) return 'bg-green-100 text-green-800 border-green-200'; // DELIVERED or PICKED_UP
    
    // In progress states
    if (currentStage >= 11) return 'bg-blue-100 text-blue-800 border-blue-200'; // OUT_FOR_DELIVERY
    if (currentStage >= 8) return 'bg-purple-100 text-purple-800 border-purple-200'; // DELIVERY_PENDING+
    if (currentStage >= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // READY
    if (currentStage >= 3) return 'bg-orange-100 text-orange-800 border-orange-200'; // PREPARING
    if (currentStage >= 2) return 'bg-green-100 text-green-800 border-green-200'; // ACCEPTED
    return 'bg-gray-100 text-gray-800 border-gray-200'; // PLACED
  };

  const getStatusText = (currentStage, orderType) => {
    const statusMap = {
      1: 'Order Placed',
      2: 'Confirmed',
      3: 'Being Prepared',
      4: orderType === 'PICKUP' ? 'Ready for Pickup' : 'Ready',
      5: 'Picked Up',
      6: 'Cancelled',
      7: 'Rejected',
      8: 'Finding Delivery Partner',
      9: 'Delivery Partner Assigned',
      10: 'Partner at Restaurant',
      11: 'Out for Delivery',
      12: 'Delivered',
      13: 'Delivery Failed'
    };
    return statusMap[currentStage] || 'Unknown';
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
            src={restaurantData?.imageUrl}
            alt={restaurantData?.name}
            className="w-16 h-16 rounded-xl object-cover border border-gray-200"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h1 className="text-xl font-bold text-gray-900">
                {restaurantData.name}
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(orderData.currentStage)}`}>
                {getStatusText(orderData.currentStage, orderData.orderType)}
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{restaurantData?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a 
                  href={`tel:${restaurantData?.contactPhone}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {restaurantData?.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:min-w-[300px] space-y-4">
          {/* Order Type & Status */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {orderData.orderType === 'PICKUP' ? 'Pickup Order' : 'Delivery Order'}
              </span>
              <Clock className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-green-600">
                {getStatusText(orderData.currentStage, orderData.orderType)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Ordered at {orderData.orderTime}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">Order {orderData.id}</span>
              <span className="text-sm text-gray-600">{orderData.orderTime}</span>
            </div>
            
            <div className="space-y-2 mb-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                  <div className="flex-1 text-sm text-gray-700">
                    <span className="font-medium">{item.qty}x</span> {item.name}
                  </div>
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