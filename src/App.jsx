import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage/HomePage";
import "./styles.css";
import MenuPage from "./pages/MenuPage/MenuPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CartPage from "./pages/CartPage/CartPage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed/PaymentFailed";
import PaymentTestPage from "./pages/PaymentTestPage/PaymentTestPage";
import TestPage from "./pages/TestPage/TestPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import OrderTrackingPage from "./pages/OrderTrackingPage/OrderTrackingPage";
import OrderStatusPage from "./pages/OrderStatusPage/OrderStatusPage";
import AddAddressPage from "./pages/AddAddressPage/AddAddressPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import TrackRiderPage from "./pages/TrackRiderPage/TrackRiderPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";
import {
  TermsAndConditions,
  PrivacyPolicy,
  RefundCancellationPolicy,
  ReturnPolicy,
  ShippingPolicy,
} from "./pages/PoliciesPage";

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <Routes>
            {/* Auth routes without MainLayout (no header) - Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* All other routes with MainLayout */}
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes - No authentication required */}
              <Route index element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/menu/:id" element={<MenuPage />} />
              {/* Order tracking by code - public route */}
              <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
              
              {/* Protected Routes - Authentication required */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-failed"
                element={
                  <ProtectedRoute>
                    <PaymentFailed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-test"
                element={
                  <ProtectedRoute>
                    <PaymentTestPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-status"
                element={
                  <ProtectedRoute>
                    <OrderStatusPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/track-rider/:orderId?"
                element={
                  <ProtectedRoute>
                    <TrackRiderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-history"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test"
                element={
                  <ProtectedRoute>
                    <TestPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-address"
                element={
                  <ProtectedRoute>
                    <AddAddressPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              
              {/* Policy Pages - Public Access */}
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund-cancellation" element={<RefundCancellationPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthInitializer>
    </Provider>
  );
};

export default App;
