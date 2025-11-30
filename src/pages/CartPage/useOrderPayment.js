import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";
import { clearCart } from "../../app/slices/cartSlice";

/**
 * Custom hook to handle order creation and payment flow
 * @returns {Object} - Payment state and handler function
 */
export const useOrderPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Process order and payment
   * @param {Object} params - Payment parameters
   * @param {Object} params.user - User object
   * @param {Object} params.restaurant - Restaurant object
   * @param {Array} params.cartItems - Cart items array
   * @param {Object} params.amounts - Amount breakdown (totalMRP, gst, platformFee, deliveryCharge, totalPay)
   * @param {string} params.orderType - Order type (delivery/takeaway)
   * @param {string} params.deliveryPartner - Delivery partner name
   * @param {string} params.instructions - Special instructions
   */
  const processPayment = async ({
    user,
    restaurant,
    cartItems,
    amounts,
    orderType,
    deliveryPartner,
    instructions,
  }) => {
    if (isProcessing) return;

    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    try {
      // Step 1: Create order FIRST (with pending payment status)
      const orderData = {
        restaurant_id: restaurant?.id,
        total_amount: amounts.totalMRP,
        tax_amount: amounts.gst,
        discount_amount: 0,
        delivery_charge: orderType === "delivery" ? amounts.deliveryCharge : 0,
        platform_fee: amounts.platformFee,
        payment_method: "ONLINE",
        payment_status_id: 2, // Pending payment
        order_status_id: 1, // Pending/Confirmed
        order_type: orderType,
        delivery_partner: orderType === "delivery" ? deliveryPartner : null,
        special_instructions: instructions || null,
        items: cartItems.map((item) => ({
          menu_item_id: item.id,
          name: item.name,
          image: item.featured_image_url || item.image_url,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
      };

      console.log("📦 Creating order:", JSON.stringify(orderData, null, 2));
      const orderResponse = await orderService.createOrder(orderData);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || "Failed to create order");
      }

      const createdOrder = orderResponse.data || orderResponse.order;
      const orderId = createdOrder.id || createdOrder.order_id;

      console.log("✅ Order created:", orderId);

      // Step 2: Create payment session linked to the order
      const paymentData = {
        restaurant_id: restaurant?.id,
        order_id: createdOrder?.order_code, // Link payment to the created order
        order_amount: amounts.totalPay,
        order_currency: "INR",
        customer_details: {
          customer_id: String(user.id || user.user_id),
          customer_phone: user.phone || "9999999999",
        },
        order_meta: {
          return_url: `${window.location.origin}/order-tracking/${orderId}?payment=success`,
        },
      };

      console.log("💳 Creating payment session:", JSON.stringify(paymentData, null, 2));
      const paymentResponse = await paymentService.createPaymentOrder(paymentData);

      console.log("✅ Payment response:", JSON.stringify(paymentResponse, null, 2));

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.message || "Failed to create payment session");
      }

      // Extract payment session ID
      const paymentSessionId = paymentResponse.data?.payment_session_id;
      console.log("🔑 Payment Session ID:", paymentSessionId);

      if (!paymentSessionId) {
        throw new Error("Payment session ID not found in response");
      }

      // Store order ID for reference
      sessionStorage.setItem("currentOrderId", orderId);
      sessionStorage.setItem("paymentSessionId", paymentSessionId);

      // Step 3: Initiate Cashfree payment
      await paymentService.initiateCashfreePayment(
        paymentResponse.data,
        // Success callback
        async (paymentDetails) => {
          console.log("✅ Payment successful:", paymentDetails);

          try {
            // Clear cart after successful payment
            dispatch(clearCart());
            toast.success("Payment successful!");
            navigate("/payment-success", {
              state: { orderDetails: createdOrder, orderId },
            });
          } catch (error) {
            console.error("Error after payment:", error);
          }
        },
        // Failure callback
        (error) => {
          console.error("❌ Payment failed:", error);
          toast.error("Payment failed. Your order is saved, you can retry payment.");
          // Navigate to order page where they can retry payment
          navigate(`/order-tracking/${orderId}`);
        }
      );
    } catch (error) {
      console.error("❌ Error in payment flow:", error);
      toast.error(error.message || "Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    processPayment,
  };
};
