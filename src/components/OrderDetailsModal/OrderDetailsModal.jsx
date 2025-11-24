import { motion } from 'framer-motion';
import { X, Phone, MapPin, Clock, CreditCard, RotateCcw, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * OrderDetailsModal - Detailed view of an order
 */
const OrderDetailsModal = ({ order, isOpen, onClose, onReorder }) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = 25;
  const taxes = Math.round(subtotal * 0.05);
  const discount = 0;

  const handleReportIssue = () => {
    toast.success('Support will contact you within 24 hours', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const handleReorder = () => {
    onReorder(order);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={order.logo}
                alt={order.restaurant}
                className="w-12 h-12 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{order.restaurant}</h2>
                <p className="text-sm text-gray-600">Order {order.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Order Status</p>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)} mt-1`}>
                {order.status}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Order Date</p>
              <p className="font-medium text-gray-900">{formatDate(order.date)}</p>
            </div>
          </div>

          {/* Restaurant Contact */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Restaurant Contact</h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                <Phone className="w-4 h-4" />
                Call Restaurant
              </button>
              <span className="text-sm text-gray-600">+91 98765 43210</span>
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ordered Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  </div>
                  <p className="font-medium text-gray-900">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Bill Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="text-gray-900">₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold text-base">
                  <span className="text-gray-900">Total Paid</span>
                  <span className="text-gray-900">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Delivery Address</h4>
              </div>
              <p className="text-sm text-gray-700">{order.address}</p>
            </div>

            {order.deliveryPartner && (
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Delivery Info</h4>
                </div>
                <p className="text-sm text-gray-700">Partner: {order.deliveryPartner}</p>
                <p className="text-sm text-gray-700">Time: {order.deliveryTime}</p>
              </div>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Payment Information</h4>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Method: {order.paymentMethod}</p>
              <p>Transaction ID: {order.transactionId}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReorder}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors flex-1"
            >
              <RotateCcw className="w-4 h-4" />
              Reorder
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReportIssue}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors flex-1"
            >
              <AlertTriangle className="w-4 h-4" />
              Report Issue
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDetailsModal;