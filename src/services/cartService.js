import { orderApi } from "./createApi";

/**
 * Cart Service - Handles all cart API calls
 */
const cartService = {
  /**
   * Get user's active cart
   */
  async getCart() {
    const response = await orderApi.get("/cart");
    return response.data;
  },

  /**
   * Add item to cart
   */
  async addItem(data) {
    const response = await orderApi.post("/cart/add-item", data);
    return response.data;
  },

  /**
   * Update item quantity
   */
  async updateItem(itemId, quantity) {
    const response = await orderApi.patch(`/cart/update-item/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  /**
   * Remove item from cart
   */
  async removeItem(itemId) {
    const response = await orderApi.delete(`/cart/remove-item/${itemId}`);
    return response.data;
  },

  /**
   * Clear entire cart
   */
  async clearCart() {
    const response = await orderApi.delete("/cart/clear");
    return response.data;
  },

  /**
   * Validate cart before checkout
   */
  async validateCart() {
    const response = await orderApi.post("/cart/validate");
    return response.data;
  },

  /**
   * Update order type (delivery/pickup)
   */
  async updateOrderType(orderType) {
    const response = await orderApi.post("/cart/update-order-type", {
      order_type: orderType,
    });
    return response.data;
  },

  /**
   * Update delivery address (recalculates delivery fee)
   */
  async updateAddress(addressId) {
    const response = await orderApi.post("/cart/update-address", {
      address_id: addressId,
    });
    return response.data;
  },

  /**
   * Lock cart during payment
   */
  async lockCart() {
    const response = await orderApi.post("/cart/lock");
    return response.data;
  },

  /**
   * Unlock cart after payment failure
   */
  async unlockCart() {
    const response = await orderApi.post("/cart/unlock");
    return response.data;
  },
};

export default cartService;
