// Mock order data for Order History
export const mockOrders = [
  {
    id: "BLF202534",
    restaurant: "The Urban Tandoor",
    logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop&crop=center",
    date: "2025-11-09T20:32:00",
    items: [
      { name: "Butter Chicken", qty: 2, price: 280 },
      { name: "Garlic Naan", qty: 1, price: 40 },
      { name: "Coke", qty: 1, price: 52 }
    ],
    total: 652,
    status: "Delivered",
    paymentMethod: "UPI",
    address: "H-22, Sector 56, Gurgaon - 122011",
    transactionId: "TXN928374",
    deliveryPartner: "Rahul Kumar",
    deliveryTime: "45 mins",
    rating: null
  },
  {
    id: "BLF202540",
    restaurant: "Pizza Den",
    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop&crop=center",
    date: "2025-11-08T18:45:00",
    items: [
      { name: "Margherita Pizza", qty: 1, price: 320 },
      { name: "Coke", qty: 2, price: 104 }
    ],
    total: 424,
    status: "Cancelled",
    paymentMethod: "Card",
    address: "MG Road, Delhi - 110001",
    transactionId: "TXN928389",
    deliveryPartner: null,
    deliveryTime: null,
    rating: null
  },
  {
    id: "BLF202528",
    restaurant: "Burger Junction",
    logo: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop&crop=center",
    date: "2025-11-07T14:20:00",
    items: [
      { name: "Classic Burger", qty: 2, price: 240 },
      { name: "French Fries", qty: 1, price: 80 },
      { name: "Milkshake", qty: 1, price: 120 }
    ],
    total: 485,
    status: "Delivered",
    paymentMethod: "Wallet",
    address: "Cyber City, Gurgaon - 122002",
    transactionId: "TXN928301",
    deliveryPartner: "Amit Singh",
    deliveryTime: "35 mins",
    rating: 4
  },
  {
    id: "BLF202515",
    restaurant: "Spice Garden",
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop&crop=center",
    date: "2025-11-06T19:15:00",
    items: [
      { name: "Chicken Biryani", qty: 1, price: 280 },
      { name: "Raita", qty: 1, price: 40 },
      { name: "Gulab Jamun", qty: 2, price: 80 }
    ],
    total: 435,
    status: "In Progress",
    paymentMethod: "UPI",
    address: "Sector 29, Gurgaon - 122001",
    transactionId: "TXN928250",
    deliveryPartner: "Suresh Yadav",
    deliveryTime: "25 mins",
    rating: null
  },
  {
    id: "BLF202501",
    restaurant: "Cafe Mocha",
    logo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop&crop=center",
    date: "2025-11-05T16:30:00",
    items: [
      { name: "Cappuccino", qty: 2, price: 160 },
      { name: "Chocolate Cake", qty: 1, price: 180 },
      { name: "Sandwich", qty: 1, price: 120 }
    ],
    total: 495,
    status: "Delivered",
    paymentMethod: "Card",
    address: "DLF Phase 1, Gurgaon - 122002",
    transactionId: "TXN928201",
    deliveryPartner: "Vikash Kumar",
    deliveryTime: "40 mins",
    rating: 5
  }
];