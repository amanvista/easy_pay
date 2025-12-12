// routesConfig.js

import Home from "../pages/HomePage/HomePage";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/RegisterPage/Register";
import SearchPage from "../pages/SearchPage/SearchPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import CartPage from "../pages/CartPage/CartPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import PaymentTestPage from "../pages/PaymentTestPage/PaymentTestPage";
import OrderTrackingPage from "../pages/OrderTrackingPage/OrderTrackingPage";
import OrderHistoryPage from "../pages/OrderHistoryPage/OrderHistoryPage";
import OrderStatusPage from "../pages/OrderStatusPage/OrderStatusPage";
import TrackRiderPage from "../pages/TrackRiderPage/TrackRiderPage";
import TestPage from "../pages/TestPage/TestPage";
import AddAddressPage from "../pages/AddAddressPage/AddAddressPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import {
  TermsAndConditions,
  PrivacyPolicy,
  RefundCancellationPolicy,
  ReturnPolicy,
  ShippingPolicy,
} from "../pages/PoliciesPage";

export const publicNoLayoutRoutes = [
  { 
    path: "/login", 
    element: (
        <Login />
    )
  },
  { 
    path: "/register", 
    element: (
        <Register />
    )
  },
];

export const publicWithLayoutRoutes = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/menu/:id", element: <MenuPage /> },

  // Policy pages
  { path: "/terms", element: <TermsAndConditions /> },
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/refund-cancellation", element: <RefundCancellationPolicy /> },
  { path: "/return-policy", element: <ReturnPolicy /> },
  { path: "/shipping-policy", element: <ShippingPolicy /> },
];

export const protectedRoutes = [
  { path: "/order-tracking/:orderId", element: <OrderTrackingPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/payment-failed", element: <PaymentFailed /> },
  { path: "/payment-test", element: <PaymentTestPage /> },
  { path: "/order-status", element: <OrderStatusPage /> },
  { path: "/track-rider/:orderId?", element: <TrackRiderPage /> },
  { path: "/order-history", element: <OrderHistoryPage /> },
  { path: "/test", element: <TestPage /> },
  { path: "/add-address", element: <AddAddressPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/profile", element: <ProfilePage /> },
];
