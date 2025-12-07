import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Truck, User } from 'lucide-react';

/**
 * DeliveryInfoCard - Delivery address and partner information
 */
const DeliveryInfoCard = ({ orderData, showPartner = false, existingDeliveryData }) => {
  console.log(existingDeliveryData,"00000")
  // Get selected address from localStorage on component mount
  const getSelectedAddress = () => {
    try {
      const saved = localStorage.getItem('selectedAddress');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.log('Error parsing selected address');
      return null;
    }
  };

  const [selectedAddress] = useState(getSelectedAddress());

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
      {showPartner && existingDeliveryData?.partner_info && (
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
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Partner</h3>
              <span className="text-xs text-gray-500 font-medium capitalize">
                {existingDeliveryData?.partner_info?.name}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {existingDeliveryData?.partner_info.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {existingDeliveryData?.partner_info.vehicle_type?.toLowerCase().replace('_', ' ')}
                </p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a 
                  href={`tel:${existingDeliveryData?.partner_info.mobile?.country_code}${existingDeliveryData?.partner_info.mobile?.mobile_number}`}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  {existingDeliveryData?.partner_info.mobile?.country_code} {existingDeliveryData?.partner_info.mobile?.mobile_number}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span className="font-medium">{existingDeliveryData?.partner_info.vehicle_number}</span>
              </div>
            </div>

            {/* {existingDeliveryData?.fare_details?.actual_fare_details && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Delivery Fare: <span className="font-semibold text-gray-900">
                    ₹{(existingDeliveryData?.fare_details.actual_fare_details.minor_amount).toFixed(0)}
                  </span>
                </p>
              </div>
            )} */}
            
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