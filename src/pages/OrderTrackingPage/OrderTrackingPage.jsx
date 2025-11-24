import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  mockOrderStatus, 
  getStagesByOrderType,
  ORDER_STATUS 
} from '../../data/mockOrderTracking';
import OrderHeader from '../../components/OrderHeader/OrderHeader';
import OrderTimeline from '../../components/OrderTimeline/OrderTimeline';
import DeliveryInfoCard from '../../components/DeliveryInfoCard/DeliveryInfoCard';
import StickyActionBar from '../../components/StickyActionBar/StickyActionBar';
import OrderDeliveredModal from '../../components/OrderDeliveredModal/OrderDeliveredModal';
import orderService from '../../services/orderService';

/**
 * OrderTrackingPage - Complete order tracking with live updates
 */
const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasShownModalRef = useRef(false);

  // Fetch order data from API and poll for updates
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const response = await orderService.getOrderById(orderId);
        
        if (response.success && response.data) {
          const order = response.data;
          const orderType = order.order_type || 'DELIVERY';
          
          // Get stages based on order type
          const stages = getStagesByOrderType(orderType);
          
          // Map API data to component format
          const mappedOrder = {
            id: order.order_code || order.id,
            restaurantId: order.restaurant_id,
            orderType: orderType,
            items: (order.orderItems || order.order_items)?.map(item => ({
              name: item.name,
              qty: item.quantity,
              price: parseFloat(item.price),
              image: item.image || null
            })) || [],
            total: parseFloat(order.final_amount || order.total_amount),
            paymentMethod: order.payment_method || 'UPI',
            currentStage: order.order_status_id || ORDER_STATUS.PLACED,
            stages: stages.map(stage => ({
              ...stage,
              time: stage.id <= order.order_status_id ? new Date(order.updated_at || order.created_at).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              }) : null
            })),
            partner: mockOrderStatus.partner,
            address: 'Will be loaded from selected address',
            userPhone: order.user_phone || '+91 9876543210',
            orderTime: new Date(order.created_at).toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            }),
            estimatedDelivery: 'Calculating...'
          };
          
          // Check if order is completed and show modal (only once)
          const completedStatus = orderType === 'PICKUP' 
            ? ORDER_STATUS.PICKED_UP 
            : ORDER_STATUS.DELIVERED;
          
          if (order.order_status_id === completedStatus && !hasShownModalRef.current) {
            hasShownModalRef.current = true;
            setTimeout(() => setShowDeliveredModal(true), 1000);
          }
          
          setOrderData(mappedOrder);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        if (loading) {
          toast.error(error.message || 'Failed to load order details', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderData();
    
    // Poll for updates every 10 seconds
    const pollInterval = setInterval(fetchOrderData, 10000);
    
    return () => clearInterval(pollInterval);
  }, [orderId, loading]);



  // Redirect if no order ID in params
  useEffect(() => {
    if (!loading && !orderId) {
      toast.error('No order ID provided');
      navigate('/');
    }
  }, [orderId, loading, navigate]);

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

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (confirmCancel && orderId) {
      try {
        await orderService.cancelOrder(orderId);
        toast.success('Order cancelled successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/');
      } catch (error) {
        toast.error(error.message || 'Failed to cancel order', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
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

  if (loading || !orderData) {
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
              <p className="text-sm text-gray-600">Order {orderData.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Order Header */}
        <OrderHeader orderData={orderData} />

        {/* Order Timeline */}
        <OrderTimeline 
          stages={orderData.stages} 
          currentStage={orderData.currentStage} 
        />

        {/* Delivery Info */}
        {orderData.orderType === 'DELIVERY' && <DeliveryInfoCard 
          orderData={orderData} 
          showPartner={orderData.currentStage >= ORDER_STATUS.DELIVERY_ASSIGNED} 
        />}
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