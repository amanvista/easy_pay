import { motion } from 'framer-motion';
import { Phone, FileText, X, Star } from 'lucide-react';

/**
 * StickyActionBar - Bottom action buttons for order tracking
 */
const StickyActionBar = ({ 
  currentStage, 
  onContactSupport, 
  onViewInvoice, 
  onCancelOrder, 
  onRateExperience 
}) => {
  const canCancelOrder = currentStage < 5; // Can cancel before "Out for Delivery"
  const isDelivered = currentStage >= 6;

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Contact Support */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onContactSupport}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors flex-1"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Support</span>
            <span className="sm:hidden">Support</span>
          </motion.button>

          {/* View Invoice */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onViewInvoice}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors flex-1"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">View Invoice</span>
            <span className="sm:hidden">Invoice</span>
          </motion.button>

          {/* Cancel Order or Rate Experience */}
          {isDelivered ? (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onRateExperience}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-medium transition-colors flex-1"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Rate Experience</span>
              <span className="sm:hidden">Rate</span>
            </motion.button>
          ) : canCancelOrder ? (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onCancelOrder}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors flex-1"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Cancel Order</span>
              <span className="sm:hidden">Cancel</span>
            </motion.button>
          ) : (
            <motion.div
              className="flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-500 rounded-xl font-medium flex-1"
            >
              <span className="text-sm">Cannot cancel now</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StickyActionBar;