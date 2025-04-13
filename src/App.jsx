import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';
import MenuPage from './pages/MenuPage/MenuPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { restaurantConfig } from './data/restaurantConfig';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import OrderStatusPage from './pages/OrderStatusPage/OrderStatusPage';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(restaurantConfig.defaultTheme);

  return (
    <Provider store={store}>
    <Router>
      <div className="App" data-theme={currentTheme}>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order" element={<OrderStatusPage />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;