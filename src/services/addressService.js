import { addressApi } from "./createApi";

const addressService = {
  /**
   * Get all addresses for the logged-in user
   * @returns {Promise<Array>} - Array of addresses
   */
  getAllAddresses: async () => {
    try {
      const response = await addressApi.get('/addresses');
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch addresses');
    }
  },

  /**
   * Get a specific address by ID
   * @param {number} addressId - The ID of the address
   * @returns {Promise<Object>} - Address details
   */
  getAddressById: async (addressId) => {
    try {
      const response = await addressApi.get(`/addresses/${addressId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch address');
    }
  },

  /**
   * Create a new address
   * @param {Object} addressData - Address details
   * @returns {Promise<Object>} - Created address
   */
  createAddress: async (addressData) => {
    try {
      const response = await addressApi.post('/addresses', addressData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create address');
    }
  },

  /**
   * Update an existing address
   * @param {number} addressId - The ID of the address
   * @param {Object} addressData - Updated address details
   * @returns {Promise<Object>} - Updated address
   */
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await addressApi.put(`/addresses/${addressId}`, addressData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update address');
    }
  },

  /**
   * Delete an address
   * @param {number} addressId - The ID of the address to delete
   * @returns {Promise<Object>} - Confirmation message
   */
  deleteAddress: async (addressId) => {
    try {
      const response = await addressApi.delete(`/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete address');
    }
  },
};

export default addressService;
