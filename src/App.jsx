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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthInitializer from "./components/AuthInitializer/AuthInitializer";

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <Routes>
            {/* Auth routes without MainLayout (no header) - Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* All other routes with MainLayout require authentication */}
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menu/:id"
                element={
                  <ProtectedRoute>
                    <MenuPage />
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
                path="/order-tracking/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderTrackingPage />
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
