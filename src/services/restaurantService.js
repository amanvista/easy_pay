// services/restaurantApi.js
import { restaurantApi as apiClient } from './createApi';

const restaurantService = {
  /**
   * Get featured restaurants (paginated)
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @returns {Promise<Object>} - Paginated featured restaurants
   */
  getFeatured: async (page = 1, limit = 10) => {
    try {
      const response = await apiClient.get('/restaurant/featured', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured restaurants');
    }
  },

  /**
   * Get restaurant details by ID
   * @param {string} restaurantId - The ID of the restaurant
   * @returns {Promise<Object>} - Restaurant details
   */
  getDetails: async (restaurantId) => {
    try {
      const response = await apiClient.get(`/restaurants/getdetails?id=${restaurantId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch restaurant details');
    }
  },

  /**
   * Get restaurant by ID
   * @param {string} restaurantId - The ID of the restaurant
   * @returns {Promise<Object>} - Restaurant details
   */
  getRestaurantById: async (restaurantId) => {
    try {
      const response = await apiClient.get(`/restaurant/${restaurantId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch restaurant details');
    }
  },

  /**
   * Get restaurant menus with categories and items (paginated)
   * @param {string} restaurantId - The ID of the restaurant
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 10)
   * @returns {Promise<Object>} - Paginated menus with categories and items
   */
  getMenusWithDetails: async (restaurantId, page = 1, limit = 10) => {
    try {
      const response = await apiClient.get(`/menu/${restaurantId}/menus-with-details`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch restaurant menus');
    }
  },

  /**
   * Get menu items for a restaurant
   * @param {string} restaurantId - The ID of the restaurant
   * @returns {Promise<Array>} - Array of menu items
   */
  getMenu: async (restaurantId) => {
    try {
      const response = await apiClient.get(`/restaurants/menu?id=${restaurantId}`);
      return response.data.categories;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch menu items');
    }
  },

  /**
   * Search restaurants by various criteria
   * @param {Object} filters - Search filters
   * @returns {Promise<Array>} - Array of matching restaurants
   */
  search: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value);
        }
      });

      const response = await apiClient.get('/restaurants', { params });
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search restaurants');
    }
  },

  /**
   * Create a new restaurant (admin only)
   * @param {Object} restaurantData - Restaurant details
   * @returns {Promise<Object>} - Created restaurant
   */
  create: async (restaurantData) => {
    try {
      const response = await apiClient.post('/restaurants', restaurantData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create restaurant');
    }
  },

  /**
   * Update restaurant details
   * @param {string} restaurantId - The ID of the restaurant
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated restaurant
   */
  update: async (restaurantId, updateData) => {
    try {
      const response = await apiClient.patch(`/restaurants/${restaurantId}`, updateData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update restaurant');
    }
  },

  /**
   * Delete a restaurant (admin only)
   * @param {string} restaurantId - The ID of the restaurant to delete
   * @returns {Promise<Object>} - Confirmation message
   */
  delete: async (restaurantId) => {
    try {
      const response = await apiClient.delete(`/restaurants/${restaurantId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete restaurant');
    }
  },

  /**
   * Get restaurant reviews
   * @param {string} restaurantId - The ID of the restaurant
   * @returns {Promise<Array>} - Array of reviews
   */
  getReviews: async (restaurantId) => {
    try {
      const response = await apiClient.get(`/restaurants/${restaurantId}/reviews`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  },

  /**
   * Add a review to a restaurant
   * @param {string} restaurantId - The ID of the restaurant
   * @param {Object} reviewData - Review content and rating
   * @returns {Promise<Object>} - Created review
   */
  addReview: async (restaurantId, reviewData) => {
    try {
      const response = await apiClient.post(`/restaurants/${restaurantId}/reviews`, reviewData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  }
};

export default restaurantService;