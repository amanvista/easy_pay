// services/orderService.js
import { orderApi } from './createApi';

const orderService = {
  /**
   * Create a new order
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} - Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await orderApi.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  /**
   * Get order by ID
   * @param {string} orderId - The ID of the order
   * @returns {Promise<Object>} - Order details
   */
  getOrderById: async (orderId) => {
    try {
      const response = await orderApi.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  },

  /**
   * Get user's orders
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} - Paginated orders
   */
  getUserOrders: async (page = 1, limit = 10) => {
    try {
      const response = await orderApi.get('/orders/my-orders', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  /**
   * Update order status
   * @param {string} orderId - The ID of the order
   * @param {number} statusId - New status ID
   * @returns {Promise<Object>} - Updated order
   */
  updateOrderStatus: async (orderId, statusId) => {
    try {
      const response = await orderApi.patch(`/orders/${orderId}/status`, {
        order_status_id: statusId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update order status');
    }
  },

  /**
   * Cancel order
   * @param {string} orderId - The ID of the order
   * @returns {Promise<Object>} - Cancelled order
   */
  cancelOrder: async (orderId) => {
    try {
      const response = await orderApi.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
  },

  /**
   * Get order by order code (public - no auth required)
   * @param {string} orderCode - The order code
   * @returns {Promise<Object>} - Order details
   */
  getOrderByCode: async (orderCode) => {
    try {
      const response = await orderApi.get(`/orders/code/${orderCode}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }
};

export default orderService;
