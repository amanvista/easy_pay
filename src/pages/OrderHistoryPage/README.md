# Order History Page

## Overview
Complete order history page for BlinkFeast with filtering, sorting, and detailed order management.

## Components Created

### 1. OrderHistoryPage (`/order-history`)
- **Main page** with responsive layout
- **Header** with back navigation and order count
- **Filter and sort** functionality
- **Empty state** for no orders
- **Smooth animations** with Framer Motion

### 2. OrderFilterBar
- **Filter tabs**: All Orders, Ongoing, Past, Cancelled
- **Sort dropdown**: Newest/Oldest, Amount High/Low
- **Animated underline** for active filter
- **Responsive design** for mobile/desktop

### 3. OrderCard
- **Restaurant info** with logo and details
- **Order summary** with items and total
- **Status badges** with color coding
- **Action buttons**: View Details, Reorder, Rate Order
- **Hover animations** and responsive layout

### 4. OrderDetailsModal
- **Full order details** in modal format
- **Restaurant contact** with call button
- **Item breakdown** with quantities and prices
- **Bill breakdown** with taxes and fees
- **Delivery information** and payment details
- **Action buttons** for reorder and report issue

## Features

### ✅ Filtering & Sorting
- Filter by: All, Ongoing, Past, Cancelled orders
- Sort by: Date (newest/oldest), Amount (high/low)
- Real-time filtering with smooth animations

### ✅ Order Management
- **View Details**: Complete order information in modal
- **Reorder**: Quick reorder functionality with toast feedback
- **Rate Order**: Rating system for delivered orders
- **Report Issue**: Support contact integration

### ✅ Status System
- 🟢 **Delivered**: Completed orders with rating option
- 🟡 **In Progress**: Active orders being prepared/delivered
- 🔴 **Cancelled**: Cancelled orders with reason

### ✅ Responsive Design
- **Desktop**: Grid layout with detailed cards
- **Mobile**: Single-column stacked layout
- **Tablet**: Optimized for medium screens

### ✅ Animations
- **Framer Motion**: Smooth page transitions
- **Hover effects**: Card scaling and button interactions
- **Stagger animations**: Sequential card loading
- **Modal transitions**: Smooth open/close animations

## Mock Data Structure
```javascript
{
  id: "BLF202534",
  restaurant: "The Urban Tandoor",
  logo: "restaurant-logo-url",
  date: "2025-11-09T20:32:00",
  items: [
    { name: "Butter Chicken", qty: 2, price: 280 }
  ],
  total: 652,
  status: "Delivered", // "In Progress", "Cancelled"
  paymentMethod: "UPI", // "Card", "Wallet"
  address: "H-22, Sector 56, Gurgaon - 122011",
  transactionId: "TXN928374",
  deliveryPartner: "Rahul Kumar",
  deliveryTime: "45 mins",
  rating: null // or 1-5
}
```

## Usage

### Navigation
```javascript
navigate('/order-history');
```

### Testing
Visit `/test` to access the test page with links to order history and other features.

## Integration Points
- **Toast notifications** for user feedback
- **Navigation** to cart, payment, and restaurant pages
- **Phone integration** for restaurant contact
- **Support system** for issue reporting

## Dependencies
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-router-dom` - Navigation
- `react-toastify` - Notifications