import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { mockOrderStatus, stageTimings } from '../../data/mockOrderTracking';
import OrderHeader from '../../components/OrderHeader/OrderHeader';
import OrderTimeline from '../../components/OrderTimeline/OrderTimeline';
import DeliveryInfoCard from '../../components/DeliveryInfoCard/DeliveryInfoCard';
import StickyActionBar from '../../components/StickyActionBar/StickyActionBar';
import OrderDeliveredModal from '../../components/OrderDeliveredModal/OrderDeliveredModal';

/**
 * OrderTrackingPage - Complete order tracking with live updates
 */
const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [startTime] = useState(Date.now());

  // Initialize order data
  useEffect(() => {
    // Try to get order data from localStorage or navigation state
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      try {
        const parsedOrder = JSON.parse(storedOrder);
        setOrderData(parsedOrder);
        setTimeRemaining(parsedOrder.etaMinutes);
      } catch (e) {
        console.error('Error parsing stored order:', e);
        setOrderData(mockOrderStatus);
        setTimeRemaining(mockOrderStatus.etaMinutes);
      }
    } else {
      // Use mock data and store it
      setOrderData(mockOrderStatus);
      setTimeRemaining(mockOrderStatus.etaMinutes);
      localStorage.setItem('currentOrder', JSON.stringify(mockOrderStatus));
    }
  }, []);

  // Simulate order progression
  useEffect(() => {
    if (!orderData) return;

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      
      // Find the current stage based on elapsed time
      let newStage = orderData.currentStage;
      for (const timing of stageTimings) {
        if (elapsedSeconds >= timing.delay && timing.stage > newStage) {
          newStage = timing.stage;
        }
      }

      // Update order data if stage changed
      if (newStage !== orderData.currentStage) {
        const updatedOrder = {
          ...orderData,
          currentStage: newStage,
          stages: orderData.stages.map(stage => {
            if (stage.id === newStage && !stage.time) {
              const now = new Date();
              return {
                ...stage,
                time: now.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })
              };
            }
            return stage;
          })
        };
        
        setOrderData(updatedOrder);
        localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));

        // Show delivered modal when order is completed
        if (newStage === 6) {
          setTimeout(() => setShowDeliveredModal(true), 1000);
        }
      }

      // Update countdown timer
      const remainingMinutes = Math.max(0, orderData.etaMinutes - (elapsedSeconds / 60));
      setTimeRemaining(remainingMinutes);
    }, 1000);

    return () => clearInterval(interval);
  }, [orderData, startTime]);

  // Redirect if no order data
  useEffect(() => {
    if (orderData === null) return;
    
    // If no active order found, redirect to home
    if (!orderData && !localStorage.getItem('currentOrder')) {
      toast.error('No active order found');
      navigate('/');
    }
  }, [orderData, navigate]);

  const handleContactSupport = () => {
    toast.info('Connecting you to support...', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleViewInvoice = () => {
    toast.info('Invoice feature coming soon!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleCancelOrder = () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (confirmCancel) {
      toast.success('Order cancelled successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
      localStorage.removeItem('currentOrder');
      navigate('/');
    }
  };

  const handleRateExperience = (rating = null) => {
    if (rating) {
      toast.success(`Thank you for rating us ${rating} stars!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } else {
      setShowDeliveredModal(true);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Track Order</h1>
              <p className="text-sm text-gray-600">Order #{orderData.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Order Header */}
        <OrderHeader orderData={orderData} timeRemaining={timeRemaining} />

        {/* Order Timeline */}
        <OrderTimeline 
          stages={orderData.stages} 
          currentStage={orderData.currentStage} 
        />

        {/* Delivery Info */}
        <DeliveryInfoCard 
          orderData={orderData} 
          showPartner={orderData.currentStage >= 5} 
        />
      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar
        currentStage={orderData.currentStage}
        onContactSupport={handleContactSupport}
        onViewInvoice={handleViewInvoice}
        onCancelOrder={handleCancelOrder}
        onRateExperience={handleRateExperience}
      />

      {/* Order Delivered Modal */}
      <OrderDeliveredModal
        isOpen={showDeliveredModal}
        onClose={() => setShowDeliveredModal(false)}
        onRateExperience={handleRateExperience}
        orderData={orderData}
      />
    </div>
  );
};

export default OrderTrackingPage;