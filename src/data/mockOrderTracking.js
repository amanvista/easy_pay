// Order status definitions
export const ORDER_STATUS = {
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

// Stage configurations for PICKUP orders
const PICKUP_STAGES = [
  { 
    id: ORDER_STATUS.PLACED,
    name: "Order Placed", 
    icon: "📝",
    description: "Your order has been placed successfully"
  },
  { 
    id: ORDER_STATUS.ACCEPTED,
    name: "Restaurant Accepted", 
    icon: "✅",
    description: "Restaurant has confirmed your order"
  },
  { 
    id: ORDER_STATUS.PREPARING,
    name: "Food Being Prepared", 
    icon: "👨‍🍳",
    description: "Chef is preparing your delicious meal"
  },
  { 
    id: ORDER_STATUS.READY,
    name: "Order Ready", 
    icon: "📦",
    description: "Your order is ready for pickup"
  },
  { 
    id: ORDER_STATUS.PICKED_UP,
    name: "Picked Up", 
    icon: "🎉",
    description: "Order picked up by customer"
  }
];

// Stage configurations for DELIVERY orders
const DELIVERY_STAGES = [
  { 
    id: ORDER_STATUS.PLACED,
    name: "Order Placed", 
    icon: "📝",
    description: "Your order has been placed successfully"
  },
  { 
    id: ORDER_STATUS.ACCEPTED,
    name: "Restaurant Accepted", 
    icon: "✅",
    description: "Restaurant has confirmed your order"
  },
  { 
    id: ORDER_STATUS.PREPARING,
    name: "Food Being Prepared", 
    icon: "👨‍🍳",
    description: "Chef is preparing your delicious meal"
  },
  { 
    id: ORDER_STATUS.READY,
    name: "Order Ready", 
    icon: "📦",
    description: "Your order is packed and ready"
  },
  { 
    id: ORDER_STATUS.DELIVERY_PENDING,
    name: "Searching for Delivery Partner", 
    icon: "🔍",
    description: "Finding the best delivery partner for you"
  },
  { 
    id: ORDER_STATUS.DELIVERY_ASSIGNED,
    name: "Delivery Partner Assigned", 
    icon: "👤",
    description: "Delivery partner has been assigned"
  },
  { 
    id: ORDER_STATUS.DELIVERY_PARTNER_ARRIVED,
    name: "Partner Arrived at Restaurant", 
    icon: "🏪",
    description: "Delivery partner has reached the restaurant"
  },
  { 
    id: ORDER_STATUS.OUT_FOR_DELIVERY,
    name: "Out for Delivery", 
    icon: "🚗",
    description: "Delivery partner is on the way to you"
  },
  { 
    id: ORDER_STATUS.DELIVERED,
    name: "Delivered", 
    icon: "🎉",
    description: "Order delivered successfully"
  }
];

/**
 * Get stages based on order type
 * @param {string} orderType - 'PICKUP' or 'DELIVERY'
 * @returns {Array} Array of stage objects
 */
export const getStagesByOrderType = (orderType) => {
  return orderType === 'PICKUP' ? PICKUP_STAGES : DELIVERY_STAGES;
};

/**
 * Get stage name by status ID
 * @param {number} statusId - Order status ID
 * @returns {string} Stage name
 */
export const getStageNameById = (statusId) => {
  const allStages = [...PICKUP_STAGES, ...DELIVERY_STAGES];
  const stage = allStages.find(s => s.id === statusId);
  return stage ? stage.name : 'Unknown';
};

// Mock order tracking data
export const mockOrderStatus = {
  id: "BLF203841",
  restaurant: {
    name: "The Urban Tandoor",
    logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop&crop=center",
    address: "Sector 56, Gurgaon",
    contact: "+91 9876543210"
  },
  items: [
    { name: "Paneer Tikka", qty: 2, price: 280 },
    { name: "Butter Naan", qty: 1, price: 60 },
    { name: "Masala Chai", qty: 2, price: 80 }
  ],
  total: 480,
  paymentMethod: "UPI",
  currentStage: ORDER_STATUS.PLACED,
  orderType: 'DELIVERY',
  etaMinutes: 25,
  partner: {
    name: "Rahul Kumar",
    phone: "+91 99999 88888",
    vehicle: "DL 8C AB 4567",
    rating: 4.8
  },
  address: "H-22, Sector 56, Gurgaon - 122011",
  userPhone: "+91 9876543210",
  orderTime: "7:58 PM",
  estimatedDelivery: "8:23 PM"
};

// Stage progression timing for PICKUP (in seconds)
export const PICKUP_STAGE_TIMINGS = [
  { stage: ORDER_STATUS.PLACED, delay: 0 },
  { stage: ORDER_STATUS.ACCEPTED, delay: 2 },
  { stage: ORDER_STATUS.PREPARING, delay: 8 },
  { stage: ORDER_STATUS.READY, delay: 15 },
  { stage: ORDER_STATUS.PICKED_UP, delay: 25 }
];

// Stage progression timing for DELIVERY (in seconds)
export const DELIVERY_STAGE_TIMINGS = [
  { stage: ORDER_STATUS.PLACED, delay: 0 },
  { stage: ORDER_STATUS.ACCEPTED, delay: 2 },
  { stage: ORDER_STATUS.PREPARING, delay: 8 },
  { stage: ORDER_STATUS.READY, delay: 15 },
  { stage: ORDER_STATUS.DELIVERY_PENDING, delay: 18 },
  { stage: ORDER_STATUS.DELIVERY_ASSIGNED, delay: 22 },
  { stage: ORDER_STATUS.DELIVERY_PARTNER_ARRIVED, delay: 28 },
  { stage: ORDER_STATUS.OUT_FOR_DELIVERY, delay: 35 },
  { stage: ORDER_STATUS.DELIVERED, delay: 50 }
];

/**
 * Get stage timings based on order type
 * @param {string} orderType - 'PICKUP' or 'DELIVERY'
 * @returns {Array} Array of timing objects
 */
export const getStageTimingsByOrderType = (orderType) => {
  return orderType === 'PICKUP' ? PICKUP_STAGE_TIMINGS : DELIVERY_STAGE_TIMINGS;
};