import createApi from './createApi';

const api = createApi();

const paymentService = {

  createPaymentOrder: async (paymentData) => {
    try {
      const response = await api.post('/cashfree/create-order', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to create payment order'
      );
    }
  },

  getPaymentDetails: async (identifier) => {
    try {
      const response = await api.get(`/cashfree/payments/${identifier}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch payment details'
      );
    }
  },

  getOrderPayments: async (orderId) => {
    try {
      const response = await api.get(`/cashfree/order/${orderId}/payments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order payments:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to fetch order payments'
      );
    }
  },

  /**
   * Load Cashfree SDK dynamically
   * @returns {Promise<Object>} Cashfree SDK instance
   */
  loadCashfreeSDK: () => {
    return new Promise((resolve, reject) => {
      // Check if SDK already loaded
      if (window.Cashfree) {
        resolve(window.Cashfree);
        return;
      }

      // Load SDK script
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = () => {
        if (window.Cashfree) {
          resolve(window.Cashfree);
        } else {
          reject(new Error('Cashfree SDK failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
      document.head.appendChild(script);
    });
  },

  initiateCashfreePayment: async (
    paymentSession,
    onSuccess,
    onFailure
  ) => {
    try {
      // Load Cashfree SDK
      const cashfree = await paymentService.loadCashfreeSDK();

      const paymentSessionId = paymentSession.payment_session_id;
      const orderId = paymentSession.order_id;

      // Initialize Cashfree with mode (sandbox/production)
      const cashfreeInstance = cashfree({
        mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox',
      });

      // Configure checkout options
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        returnUrl: `${window.location.origin}/order-tracking?order_id=${orderId}`,
      };

      // Open payment modal
      cashfreeInstance.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.error('Payment error:', result.error);
          if (onFailure) onFailure(result.error);
        } else if (result.paymentDetails) {
          console.log('Payment successful:', result.paymentDetails);
          if (onSuccess) onSuccess(result.paymentDetails);
        }
      });
    } catch (error) {
      console.error('Error initiating payment:', error);
      if (onFailure) onFailure(error);
    }
  },
};

export default paymentService;
