import { motion } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';

/**
 * OrderDeliveredModal - Success modal when order is delivered
 */
const OrderDeliveredModal = ({ isOpen, onClose, onRateExperience, orderData }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onRateExperience(rating);
      onClose();
    }
  };

  // Confetti animation variants
  const confettiVariants = {
    hidden: { opacity: 0, scale: 0, rotate: 0 },
    visible: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0.8],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 2
      }
    })
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden"
      >
        {/* Confetti Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
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
                  i % 4 === 0 ? 'text-yellow-400' : 
                  i % 4 === 1 ? 'text-green-400' : 
                  i % 4 === 2 ? 'text-blue-400' : 'text-pink-400'
                }`} 
              />
            </motion.div>
          ))}
        </div>

        <div className="p-8 text-center relative z-10">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2 
            }}
            className="relative mx-auto mb-6"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              >
                <Check className="w-10 h-10 text-white stroke-[3]" />
              </motion.div>
            </div>
            
            {/* Pulse rings */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full"
              />
            ))}
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Order Delivered! 🎉
            </h2>
            <p className="text-gray-600">
              Your delicious meal from <span className="font-semibold">{orderData?.restaurant?.name}</span> has been delivered successfully.
            </p>
          </motion.div>

          {/* Rating Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-6"
          >
            <p className="text-sm font-medium text-gray-700 mb-3">
              How was your experience?
            </p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRatingSubmit}
              disabled={rating === 0}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${
                rating > 0
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Rating
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Close
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderDeliveredModal;