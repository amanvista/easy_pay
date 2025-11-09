import { motion } from 'framer-motion';

/**
 * PaymentStatusLayout - Common container for payment status pages
 * Provides consistent layout, animations, and responsiveness
 */
const PaymentStatusLayout = ({ 
  children, 
  bgGradient = "from-gray-50 to-gray-100" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`min-h-screen bg-gradient-to-br ${bgGradient} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full max-w-md mx-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PaymentStatusLayout;