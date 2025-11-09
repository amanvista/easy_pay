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
  currentStage: 1, // 1–6 based on stages
  stages: [
    { 
      id: 1, 
      name: "Order Placed", 
      time: "7:58 PM",
      icon: "📝",
      description: "Your order has been placed successfully"
    },
    { 
      id: 2, 
      name: "Restaurant Accepted", 
      time: null,
      icon: "✅",
      description: "Restaurant has confirmed your order"
    },
    { 
      id: 3, 
      name: "Food Being Prepared", 
      time: null,
      icon: "👨‍🍳",
      description: "Chef is preparing your delicious meal"
    },
    { 
      id: 4, 
      name: "Order Packed", 
      time: null,
      icon: "📦",
      description: "Your order is packed and ready"
    },
    { 
      id: 5, 
      name: "Out for Delivery", 
      time: null,
      icon: "🚗",
      description: "Delivery partner is on the way"
    },
    { 
      id: 6, 
      name: "Delivered", 
      time: null,
      icon: "🎉",
      description: "Order delivered successfully"
    }
  ],
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

// Stage progression timing (in seconds)
export const stageTimings = [
  { stage: 1, delay: 0 },     // Order Placed - immediate
  { stage: 2, delay: 2 },     // Restaurant Accepted - 2 seconds
  { stage: 3, delay: 8 },     // Food Being Prepared - 8 seconds  
  { stage: 4, delay: 15 },    // Order Packed - 15 seconds
  { stage: 5, delay: 20 },    // Out for Delivery - 20 seconds
  { stage: 6, delay: 30 }     // Delivered - 30 seconds
];