import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import OrderStatusPage from "./pages/OrderStatusPage/OrderStatusPage";
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
                path="/order-status"
                element={
                  <ProtectedRoute>
                    <OrderStatusPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthInitializer>
    </Provider>
  );
};

export default App;
