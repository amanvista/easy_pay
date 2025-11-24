# Order Tracking Page

## Overview
Complete live order tracking page for BlinkFeast with real-time updates, timeline visualization, and interactive features.

## Components Created

### 1. OrderTrackingPage (`/order-tracking`)
- **Main page** with live order progression
- **Auto-progression** simulation every 10 seconds
- **Persistent state** using localStorage
- **Responsive design** for all screen sizes
- **Route protection** - redirects if no active order

### 2. OrderHeader
- **Restaurant information** with logo and contact
- **Order summary** with items and payment details
- **Live ETA countdown** with minutes:seconds format
- **Status badge** with color-coded current stage
- **Responsive layout** for mobile and desktop

### 3. OrderTimeline
- **6-stage progression**: Order Placed → Restaurant Accepted → Food Being Prepared → Order Packed → Out for Delivery → Delivered
- **Visual indicators**: Icons, timestamps, descriptions
- **Animated transitions** with Framer Motion
- **Status colors**: Green (completed), Orange (active), Gray (pending)
- **Pulse animations** for active stage

### 4. DeliveryInfoCard
- **Delivery address** with contact information
- **Delivery partner info** (shown when out for delivery)
- **Partner details**: Name, rating, phone, vehicle number
- **Track partner button** (mock functionality)
- **Conditional rendering** based on order stage

### 5. StickyActionBar
- **Always visible** bottom action bar
- **Contact Support**: Mock support connection
- **View Invoice**: Invoice modal (coming soon)
- **Cancel Order**: Available before "Out for Delivery"
- **Rate Experience**: Available after delivery
- **Responsive buttons** with mobile-friendly labels

### 6. OrderDeliveredModal
- **Success celebration** with confetti animation
- **5-star rating system** with hover effects
- **Order completion message**
- **Interactive rating submission**
- **Smooth modal transitions**

## Features

### ✅ Live Order Tracking
- **Real-time progression** through 6 stages
- **Automatic updates** every 10 seconds
- **Timestamp recording** for each completed stage
- **ETA countdown** with live timer

### ✅ Stage Progression System
1. **Order Placed** (0s) - Immediate
2. **Restaurant Accepted** (2s) - Quick confirmation
3. **Food Being Prepared** (8s) - Cooking phase
4. **Order Packed** (15s) - Ready for pickup
5. **Out for Delivery** (20s) - Partner assigned
6. **Delivered** (30s) - Order completed

### ✅ Interactive Features
- **Contact restaurant** with direct call links
- **Track delivery partner** (mock functionality)
- **Cancel order** before out for delivery
- **Rate experience** after delivery
- **Support contact** integration

### ✅ Responsive Design
- **Mobile-first** approach
- **Sticky header** with order info
- **Bottom action bar** always accessible
- **Optimized layouts** for all screen sizes

### ✅ Animations & UX
- **Framer Motion** smooth transitions
- **Pulse animations** for active stages
- **Confetti celebration** on delivery
- **Loading states** and error handling
- **Toast notifications** for user feedback

## Mock Data Structure
```javascript
{
  id: "BLF203841",
  restaurant: {
    name: "The Urban Tandoor",
    logo: "restaurant-logo-url",
    address: "Sector 56, Gurgaon",
    contact: "+91 9876543210"
  },
  items: [
    { name: "Paneer Tikka", qty: 2, price: 280 }
  ],
  total: 480,
  paymentMethod: "UPI",
  currentStage: 1, // 1-6
  stages: [
    {
      id: 1,
      name: "Order Placed",
      time: "7:58 PM",
      icon: "📝",
      description: "Your order has been placed successfully"
    }
  ],
  etaMinutes: 25,
  partner: {
    name: "Rahul Kumar",
    phone: "+91 99999 88888",
    vehicle: "DL 8C AB 4567",
    rating: 4.8
  },
  address: "H-22, Sector 56, Gurgaon - 122011"
}
```

## Usage

### Navigation
```javascript
// From payment success
navigate('/order-tracking');

// Direct access (requires stored order data)
navigate('/order-tracking');
```

### Data Persistence
- Order data stored in `localStorage` as `currentOrder`
- Automatic cleanup on order completion or cancellation
- Fallback to mock data if no stored order found

### Testing
1. Visit `/test` for easy access
2. Complete a payment to auto-navigate to tracking
3. Watch live progression simulation
4. Test all interactive features

## Integration Points
- **Payment Success** → Auto-navigate to tracking
- **Toast notifications** for user feedback
- **Phone integration** for calls
- **Support system** integration ready
- **Rating system** with backend integration hooks

## State Management
- **useState** for order data and timers
- **useEffect** for progression simulation
- **localStorage** for data persistence
- **Route protection** for security

## Dependencies
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-router-dom` - Navigation
- `react-toastify` - Notifications

## Future Enhancements
- Real-time WebSocket integration
- GPS tracking for delivery partner
- Push notifications
- Order modification capabilities
- Multi-language support