# Payment Status Screens

## Overview
Two beautiful, animated payment status screens for BlinkFeast food ordering app.

## Components Created

### 1. PaymentSuccess (`/payment-success`)
- **Background**: Soft green gradient
- **Animation**: Bouncing success icon with pulse rings
- **Features**: 
  - Animated confetti sparkles
  - Order summary display
  - Action buttons (Track Order, Back to Home)
  - Smooth fade-in animations

### 2. PaymentFailed (`/payment-failed`)
- **Background**: Soft red gradient  
- **Animation**: Shaking error icon with pulse effect
- **Features**:
  - Transaction details display
  - Error message with help text
  - Action buttons (Retry Payment, Go Back)
  - Support contact integration

### 3. PaymentStatusLayout
- **Shared component** for consistent layout
- **Responsive design** with mobile-first approach
- **Smooth animations** using Framer Motion

## Usage

### Navigation
```javascript
// Success
navigate('/payment-success', {
  state: {
    orderId: 'BLF12345',
    amount: 485,
    paymentMethod: 'UPI'
  }
});

// Failure  
navigate('/payment-failed', {
  state: {
    transactionId: 'TXN12345',
    amount: 485,
    paymentMethod: 'Credit Card'
  }
});
```

### Testing
Visit `/payment-test` to test both screens with mock data.

## Features
- ✅ Framer Motion animations
- ✅ Mobile-responsive design
- ✅ BlinkFeast branding consistency
- ✅ Accessibility compliant
- ✅ Production-ready code
- ✅ Mock data integration
- ✅ Smooth transitions

## Dependencies
- `framer-motion` - For animations
- `lucide-react` - For icons
- `react-router-dom` - For navigation