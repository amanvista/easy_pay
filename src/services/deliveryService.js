import { orderApi } from './createApi';

const deliveryService = {
  /**
   * Get delivery quote from Porter
   * @param {Object} params - { pickup_details: { lat, lng }, drop_details: { lat, lng }, customer: { name, mobile: { country_code, number } } }
   * @returns {Object} - { success, deliveryCharge, currency, rawData }
   */
  getQuote: async (params) => {
    try {
      const response = await orderApi.post('/delivery/quote', params);
      
      // Extract 2 Wheeler fare from the response
      if (response.data.success && response.data.data?.vehicles) {
        const twoWheeler = response.data.data.vehicles.find(
          vehicle => vehicle.type === "2 Wheeler"
        );
        
        if (twoWheeler && twoWheeler.fare) {
          // Convert minor_amount (paise) to rupees
          const deliveryCharge = twoWheeler.fare.minor_amount / 100;
          
          return {
            success: true,
            deliveryCharge: deliveryCharge,
            currency: twoWheeler.fare.currency,
            rawData: response.data.data // Include full response for reference
          };
        }
      }
      
      // If 2 Wheeler not found, return error
      return {
        success: false,
        error: '2 Wheeler delivery option not available',
        rawData: response.data
      };
    } catch (error) {
      console.error('Error getting delivery quote:', error);
      throw error;
    }
  },

  /**
   * Create delivery order
   * @param {Object} params - Order creation parameters
   */
  createDeliveryOrder: async (params) => {
    try {
      const response = await orderApi.post('/delivery/create', params);
      return response.data;
    } catch (error) {
      console.error('Error creating delivery order:', error);
      throw error;
    }
  },

  /**
   * Get delivery order by internal delivery order ID
   * @param {number} deliveryOrderId - Internal delivery order ID
   */
  getDeliveryOrder: async (deliveryOrderId) => {
    try {
      const response = await orderApi.get(`/delivery/${deliveryOrderId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting delivery order:', error);
      throw error;
    }
  },

  /**
   * Get delivery order by main order ID
   * @param {number} orderId - Main order ID
   */
  getDeliveryOrderByOrderId: async (orderId) => {
    try {
      const response = await orderApi.get(`/delivery/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting delivery order by order ID:', error);
      throw error;
    }
  },

  /**
   * Sync delivery order with Porter (get latest status)
   * @param {number} deliveryOrderId - Internal delivery order ID
   */
  syncDeliveryOrder: async (deliveryOrderId) => {
    try {
      const response = await orderApi.post(`/delivery/${deliveryOrderId}/sync`);
      return response.data;
    } catch (error) {
      console.error('Error syncing delivery order:', error);
      throw error;
    }
  },

  /**
   * Cancel delivery order
   * @param {number} deliveryOrderId - Internal delivery order ID
   */
  cancelDeliveryOrder: async (deliveryOrderId) => {
    try {
      const response = await orderApi.post(`/delivery/${deliveryOrderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error canceling delivery order:', error);
      throw error;
    }
  },

  /**
   * Get delivery logs
   * @param {number} deliveryOrderId - Internal delivery order ID
   */
  getDeliveryLogs: async (deliveryOrderId) => {
    try {
      const response = await orderApi.get(`/delivery/${deliveryOrderId}/logs`);
      return response.data;
    } catch (error) {
      console.error('Error getting delivery logs:', error);
      throw error;
    }
  },

  /**
   * Get order from Porter directly by Porter order ID
   * @param {string} porterOrderId - Porter order ID (e.g., CRN10470403)
   */
  getPorterOrder: async (porterOrderId) => {
    try {
      const response = await orderApi.get(`/delivery/porter/${porterOrderId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting Porter order:', error);
      throw error;
    }
  },

  /**
   * Cancel order from Porter directly by Porter order ID
   * @param {string} porterOrderId - Porter order ID (e.g., CRN10470403)
   */
  cancelPorterOrder: async (porterOrderId) => {
    try {
      const response = await orderApi.post(`/delivery/porter/${porterOrderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error canceling Porter order:', error);
      throw error;
    }
  },

  /**
   * Track order from Porter directly by Porter order ID
   * @param {string} porterOrderId - Porter order ID (e.g., CRN10470403)
   */
  trackPorterOrder: async (porterOrderId) => {
    try {
      const response = await orderApi.get(`/delivery/porter/${porterOrderId}/track`);
      return response.data;
    } catch (error) {
      console.error('Error tracking Porter order:', error);
      throw error;
    }
  },
};

export default deliveryService;
