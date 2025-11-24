/**
 * Order Status Constants
 * 
 * These status codes are used throughout the application to track order progress.
 * Different statuses are shown based on order type (PICKUP vs DELIVERY).
 */

export const ORDER_STATUS_CODES = {
  // Common statuses for both PICKUP and DELIVERY
  PLACED: 1,                      // Order placed
  ACCEPTED: 2,                    // Restaurant accepted
  PREPARING: 3,                   // Food preparation started
  READY: 4,                       // Order is ready for pickup
  
  // PICKUP specific
  PICKED_UP: 5,                   // Order picked up by customer
  
  // Terminal statuses
  CANCELLED: 6,                   // Order cancelled
  REJECTED: 7,                    // Order rejected by restaurant
  
  // DELIVERY specific
  DELIVERY_PENDING: 8,            // Searching for delivery partner
  DELIVERY_ASSIGNED: 9,           // Delivery partner assigned
  DELIVERY_PARTNER_ARRIVED: 10,  // Delivery partner reached restaurant
  OUT_FOR_DELIVERY: 11,           // Order picked up by delivery partner
  DELIVERED: 12,                  // Order delivered to customer
  DELIVERY_FAILED: 13             // Delivery attempt failed
};

/**
 * Get human-readable status name
 */
export const getStatusName = (statusCode) => {
  const statusMap = {
    [ORDER_STATUS_CODES.PLACED]: 'Order Placed',
    [ORDER_STATUS_CODES.ACCEPTED]: 'Restaurant Accepted',
    [ORDER_STATUS_CODES.PREPARING]: 'Food Being Prepared',
    [ORDER_STATUS_CODES.READY]: 'Order Ready',
    [ORDER_STATUS_CODES.PICKED_UP]: 'Picked Up',
    [ORDER_STATUS_CODES.CANCELLED]: 'Cancelled',
    [ORDER_STATUS_CODES.REJECTED]: 'Rejected',
    [ORDER_STATUS_CODES.DELIVERY_PENDING]: 'Searching for Delivery Partner',
    [ORDER_STATUS_CODES.DELIVERY_ASSIGNED]: 'Delivery Partner Assigned',
    [ORDER_STATUS_CODES.DELIVERY_PARTNER_ARRIVED]: 'Partner Arrived at Restaurant',
    [ORDER_STATUS_CODES.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [ORDER_STATUS_CODES.DELIVERED]: 'Delivered',
    [ORDER_STATUS_CODES.DELIVERY_FAILED]: 'Delivery Failed'
  };
  
  return statusMap[statusCode] || 'Unknown Status';
};

/**
 * Check if status is terminal (order completed/cancelled/failed)
 */
export const isTerminalStatus = (statusCode) => {
  return [
    ORDER_STATUS_CODES.PICKED_UP,
    ORDER_STATUS_CODES.CANCELLED,
    ORDER_STATUS_CODES.REJECTED,
    ORDER_STATUS_CODES.DELIVERED,
    ORDER_STATUS_CODES.DELIVERY_FAILED
  ].includes(statusCode);
};

/**
 * Get status color for UI
 */
export const getStatusColor = (statusCode) => {
  if ([ORDER_STATUS_CODES.CANCELLED, ORDER_STATUS_CODES.REJECTED, ORDER_STATUS_CODES.DELIVERY_FAILED].includes(statusCode)) {
    return 'red';
  }
  if ([ORDER_STATUS_CODES.DELIVERED, ORDER_STATUS_CODES.PICKED_UP].includes(statusCode)) {
    return 'green';
  }
  return 'orange';
};
