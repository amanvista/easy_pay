import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import OrderHeader from '../../components/OrderHeader/OrderHeader';
import OrderTimeline from '../../components/OrderTimeline/OrderTimeline';
import DeliveryInfoCard from '../../components/DeliveryInfoCard/DeliveryInfoCard';
import StickyActionBar from '../../components/StickyActionBar/StickyActionBar';
import OrderDeliveredModal from '../../components/OrderDeliveredModal/OrderDeliveredModal';
import ConfirmPickupModal from '../../components/ConfirmPickupModal/ConfirmPickupModal';
import orderService from '../../services/orderService';
import deliveryService from '../../services/deliveryService';

// Order status constants
const ORDER_STATUS = {
  PLACED: 1,
  ACCEPTED: 2,
  PREPARING: 3,
  READY: 4,
  PICKED_UP: 5,
  CANCELLED: 6,
  REJECTED: 7,
  DELIVERY_PENDING: 8,
  DELIVERY_ASSIGNED: 9,
  DELIVERY_PARTNER_ARRIVED: 10,
  OUT_FOR_DELIVERY: 11,
  DELIVERED: 12,
  DELIVERY_FAILED: 13
};

// Helper function to get stages by order type
const getStagesByOrderType = (orderType) => {
  const pickupStages = [
    { id: 1, name: "Order Placed", icon: "📝", description: "Your order has been placed successfully" },
    { id: 2, name: "Restaurant Accepted", icon: "✅", description: "Restaurant has confirmed your order" },
    { id: 3, name: "Food Being Prepared", icon: "👨‍🍳", description: "Chef is preparing your delicious meal" },
    { id: 4, name: "Order Ready", icon: "📦", description: "Your order is ready for pickup" },
    { id: 5, name: "Picked Up", icon: "🎉", description: "Order picked up by customer" }
  ];

  const deliveryStages = [
    { id: 1, name: "Order Placed", icon: "📝", description: "Your order has been placed successfully" },
    { id: 2, name: "Restaurant Accepted", icon: "✅", description: "Restaurant has confirmed your order" },
    { id: 3, name: "Food Being Prepared", icon: "👨‍🍳", description: "Chef is preparing your delicious meal" },
    { id: 4, name: "Order Ready", icon: "📦", description: "Your order is packed and ready" },
    { id: 8, name: "Searching for Delivery Partner", icon: "🔍", description: "Finding the best delivery partner for you" },
    { id: 9, name: "Delivery Partner Assigned", icon: "👤", description: "Delivery partner has been assigned" },
    { id: 10, name: "Partner Arrived at Restaurant", icon: "🏪", description: "Delivery partner has reached the restaurant" },
    { id: 11, name: "Out for Delivery", icon: "🚗", description: "Delivery partner is on the way to you" },
    { id: 12, name: "Delivered", icon: "🎉", description: "Order delivered successfully" }
  ];

  return orderType === 'PICKUP' ? pickupStages : deliveryStages;
};

/**
 * OrderTrackingPage - Complete order tracking with live updates
 */
const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [showDeliveredModal, setShowDeliveredModal] = useState(false);
  const [showConfirmPickupModal, setShowConfirmPickupModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmingPickup, setConfirmingPickup] = useState(false);
  const hasShownModalRef = useRef(false);
  const deliveryCreationAttempted = useRef(false);
  
  // Check if redirected from payment
  const paymentStatus = searchParams.get('payment');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(paymentStatus === 'success');

  // Get data from Redux
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const restaurant = useSelector((state) => state.restaurant.currentRestaurant);
  console.log("current restaurant----", restaurant)
  // Create delivery order for delivery type orders
  const createDeliveryOrderIfNeeded = async (order) => {
    // Only create for delivery orders and only once
    if (order.order_type !== 'DELIVERY' || deliveryCreationAttempted.current) {
      return;
    }

    deliveryCreationAttempted.current = true;

    try {
      console.log('\n🚚 Checking if delivery order needs to be created...');
      console.log('Order ID:', order.id);
      console.log('Order Type:', order.order_type);

      // Check if delivery order already exists
      try {
        const existingDelivery = await deliveryService.getDeliveryOrderByOrderId(order.id);
        if (existingDelivery.success) {
          console.log('✅ Delivery order already exists:', existingDelivery.data);
          return;
        }
      } catch (error) {
        // Delivery order doesn't exist, continue to create
        console.log('📦 No existing delivery order found, creating new one...');
      }

      // Prepare delivery order payload
      const deliveryPayload = {
        order_id: order.id,
        request_id: `ORDER_${order.id}_${Date.now()}`,
        delivery_instructions: [
          {
            type: "text",
            description: `Order ${order.order_code || order.id}`
          },
          {
            type: "text",
            description: "Handle with care"
          }
        ],
        pickup_details: {
          address: {
            apartment_address: restaurant?.name || order.restaurant_name || "Restaurant",
            street_address1: restaurant?.address || "Restaurant Address",
            street_address2: "",
            landmark: restaurant?.landmark || "",
            city: restaurant?.city || "City",
            state: restaurant?.state || "State",
            pincode: restaurant?.pincode || "000000",
            country: "India",
            lat: restaurant?.latitude || 0,
            lng: restaurant?.longitude || 0,
            contact_details: {
              name: restaurant?.name || order.restaurant_name || "Restaurant",
              phone_number: restaurant?.phone || "+919999999999"
            }
          }
        },
        drop_details: {
          address: {
            apartment_address: selectedAddress?.addressLine || userInfo?.name || order.user_name || "Customer",
            street_address1: selectedAddress?.landmark || "",
            street_address2: selectedAddress?.landmark || "",
            landmark: selectedAddress?.landmark || "",
            city: selectedAddress?.city || "City",
            state: selectedAddress?.state || "State",
            pincode: selectedAddress?.pincode || "000000",
            country: "India",
            lat: selectedAddress?.latitude || 0,
            lng: selectedAddress?.longitude || 0,
            contact_details: {
              name: userInfo?.name || order.user_name || "Customer",
              phone_number: userInfo?.phone || order.user_phone || "+919999999999"
            }
          }
        }
      };

      console.log('📋 Delivery payload prepared:');
      console.log(JSON.stringify(deliveryPayload, null, 2));

      // Create delivery order
      console.log('🚀 Calling delivery service to create order...');
      const result = await deliveryService.createDeliveryOrder(deliveryPayload);

      if (result.success) {
        console.log('✅ Delivery order created successfully!');
        console.log('Delivery Order ID:', result.data?.id);
        console.log('Porter Order ID:', result.data?.partner_order_id);
        console.log('Tracking URL:', result.data?.tracking_url);
        toast.success('Delivery partner assigned!');
      } else {
        console.error('❌ Failed to create delivery order:', result.error || result.message);
        toast.error('Failed to assign delivery partner');
      }

    } catch (error) {
      console.error('❌ Error creating delivery order:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      // Don't show error toast to user as this is background operation
    }
  };

  // Fetch order data from API and poll for updates
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Check if orderId is a numeric ID or an order code
        const isOrderCode = isNaN(orderId);
        
        const response = isOrderCode 
          ? await orderService.getOrderByCode(orderId)
          : await orderService.getOrderById(orderId);
        
        if (response.success && response.data) {
          const order = response.data;
          const orderType = order.order_type || 'DELIVERY';
          
          // Get stages based on order type
          const stages = getStagesByOrderType(orderType);
          
          // Map API data to component format
          const mappedOrder = {
            id_row: order.id,
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
            partner: "",
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

          // Create delivery order if needed (only on first load)
          if (!loading) {
            createDeliveryOrderIfNeeded(order);
          }
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
  }, [orderId, loading, selectedAddress, userInfo, restaurant]);



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

  const handleConfirmPickupClick = () => {
    setShowConfirmPickupModal(true);
  };

  const handleConfirmPickup = async () => {
    if (!orderId || !orderData) return;

    setConfirmingPickup(true);
    try {
      console.log('🎯 Confirming pickup for order:', orderId);
      
      // Update order status to PICKED_UP (5)
      if(orderData?.id_row)
        await orderService.updateOrderStatus(orderData?.id_row, ORDER_STATUS.PICKED_UP);
      
      console.log('✅ Order marked as picked up');
      toast.success('Order confirmed! Thank you for your purchase!', {
        position: 'top-right',
        autoClose: 3000,
      });

      setShowConfirmPickupModal(false);

      // Refresh order data
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error) {
      console.error('❌ Error confirming pickup:', error);
      toast.error(error.message || 'Failed to confirm pickup', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setConfirmingPickup(false);
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
        {/* Payment Success Banner */}
        {showPaymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-green-800">
                  Payment Successful!
                </h3>
                <p className="text-sm text-green-700 mt-1">
                  Your payment has been processed successfully. Track your order status below.
                </p>
              </div>
              <button
                onClick={() => setShowPaymentSuccess(false)}
                className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700 transition"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

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

        {/* Confirm Pickup Button for PICKUP orders when READY */}
        {orderData.orderType === 'PICKUP' && orderData.currentStage === ORDER_STATUS.READY && (
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    Your Order is Ready for Pickup!
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Please collect your order from the restaurant and confirm below
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleConfirmPickupClick}
                disabled={confirmingPickup}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Confirm Pickup - I've Received My Order
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                ⚠️ Only confirm after you have collected your order from the restaurant
              </p>
            </motion.div>
          </div>
        )}
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

      {/* Confirm Pickup Modal */}
      <ConfirmPickupModal
        isOpen={showConfirmPickupModal}
        onClose={() => setShowConfirmPickupModal(false)}
        onConfirm={handleConfirmPickup}
        isLoading={confirmingPickup}
      />
    </div>
  );
};

export default OrderTrackingPage;