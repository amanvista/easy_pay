import { motion } from 'framer-motion';
import { Star, RotateCcw, Eye } from 'lucide-react';

/**
 * OrderCard - Individual order card component
 */
const OrderCard = ({ order, onViewDetails, onReorder, onRateOrder }) => {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return '🟢';
      case 'In Progress':
        return '🟡';
      case 'Cancelled':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getItemsSummary = (items) => {
    return items.map(item => `${item.qty}x ${item.name}`).join(', ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Restaurant Info */}
        <div className="flex items-start gap-4 flex-1">
          <img
            src={order.logo}
            alt={order.restaurant}
            className="w-16 h-16 rounded-xl object-cover border border-gray-200"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {order.restaurant}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Order ID:</span> {order.id}</p>
              <p><span className="font-medium">Date:</span> {formatDate(order.date)}</p>
              <p className="truncate">
                <span className="font-medium">Items:</span> {getItemsSummary(order.items)}
              </p>
              <p><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Amount and Actions */}
        <div className="flex flex-col justify-between items-end gap-4 sm:min-w-[140px]">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">₹{order.total}</p>
          </div>
          
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewDetails(order)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onReorder(order)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reorder
            </motion.button>
            
            {order.status === 'Delivered' && !order.rating && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRateOrder(order)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Star className="w-4 h-4" />
                Rate Order
              </motion.button>
            )}
            
            {order.rating && (
              <div className="flex items-center justify-center gap-1 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-yellow-700">{order.rating}/5</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;