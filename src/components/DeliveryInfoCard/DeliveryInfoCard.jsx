import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Truck, User } from 'lucide-react';

/**
 * DeliveryInfoCard - Delivery address and partner information
 */
const DeliveryInfoCard = ({ orderData, showPartner = false }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Load selected address from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedAddress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedAddress(parsed);
      } catch (e) {
        console.log('Error parsing selected address');
      }
    }
  }, []);

  const handleTrackPartner = () => {
    // Mock tracking functionality
    alert('Tracking feature coming soon!');
  };

  // Format address for display
  const getFormattedAddress = () => {
    if (selectedAddress) {
      return `${selectedAddress.addressLine}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`;
    }
    return orderData.address;
  };

  const getPhoneNumber = () => {
    if (selectedAddress && selectedAddress.phone) {
      return selectedAddress.phone;
    }
    return orderData.userPhone;
  };

  const getFullName = () => {
    if (selectedAddress && selectedAddress.fullName) {
      return selectedAddress.fullName;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Delivery Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
            {selectedAddress && selectedAddress.label && (
              <span className="text-xs text-gray-500 font-medium">{selectedAddress.label}</span>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {getFullName() && (
            <p className="text-gray-900 font-medium">{getFullName()}</p>
          )}
          <p className="text-gray-700 leading-relaxed">
            {getFormattedAddress()}
          </p>
          {selectedAddress && selectedAddress.landmark && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Landmark:</span> {selectedAddress.landmark}
            </p>
          )}
          {selectedAddress && selectedAddress.note && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Note:</span> {selectedAddress.note}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <a 
              href={`tel:${getPhoneNumber()}`}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {getPhoneNumber()}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Delivery Partner Info */}
      {showPartner && orderData.partner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Partner</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{orderData.partner.name}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{orderData.partner.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${orderData.partner.phone}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {orderData.partner.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>{orderData.partner.vehicle}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTrackPartner}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Track Delivery Partner
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* ETA Card when no partner */}
      {!showPartner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Status</h3>
          </div>
          
          <div className="text-center py-4">
            <p className="text-gray-700 mb-2">Your order is being prepared</p>
            <p className="text-sm text-gray-600">
              Delivery partner will be assigned once your order is ready
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DeliveryInfoCard;